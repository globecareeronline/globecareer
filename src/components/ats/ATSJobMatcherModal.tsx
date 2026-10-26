import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { analyzeResumeATS, ATSAnalysisResult } from '../../utils/atsScorer';
import { 
  X, CheckCircle, AlertCircle, AlertTriangle, 
  Sparkles, Search, FileText, ArrowRight 
} from 'lucide-react';

interface ATSJobMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
}

export const ATSJobMatcherModal: React.FC<ATSJobMatcherModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  if (!isOpen) return null;

  const result: ATSAnalysisResult = analyzeResumeATS(data, hasAnalyzed ? jobDescription : '');

  const handleRunAnalysis = () => {
    setHasAnalyzed(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200';
    return 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                ATS Compatibility & Keyword Scanner
              </h2>
              <p className="text-xs text-neutral-500">
                Real-time parsing checklist and semantic job description keyword matcher.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Score Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${getScoreColor(result.score)}`}>
              <span className="text-3xl font-extrabold font-mono tracking-tight">
                {result.score}<span className="text-lg font-normal text-neutral-400">/100</span>
              </span>
              <span className="text-xs font-semibold mt-1">
                ATS Compatibility Score
              </span>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-center">
              <span className="text-xs text-neutral-500">Quantified Impact</span>
              <span className="text-xl font-bold font-mono mt-1 text-neutral-900 dark:text-neutral-100">
                {result.metricsCount} Metrics Found
              </span>
              <span className="text-[11px] text-neutral-500 mt-0.5">
                (%, $, figures, headcount)
              </span>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex flex-col justify-center">
              <span className="text-xs text-neutral-500">Action Verbs</span>
              <span className="text-xl font-bold font-mono mt-1 text-neutral-900 dark:text-neutral-100">
                {result.actionVerbsFound.length} Detected
              </span>
              <span className="text-[11px] text-neutral-500 mt-0.5">
                Decisive leadership verbs
              </span>
            </div>
          </div>

          {/* Job Description Matching Input */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                Target Job Description Matcher (Optional)
              </label>
              {hasAnalyzed && (
                <span className="text-xs text-neutral-500">
                  {result.matchedKeywords.length} matched / {result.missingKeywords.length} missing
                </span>
              )}
            </div>
            <textarea
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste a job posting description here to extract keywords and verify your resume's keyword overlap..."
              className="w-full p-2.5 text-xs bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleRunAnalysis}
                disabled={!jobDescription.trim()}
                className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 transition-colors"
              >
                Scan Keywords
              </button>
            </div>

            {/* Keyword tags if analyzed */}
            {hasAnalyzed && (
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
                {result.matchedKeywords.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 block mb-1">
                      Matched Keywords in Your Resume:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.matchedKeywords.map(kw => (
                        <span key={kw} className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-800 rounded-md font-mono">
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {result.missingKeywords.length > 0 && (
                  <div>
                    <span className="text-[11px] font-bold text-amber-600 block mb-1">
                      Target Keywords Missing from Your Resume:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.missingKeywords.map(kw => (
                        <span key={kw} className="px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-md font-mono">
                          + {kw}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 italic">
                      Tip: If you have legitimate experience with these competencies, incorporate them naturally into your Summary or Experience bullet points.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Formats Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Format & Parsing Validation Checklist
            </h4>
            <div className="space-y-2">
              {result.items.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border flex items-start gap-3 ${
                    item.passed 
                      ? 'bg-neutral-50/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800' 
                      : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50'
                  }`}
                >
                  {item.passed ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : item.category === 'critical' ? (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  )}

                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">
                        {item.title}
                      </span>
                      <span className={`text-[10px] uppercase font-mono px-1.5 py-0.2 rounded ${
                        item.passed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {item.passed ? 'Passed' : 'Needs Review'}
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                      {item.message}
                    </p>
                    {item.suggestion && (
                      <p className="text-blue-600 dark:text-blue-400 mt-1 font-medium">
                        💡 Suggestion: {item.suggestion}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-[11px] text-neutral-500 leading-relaxed">
            <strong>Important Transparency Notice:</strong> This automated ATS analysis evaluates syntax readability, standard headings, and common parser heuristics (such as Workday, Taleo, Greenhouse, and Lever). An ATS score does not guarantee employment or recruiter selection, as human hiring managers make final decisions.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Close Scanner
          </button>
        </div>
      </div>
    </div>
  );
};
