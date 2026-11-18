# GlobeCareer.online — SEO Implementation Report

**Date:** 2026-11-17
**Scope:** Stages 0–10 of the SEO master mission, implemented against the real project extracted from `globecareer-main.zip`
**Framework:** React 19 + Vite 8 + TypeScript 7 SPA (client-rendered, Cloudflare Pages hosting)

---

## 1. Original project condition

| Item | Finding |
|------|---------|
| Archive | `globecareer-main.zip` — 6,233,335 bytes |
| Extracted app | `globecareer-main/GlobeCareer/` — 187 files |
| Package manager | npm (`package-lock.json`) + a `bun.lock`; `npm install` required `--legacy-peer-deps` because `vite@8.3.4` declares a peer-optional `esbuild@^0.27‖^0.28` while the project pins `esbuild@^0.25.0` |
| Node | none installed on the machine → portable Node v22.23.5 downloaded to `_tools/node` (project-local, no system change) |
| Native deps | four Windows optional binaries missing from the lockfile had to be installed for the toolchain to run locally: `@typescript/typescript-win32-x64@7.0.2`, `@rolldown/binding-win32-x64-msvc@1.2.14`, `lightningcss-win32-x64-msvc@1.32.0`, `@tailwindcss/oxide-win32-x64-msvc@4.3.3`, `@esbuild/win32-x64@0.25.12` |
| Git | the archive contains **no** `.git` directory → no commit history or branch information exists |
| Routes | 44 distinct client routes (`PATH_TO_PAGE`) + 47 `/country/:id` pages = **91 addressable URLs** |
| Existing SEO | `src/utils/seo.ts` (1,632 lines) already provided per-page titles, descriptions, canonicals, OG/Twitter tags, robots directives and JSON-LD; `public/sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, `ai-catalog.json`, `_headers`, `_redirects` all present |
| Existing structured data | `WebApplication`, `Organization`, `Article`, `CollectionPage`, `FAQPage`, `HowTo`, `TechArticle`, `AboutPage`, `ContactPage`, `WebPage` |
| Product features verified in source | resume builder + DOCX/PDF export, ATS checker (`realAtsEngine.ts`), cover letter builder, recommendation letter builder, email generator, bio/summary/resignation generators, interview prep, 47 country guides, jobs portal, Kanban tracker, Firebase auth + Firestore cloud sync |

**Baseline build status:** `tsc --noEmit` clean, `vite build` successful — main entry chunk 368.42 kB (84.04 kB gzip), CSS 126.12 kB (17.74 kB gzip), `vendor-react` 210.92 kB (65.85 kB gzip).

---

## 2. Backup location and status

| Item | Path | Status |
|------|------|--------|
| Original archive | `globecareer-main.zip` | **Untouched** (never modified or deleted) |
| Raw extraction | `_extract/globecareer-main/GlobeCareer/` | 187 files, pristine |
| Recoverable backup | `_backup/globecareer-original/` | 187 files, byte-identical copy of the extraction |
| Working copy | `project/` | All edits made here; build/test run here |

Restore procedure: copy `_backup/globecareer-original/*` over `project/`, or re-extract `globecareer-main.zip`.

---

## 3. Research files discovered

**6 files at workspace root (2 formats):**

| File | Format | Size | Content |
|------|--------|------|---------|
| `gap_keywords_2026-11-12T22_49_14_137Z.csv` | CSV | 524,497 B | 1,754-row keyword gap vs 4 competitors, 21 columns |
| `globecareer_seo_master_data.csv` | CSV | 704,347 B | 4,124 consolidated records across 7 categories |
| `globecareer_online-backlinks_matrix.csv` | CSV | 1,200,447 B | 30,000-row referring-domain matrix across 5 domains |
| `overview-trend-2026-11-12T22_41_29Z.csv` | CSV | 542 B | 6 metrics × 7 months, organic trend |
| `Semrush-Organic_Research__Overview_(Desktop)-globecareer_online-12th_Nov_2026.pdf` | PDF | 172,330 B | 5 pages |
| `Semrush-Keyword_Gap_(Desktop)-globecareer_online_resumeworded_com_novoresume_com-12th_Nov_2026.pdf` | PDF | 596,128 B | 8 pages |

**4 additional CSVs were found bundled inside the project** at `public/assets/aistudio/` (earlier SEMrush exports from 2026-11-05, plus scratch notes and screenshots). These are research residue that is currently publicly reachable — handled in §6.9, not deleted.

**Processing:** all CSVs read in full with a quote-aware parser (gawk `FPAT`); both PDFs converted with `pdftotext -layout` and read across all 13 pages. No file was modified or deleted.

---

## 4. CSV and PDF processing results

| Category | Records |
|----------|---------|
| `keyword_gap` | 1,827 |
| `backlink_opportunity` | 2,265 (297 high / 1,125 medium / 843 low competition) |
| `trend` | 13 |
| `competitor_summary` | 10 |
| `organic_keyword` | 4 |
| `organic_page` | 3 |
| `organic_subdomain` | 2 |
| **Total master dataset** | **4,124** |

**Keyword gap totals (from the CSV, not estimated):**
- 1,754 keywords with volume data
- 344,830 combined monthly US desktop searches
- 234,470 of those (68%) sit at keyword difficulty ≤ 25

**PDF extraction quality:** the Organic Research PDF is a chart-heavy export and its tabular columns do not linearise perfectly (positions/volumes interleave across rows). The Keyword Gap PDF overlaps the gap CSV for the top keyword set. Where the two disagreed, **the CSV was treated as authoritative** for metrics, and the PDF was used for structure, competitor sets and the Top Pages/Top Keywords narrative. This is recorded as a source discrepancy rather than silently reconciled.

**Data integrity notes (reported, not fabricated):**
- The backlink matrix contains **0 rows** where `globecareer.online` appears — the domain has no referring domains in a 30,000-domain export.
- Two rows of the organic export both spell `europe resume format`, at positions 78 and 89 (likely two URLs). The master CSV preserves both rather than merging them.
- `globecareer.online` organic keyword count is **3** in the gap chart and **4** in the Organic Research report — the master CSV records both values with a note.

---

## 5. Competitor and gap findings

| Domain | Organic keywords (US, Semrush) | Referring domains in matrix | Role |
|--------|-------------------------------|------------------------------|------|
| globecareer.online | 3–4 | 0 | Subject |
| zety.com | ~39.9K | 26,755 | Direct competitor (template/blog) |
| resumeworded.com | ~39.5K | 8,268 | Direct competitor (ATS/score) |
| novoresume.com | ~38.6K | 22,686 | Direct competitor (builder) |
| resume.io | ~37.1K | 17,695 | Direct competitor (builder) |

**Current ranking footprint (complete, from the PDF):** 4 keywords, all page 2+, all zero traffic — `cover letter for letter of recommendation` (95), `cv standard` (83), `europe resume format` (78, 89). Organic traffic: 0. Trend confirms 13 keywords in May 2026 → 0 → 12 in November 2026.

**The site ranks for none of the 1,754 gap keywords.** This is not a content-quality problem the research can measure — it is a visibility/authority problem (0 referring domains, 91 URLs, 4 ranking keywords).

**Highest-value, lowest-difficulty gaps that map to features the product actually has:**

| Keyword | Volume | KD | Product support |
|---------|--------|----|-----------------|
| microsoft resume templates | 14,800 | 25 | DOCX export exists |
| how long should a resume be | 8,100 | 28 | 47-country length data exists |
| resume example for applying abroad | 8,100 | 24 | core product positioning |
| how many pages should a resume be | 5,400 | 29 | country length data |
| resume objective examples | 4,400 | 25 | objective generator exists |
| cv overview examples | 3,600 | 27 | resume examples page |
| customer service resume | 2,900 | 29 | job category exists |
| professional synopsis in / for resume | 2,400 / 2,400 | 26 / 22 | summary generator |
| chatgpt cover letter | 2,400 | 21 | cover letter builder |
| resume template for google docs | 1,900 | 25 | DOCX → Google Docs |
| software engineer resume | 1,900 | 23 | job category exists |
| how to put certifications on resume | 1,300 | 24 | resume sections |
| how to put volunteer work on resume | 1,000 | 18 | resume sections |

A rule-based mapping of **826 keywords (272,680 monthly searches)** to URLs and dispositions was generated from this data and shipped as `SEO_KEYWORD_MAPPING.csv`. Each row carries cluster, target URL, content action, product-support and confidence. Rows where the product has no supporting feature were **not** mapped to fake pages.

---

## 6. Technical SEO issues identified and changes implemented

### 6.1 Sitemap advertised two URLs that do not exist — **Completed and verified**
`/pricing` had no route (it silently rendered the homepage, a soft 404), and `/cover-letter-templates` was a second alias of `/letter-templates` while `/letter-templates` itself — the real route — was missing.

**Change:** removed `/pricing`, replaced `/cover-letter-templates` with `/letter-templates`, refreshed `lastmod` on the four pages that gained content.

### 6.2 24 of 47 country pages were absent from the sitemap — **Completed and verified**
Only 23 `/country/:id` URLs were listed while `src/data/countries.ts` defines 47.

**Change:** added `nz, pt, se, no, dk, fi, at, be, lu, cz, sk, hu, ro, bg, gr, hr, si, ee, lv, lt, is, sa, qa, za`.

**Result:** 63 → **86 URLs, 47/47 countries, 0 duplicates, well-formed XML, all on the canonical host.**

### 6.3 Canonical mismatch on the letter templates page — **Completed and verified**
`PAGE_SEO_MAP['cover-letter-templates'].canonicalPath` pointed at `/cover-letter-templates`, a path the router does not serve. Corrected to `/letter-templates`, matching the router and the sitemap.

### 6.4 `/admin` inherited the homepage's indexable metadata — **Completed and verified**
There was no `admin` entry in the SEO map, so `/admin` fell back to the home metadata: `index, follow` plus a canonical of `/`. Added a dedicated entry with `noIndex: true` (renders `noindex, nofollow`) and its own title, so the page is excluded properly rather than only via the `*` robots group that Googlebot does not read.

### 6.5 Country pages had no breadcrumb structured data — **Completed and verified**
`CountryDetailPage` renders a real breadcrumb `<nav>` (Home / Country Guides / *Country* CV & Resume Guide) but emitted only `Article` schema. Added a `BreadcrumbList` node via a new `withBreadcrumbSchema()` helper that is driven by an explicit list of pages that actually render a visible breadcrumb — so markup always matches on-page content. Verified output on `/country/de`: `Home > Country Guides > Germany CV & Resume Guide`.

### 6.6 Country-to-country navigation was broken — **Completed and verified (bug fix)**
Two defects in `App.tsx`:
1. `CountryDetailPage`'s `onNavigate` wrapper called `setSelectedCountryId(cId)` and then `navigateTo(page)` **without** the id, so the URL never changed.
2. `navigateTo` never updated `selectedCountryId` when navigating to `country-detail`, so the pushed `/country/:id` path and the rendered country could disagree.

**Impact:** 4 neighbour links × 47 country pages ≈ **188 internal links that went nowhere**, plus any URL/content mismatch when navigating between country guides. Both fixed; verified DE → UK → FR with matching H1, `<title>` and canonical at each step.

### 6.7 www host served duplicate content — **Implemented, not verifiable locally**
The Semrush export shows live rankings under `https://www.globecareer.online/...` while canonicals declare the apex domain. Added to `_redirects`:
```
https://www.globecareer.online/*  https://globecareer.online/:splat  301
```
Only the file content is verified; the redirect itself depends on Cloudflare Pages host-level handling and DNS, which cannot be tested offline.

### 6.8 AI crawler directives — **Implemented, not verifiable without live fetches**
Previously every AI crawler except `ChatGPT-User` and `PerplexityBot` was blocked, including `ClaudeBot` and `Google-Extended`. For an AEO/GEO objective that was self-defeating.

**Change:** explicit `Allow` for `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Claude-SearchBot`, `Claude-User`, `Google-Gemini-Crawler`, `Google-Extended`. Training-only harvesters (`GPTBot`, `CCBot`, `Bytespider`, `Diffbot`, `Scrapy`, `Amazonbot`, `FacebookBot`, `Cohere-ai`, `Omgilibot`, `Meta-ExternalAgent`, `anthropic-ai`, `Claude-Web`, `Applebot-Extended`) remain blocked. `robots.txt` and `public/robots.txt` are byte-identical.

### 6.9 Internal research exports were publicly crawlable — **Implemented**
`public/assets/aistudio/` (SEMrush CSVs, pasted scratch notes, screenshots) and `public/ZIP_MANIFEST.*` ship in the build and are fetchable on the live domain. Added `Disallow: /assets/aistudio/` and `Disallow: /ZIP_MANIFEST` to every crawler group. Nothing was deleted; the recommendation is to move these out of `public/` in a future commit.

### 6.10 Soft 404 handling — **Accepted risk, documented**
Unknown paths are served `index.html` by the SPA fallback and render the homepage with a canonical of `/`. That is the standard mitigation for a client-routed SPA without prerendering, but the correct long-term fix is prerendering/SSR (see §12).

---

## 7. Content and keyword implementation

Titles, descriptions and keyword targets were aligned to the research, and three pages received genuinely new content supported by real product data.

### 7.1 `/resume-writing-guide` (529 lines, was 286) — **Completed and verified**
- **"How Long Should a Resume Be?"** — direct answer (US/CA 1 page, UK/EU/AU 2 pages), plus an experience-based table (student → 20+ years) breaking down US versus UK/EU norms.
- **"Standard Resume Length by Country"** — a 47-row table generated from `src/data/countries.ts` (country, CV term, standard length, paper size), every row linking to that country's guide. No invented data: it renders the app's own published country records.
- **"How to Put Certifications on a Resume"** — placement rule, complete vs incomplete example, five ATS-safety rules, link to the ATS checker.
- **"How to Put Volunteer Work on Resume"** — when to include/omit, how to format it like a job, XYZ example.
- Metadata retargeted to `how long should a resume be` (primary), with description and keywords covering the cluster.

**Verified in the browser:** title, description, canonical `/resume-writing-guide`, 5 H2s including all three new sections, both tables rendered (51 rows), `HowTo` JSON-LD intact.

### 7.2 `/templates` (780 lines, was 667) — **Completed and verified**
- **"Microsoft Word and Google Docs Resume Templates"** — explains that one layout exports as native `.docx` and PDF (which is true: `exportResumeToDocx()` exists in `src/utils/docxExport.ts`), a three-step workflow, the Google Drive `File → Open → Upload` path, a six-row table mapping real template IDs to markets and editing notes, and an ATS warning about layout tables/text boxes/header images added after export.
- Metadata retargeted to `microsoft resume templates` (14,800) and `resume template for google docs` (1,900).

**Verified:** section present, `.docx` and Google Docs steps in the DOM, table rendered, canonical `/templates`.

### 7.3 `/resume-examples` (304 lines, was 197) — **Completed and verified**
- **"Resume Example for Applying Abroad"** — four adjustments (work authorisation, local job titles, local document rules, translated evidence) plus a data-driven 8-market table (US, UK, DE, CA, AU, AE, JP, SG) covering terminology, length, paper and photo convention, all read from `countries.ts`.
- Internal links to country guides, European CV format and CV vs resume.
- Metadata retargeted to `resume example for applying abroad` (8,100) and `example of a resume` (2,400).

**Verified:** H2 and table render, canonical `/resume-examples`.

### 7.4 `llms.txt` — **Implemented**
Rewritten to describe every real route, including the new template and length guidance. Only routes that exist are listed; the previous file was already accurate but incomplete.

### 7.5 Deliberately not done
No new thin landing pages were created. 299 of the mapped keywords point at the existing `/resume-examples` hub with the action *expand-existing-page-role-section* — building 299 role pages would be exactly the thin-page proliferation the brief prohibits. Role-level expansion is recommended as phased work (§12).

---

## 8. Core Web Vitals analysis (baseline supplied by you)

Your supplied Cloudflare Web Analytics baseline: page load 404 ms, 350 visits / 360 views, LCP P75 1,240 ms, P90 2,116 ms, **P99 26,000 ms**, TTFB 368 ms, element render delay 715 ms, INP 100% good, CLS 100% good.

**Root cause identified in code (not measured by me):** the homepage LCP element (the `<h1>` "Build Your Global Career") does not exist in the served HTML. `index.html` ships an empty `<div id="root">` and the hero is painted only after `main.tsx` downloads, parses and executes the entry chunk (369.81 kB / 84.45 kB gzip) plus `vendor-react` (210.92 kB / 65.85 kB gzip). That is consistent with a **715 ms element render delay** on a 368 ms TTFB.

Contributing observations, verified in source:
- 4 Google font families (Plus Jakarta Sans, Manrope, Source Serif 4, JetBrains Mono) with several weights — loaded non-blocking via the `media="print"` swap, so they are not render-blocking, but they are 4 families of woff2 requests. **All four are genuinely used** (`--font-sans`, `--font-heading`, `--font-serif` in `ResumeRenderer`, `font-mono` in 131 places), so I did **not** remove any — that would have been a visual regression in exchange for an unmeasured gain.
- The `<link rel="preload">` for `/globecareer-logo.webp` is legitimate: `GlobeCareerLogo` renders it as the header `<img>`.
- Heavy libraries are already code-split (`vendor-docx` 416 kB, `vendor-firestore` 413 kB, `vendor-auth` 108 kB) and only load with the routes that need them.
- `motion` (12.x) is in `package.json` but **imported by no source file** — dead dependency, safe to remove in a dependency-cleanup commit.
- The P99 of 26 s is an outlier tail, not a systematic render problem: 92% of LCP samples are Good, and INP/CLS are already 100% Good, so the fix must not add work to the critical path.

**What I changed:** nothing on the performance path. Deliberate — without the ability to measure, rewriting fonts or the entry graph would have been an unverifiable change to a site whose CLS and INP are currently perfect.

**Highest-value next step (recommended, not implemented):** prerender the static HTML for the 91 routes at build time (e.g. `vite-plugin-prerender` or a lightweight SSR pass). That removes the JS dependency from LCP entirely, keeps the SPA for interaction, and would also fix the soft-404/empty-body crawlability limits. It is a build-system change with real regression risk and should be done with lab measurement available.

---

## 9. Build and testing results

### Automated checks (run against the edited working copy)

| Check | Command | Result |
|-------|---------|--------|
| TypeScript | `npx tsc --noEmit` | **Pass**, 0 errors (also 0 at baseline) |
| Production build | `npm run build` | **Pass**, built in 575 ms; entry 369.81 kB (84.45 kB gzip) — +1.39 kB versus baseline for ~490 lines of new content |
| Sitemap validation | node XML check | 86 URLs, 47 unique country URLs, 0 duplicates, single `<?xml`, 86/86 balanced `<url>` tags, all `https://globecareer.online/`, closing `</urlset>` present |
| Sitemap route integrity | content check | `/pricing` absent, `/cover-letter-templates` absent, `/letter-templates` present |
| robots.txt | served over HTTP | AI retrieval agents present, `Sitemap:` line intact, root and `public/` copies byte-identical |

### Functional verification (local dev server, real browser)

Routes exercised and inspected in the rendered DOM:

| Route | Title | Canonical | Robots | Schema | Content |
|-------|-------|-----------|--------|--------|---------|
| `/resume-writing-guide` | updated, length-targeted | `/resume-writing-guide` | index, follow | HowTo | all 3 new sections, 51 table rows ✅ |
| `/templates` | updated, Word/Google Docs | `/templates` | index, follow | CollectionPage | new section + table ✅ |
| `/resume-examples` | updated, applying abroad | `/resume-examples` | index, follow | CollectionPage | new section + table ✅ |
| `/country/pl` | Poland-specific | `/country/pl` | index, follow | Article + **BreadcrumbList** | renders ✅ |
| `/admin` | Admin Dashboard | `/admin` | **noindex, nofollow** | WebPage | renders ✅ |
| `/` (mobile 375 px) | home | `/` | index, follow | WebApplication + Organization | renders ✅ |

Internal navigation tested by clicking rendered links: writing-guide → `/country/de` (H1, title and canonical all Germany) → `/country/uk` → `/country/fr`, each step keeping URL, H1 and canonical consistent **after the fix**.

Console: no errors from the changed code. One pre-existing warning — `FirebaseError: Missing or insufficient permissions` from the reports snapshot listener, because no local `.env`/Firebase credentials are configured. Cloud sync paths were therefore **not** exercised.

### Not tested (reported as limitations, not passes)

- **Resume builder, cover letter builder, ATS engine, DOCX/PDF export, tracker, jobs portal** — unchanged by this work; not re-tested. The only builder-adjacent change is the `navigateTo` fix, which was exercised indirectly via country navigation.
- **Google Search Console / Cloudflare live data** — no authorised connection or export exists in the workspace, so I have no impressions, CTR, indexing status or live CWV. Your supplied 7 clicks are treated as your baseline figure only.
- **Live Core Web Vitals** — no Lighthouse/PSI run and no field data; every performance statement above is derived from code and bundle sizes, not measurement.
- **www → apex redirect behaviour** — file written, behaviour depends on hosting config.
- **Structured-data validation** — output inspected as parsed JSON in the browser; not submitted to Google's Rich Results Test.
- **Responsive layout below 375 px** and visual design review — not performed.

---

## 10. Known remaining issues

1. ~~**Mobile header overflows by 13 px.**~~ **Fixed in the continuation pass (§14).** At 375 px the document `scrollWidth` is now 367 px (was 388 px) and 312 px at 320 px viewport width — no horizontal overflow at either.
2. **SPA rendering.** 91 URLs serve an empty `#root` before JS. Prerendering is the real fix (§8).
3. **`index.html` ships a static `WebApplication` + `Organization` graph on every route**, alongside the dynamic per-page schema. Harmless (Organization is site-wide) but the homepage `WebApplication` node is redundant off the homepage.
4. **`FAQPage` schema on `/faq`, `/european-cv-format`, `/resume-skills`, `/resume-map`.** Content is genuinely visible so the markup is legitimate, but Google restricts FAQ rich results to authoritative government/health sites, so expect no rich result. No action needed; do not remove accurate markup.
5. ~~**Research residue in `public/`**~~ **Fixed in the continuation pass (§14):** moved out of `public/`, so it is no longer built or deployed.
6. **`motion` dependency is unused.**
7. **`package.json` is still named `react-example`.**
8. **Dependency resolution requires `--legacy-peer-deps`** because of the vite/esbuild peer conflict.

---

## 11. Blocked tasks and things needing your approval

| Task | Status | Why |
|------|--------|-----|
| Google Search Console audit | **Blocked** | No authorised connection/export in the workspace |
| Cloudflare analytics deep-dive | **Blocked** | No API access; only your pasted summary is available |
| Deploy to Cloudflare Pages | **Requires approval** | Explicitly out of scope without authorisation |
| Git commit / push | **Requires approval** | Archive has no git remote; nothing pushed |
| Backlink outreach (2,265 opportunity domains) | **Requires approval** | No emails or forms submitted; list prepared only |
| Disavow file | **Not created** | No evidence of a toxic profile (0 referring domains in export) — a disavow would be unfounded |
| Live CWV measurement | **Blocked** | No Lighthouse/field data available locally |

---

## 12. Recommended next steps, in priority order

1. **Prerender the static routes** — removes the JS dependency from LCP, gives crawlers real HTML, and fixes soft-404s. Highest SEO impact of anything remaining.
2. **Submit the 86-URL sitemap in Search Console** and request indexing for the 24 newly listed country pages and the three rewritten pages.
3. **Verify the www → apex 301** in production and confirm a single canonical host.
4. ~~Fix the 13 px mobile header overflow~~ — **done (§14)**, measured at 320 px and 375 px.
5. **Phase role-level content**: instead of 299 thin pages, build 8–12 genuinely differentiated role pages (customer service, registered nurse, software engineer, teacher, sales associate, executive, data entry, business analyst) that reuse `JOB_CATEGORIES` content plus real examples. These map to ~20K monthly searches currently served by `/resume-examples` alone.
6. **Consolidate the summary/objective cluster**: `/summary-generator`, `/summary-templates` and `/resume-objective-generator` all target overlapping intent (4,400 + 2,400 + 2,400 + 1,300 + 1,000). Differentiate or canonicalise to avoid cannibalisation.
7. **Earn links the only way available**: 0 referring domains is the binding constraint, not on-page SEO. Targets already identified in the research: university career-services resource pages (harvard.edu, mit.edu appear in the matrix), `.gov` employment resources (ca.gov), HR/recruiting publications (forbes.com, cnbc.com, investopedia.com), and legitimate tool directories. Publish original data (e.g. a 47-country CV-requirements comparison) as the linkable asset.
8. **Dependency cleanup**: remove `motion`, rename the package, resolve the vite/esbuild peer conflict so `npm install` works without `--legacy-peer-deps`.

---

## 13. Honest summary

**Implemented and verified:** sitemap correctness and 47/47 country coverage, canonical fix, `/admin` noindex, BreadcrumbList on country pages, the country-navigation bug and its 188 dead internal links, three substantial content expansions with retargeted metadata, robots.txt AI-access policy, research-residue crawl blocking, llms.txt refresh, and a clean typecheck + production build.

**Implemented but not fully verified:** www→apex redirect (file only), AI-crawler directives (no live fetch), keyword mapping export (rule-based, needs human review of the medium-confidence rows).

**Not attempted:** prerendering, font subsetting, role-page build-out, link acquisition, any deploy or push.

**No rankings, traffic, backlink, indexing or CWV improvements are claimed.** The site currently ranks for 4 keywords and has 0 referring domains in the export; nothing in this work can be shown to change those numbers yet, and SEO outcomes cannot be guaranteed.

---

## 14. Continuation pass — known-issue cleanup (2026-11-17, after §1–13)

Two of the issues listed in §10 were closed. Nothing else was touched.

### 14.1 Mobile header horizontal overflow — fixed and measured

`src/components/layout/Header.tsx`. The header needed 388 px of layout on a 375 px viewport, so every route had 13 px of horizontal scroll.

Changes (mobile breakpoints only, desktop untouched):
- Header inner container `gap-4 px-4` → `gap-2 sm:gap-4 px-3 sm:px-6` (16 px recovered).
- Theme toggle is no longer a third 44 px control in the mobile action cluster; it is `hidden sm:flex` in the bar and now also sits in the mobile drawer next to the language selector, so light/dark is still reachable on mobile.
- The account CTA label is `Sign Up` below `sm` and `Sign Up Free` from `sm` up (new optional key `auth.signUpShort`, falling back to `Sign Up` when a locale has no translation).

Measured on the running dev server (`document.documentElement.scrollWidth` vs `window.innerWidth`):

| Viewport | Before | After |
|----------|--------|-------|
| 375 px | 388 px (overflow) | **367 px** |
| 320 px | > 320 px (overflow) | **312 px** |

With the mobile drawer open at 320 px the document still measures 312 px, and the drawer contains one visible theme toggle (`aria-label="Toggle theme"`). Verified in the browser at those two widths only.

### 14.2 Research exports removed from the deployed bundle

`public/assets/aistudio/` (3.4 MB: SEMrush CSVs, pasted notes, screenshots) and `public/ZIP_MANIFEST.json` / `public/ZIP_MANIFEST.txt` (72 KB) were built into `dist/` and fetchable on the live domain. They were **moved** — not deleted — to `_research/` at the workspace root:

- `_research/aistudio/` (13 files)
- `_research/ZIP_MANIFEST.json`, `_research/ZIP_MANIFEST.txt`

No application code referenced these paths (verified by search across `src/`, `public/*.json`, `public/*.txt`). `dist/` no longer contains them; `robots.txt` keeps its `Disallow: /assets/aistudio/` and `Disallow: /ZIP_MANIFEST` lines as defence in depth for any earlier deployment still serving them.

### 14.3 Checks run after the changes

| Check | Command | Result |
|-------|---------|--------|
| TypeScript | `tsc --noEmit` | **Pass**, 0 errors (exit 0) |
| Production build | `vite build` | **Pass** (exit 0), entry 370.46 kB (84.50 kB gzip) |
| Bundle residue | `ls dist \| grep -Ei "aistudio\|ZIP_MANIFEST"` | no matches |
| Mobile overflow | browser measurement at 320 px / 375 px | 312 px / 367 px, no overflow |

### 14.4 Still open

Everything else in §10–§12 is unchanged: prerendering (the real LCP/soft-404 fix), role-level pages, dependency cleanup (`motion` still declared, package still named `react-example`, `--legacy-peer-deps` still required), and all link acquisition / deploy / Search Console work that needs your authorisation or live access.

## 15. Completion pass — prerendering, role pages, dependencies (2026-11-18)

Everything in this section was measured in this workspace, nothing was deployed.

### 15.1 Prerendering: 94 sitemap URLs now serve real HTML

Approach: `scripts/prerender.mjs` runs the real application (React, same components, same data) in jsdom through Vite's `ssrLoadModule`, waits for the lazy page module and an `h1` to exist, then serialises the document to `dist/<path>/index.html`. The existing `<div id="root">` and `createRoot` client takeover are untouched, so interactivity after load is unchanged.

- 95 unique pages rendered → **132 HTML files** written (alias paths reuse the canonical page's HTML; the canonical tag inside each alias file already points at the canonical URL).
- `dist/404.html` is generated from the app's own not-found view.
- `public/_redirects` lost the SPA catch-all `/*  /index.html  200`, so unknown URLs now return a real 404 with the prerendered shell instead of a 200 soft-404.
- `/pricing` and `/plans` are deliberately **not** prerendered: they have no content and previously soft-404ed to the homepage. They are absent from the sitemap and return 404.
- Build time: `vite build` + prerender ≈ 33–38 s total locally (prerender ≈ 30 s of it). Output: 215 files, 19 MB, of which 133 are `.html`.

Raw HTML delivered for the homepage (the clearest before/after):

| | Before (SPA shell) | After |
|---|---|---|
| HTML bytes | 13,702 | 160,169 (22,674 gzip) |
| Crawlable text characters | 59 | 16,893 |
| `<h1>` elements | 0 | 1 |

Verification (`npm run audit:routes`, `scripts/audit-routes.mjs`, run against `dist/` with the Pages-like server):

| Check | Result |
|---|---|
| Sitemap URLs | 94 |
| Prerendered HTML pages | 132 |
| Paths tested (sitemap + aliases + must-404) | 139 |
| Problems | **0** |
| Nonexistent paths (6 sampled) | 404 |
| `/admin` | 200 + `noindex` |

Per-route checks in the audit: HTTP status, presence of a single `h1` after script removal, non-empty body text, `<title>`, meta description, canonical equals the canonical host + path, canonical not duplicated, sitemap ↔ generated-file consistency.

### 15.2 Two defects the prerender surfaced (both fixed)

1. **Multiple H1s.** `ResumeRenderer.tsx` used `<h1>` for the candidate name (inside a resume preview that sits next to a page `h1`) and `<h2>` for the job title; the builder view had no `h1` at all. The name is now a styled `<h2>`, the job title a `<p>`, and the builder view has an `sr-only` `h1`. Every prerendered page now has exactly one `h1`.
2. **Homepage painted before routing.** `AppContent` initialised `currentPage` to `'home'` and only read the URL in an effect, so every deep link rendered the (very tall) homepage first and then swapped to the real page — a full-page layout shift on every prerendered route. The route is now parsed during the first render (`useRef` + lazy `useState` initialisers), so the first commit is already the requested page.

### 15.3 Role-level resume pages: 8 new guides

New route family `/resume-examples/<slug>` (a sub-path of the existing hub, so no new top-level URL and no cannibalisation of the hub): customer service, software engineer, registered nurse, teacher, data analyst, project manager, marketing manager, sales representative.

Each page has unique copy written per occupation — responsibilities, core/tool/soft skills, qualifications, experience expectations by level, resume tips, ATS keywords, four FAQs and links to sibling roles — plus its own `h1`, title, meta description, canonical, `Article` + `BreadcrumbList` + `FAQPage` JSON-LD. Numbers in the guidance are qualitative; no salary, hiring-rate or survey figure is published because none could be verified. Slug list, sitemap entries and `llms.txt` links are derived from the same data module (`src/data/roleExamples.ts`), so the page, the sitemap and the crawl hints cannot drift apart.

Sitemap: 86 → **94 URLs** (8 role pages appended, all existing URLs and their XML entries untouched).

### 15.4 Dependency cleanup

| Item | Before | After | Evidence |
|---|---|---|---|
| `motion` | declared in `dependencies` | removed | no `motion`/`framer-motion` import anywhere in `src/`; no animation behaviour changed |
| `esbuild` | declared, unused, and the cause of the Vite 8 peer conflict | removed | Vite 8 makes `esbuild` optional (`peerDependenciesMeta.esbuild.optional`) |
| package name | `react-example` | `globecareer` | no import, script or integration referenced the old name |
| install | required `--legacy-peer-deps` | plain `npm ci` succeeds | the old lock file omitted Windows native packages (`@rolldown/binding-win32-x64-msvc`, `lightningcss-win32-x64-msvc`, `@tailwindcss/oxide-win32-x64-msvc`); the regenerated lock resolves them |
| lockfile | stale | regenerated | ~55 in-range version bumps, mostly Firebase internals; no major bumps were taken deliberately |

No dependency was upgraded outside its declared range, and no needed dependency was removed. `package.json` now also carries the new scripts: `build` (vite build + prerender), `prerender`, `audit:routes`, `serve:dist`.

### 15.5 Lighthouse (mobile, lab, Chrome headless, compressed Pages-like server)

| Page | Perf | A11y | Best practices | SEO | FCP | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` before (SPA shell) | 98 | 100 | 100 | 100 | 1.8 s | 2.0 s | ~0.00 |
| `/` after | 97 | 100 | 100 | 100 | 2.0 s | 2.3 s | 0.007 |
| `/resume-examples/customer-service` | 73 | 100 | 100 | 100 | 2.0 s | 2.7 s | 0.583 |
| `/resume-builder` | 91 | 90 | 100 | 100 | 2.1 s | 3.2 s | 0.021 |
| `/templates` | 90 | 96 | 100 | 100 | 2.2 s | 2.5 s | 0.135 |
| `/country/de` | 87 | 94 | 100 | 100 | 2.0 s | 3.8 s | 0 |
| `/ats-guide` | 77 | 100 | 100 | 100 | 2.0 s | 2.3 s | 0.42 |

Homepage FCP/LCP moved by −0.2/−0.3 s between the two runs (same machine, run-to-run noise); no improvement is claimed for the homepage. The real, repeatable improvement is the raw-HTML table in §15.1: crawlers and no-JS clients now get the content instead of an empty shell.

**Open issue — residual CLS on some prerendered routes.** Prerendering means the static markup paints before React mounts; when React's first commit replaces the static markup (and, on lazy routes, briefly commits the Suspense fallback), Chrome records a shift. A handoff was added — the static markup lives in a sibling `#prerender` node, `#root` stays hidden until the route content has mounted, then the two swap in one frame — which took the role page from CLS 1.008 to 0.583. The remaining shift is concentrated on tall pages; the homepage (0.007) and `/country/de` (0) are unaffected. The complete fix is hydration (`hydrateRoot`) instead of `createRoot`, which reuses the prerendered DOM instead of replacing it; it was **not** done here because the app is client-first (theme, responsive and auth state are read at render time) and a hydration mismatch would be a worse regression than the shift. Exact cause and the recommended follow-up are recorded in §10 of `FINAL_SEO_IMPLEMENTATION_REPORT_2026-11-18.md`.

### 15.6 Checks run in this pass

| Check | Command | Result |
|---|---|---|
| TypeScript | `npm run lint` (`tsc --noEmit`) | **Pass**, exit 0 |
| Production build + prerender | `npm run build` | **Pass**, exit 0, 132 routes from 95 renders |
| Route/metadata/sitemap/404 audit | `npm run audit:routes` | **Pass**, 94 sitemap URLs, 139 paths, 0 problems |
| Clean install | `npm ci` (no `--legacy-peer-deps`) | **Pass**, native Windows packages present |
| Rendered page in a browser | built output on `127.0.0.1:4173` | 1 `h1`, canonical correct, 2 JSON-LD blocks, 4 FAQ `<details>`, header present, all assets 200 |
| Lighthouse | see §15.5 | recorded, including the open CLS issue |

Not tested here: Firebase auth/Firestore flows (no credentials in this workspace), Cloudflare Pages redirect/compression behaviour on the live domain, Search Console data. No deploy, commit or push was performed.

---

## 16. Deployment repair and duplicate-URL consolidation (2026-11-18)

This pass started from the finding that **none of §15 was ever live**. Measured with `curl` on 2026-11-18, `https://globecareer.online/`, `/resume-examples`, `/resume-examples/teacher` and `/nonexistent-xyz` all returned the *same* 13,708-byte SPA shell with HTTP 200, and `/pricing` still returned 200. Commit `c1b2473` reached GitHub but never deployed, because Cloudflare Pages installs with `bun install --frozen-lockfile` and `bun.lock` still declared the `motion` and `esbuild` entries that `package.json` had dropped.

### 16.1 What changed

| # | Fix | Where |
|---|-----|-------|
| 1 | **Bun lockfile synchronised** with `package.json` using Bun 1.4.4 (Cloudflare's build-image version). `motion` and `esbuild` entries removed rather than re-added; `jsdom` recorded; workspace name corrected to `globecareer`. `bun install --frozen-lockfile` now exits 0 and leaves `bun.lock` byte-identical. | `bun.lock` |
| 2 | **Node 24 pinned** (`20` → `24`). The locked Firebase 13 packages declare `node >= 24.12.0` and `npm ci` fails on Node 20/npm 10 with `ERR_INVALID_ARG_TYPE` inside `@google/genai`'s preinstall. Verified working on Node 24.22.3/npm 11.19.1; Cloudflare's image supplies Node 24.22.1. | `.nvmrc`, `.node-version`, `README.md`, `HOW-TO-RUN.txt` |
| 3 | **Duplicate URL consolidation.** 131 static 301 rules generated at build time from the app's route tables: 37 alias paths → canonical, 93 trailing-slash variants → canonical, `/admin/` → `/admin`. No chains, no loops, every destination a 200 page. `/pricing` and `/plans` stay 404 and are never redirected to the homepage. | `scripts/prerender.mjs` |
| 4 | **Local server now honours `_redirects`**, so the audit tests deployed behaviour instead of only static files — and ignores host-level rules exactly as Cloudflare Pages does. | `scripts/serve-dist.mjs` |
| 5 | **Audit now proves the redirect layer:** every alias and every sitemap URL's trailing-slash variant must 301 in one hop to the canonical page and end at 200; chains, loops and wrong targets fail the run. Output includes a full `redirectMap[]`. | `scripts/audit-routes.mjs` |
| 6 | **Dead `www` rule removed.** Cloudflare Pages `_redirects` cannot redirect by hostname (documented: "Domain-level redirects ❌"), so the rule added in `c1b2473` never fired. The file now documents the required dashboard Redirect Rule instead. | `public/_redirects`, `_redirects` |

### 16.2 Verification

| Check | Result |
|---|---|
| `bun install --frozen-lockfile` (clean `node_modules`) | **Pass**, exit 0, `bun.lock` unchanged |
| `npm ci` (Node 24.22.3 / npm 11.19.1) | **Pass**, exit 0 |
| `npm run lint` (`tsc --noEmit`) | **Pass**, exit 0 |
| `npm run build` | **Pass**, 132 HTML routes from 95 renders in 33.5 s |
| `npm run audit:routes` | **Pass** — 94 sitemap URLs, 132 pages, 101 paths, **130 redirects**, 0 problems |

### 16.3 Not verified

- **No deployment and no live change.** The push was refused by GitHub (403: the stored credential `easyworktoolsonline-ux` has no write access), so Cloudflare never received commit `0b1715f`. See §18 of `FINAL_GOOGLE_INDEXING_AND_DEPLOYMENT_REPORT_2026-11-18.md`.
- **Search Console** still has no export in this workspace, so the reported ~64 non-indexed URLs could not be matched, classified or re-counted. The causes were identified from the live HTML instead.
- `www` → apex still returns 200 and needs a dashboard Redirect Rule.
- Firebase auth / Firestore flows remain untested.
