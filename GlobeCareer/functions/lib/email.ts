/**
 * Owner notification for accepted contact submissions.
 *
 * Delivery is a Google Apps Script Web App on the owner's Google account
 * (`_mission_2026-11-23/apps-script/Code.gs`), called with a plain `fetch` POST
 * and a shared secret. No email provider account, SDK or Node runtime is needed
 * inside a Pages Function, and no credential lives in the client.
 *
 * Required configuration (Cloudflare Pages -> Settings -> Variables and secrets):
 *   CONTACT_WEBHOOK_URL     text    the deployed Web App /exec URL
 *   CONTACT_WEBHOOK_SECRET  secret  shared secret, also stored in the Apps Script
 *                                   Script Property WEBHOOK_SECRET
 *
 * Email is a notification channel only. The message is persisted in KV before
 * this runs, so a delivery failure never loses a submission.
 */

const SEND_TIMEOUT_MS = 12000;
const MAX_ERROR_DETAIL = 200;
const ALLOWED_HOSTS = new Set(['script.google.com', 'script.googleusercontent.com']);

export interface ContactRecord {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  message: string;
  ip?: string | null;
  userAgent?: string;
  turnstile?: { hostname?: string | null; challengeTs?: string | null; action?: string | null };
}

export interface EmailEnv {
  CONTACT_WEBHOOK_URL?: string;
  CONTACT_WEBHOOK_SECRET?: string;
}

export type EmailOutcome =
  | { status: 'sent'; detail: string; attemptedAt: string }
  | { status: 'failed'; reason: string; attemptedAt: string }
  | { status: 'not-configured'; reason: string; attemptedAt: string };

/**
 * The webhook URL must be an HTTPS Google Apps Script deployment. Validating it
 * keeps a mistyped variable from turning the function into an open proxy.
 */
export function webhookStatus(
  env: EmailEnv,
): { ready: false; reason: string } | { ready: true; url: string; secret: string } {
  const rawUrl = (env.CONTACT_WEBHOOK_URL ?? '').trim();
  const secret = (env.CONTACT_WEBHOOK_SECRET ?? '').trim();

  const missing: string[] = [];
  if (!rawUrl) missing.push('CONTACT_WEBHOOK_URL');
  if (!secret) missing.push('CONTACT_WEBHOOK_SECRET');
  if (missing.length > 0) return { ready: false, reason: `missing:${missing.join(',')}` };

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return { ready: false, reason: 'invalid:CONTACT_WEBHOOK_URL' };
  }
  if (url.protocol !== 'https:' || !ALLOWED_HOSTS.has(url.hostname.toLowerCase())) {
    return { ready: false, reason: 'invalid:CONTACT_WEBHOOK_URL' };
  }
  if (!/\/exec\/?$/.test(url.pathname)) {
    return { ready: false, reason: 'invalid:CONTACT_WEBHOOK_URL' };
  }

  return { ready: true, url: url.toString(), secret };
}

/**
 * Sends the owner notification. Never throws: the caller decides what to report
 * to the visitor, and the KV copy is always kept.
 */
export async function sendContactNotification(env: EmailEnv, record: ContactRecord): Promise<EmailOutcome> {
  const attemptedAt = new Date().toISOString();
  const config = webhookStatus(env);
  if (!config.ready) {
    return { status: 'not-configured', reason: config.reason, attemptedAt };
  }

  const body = JSON.stringify({
    secret: config.secret,
    id: record.id,
    receivedAt: record.receivedAt,
    name: record.name,
    email: record.email,
    message: record.message,
    site: 'globecareer.online',
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
  try {
    // Apps Script answers a POST with a 302 to a stored-response URL; following
    // the redirect is what delivers the JSON body back to us.
    const response = await fetch(config.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      redirect: 'follow',
      signal: controller.signal,
    });

    if (!response.ok) {
      let detail = '';
      try {
        detail = (await response.text()).slice(0, MAX_ERROR_DETAIL);
      } catch {
        detail = '';
      }
      return { status: 'failed', reason: `webhook-http-${response.status}${detail ? `:${detail}` : ''}`, attemptedAt };
    }

    let parsed: { ok?: boolean; sent?: boolean; error?: string } | null = null;
    try {
      parsed = (await response.json()) as { ok?: boolean; sent?: boolean; error?: string };
    } catch {
      parsed = null;
    }

    if (!parsed) {
      // Usually an access setting of "Only myself" or a Google sign-in page.
      return { status: 'failed', reason: 'webhook-invalid-response', attemptedAt };
    }
    if (parsed.ok !== true) {
      return {
        status: 'failed',
        reason: `webhook-rejected:${String(parsed.error ?? 'unknown').slice(0, MAX_ERROR_DETAIL)}`,
        attemptedAt,
      };
    }

    return { status: 'sent', detail: 'apps-script', attemptedAt };
  } catch (error) {
    const reason =
      error instanceof Error && error.name === 'AbortError' ? 'apps-script-timeout' : 'apps-script-unreachable';
    return { status: 'failed', reason, attemptedAt };
  } finally {
    clearTimeout(timer);
  }
}
