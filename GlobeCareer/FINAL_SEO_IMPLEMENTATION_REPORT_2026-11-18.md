# GlobeCareer — Final SEO Implementation Report

Date: 2026-11-18
Workspace: `F:\GLOBE CAREER ONLINE\project`
Baseline archive: `_backup/globecareer-before-prerender-2026-11-18.tar.gz` (206 entries, 4,136,017 bytes)
Nothing was deployed, committed or pushed. No live service was modified.

---

## 1. Completed fixes

| # | Fix | Where |
|---|-----|-------|
| 1 | **Prerendering.** All 94 sitemap URLs (86 previous + 8 new role pages) now serve page-specific HTML built from the real React app; 132 HTML files from 95 unique renders (alias paths reuse the canonical page's HTML). | `scripts/prerender.mjs`, `package.json` `build` |
| 2 | **Real 404s.** The SPA catch-all `/* /index.html 200` is gone from `public/_redirects`; `dist/404.html` is generated from the app's own not-found view, so unknown URLs return HTTP 404 with a rendered page. | `public/_redirects`, `scripts/prerender.mjs` |
| 3 | **Soft-404 routes removed from the crawlable set.** `/pricing` and `/plans` have no content and previously returned the homepage with 200; they are no longer prerendered and return 404. Both were already absent from the sitemap. | `scripts/prerender.mjs` (`SKIP_PATHS`) |
| 4 | **Multiple-H1 defect fixed at source.** The resume preview used `<h1>` for the candidate name and `<h2>` for the job title; the builder view had no `h1`. Now: one `h1` per page, resume name is an `h2`, job title a `p`, builder has an `sr-only` `h1`. | `ResumeRenderer.tsx`, `ResumeBuilderView.tsx` |
| 5 | **Deep links painted the homepage first.** `currentPage` started at `'home'` and routing ran in an effect, so every deep link rendered the tall homepage and then swapped — a full-page shift. The route is now parsed during the first render. | `src/App.tsx` |
| 6 | **8 role-level resume guides** under `/resume-examples/<slug>`, each with unique copy, its own metadata, canonical, `Article` + `BreadcrumbList` + `FAQPage` schema, sibling links and a link from the hub page. | `src/data/roleExamples.ts`, `RoleResumeExamplesPage.tsx`, `routes.ts`, `seo.ts`, `App.tsx`, `JobExamplesPage.tsx` |
| 7 | **Dependency cleanup.** `motion` and unused `esbuild` removed, package renamed `react-example` → `globecareer`, lockfile regenerated so `npm ci` works **without** `--legacy-peer-deps`. | `package.json`, `package-lock.json` |
| 8 | **`www` → apex 301 was not being deployed.** It existed only in the root `_redirects`; Cloudflare Pages reads `public/_redirects`, which now carries it. | `public/_redirects` |
| 9 | Link-acquisition research prepared (6 verified resources, prioritised, no contact made). | `LINK_ACQUISITION_OPPORTUNITIES.md` |

The two previously completed fixes were left untouched: the mobile-header overflow fix (`Header.tsx`) and the removal of the research exports from the build (`_research/`, absent from `dist/` — verified again in this pass).

## 2. Files modified and why

| Path | Reason |
|------|--------|
| `src/App.tsx` | Role-example routing/state, `role-example` SEO application, exported route/path maps for the prerenderer and audit, and first-render route resolution (fix 5) |
| `src/routes.ts` (new) | Role path matching + `getRolePaths()`; single place the prerenderer and audit both use |
| `src/utils/seo.ts` | `role-example` metadata (title, description, canonical, keywords, `Article`/`FAQPage`) and role `BreadcrumbList` |
| `src/data/roleExamples.ts` (new) | The eight role guides' content |
| `src/components/pages/RoleResumeExamplesPage.tsx` (new) | Role page template, 24 px+ tap targets, links to siblings/hub/builder |
| `src/components/pages/JobExamplesPage.tsx` | "Resume examples by role" index on `/resume-examples`, so the role pages are reachable by internal links and not only from the sitemap |
| `src/components/templates/ResumeRenderer.tsx` | H1/H2 correction (fix 4) |
| `src/components/builder/ResumeBuilderView.tsx` | `sr-only` H1 (fix 4) |
| `public/sitemap.xml` | 86 → 94 URLs (8 role pages appended; existing entries untouched) |
| `public/llms.txt` | Role page links added |
| `public/_redirects` | SPA catch-all removed, `www` 301 added |
| `package.json` / `package-lock.json` | Dependency cleanup, package name, new scripts (`prerender`, `audit:routes`, `serve:dist`), regenerated lock |
| `scripts/prerender.mjs`, `scripts/serve-dist.mjs`, `scripts/audit-routes.mjs` (new) | Prerenderer, local Pages-like server for testing, route audit |
| `SEO_IMPLEMENTATION_REPORT_2026-11-17.md` | §15 added (this pass) |
| `MODIFIED_FILES.md` | Completion-pass section added |
| `LINK_ACQUISITION_OPPORTUNITIES.md`, `FINAL_SEO_IMPLEMENTATION_REPORT_2026-11-18.md` (new) | Deliverables |

No application file, route, asset or integration was deleted.

## 3. Before / after measurements

Raw HTML delivered to a client that does not execute JavaScript (homepage):

| Metric | Before | After |
|---|---|---|
| HTML bytes | 13,702 | 160,169 (22,674 gzip) |
| Crawlable text characters | 59 | 16,893 |
| `<h1>` count | 0 | 1 |
| Routes with prerendered HTML | 0 of 86 | 132 files for 94 sitemap URLs + 404 |

Build output:

| Metric | Before | After |
|---|---|---|
| Build command | `vite build` | `vite build && node scripts/prerender.mjs` |
| Build time | ~7 s | ~33–38 s (prerender ≈ 30 s) |
| `dist/` files | 78 | 215 (133 HTML) |
| Entry JS | 370.46 kB (84.50 kB gzip) | 415.72 kB (99.92 kB gzip) |
| CSS | — | 127.68 kB (17.98 kB gzip) |

The entry-bundle growth (+45.26 kB raw / +15.42 kB gzip) is the eight role guides' text plus their schema data: `seo.ts` needs the role metadata (including FAQ text for `FAQPage` JSON-LD) on client-side navigation, so the role data module is pulled into the entry as well as the page chunk (`RoleResumeExamplesPage` 16.53 kB / 3.41 kB gzip, `JobExamplesPage` 15.75 kB / 3.95 kB gzip). It is content, not tooling — but it *is* extra weight on every page, and §9 records the follow-up that removes it.

Lighthouse, mobile emulation, lab, headless Chrome, compressed Pages-like server (single runs per page; lab numbers on this machine vary by a few points between runs):

| Page | Perf | A11y | BP | SEO | FCP | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` before (SPA shell) | 98 | 100 | 100 | 100 | 1.8 s | 2.0 s | ~0.00 |
| `/` after | 97 | 100 | 100 | 100 | 2.0 s | 2.3 s | 0.007 |
| `/resume-examples/customer-service` | 73 | 100 | 100 | 100 | 2.0 s | 2.7 s | 0.583 |
| `/resume-builder` | 91 | 90 | 100 | 100 | 2.1 s | 3.2 s | 0.021 |
| `/templates` | 90 | 96 | 100 | 100 | 2.2 s | 2.5 s | 0.135 |
| `/country/de` | 87 | 94 | 100 | 100 | 2.0 s | 3.8 s | 0 |
| `/ats-guide` | 77 | 100 | 100 | 100 | 2.0 s | 2.3 s | 0.42 |

No performance improvement is claimed for any existing page: the homepage numbers are within run-to-run noise of the baseline. The measured, repeatable gain is the raw-HTML table above.

## 4. Prerendering results for all sitemap routes

Method: the app is rendered in jsdom through Vite's `ssrLoadModule`; the prerenderer waits for the lazy page module and an `h1`, then writes the serialised document to `dist/<path>/index.html`. Client takeover is unchanged (`createRoot` on the same `#root`).

- 95 unique pages → **132 HTML files**; each sitemap URL has its own file with its own `<title>`, meta description, canonical and JSON-LD.
- Alias paths share the canonical page's HTML; every alias file's canonical already points at the canonical URL, so no duplicate-content signal is introduced and **no redirect was added or changed**.
- `scripts/audit-routes.mjs` (`npm run audit:routes`) result: **94 sitemap URLs, 132 prerendered pages, 139 paths tested, 0 problems** — status codes, single `h1`, non-empty body text, title, meta description, canonical format, canonical/sitemap consistency, and 6 must-404 paths returning 404.
- `/admin` returns 200 with `noindex` and is not in the sitemap.

## 5. Role-level content

Eight occupations: customer service representative, software engineer, registered nurse, teacher, data analyst, project manager, marketing manager, sales representative.

Each page contains: occupation-specific responsibilities, core/tool/soft skills, qualifications, experience expectations by level, resume tips, ATS keywords, four FAQs that the page actually answers, sibling-role links, links to the builder and to the hub — plus a unique `h1`, title, meta description, canonical and `Article`/`BreadcrumbList`/`FAQPage` structured data.

Accuracy rules applied: no invented statistics; no salary, hiring-rate or survey figures, because none could be verified in this workspace; qualitative guidance only. Slugs, sitemap entries and `llms.txt` links all derive from `src/data/roleExamples.ts`, so page/sitemap drift is not possible. Cannibalisation avoided by nesting under the existing `/resume-examples` hub rather than creating `/resume-examples-customer-service`-style top-level URLs.

## 6. Dependency cleanup results

| Item | Result |
|---|---|
| `motion` | Removed. No import of `motion`/`framer-motion` existed anywhere in `src/`; no animation changed |
| `esbuild` (unused devDependency) | Removed. It was the source of the Vite 8 peer conflict; Vite 8 declares it optional |
| Package name | `react-example` → `globecareer`. Nothing imported, scripted or deployed referenced the old name |
| `--legacy-peer-deps` | **No longer needed.** The old lock file omitted three Windows native packages (`@rolldown/binding-win32-x64-msvc`, `lightningcss-win32-x64-msvc`, `@tailwindcss/oxide-win32-x64-msvc`); the regenerated lock includes them and `npm ci` installs cleanly |
| Upgrades | Only in-range resolutions (~55, mostly Firebase internals). No major version was changed deliberately |

## 7. Link acquisition opportunities

`LINK_ACQUISITION_OPPORTUNITIES.md` lists six verified, publicly reachable resources (University of Michigan Career Center, University of Florida Career Connections Center, UT San Antonio University Career Center, University of Richmond Career Services, SNHU Career360, Resource.fyi) with relevance, opportunity type, the site's own public contact route and a suggested angle. Paid links, PBNs, link farms, guest-post marketplaces and automated submissions are explicitly excluded. **Nothing was contacted, submitted or purchased.**

## 8. Tests passed and failed

| Check | Command / method | Result |
|---|---|---|
| TypeScript | `npm run lint` → `tsc --noEmit` | **Pass**, 0 errors |
| Production build + prerender | `npm run build` | **Pass**, 132 routes from 95 renders in 32.7 s |
| Route/metadata/canonical/sitemap/404 audit | `npm run audit:routes` | **Pass**, 139 paths, 0 problems |
| Clean install without `--legacy-peer-deps` | `npm ci` | **Pass**, native Windows binaries installed |
| Rendered role page in a browser | built output on `127.0.0.1:4173` | 1 `h1`, correct canonical, 2 JSON-LD blocks, 4 FAQ `<details>`, header present, all assets 200 |
| Hub → role internal links | grep on prerendered `dist/resume-examples/index.html` | 8 role links present |
| Lighthouse | 7 pages/cases (see §3) | Recorded; role-page CLS open (see §9) |
| Firebase auth / Firestore flows | — | **Not run**: no credentials in this workspace |
| Cloudflare Pages live redirects/compression | — | **Not run**: requires a deploy and live access |
| Search Console data | — | **Not available** |

## 9. Unresolved issues and their exact causes

1. **Residual CLS on some prerendered routes (0 → 0.58).** Cause: with prerendered markup the static HTML paints first; when React mounts it replaces that markup (and on lazy routes briefly commits the Suspense fallback). Chrome records the replaced content as a layout shift. Mitigations applied: prerendered markup now lives in a sibling `#prerender` node with `#root` hidden until the route has mounted, and routing resolves in the first render — together these took the role page from CLS 1.008 to 0.583 and left `/` at 0.007 and `/country/de` at 0. **Exact fix if you want it:** switch the entry point from `createRoot` to `hydrateRoot` and make render-time reads of `window`/`matchMedia`/`localStorage` hydration-safe. That was not done here because the app is client-first and a hydration mismatch would be a worse regression than the shift.
2. **Entry bundle +15.42 kB gzip** from role content being needed by `seo.ts` for client-side navigation (see §3). **Exact fix:** split `src/data/roleExamples.ts` into a metadata module (slug, role name, title, description, keywords, FAQ questions/answers) for `seo.ts` and a content module for the page chunk — or generate role metadata at prerender time and apply it via a lazily imported module on client navigation.
3. **Pre-existing accessibility findings, unchanged by this pass:** colour contrast on `/templates` (2.58 and 3.46 ratios) and `/country/de` (2.47, 4.34), `heading-order` on `/country/de` and `/resume-builder`, and unlabelled `<select>` elements in the builder. The role pages score 100.
4. **A pre-existing React console warning remains** during prerender: `<button> cannot contain a nested <button>`. The offending component was not identified in this pass; it does not affect the rendered output but is worth fixing.
5. **`/pricing` and `/plans` now 404** instead of returning the homepage with 200. That is the correct treatment for empty pages, but if either was ever shared publicly the inbound links will now land on a 404 page that offers navigation back into the site.
6. **No field data.** Cloudflare Analytics/Search Console were not accessed, so nothing here says how Google responds to the prerendered pages. Expect the HTML-level change to show up on the next crawl.

## 10. Deliverables

- `SEO_IMPLEMENTATION_REPORT_2026-11-17.md` — updated with §15 (this pass).
- `MODIFIED_FILES.md` — updated with the completion-pass file list.
- `LINK_ACQUISITION_OPPORTUNITIES.md` — outreach research (no contact made).
- `FINAL_SEO_IMPLEMENTATION_REPORT_2026-11-18.md` — this document.
- `route_audit_2026-11-18.csv` / `.json` — machine-readable audit of all tested paths.
- Regenerated source ZIP (file count and size reported in the hand-over message).
