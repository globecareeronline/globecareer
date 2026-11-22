#!/usr/bin/env node
/**
 * Post-build CSS inliner for GlobeCareer.
 *
 * Every prerendered page links one hashed stylesheet in <head>, which makes that
 * request render-blocking: first paint cannot happen until the extra round trip
 * finishes. The stylesheet is small and shared by all pages, so writing it into
 * each page as an inline <style> block removes the request from the critical
 * path without changing a single rule, class or selector.
 *
 * Output is identical in appearance and behaviour; only the delivery changes.
 *
 * Run automatically by `npm run build` after `scripts/prerender.mjs`.
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = path.join(process.cwd(), 'dist');
const LINK_RE = /<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi;
const HREF_RE = /\bhref=["']([^"']+)["']/i;

async function listHtml(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listHtml(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const cssCache = new Map();
async function readCss(href) {
  const clean = href.split('?')[0];
  if (cssCache.has(clean)) return cssCache.get(clean);
  const rel = clean.replace(/^\//, '');
  const file = path.join(DIST, rel);
  let css = null;
  try {
    css = await readFile(file, 'utf8');
  } catch {
    css = null;
  }
  if (css && (css.includes('@import') || css.includes('</style'))) {
    // Never inline something that needs its own fetch or would break the tag.
    css = null;
  }
  cssCache.set(clean, css);
  return css;
}

const files = await listHtml(DIST);
let inlined = 0;
let skipped = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');
  const tags = html.match(LINK_RE) || [];
  if (tags.length === 0) continue;

  let out = html;
  let changed = false;
  for (const tag of tags) {
    const href = (tag.match(HREF_RE) || [])[1];
    if (!href || !href.startsWith('/assets/') || !href.endsWith('.css')) continue;
    const css = await readCss(href);
    if (!css) {
      skipped += 1;
      continue;
    }
    out = out.replace(tag, `<style>${css}</style>`);
    changed = true;
    inlined += 1;
  }
  if (changed) await writeFile(file, out);
}

console.log(`[inline-css] ${inlined} stylesheet link(s) inlined across ${files.length} page(s)${skipped ? `, ${skipped} left external` : ''}.`);
