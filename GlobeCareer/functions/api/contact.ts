/**
 * POST /api/contact — Cloudflare Pages Function.
 *
 * Verifies a Cloudflare Turnstile token server-side before accepting a contact
 * message, validates the payload, rejects replays and duplicates, stores the
 * accepted message in KV (binding CONTACT_MESSAGES), then notifies the owner by
 * email through the Google Apps Script Web App (functions/lib/email.ts).
 *
 * Ordering is deliberate: the message is durable in KV *before* the email is
 * attempted, so an email outage can never lose a submission. A visitor is told
 * their message was received and saved; the response only claims an email was
 * sent when the provider actually accepted it (`notified: true`).
 *
 * Required configuration (Pages -> Settings -> Variables and secrets):
 *   TURNSTILE_SECRET_KEY  secret   Turnstile widget secret key (never in the client)
 *   CONTACT_MESSAGES      KV       namespace binding that stores accepted messages
 * Optional (owner notification through the Google Apps Script Web App; the
 * submission is still stored when these are absent):
 *   CONTACT_WEBHOOK_URL     text    deployed Apps Script Web App /exec URL
 *   CONTACT_WEBHOOK_SECRET  secret  shared secret, also held in the script's
 *                                   Script Property WEBHOOK_SECRET
 *   CONTACT_ALLOWED_HOSTNAMES  text  comma-separated hostnames the token may come
 *                                    from (default: globecareer.online,www.globecareer.online)
 */

import { sendContactNotification, type EmailEnv } from '../lib/email';

interface KVNamespaceLike {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number; metadata?: Record<string, unknown> },
  ): Promise<void>;
}

interface Env extends EmailEnv {
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_MESSAGES?: KVNamespaceLike;
  CONTACT_ALLOWED_HOSTNAMES?: string;
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const MAX_BODY_BYTES = 16 * 1024;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;
const DUPLICATE_TTL_SECONDS = 10 * 60;
const VERIFY_TIMEOUT_MS = 10000;
const DEFAULT_ALLOWED_HOSTNAMES = 'globecareer.online,www.globecareer.online';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function json(status: number, body: Record<string, unknown>, requestId: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Request-Id': requestId,
    },
  });
}

function clean(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(CONTROL_CHARS, '').replace(/\r\n/g, '\n').trim().slice(0, max);
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function readPayload(request: Request): Promise<Record<string, unknown> | null> {
  const declared = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return null;

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return null;
  if (!raw) return {};

  const contentType = (request.headers.get('content-type') ?? '').toLowerCase();
  if (contentType.includes('application/json')) {
    try {
      const parsed: unknown = JSON.parse(raw);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : null;
    } catch {
      return null;
    }
  }

  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(raw).entries());
  }

  return null;
}

interface Verification {
  success: boolean;
  errorCodes: string[];
  hostname?: string;
  action?: string;
  challengeTs?: string;
}

async function verifyTurnstile(
  secret: string,
  token: string,
  remoteIp: string | null,
): Promise<Verification> {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (remoteIp) body.append('remoteip', remoteIp);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), VERIFY_TIMEOUT_MS);
  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body,
      signal: controller.signal,
    });
    if (!response.ok) {
      return { success: false, errorCodes: [`siteverify-http-${response.status}`] };
    }
    const result = (await response.json()) as {
      success?: boolean;
      'error-codes'?: string[];
      hostname?: string;
      action?: string;
      challenge_ts?: string;
    };
    return {
      success: result.success === true,
      errorCodes: Array.isArray(result['error-codes']) ? result['error-codes'] : [],
      hostname: result.hostname,
      action: result.action,
      challengeTs: result.challenge_ts,
    };
  } catch {
    return { success: false, errorCodes: ['siteverify-unreachable'] };
  } finally {
    clearTimeout(timer);
  }
}

function verificationMessage(errorCodes: string[]): string {
  if (errorCodes.includes('timeout-or-duplicate')) {
    return 'That verification check has expired or was already used. Please complete it again.';
  }
  if (errorCodes.includes('invalid-input-secret') || errorCodes.includes('missing-input-secret')) {
    return 'Verification is temporarily unavailable. Please try again later.';
  }
  return 'The verification check did not pass. Please complete it again and resend.';
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;
  const requestId = crypto.randomUUID();

  // Same-origin only: reject cross-site form posts.
  const origin = request.headers.get('origin');
  const allowedHostnames = (env.CONTACT_ALLOWED_HOSTNAMES ?? DEFAULT_ALLOWED_HOSTNAMES)
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  if (origin) {
    try {
      if (!allowedHostnames.includes(new URL(origin).hostname.toLowerCase())) {
        return json(403, { error: 'This form may only be submitted from the GlobeCareer website.' }, requestId);
      }
    } catch {
      return json(403, { error: 'This form may only be submitted from the GlobeCareer website.' }, requestId);
    }
  }

  const payload = await readPayload(request);
  if (!payload) {
    return json(400, { error: 'The submitted form could not be read.' }, requestId);
  }

  const name = clean(payload.name, MAX_NAME);
  const email = clean(payload.email, MAX_EMAIL);
  const message = clean(payload.message, MAX_MESSAGE);
  const turnstileToken = typeof payload.turnstileToken === 'string' ? payload.turnstileToken.trim() : '';

  const fieldErrors: Record<string, string> = {};
  if (name.length < 1) fieldErrors.name = 'Please enter your name.';
  if (email.length < 3 || !EMAIL_PATTERN.test(email)) fieldErrors.email = 'Please enter a valid email address.';
  if (message.length < MIN_MESSAGE) {
    fieldErrors.message = `Please write at least ${MIN_MESSAGE} characters.`;
  }
  if (Object.keys(fieldErrors).length > 0) {
    return json(400, { error: 'Please correct the highlighted fields.', fields: fieldErrors }, requestId);
  }

  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('contact: TURNSTILE_SECRET_KEY is not configured', { requestId });
    return json(500, { error: 'Message delivery is not configured yet. Please email info@globecareer.online directly.' }, requestId);
  }

  if (!turnstileToken) {
    return json(400, { error: 'Please complete the verification check before sending.' }, requestId);
  }
  if (turnstileToken.length > 2048) {
    return json(400, { error: 'The verification check is invalid. Please complete it again.' }, requestId);
  }

  const verification = await verifyTurnstile(secret, turnstileToken, request.headers.get('cf-connecting-ip'));
  if (!verification.success) {
    console.warn('contact: turnstile rejected', { requestId, errorCodes: verification.errorCodes });
    const status = verification.errorCodes.includes('siteverify-unreachable') ? 503 : 403;
    return json(status, { error: verificationMessage(verification.errorCodes) }, requestId);
  }

  if (verification.hostname && !allowedHostnames.includes(verification.hostname.toLowerCase())) {
    console.warn('contact: turnstile hostname mismatch', { requestId, hostname: verification.hostname });
    return json(403, { error: 'The verification check did not pass. Please complete it again and resend.' }, requestId);
  }

  const storage = env.CONTACT_MESSAGES;
  if (!storage) {
    console.error('contact: CONTACT_MESSAGES binding is not configured', { requestId });
    return json(500, { error: 'Message delivery is not configured yet. Please email info@globecareer.online directly.' }, requestId);
  }

  // Prevent duplicate submissions: an identical payload inside the window is refused.
  const fingerprint = await sha256Hex(`${email.toLowerCase()}\n${message}`);
  const duplicateKey = `recent:${fingerprint}`;
  let existing: string | null = null;
  try {
    existing = await storage.get(duplicateKey);
  } catch {
    console.error('contact: duplicate lookup failed', { requestId });
    return json(500, { error: 'We could not accept your message right now. Please try again in a moment.' }, requestId);
  }
  if (existing) {
    return json(409, { error: 'We already received this message. Please wait a moment before sending it again.' }, requestId);
  }

  const receivedAt = new Date().toISOString();
  const id = crypto.randomUUID();
  const key = `msg:${receivedAt}:${id}`;
  const metadata = { name, email, receivedAt };

  const record: {
    id: string;
    receivedAt: string;
    name: string;
    email: string;
    message: string;
    ip: string | null;
    userAgent: string;
    turnstile: { hostname: string | null; challengeTs: string | null; action: string | null };
    notification?: { status: string; attemptedAt: string; detail?: string; reason?: string };
  } = {
    id,
    receivedAt,
    name,
    email,
    message,
    ip: request.headers.get('cf-connecting-ip') ?? null,
    userAgent: (request.headers.get('user-agent') ?? '').slice(0, 300),
    turnstile: {
      hostname: verification.hostname ?? null,
      challengeTs: verification.challengeTs ?? null,
      action: verification.action ?? null,
    },
  };

  // 1. Persist first. Nothing below may discard an accepted message.
  try {
    await storage.put(key, JSON.stringify(record), { metadata });
    await storage.put(duplicateKey, id, { expirationTtl: DUPLICATE_TTL_SECONDS });
  } catch {
    console.error('contact: storage write failed', { requestId });
    return json(500, { error: 'We could not save your message. Please try again in a moment.' }, requestId);
  }

  // 2. Notify the owner. A failure here is recorded, never surfaced as success.
  const outcome = await sendContactNotification(env, record);
  record.notification = {
    status: outcome.status,
    attemptedAt: outcome.attemptedAt,
    ...(outcome.status === 'sent' ? { detail: outcome.detail } : { reason: outcome.reason }),
  };

  try {
    await storage.put(key, JSON.stringify(record), { metadata });
  } catch {
    // The original record is already durable; only the notification status is lost.
    console.error('contact: could not record notification status', { requestId, id });
  }

  if (outcome.status !== 'sent') {
    console.warn('contact: owner notification not delivered; message retained in KV', {
      requestId,
      id,
      status: outcome.status,
      reason: outcome.status === 'not-configured' ? outcome.reason : 'delivery-failed',
    });
  } else {
    console.log('contact: message stored and owner notified', { requestId, id });
  }

  return json(201, { ok: true, id, notified: outcome.status === 'sent' }, requestId);
}
