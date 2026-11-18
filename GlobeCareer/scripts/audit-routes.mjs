#!/usr/bin/env node
/**
 * Route audit: serves the built output with Cloudflare Pages resolution rules
 * and checks every sitemap URL, every prerendered path and a set of URLs that
 * must 404.
 *
 * Usage: npm run audit:routes   (after npm run build)
 */
import { createDistServer } from './serve-dist.mjs';
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const BASE = 'https://globecareer.online';
const STAMP = new Date().toISOString().slice(0, 10);

const BOGUS_PATHS = [
  '/this-page-does-not-exist',
  '/pricing',
  '/plans',
  '/resume-examples/not-a-real-role',
  '/country/zz',
  '/resume-builder/extra/segment',
];

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function firstMatch(html, regex) {
  const match = html.match(regex);
  return match ? decodeEntities(match[1]).trim() : '';
}

function textOf(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
  ).trim();
}

async function readSiteMapUrls() {
  const xml = await readFile(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return { xml, urls };
}

async function walkHtml(dir, prefix = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    const dirPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await walkHtml(dirPath, `${prefix}/${entry.name}`)));
    } else if (entry.name === 'index.html') {
      found.push(prefix === '' ? '/' : prefix.replace(/\/+/g, '/'));
    }
  }
  return found;
}

function canonicalPathOf(url) {
  return url.replace(BASE, '') || '/';
}

const { xml: sitemapXml, urls: sitemapUrls } = await readSiteMapUrls();
const prerendered = await walkHtml(DIST);
const prerenderedSet = new Set(prerendered);
const sitemapSet = new Set(sitemapUrls);

const server = createDistServer(DIST);
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
const origin = `http://127.0.0.1:${port}`;

const results = [];
const problems = [];

async function inspect(urlPath, expectedStatus) {
  const response = await fetch(`${origin}${urlPath}`, { redirect: 'manual' });
  const html = await response.text();
  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = firstMatch(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  const canonical = firstMatch(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
  const robots = firstMatch(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i);
  // Markup inside <script>/<style> (inline fallbacks, JSON-LD) is not a heading.
  const markup = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const h1Count = (markup.match(/<h1[\s>]/gi) || []).length;
  const h1 = firstMatch(markup, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const schemaScripts = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  let invalidSchema = 0;
  for (const [, body] of schemaScripts) {
    try {
      JSON.parse(body);
    } catch {
      invalidSchema += 1;
    }
  }
  const hasBundle = /<script[^>]+type="module"[^>]+src="\/assets\/[^"]+\.js"/i.test(html);
  const spinner = html.includes('Loading module...');
  const text = textOf(html);
  const record = {
    path: urlPath,
    status: response.status,
    expectedStatus,
    title,
    description,
    descriptionLength: description.length,
    canonical,
    robots,
    h1Count,
    h1,
    schemaBlocks: schemaScripts.length,
    invalidSchema,
    hasBundle,
    spinner,
    textChars: text.length,
  };
  return record;
}

// 1. Sitemap URLs
for (const url of sitemapUrls) {
  const urlPath = canonicalPathOf(url);
  const record = await inspect(urlPath, 200);
  record.inSitemap = true;
  results.push(record);

  if (record.status !== 200) problems.push(`${urlPath}: HTTP ${record.status}, expected 200`);
  if (!record.title) problems.push(`${urlPath}: missing <title>`);
  if (!record.description) problems.push(`${urlPath}: missing meta description`);
  if (!record.canonical) problems.push(`${urlPath}: missing canonical`);
  else if (record.canonical !== `${BASE}${urlPath === '/' ? '/' : urlPath}`) {
    problems.push(`${urlPath}: canonical points to ${record.canonical}`);
  }
  if (record.robots && !/index/.test(record.robots)) problems.push(`${urlPath}: robots says "${record.robots}"`);
  if (record.h1Count !== 1) problems.push(`${urlPath}: ${record.h1Count} <h1> elements, expected 1`);
  if (!record.hasBundle) problems.push(`${urlPath}: app bundle script missing (no hydration possible)`);
  if (record.spinner) problems.push(`${urlPath}: rendered loading spinner instead of content`);
  if (record.invalidSchema) problems.push(`${urlPath}: ${record.invalidSchema} invalid JSON-LD block(s)`);
  if (record.textChars < 400) problems.push(`${urlPath}: only ${record.textChars} characters of text`);
}

// 2. Duplicate metadata within the sitemap
const titleMap = new Map();
const descriptionMap = new Map();
for (const record of results.filter((r) => r.status === 200)) {
  if (record.title) titleMap.set(record.title, [...(titleMap.get(record.title) || []), record.path]);
  if (record.description) {
    descriptionMap.set(record.description, [...(descriptionMap.get(record.description) || []), record.path]);
  }
}
for (const [title, paths] of titleMap) {
  if (paths.length > 1) problems.push(`Duplicate <title> across ${paths.join(', ')}: "${title}"`);
}
for (const [description, paths] of descriptionMap) {
  if (paths.length > 1) problems.push(`Duplicate meta description across ${paths.join(', ')}`);
}

// 3. Prerendered paths not listed in the sitemap (aliases) must still serve HTML
const aliasPaths = prerendered.filter((p) => !sitemapSet.has(`${BASE}${p === '/' ? '/' : p}`) && !sitemapSet.has(`${BASE}${p}`));
for (const aliasPath of aliasPaths) {
  const record = await inspect(aliasPath, 200);
  record.inSitemap = false;
  results.push(record);
  if (record.status !== 200) problems.push(`${aliasPath} (alias): HTTP ${record.status}`);
  if (!record.canonical) problems.push(`${aliasPath} (alias): missing canonical`);
  if (record.spinner) problems.push(`${aliasPath} (alias): loading spinner instead of content`);
}

// 4. /admin must be reachable but non-indexable
const admin = await inspect('/admin', 200);
results.push({ ...admin, inSitemap: false });
if (admin.status !== 200) problems.push(`/admin: HTTP ${admin.status}`);
if (!/noindex/.test(admin.robots)) problems.push(`/admin: robots is "${admin.robots}", expected noindex`);

// 5. URLs that must 404
for (const bogus of BOGUS_PATHS) {
  const record = await inspect(bogus, 404);
  results.push({ ...record, inSitemap: false, must404: true });
  if (record.status !== 404) problems.push(`${bogus}: HTTP ${record.status}, expected 404`);
  if (!/noindex/.test(record.robots)) problems.push(`${bogus}: 404 document is indexable`);
}

// 6. Sitemap integrity
const duplicateLocCount = sitemapUrls.length - new Set(sitemapUrls).size;
if (duplicateLocCount > 0) problems.push(`sitemap.xml contains ${duplicateLocCount} duplicate <loc> entries`);
if (!sitemapXml.trimEnd().endsWith('</urlset>')) problems.push('sitemap.xml does not end with </urlset>');
if (!sitemapXml.trimStart().startsWith('<?xml')) problems.push('sitemap.xml is missing the XML declaration');
const openUrlTags = (sitemapXml.match(/<url>/g) || []).length;
const closeUrlTags = (sitemapXml.match(/<\/url>/g) || []).length;
if (openUrlTags !== closeUrlTags) problems.push(`sitemap.xml has ${openUrlTags} <url> and ${closeUrlTags} </url> tags`);
if (openUrlTags !== sitemapUrls.length) problems.push('sitemap.xml <url> count does not match <loc> count');
for (const url of sitemapUrls) {
  if (!url.startsWith(`${BASE}/`)) problems.push(`sitemap entry is not on the canonical host: ${url}`);
  if (!prerenderedSet.has(canonicalPathOf(url))) problems.push(`sitemap URL has no prerendered HTML: ${url}`);
}

// 7. robots.txt
const robotsTxt = await readFile(path.join(ROOT, 'public', 'robots.txt'), 'utf8');
if (!robotsTxt.includes(`Sitemap: ${BASE}/sitemap.xml`)) problems.push('robots.txt is missing the Sitemap directive');
for (const agent of ['OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot', 'Google-Extended']) {
  if (!robotsTxt.includes(agent)) problems.push(`robots.txt no longer mentions ${agent}`);
}
const builtRobots = await readFile(path.join(DIST, 'robots.txt'), 'utf8').catch(() => '');
if (builtRobots !== robotsTxt) problems.push('dist/robots.txt differs from public/robots.txt');

server.close();

// --- Reporting -------------------------------------------------------------

const csvHeader = 'path,status,expected,in_sitemap,title,description_length,canonical,robots,h1_count,schema_blocks,invalid_schema,text_chars';
const csvRows = results.map((r) =>
  [
    r.path,
    r.status,
    r.expectedStatus,
    r.inSitemap ? 'yes' : 'no',
    `"${(r.title || '').replace(/"/g, '""')}"`,
    r.descriptionLength,
    r.canonical,
    r.robots,
    r.h1Count,
    r.schemaBlocks,
    r.invalidSchema,
    r.textChars,
  ].join(',')
);

await writeFile(path.join(ROOT, `route_audit_${STAMP}.csv`), [csvHeader, ...csvRows].join('\n') + '\n', 'utf8');

const summary = {
  generatedAt: new Date().toISOString(),
  sitemapUrls: sitemapUrls.length,
  prerenderedPages: prerendered.length,
  testedPaths: results.length,
  expected404: BOGUS_PATHS.length,
  failures: problems.length,
  problems,
};
await writeFile(path.join(ROOT, `route_audit_${STAMP}.json`), JSON.stringify(summary, null, 2), 'utf8');

console.log(`Sitemap URLs:        ${sitemapUrls.length}`);
console.log(`Prerendered pages:   ${prerendered.length}`);
console.log(`Paths tested:        ${results.length}`);
console.log(`Problems:            ${problems.length}`);
if (problems.length) {
  for (const problem of problems) console.log(`  - ${problem}`);
  process.exit(1);
}
console.log('All route, metadata, canonical, sitemap and 404 checks passed.');
process.exit(0);
