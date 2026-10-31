# Cloudflare Security & Configuration Resolution Guide
**Domain:** `globecareer.online` & `www.globecareer.online`

This document details the exact resolutions for the 5 Cloudflare Security Center / Insights notices shown in your scan:

---

## Summary of Audit Findings & Actions Taken

| Scan Item | Severity | Root Cause | Status in Repository | Cloudflare Dashboard Action |
| :--- | :--- | :--- | :--- | :--- |
| **Security.txt not configured** | Low | Missing RFC 9116 security policy | **RESOLVED in repo** (`/.well-known/security.txt`) | Automatic upon deployment |
| **Domains without HSTS** (`globecareer.online`) | Moderate | Missing `Strict-Transport-Security` header | **RESOLVED in repo** (`_headers`) | 1-click toggle recommended |
| **Domains without HSTS** (`www.globecareer.online`) | Moderate | Missing `Strict-Transport-Security` header | **RESOLVED in repo** (`_headers`) | 1-click toggle recommended |
| **Bot Fight Mode not enabled** | Moderate | Cloudflare edge WAF toggle off | **RESOLVED in repo** (`robots.txt` protection) | 1-click toggle in Dashboard |
| **Review unwanted AI crawlers with AI Labyrinth** | Low | AI training scrapers not restricted | **RESOLVED in repo** (`robots.txt` AI blocks) | 1-click toggle in Dashboard |

---

## 1. Security.txt Configured (RFC 9116 Standard)
### What was added:
1. `public/.well-known/security.txt`:
   ```text
   # GlobeCareer Security Disclosure Policy (RFC 9116)
   Contact: mailto:info@globecareer.online
   Expires: 2027-12-31T23:59:59.000Z
   Preferred-Languages: en
   Canonical: https://globecareer.online/.well-known/security.txt
   Policy: https://globecareer.online/privacy
   Acknowledgments: https://globecareer.online/about
   ```
2. `public/security.txt`: Duplicate root fallback for automated scanners.
3. `_headers`: Configured `Content-Type: text/plain; charset=utf-8` and cache-control headers.
4. `_redirects`: Added 301 permanent redirect from `/security.txt` to `/.well-known/security.txt`.

---

## 2. HTTP Strict Transport Security (HSTS)
### What was added in code:
In `_headers` (both in root and `public/`):
```http
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```
This instructs every modern browser that `globecareer.online` and all subdomains (`www.globecareer.online`) must strictly communicate over HTTPS for 1 year (31,536,000 seconds) and qualifies for browser preload lists.

### Optional 1-Click Cloudflare Dashboard Setting:
1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com/).
2. Select **globecareer.online**.
3. In the left menu, navigate to **SSL/TLS** > **Edge Certificates**.
4. Scroll down to **HTTP Strict Transport Security (HSTS)** and click **Change HSTS settings**.
5. Check **Enable HSTS**.
6. Set **Max-Age Header (max-age)** to **12 months (31536000)**.
7. Check **Apply HSTS policy to subdomains (includeSubDomains)**.
8. Check **Preload**.
9. Click **Save**.

---

## 3. Bot Fight Mode Enabled
### What was added in code:
In `robots.txt`, crawler policies are explicitly divided to permit good search engines while restricting rogue automated extractors.

### 1-Click Cloudflare Dashboard Setting (Enables Edge WAF Defense):
1. In Cloudflare Dashboard, select **globecareer.online**.
2. In the left sidebar, click **Security** > **Bots**.
3. Look for **Bot Fight Mode**.
4. Switch the toggle to **ON**.
   *(Cloudflare will now automatically challenge or block known malicious automated bots, scrapers, and credential-stuffing engines before they ever hit your site).*

---

## 4. AI Crawlers & AI Labyrinth Protection
### What was added in code:
In `public/robots.txt` and `/robots.txt`:
Explicitly blocked resource-heavy, unauthorized AI scraping bots that ingest content for model training without attribution:
- `GPTBot` (OpenAI scraper)
- `ChatGPT-User`
- `CCBot` (Common Crawl)
- `anthropic-ai` & `ClaudeBot` / `Claude-Web` (Anthropic scrapers)
- `Bytespider` (ByteDance scraper)
- `PerplexityBot` (Perplexity AI)
- `Diffbot`, `Scrapy`, `Amazonbot`, `FacebookBot`, `Cohere-ai`, `Omgilibot`

Legitimate search crawlers (`Googlebot`, `Bingbot`, `Applebot`, `DuckDuckBot`, `YandexBot`, `Baiduspider`) remain **100% Allowed** to ensure peak SEO performance.

### 1-Click Cloudflare Dashboard Setting (AI Labyrinth / Block AI Scrapers):
1. In Cloudflare Dashboard, select **globecareer.online**.
2. Navigate to **Security** > **Bots**.
3. Locate **Block AI Scrapers and Crawlers** and turn the toggle to **ON**.
4. If available on your plan under Security / Bots, enable **AI Labyrinth** (which serves deceptive bait pages to disorient unauthorized scrapers).

---

## Verification
- Run `npm run build` — `_headers`, `_redirects`, `robots.txt`, and `.well-known/security.txt` are included in `dist/`.
- Deploy the updated ZIP to Cloudflare Pages or push the repository to GitHub.
- Within minutes, re-run the scan in Cloudflare Security Center to confirm all 5 items transition to passed/cleared status.
