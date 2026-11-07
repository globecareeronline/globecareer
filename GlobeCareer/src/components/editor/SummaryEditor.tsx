import React from 'react';
import { ResumeData } from '../../types/resume';
import { getJobCategoryById } from '../../data/jobCategories';
import { Sparkles, FileText, Check } from 'lucide-react';

interface SummaryEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const SummaryEditor: React.FC<SummaryEditorProps> = ({ data, onChange }) => {
  const category = getJobCategoryById(data.targetJobCategory);
  const wordCount = data.summary ? data.summary.trim().split(/\s+/).filter(Boolean).length : 0;
  const isOptimal = wordCount >= 30 && wordCount <= 85;

  const handleUpdate = (val: string) => {
    onChange({
      ...data,
      summary: val
    });
  };

  const applyCategorySample = () => {
    handleUpdate(category.sampleSummary);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Professional Summary
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            A concise 3-4 sentence elevator pitch highlighting your title, key competencies, and measurable impact.
          </p>
        </div>
        <div className="text-right">
          <span className={`text-xs font-mono font-medium ${isOptimal ? 'text-emerald-600' : 'text-neutral-400'}`}>
            {wordCount} words {isOptimal ? '(Optimal)' : '(Aim for 30–80)'}
          </span>
        </div>
      </div>

      <div className="relative">
        <textarea
          rows={6}
          value={data.summary || ''}
          onChange={(e) => handleUpdate(e.target.value)}
          placeholder="e.g. Senior Software Engineer with 7+ years of experience designing scalable distributed backend systems..."
          className="w-full p-3.5 text-sm bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 leading-relaxed"
        />
      </div>

      {/* Suggested Summary for Job Category */}
      <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 dark:text-neutral-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Verified Example for {category.name}
          </div>
          <button
            type="button"
            onClick={applyCategorySample}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
          >
            <Check className="w-3 h-3" />
            Use This Example
          </button>
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 italic leading-relaxed">
          "{category.sampleSummary}"
        </p>
      </div>
    </div>
  );
};
