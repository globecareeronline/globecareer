import React from 'react';
import {
  ArrowRight, BookOpen, CalendarDays, CheckCircle2, ChevronRight, Clock,
  FileText, Info, Lightbulb, AlertTriangle, Sparkles,
} from 'lucide-react';
import { ARTICLES, CLUSTER_LABELS, getArticle, getArticlePath, getRelatedArticles } from '../../data/articles';
import type { Article, ArticleCluster } from '../../data/articles';

interface NavigateProps {
  onNavigate: (page: string, countryId?: string) => void;
  onStartBuilder: () => void;
}

/** Internal link to a guide, routed through the app router without a page load. */
const ArticleLink: React.FC<{ slug: string; className?: string; children: React.ReactNode } & NavigateProps> = ({
  slug, className, children, onNavigate,
}) => (
  <a
    href={getArticlePath(slug)}
    onClick={(e) => {
      e.preventDefault();
      onNavigate(`article:${slug}`);
    }}
    className={className}
  >
    {children}
  </a>
);

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

const Callout: React.FC<{ tone: 'info' | 'warning' | 'tip'; title: string; body: string }> = ({ tone, title, body }) => {
  const styles = {
    info: { wrap: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900', icon: <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />, head: 'text-blue-900 dark:text-blue-200' },
    warning: { wrap: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900', icon: <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />, head: 'text-amber-900 dark:text-amber-200' },
    tip: { wrap: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900', icon: <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />, head: 'text-emerald-900 dark:text-emerald-200' },
  }[tone];

  return (
    <div className={`rounded-xl border p-4 sm:p-5 my-6 ${styles.wrap}`}>
      <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${styles.head}`}>
        {styles.icon}
        {title}
      </div>
      <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{body}</p>
    </div>
  );
};

const SectionRenderer: React.FC<{ section: Article['sections'][number] }> = ({ section }) => (
  <section id={section.id} className="scroll-mt-24">
    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mt-10 mb-3 tracking-tight">
      {section.heading}
    </h2>
    {section.paragraphs?.map((p, i) => (
      <p key={i} className="text-[15px] leading-7 text-neutral-700 dark:text-neutral-300 mb-4">{p}</p>
    ))}
    {section.bullets && (
      <ul className="space-y-2.5 my-4">
        {section.bullets.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-1.5" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )}
    {section.steps && (
      <ol className="space-y-3 my-4">
        {section.steps.map((item, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">
            <span className="shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-1">
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    )}
    {section.table && (
      <figure className="my-6 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-neutral-50 dark:bg-neutral-800/60">
            <tr>
              {section.table.headers.map((h) => (
                <th key={h} scope="col" className="px-3.5 py-2.5 font-bold text-neutral-900 dark:text-white text-xs uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.table.rows.map((row, i) => (
              <tr key={i} className="border-t border-neutral-200 dark:border-neutral-700 align-top">
                {row.map((cell, j) => (
                  <td key={j} className="px-3.5 py-2.5 text-neutral-700 dark:text-neutral-300 leading-6">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {section.table.caption && (
          <figcaption className="px-3.5 py-2 text-[11px] text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-800/40 border-t border-neutral-200 dark:border-neutral-700">
            {section.table.caption}
          </figcaption>
        )}
      </figure>
    )}
    {section.callout && <Callout tone={section.callout.tone || 'info'} title={section.callout.title} body={section.callout.body} />}
    {section.paragraphsAfter?.map((p, i) => (
      <p key={`after-${i}`} className="text-[15px] leading-7 text-neutral-700 dark:text-neutral-300 mb-4">{p}</p>
    ))}
  </section>
);

export const ArticlePage: React.FC<{ slug: string } & NavigateProps> = ({ slug, onNavigate, onStartBuilder }) => {
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <BookOpen className="w-10 h-10 text-neutral-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">That guide does not exist</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
            The article you were looking for is not published. The guide index lists everything that is.
          </p>
          <a
            href="/blog"
            onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Browse all guides <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  const related = getRelatedArticles(slug);
  const sectionsInOrder = article.sections;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">

        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            <li>
              <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-blue-600 dark:hover:text-blue-400">Home</a>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
            <li>
              <a href="/blog" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="hover:text-blue-600 dark:hover:text-blue-400">Guides</a>
            </li>
            <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
            <li className="text-neutral-700 dark:text-neutral-300 font-medium truncate max-w-[220px] sm:max-w-none">{article.h1}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-[11px] font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {CLUSTER_LABELS[article.cluster]}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight mb-4">
            {article.h1}
          </h1>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400 pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" /> Published {formatDate(article.published)}
            </span>
            {article.updated !== article.published && (
              <span className="inline-flex items-center gap-1.5">Updated {formatDate(article.updated)}</span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {article.readingMinutes} min read
            </span>
          </div>
        </header>

        {/* Intro */}
        {article.intro.map((p, i) => (
          <p key={i} className="text-[16px] leading-7 text-neutral-700 dark:text-neutral-300 mb-4">{p}</p>
        ))}

        {/* Key takeaways */}
        <aside className="mt-7 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/40 p-5">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Key takeaways
          </h2>
          <ul className="space-y-2">
            {article.keyTakeaways.map((point, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Body */}
        {sectionsInOrder.map((section) => <SectionRenderer key={section.id} section={section} />)}

        {/* Contextual CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-2">{article.cta.heading}</h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-5 max-w-xl">{article.cta.body}</p>
          <a
            href="/resume-builder"
            onClick={(e) => {
              e.preventDefault();
              onStartBuilder();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 hover:bg-neutral-100 font-bold rounded-xl shadow-lg transition-all hover:scale-[1.02] cursor-pointer text-sm"
          >
            {article.cta.label} <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* FAQs */}
        {article.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-5 tracking-tight">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {article.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/40 p-4"
                  open={i === 0}
                >
                  <summary className="cursor-pointer list-none font-semibold text-sm text-neutral-900 dark:text-white flex items-start justify-between gap-3">
                    <span>{faq.q}</span>
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-2.5 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Related guides
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((item) => (
                <ArticleLink
                  key={item.slug}
                  slug={item.slug}
                  onNavigate={onNavigate}
                  onStartBuilder={onStartBuilder}
                  className="group block p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800/40 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
                    {CLUSTER_LABELS[item.cluster]}
                  </div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.h1}
                  </div>
                </ArticleLink>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <a
            href="/blog"
            onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> All guides
          </a>
        </div>
      </div>
    </div>
  );
};

export const BlogIndexPage: React.FC<NavigateProps> = ({ onNavigate, onStartBuilder }) => {
  const clusters: ArticleCluster[] = ['european-cv', 'qualifications', 'applications'];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 pb-20">
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-900 to-neutral-900 text-white pt-14 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-5">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Career Guides
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Guides for applying across borders
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Plain explanations of European CV formats, qualification frameworks and application conventions — written
            for people applying outside the country where they studied.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-3">
        {clusters.map((cluster) => {
          const items = ARTICLES.filter((a) => a.cluster === cluster);
          if (!items.length) return null;
          return (
            <section key={cluster} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 px-1">
                {CLUSTER_LABELS[cluster]}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {items.map((item) => (
                  <ArticleLink
                    key={item.slug}
                    slug={item.slug}
                    onNavigate={onNavigate}
                    onStartBuilder={onStartBuilder}
                    className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors shadow-xs"
                  >
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.h1}
                    </h3>
                    <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-400 mb-3 flex-1">{item.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                      Read guide <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </ArticleLink>
                ))}
              </div>
            </section>
          );
        })}

        <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold mb-2">Ready to write the CV?</h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-5 max-w-xl mx-auto">
            Build an A4, ATS-friendly CV for any of 47 countries in minutes, free, with no watermark.
          </p>
          <a
            href="/resume-builder"
            onClick={(e) => {
              e.preventDefault();
              onStartBuilder();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 hover:bg-neutral-100 font-bold rounded-xl shadow-lg transition-all hover:scale-[1.02] cursor-pointer text-sm"
          >
            Open the CV builder <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
