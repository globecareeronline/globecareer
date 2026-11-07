import React, { useState } from 'react';
import { 
  FileText, Globe, CheckCircle2, XCircle, ArrowRight, 
  HelpCircle, Sparkles, BookOpen, Layers, Check, ChevronRight
} from 'lucide-react';

interface CVvsResumeGuidePageProps {
  onStartBuilder: (countryId?: string) => void;
  onNavigate: (page: string, countryId?: string) => void;
}

export const CVvsResumeGuidePage: React.FC<CVvsResumeGuidePageProps> = ({
  onStartBuilder,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'us' | 'uk' | 'eu' | 'academic'>('us');

  const comparisons = [
    {
      feature: 'Primary Document Length',
      resume: '1 Page standard (2 pages for 10+ years experience)',
      internationalCV: '2 Pages standard across corporate hiring',
      academicCV: '3 to 10+ Pages (exhaustive history)'
    },
    {
      feature: 'Geographic Region',
      resume: 'United States, Canada',
      internationalCV: 'UK, EU, Australia, New Zealand, Singapore, India',
      academicCV: 'Worldwide (Universities, Medicine, Grants)'
    },
    {
      feature: 'Standard Paper Size',
      resume: 'US Letter (8.5 × 11 in / 215.9 × 279.4 mm)',
      internationalCV: 'ISO 216 A4 (210 × 297 mm)',
      academicCV: 'A4 or US Letter depending on institution'
    },
    {
      feature: 'Photograph Rules',
      resume: 'Strictly prohibited (anti-bias EEOC)',
      internationalCV: 'Prohibited in UK/IE; customary in DE/FR/ES',
      academicCV: 'Rarely included; optional for symposium bios'
    },
    {
      feature: 'Content Focus',
      resume: 'Targeted summary of achievements tailored to 1 job',
      internationalCV: 'Complete chronological career profile & CEFR languages',
      academicCV: 'Publications, research grants, teaching & citations'
    },
    {
      feature: 'Document Updating',
      resume: 'Tailored and rewritten for every application',
      internationalCV: 'Updated periodically as roles change',
      academicCV: 'Cumulative document that continually grows'
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-neutral-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6">
            <BookOpen className="w-4 h-4 text-blue-400" />
            International Hiring Guide
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            CV vs. Resume: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">Key Differences Explained</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto mb-8 font-light leading-relaxed">
            What is the difference between a Curriculum Vitae (CV) and a resume? The answer depends entirely on the country you are applying in. Learn regional lengths, formatting standards, and when to use each.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onStartBuilder('us')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105 cursor-pointer"
            >
              <FileText className="w-5 h-5" />
              Build a 1-Page US Resume
            </button>
            <button
              onClick={() => onStartBuilder('uk')}
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Globe className="w-5 h-5 text-neutral-300" />
              Build a 2-Page International CV
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">

        {/* Quick Answer Callout */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Quick Summary: Which Document Do You Need?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">United States & Canada</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1 mb-2">You need a "Resume"</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                If applying for corporate, technical, or retail roles in the US or Canada, employers expect a concise <strong>1-page resume</strong> formatted on US Letter paper with no photo. The word "CV" in North America is reserved for academic, medical, and scientific credentials.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">UK, Europe, Australia & Global</span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1 mb-2">You need a "CV" (Curriculum Vitae)</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                In the United Kingdom, Europe, Australia, and New Zealand, "Curriculum Vitae" (or CV) is the standard everyday term for any job application document. It is standardly <strong>2 pages</strong> on ISO A4 paper.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Resume vs. International CV vs. Academic CV: Full Matrix
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Detailed side-by-side comparison across length, geography, paper dimensions, and content expectations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-100 dark:bg-neutral-700/60 text-neutral-700 dark:text-neutral-200 uppercase text-xs font-semibold">
                <tr>
                  <th className="py-3 px-4 rounded-l-lg">Feature</th>
                  <th className="py-3 px-4">Standard Resume (US/CA)</th>
                  <th className="py-3 px-4">International CV (UK/EU/AU)</th>
                  <th className="py-3 px-4 rounded-r-lg">Academic / Medical CV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {comparisons.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors">
                    <td className="py-4 px-4 font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                      {item.feature}
                    </td>
                    <td className="py-4 px-4 text-neutral-600 dark:text-neutral-300">
                      {item.resume}
                    </td>
                    <td className="py-4 px-4 text-neutral-600 dark:text-neutral-300">
                      {item.internationalCV}
                    </td>
                    <td className="py-4 px-4 text-neutral-600 dark:text-neutral-300">
                      {item.academicCV}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Deep Dive into Formats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm mb-4">
                1 PAGE
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">The American Resume</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Derived from the French word <em>résumé</em> (meaning "summary"), this document is a targeted marketing pitch designed to win an interview in 6 seconds. It focuses strictly on relevant achievements.
              </p>
              <ul className="text-xs space-y-2 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" /> Standard 1-page length</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" /> US Letter paper (8.5 × 11 in)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" /> Quantified impact bullets (Google X-Y-Z)</li>
              </ul>
            </div>
            <button
              onClick={() => onStartBuilder('us')}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Build US Resume
            </button>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
                2 PAGES
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">The International CV</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Latin for <em>"course of life"</em>, the standard international CV provides a broader, chronological overview of your professional career, language abilities, and formal qualifications.
              </p>
              <ul className="text-xs space-y-2 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" /> 2-page standard length</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" /> International A4 paper (210 × 297 mm)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" /> CEFR language ratings included</li>
              </ul>
            </div>
            <button
              onClick={() => onStartBuilder('uk')}
              className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Build International CV
            </button>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm mb-4">
                3+ PAGES
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">The Academic / Medical CV</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Used specifically for professorships, postdocs, scientific fellowships, and medical residency applications. There is no page limit; every publication and grant is cataloged.
              </p>
              <ul className="text-xs space-y-2 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" /> Exhaustive length (no page ceiling)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" /> Peer-reviewed publications & citations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" /> Research grants & conference talks</li>
              </ul>
            </div>
            <button
              onClick={() => onNavigate('templates')}
              className="mt-6 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Browse Templates
            </button>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            Curriculum Vitae vs. Resume FAQs
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                Can a resume be 2 pages long?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Yes. While entry-level candidates and professionals with under 7–10 years of experience should strictly maintain a 1-page resume, seasoned managers, executives, and senior technical architects with extensive track records are encouraged to use a 2-page resume in the US and Canada.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                What does "CV" stand for in English?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                "CV" stands for the Latin phrase <em>Curriculum Vitae</em>, which translates literally to "the course of one's life".
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                Why do European CVs use A4 paper while US resumes use Letter?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                The United States and Canada use the ANSI paper size standard (Letter: 8.5 × 11 in / 215.9 × 279.4 mm). Almost every other nation on Earth follows the International ISO 216 standard (A4: 210 × 297 mm). Submitting a US Letter document to a European recruiter often causes margin clipping when printed.
              </p>
            </div>
          </div>
        </section>

        {/* Regional Standards & Format Pillars Grid */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Regional Formats & Country Hiring Standards
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Select your specific hiring market to ensure your document satisfies local laws and recruiter standards:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => onNavigate('country-detail', 'us')}
              className="p-4 text-left rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">US Standard</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                United States Resume
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                1 page, Letter size, strictly no photo, ATS keyword optimized.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('country-detail', 'uk')}
              className="p-4 text-left rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">UK Standard</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                United Kingdom CV
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                2 pages, A4 size, personal profile summary, no photo rule.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('european-cv-format')}
              className="p-4 text-left rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">European Union</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                European CV Format
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Europass structure, CEFR language grid, A4 paper standard.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('reverse-chronological-resume-format')}
              className="p-4 text-left rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">Universal Layout</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Reverse Chronological
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                The gold-standard layout preferred by 98% of Fortune 500 recruiters.
              </p>
            </button>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
            Build the Exact Document Your Recruiters Expect
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
            GlobeCareer automatically sets the correct page length, paper size, and photo rules for 40+ countries. 100% free vector PDF and Word DOCX downloads.
          </p>
          <button
            onClick={() => onStartBuilder()}
            className="px-8 py-4 bg-white text-blue-900 hover:bg-neutral-100 font-bold rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer text-base"
          >
            Start Your Free CV / Resume
          </button>
        </section>

      </div>
    </div>
  );
};
