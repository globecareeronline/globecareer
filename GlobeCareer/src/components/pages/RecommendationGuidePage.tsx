import React from 'react';
import {
  FileText,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  HelpCircle,
  Sparkles,
  BookOpen,
  GraduationCap,
  Briefcase,
  Layers
} from 'lucide-react';

export const RecommendationGuidePage: React.FC<{
  onStartBuilder: () => void;
  onNavigateToTemplates?: () => void;
}> = ({ onStartBuilder, onNavigateToTemplates }) => {
  const faqs = [
    {
      q: 'What is the ideal length for a professional recommendation letter?',
      a: 'A standard professional recommendation letter should be exactly 1 page (between 300 and 450 words), divided into 3 to 4 clear paragraphs: context of relationship, 1–2 quantifiable achievements or technical strengths, character endorsement, and formal contact information.'
    },
    {
      q: 'How does an academic recommendation differ from an employment reference?',
      a: 'Academic letters emphasize research rigor, intellectual curiosity, seminar participation, and scholastic potential for Master\'s or PhD programs. Employment references focus on quantifiable business outcomes, team velocity, leadership under pressure, and technical execution.'
    },
    {
      q: 'Should a candidate draft their own recommendation letter for a manager to sign?',
      a: 'It is common corporate practice for a busy manager or professor to ask the candidate to provide a structured draft. Our free Recommendation Letter Builder allows candidates or recommenders to generate a polished, ethical first draft highlighting verified milestones.'
    },
    {
      q: 'What are the essential elements of an effective reference letter?',
      a: 'Essential components include: formal letterhead or contact details, specific dates and duration of relationship, exact job titles, 2 concrete examples of problem-solving with metrics, and an unequivocal closing statement of endorsement.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Authoritative Career Resource</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          How to Write a Recommendation Letter: Format, Examples &amp; Free Templates
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Master the structure, professional tone, and core components required for high-impact employment reference letters, graduate school admissions endorsements, and character references.
        </p>
      </div>

      {/* Quick Action Hero Box */}
      <div className="p-6 sm:p-8 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Free Document Builder
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Need to generate a formal recommendation letter right now?
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed">
            Use our 100% free Recommendation Letter Builder to create structured employment, graduate school, and leadership references in under 2 minutes.
          </p>
        </div>
        <button
          type="button"
          onClick={onStartBuilder}
          className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Open Recommendation Builder</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Guide Content Sections */}
      <div className="space-y-10 text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed">
        
        {/* Section 1: 4-Part Structure */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            The 4-Part Anatomy of an Effective Recommendation
          </h2>
          <p>
            Hiring managers, executive search committees, and university admissions officers review hundreds of recommendation letters. Letters that succeed follow a disciplined, four-part structural formula:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                1. Salutation &amp; Relationship Context
              </span>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                State the candidate’s name, target role or degree, the recommender’s authority, and the exact capacity and duration in which you worked together (e.g. "having supervised Alex as Engineering Lead for over four years").
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                2. Quantifiable Execution &amp; Core Strengths
              </span>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Highlight 2–3 concrete technical competencies illustrated through a real project. Include specific metrics, such as latency reductions, cost savings, or customer retention improvements.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                3. Character &amp; Cultural Impact
              </span>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Describe how the candidate elevates their peers. Focus on intellectual honesty, team mentorship, communication clarity under pressure, and dependability.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                4. Unequivocal Endorsement &amp; Contact Info
              </span>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Close with an unequivocal endorsement statement (e.g. "I recommend Alex with complete confidence and without reservation") and provide your direct email address and title.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Common Pitfalls */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            Common Recommendation Letter Mistakes to Avoid
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-900/60 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 dark:text-neutral-100">Vague Flattery Without Concrete Evidence:</strong> Claims like "he is a great worker" lack credibility. Replace generic praise with quantifiable results and project context.
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-900/60 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 dark:text-neutral-100">Overstating Recommender Familiarity:</strong> Recommenders should only speak to the skills they directly observed. Speculating about unverified capabilities weakens the letter's authenticity.
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-neutral-50 dark:bg-neutral-900/60 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 dark:text-neutral-100">Exceeding One Page:</strong> Multi-page recommendation letters dilute impact. Busy recruiters and admissions directors prioritize brevity and density.
              </div>
            </li>
          </ul>
        </section>

        {/* Section 3: FAQs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5"
              >
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  {faq.q}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="p-8 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">
              Ready to generate your professional recommendation letter?
            </h3>
            <p className="text-xs text-neutral-300 dark:text-neutral-600">
              Choose from pre-calibrated employment, academic, and executive templates. 100% free.
            </p>
          </div>
          <button
            type="button"
            onClick={onStartBuilder}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-sm"
          >
            Launch Builder Now
          </button>
        </div>

      </div>
    </div>
  );
};
