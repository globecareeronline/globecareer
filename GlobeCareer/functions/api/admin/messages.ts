/**
 * GET /api/admin/messages — owner-only reader for the Contact Messages KV store.
 *
 * Protected by a long random bearer token held in the Pages secret ADMIN_TOKEN.
 * There is no unauthenticated listing, no query-string token, and no CORS
 * header, so a browser on another origin cannot read the response even if a
 * token leaked into a page.
 *
 *   GET /api/admin/messages?limit=50          -> newest 50 submissions (no IP/UA)
 *   GET /api/admin/messages?id=<uuid>         -> one submission in full
 *
 * Responses are always `no-store`, `noindex`, and unauthorized calls return a
 * plain 404 so the endpoint's existence is not confirmed.
 */

interface KVListResult {
  keys: { name: string; metadata?: Record<string, unknown> | null }[];
  list_complete?: boolean;
  cursor?: string;
}

interface KVNamespaceLike {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<KVListResult>;
}

interface Env {
  ADMIN_TOKEN?: string;
  CONTACT_MESSAGES?: KVNamespaceLike;
}

const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 25;
const MAX_LIST_KEYS = 1000;
const MIN_TOKEN_LENGTH = 32;
const FAILURE_WINDOW_SECONDS = 15 * 60;
const MAX_FAILURES = 10;

const RATE_LIMIT_MESSAGE =
  'Too many failed attempts. Owner access is temporarily locked for this address; try again later.';

function json(status: number, body: unknown, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      'X-Robots-Tag': 'noindex, nofollow',
      Vary: 'Authorization',
      ...extraHeaders,
    },
  });
}

function notFound(): Response {
  return json(404, { error: 'Not found' });
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/** Constant-time comparison over fixed-length digests (no length or prefix leak). */
async function tokenMatches(provided: string, expected: string): Promise<boolean> {
  const [a, b] = await Promise.all([sha256Hex(provided), sha256Hex(expected)]);
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) {
    difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return difference === 0 && provided.length === expected.length;
}

function bearerToken(request: Request): string {
  const header = request.headers.get('authorization') ?? '';
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  return match ? match[1].trim() : '';
}

interface StoredRecord {
  id?: string;
  receivedAt?: string;
  name?: string;
  email?: string;
  message?: string;
  ip?: string | null;
  userAgent?: string;
  notification?: { status?: string; attemptedAt?: string };
}

/** Owner-facing summary: content and sender, without the visitor's IP or UA. */
function summary(key: string, record: StoredRecord) {
  return {
    key,
    id: record.id ?? null,
    receivedAt: record.receivedAt ?? null,
    name: record.name ?? '',
    email: record.email ?? '',
    message: record.message ?? '',
    emailStatus: record.notification?.status ?? 'unknown',
  };
}

function fullRecord(key: string, record: StoredRecord) {
  return {
    key,
    id: record.id ?? null,
    receivedAt: record.receivedAt ?? null,
    name: record.name ?? '',
    email: record.email ?? '',
    message: record.message ?? '',
    emailStatus: record.notification?.status ?? 'unknown',
    emailAttemptedAt: record.notification?.attemptedAt ?? null,
    ip: record.ip ?? null,
    userAgent: record.userAgent ?? '',
  };
}

export async function onRequestGet(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  const requestId = crypto.randomUUID();

  const secret = env.ADMIN_TOKEN;
  if (!secret || secret.length < MIN_TOKEN_LENGTH) {
    console.error('admin/messages: ADMIN_TOKEN is missing or shorter than 32 characters', { requestId });
    return json(503, { error: 'Owner access is not configured.' });
  }

  const storage = env.CONTACT_MESSAGES;
  if (!storage) {
    console.error('admin/messages: CONTACT_MESSAGES binding is not configured', { requestId });
    return json(503, { error: 'Message storage is not configured.' });
  }

  const ip = request.headers.get('cf-connecting-ip') ?? '';
  const failureKey = `adminfail:${(await sha256Hex(ip || 'unknown')).slice(0, 32)}`;

  let failures = 0;
  try {
    const stored = await storage.get(failureKey);
    failures = stored ? Number.parseInt(stored, 10) || 0 : 0;
  } catch {
    failures = 0;
  }
  if (failures >= MAX_FAILURES) {
    return json(429, { error: RATE_LIMIT_MESSAGE });
  }

  const token = bearerToken(request);
  if (!token || !(await tokenMatches(token, secret))) {
    try {
      await storage.put(failureKey, String(failures + 1), { expirationTtl: FAILURE_WINDOW_SECONDS });
    } catch {
      /* best effort: a counter failure must not open access */
    }
    console.warn('admin/messages: rejected unauthorized request', { requestId });
    return notFound();
  }

  const url = new URL(request.url);
  const id = (url.searchParams.get('id') ?? '').trim();

  try {
    if (id) {
      if (!/^[0-9a-fA-F-]{36}$/.test(id)) return json(400, { error: 'Invalid message reference.' });
      const listed = await storage.list({ prefix: 'msg:', limit: MAX_LIST_KEYS });
      const match = listed.keys.find((entry) => entry.name.endsWith(`:${id}`));
      if (!match) return notFound();
      const raw = await storage.get(match.name);
      if (!raw) return notFound();
      const parsed = JSON.parse(raw) as StoredRecord;
      return json(200, { message: fullRecord(match.name, parsed) });
    }

    const requested = Number.parseInt(url.searchParams.get('limit') ?? '', 10);
    const limit = Number.isFinite(requested)
      ? Math.min(Math.max(requested, 1), MAX_LIMIT)
      : DEFAULT_LIMIT;

    const listed = await storage.list({ prefix: 'msg:', limit: MAX_LIST_KEYS });
    // Keys are `msg:<ISO timestamp>:<uuid>`; reverse lexical order is newest first.
    const keys = listed.keys.map((entry) => entry.name).sort().reverse().slice(0, limit);

    const messages = [];
    for (const key of keys) {
      const raw = await storage.get(key);
      if (!raw) continue;
      try {
        messages.push(summary(key, JSON.parse(raw) as StoredRecord));
      } catch {
        continue;
      }
    }

    return json(200, {
      count: messages.length,
      truncated: listed.list_complete === false,
      messages,
    });
  } catch (error) {
    console.error('admin/messages: read failed', {
      requestId,
      reason: error instanceof Error ? error.message : 'unknown',
    });
    return json(500, { error: 'Stored messages could not be read right now.' });
  }
}

export async function onRequest(context: { request: Request; env: Env }): Promise<Response> {
  if (context.request.method === 'GET') return onRequestGet(context);
  return json(405, { error: 'Method not allowed' }, { Allow: 'GET' });
}
