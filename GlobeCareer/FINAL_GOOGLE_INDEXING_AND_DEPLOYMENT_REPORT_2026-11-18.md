# GlobeCareer — Final Google Indexing and Deployment Report

Date: 2026-11-18 (verification runs executed 2026-11-20)
Project: `https://globecareer.online/` — repository `globecareeronline/globecareer`, branch `main`
Starting published commit: `c1b2473b4ceb96bf21c4df902418a30357313645`
Final published commit: `61c7eb4` (on top of `0b1715f` and `528b52a`), fast-forward from `c1b2473`
Runtimes used: Node.js 24.22.3, npm 11.19.1, Bun 1.4.4 (Cloudflare's build-image version)

**Status:** the deployment failure is fixed, the site now serves prerendered page-specific HTML, and the live domain was verified after each deployment. Two problems surfaced during live verification and were fixed before this report (§19.2).

---

## 1. Initial Search Console issue counts

| Item | Value | Verification status |
|---|---|---|
| Reported non-indexed URLs | ~64 across four categories | **User-reported; not verifiable here** |
| Category 1 | Alternative page with proper canonical tag | Not quantifiable — no export |
| Category 2 | Page with redirect | Not quantifiable — no export |
| Category 3 | Discovered — currently not indexed | Not quantifiable — no export |
| Category 4 | Crawled — currently not indexed | Not quantifiable — no export |
| Sitemap routes before this pass | 94 (86 + 8 role pages) | **Verified** in `public/sitemap.xml` |

The safety backup (`F:\GLOBECAREER-SAFETY-BACKUP-2026-11-18\`) and every research folder were searched for a Search Console export. There is none: the only data files are four SEMrush CSVs (`gap_keywords`, `globecareer_online-backlinks_matrix`, `globecareer_seo_master_data`, `overview-trend`), two SEMrush PDFs and the AI-Studio exports. **The 64 URLs cannot be listed or re-counted from evidence**, and no URL-by-URL table matching them would be honest. What the evidence does establish is why they were not indexed (§3).

## 2. Current verified issue counts

Measured locally against the built output with Pages-equivalent resolution (`npm run audit:routes`), then re-measured **on the live domain** after deployment:

| Measure | Local build | Live domain |
|---|---|---|
| Sitemap URLs returning 200 with one `h1`, unique title, unique description, self-referencing canonical, ≥400 chars of text | 94 / 94 | **94 / 94** |
| Trailing-slash variants resolving to the canonical URL in one hop | 93 / 93 | **93 / 93** |
| Alias paths 301 → canonical → 200 in one hop | 37 / 37 | **37 / 37** |
| Removed/unknown URLs returning a real 404 with `noindex, follow` | 6 / 6 | **5 / 5 sampled** |
| Redirect chains, loops, or redirects not ending at 200 | 0 | **0** |
| Invalid JSON-LD blocks | 0 | 0 |
| Route audit problems | **0** | — |

This is technical eligibility, measured. It is **not** a claim that Google has indexed anything: only Search Console can confirm that, and §21 lists the exact manual steps.

## 3. Status of the four indexing categories

### 3.1 Alternative page with proper canonical tag — **FIXED for path-level duplicates; www variant still needs a dashboard rule**

Three sources existed:

1. **37 alias paths** (`/resume-templates`, `/job-examples`, `/eu-cv-format`, `/word-counter`, `/cover-letter`, …) served 200 with a canonical pointing elsewhere — the exact definition of this category.
2. **Trailing-slash variants** of every sitemap URL.
3. **`www.globecareer.online`** serving 200 with no redirect.

Fixes: aliases now 301 to the canonical path (37 rules, generated at build time from `PATH_TO_PAGE`, verified live). Slash variants are normalised by Cloudflare Pages itself (308 to the canonical URL, 93 verified live). `www` **cannot** be fixed from the repository — Cloudflare Pages `_redirects` does not support domain-level redirects — so the non-functional rule from `c1b2473` was removed and the correct fix documented (§21).

### 3.2 Page with redirect — **FIXED, and a newly introduced loop was caught and removed**

After the first successful deployment, **every canonical URL returned 308** and the trailing-slash 301 rules added in `0b1715f` bounced against it: `/resume-examples` → 308 → `/resume-examples/` → 301 → `/resume-examples` → … (`curl: (47) Maximum redirects followed`). Root cause: Cloudflare Pages derives a page's canonical URL from the build layout — `foo/index.html` is served at `/foo/` and `/foo` is 308-redirected there.

Fixed in `61c7eb4` by emitting `<path>.html`, which Pages serves at `/path` with **200** — matching the canonicals, the sitemap and every internal link — and by deleting the trailing-slash rules so Pages owns that normalisation. The local Pages-analogue server now reproduces `html_handling: auto-trailing-slash`, so this class of loop fails `npm run audit:routes` instead of shipping.

Live result: 94/94 sitemap URLs 200, 93/93 slash variants one hop, 37/37 aliases one hop, 0 loops.

### 3.3 Discovered — currently not indexed — **cause removed and verified live**

The cause was visible in the delivered HTML: **every URL returned the same 13,708-byte SPA shell**, so Google had 94 identical, contentless URLs. The live homepage now returns ~161 KB of page-specific HTML with a title, description, canonical, JSON-LD, one `h1` and ~16.9k characters of text; role pages, country pages and tools each return their own.

### 3.4 Crawled — currently not indexed — **cause removed and verified live**

Same root cause plus soft-404 behaviour: unknown paths, `/pricing` and `/plans` returned the homepage with 200. Now: prerendered unique content per URL, and a real `404.html` (`noindex, follow`, HTTP 404) generated from the app's not-found view and verified live on `/nonexistent-xyz`, `/pricing`, `/plans`, `/country/zz`, `/resume-examples/not-a-real-role`.

## 4. URL-by-URL findings

The auditable set is the site's own: **94 sitemap URLs + 37 aliases + 93 slash variants + 6 must-404 paths + `/admin`**, all measured. Full per-URL rows (status, title, description length, canonical, robots, `h1` count, JSON-LD blocks, text length) are in `route_audit_2026-11-20.json`; the redirect rows are in its `redirectMap[]`.

Live per-URL result for all 94 canonical URLs: **200**, self-referencing canonical equal to the sitemap URL, exactly one `h1`, ≥400 characters of crawlable text, indexable robots directive, valid JSON-LD.

The specific URLs Google listed cannot be matched without the export. If the four lists are exported from Search Console, the same script can classify them field by field.

## 5. Complete redirect map

Machine-readable with every hop: `route_audit_2026-11-20.json` → `redirectMap[]` (`source`, `status`, `location`, `target`, `finalStatus`, `hops`, `loop`, `expectedTarget`). Summary of what is live:

| Group | Count | Rule | Hops | Final |
|---|---|---|---|---|
| Alias path → canonical | 37 | `/resume-templates` → `/templates` 301 | 1 | 200 |
| Trailing slash → canonical | 93 | `/templates/` → `/templates` (Pages 308) | 1 | 200 |
| `/admin/` → `/admin` | — | Pages 308 | 1 | 200 |
| Edge HTTPS upgrade | — | `http://` → `https://` (Cloudflare 301) | 1 | 200 |
| **Total verified** | **130 +** | all single-hop, none looping | **1** | **200** |

Alias rules are generated by `scripts/prerender.mjs` from the app's route tables, so renaming a page cannot leave a stale rule. `/pricing` and `/plans` are deliberately **not** redirected to the homepage — they 404. `/subscription` and `/billing` 301 to `/job-tracker`, matching what the app has always served at those paths (`PAGE_ALIAS_MAP`).

## 6. Canonical audit

- 94/94 canonical URLs emit a self-referencing canonical on `https://globecareer.online` (HTTPS, non-www), identical to their sitemap entry — verified live.
- No page canonicalises to the homepage; no canonical points at a redirect source.
- Canonicals are present in the prerendered HTML before any JavaScript executes.

## 7. Sitemap route results

| Item | Value |
|---|---|
| `<loc>` entries | 94 (live and in `public/sitemap.xml`) |
| Duplicate entries | 0 |
| XML declaration / `</urlset>` / `<url>` = `</url>` = `<loc>` | present / present / equal |
| Host | `https://globecareer.online` for every entry |
| Every entry returns 200 on the live domain | **yes, 94/94** |
| Every entry has prerendered HTML | yes, 94/94 |
| `lastmod` | unchanged except pages whose content genuinely changed |

## 8. Discovered-not-indexed fixes

Page-specific HTML for all 94 URLs; sitemap contains only 200, canonical, indexable URLs; every valuable page has at least one contextual internal link (role pages from the `/resume-examples` hub, country pages from `/country-guides`); no orphan pages.

## 9. Crawled-not-indexed fixes

Role pages carry occupation-specific responsibilities, skills, qualifications, experience levels, resume guidance, ATS keywords and four answered FAQs — no invented statistics, salaries or hiring figures. Duplicate/thin variants consolidate to one URL; soft-404s replaced by real 404s; titles, descriptions and `h1`s unique across the sitemap (0 duplicates).

## 10. Prerendering results

| Measure | Result |
|---|---|
| Unique renders | 95 |
| HTML files written | 132 (95 canonical + 37 alias files) |
| Output layout | `<path>.html` (78 at the root, 54 nested) — required for Pages to serve `/path` with 200 |
| Failed renders | 0 |
| `dist/404.html` | generated, `noindex, follow`, served with HTTP 404 |
| Client-side takeover | unchanged (`createRoot` on the same `#root`) |

Pre-existing, unchanged: a React `NotFoundError` / error-boundary console message during prerender (non-fatal, build exit 0).

## 11. Sitemap and robots validation

`robots.txt` (root and `public/`, byte-identical in `dist/`) allows crawling, blocks only `/admin`, `/api/`, `/assets/aistudio/`, `/ZIP_MANIFEST`, and declares `Sitemap: https://globecareer.online/sitemap.xml` — confirmed live. No indexable page or asset is blocked; the sitemap is not used as a substitute for canonical or `noindex`.

## 12. Internal linking improvements

No new links added in this pass; the `c1b2473` architecture was verified instead (role pages ← hub ← header/footer; country pages ← `/country-guides`; tools ← header/footer). No sitewide keyword-anchor blocks.

## 13. Bun lockfile root cause and fix

**Root cause.** Cloudflare Pages detects `bun.lock` and installs with `bun install --frozen-lockfile`. `package.json` had `motion` and `esbuild` removed in `c1b2473`, but `bun.lock` was never regenerated, so the frozen install aborted:

```
error: lockfile had changes, but lockfile is frozen
dependencies in package.json changed since bun.lock was saved: esbuild was removed
```

**Fix.** `bun.lock` regenerated with Bun **1.4.4** (the version in the failing log and in Cloudflare's image):

- `motion` removed (no `motion`/`framer-motion` import exists in `src/`).
- The top-level `esbuild` devDependency entry removed — **not re-added** to silence the error; `esbuild` remains only as Vite's/`tsx`'s transitive dependency at its own version.
- `jsdom` recorded; workspace name corrected `react-example` → `globecareer`.
- No dependency added, removed (beyond those two unused entries) or upgraded; `package-lock.json` untouched.

Bun is still selected because the repository ships `bun.lock`; the fix makes the lock consistent rather than changing build configuration.

**Node 24 pin (investigated separately).** The Node 20 EOL warning was a real incompatibility, not just a notice:

- The locked Firebase 13 tree declares `node >= 24.12.0`; `undici@8.12.4` needs ≥22.19.
- On Node 20.19.5/npm 10.8.2 `npm ci` **fails** (`ERR_INVALID_ARG_TYPE` spawning `@google/genai`'s `preinstall`, which is `echo 'preinstall: no-op'`).
- On Node 24.22.3/npm 11.19.1 it passes; Cloudflare's build image ships Node 24.22.1 and honours `.nvmrc`/`.node-version`.

`.nvmrc` and `.node-version` changed `20` → `24`, with README/HOW-TO-RUN corrected. Both post-change deployments built successfully on Cloudflare, which confirms Node 24 is available and working in the build image.

## 14. Bun frozen-lockfile result

| Command | Result |
|---|---|
| `bun install --frozen-lockfile` from a clean `node_modules` (repo and extracted ZIP) | **exit 0**, 300 packages |
| `bun.lock` SHA-256 before vs after | **identical** — the frozen install does not modify the lock |
| Cloudflare's own frozen install | **succeeded** — the deployment that followed built and published |

## 15. npm installation result

| Command | Result |
|---|---|
| `npm ci` (Node 24.22.3 / npm 11.19.1) — repo and extracted ZIP | **exit 0** |
| `npm ci` (Node 20.19.5 / npm 10.8.2) | fails, see §13 |

## 16. TypeScript and lint results

`npm run lint` → `tsc --noEmit` → **exit 0, no errors** (repo and extracted ZIP).

## 17. Build and route audit results

| Command | Result |
|---|---|
| `npm run build` | **exit 0**, 132 HTML routes from 95 renders in ~34–39 s |
| `npm run audit:routes` | **exit 0** — 94 sitemap URLs, 132 pages, 101 paths, 130 redirects, **0 problems** |

## 18. GitHub push confirmation

| Step | Result |
|---|---|
| Remote `main` before | `c1b2473` (unchanged by anyone else) |
| Commits published | `0b1715f` (lockfile, Node 24, alias 301s) → `528b52a` (reports) → `61c7eb4` (`.html` layout + redirect correction) |
| Push | `c1b2473..528b52a` then `528b52a..61c7eb4` — fast-forward, no force-push, no history rewrite |
| Remote `main` after | **`61c7eb4`** (`git ls-remote`) |
| Authentication | fine-grained PAT supplied by the owner, used through an environment-only askpass helper that was deleted immediately: never written to disk, git config, the remote URL or commit metadata |

The first push attempt was refused (HTTP 403) because the machine's stored credential (`easyworktoolsonline-ux`) is read-only for this repository; it was resolved with the owner-supplied token.

## 19. Cloudflare deployment result

### 19.1 Result

Cloudflare Pages built and published both pushes automatically; no Cloudflare setting, DNS record, domain, build command or environment variable was touched.

### 19.2 Defect found and fixed during live verification

The first deployment exposed a real regression: **every canonical URL returned 308**, because Pages serves `foo/index.html` at `/foo/` and the trailing-slash 301 rules added with the lockfile fix created a loop with it. Corrected in `61c7eb4` (see §3.2). The second deployment removed it: `/resume-examples` returns 200.

This is exactly the class of problem that only shows up after deployment — hence the live verification below rather than trusting a green local build.

## 20. Live website verification (after the final deployment)

| Check | Result |
|---|---|
| All 94 sitemap URLs | **200**, self-referencing canonical, one `h1`, ≥400 chars text |
| Homepage raw HTML | ~161 KB prerendered, `data-prerendered="true"` |
| `/resume-examples`, `/resume-examples/teacher`, `/country/de`, `/resume-builder`, `/ats-guide` | 200 with their own titles/canonicals |
| Trailing-slash variants (93) | 301/308 → canonical, one hop, final 200 |
| Alias URLs (37) | 301 → canonical, one hop, final 200 |
| `/nonexistent-xyz`, `/pricing`, `/plans`, `/country/zz`, `/resume-examples/not-a-real-role` | **404** with `noindex, follow` |
| Redirect loops | **none** (all families followed with `-L`) |
| `http://` → `https://` | 301, single hop |
| Sitemap | 200, 94 `<loc>`, all on `https://globecareer.online` |
| `robots.txt` | 200, `Sitemap:` directive present |
| `https://www.globecareer.online/` | **200 — still not redirected** (§21) |

## 21. Remaining issues and manual actions

**Needs you (cannot be done from the repository):**

1. **`www` → apex 301.** Add a zone-level Redirect Rule (Rules → Redirect Rules, 301, preserve path + query) matching `www.globecareer.online/*` → `https://globecareer.online/${path}`. Canonical tags already consolidate the hostnames in the meantime, which is why Search Console classes this as "alternative page with proper canonical tag" rather than an error.
2. **Search Console follow-up:** resubmit `https://globecareer.online/sitemap.xml`, then run URL Inspection → "Test live URL" on one URL per category and compare Google's selected canonical with the declared one. Export the four "not indexed" lists so the exact URLs can be classified field by field.

**Known, pre-existing, unchanged:**

3. React `NotFoundError` / error-boundary console message during prerender (non-fatal).
4. Accessibility findings on `/templates`, `/country/de` and the builder (colour contrast, heading order, unlabelled `<select>`).
5. Residual CLS on some prerendered routes; the documented exact fix is `hydrateRoot`, deliberately not attempted.
6. Firebase auth / Firestore flows untested — no credentials in this environment.
7. `/subscription` and `/billing` 301 to `/job-tracker`; change the mapping if those URLs should 404 instead.
8. Google's own indexing status is unverified: no Search Console access or export exists in this workspace. Everything above is technical eligibility plus measured live HTTP behaviour.
