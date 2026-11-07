import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, Globe, ArrowRight, ShieldCheck, 
  HelpCircle, Sparkles, AlertCircle, Copy, Check, Download,
  Layers, Award, BookOpen, ChevronRight, UserCheck
} from 'lucide-react';

interface EuropeanCVFormatPageProps {
  onStartBuilder: (preset?: string) => void;
  onNavigate: (page: string, countryId?: string) => void;
}

export const EuropeanCVFormatPage: React.FC<EuropeanCVFormatPageProps> = ({
  onStartBuilder,
  onNavigate
}) => {
  const [copiedLevel, setCopiedLevel] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLevel(id);
    setTimeout(() => setCopiedLevel(null), 2000);
  };

  const cefrLevels = [
    { level: 'C2', name: 'Mastery / Native-like', desc: 'Can understand virtually everything heard or read with ease; can express spontaneously and fluently.', badge: 'Proficient' },
    { level: 'C1', name: 'Effective Operational Proficiency', desc: 'Can understand demanding, longer texts and recognize implicit meaning; uses language flexibly.', badge: 'Proficient' },
    { level: 'B2', name: 'Vantage / Upper Intermediate', desc: 'Can interact with native speakers fluently and produce clear, detailed text on diverse subjects.', badge: 'Independent' },
    { level: 'B1', name: 'Threshold / Intermediate', desc: 'Can deal with most situations while traveling in an area where the language is spoken; describes experiences.', badge: 'Independent' },
    { level: 'A2', name: 'Waystage / Elementary', desc: 'Can communicate in simple and routine tasks requiring simple and direct exchange of information.', badge: 'Basic' },
    { level: 'A1', name: 'Breakthrough / Beginner', desc: 'Can understand and use familiar everyday expressions and basic phrases aimed at satisfying concrete needs.', badge: 'Basic' },
  ];

  const euCountryRules = [
    { country: 'Germany', code: 'de', photo: 'Customary (Bewerbungsfoto)', pages: '1–2 Pages', language: 'German or English', note: 'Sign & date at bottom; chronological tabular format (Tabellarischer Lebenslauf).' },
    { country: 'United Kingdom', code: 'uk', photo: 'Strictly Discouraged', pages: '2 Pages Standard', language: 'British English', note: 'UK Equality Act prohibits discrimination; omit photo, DOB, marital status, nationality.' },
    { country: 'France', code: 'fr', photo: 'Optional / Customary', pages: '1–2 Pages', language: 'French or English', note: 'Concise layout; include professional title, mobility/driving license, and language proficiencies.' },
    { country: 'Netherlands', code: 'nl', photo: 'Neutral / Optional', pages: '1–2 Pages', language: 'Dutch or English', note: 'Direct and factual; high emphasis on measurable competencies and project outcomes.' },
    { country: 'Ireland', code: 'ie', photo: 'Strictly Discouraged', pages: '2 Pages', language: 'English', note: 'Similar to UK conventions; personal profile at the top, clear chronological work history.' },
    { country: 'Spain', code: 'es', photo: 'Customary', pages: '1–2 Pages', language: 'Spanish or English', note: 'Professional portrait photo is common; include DNI/NIE if residing in Spain.' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-900 to-neutral-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6">
            <Globe className="w-4 h-4 text-blue-400" />
            European Union Hiring Standard
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            European CV Format & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">Modern EU Templates</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto mb-8 font-light leading-relaxed">
            Create a standardized, ATS-compliant Curriculum Vitae tailored to European recruiters. Includes verified ISO A4 standards, CEFR language grids, country-by-country photo regulations, and instant vector PDF export.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onStartBuilder('eu')}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              Build European CV Now (Free)
            </button>
            <button
              onClick={() => onNavigate('templates')}
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-5 h-5 text-neutral-300" />
              Browse EU Templates
            </button>
          </div>

          {/* Legal / Independence Notice */}
          <div className="mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto text-xs text-neutral-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Independent Platform:</strong> GlobeCareer provides independent European-standard CV formatting. We are not affiliated with, sponsored by, or endorsed by the European Commission or the official Europass portal.
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* Core Pillars Grid */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              What Defines an Effective European CV?
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              European recruiters prioritize clarity, structured chronology, standardized language proficiency, and verifiable qualifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 font-bold text-lg">
                A4
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Standard DIN A4 Dimensions</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Unlike the North American 8.5 × 11 in Letter paper, European job applications strictly use International ISO 216 <strong>A4 (210 × 297 mm)</strong>. Our builder auto-sets margins and pagination for flawless European printing.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">CEFR Language Framework</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Vague terms like "fluent" or "conversational" are replaced with the official <strong>CEFR framework (A1 to C2)</strong>, giving multinational employers instant clarity on your reading, writing, and speaking competencies.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">GDPR & Privacy Compliance</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Under European GDPR regulations, never include sensitive identifiers such as marital status, religion, children, or tax IDs. Include work authorization status (EU citizen / Blue Card eligibility).
              </p>
            </div>
          </div>
        </section>

        {/* Essential Sections of a European CV */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
            Anatomy of a Modern European CV: Required Sections
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-700/60">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">1</span>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">Personal & Contact Details</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Full Name, professional email, phone with country dialing code (e.g., +49, +33, +31), city and country of residence, LinkedIn profile URL, and work authorization (e.g., "Eligible to work in the EU without sponsorship").
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-700/60">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">2</span>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">Professional Summary (Personal Profile)</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  A targeted 3–4 line overview summarizing your specialization, total years of experience across European/global markets, core industry expertise, and key multilingual accomplishments.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-700/60">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">3</span>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">Work Experience (Reverse Chronological)</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Job title, company name, city/country location, exact dates (Month Year – Month Year or Present). Structure accomplishments with quantified bullet points (revenue impact, project budgets, team sizes).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-5 border-b border-neutral-100 dark:border-neutral-700/60">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">4</span>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">Education & European Degree Equivalency (EQF / ECTS)</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Degree title (BSc, MSc, PhD), university, city/country, graduation year. For international applicants, noting equivalent European Qualifications Framework (EQF) level or ECTS credits aids local HR understanding.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">5</span>
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">Languages (CEFR) & Digital Skills</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Breakdown of mother tongue(s) and other languages mapped to CEFR (A1–C2). List technical tools, enterprise software, certifications (e.g., PMP, AWS, Prince2), and professional memberships.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CEFR Language Grid Table */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                CEFR Language Proficiency Reference Grid
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Common European Framework of Reference for Languages. Click copy to grab the standard description for your CV.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-100 dark:bg-neutral-700/60 text-neutral-700 dark:text-neutral-200 uppercase text-xs font-semibold">
                <tr>
                  <th className="py-3 px-4 rounded-l-lg">CEFR Level</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Standard Definition</th>
                  <th className="py-3 px-4 rounded-r-lg text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                {cefrLevels.map((c) => (
                  <tr key={c.level} className="hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors">
                    <td className="py-4 px-4 font-black text-blue-600 dark:text-blue-400 text-base">
                      {c.level}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-neutral-900 dark:text-white">{c.name}</div>
                      <span className="inline-block mt-0.5 text-xs px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                        {c.badge}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-neutral-600 dark:text-neutral-300 max-w-md">
                      {c.desc}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => copyToClipboard(`${c.level} (${c.name}): ${c.desc}`, c.level)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copiedLevel === c.level ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* European Country Differences */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Country-by-Country Hiring Conventions in Europe
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              While the European Union shares common frameworks, national hiring cultures differ significantly on photographs and length.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {euCountryRules.map((c) => (
              <div 
                key={c.code}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-850 hover:border-blue-500/50 transition-all cursor-pointer"
                onClick={() => onNavigate('country-detail', c.code)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                    <span className="uppercase text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      {c.code}
                    </span>
                    {c.country}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </div>
                <div className="text-xs space-y-1 text-neutral-600 dark:text-neutral-300">
                  <div><strong>Photo Rule:</strong> {c.photo}</div>
                  <div><strong>Standard Length:</strong> {c.pages}</div>
                  <div><strong>Language:</strong> {c.language}</div>
                  <div className="text-neutral-500 dark:text-neutral-400 mt-2 italic">{c.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            European CV Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                What is the difference between a European CV and an American resume?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                An American resume strictly adheres to a 1-page rule (for professionals under 10 years experience), US Letter paper dimensions, and strictly forbids photos under EEOC regulations. A European CV is standardly 2 pages on ISO A4 paper, frequently accommodates professional headshots in mainland Europe (Germany, France, Austria, Switzerland), and features standardized language ratings (CEFR).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                Should I put a photo on my European CV?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                It depends on the specific country. In Germany, Austria, and Switzerland, a professional headshot (Bewerbungsfoto) is customary. In France and Spain, photos are widely accepted. However, in the United Kingdom and Ireland, photographs are strictly discouraged to avoid violating anti-discrimination legislation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                How should I format language skills on a European CV?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Use the Common European Framework of Reference for Languages (CEFR). List your Mother Tongue, followed by acquired languages graded from A1 (Beginner) to C2 (Mastery/Native-like). If you have certified test scores (IELTS, TOEFL, Goethe-Zertifikat, DELF/DALF), include them alongside the level.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                Can I export my European CV to Word (DOCX) and PDF?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Yes. GlobeCareer produces 100% vector-based PDF files that parse accurately in European applicant tracking systems (such as Workday, Personio, Greenhouse, and Taleo) as well as editable Microsoft Word DOCX files.
              </p>
            </div>
          </div>
        </section>

        {/* European Country Guides & Regional Standards Hub */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Country-Specific European CV Guides
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Explore national hiring practices, photo rules, and language expectations across leading European employment markets:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'de', name: 'Germany', detail: 'Lebenslauf (Photo standard)' },
              { id: 'uk', name: 'United Kingdom', detail: '2-page CV (No photo rule)' },
              { id: 'fr', name: 'France', detail: 'CV Français (Photo customary)' },
              { id: 'nl', name: 'Netherlands', detail: 'Dutch CV (Direct, concise)' },
              { id: 'ie', name: 'Ireland', detail: 'Irish CV (Strict anti-bias)' },
              { id: 'it', name: 'Italy', detail: 'CV Formato Europeo (GDPR note)' },
              { id: 'es', name: 'Spain', detail: 'Currículum Vitae (DNI/Photo)' },
              { id: 'pl', name: 'Poland', detail: 'Polish CV (RODO clause)' },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onNavigate('country-detail', c.id)}
                className="p-3.5 text-left rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:shadow-xs transition-all group"
              >
                <div className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                  {c.name}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
                  {c.detail}
                </div>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-neutral-500 dark:text-neutral-400 font-medium">Looking for all 40+ countries?</span>
            <button
              type="button"
              onClick={() => onNavigate('country-guides')}
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              Browse Complete Directory of 40 Country CV Guides
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
            Ready to Format Your European CV?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
            Create an ATS-friendly European Curriculum Vitae in minutes. Select your target country, configure CEFR languages, and download in vector PDF or Word DOCX.
          </p>
          <button
            onClick={() => onStartBuilder('eu')}
            className="px-8 py-4 bg-white text-blue-900 hover:bg-neutral-100 font-bold rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer text-base"
          >
            Start Free European CV Builder
          </button>
        </section>

      </div>
    </div>
  );
};
