import React from 'react';
import { getRoleExample, ROLE_EXAMPLES } from '../../data/roleExamples';
import { JOB_CATEGORIES } from '../../data/jobCategories';
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  FileText,
  HelpCircle,
  ListChecks,
  Sparkles,
  Target,
  Wrench,
} from 'lucide-react';

interface RoleResumeExamplesPageProps {
  roleSlug: string;
  onNavigate?: (page: string, countryId?: string) => void;
  onSelectCategory?: (categoryId: string) => void;
}

const linkClass =
  'text-blue-600 dark:text-blue-400 font-semibold underline decoration-blue-300 dark:decoration-blue-700 underline-offset-2 hover:text-blue-700 dark:hover:text-blue-300';

export const RoleResumeExamplesPage: React.FC<RoleResumeExamplesPageProps> = ({
  roleSlug,
  onNavigate,
  onSelectCategory,
}) => {
  const role = getRoleExample(roleSlug);

  if (!role) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-4 text-center">
        <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100">
          Role example not found
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          We do not have a resume guide for that role yet. Browse the role library instead.
        </p>
        <a
          href="/resume-examples"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.('job-examples');
          }}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400"
        >
          All resume examples <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  const category = JOB_CATEGORIES.find((c) => c.id === role.categoryId);
  const relatedRoles = role.related
    .map((slug) => ROLE_EXAMPLES.find((r) => r.slug === slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb (mirrors the BreadcrumbList structured data) */}
      <nav aria-label="Breadcrumb" className="text-xs text-neutral-500 dark:text-neutral-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('home');
              }}
              className="hover:text-blue-600 hover:underline"
            >
              Home
            </a>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3 h-3" />
          </li>
          <li>
            <a
              href="/resume-examples"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('job-examples');
              }}
              className="hover:text-blue-600 hover:underline"
            >
              Resume Examples
            </a>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3 h-3" />
          </li>
          <li aria-current="page" className="font-semibold text-neutral-700 dark:text-neutral-300">
            {role.roleName}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Role-Specific Resume Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {role.h1}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" /> {role.roleName}
          </span>
          {category && (
            <span className="inline-flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" /> Industry data: {category.name}
            </span>
          )}
        </div>
        {role.intro.map((paragraph, i) => (
          <p
            key={i}
            className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-4xl"
          >
            {paragraph}
          </p>
        ))}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">Also called:</span>
          {role.alsoCalled.map((title) => (
            <span
              key={title}
              className="px-2 py-1 text-[11px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg"
            >
              {title}
            </span>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          {/* Responsibilities */}
          <section className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              What a {role.roleName} is actually responsible for
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              {role.responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Skills */}
          <section className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Skills and tools to name on the resume
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
                <span className="font-bold text-neutral-800 dark:text-neutral-200 block">Core competencies</span>
                <div className="flex flex-wrap gap-1">
                  {role.skills.core.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
                <span className="font-bold text-neutral-800 dark:text-neutral-200 block flex items-center gap-1">
                  <Wrench className="w-3 h-3" /> Systems &amp; tools
                </span>
                <div className="flex flex-wrap gap-1">
                  {role.skills.tools.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
                <span className="font-bold text-neutral-800 dark:text-neutral-200 block">Ways of working</span>
                <div className="flex flex-wrap gap-1">
                  {role.skills.soft.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Experience expectations */}
          <section className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              What each experience level is expected to show
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <thead className="bg-neutral-100 dark:bg-neutral-800 text-left">
                  <tr>
                    <th scope="col" className="p-2.5 font-bold whitespace-nowrap">Level</th>
                    <th scope="col" className="p-2.5 font-bold">Evidence the reader looks for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {role.experience.map((row) => (
                    <tr key={row.level}>
                      <td className="p-2.5 font-semibold whitespace-nowrap align-top">{row.level}</td>
                      <td className="p-2.5 leading-relaxed">{row.expectation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Resume tips */}
          <section className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Five changes that make this resume stronger
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {role.resumeTips.map((tip, index) => (
                <div
                  key={tip.title}
                  className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-1.5"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-mono text-[10px] shrink-0">
                      {index + 1}
                    </span>
                    {tip.title}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{tip.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Example bullets from the app's own industry data */}
          {category && (
            <section className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Example achievement lines for this role family
                </h2>
                <p className="text-xs text-neutral-500">
                  Drawn from the {category.name} keyword repository in this site&apos;s resume builder, so the phrasing matches
                  what the builder will suggest for the same industry.
                </p>
              </div>
              <div className="space-y-2.5">
                {category.sampleBulletPoints.map((bullet, idx) => (
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
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                These are templates, not your history. Keep the structure — action, system, measurable result — and replace every
                number and technology with what you actually did.
              </p>
            </section>
          )}

          {/* FAQs */}
          <section className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-3">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" /> Frequently asked questions
            </h2>
            <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {role.faqs.map((faq) => (
                <details key={faq.q} className="py-3 group">
                  <summary className="cursor-pointer text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 list-none flex items-start justify-between gap-3">
                    <span>{faq.q}</span>
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 transition-transform group-open:rotate-90 text-neutral-400" />
                  </summary>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
          <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Build this resume</h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Start from a country preset so paper size, photo rules and section order are correct, then paste your own history.
            </p>
            <a
              href="/resume-builder"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory?.(role.categoryId);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-xl text-xs font-bold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Open the resume builder
            </a>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="/templates"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('templates');
                }}
                className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 font-semibold text-center hover:border-blue-400"
              >
                Templates
              </a>
              <a
                href="/ats-checker"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('ats-checker');
                }}
                className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 font-semibold text-center hover:border-blue-400"
              >
                ATS checker
              </a>
              <a
                href="/resume-word-counter"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('resume-word-counter');
                }}
                className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 font-semibold text-center hover:border-blue-400"
              >
                Word counter
              </a>
              <a
                href="/cover-letter-builder"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate?.('cover-letter');
                }}
                className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 font-semibold text-center hover:border-blue-400"
              >
                Cover letter
              </a>
            </div>
          </div>

          <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <ListChecks className="w-3.5 h-3.5" /> Screening keywords
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {role.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2.5 py-1 text-[11px] bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg font-mono"
                >
                  #{kw}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Use a keyword only where it is true of your experience. Repeating a term you cannot evidence fails the first
              screening call.
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Qualifications checklist
            </h2>
            <ul className="space-y-2 text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {role.qualifications.map((q) => (
                <li key={q} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Related role guides</h2>
            <ul className="space-y-1.5 text-xs">
              {relatedRoles.map((r) => (
                <li key={r.slug}>
                  <a
                    href={`/resume-examples/${r.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate?.(`role-example:${r.slug}`);
                    }}
                    className={`${linkClass} inline-flex items-center min-h-6 py-1`}
                  >
                    {r.roleName}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume-examples"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.('job-examples');
                  }}
                  className={`${linkClass} inline-flex items-center min-h-6 py-1`}
                >
                  All resume examples
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Closing guidance + internal links */}
      <section className="p-6 sm:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 rounded-3xl space-y-3">
        <h2 className="text-base font-bold text-blue-900 dark:text-blue-200">
          Applying outside your home country?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Local conventions differ on length, photo, date of birth and even the name of the document. Check the{' '}
          <a
            href="/country-guides"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.('guides');
            }}
            className="text-blue-700 dark:text-blue-300 font-bold underline"
          >
            country hiring guides
          </a>{' '}
          before exporting, compare the{' '}
          <a
            href="/european-cv-format"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.('european-cv-format');
            }}
            className="text-blue-700 dark:text-blue-300 font-bold underline"
          >
            European CV format
          </a>{' '}
          with a US resume, and read the{' '}
          <a
            href="/resume-writing-guide"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.('writing-guide');
            }}
            className="text-blue-700 dark:text-blue-300 font-bold underline"
          >
            resume writing guide
          </a>{' '}
          for length and section order.
        </p>
      </section>
    </div>
  );
};
