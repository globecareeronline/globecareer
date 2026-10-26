import React, { useState } from 'react';
import { JOB_CATEGORIES, JobCategoryConfig } from '../../data/jobCategories';
import { 
  Briefcase, CheckCircle2, Sparkles, ArrowRight, 
  Search, Code, LineChart, Wrench, Stethoscope, GraduationCap 
} from 'lucide-react';

interface JobExamplesPageProps {
  onSelectCategory: (categoryId: string) => void;
}

export const JobExamplesPage: React.FC<JobExamplesPageProps> = ({ onSelectCategory }) => {
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
    </div>
  );
};
