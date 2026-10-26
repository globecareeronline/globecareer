import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { analyzeResumeATS, ATSAnalysisResult, ATSCheckItem } from '../../utils/atsScorer';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileText,
  Search,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Copy,
  Check,
  Briefcase,
  HelpCircle
} from 'lucide-react';

interface ATSCheckerPageProps {
  resumeData: ResumeData;
  onNavigateToBuilder: () => void;
}

export const ATSCheckerPage: React.FC<ATSCheckerPageProps> = ({
  resumeData,
  onNavigateToBuilder
}) => {
  const [jobDescription, setJobDescription] = useState('');
  const [customResumeText, setCustomResumeText] = useState('');
  const [useActiveResume, setUseActiveResume] = useState(true);
  const [hasScanned, setHasScanned] = useState(false);
  const [copiedMissing, setCopiedMissing] = useState(false);

  // If using active resume, build full text representation for extra keyword checking
  const activeResumeSummary = useActiveResume
    ? `${resumeData.personal.fullName} ${resumeData.personal.jobTitle} ${resumeData.summary} ${resumeData.experience.map(e => `${e.jobTitle} ${e.company} ${e.description.join(' ')}`).join(' ')} ${resumeData.skills.map(s => s.name).join(' ')}`
    : customResumeText;

  // Analysis result using existing verified scorer
  const analysis: ATSAnalysisResult = analyzeResumeATS(
    resumeData,
    hasScanned ? jobDescription : ''
  );

  // Also do direct text-to-JD keyword overlap for deeper analysis
  const jdKeywords = React.useMemo(() => {
    if (!jobDescription.trim()) return [];
    const words = jobDescription.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const stopWords = new Set([
      'and', 'the', 'for', 'with', 'from', 'that', 'this', 'have', 'will',
      'your', 'about', 'must', 'should', 'more', 'their', 'work', 'team',
      'years', 'skills', 'experience', 'ability', 'required', 'preferred'
    ]);
    const wordCounts: Record<string, number> = {};
    for (const w of words) {
      if (!stopWords.has(w) && w.length >= 3) {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
      }
    }
    return Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 25)
      .map(([word]) => word);
  }, [jobDescription]);

  const resumeLower = activeResumeSummary.toLowerCase();
  const matchedJdKeywords = jdKeywords.filter(k => resumeLower.includes(k));
  const missingJdKeywords = jdKeywords.filter(k => !resumeLower.includes(k));

  const handleScan = () => {
    setHasScanned(true);
  };

  const handleCopyMissing = async () => {
    if (missingJdKeywords.length === 0) return;
    try {
      await navigator.clipboard.writeText(missingJdKeywords.join(', '));
      setCopiedMissing(true);
      setTimeout(() => setCopiedMissing(false), 2000);
    } catch (e) {}
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800';
    if (score >= 60) return 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800';
    return 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
          <Search className="w-3.5 h-3.5" />
          <span>Transparent Applicant Tracking System Diagnostic</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          ATS Resume Checker & Keyword Matcher
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Evaluate how applicant tracking systems parse your resume. Compare your qualifications against target job descriptions, discover missing industry keywords, and fix formatting traps before applying.
        </p>
      </div>

      {/* Input Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Job Description & Source Resume (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                1. Resume Data Source
              </span>
              <button
                type="button"
                onClick={onNavigateToBuilder}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Edit in Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Toggle Active Resume vs Custom Text */}
            <div className="p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center gap-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setUseActiveResume(true)}
                className={`flex-1 py-1.5 px-3 rounded-lg transition-colors cursor-pointer text-center ${
                  useActiveResume
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Active Resume ({resumeData.personal.fullName || 'Current Draft'})
              </button>
              <button
                type="button"
                onClick={() => setUseActiveResume(false)}
                className={`flex-1 py-1.5 px-3 rounded-lg transition-colors cursor-pointer text-center ${
                  !useActiveResume
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Paste Custom Text
              </button>
            </div>

            {useActiveResume ? (
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs space-y-2">
                <div className="font-bold text-neutral-900 dark:text-neutral-100">
                  {resumeData.personal.fullName || 'Untitled Candidate'} · {resumeData.personal.jobTitle || 'No Title'}
                </div>
                <div className="text-[11px] text-neutral-500">
                  Location: {resumeData.personal.city}, {resumeData.personal.country} · Sections: {resumeData.experience.length} experiences, {resumeData.education.length} degrees, {resumeData.skills.length} skills listed.
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Paste Resume Content (Plain Text)
                </label>
                <textarea
                  rows={6}
                  value={customResumeText}
                  onChange={(e) => setCustomResumeText(e.target.value)}
                  placeholder="Paste your full resume text here to analyze..."
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                2. Target Job Description
              </label>
              <textarea
                rows={8}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description (responsibilities, required qualifications, tech stack) to generate keyword match analysis..."
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            <button
              type="button"
              onClick={handleScan}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Run ATS Match & Diagnostic</span>
            </button>
          </div>
        </div>

        {/* Right Column: Diagnostic & Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Score Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-5 rounded-2xl border flex flex-col items-center justify-center text-center shadow-xs ${getScoreColor(analysis.score)}`}>
              <span className="text-4xl font-extrabold font-mono tracking-tight">
                {analysis.score}<span className="text-xl font-normal text-neutral-400">/100</span>
              </span>
              <span className="text-xs font-semibold mt-1">
                ATS Compatibility Score
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-center shadow-xs">
              <span className="text-xs text-neutral-500 font-semibold">Quantified Metrics</span>
              <span className="text-2xl font-bold font-mono mt-1 text-neutral-900 dark:text-neutral-100">
                {analysis.metricsCount} Detected
              </span>
              <span className="text-[11px] text-neutral-400 mt-0.5">
                (%, $, figures, headcount)
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-center shadow-xs">
              <span className="text-xs text-neutral-500 font-semibold">Action Power Verbs</span>
              <span className="text-2xl font-bold font-mono mt-1 text-neutral-900 dark:text-neutral-100">
                {analysis.actionVerbsFound.length} Found
              </span>
              <span className="text-[11px] text-neutral-400 mt-0.5">
                Leadership verbs
              </span>
            </div>
          </div>

          {/* Keyword Comparison Card (When JD is provided) */}
          {hasScanned && jdKeywords.length > 0 && (
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Target Job Description Keywords
                </span>
                <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">
                  {matchedJdKeywords.length}/{jdKeywords.length} Matched ({Math.round((matchedJdKeywords.length / jdKeywords.length) * 100)}%)
                </span>
              </div>

              {/* Matched Keywords */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Matched Keywords ({matchedJdKeywords.length})</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchedJdKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-medium"
                    >
                      ✓ {kw}
                    </span>
                  ))}
                  {matchedJdKeywords.length === 0 && (
                    <span className="text-xs text-neutral-400 italic">No direct keyword overlap found yet.</span>
                  )}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Missing Job Keywords ({missingJdKeywords.length})</span>
                  </div>
                  {missingJdKeywords.length > 0 && (
                    <button
                      type="button"
                      onClick={handleCopyMissing}
                      className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedMissing ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedMissing ? 'Copied' : 'Copy Missing'}</span>
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missingJdKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg text-xs font-medium"
                    >
                      + {kw}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 pt-1">
                  Review your actual achievements and add relevant missing keywords naturally into your Work Experience bullet points.
                </p>
              </div>
            </div>
          )}

          {/* Detailed Structural & Formatting Checks */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                Structural & Formatting Diagnostics
              </span>
              <span className="text-xs text-neutral-400">
                {analysis.items.filter(i => i.passed).length}/{analysis.items.length} checks passed
              </span>
            </div>

            <div className="space-y-3">
              {analysis.items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
                    item.passed
                      ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40'
                      : item.category === 'critical'
                        ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50'
                        : 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {item.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : item.category === 'critical' ? (
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    )}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">
                        {item.title}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                        item.passed
                          ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950'
                          : item.category === 'critical'
                            ? 'text-rose-700 bg-rose-100 dark:bg-rose-950'
                            : 'text-amber-700 bg-amber-100 dark:bg-amber-950'
                      }`}>
                        {item.passed ? 'Passed' : item.category}
                      </span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.message}
                    </p>
                    {item.suggestion && (
                      <div className="text-[11px] text-blue-600 dark:text-blue-400 pt-0.5">
                        <strong>Action:</strong> {item.suggestion}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ethics & Guarantee Notice */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-xs space-y-1.5 text-neutral-600 dark:text-neutral-400">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              ATS Scoring Transparency Notice
            </span>
            <p className="text-[11px] leading-relaxed">
              No software can honestly guarantee that a resume will achieve an interview or bypass internal recruiter filters. ATS platforms (Workday, Taleo, Greenhouse) are configured uniquely by every employer with proprietary knockout questions. GlobeCareer verifies that your document utilizes clean single-column UTF-8 vectors, correct country photo conventions, and high-relevance semantic keywords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
