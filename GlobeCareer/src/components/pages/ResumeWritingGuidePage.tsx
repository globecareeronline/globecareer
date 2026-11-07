import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, XCircle, BookOpen } from 'lucide-react';

interface ResumeWritingGuidePageProps {
  onStartBuilder: () => void;
  onNavigate?: (page: string) => void;
}

export const ResumeWritingGuidePage: React.FC<ResumeWritingGuidePageProps> = ({ onStartBuilder, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Editorial Standards & International Strategy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          International Resume Writing Guide
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Crafting a compelling resume requires moving past passive job descriptions and presenting concrete evidence of your professional value. Learn the formulas used by top international candidates.
        </p>
      </div>

      {/* The Google XYZ Formula */}
      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
          <Sparkles className="w-4 h-4" />
          The Gold Standard Achievement Formula
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          The XYZ Formula: "Accomplished [X], as measured by [Y], by doing [Z]"
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Pioneered by former Google SVP of People Operations Laszlo Bock, this structure ensures every bullet point proves your tangible business impact rather than listing ordinary duties.
        </p>

        {/* Before / After Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-400">
              <XCircle className="w-4 h-4" />
              Weak (Duty-Oriented):
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 italic">
              "Responsible for managing cloud servers and fixing performance issues in the system."
            </p>
            <p className="text-[11px] text-neutral-500">
              States a duty, but gives zero evidence of scale, methodology, or business outcome.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              Strong (XYZ Impact Formula):
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 font-medium">
              "Decreased average API response latency by 42% across 14 million daily requests by implementing multi-region Redis cache clustering and optimizing PostgreSQL database queries."
            </p>
            <p className="text-[11px] text-neutral-500">
              States outcome [X] (42% latency cut), metric [Y] (14M daily requests), method [Z] (Redis & SQL tuning).
            </p>
          </div>
        </div>

        {/* Contextual Link Callout to Bullet Point Generator */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-blue-900 dark:text-blue-200 block">Want to automate this formula?</span>
            <p className="text-neutral-600 dark:text-neutral-300">
              Use our interactive <a href="/resume-bullet-generator" onClick={(e) => { e.preventDefault(); onNavigate?.('resume-bullet-generator'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">Resume Bullet Point Generator</a> to transform your tasks into quantifiable achievements across 8 industries.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate?.('resume-bullet-generator')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow-xs shrink-0"
          >
            Launch Bullet Generator
          </button>
        </div>
      </div>

      {/* Action Verb Bank */}
      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          Executive Action Verb Directory
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          Begin every bullet point with a decisive action verb. Avoid weak phrases like "Assisted with" or "Helped to".
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 border-b pb-1">
              Leadership & Strategy
            </h4>
            <div className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-400 font-medium">
              <span>• Spearheaded</span>
              <span>• Orchestrated</span>
              <span>• Championed</span>
              <span>• Directed</span>
              <span>• Steered</span>
              <span>• Mentored</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 border-b pb-1">
              Engineering & Building
            </h4>
            <div className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-400 font-medium">
              <span>• Architected</span>
              <span>• Engineered</span>
              <span>• Deployed</span>
              <span>• Automated</span>
              <span>• Migrated</span>
              <span>• Overhauled</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 border-b pb-1">
              Optimization & Growth
            </h4>
            <div className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-400 font-medium">
              <span>• Accelerated</span>
              <span>• Scaled</span>
              <span>• Maximized</span>
              <span>• Streamlined</span>
              <span>• Standardized</span>
              <span>• Eliminated</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 border-b pb-1">
              Research & Analysis
            </h4>
            <div className="flex flex-col gap-1 text-neutral-600 dark:text-neutral-400 font-medium">
              <span>• Formulated</span>
              <span>• Evaluated</span>
              <span>• Forecasted</span>
              <span>• Benchmarked</span>
              <span>• Audited</span>
              <span>• Validated</span>
            </div>
          </div>
        </div>
      </div>

      {/* International Relocation Advice */}
      <div className="p-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
          Applying Across Borders: The Relocation Rule
        </h3>
        <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
          When applying for positions outside your home country, ambiguity about your work eligibility is the #1 reason international applications are immediately discarded. Always state your exact legal status right in your contact header:
        </p>
        <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
          <div>• <strong>If you hold citizenship or permanent residency:</strong> State it explicitly (e.g., <em>"Status: US Citizen"</em> or <em>"Right to work in UK without visa sponsorship"</em>).</div>
          <div>• <strong>If you need sponsorship:</strong> State your target visa (e.g., <em>"Seeking UK Skilled Worker Visa"</em> or <em>"Eligible for EU Blue Card"</em>). Recruiters respect transparent candidates.</div>
          <div>• <strong>State your relocation availability:</strong> e.g., <em>"Available to relocate within 30 days."</em></div>
        </div>
      </div>

      {/* Cross-Link Tools & Free Template Libraries */}
      <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-4 shadow-xs">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
          Related Free Career Tools &amp; Libraries
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onNavigate?.('summary-templates')}
            className="p-4 text-left bg-neutral-50 dark:bg-neutral-950 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Summary &amp; Objectives</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              18+ ATS-tested professional summaries and career objectives.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('bio-templates')}
            className="p-4 text-left bg-neutral-50 dark:bg-neutral-950 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Bio Templates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              15+ professional biographies in first and third-person POV.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('reverse-chronological')}
            className="p-4 text-left bg-white dark:bg-neutral-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Reverse Chronological Format</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Master the layout structure preferred by 95% of international hiring teams.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('resume-skills')}
            className="p-4 text-left bg-white dark:bg-neutral-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Top Skills for Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Browse vetted hard &amp; soft skills categorized across 6 primary industries.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('references-on-resume')}
            className="p-4 text-left bg-white dark:bg-neutral-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>References on Resume Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Why references should never be on the resume &amp; how to format a reference sheet.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('resume-word-counter')}
            className="p-4 text-left bg-white dark:bg-neutral-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Resume Word Counter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              Check action verb density, reading time, and 1-page vs 2-page fit.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.('templates')}
            className="p-4 text-left bg-white dark:bg-neutral-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 rounded-2xl transition-all cursor-pointer group shadow-2xs"
          >
            <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
              <span>Resume Templates (40 Countries)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">
              International photo CV and single-column ATS layouts.
            </p>
          </button>
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onStartBuilder}
          className="px-8 py-3.5 text-xs font-bold uppercase tracking-wider bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 shadow-md transition-colors inline-flex items-center gap-2"
        >
          Put These Principles into Practice in Builder
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
