import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

interface FAQItem {
  q: string;
  category: 'Photos' | 'International Rules' | 'ATS & Formatting' | 'Privacy & Technical';
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'Why are photographs discouraged in the United States and United Kingdom, but expected in Germany and Japan?',
    category: 'Photos',
    a: 'In the US (under EEOC guidelines), Canada (Canadian Human Rights Act), the UK (Equality Act 2010), and Australia, employers avoid photos to prevent allegations of unconscious racial, gender, or age discrimination during preliminary screening. Many large US corporations have software that automatically discards resumes containing images. In contrast, in Germany, Austria, Switzerland, Japan, and the UAE, a formal professional headshot is deeply ingrained in commercial culture as a mark of professionalism and transparency.'
  },
  {
    q: 'What is the Polish RODO clause and why is it legally mandatory?',
    category: 'International Rules',
    a: 'Under the Polish implementation of the European General Data Protection Regulation (RODO / Dz. Ustaw z 2018, poz. 1000), recruitment teams are legally prohibited from processing, reviewing, or storing a candidate’s personal data without an explicit written consent clause. Submitting a CV to a Polish employer without this disclaimer will result in immediate disqualification by HR compliance officers.'
  },
  {
    q: 'What is the actual difference between a "Resume" and a "Curriculum Vitae" (CV)?',
    category: 'International Rules',
    a: 'Terminology varies by geography. In the United States and Canada, a "Resume" is a concise 1-page (maximum 2 pages for senior executives) summary of relevant skills, whereas a "CV" refers strictly to an exhaustive multi-page academic dossier. In the United Kingdom, Ireland, New Zealand, and South Africa, "CV" is the universal everyday term for what Americans call a resume. In Germany, it is termed "Lebenslauf", and in Japan "Rirekisho".'
  },
  {
    q: 'Should I use US Letter or International A4 paper format?',
    category: 'ATS & Formatting',
    a: 'If you are applying to companies in the United States, Canada, or the Philippines, format your document as US Letter (8.5 × 11 inches). For virtually all other countries worldwide (including the UK, European Union, Australia, Singapore, India, and the Middle East), International A4 (210 × 297 mm) is the mandatory standard. GlobeCareer automatically defaults to the correct paper size for your selected target country.'
  },
  {
    q: 'How long should an international resume be?',
    category: 'ATS & Formatting',
    a: 'In the US and Canada, 1 page is strictly preferred for anyone with under 8-10 years of experience. In the UK and Ireland, 2 pages is the standard norm (a 1-page CV is often viewed as sparse). In Australia, South Africa, and the Middle East, 2 to 3 pages with comprehensive project descriptions is customary. Academic and federal resumes (such as USAJOBS) are exceptions that routinely span 3 to 6 pages.'
  },
  {
    q: 'Does an ATS score guarantee that I will get an interview?',
    category: 'ATS & Formatting',
    a: 'No. No automated algorithm can guarantee an interview. Applicant Tracking Systems parse text and assist recruiters with initial filtering, but final screening is performed by human hiring managers evaluating cultural fit, portfolio depth, and team requirements. GlobeCareer ensures your document parses cleanly without formatting glitches.'
  },
  {
    q: 'Does GlobeCareer store or sell my private resume data?',
    category: 'Privacy & Technical',
    a: 'Never. GlobeCareer is built with a client-first, privacy-by-design architecture. All entered resume data, uploaded photographs, and generated files reside exclusively in your local browser’s LocalStorage and memory. We do not transmit your resume details to third-party data brokers or marketing services.'
  },
  {
    q: 'Can I export both PDF and Microsoft Word DOCX formats?',
    category: 'Privacy & Technical',
    a: 'Yes. GlobeCareer provides genuine vector PDF generation (with 100% selectable text, correct margins, and zero clipping) as well as genuine native Microsoft Word (.docx) file export via the official docx document packaging specification.'
  }
];

export const FAQPage: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const toggleIndex = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter(i => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  const categories = ['All', 'Photos', 'International Rules', 'ATS & Formatting', 'Privacy & Technical'];

  const filtered = FAQS.filter(faq => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = !search || faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Knowledge Base & International Legalities
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Clear answers to common questions regarding international photo customs, ATS parsers, GDPR/RODO legal requirements, and formatting standards.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeCategory === cat 
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900' 
                  : 'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className="border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    {faq.q}
                  </span>
                </div>
                <div className="shrink-0 text-neutral-500">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/60 pt-3">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
