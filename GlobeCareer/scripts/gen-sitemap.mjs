#!/usr/bin/env node
/**
 * Regenerates public/sitemap.xml from the application's own route tables.
 *
 * The sitemap is derived, never hand-maintained: the canonical paths come from
 * the same PATH_TO_PAGE / PAGE_TO_PATH maps the router uses, plus the country,
 * role-example and guide-article data. Adding a page or an article therefore
 * cannot leave the sitemap out of date.
 *
 * Existing <lastmod> values are preserved so a rebuild does not falsely claim
 * that unchanged pages were modified; new URLs take their own publish date.
 *
 * Run automatically by `npm run build` before `vite build`. Read back by
 * scripts/audit-routes.mjs, which asserts every entry resolves to 200 HTML.
 */
import { createServer } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const BASE = 'https://globecareer.online';
const SITEMAP = path.join(ROOT, 'public', 'sitemap.xml');

// Paths that must never appear in the sitemap: the two homepage-shaped URLs
// that 404 by design, and the internal admin dashboard, which is noindex.
const SKIP_PATHS = new Set(['/pricing', '/plans', '/admin']);

const vite = await createServer({
  root: ROOT,
  configFile: path.join(ROOT, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const app = await vite.ssrLoadModule('/src/App.tsx');
const { PATH_TO_PAGE, PAGE_TO_PATH } = app;
const { COUNTRIES } = await vite.ssrLoadModule('/src/data/countries.ts');
const { ROLE_EXAMPLES } = await vite.ssrLoadModule('/src/data/roleExamples.ts');
const { ARTICLES, BLOG_PATH } = await vite.ssrLoadModule('/src/data/articles/index.ts');

await vite.close().catch(() => {});

/** path -> { lastmod, changefreq, priority } */
const entries = new Map();

function add(pathname, meta) {
  if (entries.has(pathname)) return;
  entries.set(pathname, meta);
}

// 1. Static page canonicals.
for (const key of new Set(Object.values(PATH_TO_PAGE))) {
  const canonical = PAGE_TO_PATH[key];
  if (!canonical || SKIP_PATHS.has(canonical)) continue;
  const priority = canonical === '/' ? '1.0' : canonical === BLOG_PATH ? '0.8' : '0.9';
  const changefreq = canonical === '/' ? 'daily' : canonical === BLOG_PATH ? 'weekly' : 'monthly';
  add(canonical, { changefreq, priority });
}

// 2. Country guides.
for (const country of COUNTRIES) add(`/country/${country.id}`, { changefreq: 'monthly', priority: '0.7' });

// 3. Role resume examples.
for (const role of ROLE_EXAMPLES) add(`/resume-examples/${role.slug}`, { changefreq: 'monthly', priority: '0.7' });

// 4. Guide articles.
for (const article of ARTICLES) {
  add(`${BLOG_PATH}/${article.slug}`, {
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: article.updated,
  });
}

// --- Preserve existing lastmod values -------------------------------------
const previous = await readFile(SITEMAP, 'utf8').catch(() => '');
const previousBlocks = new Map();
for (const block of previous.split('<url>').slice(1)) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/);
  const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/);
  if (loc) previousBlocks.set(loc[1].trim(), lastmod ? lastmod[1].trim() : null);
}

const today = new Date().toISOString().slice(0, 10);
const latestArticle = ARTICLES.map((a) => a.updated).sort().at(-1) || today;

const order = (p) => {
  if (p === '/') return 0;
  if (p === BLOG_PATH) return 1;
  if (p.startsWith('/blog/')) return 2;
  if (p.startsWith('/country/')) return 4;
  if (p.startsWith('/resume-examples/')) return 5;
  return 3;
};

const urls = [...entries.entries()]
  .map(([pathname, meta]) => ({ pathname, ...meta }))
  .sort((a, b) => order(a.pathname) - order(b.pathname) || a.pathname.localeCompare(b.pathname));

const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];

for (const url of urls) {
  const absolute = `${BASE}${url.pathname}`;
  const previousLastmod = previousBlocks.get(absolute);
  const lastmod = url.lastmod || previousLastmod || (url.pathname === BLOG_PATH ? latestArticle : today);
  lines.push('  <url>');
  lines.push(`    <loc>${absolute}</loc>`);
  lines.push(`    <lastmod>${lastmod}</lastmod>`);
  lines.push(`    <changefreq>${url.changefreq}</changefreq>`);
  lines.push(`    <priority>${url.priority}</priority>`);
  lines.push('  </url>');
}
lines.push('</urlset>', '');

await writeFile(SITEMAP, lines.join('\n'), 'utf8');

const added = urls.filter((u) => !previousBlocks.has(`${BASE}${u.pathname}`)).length;
const removed = [...previousBlocks.keys()].filter((loc) => !urls.some((u) => `${BASE}${u.pathname}` === loc)).length;
console.log(`[sitemap] ${urls.length} URLs written (${added} added, ${removed} removed)`);
