import React, { useState } from 'react';
import { JOB_CATEGORIES, JobCategoryConfig } from '../../data/jobCategories';
import { ROLE_EXAMPLES } from '../../data/roleExamples';
import { getCountryById } from '../../data/countries';
import { 
  Briefcase, CheckCircle2, Sparkles, ArrowRight, 
  Search, Code, LineChart, Wrench, Stethoscope, GraduationCap, Globe2
} from 'lucide-react';

interface JobExamplesPageProps {
  onSelectCategory: (categoryId: string) => void;
  onNavigate?: (page: string, countryId?: string) => void;
}

const ABROAD_MARKETS = ['us', 'uk', 'de', 'ca', 'au', 'ae', 'jp', 'sg'].map((id) => getCountryById(id));

const photoRuleLabel = (rule: string): string => {
  if (rule === 'discouraged') return 'Discouraged';
  if (rule === 'standard') return 'Customary';
  return 'Optional';
};

export const JobExamplesPage: React.FC<JobExamplesPageProps> = ({ onSelectCategory, onNavigate }) => {
  const [selectedCatId, setSelectedCatId] = useState(JOB_CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategory = JOB_CATEGORIES.find(c => c.id === selectedCatId) || JOB_CATEGORIES[0];

  const filteredCategories = JOB_CATEGORIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          18+ Industry Repertoires & Quantified Bullets
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Job-Specific Resume Examples & Keyword Repositories
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Explore battle-tested achievement bullets, verified hard skills, and high-frequency ATS keywords across 18 major employment industries. Use these frameworks to craft high-impact resumes with genuine metric achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Categories List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter industries..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredCategories.map((cat) => {
              const isSelected = cat.id === selectedCatId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between text-xs font-semibold ${
                    isSelected 
                      ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm' 
                      : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-800'
                  }`}
                >
                  <span className="truncate mr-2">{cat.name}</span>
                  <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'opacity-100' : 'opacity-30'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Category Deep Dive */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-blue-600 block mb-1">
                  Industry Specification
                </span>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                  {activeCategory.name}
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  {activeCategory.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectCategory(activeCategory.id)}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0"
              >
                Use in Builder
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Professional Summary Example */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Proven Professional Summary Formula
              </h3>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                "{activeCategory.sampleSummary}"
              </div>
            </div>

            {/* Quantifiable Achievement Bullets */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                High-Impact Achievement Bullets (XYZ Formula)
              </h3>
              <div className="space-y-2.5">
                {activeCategory.sampleBulletPoints.map((bullet, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 bg-neutral-50/60 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800 rounded-xl text-xs text-neutral-800 dark:text-neutral-200 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-mono font-bold shrink-0 text-[10px] mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Skills Taxonomy */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Essential Industry Skills & Tooling
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200 block">
                    Technical Proficiencies
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activeCategory.suggestedSkills.technical.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-[11px] text-neutral-700 dark:text-neutral-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200 block">
                    Tools & Frameworks
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activeCategory.suggestedSkills.tools.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-[11px] text-neutral-700 dark:text-neutral-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <span className="font-bold text-neutral-800 dark:text-neutral-200 block">
                    Collaborative Soft Skills
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activeCategory.suggestedSkills.soft.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-[11px] text-neutral-700 dark:text-neutral-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ATS Semantic Keyword Bank */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                High-Frequency ATS Keywords
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeCategory.keywords.map(kw => (
                  <span key={kw} className="px-2.5 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg font-mono">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* International applications: targets "resume example for applying abroad" */}
      <section id="applying-abroad" className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Globe2 className="w-4 h-4" />
            International Applications
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Resume Example for Applying Abroad
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
            A strong resume for an international application is not a translated copy of your domestic one. The employer is reading three things at once: whether you can legally work there, whether your experience maps onto local job titles, and whether your document follows their format conventions. Start from the industry example above, then apply the four adjustments below before you submit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">1. State work authorisation</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Put your status in the contact header — for example “Right to work in the UK, no sponsorship required” or “Seeking EU Blue Card sponsorship”. Ambiguity here is the most common reason international applications are filtered out.
            </p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">2. Match local job titles</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              A “Financial Analyst” in one market may be a “Management Accountant” in another. Keep your official title, then add the local equivalent in brackets so both recruiters and keyword searches can find it.
            </p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">3. Follow the local document rules</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Photo rules, date of birth, nationality, paper size and one-page limits vary by country and, in some markets, are governed by anti-discrimination law. Check the country guide before you export.
            </p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">4. Translate the evidence</span>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Convert grades, currency and metrics into terms the reader knows, and give language ability in a recognisable scale such as CEFR (B2, C1, C2) rather than “fluent”.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            What Changes in Major Hiring Markets
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
              <thead className="bg-neutral-100 dark:bg-neutral-800 text-left">
                <tr>
                  <th scope="col" className="p-2.5 font-bold">Market</th>
                  <th scope="col" className="p-2.5 font-bold">Document called</th>
                  <th scope="col" className="p-2.5 font-bold">Typical length</th>
                  <th scope="col" className="p-2.5 font-bold">Paper</th>
                  <th scope="col" className="p-2.5 font-bold">Photo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                {ABROAD_MARKETS.map((c) => (
                  <tr key={c.id}>
                    <td className="p-2.5 font-semibold whitespace-nowrap">
                      <a
                        href={`/country/${c.id}`}
                        onClick={(e) => { e.preventDefault(); onNavigate?.('country-detail', c.id); }}
                        className="hover:text-blue-600 hover:underline"
                        title={`${c.name} CV and resume guide`}
                      >
                        {c.flag} {c.name}
                      </a>
                    </td>
                    <td className="p-2.5 whitespace-nowrap">{c.cvTerminology}</td>
                    <td className="p-2.5">{c.standardLength}</td>
                    <td className="p-2.5 whitespace-nowrap uppercase">{c.paperSize}</td>
                    <td className="p-2.5 whitespace-nowrap">{photoRuleLabel(c.photoRule)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-neutral-500">
            Photo conventions are summarised from each country&apos;s published hiring guidance. Where a market discourages photos, professional recruiters usually treat an attached headshot as a bias risk rather than an advantage.
          </p>
        </div>

        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl space-y-2">
          <span className="font-bold text-blue-900 dark:text-blue-200 text-xs block">Build the international version in one pass</span>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            The builder applies the selected country&apos;s paper size, photo rule and section order automatically. Compare formats in the{' '}
            <a href="/european-cv-format" onClick={(e) => { e.preventDefault(); onNavigate?.('european-cv-format'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">European CV format guide</a>,{' '}
            review the{' '}
            <a href="/cv-vs-resume" onClick={(e) => { e.preventDefault(); onNavigate?.('cv-vs-resume'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">CV vs resume differences</a>{' '}
            or browse all{' '}
            <a href="/country-guides" onClick={(e) => { e.preventDefault(); onNavigate?.('guides'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">country hiring guides</a>.
          </p>
        </div>
      </section>

      <section id="role-examples" className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-5 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">Resume examples by role</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
            A sector sample shows the shape of a resume. These role pages show what a hiring manager in one
            occupation actually screens for: the responsibilities they expect you to have owned, the tools they
            look for, the qualifications that are genuinely required, and the experience level behind each
            application.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {ROLE_EXAMPLES.map((role) => (
            <li key={role.slug}>
              <a
                href={`/resume-examples/${role.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.(`role-example:${role.slug}`);
                }}
                className="flex items-center justify-between gap-3 px-4 py-3 min-h-11 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-800 hover:bg-blue-50/60 dark:hover:bg-blue-950/20 transition-colors"
              >
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{role.roleName}</span>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 shrink-0">View guide</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
