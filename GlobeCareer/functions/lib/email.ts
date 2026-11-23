/**
 * Owner notification email for accepted contact submissions.
 *
 * Uses Resend's HTTPS API (https://api.resend.com/emails) with a plain `fetch`
 * call, so no SDK or Node-only runtime is required inside a Pages Function.
 *
 * Required configuration (Cloudflare Pages -> Settings -> Variables and secrets):
 *   RESEND_API_KEY       secret  Resend API key
 *   CONTACT_TO_EMAIL     text    owner inbox that receives notifications
 *   CONTACT_FROM_EMAIL   text    sender on a domain verified in Resend
 *                                (plain address or "GlobeCareer <contact@domain>")
 * Optional:
 *   CONTACT_REPLY_TO     text    fallback Reply-To when the visitor address is unusable
 *
 * Email is a notification channel only. The message is persisted in KV before
 * this runs, so a delivery failure never loses a submission.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const SEND_TIMEOUT_MS = 8000;
const MAX_ERROR_DETAIL = 300;

const ADDRESS_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

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
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_REPLY_TO?: string;
}

export type EmailOutcome =
  | { status: 'sent'; providerId: string | null; attemptedAt: string }
  | { status: 'failed'; reason: string; attemptedAt: string }
  | { status: 'not-configured'; reason: string; attemptedAt: string };

function headerSafe(value: string, max = 200): string {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, max);
}

function isValidAddress(value: string): boolean {
  return value.length <= 254 && ADDRESS_PATTERN.test(value);
}

/** Accepts "name@example.com" or "Display Name <name@example.com>". */
function isValidSender(value: string): boolean {
  const plain = value.trim();
  if (isValidAddress(plain)) return true;
  const match = /^[^<>]{1,80}<([^<>]+)>$/.exec(plain);
  return Boolean(match && isValidAddress(match[1].trim()));
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return `${date.toISOString().replace('T', ' ').replace('.000Z', '')} UTC`;
}

export function renderContactEmail(record: ContactRecord): { subject: string; html: string; text: string } {
  const received = formatTimestamp(record.receivedAt);
  const subject = headerSafe(`New contact message from ${record.name}`);
  const messageHtml = escapeHtml(record.message).replace(/\n/g, '<br />');

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#171717;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:16px;">
      <tr>
        <td style="padding:24px 28px 8px 28px;">
          <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#2563eb;font-weight:700;">GlobeCareer contact form</p>
          <h1 style="margin:8px 0 0 0;font-size:19px;line-height:1.35;color:#171717;">New message from ${escapeHtml(record.name)}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px 0 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;line-height:1.6;">
            <tr>
              <td style="padding:4px 0;color:#737373;width:120px;">Name</td>
              <td style="padding:4px 0;color:#171717;">${escapeHtml(record.name)}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#737373;">Email</td>
              <td style="padding:4px 0;color:#171717;"><a href="mailto:${escapeHtml(record.email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(record.email)}</a></td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#737373;">Received</td>
              <td style="padding:4px 0;color:#171717;">${escapeHtml(received)}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#737373;">Reference</td>
              <td style="padding:4px 0;color:#171717;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;">${escapeHtml(record.id)}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 28px 0 28px;">
          <div style="border-top:1px solid #e5e5e5;padding-top:16px;font-size:14px;line-height:1.65;color:#171717;">${messageHtml}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 28px 24px 28px;">
          <p style="margin:0;font-size:11px;line-height:1.6;color:#737373;">Reply directly to this email to answer ${escapeHtml(record.name)}. A copy of this submission is stored in the site's Contact Messages KV namespace.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    'GlobeCareer contact form',
    '',
    `Name:      ${record.name}`,
    `Email:     ${record.email}`,
    `Received:  ${received}`,
    `Reference: ${record.id}`,
    '',
    'Message:',
    record.message,
    '',
    'Reply to this email to answer the sender.',
  ].join('\n');

  return { subject, html, text };
}

export function emailConfigStatus(env: EmailEnv): { ready: false; reason: string } | { ready: true; apiKey: string; to: string; from: string; replyTo?: string } {
  const apiKey = (env.RESEND_API_KEY ?? '').trim();
  const to = (env.CONTACT_TO_EMAIL ?? '').trim();
  const from = (env.CONTACT_FROM_EMAIL ?? '').trim();
  const replyTo = (env.CONTACT_REPLY_TO ?? '').trim();

  const missing: string[] = [];
  if (!apiKey) missing.push('RESEND_API_KEY');
  if (!to) missing.push('CONTACT_TO_EMAIL');
  if (!from) missing.push('CONTACT_FROM_EMAIL');
  if (missing.length > 0) return { ready: false, reason: `missing:${missing.join(',')}` };

  if (!isValidAddress(to)) return { ready: false, reason: 'invalid:CONTACT_TO_EMAIL' };
  if (!isValidSender(from)) return { ready: false, reason: 'invalid:CONTACT_FROM_EMAIL' };
  if (replyTo && !isValidAddress(replyTo)) return { ready: false, reason: 'invalid:CONTACT_REPLY_TO' };

  return { ready: true, apiKey, to, from, replyTo: replyTo || undefined };
}

/**
 * Sends the owner notification. Never throws: the caller decides what to report
 * to the visitor, and the KV copy is always kept.
 */
export async function sendContactNotification(env: EmailEnv, record: ContactRecord): Promise<EmailOutcome> {
  const attemptedAt = new Date().toISOString();
  const config = emailConfigStatus(env);
  if (!config.ready) {
    return { status: 'not-configured', reason: config.reason, attemptedAt };
  }

  const { subject, html, text } = renderContactEmail(record);
  const replyTo =
    isValidAddress(record.email) ? record.email : config.replyTo ?? config.to;

  const body: Record<string, unknown> = {
    from: config.from,
    to: [config.to],
    subject,
    html,
    text,
    reply_to: replyTo,
    headers: {
      'X-Entity-Ref-ID': record.id,
    },
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      let detail = '';
      try {
        detail = (await response.text()).slice(0, MAX_ERROR_DETAIL);
      } catch {
        detail = '';
      }
      return { status: 'failed', reason: `resend-http-${response.status}${detail ? `:${detail}` : ''}`, attemptedAt };
    }

    let providerId: string | null = null;
    try {
      const parsed = (await response.json()) as { id?: unknown };
      if (typeof parsed.id === 'string') providerId = parsed.id.slice(0, 100);
    } catch {
      providerId = null;
    }
    return { status: 'sent', providerId, attemptedAt };
  } catch (error) {
    const reason = error instanceof Error && error.name === 'AbortError' ? 'resend-timeout' : 'resend-unreachable';
    return { status: 'failed', reason, attemptedAt };
  } finally {
    clearTimeout(timer);
  }
}
