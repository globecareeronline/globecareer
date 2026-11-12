import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  ArrowRight,
  Download,
  AlertTriangle,
  Sparkles,
  Layers,
  Search,
  Check,
  Cpu,
  BookmarkPlus,
  HelpCircle,
  ExternalLink,
  XCircle,
  Hash,
  Award,
  Zap,
  Sliders,
  Type,
  FileCode2,
  ListChecks,
  Compass
} from 'lucide-react';
import { TEMPLATES } from '../templates/TemplateList';
import { COUNTRIES, getCountryById } from '../../data/countries';
import { JOB_CATEGORIES } from '../../data/jobCategories';
import { TemplateId } from '../../types/resume';
import { SamplePersonaType } from '../../data/sampleResumes';

export interface ATSResumeMakerOptions {
  countryId: string;
  templateId: TemplateId;
  jobCategory: string;
  startMode: 'sample' | 'blank';
  persona?: SamplePersonaType;
}

interface ATSResumeMakerPageProps {
  onNavigate: (page: string) => void;
  onStartResumeForCountry?: (countryId: string) => void;
  onStartATSResume?: (options: ATSResumeMakerOptions) => void;
}

const ATS_VERIFIED_TEMPLATES = TEMPLATES.filter(t => t.atsCompliant && t.columns === 1 && t.category === 'no-photo');

// Core features of GlobeCareer's ATS Resume Maker
const ATS_FEATURES = [
  {
    icon: Layers,
    badge: 'Single-Column Flow',
    title: 'Strict Single-Column Architecture',
    desc: 'Workday, Taleo, and Greenhouse parse documents linearly top-to-bottom. Multi-column tables cause job titles, bullet points, and dates to scramble horizontally. GlobeCareer enforces strict single-column flow to ensure clean, unfragmented text extraction.'
  },
  {
    icon: Hash,
    badge: 'Standard Taxonomies',
    title: 'Standardized Semantic Section Headers',
    desc: 'Enterprise parsers map applicant text into predetermined data tables using recognized tokens. Our builder formats sections into verified titles: Professional Experience, Education, Skills, and Certifications—eliminating parser blind spots.'
  },
  {
    icon: Compass,
    badge: '47 Countries',
    title: 'Automated Regional Guardrails',
    desc: 'Different countries enforce distinct hiring regulations. We automatically calibrate paper dimensions (US Letter vs. ISO A4) and enforce strict no-photo guidelines for US (EEOC), UK (Equality Act), and Canada (Human Rights Act).'
  },
  {
    icon: Sparkles,
    badge: 'Real-Time Audit',
    title: 'Embedded ATS Keyword & Parser Scorer',
    desc: 'Never submit blindly. Our live in-session analyzer scores your resume from 0 to 100 against job descriptions, scanning for keyword density, quantified metrics ($, %, numbers), decisive action verbs, and critical sections.'
  },
  {
    icon: FileCode2,
    badge: 'Dual Export',
    title: 'Clean Vector PDF & Native DOCX Exports',
    desc: 'Never submit rasterized images or locked Canva graphics that parsers reject as blank pages. GlobeCareer outputs pure selectable vector PDF and clean Microsoft Word (.docx) files without hidden frames or text boxes.'
  },
  {
    icon: Zap,
    badge: '12+ Disciplines',
    title: 'Industry-Specific Keyword Injection',
    desc: 'Pre-loaded with verified technical competencies, industry terminology, and job-tailored action verbs across IT, Web Development, Finance, Healthcare, Sales, Engineering, and Executive leadership.'
  },
  {
    icon: ListChecks,
    badge: 'Tenure Precision',
    title: 'Machine-Readable Date & Chronology Tokenizer',
    desc: 'Dates are formatted consistently (MM/YYYY or Month YYYY) so applicant tracking systems correctly tokenize work duration, compute total years of experience, and rank your seniority accurately.'
  },
  {
    icon: ShieldCheck,
    badge: 'Zero Paywall',
    title: '100% Free Forever Without Traps',
    desc: 'No blurry preview tricks, watermark locks, or sudden credit card requests after spending hours crafting your resume. Download unlimited vector PDFs and editable Word documents completely free.'
  }
];

// Specific ATS-Formatting Tips
const ATS_FORMATTING_TIPS = [
  {
    number: '01',
    title: 'Font Selection & Typography Discipline',
    category: 'Typography',
    summary: 'Stick to clean system fonts sized 10–12pt for body copy and 14–16pt for section headings.',
    details: 'Exotic custom web fonts, cursive scripts, or decorative icons often decode into null characters (□) or garbled question marks in older parsers like Taleo. Use universal standard fonts: Arial, Calibri, Helvetica, Georgia, or Times New Roman. Maintain consistent line spacing (1.0 to 1.15) to prevent text clipping.'
  },
  {
    number: '02',
    title: 'Strict Section Header Terminology',
    category: 'Hierarchy',
    summary: 'Use only standard, parser-recognized headers. Avoid creative titles like "Where I\'ve Been".',
    details: 'Applicant tracking systems rely on exact semantic anchors to segment your information into database fields. Permitted headers: "Work Experience", "Professional Experience", "Education", "Skills", "Certifications", and "Professional Summary". Avoid creative labels like "My Journey", "Superpowers", or "Accreditations".'
  },
  {
    number: '03',
    title: 'The Google X-Y-Z Accomplishment Formula',
    category: 'Impact Scoring',
    summary: 'Write bullet points as: "Accomplished [X], as measured by [Y], by doing [Z]".',
    details: 'Modern parsers look for quantified metrics to score candidate impact and seniority. Include concrete numbers, percentages (%), currency signs ($, €, £), time savings, and team sizes. Example: "Architected microservices handling 24,000 req/sec with 99.98% uptime, reducing server latency by 42% on AWS Kubernetes."'
  },
  {
    number: '04',
    title: 'Exact Keyword Matching (Acronyms + Full Terms)',
    category: 'Keyword Matching',
    summary: 'Include both acronyms and expanded names (e.g., "Search Engine Optimization (SEO)").',
    details: 'An ATS searches for specific keywords specified by the hiring manager. If a job posting asks for "Amazon Web Services", a parser might miss your profile if you only wrote "AWS". Always write both on first mention. Weave keywords naturally into experience bullet points rather than just dumping an uncontextualized keyword list.'
  },
  {
    number: '05',
    title: 'Contact Information Placement Rules',
    category: 'Layout',
    summary: 'Place contact info in the main body text at the very top. Never inside Word Headers/Footers.',
    details: 'Many ATS parsers completely ignore text placed within Microsoft Word headers and footers or inside floating text frames. Place your Full Name, Professional Email, Phone Number with international area code, City/State, and clean LinkedIn URL at the top of the main document stream.'
  },
  {
    number: '06',
    title: 'Vector PDF vs. DOCX Decision Guide',
    category: 'File Format',
    summary: 'Submit Vector PDF for modern portals (Workday, Greenhouse); use DOCX for older Taleo systems.',
    details: 'Both formats are supported when exported from GlobeCareer. Vector PDF preserves exact font rendering and line breaks across Mac, Windows, and Linux. For older municipal, federal, or legacy Taleo portals that explicitly request Word documents, export our native .docx format.'
  }
];

// Side-by-side ATS Audit Comparison Matrix
const ATS_AUDIT_COMPARISON = [
  {
    element: 'Layout Architecture',
    fail: 'Multi-column sidebars, nested tables, floating text boxes',
    failReason: 'Parsers read left-to-right across columns, jumbling dates and descriptions',
    pass: 'Linear, single-column top-to-bottom text flow',
    passBenefit: '100% sequential data extraction into recruiter search fields'
  },
  {
    element: 'Candidate Photo',
    fail: 'Portrait headshot embedded in US/UK/Canada resumes',
    failReason: 'Violates EEOC & UK Equality Act compliance; causes automatic filtering',
    pass: 'No photo on US/UK/CA resumes; clean text identity header',
    passBenefit: 'Full anti-bias compliance and zero image decoding errors'
  },
  {
    element: 'Skill Representation',
    fail: 'Graphic skill bars, circular percentage meters, rating stars',
    failReason: 'Parsers cannot read visual graphics; skills are completely missed',
    pass: 'Categorized plain text bullet points (e.g. Technical Skills, Tools)',
    passBenefit: 'Exact keyword matching with 100% parser recognition'
  },
  {
    element: 'Section Headings',
    fail: 'Creative titles ("What I Bring", "Career Odyssey", "Arsenal")',
    failReason: 'Parser fails to categorize content; sections are dropped as unrecognized',
    pass: 'Universal tokens ("Work Experience", "Education", "Skills")',
    passBenefit: 'Flawless database entity mapping in Workday, Taleo, and Lever'
  },
  {
    element: 'Dates & Chronology',
    fail: 'Vague dates ("Summer 2021", "2020 – 2022" without months)',
    failReason: 'Algorithm cannot compute exact tenure; defaults to minimal experience',
    pass: 'Standard MM/YYYY or Month YYYY format ("05/2021 – Present")',
    passBenefit: 'Accurate tenure calculation and proper seniority ranking'
  },
  {
    element: 'File Export Format',
    fail: 'Scanned image PDF, flattened PNG, or locked Canva graphics',
    failReason: 'Parser detects zero digital text and flags resume as completely blank',
    pass: 'True Vector PDF or native Microsoft Word (.docx)',
    passBenefit: '100% digital selectable text with verified character encoding'
  }
];

export const ATSResumeMakerPage: React.FC<ATSResumeMakerPageProps> = ({
  onNavigate,
  onStartResumeForCountry,
  onStartATSResume
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('us');
  const [selectedCategory, setSelectedCategory] = useState<string>('it-software');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('ats_classic');
  const [startMode, setStartMode] = useState<'sample' | 'blank'>('sample');
  const [selectedPersona, setSelectedPersona] = useState<SamplePersonaType>('experienced');

  const countryInfo = getCountryById(selectedCountry);
  const activeCategory = JOB_CATEGORIES.find(c => c.id === selectedCategory) || JOB_CATEGORIES[0];

  const handleLaunchBuilder = () => {
    // Save chosen template and country to localStorage for cross-session safety
    try {
      const saved = localStorage.getItem('globecareer_resume_data') || '{}';
      const parsed = JSON.parse(saved);
      parsed.templateId = selectedTemplate;
      parsed.country = selectedCountry;
      parsed.jobCategory = selectedCategory;
      localStorage.setItem('globecareer_resume_data', JSON.stringify(parsed));
    } catch (e) {
      // ignore
    }

    if (onStartATSResume) {
      onStartATSResume({
        countryId: selectedCountry,
        templateId: selectedTemplate,
        jobCategory: selectedCategory,
        startMode,
        persona: selectedPersona
      });
    } else if (onStartResumeForCountry) {
      onStartResumeForCountry(selectedCountry);
    } else {
      onNavigate('builder');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400">
            Dedicated ATS Resume Workspace
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            ATS Parser-Calibrated
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            Tested on Workday & Taleo
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300">
            100% Free Forever
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
          Free ATS Resume Maker – Create Applicant Tracking System-Proof CVs
        </h1>
        
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-4xl leading-relaxed">
          Over 98% of Fortune 500 corporations and 75% of high-growth companies use Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever, and iCIMS) to screen candidates. GlobeCareer's ATS Resume Maker formats your CV into single-column, machine-readable structures engineered to bypass parsing traps, score high on keyword matching, and land in front of hiring managers.
        </p>

        {/* Quick Launch Callout */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleLaunchBuilder}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Start Building ATS Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('ats-checker')}
            className="px-5 py-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer border border-neutral-200 dark:border-neutral-700"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Scan Existing Resume in ATS Checker</span>
          </button>
        </div>
      </div>

      {/* Interactive Quick-Start Configurator */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
        
        <div className="border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
            Pre-Configure Your ATS Resume
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Configure Your ATS Target Standards & Industry Profile
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-3xl">
            Select your target country to enforce local anti-bias legal guardrails and paper dimensions, choose your industry to preload verified ATS keywords, and select your verified single-column layout.
          </p>
        </div>

        {/* Step 1: Select Country & Regional ATS Standard */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
              Target Country & Legal Standard
            </span>
            <span className="text-[11px] text-neutral-400">47 Countries Calibrated</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
            {[
              { id: 'us', name: 'United States', flag: '🇺🇸', standard: 'Letter • EEOC No-Photo Rule' },
              { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', standard: 'A4 • Equality Act Compliant' },
              { id: 'ca', name: 'Canada', flag: '🇨🇦', standard: 'Letter • Human Rights Act' },
              { id: 'au', name: 'Australia', flag: '🇦🇺', standard: 'A4 • Chronological Format' },
              { id: 'de', name: 'Germany', flag: '🇩🇪', standard: 'A4 • Tabular Lebenslauf' },
              { id: 'in', name: 'India', flag: '🇮🇳', standard: 'A4 • Tech Competency Focus' },
              { id: 'ae', name: 'UAE & Gulf', flag: '🇦🇪', standard: 'A4 • International Executive' },
              { id: 'sg', name: 'Singapore', flag: '🇸🇬', standard: 'A4 • Regional Hub Standard' },
            ].map(c => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCountry(c.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedCountry === c.id
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-950'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </span>
                  {selectedCountry === c.id && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                </div>
                <div className="text-[10px] text-neutral-500 truncate">{c.standard}</div>
              </button>
            ))}
          </div>

          {/* Full country dropdown selector */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-neutral-500">Or select any of 47 countries:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="text-xs font-semibold bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-1.5 text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
            >
              {COUNTRIES.map(c => (
                <option key={c.id} value={c.id} className="dark:bg-neutral-900">
                  {c.flag} {c.name} ({c.paperSize.toUpperCase()})
                </option>
              ))}
            </select>
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 capitalize">
              ✓ Paper: {countryInfo.paperSize.toUpperCase()} | Photo: {countryInfo.photoRule}
            </span>
          </div>
        </div>

        {/* Step 2: Select Job Category & Industry Keyword Set */}
        <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
              Target Industry & Keyword Taxonomy
            </span>
            <span className="text-[11px] text-neutral-400">Pre-loads ATS Keywords</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {JOB_CATEGORIES.slice(0, 8).map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-950'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100 truncate">{cat.name}</span>
                  {selectedCategory === cat.id && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                </div>
                <div className="text-[10px] text-neutral-500 truncate">
                  {cat.suggestedSkills.technical.slice(0, 2).join(', ')}
                </div>
              </button>
            ))}
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 flex flex-wrap items-center gap-2">
            <span className="font-bold text-neutral-900 dark:text-neutral-100">Top ATS Hard Skills Loaded:</span>
            {activeCategory.suggestedSkills.technical.slice(0, 6).map((skill, idx) => (
              <span key={idx} className="bg-white dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-200 dark:border-neutral-700 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Step 3: Select ATS-Verified Single-Column Layout */}
        <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">3</span>
              Select Verified Single-Column ATS Layout
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Parser-Safe Structure</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ATS_VERIFIED_TEMPLATES.map(tpl => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTemplate === tpl.id
                    ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-950'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      1 Column • Safe
                    </span>
                    {selectedTemplate === tpl.id && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </div>
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">{tpl.name}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{tpl.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-medium text-neutral-500">
                  Best For: {tpl.bestFor}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Starting Preference */}
        <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">4</span>
              Choose How You Want to Start
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setStartMode('sample')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                startMode === 'sample'
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    Start with Pre-Optimized ATS Sample (Recommended)
                  </span>
                  {startMode === 'sample' && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Loads a pre-calibrated sample resume for {activeCategory.name} with quantified metrics, action verbs, and standard section headers. Simply replace sample text with your own!
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <span className="text-[10px] text-neutral-400">Experience Level:</span>
                  {(['experienced', 'graduate', 'career_changer'] as SamplePersonaType[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPersona(p);
                        setStartMode('sample');
                      }}
                      className={`text-[10px] px-2 py-0.5 rounded-lg border capitalize cursor-pointer ${
                        selectedPersona === p
                          ? 'border-blue-600 bg-blue-600 text-white font-bold'
                          : 'border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {p.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setStartMode('blank')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                startMode === 'blank'
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
                  : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    Start with Fresh Blank Canvas
                  </span>
                  {startMode === 'blank' && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Opens a pristine blank editor with your chosen single-column layout, regional legal rules, and paper sizing already locked in place.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* High-Converting Launch Button Ribbon */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full text-blue-100">
                1-Click Setup Complete
              </span>
              <span className="text-xs font-semibold text-blue-100">
                • {countryInfo.name} ({countryInfo.paperSize.toUpperCase()}) • {activeCategory.name}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
              Ready to Build Your ATS-Proof Resume?
            </h3>
            <p className="text-xs text-blue-100 max-w-xl">
              Opens the full Resume Builder with your selected single-column layout, zero photo (EEOC compliant), and verified industry skills pre-configured.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLaunchBuilder}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Launch ATS Resume Builder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Feature List: What Makes GlobeCareer ATS Maker Superior */}
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Engineered ATS Precision
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Why GlobeCareer Resumes Pass ATS Parsers at 100% Fidelity
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-3xl leading-relaxed">
            Most generic resume builders use multi-column tables, floating text boxes, and background graphics that break applicant tracking systems. GlobeCareer is engineered from the ground up to satisfy corporate parser algorithms:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ATS_FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specific ATS-Formatting Tips (Actionable Masterclass) */}
      <div className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            Formatting Rules That Convert
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            6 Actionable ATS Formatting Rules to Maximize Parser Compatibility
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-3xl leading-relaxed">
            Follow these concrete rules when crafting your resume content to ensure both corporate ATS algorithms and human hiring managers rank you as a top-tier candidate:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ATS_FORMATTING_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {tip.category}
                </span>
                <span className="text-xs font-mono font-bold text-neutral-400">{tip.number}</span>
              </div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                {tip.title}
              </h3>
              <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-50 dark:bg-neutral-900 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800">
                {tip.summary}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {tip.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Side-by-Side ATS Compliance Matrix (Pass vs Fail) */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600 dark:text-rose-400 block mb-1">
            Audit Breakdown
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            ATS Formatting Audit: Common Traps vs. GlobeCareer Standard
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-3xl">
            See exactly why standard templates downloaded from graphic design websites get filtered out, and how our architecture ensures safe passage.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                <th className="py-3 px-4 font-bold text-neutral-700 dark:text-neutral-300 w-1/5">Resume Element</th>
                <th className="py-3 px-4 font-bold text-rose-600 dark:text-rose-400 w-2/5">
                  <div className="flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>ATS Failure Traps (Generic Builders)</span>
                  </div>
                </th>
                <th className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400 w-2/5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>GlobeCareer Standard (100% Compliant)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {ATS_AUDIT_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-neutral-100 align-top">
                    {row.element}
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 align-top">
                    <div className="font-semibold text-rose-700 dark:text-rose-400 mb-0.5">{row.fail}</div>
                    <div className="text-[11px] text-neutral-500">{row.failReason}</div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 align-top">
                    <div className="font-semibold text-emerald-700 dark:text-emerald-400 mb-0.5">{row.pass}</div>
                    <div className="text-[11px] text-neutral-500">{row.passBenefit}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How Enterprise ATS Systems Actually Work (Demystifying the Funnel) */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400 block mb-1">
            Inside the Machine
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            How Corporate Applicant Tracking Systems Actually Screen You
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-3xl leading-relaxed">
            There is widespread confusion about how systems like Workday, Taleo, and Greenhouse operate. Here is the actual three-stage pipeline your resume undergoes:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h3 className="font-bold text-sm text-white">Stage 1: Document Parsing</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              The ATS strips visual formatting, converting your PDF or Word document into pure raw text strings. If your resume uses two columns or floating text boxes, text reads horizontally across both columns, creating nonsensical scrambled sentences that fail text parsing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h3 className="font-bold text-sm text-white">Stage 2: Entity Extraction</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Natural Language Processing (NLP) models identify entities: Job Titles, Company Names, Employment Start/End Dates, Academic Degrees, and Technical Skills. Recognizable headings allow the parser to file these entities into the correct candidate profile slots.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h3 className="font-bold text-sm text-white">Stage 3: Recruiter Ranking</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Recruiters don't read all 500 applications. They type search filters (e.g., "Kubernetes AND 5+ years experience AND Bachelor"). If your resume parsed cleanly and matched the required keywords, you appear at the top of their sorted shortlist.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Expert Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Frequently Asked Questions About ATS Resume Makers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 space-y-2">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              Does an ATS automatically reject resumes without a human reading them?
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              No ATS has an automatic "rejection button". What actually happens is that systems like Workday and Greenhouse parse your text, extract candidate entities (titles, companies, skills), and rank applicants. Resumes with parsing errors, scrambled tables, or missing keywords sit at the very bottom of the recruiter's search results and are never clicked.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 space-y-2">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              Is PDF or Microsoft Word (.docx) better for ATS submission?
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Modern ATS platforms parse both vector PDFs and Microsoft Word (.docx) files without issue. Vector PDF is generally preferred because it locks visual styling across all operating systems. However, for older portals (e.g., legacy Taleo or federal USAJOBS), Microsoft Word is safest. GlobeCareer provides instant 1-click downloads for both formats.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 space-y-2">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              Can I use two-column templates or colored graphics on an ATS resume?
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Multi-column designs should be strictly avoided for corporate applications. Parsers frequently read horizontally across columns, interweaving text from unrelated sections. Clean, single-column vertical flows maximize parsing fidelity without losing any of your experience.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 space-y-2">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              Should I include a photo on my ATS resume?
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              In the United States, United Kingdom, and Canada, candidate photos are strictly discouraged due to anti-discrimination regulations (EEOC and Equality Act). Many corporate ATS systems reject resumes with photos to avoid potential bias lawsuits. In Continental Europe (Germany, Austria), photos remain standard practice. GlobeCareer automatically applies the correct rule for your target country.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 space-y-2">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              How do I test my resume before submitting to a job?
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Use GlobeCareer's built-in <strong>ATS Resume Checker</strong> tool. Paste the target job description and your resume text to receive an instant compatibility score, keyword density audit, missing hard skill warnings, and action verb analysis.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 space-y-2">
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              Is GlobeCareer's ATS Resume Maker really 100% free?
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Yes, completely free. Unlike other resume websites that let you build a resume only to demand $29.95 for a download or trap you with blurred PDFs, GlobeCareer provides unwatermarked vector PDF, DOCX, TXT, and JSON downloads at zero cost.
            </p>
          </div>
        </div>

        {/* Cross Navigation Hub */}
        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('ats-checker')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Scan Resume in ATS Checker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <button
              type="button"
              onClick={() => onNavigate('ats-guide')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Read Full ATS Optimization Handbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <button
              type="button"
              onClick={() => onNavigate('resume-phrase-generator')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Resume Phrase Generator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <button
              type="button"
              onClick={() => onNavigate('resume-map')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Global Resume Map (47 Countries)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
