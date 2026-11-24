#!/usr/bin/env node
/**
 * Build-output SEO audit for GlobeCareer.
 *
 * Reads the prerendered HTML in dist/ (what Cloudflare Pages actually serves)
 * and reports factual, measurable findings:
 *
 *   - duplicate or missing titles / meta descriptions
 *   - title and description length outside the usual SERP range
 *   - pages without exactly one <h1>
 *   - missing or self-inconsistent canonical URLs
 *   - accidental noindex on indexable pages
 *   - invalid or duplicated JSON-LD blocks
 *   - og:image / twitter:image that are not absolute URLs
 *   - sitemap entries that do not map to an indexable page, and indexable
 *     pages missing from the sitemap
 *   - internal links that point at nothing (real 404s)
 *   - orphan pages with no internal inbound link
 *
 * Nothing is changed. Exit code is non-zero only for hard failures
 * (broken internal link, missing canonical, noindex on an indexable page),
 * so it can guard a deploy; the rest is reported as warnings.
 *
 * Usage: npm run audit:seo
 */
import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const BASE = 'https://globecareer.online';

const TITLE_MIN = 30;
const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 165;

const warnings = [];
const errors = [];
const warn = (page, message) => warnings.push({ page, message });
const fail = (page, message) => errors.push({ page, message });

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function listHtml(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await listHtml(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** dist/country/us.html -> /country/us, dist/index.html -> / */
function urlOfFile(file) {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/\.html$/, '')}`;
}

const decode = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, 'i'));
  return match ? decode(match[1]).trim() : null;
};

const text = (html) =>
  decode(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();

// ---------------------------------------------------------------------------
// Read every page
// ---------------------------------------------------------------------------

const files = await listHtml(DIST);
const pages = new Map();

for (const file of files) {
  const url = urlOfFile(file);
  const html = await readFile(file, 'utf8');
  const head = (html.match(/<head[^>]*>([\s\S]*?)<\/head>/i) || [, ''])[1];

  const titleMatch = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? text(titleMatch[1]) : null;

  const metaTags = head.match(/<meta\b[^>]*>/gi) || [];
  const findMeta = (key, value) =>
    metaTags.find((tag) => (attr(tag, key) || '').toLowerCase() === value.toLowerCase()) || null;

  const descriptionTag = findMeta('name', 'description');
  const robotsTag = findMeta('name', 'robots');
  const ogImageTag = findMeta('property', 'og:image');
  const twitterImageTag = findMeta('name', 'twitter:image');
  const ogTitleTag = findMeta('property', 'og:title');
  const ogTypeTag = findMeta('property', 'og:type');

  const canonicalTag = (head.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i) || [])[0] || null;

  // Strip script/style first: the file:// launcher fallback in index.html is a
  // JS string containing markup, which is not part of the rendered document.
  const visibleHtml = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');

  const h1s = [...visibleHtml.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1]));
  const h2Count = (visibleHtml.match(/<h2\b/gi) || []).length;

  const ldBlocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);

  const hrefs = [...html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["']/gi)].map((m) => m[1]);

  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)];
  const imgNoAlt = imgs.filter((tag) => !/\balt\s*=/.test(tag[0])).length;

  pages.set(url, {
    file,
    url,
    title,
    description: descriptionTag ? attr(descriptionTag, 'content') : null,
    robots: robotsTag ? attr(robotsTag, 'content') : null,
    canonical: canonicalTag ? attr(canonicalTag, 'href') : null,
    ogImage: ogImageTag ? attr(ogImageTag, 'content') : null,
    twitterImage: twitterImageTag ? attr(twitterImageTag, 'content') : null,
    hasOgTitle: Boolean(ogTitleTag),
    ogType: ogTypeTag ? attr(ogTypeTag, 'content') : null,
    h1s,
    h2Count,
    ldBlocks,
    hrefs,
    imgCount: imgs.length,
    imgNoAlt,
    wordCount: text(html.replace(/<head[\s\S]*?<\/head>/i, '')).split(' ').filter(Boolean).length,
  });
}

const isIndexable = (page) => !/(noindex)/i.test(page.robots || '');

// ---------------------------------------------------------------------------
// Metadata checks
// ---------------------------------------------------------------------------

const byTitle = new Map();
const byDescription = new Map();
const aliasPages = [];

for (const page of pages.values()) {
  const label = page.url;

  if (!page.title) fail(label, 'missing <title>');
  else {
    if (isIndexable(page) && page.title.length > TITLE_MAX) warn(label, `title is ${page.title.length} chars (may truncate in SERPs)`);
    if (isIndexable(page) && page.title.length < TITLE_MIN) warn(label, `title is only ${page.title.length} chars`);
    if (page.canonical === `${BASE}${page.url}`) byTitle.set(page.title, [...(byTitle.get(page.title) || []), label]);
  }

  if (!page.description) {
    if (isIndexable(page)) fail(label, 'missing meta description');
  } else {
    if (isIndexable(page) && page.description.length > DESC_MAX) warn(label, `description is ${page.description.length} chars (may truncate)`);
    if (isIndexable(page) && page.description.length < DESC_MIN) warn(label, `description is only ${page.description.length} chars`);
    if (page.canonical === `${BASE}${page.url}`) {
      byDescription.set(page.description, [...(byDescription.get(page.description) || []), label]);
    }
  }

  if (page.h1s.length === 0) fail(label, 'no <h1>');
  if (page.h1s.length > 1) warn(label, `${page.h1s.length} <h1> elements`);
  if (page.h1s.length === 1 && page.title && page.h1s[0].toLowerCase() === page.title.toLowerCase()) {
    warn(label, '<h1> is identical to <title>');
  }
  if (page.h2Count === 0 && isIndexable(page)) warn(label, 'no <h2> — heading hierarchy is flat');

  if (!page.canonical) {
    if (isIndexable(page)) fail(label, 'missing canonical link');
  } else if (!page.canonical.startsWith(BASE)) {
    fail(label, `canonical is not absolute on ${BASE}: ${page.canonical}`);
  } else if (isIndexable(page) && page.canonical !== `${BASE}${page.url}`) {
    // Alias URLs are deliberate: they serve canonical content and 301/serve the
    // preferred URL. Counted, not warned, so real issues stay visible.
    aliasPages.push(label);
  }

  if (!page.robots && isIndexable(page)) warn(label, 'no robots meta (inherits index, follow from robots.txt)');

  if (page.ogImage && !/^https?:\/\//i.test(page.ogImage)) fail(label, `og:image is not absolute: ${page.ogImage}`);
  if (page.twitterImage && !/^https?:\/\//i.test(page.twitterImage)) fail(label, `twitter:image is not absolute: ${page.twitterImage}`);
  if (isIndexable(page) && !page.ogImage) warn(label, 'no og:image');
  if (isIndexable(page) && !page.hasOgTitle) warn(label, 'no og:title');

  if (page.imgNoAlt > 0) warn(label, `${page.imgNoAlt}/${page.imgCount} <img> without alt`);

  if (page.ldBlocks.length === 0 && isIndexable(page)) warn(label, 'no JSON-LD structured data');
  const seenSchemas = new Set();
  for (const block of page.ldBlocks) {
    let parsed;
    try {
      parsed = JSON.parse(block);
    } catch (error) {
      fail(label, `invalid JSON-LD: ${String(error.message)}`);
      continue;
    }
    const nodes = parsed['@graph'] ? parsed['@graph'] : [parsed];
    for (const node of nodes) {
      const type = Array.isArray(node['@type']) ? node['@type'].join(',') : node['@type'];
      if (!type) continue;
      if (seenSchemas.has(type)) warn(label, `duplicate ${type} JSON-LD node on the page`);
      seenSchemas.add(type);
    }
  }
  if (page.ldBlocks.length > 1) warn(label, `${page.ldBlocks.length} separate JSON-LD blocks (prefer one @graph)`);

  if (isIndexable(page) && page.wordCount < 200) warn(label, `only ${page.wordCount} words in rendered HTML`);
}

for (const [title, urls] of byTitle) {
  if (urls.length > 1) warn(urls.join(', '), `duplicate title across ${urls.length} pages: "${title}"`);
}
for (const [, urls] of byDescription) {
  if (urls.length > 1) warn(urls.join(', '), `duplicate meta description across ${urls.length} pages`);
}

// ---------------------------------------------------------------------------
// robots.txt / sitemap
// ---------------------------------------------------------------------------

const robotsTxt = await readFile(path.join(DIST, 'robots.txt'), 'utf8').catch(() => '');
if (!robotsTxt) fail('robots.txt', 'robots.txt is missing from dist');
else {
  if (!/sitemap:/i.test(robotsTxt)) fail('robots.txt', 'no Sitemap: directive');
  // Only the generic `User-agent: *` group decides default crawl access.
  const groups = robotsTxt.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  const wildcardBlock = groups.find((block) => /^(?:[^\n]*\n)*?User-agent:\s*\*\s*$/im.test(block));
  const wildcardText = wildcardBlock || '';
  if (/^\s*Disallow:\s*\/\s*$/im.test(wildcardText)) fail('robots.txt', 'the default agent group disallows the entire site');
  if (!wildcardBlock) fail('robots.txt', 'no User-agent: * group');
  else if (!/Disallow:\s*\/admin/i.test(wildcardText)) warn('robots.txt', 'default agent group does not disallow /admin');
}

const sitemapXml = await readFile(path.join(DIST, 'sitemap.xml'), 'utf8').catch(() => '');
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1].trim()));
if (sitemapUrls.length === 0) fail('sitemap.xml', 'sitemap has no <loc> entries');

const sitemapSet = new Set(sitemapUrls);
const indexableUrls = [...pages.values()].filter(isIndexable).map((p) => `${BASE}${p.url}`);

for (const loc of sitemapUrls) {
  if (!loc.startsWith(BASE)) {
    fail('sitemap.xml', `entry not on canonical host: ${loc}`);
    continue;
  }
  const rel = loc.slice(BASE.length) || '/';
  const page = pages.get(rel);
  if (!page) {
    fail('sitemap.xml', `entry has no prerendered page: ${loc}`);
    continue;
  }
  if (!isIndexable(page)) fail('sitemap.xml', `entry is noindex: ${loc}`);
  if (page.canonical && page.canonical !== loc) fail('sitemap.xml', `entry is not self-canonical (${page.canonical}): ${loc}`);
}

const sitemapDupes = sitemapUrls.filter((loc, index) => sitemapUrls.indexOf(loc) !== index);
if (sitemapDupes.length) fail('sitemap.xml', `${sitemapDupes.length} duplicate entries`);

for (const loc of indexableUrls) {
  // Alias pages are indexable HTML but self-canonicalise to another URL, so they
  // belong only in that other URL's sitemap entry, never as an entry of their own.
  const page = pages.get(loc.slice(BASE.length) || '/');
  const selfCanonical = page && page.canonical === loc;
  if (!selfCanonical) continue;
  if (!sitemapSet.has(loc) && loc !== `${BASE}/404` && !loc.startsWith(`${BASE}/admin`)) {
    warn('sitemap.xml', `indexable page missing from sitemap: ${loc}`);
  }
}

// ---------------------------------------------------------------------------
// Internal links and orphans
// ---------------------------------------------------------------------------

const redirectsRaw = await readFile(path.join(DIST, '_redirects'), 'utf8').catch(() => '');
const redirectSources = new Set(
  redirectsRaw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split(/\s+/)[0])
);

const staticExt = /\.(png|jpe?g|webp|svg|ico|gif|xml|txt|json|css|js|webmanifest|pdf|docx)$/i;
const skipPrefixes = ['/api/', '/assets/aistudio/'];

const inbound = new Map();

for (const page of pages.values()) {
  for (const raw of page.hrefs) {
    if (!raw.startsWith('/') || raw.startsWith('//')) continue;
    if (skipPrefixes.some((prefix) => raw.startsWith(prefix))) continue;

    const [pathPart] = raw.split(/[?#]/);
    const cleanPath = pathPart.replace(/\/+$/, '') || '/';

    if (staticExt.test(cleanPath)) {
      if (!(await exists(path.join(DIST, cleanPath.replace(/^\//, ''))))) {
        fail(page.url, `internal link to missing asset: ${raw}`);
      }
      continue;
    }

    const htmlTarget = cleanPath === '/' ? 'index.html' : `${cleanPath.replace(/^\//, '')}.html`;
    const nested = cleanPath === '/' ? 'index.html' : `${cleanPath.replace(/^\//, '')}/index.html`;
    const targetExists = (await exists(path.join(DIST, htmlTarget))) || (await exists(path.join(DIST, nested)));

    if (!targetExists && !redirectSources.has(cleanPath)) {
      // Extension-less links to app routes that are not prerendered are 404s.
      fail(page.url, `internal link to missing page: ${raw}`);
      continue;
    }

    if (targetExists) inbound.set(cleanPath, (inbound.get(cleanPath) || 0) + 1);
  }
}

const canonicalIndexable = [...pages.values()].filter(
  (page) => isIndexable(page) && page.canonical === `${BASE}${page.url}`
);

for (const page of canonicalIndexable) {
  if (page.url === '/') continue;
  if (!inbound.get(page.url)) warn(page.url, 'orphan: no internal inbound link from another page');
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const group = (list) => {
  const map = new Map();
  for (const item of list) map.set(item.message, [...(map.get(item.message) || []), item.page]);
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
};

console.log(`\n[crawl] ${pages.size} prerendered HTML pages, ${sitemapUrls.length} sitemap URLs, ${canonicalIndexable.length} indexable canonical pages`);
console.log(`[crawl] ${indexableUrls.length} pages are indexable, ${pages.size - indexableUrls.length} are noindex`);
console.log(`[crawl] ${aliasPages.length} alias URLs self-canonicalise to a preferred URL (expected duplicate-URL consolidation)`);

const errorGroups = group(errors);
const warningGroups = group(warnings);

if (errorGroups.length) {
  console.log(`\nFAIL (${errors.length} issue(s))`);
  for (const [message, urls] of errorGroups) {
    console.log(`  - ${message}`);
    for (const url of urls.slice(0, 8)) console.log(`      ${url}`);
    if (urls.length > 8) console.log(`      ... and ${urls.length - 8} more`);
  }
} else {
  console.log('\nFAIL  none');
}

if (warningGroups.length) {
  console.log(`\nWARN (${warnings.length} issue(s) across ${new Set(warnings.map((w) => w.page)).size} page(s))`);
  for (const [message, urls] of warningGroups) {
    console.log(`  - ${message}`);
    for (const url of urls.slice(0, 6)) console.log(`      ${url}`);
    if (urls.length > 6) console.log(`      ... and ${urls.length - 6} more`);
  }
} else {
  console.log('\nWARN  none');
}

process.exit(errors.length ? 1 : 0);
