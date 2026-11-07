# GlobeCareer — International CV/Resume Builder & Career Suite

GlobeCareer is a 100% free international career development platform. It enables job seekers worldwide to create ATS-optimized resumes, cover letters, recommendation letters, professional biographies, and resignation letters tailored to hiring regulations across **40+ countries**.

---

## 🌟 Key Features

- **Country-Tailored Resume Builder:** Adapts formatting, date conventions, paper geometry (US Letter vs. International A4), and photo regulations for 40 countries (US, UK, Germany, Canada, Australia, France, Japan, UAE, Singapore, etc.).
- **100% Free Exports:** Unlimited downloads of vector PDF and Microsoft Word (`.docx`) documents with zero watermarks and no required registration.
- **Professional Bio Generator (`/bio-generator`, `/bio-templates`):** 15+ industry templates with Short, Medium, and Extended outputs in 1st-person and 3rd-person perspectives.
- **Resume Summary & Objective Generator (`/summary-generator`, `/summary-templates`):** 18+ ATS-tested professional summaries, career objectives, and LinkedIn headlines with 1-click insertion into the Resume Builder.
- **Resignation Letter Generator (`/resignation-letter`, `/resignation-letter-templates`):** 11+ departure scenarios with country notice guidelines (US, UK, DE, AU) and printable export.
- **ATS Resume Checker (`/ats-checker`):** Keyword comparison against job descriptions with real-time match scoring and gap analysis.
- **Job Application Pipeline Tracker (`/job-tracker`):** Free Kanban board for managing job applications, interview stages, and deadlines.
- **Verified Jobs Portal (`/jobs`):** Authenticated international positions with anti-scam verification.
- **Interview Preparation (`/interview-prep`):** STAR framework answers and international behavioral interview etiquette.

---

## 🛠️ Tech Stack

- **Framework:** React 19 (SPA) with TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React
- **Document Export:** `docx` (native binary Word generation) and browser vector print engines
- **State Management:** React hooks with `localStorage` persistence

---

## 🖥️ Running GlobeCareer Locally (Extracted ZIP)

### Method 1: Windows 1-Click Launcher (Recommended for Windows)
1. Extract the downloaded ZIP (`GlobeCareer-GitHub-Cloudflare-Ready.zip`).
2. Double-click **`start.bat`**.
   - It automatically checks if Node.js is installed.
   - It installs dependencies if needed on the first run.
   - It verifies or creates the production build.
   - It automatically launches your default browser at **`http://localhost:3000`**.
   - Keep the launcher window open while browsing; close it when finished.

*Note on Node.js:* If Node.js is not yet installed on your PC, download the free LTS version from [https://nodejs.org](https://nodejs.org).

### Method 2: macOS / Linux Launcher
1. Open Terminal in the extracted folder.
2. Run `./start.sh` (or `bash start.sh`).
   - Automatically checks Node.js, installs dependencies if needed, and launches the browser at `http://localhost:3000`.

### Method 3: Python Launcher (Zero npm Dependencies)
If you have Python installed:
1. Run `python start.py` (or `python3 start.py`).
2. Opens your browser at `http://localhost:8080` serving the production build with SPA routing.

### Method 4: Direct Browser Inspection (`preview.html` or `index.html`)
- Open `preview.html` directly in any web browser.
- Uses a pre-bundled standalone IIFE script (`assets/app.js`) and CSS (`assets/index.css`) designed to run without a web server.
- Automatically uses hash routing (`#/resume-builder`, `#/country-guides`) for `file://` compatibility.


---

## 🚀 Full Developer Setup (Node.js & npm)

### 1. Prerequisites
- **Node.js:** v20.0.0 or higher
- **npm:** v10.0.0 or higher (or `bun` / `pnpm` / `yarn`)

### 2. Installation
```bash
# Clone your repository or navigate to extracted folder
cd globecareer

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
The compiled static assets will be output to the `dist/` directory.

### 5. Typecheck & Lint
```bash
npm run lint
```

---

## ☁️ Cloudflare Pages Deployment Guide

GlobeCareer is fully configured for static hosting on **Cloudflare Pages**.

### Step 1: Push Code to GitHub
1. Extract the project ZIP to a local folder.
2. Initialize and push to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: GlobeCareer complete production website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

### Step 2: Connect to Cloudflare Pages
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub account and choose the repository you just pushed.
4. Click **Begin setup**.

### Step 3: Configure Build Settings
Fill in the deployment configuration:
- **Project name:** `globecareer` (or your preferred name)
- **Production branch:** `main`
- **Framework preset:** `Vite` (or None)
- **Root directory:** `/` (leave empty or `/` if files are at repository root; set to `GlobeCareer` if committed inside a `GlobeCareer` subdirectory)
- **Build command:** `npm run build`
- **Build output directory:** `dist`

### Step 4: Environment Variables (Recommended)
Node.js 20 is already pinned automatically via `.nvmrc` and `.node-version`. You can also explicitly verify:
- `NODE_VERSION` = `20`

### Step 5: Save and Deploy
Click **Save and Deploy**. Cloudflare Pages will install dependencies, run the Vite build, and publish your site to an `*.pages.dev` domain in under 2 minutes.

---

## 🌐 SPA Routing & Security Headers on Cloudflare

This repository includes pre-configured Cloudflare Pages configuration files inside `public/`:

- **`public/_redirects`:** Contains `/* /index.html 200` to ensure deep URLs (e.g., `/country/de`, `/bio-templates`, `/summary-templates`, `/resume-builder`) load directly without 404 errors.
- **`public/_headers`:** Configures standard security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) and long-term immutable caching for static assets.

---

## 📂 Project Structure

```
.
├── index.html                  # HTML entry point with SEO metadata
├── vite.config.ts              # Vite configuration (React + Tailwind v4)
├── tsconfig.json               # TypeScript compiler configuration
├── package.json                # Project dependencies and build scripts
├── package-lock.json           # Exact dependency lockfile
├── public/                     # Static assets served at root
│   ├── _redirects              # Cloudflare Pages SPA rewrite rule
│   ├── _headers                # Cloudflare Pages security & cache headers
│   ├── sitemap.xml             # Complete 44-route XML sitemap
│   ├── robots.txt              # Search engine directives
│   ├── llms.txt                # AI search & LLM discoverability index
│   ├── ai-catalog.json         # Machine-readable feature catalog
│   ├── site.webmanifest        # PWA web manifest
│   └── favicon.*               # Favicons and web icons
├── src/
│   ├── App.tsx                 # Main application controller and routing
│   ├── main.tsx                # Client DOM mount entry point
│   ├── index.css               # Global styling (Tailwind CSS v4)
│   ├── types/                  # TypeScript interface definitions
│   ├── utils/
│   │   ├── seo.ts              # Dynamic SEO, canonicals & Schema.org JSON-LD
│   │   ├── docxExport.ts       # Native DOCX Word generator
│   │   └── countryTemplates.ts # Country recommendation engine
│   ├── data/
│   │   ├── countries.ts        # 40-country hiring rules and parameters
│   │   ├── bioTemplates.ts     # 15 Professional Bio Templates
│   │   ├── summaryTemplates.ts # 18 Resume Summary & Objective Templates
│   │   ├── resignationTemplates.ts # 11 Resignation Letter Templates
│   │   ├── verifiedJobs.ts     # Verified international job listings
│   │   └── sampleResumes.ts    # Role and country sample presets
│   └── components/
│       ├── layout/             # Header, Footer, TopBar
│       ├── builder/            # Resume Builder workspace & sections
│       ├── templates/          # Resume rendering layouts
│       ├── tools/              # Generators (Bio, Summary, Resignation, ATS)
│       └── pages/              # Guides, Jobs, Tracker, FAQ, About, etc.
```

---

## 📄 License & Terms

All resume templates, document builders, and export tools are **100% free to use for personal and commercial career development**. No subscription, payment, or credit card is required.
