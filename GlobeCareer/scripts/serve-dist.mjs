#!/usr/bin/env node
/**
 * Minimal static server that mirrors how Cloudflare Pages resolves a request
 * against the build output:
 *   1. exact file                     -> 200
 *   2. <path>/index.html (clean URL)  -> 200
 *   3. <path>.html                    -> 200
 *   4. otherwise                      -> 404.html with status 404
 *
 * Used by `npm run audit:routes` and for local verification only.
 */
import http from 'node:http';
import zlib from 'node:zlib';
import { createReadStream, existsSync, statSync } from 'node:fs';
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

function resolveFile(distDir, pathname) {
  const decoded = decodeURIComponent(pathname.split('?')[0]);
  const candidates = [];
  if (decoded.endsWith('/')) {
    candidates.push(path.join(distDir, decoded, 'index.html'));
  } else {
    candidates.push(path.join(distDir, decoded));
    candidates.push(path.join(distDir, decoded, 'index.html'));
    candidates.push(path.join(distDir, `${decoded}.html`));
  }
  for (const candidate of candidates) {
    if (!candidate.startsWith(distDir)) continue;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
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
  return http.createServer((req, res) => {
    const url = new URL(req.url || '/', 'http://localhost');
    const file = resolveFile(distDir, url.pathname);
    if (file) {
      sendFile(req, res, 200, file);
      return;
    }
    const notFound = path.join(distDir, '404.html');
    if (existsSync(notFound)) {
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
