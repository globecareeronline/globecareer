#!/usr/bin/env node
/**
 * IndexNow submission for GlobeCareer.
 *
 * IndexNow is a free, open protocol: a site publishes a key file at
 * https://<host>/<key>.txt and then POSTs changed URLs to an IndexNow
 * endpoint. Bing, Yandex, Seznam and Naver consume it, which removes the need
 * to file manual URL-submission requests after every publish.
 *
 * The key is PUBLIC by design - it is hosted at a public URL and only proves
 * that whoever submits a URL can also write files to the host. It is therefore
 * not a secret, but this script still does not hardcode it: it reads the key
 * from the key file that already lives in public/, so there is exactly one
 * source of truth.
 *
 * Usage (run AFTER a production deploy, never before):
 *   npm run submit:indexnow                 # submit every URL in the live sitemap
 *   npm run submit:indexnow -- /path /other # submit only the given paths
 *   npm run submit:indexnow -- --dry-run    # print what would be sent
 *
 * IndexNow limits: one POST may carry up to 10,000 URLs, and the key file must
 * be reachable at the host root. Do not run this repeatedly for URLs that have
 * not changed.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const HOST = 'globecareer.online';
const ORIGIN = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const requestedPaths = args.filter((a) => !a.startsWith('--'));

async function findKey() {
  const entries = await readdir(PUBLIC_DIR);
  const candidates = entries.filter((name) => /^[a-f0-9]{8,128}\.txt$/i.test(name));
  if (candidates.length !== 1) {
    throw new Error(
      `Expected exactly one IndexNow key file (public/<key>.txt) in ${PUBLIC_DIR}, found ${candidates.length}.`
    );
  }
  const key = path.basename(candidates[0], '.txt');
  const contents = (await readFile(path.join(PUBLIC_DIR, candidates[0]), 'utf8')).trim();
  if (contents !== key) {
    throw new Error(`Key file public/${candidates[0]} does not contain its own file name.`);
  }
  return key;
}

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not read ${ORIGIN}/sitemap.xml (HTTP ${res.status})`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
}

const key = await findKey();
const keyLocation = `${ORIGIN}/${key}.txt`;

let urlList;
if (requestedPaths.length > 0) {
  urlList = requestedPaths.map((p) => (p.startsWith('http') ? p : `${ORIGIN}${p.startsWith('/') ? '' : '/'}${p}`));
} else {
  urlList = await sitemapUrls();
}

urlList = [...new Set(urlList)];
if (urlList.length === 0) throw new Error('No URLs to submit.');
if (urlList.length > 10000) throw new Error(`IndexNow accepts at most 10,000 URLs per request; got ${urlList.length}.`);

const body = { host: HOST, key, keyLocation, urlList };

console.log(`[indexnow] key file : ${keyLocation}`);
console.log(`[indexnow] endpoint : ${ENDPOINT}`);
console.log(`[indexnow] urls     : ${urlList.length}`);

if (dryRun) {
  console.log('[indexnow] --dry-run: nothing sent.');
  console.log(JSON.stringify(body, null, 2));
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

// 200 = submitted, 202 = accepted but key validation is still pending.
const detail = await res.text();
console.log(`[indexnow] HTTP ${res.status} ${res.statusText}${detail ? ` - ${detail.slice(0, 300)}` : ''}`);
if (res.status !== 200 && res.status !== 202) {
  throw new Error(`IndexNow rejected the submission (HTTP ${res.status}).`);
}
