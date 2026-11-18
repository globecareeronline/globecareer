# GlobeCareer.online — Modified / Created / Deleted Files

Date: 2026-11-17
Baseline: `globecareer-main.zip` (SHA of extraction: 187 files, unmodified original preserved)
Working copy: `project/`

## Modified (10)

| # | Path | Change | Lines before → after |
|---|------|--------|----------------------|
| 1 | `public/sitemap.xml` | Removed `/pricing` (route does not exist) and `/cover-letter-templates` (duplicate canonical of `/letter-templates`); added the real `/letter-templates`; added the 24 country pages that were missing (23 → 47); refreshed `lastmod` on the four pages that gained content | 390 → 528 |
| 2 | `robots.txt` | Explicitly allowed AI retrieval crawlers (OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, Google-Gemini-Crawler, Google-Extended); kept training-only scrapers blocked; disallowed `/assets/aistudio/` and `/ZIP_MANIFEST` for every crawler group | 91 → 133 |
| 3 | `public/robots.txt` | Byte-identical copy of the above (Cloudflare Pages serves from `public/`) | 91 → 133 |
| 4 | `_redirects` | Added `https://www.globecareer.online/* → https://globecareer.online/:splat 301` ahead of the SPA fallback | 9 → 15 |
| 5 | `public/llms.txt` | Rewrote to list every real route, including the new template and resume-length guidance | 31 → 49 |
| 6 | `src/utils/seo.ts` | Fixed `cover-letter-templates` canonical (pointed at a nonexistent path); added `admin` entry with `noIndex`; retitled/described/keyworded the templates, resume-examples and writing-guide pages; added `BreadcrumbList` structured data for pages with a visible breadcrumb trail | 1632 → 1719 |
| 7 | `src/App.tsx` | `navigateTo` now keeps `selectedCountryId` in sync with the pushed URL; fixed the `CountryDetailPage` wrapper that discarded the country id; passed `onNavigate` to `JobExamplesPage` | 916 → 919 |
| 8 | `src/components/pages/ResumeWritingGuidePage.tsx` | Added "How Long Should a Resume Be?" (incl. 47-country table + experience table), "How to Put Certifications on a Resume", "How to Put Volunteer Work on a Resume" | 286 → 529 |
| 9 | `src/components/pages/TemplatesPage.tsx` | Added "Microsoft Word and Google Docs Resume Templates" section with export steps, template-selection table and ATS warning | 667 → 780 |
| 10 | `src/components/pages/JobExamplesPage.tsx` | Added "Resume Example for Applying Abroad" section with data-driven market table and internal links; new optional `onNavigate` prop | 197 → 304 |

## Created (3)

| Path | Purpose |
|------|---------|
| `SEO_IMPLEMENTATION_REPORT_2026-11-17.md` | Full implementation, audit and verification report |
| `MODIFIED_FILES.md` | This file |
| `SEO_KEYWORD_MAPPING.csv` | Keyword → URL disposition mapping built from the SEMrush gap export |

## Continuation pass (same day, after the report)

| Path | Change |
|------|--------|
| `src/components/layout/Header.tsx` | Mobile-only fix for the 13 px horizontal overflow: tighter mobile gaps/padding, theme toggle moved into the mobile drawer (`hidden sm:flex` in the bar), compact `Sign Up` CTA label below `sm` |
| `public/assets/aistudio/` → `_research/aistudio/` | **Moved** (13 files, 3.4 MB) out of the deployed bundle; no app code referenced it |
| `public/ZIP_MANIFEST.json`, `public/ZIP_MANIFEST.txt` → `_research/` | **Moved** out of the deployed bundle |
| `SEO_IMPLEMENTATION_REPORT_2026-11-17.md` | Added §14 (continuation pass) and closed §10 items 1 and 5 |
| `MODIFIED_FILES.md` | This section |

## Completion pass — prerendering, role pages, dependencies (2026-11-18)

Backup taken before any change: `_backup/globecareer-before-prerender-2026-11-18.tar.gz` (206 entries, 4,136,017 bytes).

### Modified

| Path | Change |
|------|--------|
| `src/App.tsx` | `role-example:<slug>` routing and state, role SEO application, exported `PATH_TO_PAGE` / `PAGE_TO_PATH` / `PAGE_ALIAS_MAP` for the prerenderer and audit, and first-render route resolution (`useRef` + lazy `useState` initialisers) so a deep link no longer paints the homepage first |
| `src/utils/seo.ts` | `role-example` metadata (title, description, canonical, keywords, `Article` + `FAQPage` JSON-LD) and role `BreadcrumbList` |
| `src/components/templates/ResumeRenderer.tsx` | Resume name `<h1>` → styled `<h2>`, job title `<h2>` → `<p>` (multiple-H1 fix) |
| `src/components/builder/ResumeBuilderView.tsx` | Added an `sr-only` `<h1>`; the builder previously had no page heading |
| `src/components/pages/JobExamplesPage.tsx` | New "Resume examples by role" section linking all eight role pages (they would otherwise be reachable only from the sitemap and `llms.txt`) |
| `public/sitemap.xml` | 86 → 94 URLs: eight role pages appended, existing entries untouched |
| `public/llms.txt` | Role-page links added |
| `public/_redirects` | Removed the SPA catch-all `/* /index.html 200` (cause of every soft-404) and added the `www` → apex 301 that only existed in the root copy |
| `package.json` | Removed unused `motion` and `esbuild`, package renamed `react-example` → `globecareer`, added `prerender` / `audit:routes` / `serve:dist` scripts and `build` now runs the prerenderer |
| `package-lock.json` | Regenerated so `npm ci` works without `--legacy-peer-deps`; the old lock omitted the Windows native packages for rolldown, lightningcss and Tailwind oxide |
| `SEO_IMPLEMENTATION_REPORT_2026-11-17.md` | Added §15 (raw-HTML before/after, role pages, dependency table, Lighthouse table with the open CLS issue) |
| `MODIFIED_FILES.md` | This section |

### Created

| Path | Purpose |
|------|---------|
| `scripts/prerender.mjs` | Renders the real app in jsdom per route, writes `dist/<path>/index.html`, generates `dist/404.html`, keeps the static markup visible until React mounts |
| `scripts/serve-dist.mjs` | Local Cloudflare-Pages-like static server with brotli/gzip, used for browser and Lighthouse verification |
| `scripts/audit-routes.mjs` | Audits status codes, single `h1`, body text, title, description, canonical and sitemap consistency for every path; writes `route_audit_2026-11-18.{csv,json}` |
| `src/routes.ts` | Role path matching and `getRolePaths()` |
| `src/data/roleExamples.ts` | Content for the eight role guides |
| `src/components/pages/RoleResumeExamplesPage.tsx` | Role page template |
| `route_audit_2026-11-18.csv`, `route_audit_2026-11-18.json` | Audit output (139 paths, 0 problems) |
| `LINK_ACQUISITION_OPPORTUNITIES.md` | Prioritised outreach research; nothing contacted |
| `FINAL_SEO_IMPLEMENTATION_REPORT_2026-11-18.md` | Final report for this pass |

### Deleted

No source file, route, asset, page or integration was deleted. `motion` and `esbuild` were removed from `package.json` only.

## Deleted (0)

No application file, route, asset, integration or research file was deleted.

## Untouched by design

- `src/utils/seo.ts` existing page metadata for all other routes (content left intact)
- Authentication (`src/context/AuthContext.tsx`, `src/lib/firebase.ts`, `firestore.rules`)
- Resume builder, cover letter builder, templates data, ATS engine (`src/utils/realAtsEngine.ts`, `src/utils/atsScorer.ts`)
- All existing production URLs and their canonicals
- `public/assets/aistudio/*` research residue (blocked from crawling, not removed)
- `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`

## Deployment repair pass — Bun lockfile, Node 24, duplicate-URL consolidation (2026-11-18)

Commit: `0b1715f` (11 files, +1751 / −124). Baseline: repository clone at `c1b2473`, verified byte-identical to `globecareer-final-deployment-2026-11-18.zip` (184 files, `diff -r` clean).

### Modified

| Path | Change |
|------|--------|
| `bun.lock` | Regenerated with Bun 1.4.4 (Cloudflare's version) so it matches `package.json`: `motion` and `esbuild` entries removed (both unused), `jsdom` recorded, workspace name `react-example` → `globecareer`. `bun install --frozen-lockfile` now passes and leaves the file byte-identical. |
| `.nvmrc`, `.node-version` | `20` → `24`. The locked Firebase 13 tree declares `node >= 24.12.0`, and `npm ci` fails on Node 20 with npm 10 (`@google/genai` preinstall spawn error). Cloudflare's build image provides Node 24.22.1 and reads these files. |
| `scripts/prerender.mjs` | Appends 131 single-hop 301 rules to `dist/_redirects` at build time, generated from `PATH_TO_PAGE` / `PAGE_TO_PATH`: 37 alias paths → canonical, 93 trailing-slash variants → canonical, `/admin/` → `/admin`. `/pricing` and `/plans` excluded (they must 404, not redirect home). |
| `scripts/serve-dist.mjs` | Now parses `dist/_redirects` and applies rules before static assets, matching Cloudflare Pages, and ignores host-level rules exactly as Pages does. |
| `scripts/audit-routes.mjs` | Alias paths are now required to 301 to their canonical (was: 200 HTML), all sitemap URLs get a trailing-slash 301 test, and each redirect is followed hop by hop to detect chains, loops and non-200 destinations. The JSON summary gained `redirectsTested` and a full `redirectMap[]`. |
| `public/_redirects` | Removed `https://www.globecareer.online/* → https://globecareer.online/:splat 301`. Cloudflare Pages cannot redirect by hostname from `_redirects`, so the rule never worked; the correct fix (a dashboard Redirect Rule) is documented in place of it. |
| `_redirects` | Same correction in the root copy, which is now kept identical to `public/_redirects`. |
| `README.md`, `HOW-TO-RUN.txt` | Node/npm requirements corrected to Node 24 LTS / npm 11 and `NODE_VERSION=24`, with the reason recorded. |
| `route_audit_2026-11-18.json` | Regenerated: 94 sitemap URLs, 132 prerendered pages, 101 paths, 130 verified redirects, 0 problems, plus the redirect map. |
| `SEO_IMPLEMENTATION_REPORT_2026-11-17.md` | Added §16 (deployment repair pass). |
| `MODIFIED_FILES.md` | This section. |

### Created

| Path | Purpose |
|------|---------|
| `FINAL_GOOGLE_INDEXING_AND_DEPLOYMENT_REPORT_2026-11-18.md` | Final report: indexing categories, redirect map, canonical audit, Bun root cause, validation results, push status, live verification, manual actions |

### Deleted

No file was deleted. No page, route, asset, integration or public URL was removed.
