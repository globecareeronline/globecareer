#!/usr/bin/env node
/**
 * Build-time prerenderer for GlobeCareer.
 *
 * The application is a client-rendered React SPA. This script mounts the real
 * App (same router, same SEO engine, same content components) inside jsdom for
 * every valid URL, then writes the resulting HTML to dist/<path>/index.html.
 *
 * Result: each route is served as real HTML with its own <title>, meta
 * description, canonical, robots directive, JSON-LD and body content — without
 * changing the client app, which still takes over on load via createRoot.
 *
 * Run automatically by `npm run build` after `vite build`.
 */
import { createServer } from 'vite';
import { JSDOM } from 'jsdom';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const BASE = 'https://globecareer.online';
const BASE_HOST_PATH = BASE;

// Paths that used to serve the homepage for a URL with no real content
// (there is no pricing or plan page on this site). They now 404.
const SKIP_PATHS = new Set(['/pricing', '/plans']);

const RENDER_TIMEOUT_MS = 20000;
const MIN_CONTENT_CHARS = 400;

function fail(message) {
  console.error(`\n[prerender] ERROR: ${message}`);
  process.exit(1);
}

const templatePath = path.join(DIST, 'index.html');
let template;
try {
  template = await readFile(templatePath, 'utf8');
} catch {
  fail('dist/index.html not found. Run `vite build` before prerendering.');
}
if (template.includes('data-prerendered="true"')) {
  fail('dist/index.html is already prerendered. Start from a clean `vite build` output.');
}

// ---------------------------------------------------------------------------
// Render environment
// ---------------------------------------------------------------------------

function installDom(html, url) {
  const dom = new JSDOM(html, { url, pretendToBeVisual: true });
  const { window } = dom;

  if (!window.matchMedia) {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() {
        return false;
      },
    });
  }

  class StubObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  window.IntersectionObserver = window.IntersectionObserver || StubObserver;
  window.ResizeObserver = window.ResizeObserver || StubObserver;
  // jsdom does not implement layout scrolling; the app calls these on mount.
  window.Element.prototype.scrollIntoView = function () {};
  window.scrollTo = () => {};
  window.scrollBy = () => {};
  window.alert = () => {};
  if (!window.navigator.clipboard) {
    Object.defineProperty(window.navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => {}, readText: async () => '' },
    });
  }

  const define = (name, value) => {
    try {
      Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
    } catch {
      /* read-only global in this runtime — the app does not depend on it */
    }
  };
  define('window', window);
  define('self', window);
  define('document', window.document);
  define('navigator', window.navigator);
  define('localStorage', window.localStorage);
  define('sessionStorage', window.sessionStorage);
  define('location', window.location);
  define('history', window.history);
  define('Node', window.Node);
  define('Element', window.Element);
  define('HTMLElement', window.HTMLElement);
  define('Event', window.Event);
  define('CustomEvent', window.CustomEvent);
  define('MouseEvent', window.MouseEvent);
  define('KeyboardEvent', window.KeyboardEvent);
  define('getComputedStyle', window.getComputedStyle.bind(window));
  define('matchMedia', window.matchMedia);
  define('requestAnimationFrame', window.requestAnimationFrame.bind(window));
  define('cancelAnimationFrame', window.cancelAnimationFrame.bind(window));
  define('IntersectionObserver', window.IntersectionObserver);
  define('ResizeObserver', window.ResizeObserver);
  define('scrollTo', window.scrollTo);

  return dom;
}

// ---------------------------------------------------------------------------
// Route inventory (imported from the app itself, not duplicated here)
// ---------------------------------------------------------------------------

const vite = await createServer({
  root: ROOT,
  configFile: path.join(ROOT, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const appModule = await vite.ssrLoadModule('/src/App.tsx');
const App = appModule.default;
const { PATH_TO_PAGE, PAGE_TO_PATH } = appModule;
const { COUNTRIES } = await vite.ssrLoadModule('/src/data/countries.ts');
const { ROLE_EXAMPLES } = await vite.ssrLoadModule('/src/data/roleExamples.ts');
const { ARTICLES, getArticlePath } = await vite.ssrLoadModule('/src/data/articles/index.ts');

const ReactMod = await import('react');
const React = ReactMod.default ?? ReactMod;
const { createRoot } = await import('react-dom/client');

const targets = [];
const seenTargets = new Set();

for (const key of new Set(Object.values(PATH_TO_PAGE))) {
  const canonical = PAGE_TO_PATH[key];
  if (!canonical || SKIP_PATHS.has(canonical)) continue;
  targets.push({ key, url: canonical, params: {} });
  seenTargets.add(canonical);
}
for (const country of COUNTRIES) {
  const url = `/country/${country.id}`;
  if (seenTargets.has(url)) continue;
  targets.push({ key: 'country-detail', url, params: { countryId: country.id } });
  seenTargets.add(url);
}
for (const role of ROLE_EXAMPLES) {
  const url = `/resume-examples/${role.slug}`;
  if (seenTargets.has(url)) continue;
  targets.push({ key: 'role-example', url, params: { roleSlug: role.slug } });
  seenTargets.add(url);
}
// Guide articles. The router resolves the slug from the jsdom URL, exactly as a
// real request would, so the rendered page and the client page cannot diverge.
for (const article of ARTICLES) {
  const url = getArticlePath(article.slug);
  if (seenTargets.has(url)) continue;
  targets.push({ key: 'article', url, params: { articleSlug: article.slug } });
  seenTargets.add(url);
}

// Alias paths (old or alternative slugs) are served the canonical page HTML,
// whose canonical tag already points at the single indexable URL.
const aliasesByTarget = new Map();
for (const [routePath, key] of Object.entries(PATH_TO_PAGE)) {
  if (SKIP_PATHS.has(routePath)) continue;
  const canonical = PAGE_TO_PATH[key];
  if (!canonical || canonical === routePath) continue;
  if (!aliasesByTarget.has(canonical)) aliasesByTarget.set(canonical, []);
  aliasesByTarget.get(canonical).push(routePath);
}

// ---------------------------------------------------------------------------
// Render one URL
// ---------------------------------------------------------------------------

async function renderRoute(target) {
  const url = `${BASE}${target.url}`;
  const dom = installDom(template, url);
  const { document } = dom.window;
  const container = document.getElementById('root');
  if (!container) throw new Error('template has no #root container');

  const root = createRoot(container);
  try {
    root.render(React.createElement(App));

    // The page is ready when the lazy route module has replaced the Suspense
    // fallback. Header/footer chrome alone is not enough: it renders before the
    // page chunk resolves, which is exactly what this check must exclude.
    const isReady = () => {
      const text = container.textContent || '';
      return (
        text.length > MIN_CONTENT_CHARS &&
        !text.includes('Loading module...') &&
        container.querySelector('h1') !== null
      );
    };

    const deadline = Date.now() + RENDER_TIMEOUT_MS;
    while (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (isReady()) {
        // Let mount effects (SEO head injection, secondary lazy modules) settle.
        await new Promise((resolve) => setTimeout(resolve, 150));
        if (isReady()) break;
      }
    }
    if (!isReady()) {
      throw new Error('page content did not render before the timeout');
    }

    const title = document.title;
    if (!title || title.length < 8) throw new Error('page title was not applied');
    if (!document.querySelector('link[rel="canonical"]')) throw new Error('canonical link missing');
    if (document.querySelectorAll('h1').length === 0) throw new Error('no <h1> rendered');
    if (document.body.textContent.includes('Something went wrong')) {
      throw new Error('error boundary content rendered');
    }

    prepareStaticShell(document);
    dom.window.document.documentElement.setAttribute('data-prerendered', 'true');
    const html = `<!doctype html>\n${dom.window.document.documentElement.outerHTML}\n`;
    return html;
  } finally {
    root.unmount();
    dom.window.close();
  }
}

/**
 * Keeps the prerendered markup visible while React boots.
 *
 * Without this the first React commit replaces the full page with the Suspense
 * fallback (a small spinner), which collapses the document and produces a large
 * layout shift on every lazy-loaded route. The static markup moves into a
 * sibling node; #root stays hidden until the real route content has mounted,
 * then the two swap in a single frame. If JavaScript never runs, the static
 * page simply stays on screen.
 */
function prepareStaticShell(document) {
  const container = document.getElementById('root');
  if (!container) return;

  const staticShell = document.createElement('div');
  staticShell.id = 'prerender';
  staticShell.innerHTML = container.innerHTML;
  container.innerHTML = '';
  container.setAttribute('data-prerender-pending', 'true');
  container.parentNode.insertBefore(staticShell, container);

  const style = document.createElement('style');
  style.textContent = '#root[data-prerender-pending]{display:none}';
  document.head.appendChild(style);

  const handoff = document.createElement('script');
  handoff.textContent = `(function(){var root=document.getElementById('root');var pre=document.getElementById('prerender');if(!root||!pre)return;function hasContent(){return root.childElementCount>0&&(root.textContent||'').trim().length>300;}function reveal(){if(!pre||!hasContent())return;if(pre.parentNode)pre.parentNode.removeChild(pre);pre=null;root.removeAttribute('data-prerender-pending');}var obs=new MutationObserver(reveal);obs.observe(root,{childList:true,subtree:true,characterData:true});var ticks=0;var timer=setInterval(function(){ticks++;reveal();if(!pre||ticks>50)clearInterval(timer);},100);})();`;
  document.body.appendChild(handoff);
}

async function writeRouteFile(routePath, html) {
  // Cloudflare Pages derives a page's canonical URL from the file name:
  // `foo.html` is served at `/foo` (200) and `foo/index.html` at `/foo/`, with
  // the other form 308-redirected. The canonicals, sitemap and internal links
  // all use extension-less URLs, so the build must emit `<path>.html`. Writing
  // `<path>/index.html` instead makes every canonical URL a 308 redirect.
  const relative = routePath === '/' ? 'index.html' : `${routePath.replace(/^\//, '')}.html`;
  const destination = path.join(DIST, relative);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html, 'utf8');
  return relative;
}

// ---------------------------------------------------------------------------
// Static 404 document (no app bundle: it must survive any JS failure)
// ---------------------------------------------------------------------------

const NOT_FOUND_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page not found (404) | GlobeCareer</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <style>
      :root { color-scheme: light dark; }
      body { margin: 0; font-family: system-ui, -apple-system, "Segoe UI", sans-serif; background: #fafafa; color: #171717; }
      @media (prefers-color-scheme: dark) { body { background: #0a0a0a; color: #f5f5f5; } }
      main { max-width: 640px; margin: 0 auto; padding: 96px 24px; }
      img { height: 40px; width: auto; margin-bottom: 32px; }
      p { line-height: 1.7; color: #525252; }
      @media (prefers-color-scheme: dark) { p { color: #a3a3a3; } }
      h1 { font-size: 28px; line-height: 1.25; margin: 0 0 12px; }
      ul { list-style: none; padding: 0; margin: 28px 0 0; display: grid; gap: 10px; }
      a { color: #2563eb; font-weight: 600; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .code { font-family: ui-monospace, monospace; font-size: 13px; background: rgba(127,127,127,0.15); padding: 2px 6px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <main>
      <a href="/"><img src="/globecareer-logo.png" alt="GlobeCareer" /></a>
      <h1>We could not find that page</h1>
      <p>The address may be mistyped, or the page may have moved. Nothing on this site is behind a paywall, so everything worth reading is one of the links below.</p>
      <ul>
        <li><a href="/">GlobeCareer home</a></li>
        <li><a href="/resume-builder">International resume builder</a></li>
        <li><a href="/resume-examples">Resume examples by role</a></li>
        <li><a href="/country-guides">Country CV and resume guides</a></li>
        <li><a href="/templates">Resume and CV templates</a></li>
        <li><a href="/ats-checker">ATS resume checker</a></li>
        <li><a href="/faq">Frequently asked questions</a></li>
      </ul>
      <p style="margin-top:28px;font-size:13px;">If you followed a link on this site and landed here, the URL was <span class="code">invalid</span> — please report it through the contact page.</p>
    </main>
  </body>
</html>
`;

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const started = Date.now();
const failures = [];
const written = [];

process.on('unhandledRejection', () => {
  /* Firebase auth and other browser-only side effects reject harmlessly offline */
});

for (const target of targets) {
  try {
    const html = await renderRoute(target);
    written.push(await writeRouteFile(target.url, html));
    for (const alias of aliasesByTarget.get(target.url) || []) {
      written.push(await writeRouteFile(alias, html));
    }
  } catch (error) {
    failures.push({ url: target.url, message: String(error && error.message ? error.message : error) });
    console.error(`[prerender] FAILED ${target.url}: ${error && error.message ? error.message : error}`);
  }
}

await writeFile(path.join(DIST, '404.html'), NOT_FOUND_HTML, 'utf8');

// ---------------------------------------------------------------------------
// Duplicate URL consolidation -> dist/_redirects
// ---------------------------------------------------------------------------
// Cloudflare Pages applies _redirects before it serves a static asset, so a
// rule here wins over the prerendered file. Alias paths (old or equivalent
// slugs) 301 to the canonical path: one hop, generated from the app's own route
// tables so renaming a page cannot leave a stale redirect behind. Static rules
// only (no wildcards), which keeps the file inside Cloudflare's 2,000
// static-rule budget.
//
// Trailing slashes are NOT redirected here: Pages owns that normalisation and
// answers `/path/` with its own 308 to `/path` when the build emits
// `<path>.html`. Adding a rule in the opposite direction creates a redirect
// loop with Pages' 308.
const redirectRules = [];
for (const [routePath, key] of Object.entries(PATH_TO_PAGE)) {
  if (SKIP_PATHS.has(routePath)) continue;
  const canonical = PAGE_TO_PATH[key];
  if (!canonical || canonical === routePath) continue;
  redirectRules.push(`${routePath}  ${canonical}  301`);
}

const redirectsFile = path.join(DIST, '_redirects');
const baseRedirects = await readFile(redirectsFile, 'utf8').catch(() => '');
await writeFile(
  redirectsFile,
  `${baseRedirects.trimEnd()}\n\n# --- Generated by scripts/prerender.mjs -- duplicate URL consolidation. ---\n# Alias paths and trailing-slash variants 301 to the single canonical URL.\n${redirectRules.join('\n')}\n`,
  'utf8'
);

// Firebase/analytics listeners keep the process alive in some environments.
await vite.close().catch(() => {});

const seconds = ((Date.now() - started) / 1000).toFixed(1);
console.log(
  `[prerender] ${written.length} HTML routes written from ${targets.length} renders in ${seconds}s (canonical host ${BASE_HOST_PATH})`
);
console.log(`[prerender] ${redirectRules.length} duplicate-URL 301 rules written to dist/_redirects`);

if (failures.length) {
  console.error(`[prerender] ${failures.length} route(s) failed:`);
  for (const failure of failures) console.error(`  - ${failure.url}: ${failure.message}`);
  process.exit(1);
}

process.exit(0);
