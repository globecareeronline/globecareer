#!/usr/bin/env node
/**
 * Minimal static server that mirrors how Cloudflare Pages resolves a request
 * against the build output:
 *   1. _redirects rule (always evaluated first, 301/302 or 200 proxy)
 *   2. <path>.html               -> 200 (Pages serves /foo from foo.html)
 *   3. exact file                -> 200
 *   4. <path>/index.html         -> 308 to <path>/ (Pages' trailing slash)
 *   5. <path>/index.html exists for <path>/ -> 200
 *   6. otherwise                 -> 404.html with status 404
 *
 * Step 2/4/5 reproduce Cloudflare Pages' `html_handling: auto-trailing-slash`
 * default: a page's canonical URL follows its file name. This matters because a
 * local server that answers both forms with 200 hides real redirect loops.
 *
 * Only the subset of _redirects syntax this project uses is implemented: exact
 * paths, `*` wildcards with `:splat`, and an optional status code. Host-level
 * rules (a source that is not a path) are ignored, exactly as Pages ignores them.
 *
 * Used by `npm run audit:routes` and for local verification only.
 */
import http from 'node:http';
import zlib from 'node:zlib';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_DIST = path.resolve(process.cwd(), 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
};

/** Parses the built `_redirects` file into ordered rules. */
export function loadRedirects(distDir = DEFAULT_DIST) {
  const file = path.join(distDir, '_redirects');
  if (!existsSync(file)) return [];
  const rules = [];
  for (const rawLine of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const [source, destination, code] = line.split(/\s+/);
    // Cloudflare Pages cannot redirect by hostname; a non-path source is ignored.
    if (!source || !source.startsWith('/') || !destination) continue;
    rules.push({ source, destination, status: Number(code) || 302 });
  }
  return rules;
}

/** First matching rule for a path, in file order (Cloudflare semantics). */
function matchRedirect(rules, pathname) {
  for (const rule of rules) {
    if (rule.source.includes('*')) {
      const [prefix, suffix] = rule.source.split('*');
      if (
        pathname.length >= prefix.length + suffix.length &&
        pathname.startsWith(prefix) &&
        pathname.endsWith(suffix)
      ) {
        const splat = pathname.slice(prefix.length, pathname.length - suffix.length);
        return { status: rule.status, location: rule.destination.replace(/:splat/g, splat) };
      }
      continue;
    }
    if (rule.source === pathname) return { status: rule.status, location: rule.destination };
  }
  return null;
}

function isFile(candidate) {
  return existsSync(candidate) && statSync(candidate).isFile();
}

function safeJoin(distDir, relative) {
  const resolved = path.join(distDir, relative);
  return resolved.startsWith(distDir) ? resolved : null;
}

/**
 * Resolves a request path the way Pages does. Returns either a file to serve or
 * a redirect Pages would issue itself.
 */
export function resolvePath(distDir, pathname) {
  const decoded = decodeURIComponent(pathname);

  if (decoded.endsWith('/')) {
    // Directory form: /foo/ serves foo/index.html if present, otherwise Pages
    // strips the slash when foo.html exists.
    const indexFile = safeJoin(distDir, path.join(decoded, 'index.html'));
    if (indexFile && isFile(indexFile)) return { file: indexFile };
    const trimmed = decoded.replace(/\/+$/, '');
    if (trimmed) {
      const htmlFile = safeJoin(distDir, `${trimmed}.html`);
      if (htmlFile && isFile(htmlFile)) {
        return { redirect: { status: 308, location: trimmed } };
      }
    }
    return null;
  }

  // Page file: /foo is served from foo.html (Pages' canonical form for files).
  const pageFile = safeJoin(distDir, `${decoded}.html`);
  if (pageFile && isFile(pageFile)) return { file: pageFile };

  // Plain asset: /assets/app.js and friends.
  const asset = safeJoin(distDir, decoded);
  if (asset && isFile(asset)) return { file: asset };

  // Directory index requested without the slash: Pages adds the slash.
  const indexFile = safeJoin(distDir, path.join(decoded, 'index.html'));
  if (indexFile && isFile(indexFile)) {
    return { redirect: { status: 308, location: `${decoded}/` } };
  }
  return null;
}

const COMPRESSIBLE = new Set(['.html', '.js', '.mjs', '.css', '.json', '.xml', '.txt', '.svg', '.webmanifest']);

/**
 * Cloudflare Pages serves text assets with brotli/gzip. The local server does
 * the same so Lighthouse numbers reflect deployed behaviour rather than the
 * uncompressed size of the prerendered HTML.
 */
function sendFile(req, res, status, file) {
  const ext = path.extname(file);
  const type = MIME[ext] || 'application/octet-stream';
  const headers = { 'Content-Type': type, 'Cache-Control': 'no-store', Vary: 'Accept-Encoding' };
  const stream = createReadStream(file);
  const accepts = String(req.headers['accept-encoding'] || '');
  const canCompress = COMPRESSIBLE.has(ext) && statSync(file).size > 1024;

  if (canCompress && /\bbr\b/.test(accepts)) {
    res.writeHead(status, { ...headers, 'Content-Encoding': 'br' });
    stream.pipe(zlib.createBrotliCompress({ params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } })).pipe(res);
    return;
  }
  if (canCompress && /\bgzip\b/.test(accepts)) {
    res.writeHead(status, { ...headers, 'Content-Encoding': 'gzip' });
    stream.pipe(zlib.createGzip({ level: 6 })).pipe(res);
    return;
  }
  res.writeHead(status, headers);
  stream.pipe(res);
}

export function createDistServer(distDir = DEFAULT_DIST) {
  const redirects = loadRedirects(distDir);
  return http.createServer((req, res) => {
    const url = new URL(req.url || '/', 'http://localhost');

    const redirect = matchRedirect(redirects, url.pathname);
    if (redirect) {
      if (redirect.status >= 300 && redirect.status < 400) {
        res.writeHead(redirect.status, {
          Location: `${redirect.location}${url.search}`,
          'Cache-Control': 'no-store',
        });
        res.end();
        return;
      }
      // Rewrite / proxy rules (status 200) resolve the destination as a path.
      const target = new URL(redirect.location, 'http://localhost');
      const proxied = resolvePath(distDir, target.pathname);
      if (proxied && proxied.file) {
        sendFile(req, res, 200, proxied.file);
        return;
      }
    }

    const resolved = resolvePath(distDir, url.pathname);
    if (resolved && resolved.file) {
      sendFile(req, res, 200, resolved.file);
      return;
    }
    if (resolved && resolved.redirect) {
      res.writeHead(resolved.redirect.status, {
        Location: `${resolved.redirect.location}${url.search}`,
        'Cache-Control': 'no-store',
      });
      res.end();
      return;
    }

    const notFound = path.join(distDir, '404.html');
    if (isFile(notFound)) {
      sendFile(req, res, 404, notFound);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 4173;
  createDistServer().listen(port, '127.0.0.1', () => {
    console.log(`Serving ${DEFAULT_DIST} at http://127.0.0.1:${port}/ (Cloudflare Pages resolution rules)`);
  });
}
