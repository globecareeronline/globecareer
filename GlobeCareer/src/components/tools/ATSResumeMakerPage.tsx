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
  ExternalLink
} from 'lucide-react';
import { TEMPLATES } from '../templates/TemplateList';
import { COUNTRIES } from '../../data/countries';

interface ATSResumeMakerPageProps {
  onNavigate: (page: string) => void;
  onStartResumeForCountry?: (countryId: string) => void;
}

const ATS_VERIFIED_TEMPLATES = TEMPLATES.filter(t => t.atsCompliant && t.columns === 1);

const ATS_RULES = [
  {
    title: 'Strict Single-Column Architecture',
    desc: 'Workday and Taleo parse documents top-to-bottom. Multi-column tables cause experience dates and job titles to interleave into scrambled text.',
    status: 'Verified Safe'
  },
  {
    title: 'Standard Section Hierarchy',
    desc: 'Always use standard headers: "Professional Experience", "Education", "Skills", "Certifications". Avoid creative labels like "Where I\'ve Been" or "Proficiencies".',
    status: 'Verified Safe'
  },
  {
    title: 'Zero Floating Graphic Elements',
    desc: 'Icons, rating stars, circular skill bars, and text boxes placed inside Word headers are discarded or trip parser errors.',
    status: 'Verified Safe'
  },
  {
    title: 'Machine-Readable Dates',
    desc: 'Standard formats like MM/YYYY or "Month Year" (e.g., "05/2021 – Present" or "May 2021 – Present") are correctly tokenized into candidate tenure.',
    status: 'Verified Safe'
  },
  {
    title: 'Selectable Text & True Vector Output',
    desc: 'Never submit scanned images or raster PDFs. GlobeCareer exports 100% clean vector PDF and clean Microsoft Word DOCX formats.',
    status: 'Verified Safe'
  }
];

export const ATSResumeMakerPage: React.FC<ATSResumeMakerPageProps> = ({
  onNavigate,
  onStartResumeForCountry
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('us');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('ats_classic');

  const handleLaunchBuilder = () => {
    // Save chosen template and country to localStorage
    try {
      const saved = localStorage.getItem('globecareer_resume_data') || '{}';
      const parsed = JSON.parse(saved);
      parsed.templateId = selectedTemplate;
      parsed.country = selectedCountry;
      localStorage.setItem('globecareer_resume_data', JSON.stringify(parsed));
    } catch (e) {
      // ignore
    }
    if (onStartResumeForCountry) {
      onStartResumeForCountry(selectedCountry);
    } else {
      onNavigate('builder');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 block">
            Dedicated ATS Resume Workspace
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            100% Parser Safe
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Free ATS Resume Maker – Create Applicant Tracking System-Proof CVs
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          More than 98% of Fortune 500 corporations use Applicant Tracking Systems (Workday, Taleo, Greenhouse, Lever, and iCIMS) to screen candidates. GlobeCareer's ATS Resume Maker formats your CV into single-column, machine-readable structures guaranteed to parse cleanly into recruiter dashboards.
        </p>
      </div>

      {/* Interactive Quick-Start Configurator */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
        
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
            Step 1 of 2: Select Your Target Country & ATS Standard
          </span>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Configure Your ATS Target Standards
          </h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Applicant Tracking Systems calibrate screening rules based on regional regulations (e.g. EEOC photo restrictions in the US vs. A4 paper sizes in the UK and Europe).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'us', name: 'United States', standard: '1 Page Strict • Letter • No-Photo EEOC' },
            { id: 'uk', name: 'United Kingdom', standard: '2 Pages Standard • A4 • Equality Act' },
            { id: 'ca', name: 'Canada', standard: '1-2 Pages • Letter • Human Rights Act' },
            { id: 'au', name: 'Australia', standard: '2-3 Pages • A4 • Chronological Standards' },
            { id: 'de', name: 'Germany', standard: 'Lebenslauf • A4 • Tabular Structure' },
            { id: 'in', name: 'India', standard: '2-3 Pages • A4 • Tech Competencies' },
            { id: 'ae', name: 'United Arab Emirates', standard: 'Executive • A4 • International CV' },
            { id: 'sg', name: 'Singapore', standard: '1-2 Pages • A4 • Regional Tech Hub' },
          ].map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCountry(c.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedCountry === c.id
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-950'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">{c.name}</span>
                {selectedCountry === c.id && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
              </div>
              <div className="text-[11px] text-neutral-500">{c.standard}</div>
            </button>
          ))}
        </div>

        {/* Step 2: Select ATS-Verified Template */}
        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
          <div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
              Step 2 of 2: Select Single-Column ATS Layout
            </span>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Verified Single-Column ATS Layouts
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              These templates strictly adhere to linear 1-column layouts, standard system fonts, and semantic bullet tags.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ATS_VERIFIED_TEMPLATES.map(tpl => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedTemplate === tpl.id
                    ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-950'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      100% ATS Safe
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

        {/* Launch Button Action */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold">Ready to Build Your ATS-Proof Resume?</h4>
            <p className="text-xs text-blue-100">
              Opens the complete Resume Builder with your selected country standard and single-column ATS template preconfigured.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLaunchBuilder}
            className="px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Launch ATS Resume Maker</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* The 5 Non-Negotiable ATS Rules */}
      <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
            Engineered Compliance
          </span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            How GlobeCareer Enforces 100% ATS Parsing Fidelity
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            We systematically eliminate the structural traps that cause corporate Applicant Tracking Systems to reject otherwise qualified candidates:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ATS_RULES.map((rule, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {rule.status}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">0{idx + 1}</span>
              </div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                {rule.title}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ on ATS Systems */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Frequently Asked Questions About ATS Resume Systems
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 space-y-2">
            <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              Does an ATS automatically reject resumes with a low score?
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              No ATS has an automatic "rejection button". Rather, systems like Workday and Greenhouse parse your resume text, extract candidate entities (job titles, companies, years, degrees, skills), and present recruiters with a ranked or filtered list. Resumes with parsing errors or missing keywords simply sit at the bottom of the list.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 space-y-2">
            <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              Is PDF or Microsoft Word DOCX better for ATS screening?
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Modern ATS platforms parse both vector PDFs and Microsoft Word (.docx) files without issue. However, vector PDF is superior because it preserves your visual layout and font rendering across Mac, Windows, and Linux. GlobeCareer supports instant downloads in both formats.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 space-y-2">
            <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              Can I use columns or graphics on an ATS resume?
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Multi-column designs should be avoided for high-volume corporate applications. Parsers frequently read across columns horizontally, merging text from unrelated sections. Clean, single-column vertical flows guarantee 100% parsing fidelity.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 space-y-2">
            <h4 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              How do I test my resume before submitting?
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Use GlobeCareer's built-in <strong>ATS Resume Checker</strong> tool. Paste your target job description and your resume text to receive an instant compatibility score, keyword density audit, and missing skill recommendations.
            </p>
          </div>
        </div>

        {/* Cross Link Hub */}
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
          </div>
        </div>

      </div>

    </div>
  );
};
