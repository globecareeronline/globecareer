import React, { useState } from 'react';
import { getCountryById, getCountriesByRegion } from '../../data/countries';
import { generateSampleResume, SamplePersonaType } from '../../data/sampleResumes';
import { ResumeRenderer } from '../templates/ResumeRenderer';
import { exportResumeToDocx } from '../../utils/docxExport';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, AlertTriangle, 
  BookOpen, CheckCircle, FileText, Download, Printer, ExternalLink,
  Sparkles, Zap, Globe, Target, Layers, Compass
} from 'lucide-react';

interface CountryDetailPageProps {
  countryId: string;
  onBack: () => void;
  onStartResume: (countryId: string, persona?: SamplePersonaType) => void;
  onNavigate?: (page: string, countryId?: string) => void;
}

export const CountryDetailPage: React.FC<CountryDetailPageProps> = ({
  countryId,
  onBack,
  onStartResume,
  onNavigate
}) => {
  const country = getCountryById(countryId);
  const [samplePersona, setSamplePersona] = useState<SamplePersonaType>('experienced');
  const sampleResume = generateSampleResume(country.id, samplePersona);

  // Determine neighboring countries in the same region for semantic topical linking
  const regionalNeighbors = getCountriesByRegion(country.region)
    .filter(c => c.id !== country.id)
    .slice(0, 4);

  const handleDownloadSampleDocx = () => {
    exportResumeToDocx(sampleResume, `${country.name}_Sample_${sampleResume.design.templateId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb Navigation Hierarchy */}
      <nav aria-label="Breadcrumb" className="text-xs">
        <ol className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 font-medium">
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </a>
          </li>
          <li aria-hidden="true" className="text-neutral-300 dark:text-neutral-600">/</li>
          <li>
            <a
              href="/country-guides"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              className="hover:text-blue-600 transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 inline" />
              Country Guides
            </a>
          </li>
          <li aria-hidden="true" className="text-neutral-300 dark:text-neutral-600">/</li>
          <li className="text-neutral-900 dark:text-neutral-100 font-semibold" aria-current="page">
            {country.name} CV & Resume Guide
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
                Official Hiring Guide
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {country.name} CV & Resume Guide
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 font-medium">
            <span>Standard Term: <strong className="text-neutral-800 dark:text-neutral-200">{country.cvTerminology}</strong></span>
            <span>·</span>
            <span>Paper: <strong className="text-neutral-800 dark:text-neutral-200">{country.paperSize.toUpperCase()}</strong></span>
            <span>·</span>
            <span>Dialing: <strong className="font-mono text-neutral-800 dark:text-neutral-200">{country.phonePrefix}</strong></span>
            <span>·</span>
            <span>Date Format: <strong className="font-mono text-neutral-800 dark:text-neutral-200">{country.dateConvention}</strong></span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => onStartResume(country.id, samplePersona)}
            className="w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            Create {country.name} Resume
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Country Guidelines Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Guidelines, Laws, and Requirements */}
        <div className="lg:col-span-7 space-y-6">
          {/* Photo Regulation Card */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Photograph & Portrait Policy
              </h3>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                country.photoRule === 'discouraged' 
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
              }`}>
                {country.photoRule}
              </span>
            </div>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {country.photoNotice}
            </p>
          </div>

          {/* Key Hiring Nuances & Checklist */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Essential {country.name} Hiring Conventions
            </h3>
            <ul className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300">
              {country.keyHiringNuances.map((nuance, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100 shrink-0 mt-1.5"></span>
                  <span>{nuance}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Personal Information Rules */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Personal Information Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl">
                <span className="text-neutral-500 block text-[11px]">Date of Birth / Age:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {country.personalDataRules.dobAllowed ? 'Standard / Permitted' : 'Strictly Discouraged / Excluded'}
                </span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl">
                <span className="text-neutral-500 block text-[11px]">Nationality:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {country.personalDataRules.nationalityAllowed ? 'Commonly Listed' : 'Omit to avoid bias'}
                </span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl">
                <span className="text-neutral-500 block text-[11px]">Work Authorization / Visa:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {country.personalDataRules.workAuthStatusRecommended ? 'Highly Recommended' : 'Optional'}
                </span>
              </div>
              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl">
                <span className="text-neutral-500 block text-[11px]">Driving License:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {country.personalDataRules.drivingLicenseCommon ? 'Standard in private sector' : 'Only if job requires driving'}
                </span>
              </div>
            </div>

            {/* Special GDPR / RODO Warning for Poland */}
            {country.personalDataRules.requiresGDPRClause && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl space-y-2">
                <div className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Mandatory Statutory Clause Requirement:
                </div>
                <p className="text-[11px] text-blue-800 dark:text-blue-300 font-mono italic leading-relaxed">
                  "{country.personalDataRules.gdprClauseText}"
                </p>
              </div>
            )}
          </div>

          {/* ATS Parsing Recommendations */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              ATS Compatibility Guidance
            </h3>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {country.atsRecommendations}
            </p>
          </div>

          {/* Regional Standards & Topical SEO Authority Card */}
          <div className="p-6 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200/70 dark:border-blue-900/60 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              <Compass className="w-4 h-4" />
              <span>Recommended Guides for {country.name} Applicants</span>
            </div>
            
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Ensure your {country.name} application conforms strictly to local employer expectations and automated screening rules:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
              {country.region === 'Europe' ? (
                <>
                  <a
                    href="/european-cv-format"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('european-cv-format');
                    }}
                    className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500 transition-colors flex items-start gap-2 group"
                  >
                    <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                        European CV Format Guide
                      </div>
                      <div className="text-[11px] text-neutral-500">A4 layout, CEFR language grid & EU standards.</div>
                    </div>
                  </a>
                  <a
                    href="/cv-vs-resume"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('cv-vs-resume');
                    }}
                    className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500 transition-colors flex items-start gap-2 group"
                  >
                    <BookOpen className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-teal-600 transition-colors">
                        CV vs Resume Differences
                      </div>
                      <div className="text-[11px] text-neutral-500">Why European CVs differ from US resumes.</div>
                    </div>
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/reverse-chronological-resume-format"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('reverse-chronological');
                    }}
                    className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500 transition-colors flex items-start gap-2 group"
                  >
                    <Layers className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                        Reverse Chronological Format
                      </div>
                      <div className="text-[11px] text-neutral-500">The gold standard structure for {country.name}.</div>
                    </div>
                  </a>
                  <a
                    href="/resume-word-counter"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.('resume-word-counter');
                    }}
                    className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500 transition-colors flex items-start gap-2 group"
                  >
                    <FileText className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 transition-colors">
                        Resume Word Counter
                      </div>
                      <div className="text-[11px] text-neutral-500">Verify 1-page fit & word density.</div>
                    </div>
                  </a>
                </>
              )}

              <a
                href="/ats-checker"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('ats-checker');
                }}
                className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500 transition-colors flex items-start gap-2 group"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 transition-colors">
                    ATS Resume Checker
                  </div>
                  <div className="text-[11px] text-neutral-500">Scan keyword match for {country.name} vacancies.</div>
                </div>
              </a>

              <a
                href="/resume-bullet-generator"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('resume-bullet-generator');
                }}
                className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-blue-500 transition-colors flex items-start gap-2 group"
              >
                <Target className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 transition-colors">
                    Bullet Point Generator
                  </div>
                  <div className="text-[11px] text-neutral-500">Draft Google X-Y-Z quantifiable achievements.</div>
                </div>
              </a>
            </div>
          </div>

          {/* Authoritative Sources & Regulatory Bodies */}
          <div className="p-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Verified Legal & Public Sources
            </h3>
            <div className="space-y-2">
              {country.sources.map((src, idx) => (
                <div key={idx} className="text-xs text-neutral-600 dark:text-neutral-400 flex items-start gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-800 dark:text-neutral-200">{src.title}</strong> — {src.institution}
                    <div className="text-[11px] text-neutral-500">{src.notes}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Demonstration Sample */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Demonstration Sample Resume
              </h3>
              <p className="text-[11px] text-neutral-400">
                Realistic sample configured specifically for {country.name}.
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleDownloadSampleDocx}
                className="p-1.5 text-xs text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg flex items-center gap-1"
                title="Download Sample as DOCX"
              >
                <Download className="w-3.5 h-3.5" />
                DOCX
              </button>
            </div>
          </div>

          {/* Persona selector tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setSamplePersona('experienced')}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-colors ${
                samplePersona === 'experienced' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500'
              }`}
            >
              Senior / Experienced
            </button>
            <button
              type="button"
              onClick={() => setSamplePersona('graduate')}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-colors ${
                samplePersona === 'graduate' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500'
              }`}
            >
              Recent Graduate
            </button>
            <button
              type="button"
              onClick={() => setSamplePersona('career_changer')}
              className={`flex-1 py-1.5 rounded-lg font-medium transition-colors ${
                samplePersona === 'career_changer' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500'
              }`}
            >
              Career Changer
            </button>
          </div>

          {/* Fictional Demonstration Notice */}
          <div className="text-[11px] text-neutral-400 italic text-center">
            * All names and companies shown below are fictional demonstration data created to illustrate {country.name} formatting standards.
          </div>

          {/* Scaled Rendered Resume Preview */}
          <div className="bg-neutral-200 dark:bg-neutral-800 p-4 rounded-2xl overflow-hidden shadow-inner flex justify-center">
            <ResumeRenderer data={sampleResume} scale={0.52} className="origin-top" />
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onStartResume(country.id, samplePersona)}
              className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 text-white dark:text-neutral-900 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              Use This {country.name} Template in Builder
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cross-Regional Authority & Neighboring Country Hub */}
      {regionalNeighbors.length > 0 && (
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Explore Neighboring {country.region} Job Markets
              </h2>
              <p className="text-xs text-neutral-500">
                Compare {country.name} requirements with adjacent countries in {country.region}.
              </p>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors self-start sm:self-auto"
            >
              <span>View All 40 Country Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {regionalNeighbors.map((nbr) => (
              <a
                key={nbr.id}
                href={`/country/${nbr.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('country-detail', nbr.id);
                }}
                className="p-3.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl transition-all space-y-1.5 shadow-2xs group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{nbr.flag}</span>
                  <div className="truncate">
                    <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors truncate">
                      {nbr.name}
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {nbr.cvTerminology} · {nbr.paperSize.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-neutral-500 line-clamp-1">
                  Photo: {nbr.photoRule}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
