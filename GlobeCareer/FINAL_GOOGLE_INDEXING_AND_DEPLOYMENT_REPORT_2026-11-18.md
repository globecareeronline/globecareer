# GlobeCareer — Final Google Indexing and Deployment Report

Date: 2026-11-18
Project: `https://globecareer.online/` — repository `globecareeronline/globecareer`, branch `main`
Starting published commit: `c1b2473b4ceb96bf21c4df902418a30357313645`
Runtimes used for verification: Node.js 24.22.3, npm 11.19.1, Bun 1.4.4 (the version Cloudflare Pages runs)
Working copy: a fresh clone of the repository at `_gitremote/`, cross-checked byte-for-byte against the previously delivered ZIP (`diff -r`, 184 files, no differences).

**Status in one line:** the deployment blocker is fixed and verified locally, but the push to GitHub was refused because the machine's only stored GitHub credential (`easyworktoolsonline-ux`) has no write access to this repository. Nothing was deployed, so no live behaviour changed. Details in §18–§20.

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

I searched the external safety backup (`F:\GLOBECAREER-SAFETY-BACKUP-2026-11-18\`) and every research folder for a Search Console export and found none: the only data files are four SEMrush CSVs (`gap_keywords`, `globecareer_online-backlinks_matrix`, `globecareer_seo_master_data`, `overview-trend`), two SEMrush PDFs, and the AI-Studio exports. There is no per-URL indexing export, so **the 64 URLs cannot be listed, classified or re-counted from evidence.** Any URL-by-URL table claiming otherwise would be invented.

What *can* be established without the export is the cause of all four categories, because the cause was visible in the delivered HTML (§3).

## 2. Current verified issue counts (technical eligibility, not Google indexing)

Measured on the built output with Cloudflare Pages resolution rules (`npm run audit:routes`):

| Measure | Result |
|---|---|
| Sitemap URLs returning 200 with a single `h1`, unique title, unique description, self-referencing canonical | **94 / 94** |
| Pages returning a real HTTP 404 (unknown paths, `/pricing`, `/plans`, bad role/country slugs) | **6 / 6** |
| Duplicate URL variants returning 301 to the canonical URL in exactly one hop | **130 / 130** |
| Redirect chains, loops or 301s whose destination is not a 200 page | **0** |
| Sitemap URLs that are noindex, redirected, duplicate or 404 | **0** |
| Invalid JSON-LD blocks | **0** |
| Route audit problems | **0** |

These are statements about technical eligibility. They are **not** a claim that Google has indexed anything — that requires the live deploy and Search Console's own crawl.

## 3. Status of the four indexing categories

### 3.1 Alternative page with proper canonical tag — **fixed for path-level duplicates; host-level variant needs a dashboard rule**

Three sources of "alternative page" URLs existed:

1. **37 alias paths** defined in the app's own route table (`/resume-templates`, `/job-examples`, `/eu-cv-format`, `/word-counter`, `/cover-letter`, …). Each was prerendered and served 200 with a canonical pointing at the canonical path — exactly the definition of this category.
2. **Trailing-slash variants** of all 93 non-root sitemap URLs (`/templates/`), which returned 200 with the same content.
3. **`www.globecareer.online`**, which returned 200 with no redirect.

Fix applied: alias paths and trailing-slash variants now return a single-hop 301 to the canonical URL (131 rules generated at build time from the app's route tables, 130 verified). The `www` variant **cannot** be fixed in the repository: Cloudflare Pages `_redirects` does not support domain-level redirects (documented: "Domain-level redirects ❌"), so the rule that was added in `c1b2473` never worked. It has been removed and replaced with a comment naming the correct fix — a zone-level Redirect Rule in the Cloudflare dashboard. Until that rule exists the canonical tag already consolidates the two hostnames, which is why Search Console reports this category as *not an error*.

### 3.2 Page with redirect — **no unintended redirects remain**

Before this pass the only redirect rules were seven self-referential `200` proxy entries plus the dead `www` rule. After this pass the file contains 138 rules: 7 proxies, 131 single-hop 301s. Every one of the 130 duplicate-variant 301s was followed programmatically and reaches a 200 page in one hop. `http://` → `https://` is a single 301 at the edge (verified live).

### 3.3 Discovered — currently not indexed — **cause removed; depends on the deploy**

This category means Google found the URL (sitemap or link) but chose not to crawl or index it. The live evidence explains why: **every URL on the site returned the same 13,708-byte SPA shell** (verified today with `curl`, §20). With no page-specific HTML there was nothing for Google to prefer over the other 93 identical pages. Prerendering to 132 page-specific HTML files fixes the cause; it only takes effect once a deployment succeeds.

### 3.4 Crawled — currently not indexed — **cause removed; depends on the deploy**

Same root cause plus soft-404 behaviour: unknown paths and `/pricing` / `/plans` returned the homepage with HTTP 200, so crawled URLs resolved to duplicate or empty content. Prerendered HTML (unique title, description, `h1`, 400+ characters of page-specific text, JSON-LD) plus a real `404.html` with a 404 status removes it.

## 4. URL-by-URL findings

Because no Search Console export exists, the auditable URL set is the site's own: 94 sitemap URLs + 37 aliases + 93 trailing-slash variants + 6 must-404 paths + `/admin`. Every one was fetched locally through a Cloudflare-Pages-equivalent server and recorded in `route_audit_2026-11-18.json` (per-path status, title, description length, canonical, robots, `h1` count, JSON-LD blocks, text length, and for redirects the destination, hop count and final status).

Per-URL result for the canonical set:

| Field | Result across all 94 sitemap URLs |
|---|---|
| HTTP status | 200 |
| Title | present and unique (0 duplicates) |
| Meta description | present and unique (0 duplicates) |
| Canonical | self-referencing, `https://globecareer.online…`, matches sitemap |
| Robots | indexable (no `noindex`) |
| `h1` | exactly one |
| Prerendered text | ≥ 400 characters (audit threshold; homepage ≈ 16.9k) |
| JSON-LD | present and valid |
| Internal links | every page reachable from header/footer, hub sections or sibling links |

The specific URLs Google listed cannot be matched to rows without the export. If you export the four categories (Search Console → Indexing → Pages → Export), the same audit can be run against those exact URLs field by field.

## 5. Complete redirect map

Machine-readable, with every hop: `route_audit_2026-11-18.json` → `redirectMap[]` (`source`, `status`, `location`, `target`, `finalStatus`, `hops`, `loop`, `expectedTarget`). Summary:

| Group | Count | Rule | Hops | Final |
|---|---|---|---|---|
| Alias paths → canonical | 37 | e.g. `/resume-templates` → `/templates` 301 | 1 | 200 |
| Trailing slash → canonical | 93 | `/templates/` → `/templates` 301 | 1 | 200 |
| `/admin/` → `/admin` | 1 | trailing-slash normalisation | 1 | 200 |
| Edge rule (outside `_redirects`) | — | `http://` → `https://` at Cloudflare | 1 | 200 |
| **Total verified** | **130** | all single-hop | **1** | **200** |

Rules are generated by `scripts/prerender.mjs` from `PATH_TO_PAGE` / `PAGE_TO_PATH`, so a renamed page cannot leave a stale redirect. `/pricing` and `/plans` are deliberately **not** redirected to the homepage (they are empty pages; they 404). `/subscription` and `/billing` 301 to `/job-tracker` because the app has always served that page at those paths (`PAGE_ALIAS_MAP`).

## 6. Canonical audit

- 94/94 sitemap URLs emit a self-referencing canonical on `https://globecareer.online` (non-www, HTTPS).
- No page canonicalises to the homepage.
- No canonical points at a redirect source: alias and trailing-slash URLs canonicalise to the 301 destination.
- Sitemap URLs and canonical URLs are identical strings (checked per URL in the audit).
- Canonicals are present in the prerendered HTML, before any JavaScript runs.

## 7. Sitemap route results

| Item | Value |
|---|---|
| `<loc>` entries | 94 |
| Duplicate entries | 0 |
| XML declaration and `</urlset>` | present |
| `<url>` = `</url>` = `<loc>` count | 94 |
| Host | `https://globecareer.online` for every entry |
| Every entry has prerendered HTML | yes (94/94) |
| Every entry returns 200 | yes |
| `lastmod` | unchanged; only pages that actually changed carry new dates |

## 8. Discovered-not-indexed fixes

1. Page-specific HTML for all 94 URLs (previously one shell for every URL).
2. Sitemap contains only 200, canonical, indexable URLs.
3. Every valuable page has at least one contextual internal link (role pages are linked from the `/resume-examples` hub; country pages from `/country-guides`).
4. No orphan pages: the audit's prerender inventory and the link graph agree.

## 9. Crawled-not-indexed fixes

1. Each role page carries occupation-specific responsibilities, skills, qualifications, experience levels, resume guidance, ATS keywords and four answered FAQs — no invented statistics, salaries or hiring figures.
2. Duplicate/thin variants now 301 to one URL instead of competing.
3. Real 404s replace soft 404s.
4. Titles, descriptions and `h1`s are unique per URL (0 duplicates across the sitemap).

## 10. Prerendering results

| Measure | Result |
|---|---|
| Unique renders | 95 |
| HTML files written | 132 (37 alias files reuse the canonical page's HTML; the 301 wins over the file) |
| Renders failed | 0 |
| `dist/404.html` | generated, `noindex, follow`, real 404 status |
| Client-side takeover | unchanged (`createRoot` on the same `#root`) |

Pre-existing, unchanged warning during prerender: a React `NotFoundError` / "error boundary" console message from a component unmounting a detached node. It is non-fatal (build exit 0, output verified) and was present in `c1b2473`.

## 11. Sitemap and robots validation

- `robots.txt` (both copies, root and `public/`) allows all crawlers, blocks only `/admin`, `/api/`, `/assets/aistudio/`, `/ZIP_MANIFEST`; declares `Sitemap: https://globecareer.online/sitemap.xml`; `dist/robots.txt` is byte-identical to `public/robots.txt` (audited).
- No indexable page or asset is blocked.
- The sitemap is not used as a substitute for canonical or `noindex` directives.

## 12. Internal linking improvements

No new links were added in this pass; the architecture from `c1b2473` was verified instead: role pages ← `/resume-examples` hub ← header/footer; country pages ← `/country-guides`; tools ← header/footer. No sitewide keyword-anchor blocks were introduced.

## 13. Bun lockfile root cause and fix

**Root cause.** Cloudflare Pages detects `bun.lock` and installs with `bun install --frozen-lockfile`. `package.json` had `motion` and `esbuild` removed (commit `c1b2473`), but `bun.lock` was never regenerated, so it still declared both. The frozen install refuses to proceed when the lock and the manifest disagree:

```
error: lockfile had changes, but lockfile is frozen
dependencies in package.json changed since bun.lock was saved: esbuild was removed
```

**Fix.** `bun.lock` regenerated with Bun **1.4.4** (the version in Cloudflare's build image and in the failing log), so it matches `package.json` exactly:

- `motion` removed (unused: no `motion`/`framer-motion` import exists in `src/`).
- The top-level `esbuild` devDependency entry removed — **not re-added** to silence the error. `esbuild` remains only as Vite's/`tsx`'s transitive dependency at its own resolved version.
- `jsdom` (already in `package.json`) is now recorded in the workspace section.
- Lockfile workspace name corrected `react-example` → `globecareer` to match `package.json`.
- No dependency was added, removed or upgraded beyond removing those two unused entries; `package-lock.json` was not modified.

Bun was selected by Cloudflare because the repository ships a `bun.lock`; that behaviour is unchanged (the fix makes the lock consistent rather than changing build configuration).

**Node.js 24 pin.** The Node 20 end-of-life warning was investigated separately and is a real incompatibility, not just a notice:

- The locked Firebase 13 tree declares `node >= 24.12.0` (`@firebase/app`, `@firebase/auth`, `@firebase/ai`, …), and `undici@8.12.4` needs ≥ 22.19.
- On Node 20.19.5 + npm 10.8.2, `npm ci` **fails** with `ERR_INVALID_ARG_TYPE` while spawning `@google/genai`'s `preinstall` (`echo 'preinstall: no-op'`).
- On Node 24.22.3 + npm 11.19.1 it passes.
- Cloudflare's current Pages build image provides Node 22.23.4 by default, Node 24.22.1 in the image, and honours `.nvmrc` / `.node-version` / `NODE_VERSION`.

`.nvmrc` and `.node-version` therefore changed `20` → `24`, with README and HOW-TO-RUN text corrected to match. This is the one deployment-environment-affecting change in this pass; if the build image on your account does not yet offer Node 24, reverting those two one-line files is the whole rollback.

## 14. Bun frozen-lockfile result

| Command | Result |
|---|---|
| `bun install --frozen-lockfile` (from a clean `node_modules`) | **exit 0**, 300 packages |
| `bun.lock` SHA-256 before vs after | identical (`c76663130c28…` before the name correction, own hash after) — **the frozen install does not modify the lock** |

## 15. npm installation result

| Command | Result |
|---|---|
| `npm ci` (Node 24.22.3, npm 11.19.1) | **exit 0**; install-script warnings only (`@firebase/util`, `@google/genai`, `esbuild`, `protobufjs` are outside npm's allowScripts list) |
| `npm ci` (Node 20.19.5, npm 10.8.2) | **fails** — `ERR_INVALID_ARG_TYPE` in `@google/genai` preinstall (see §13) |

## 16. TypeScript and lint results

`npm run lint` → `tsc --noEmit` → **exit 0, no errors.**

## 17. Build and route audit results

| Command | Result |
|---|---|
| `npm run build` | **exit 0**, 132 HTML routes from 95 renders in 33.5 s |
| `npm run audit:routes` | **exit 0** — 94 sitemap URLs, 132 prerendered pages, 101 paths, 130 redirects, **0 problems** |

## 18. GitHub push confirmation — **BLOCKED**

| Step | Result |
|---|---|
| Fetch remote `main` | `c1b2473b4ceb96bf21c4df902418a30357313645` (unchanged; local was one commit ahead → fast-forward) |
| Commit created locally | `0b1715fdb66e9c52d6a64003eac2bc06db989ccb` — 11 files, +1751 / −124 |
| `git push origin main` | **refused (HTTP 403)**: `Permission to globecareeronline/globecareer.git denied to easyworktoolsonline-ux` |

The machine's only stored GitHub credential is the personal account `easyworktoolsonline-ux`, which has read access only; there is no SSH key and no `gh` CLI. The fine-grained token used for the previous push was deliberately never written to disk, so it is not available now. No force-push, no history rewrite, no remote branch change occurred — the push simply did not happen.

To finish: a fine-grained PAT scoped to `globecareeronline/globecareer` with **Contents: Read and Write** (Metadata: Read-only). It will be passed to `git` through an environment-only askpass helper and not written to disk, config, the remote URL or commit metadata.

## 19. Cloudflare deployment result — **not triggered**

Cloudflare Pages deploys on push to `main`. Since the push was refused, **no deployment was started and no build log exists for `0b1715f`**. The Bun fix is verified locally against Bun 1.4.4 with the exact frozen command, but its success on Cloudflare remains unproven until a push happens. No Cloudflare setting, domain, DNS record, build command or environment variable was touched.

## 20. Live website verification

Live state as measured today (before any deploy), with `curl`:

| URL | Result | Meaning |
|---|---|---|
| `https://globecareer.online/` | 200, 13,708 bytes | old SPA shell, still the pre-`c1b2473` build |
| `https://globecareer.online/resume-examples` | 200, **13,708 bytes** | identical bytes to the homepage — no prerendered content live |
| `https://globecareer.online/resume-examples/teacher` | 200, **13,708 bytes** | the 8 role pages are not live |
| `https://globecareer.online/nonexistent-xyz` | **200**, 13,708 bytes | soft-404 still live |
| `https://globecareer.online/pricing`, `/plans` | 200 | soft-404 still live |
| `http://globecareer.online/` | 301 → `https://globecareer.online/` | correct, single hop |
| `http://www.globecareer.online/` | 301 → `https://www.globecareer.online/` | edge HTTPS upgrade only |
| `https://www.globecareer.online/` | **200** | no www → apex redirect (needs dashboard rule) |

This is the single most important finding of the session: **the indexing problems are a deployment problem, not a content problem.** Every fix in `c1b2473` — prerendering, real 404s, role pages, single `h1` — has been invisible to Google because the deploy has been failing since that commit.

## 21. Remaining issues and manual actions

**Blocking (needs you):**

1. **GitHub write credential** for `globecareeronline/globecareer` (§18). Without it the commit cannot be published and Cloudflare cannot deploy.
2. **`www` → apex 301** must be a zone-level Redirect Rule (Rules → Redirect Rules, 301, preserve path + query). Cloudflare Pages cannot do it from `_redirects`. Canonical tags already mitigate it.

**After the deploy lands:**

3. Resubmit `https://globecareer.online/sitemap.xml` in Search Console and run URL Inspection + "Test live URL" on one URL per category, comparing Google's selected canonical with the declared one.
4. Export the four "not indexed" lists so the exact URLs can be audited field by field against `route_audit_2026-11-18.json`.

**Known, pre-existing, not changed here:**

5. React `NotFoundError` / error-boundary message during prerender (non-fatal).
6. Accessibility findings on `/templates`, `/country/de` and the builder (colour contrast, heading order, unlabelled `<select>`).
7. Residual CLS on some prerendered routes (static markup replaced on mount; the documented exact fix is `hydrateRoot`, deliberately not attempted).
8. Firebase auth / Firestore flows untested — no credentials in this environment.
9. `/subscription` and `/billing` now 301 to `/job-tracker`; change the mapping if those URLs should 404 instead.

**Assumption to re-check after the first successful deploy:** the trailing-slash 301s rely on Cloudflare Pages applying `_redirects` before static assets (documented behaviour). Verify `/templates/` once live; if any rule does not fire, the generated block in `dist/_redirects` is the only place to look.
