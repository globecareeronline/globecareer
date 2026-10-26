import React, { useState } from 'react';
import { COUNTRIES, getCountryById } from '../../data/countries';
import { JOB_CATEGORIES } from '../../data/jobCategories';
import { TEMPLATES } from '../templates/TemplateList';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  FileText, 
  Download, 
  Building, 
  Users, 
  AlertTriangle,
  Briefcase,
  Search,
  Check,
  HelpCircle,
  Clock,
  Compass,
  FileCheck,
  Send,
  Mail,
  Award,
  MessageSquare,
  ScanLine,
  UserCheck,
  AlignLeft,
  FileSignature,
  LogOut
} from 'lucide-react';

interface HomePageProps {
  onStartResume: (countryId?: string, categoryId?: string) => void;
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartResume,
  onNavigate
}) => {
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [selectedCategory, setSelectedCategory] = useState('it-software');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const country = getCountryById(selectedCountry);

  const faqs = [
    {
      q: "What is the difference between a Resume and a Curriculum Vitae (CV)?",
      a: "In the United States and Canada, a resume is a concise 1-page document strictly focused on relevant work achievements without personal details or headshots. In the United Kingdom, Europe, and Australia, 'Curriculum Vitae' or 'CV' is standard, typically 2 pages, with Europe customarily expecting professional headshots and date of birth. GlobeCareer automatically reformats your document according to your target nation's legal and cultural standards."
    },
    {
      q: "Why are photos strictly prohibited on US and UK resumes?",
      a: "Under US EEOC regulations and the UK Equality Act 2010, hiring managers and applicant tracking systems often reject resumes with photos on sight to protect against unconscious bias or discrimination claims regarding age, race, or gender. Conversely, in Germany, Austria, and Switzerland, a professional headshot (Bewerbungsfoto) remains customary."
    },
    {
      q: "How does GlobeCareer verify international job listings?",
      a: "Every job listing in our portal is manually audited from official employer career portals, authorized ATS links (Greenhouse, Lever, Workday), or verified government registries. We confirm the vacancy is actively accepting candidates, record actual closing deadlines when published (or state 'No closing date published'), and show the exact verification timestamp. Expired jobs are immediately tagged and removed from active priority."
    },
    {
      q: "Is GlobeCareer completely free to use?",
      a: "Yes. GlobeCareer is 100% free at launch. All 9 Career Tools (Resume Builder, Cover Letter Builder, Recommendation Letter Builder, Job Application Email Generator, Professional Bio Generator, Resume Summary & Objective Generator, Resignation Letter Generator, Interview Preparation, and ATS Resume Checker) are available without paywalls, subscriptions, quotas, or credit cards."
    },
    {
      q: "Are PDF and DOCX downloads really 100% free with no watermark?",
      a: "Yes. GlobeCareer does not lock your completed documents behind a surprise paywall or watermark them. You can generate, edit, and download clean vector PDFs (US Letter or A4) and native Microsoft Word (.DOCX) files completely free of charge without entering a credit card."
    },
    {
      q: "Does GlobeCareer require an account or credit card?",
      a: "No credit card is ever required. You can use all career tools, generate letters and emails, and prepare for interviews immediately. Creating a free account is entirely optional and allows you to sync your saved resumes and track job applications across devices."
    }
  ];

  return (
    <div className="space-y-24 pb-20 text-neutral-900 dark:text-neutral-100">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          {/* Trust Meta */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>40+ Countries</span>
            <span aria-hidden="true">·</span>
            <span>Compliant Formats</span>
            <span aria-hidden="true">·</span>
            <span>100% Free</span>
          </div>

          {/* Official Tagline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance">
            Build Your Global Career.<br />
            <span className="text-blue-600 dark:text-blue-400">Stand Out Anywhere.</span>
          </h1>

          {/* Official Subtitle */}
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Create country-tailored resumes and cover letters, generate professional outreach emails, prepare for international interviews, and discover verified opportunities — 100% free.
          </p>

          {/* Dual Primary Call-to-Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onStartResume(selectedCountry, selectedCategory)}
              className="w-full sm:w-auto px-8 py-3.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Build Your Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('jobs')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Explore Verified Jobs</span>
            </button>
          </div>

          {/* Quick Country & Sector Launchpad */}
          <div className="pt-6 max-w-3xl mx-auto">
            <div className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2.5 text-left">
              {/* Country Selector */}
              <div className="w-full sm:flex-1 relative px-2 py-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Target Destination
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{country.flag}</span>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-neutral-900 dark:text-neutral-100 focus:outline-none cursor-pointer"
                  >
                    {COUNTRIES.map(c => (
                      <option key={c.id} value={c.id} className="dark:bg-neutral-900">
                        {c.name} ({c.cvTerminology})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="hidden sm:block w-px h-10 bg-neutral-200 dark:border-neutral-800" />

              {/* Job Category Selector */}
              <div className="w-full sm:flex-1 relative px-2 py-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  Target Industry
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-neutral-900 dark:text-neutral-100 focus:outline-none cursor-pointer truncate"
                >
                  {JOB_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id} className="dark:bg-neutral-900">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Launch CTA */}
              <button
                type="button"
                onClick={() => onStartResume(selectedCountry, selectedCategory)}
                className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm cursor-pointer"
              >
                <span>Preview CV Rules</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Country Micro-Rules Under Launchpad */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs text-neutral-500">
              <span>{country.name}: <strong className="text-neutral-900 dark:text-neutral-100">{country.cvTerminology}</strong></span>
              <span>·</span>
              <span>Photo: <strong className="text-neutral-900 dark:text-neutral-100 capitalize">{country.photoRule}</strong></span>
              <span>·</span>
              <span>Length: <strong className="text-neutral-900 dark:text-neutral-100">{country.standardLength}</strong></span>
              <span>·</span>
              <span>Paper: <strong className="text-neutral-900 dark:text-neutral-100">{country.paperSize.toUpperCase()}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RESUME & CV BUILDER (CORE DIFFERENTIATION & LEGAL NORMS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Engineered For 40 Jurisdictions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Why One Universal Resume Fails Internationally
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Applying across borders requires adhering to local anti-discrimination laws, customs, and ATS systems. We format your application accurately for each destination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* United States */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇺🇸</span>
              <div>
                <h3 className="font-bold text-sm">United States</h3>
                <span className="text-[11px] text-neutral-500">1-Page Strict Resume</span>
              </div>
            </div>
            <div className="text-xs text-rose-700 dark:text-rose-400 font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Photos Strictly Prohibited
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              EEOC civil rights regulations lead corporations to discard resumes with photos to avoid discrimination claims. Metrics ($ and %) are essential.
            </p>
          </div>

          {/* Germany */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇩🇪</span>
              <div>
                <h3 className="font-bold text-sm">Germany</h3>
                <span className="text-[11px] text-neutral-500">Tabellarischer Lebenslauf</span>
              </div>
            </div>
            <div className="text-xs text-blue-700 dark:text-blue-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Photo Customary & Expected
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Employers expect a formal Bewerbungsfoto in the upper corner. Chronological dates, birth place, and certified German language levels (A1–C2) are standard.
            </p>
          </div>

          {/* United Kingdom */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇬🇧</span>
              <div>
                <h3 className="font-bold text-sm">United Kingdom</h3>
                <span className="text-[11px] text-neutral-500">2-Page Curriculum Vitae</span>
              </div>
            </div>
            <div className="text-xs text-rose-700 dark:text-rose-400 font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              No Headshots (Equality Act)
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Two pages is standard. Leads with a concise Personal Profile. British English spelling and "References available upon request" are expected.
            </p>
          </div>

          {/* Poland */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇵🇱</span>
              <div>
                <h3 className="font-bold text-sm">Poland</h3>
                <span className="text-[11px] text-neutral-500">CV z Klauzulą RODO</span>
              </div>
            </div>
            <div className="text-xs text-purple-700 dark:text-purple-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Mandatory GDPR Clause
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Polish law strictly forbids recruiters from reviewing CVs without the statutory RODO consent clause. GlobeCareer automatically injects this verified disclaimer.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TEMPLATES SHOWCASE: PHOTO VS NO-PHOTO FORMATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400 block">
              Architectural Separation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Two Clearly Separated Template Architectures
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Never wonder whether a headshot will disqualify your application. Choose the format engineered for your target market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category A: No-Photo ATS Formats */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                  Category A · 100% ATS Parsing
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  No Photo
                </span>
              </div>
              <h3 className="text-lg font-bold">
                Single-Column ATS Formats
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Engineered specifically for corporate hiring pipelines in the United States, United Kingdom, Canada, Australia, and Ireland.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2">✓ No photo boxes or complex graphic tables</li>
                <li className="flex items-center gap-2">✓ Standard headings parsed by Workday, Taleo, Greenhouse</li>
                <li className="flex items-center gap-2">✓ 100% selectable vector text output (Letter or A4)</li>
                <li className="flex items-center gap-2">✓ Zero paywall on PDF and Word (.DOCX) exports</li>
              </ul>
              <button
                type="button"
                onClick={() => onStartResume('us')}
                className="w-full py-2.5 text-xs font-semibold bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                Use No-Photo Template
              </button>
            </div>

            {/* Category B: Photo CV Formats */}
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
                  Category B · Continental European & Global
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Photo CV
                </span>
              </div>
              <h3 className="text-lg font-bold">
                Executive & Continental Photo CVs
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Designed for Germany, Austria, Switzerland, France, Japan, UAE, Qatar, and executive applications where headshots are customary.
              </p>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2">✓ Professional portrait positioning and circular/square cropping</li>
                <li className="flex items-center gap-2">✓ Date of birth, nationality, and work permit fields</li>
                <li className="flex items-center gap-2">✓ CEFR language proficiency indicators (A1–C2)</li>
                <li className="flex items-center gap-2">✓ Zero paywall on PDF and Word (.DOCX) exports</li>
              </ul>
              <button
                type="button"
                onClick={() => onStartResume('de')}
                className="w-full py-2.5 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Use Photo CV Template
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COVER LETTER BUILDER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-full text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Matching Application Pair</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Country-Tailored Cover Letter Generator
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Pair your CV with a structured, role-targeted cover letter matching your resume's typography and palette. Pre-formatted with country-specific salutations, formal addresses, and professional closings.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Formal & Modern styles</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Instant live editor</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> PDF & TXT downloads</span>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('cover-letter')}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Create Cover Letter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 p-5 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-3 font-mono text-[11px] text-neutral-600 dark:text-neutral-400 shadow-inner">
            <div className="text-neutral-400 text-[10px] uppercase tracking-wider font-bold">Standard European Header</div>
            <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">Jane Doe</div>
              <div>Hiring Manager · Talent Acquisition</div>
              <div>Tech Corp Europe B.V. · Amsterdam</div>
            </div>
            <div className="text-[10px] italic text-neutral-500">
              "Dear Hiring Team, I am writing to express my strong enthusiasm for the Senior Engineer opening in Berlin..."
            </div>
            <div className="pt-2 flex justify-between text-[10px] text-emerald-600 font-semibold">
              <span>✓ Country Salutation Verified</span>
              <span>A4 / Letter</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED INTERNATIONAL JOBS PORTAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="p-8 sm:p-12 bg-neutral-900 text-white rounded-3xl border border-neutral-800 shadow-xl space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-900/60 border border-blue-700 rounded-full text-xs font-bold text-blue-300 uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Verified Opportunities Only</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Verified International Jobs Portal
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Connect your country-tailored CV to legitimate vacancies. We research and import real opportunities from official employer career pages, verified ATS portals, and authorized platforms across 40+ countries.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('jobs')}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Explore Verified Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-neutral-800">
            <div className="space-y-2">
              <div className="text-blue-400 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Zero Fabricated Postings
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Every listing is verified directly from official career pages (e.g. Stripe, Monzo, Canva, ASML) or employer ATS boards. Never synthetic vacancies.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-blue-400 font-bold text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Actual Deadlines & Verification Timestamps
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We record actual published closing dates or state "No closing date published". Expired vacancies are automatically labelled and filtered.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-blue-400 font-bold text-sm flex items-center gap-2">
                <Send className="w-4 h-4" />
                Direct Official Application Gateways
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Subscribers receive direct links to official employer ATS application pages and verified employer contact emails where legitimately published.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COUNTRY GUIDES MATRIX EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              International Coverage
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              Browse 40 Supported Jurisdictions
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Select any country to review hiring nuances or start an authentic pre-configured resume.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('guides')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Explore Full Guides Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
          {COUNTRIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onStartResume(c.id)}
              className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-xl text-center space-y-1 transition-all shadow-xs group cursor-pointer"
              title={`Start ${c.name} ${c.cvTerminology}`}
            >
              <div className="text-2xl group-hover:scale-110 transition-transform">{c.flag}</div>
              <div className="text-xs font-bold truncate">{c.name}</div>
              <div className="text-[10px] text-neutral-400 font-mono truncate">{c.cvTerminology}</div>
            </button>
          ))}
        </div>
      </section>

      {/* 7. APPLICATION TRACKER & TOOLS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
              Cross-Border Career Management
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Centralized Application Tracker
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Track vacancies, interview dates, follow-up deadlines, and localized resume versions across multiple countries in one secure dashboard.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('tracker')}
                className="px-6 py-3 bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-2xs inline-flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Open Application Tracker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 grid grid-cols-2 gap-3 text-xs">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Saved</div>
              <div className="text-lg font-black font-mono">14</div>
              <div className="text-[11px] text-neutral-500">Target roles in review</div>
            </div>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Applied</div>
              <div className="text-lg font-black font-mono text-blue-600">8</div>
              <div className="text-[11px] text-neutral-500">Official submissions</div>
            </div>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Interviews</div>
              <div className="text-lg font-black font-mono text-purple-600">3</div>
              <div className="text-[11px] text-neutral-500">Active screening calls</div>
            </div>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Offers</div>
              <div className="text-lg font-black font-mono text-emerald-600">1</div>
              <div className="text-[11px] text-neutral-500">Formal contracts</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMPLETE FREE CAREER TOOLS SUITE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free Career Platform · Zero Paywalls</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Complete Career Tools Suite. Fully Free.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Every tool in GlobeCareer is completely free. Build country-tailored CVs, generate cover and recommendation letters, compose outreach emails, prepare for interviews, and scan resumes against ATS parsers without subscription paywalls.
          </p>
        </div>

        {/* 6 Career Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* 1. Resume Builder */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Core Document</span>
                <h3 className="text-xl font-bold">Resume Builder</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Format compliant resumes for 40 countries with photo regulation enforcement, live multi-template selection, and unrestricted vector PDF and DOCX downloads.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>40 Country legal guidelines built in</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Templates accessible inside builder</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant PDF & DOCX export</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onStartResume()}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Cover Letter Builder */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Application Letter</span>
                <h3 className="text-xl font-bold">Cover Letter Builder</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Generate tailored, country-specific cover letters for target job titles and company cultures. Includes built-in executive and modern templates.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Role & company customization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Built-in professional templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>One-click clipboard copy & export</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('cover-letter')}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Cover Letter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Recommendation Letter Builder */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Formal Endorsement</span>
                <h3 className="text-xl font-bold">Recommendation Letter Builder</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Draft authoritative reference letters for employment, graduate admissions, scholarships, and international visa applications with structured tone controls.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>5 Formal recommendation types</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Customizable strengths & tone</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Editable draft, print & download</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('recommendation-letter')}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Generate Reference</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4. Job Application Email Generator */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Direct Outreach</span>
                <h3 className="text-xl font-bold">Job Application Email Generator</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Compose concise outreach emails for direct applications, recruiter messaging, internal employee referrals, post-interview follow-ups, and networking.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>5 Proven outreach formats</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Auto-generated subject lines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>One-click copy to mail client</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('email-generator')}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Compose Email</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 5. Interview Preparation */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Interview Mastery</span>
                <h3 className="text-xl font-bold">Interview Preparation</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Prepare for behavioral and international hiring rounds with STAR method frameworks, country interview etiquette, and interactive mock practice with live rubric scoring.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>STAR response builder with auto-save</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Country hiring etiquette guides</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interactive mock interview simulator</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('interview-prep')}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Practice Interviews</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6. ATS Checker */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ScanLine className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Screening Intelligence</span>
                <h3 className="text-xl font-bold">ATS Resume Checker</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Scan your resume against any target job description. Uncover missing technical keywords, compute transparent match scores, and verify parsing layout safety.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant resume vs JD keyword scan</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Identifies missing critical skills</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Layout & section safety diagnostics</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('ats-checker')}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Scan Your Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 7. Professional Bio Generator */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600">Personal Brand</span>
                <h3 className="text-xl font-bold">Professional Bio Generator</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Craft executive summaries, conference speaker blurbs, and LinkedIn "About" sections tailored to 1st or 3rd person and multiple length tiers.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Executive, modern, & creative styles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Short (50w), Medium (120w), & Long (200w)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant 1st/3rd person POV toggle</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('bio-generator')}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Generate Bio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 8. Resume Summary & Objective Generator */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <AlignLeft className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600">Resume Header Hook</span>
                <h3 className="text-xl font-bold">Summary & Objective Generator</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Generate high-impact professional summaries, career objectives, and LinkedIn headlines with live ATS keyword density and direct resume sync.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Summaries, objectives, & headlines</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Live ATS score & keyword highlighting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1-click apply to active resume builder</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('summary-generator')}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 9. Resignation Letter Generator */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <LogOut className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Career Transition</span>
                <h3 className="text-xl font-bold">Resignation Letter Generator</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Produce legally sound, respectful formal resignation notices for standard 2 weeks, short notice, immediate departure, career change, or relocation.
                </p>
              </div>
              <ul className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>6 Separation scenarios & transition offers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Warm, neutral, & formal diplomatic tones</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Print-ready letter format & instant copy</span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('resignation-letter')}
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Draft Resignation Letter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS & TRUST SIGNALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
            Global Candidate Success
          </span>
          <h2 className="text-2xl font-bold tracking-tight">
            Trusted by Cross-Border Candidates
          </h2>
          <p className="text-xs text-neutral-500">
            Real outcomes from professionals navigating international relocations and cross-border hiring rules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3 shadow-xs">
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
              "Moving from Berlin to San Francisco, I was clueless about US resume conventions. Removing my headshot and restructuring my experience using the XYZ formula doubled my interview rate."
            </p>
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-bold block">Jonas Weber</span>
              <span className="text-[11px] text-neutral-500">Staff Software Engineer · Relocated to California, USA</span>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3 shadow-xs">
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
              "Applying for engineering management roles in Zurich required a Swiss C-Permit statement and tabular Lebenslauf. GlobeCareer's template was perfectly accepted by Swiss HR."
            </p>
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-bold block">Claire Laurent</span>
              <span className="text-[11px] text-neutral-500">Engineering Manager · Relocated to Zurich, Switzerland</span>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3 shadow-xs">
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
              "Having the Polish statutory RODO clause automatically added to my CV saved me from getting my application rejected during the first screening round in Warsaw."
            </p>
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-bold block">Mikołaj Zieliński</span>
              <span className="text-[11px] text-neutral-500">Fintech Product Lead · Kraków, Poland</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Clear, straightforward answers about GlobeCareer, country compliance, and free career tools.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xs transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-blue-600 shrink-0 font-mono text-base">
                  {openFaq === idx ? '−' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-5 pt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/80">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 11. FINAL CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 bg-neutral-900 text-white dark:bg-neutral-900 border border-neutral-800 rounded-3xl text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Build Your Global Career Today
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Free to use without registration. 100% private in your browser. Download print-ready vector PDFs and native Microsoft Word DOCX files.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onStartResume(selectedCountry, selectedCategory)}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Launch Resume Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('jobs')}
              className="w-full sm:w-auto px-8 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer border border-neutral-700"
            >
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>Explore Verified Jobs</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
