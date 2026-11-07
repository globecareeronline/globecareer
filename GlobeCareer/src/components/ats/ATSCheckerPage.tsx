import React, { useState, useMemo } from 'react';
import { ResumeData } from '../../types/resume';
import { runGenuineATSAnalysis, RealATSAnalysis, SAMPLE_JOB_BENCHMARKS } from '../../utils/realAtsEngine';
import { COUNTRIES, getCountryById } from '../../data/countries';
import { useTranslation } from '../../context/LanguageContext';
import {
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileText,
  Copy,
  Check,
  Briefcase,
  ArrowRight,
  RotateCcw,
  Upload,
  Globe,
  Sliders,
  Award,
  Zap,
  Info
} from 'lucide-react';

interface ATSCheckerPageProps {
  resumeData: ResumeData;
  onNavigateToBuilder: () => void;
  onNavigate?: (page: string) => void;
}

export const ATSCheckerPage: React.FC<ATSCheckerPageProps> = ({
  resumeData,
  onNavigateToBuilder,
  onNavigate
}) => {
  const { t } = useTranslation();
  const [sourceType, setSourceType] = useState<'active' | 'paste'>('active');
  const [customText, setCustomText] = useState('');
  const [jobDescription, setJobDescription] = useState(SAMPLE_JOB_BENCHMARKS[0].description);
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('software-engineer');
  const [selectedCountryId, setSelectedCountryId] = useState<string>(resumeData.targetCountryId || 'us');
  const [hasScanned, setHasScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [copiedMissing, setCopiedMissing] = useState(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);

  // Resume content depending on active source
  const currentResumeContent = sourceType === 'active' ? resumeData : customText;

  // Run real analysis
  const analysis: RealATSAnalysis = useMemo(() => {
    return runGenuineATSAnalysis(currentResumeContent, jobDescription, selectedCountryId);
  }, [currentResumeContent, jobDescription, selectedCountryId]);

  const handleSelectBenchmark = (benchmark: typeof SAMPLE_JOB_BENCHMARKS[0]) => {
    setSelectedBenchmarkId(benchmark.id);
    setJobDescription(benchmark.description);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        setCustomText(text);
        setSourceType('paste');
      }
    };
    reader.readAsText(file);
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 400);
  };

  const handleCopyMissingKeywords = async () => {
    const allMissing = [...analysis.missingHardSkills, ...analysis.missingJdKeywords];
    if (allMissing.length === 0) return;
    try {
      await navigator.clipboard.writeText(allMissing.join(', '));
      setCopiedMissing(true);
      setTimeout(() => setCopiedMissing(false), 2000);
    } catch (e) {}
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 dark:text-emerald-400 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400 border-blue-500 bg-blue-50 dark:bg-blue-950/40';
    if (score >= 50) return 'text-amber-600 dark:text-amber-400 border-amber-500 bg-amber-50 dark:bg-amber-950/40';
    return 'text-rose-600 dark:text-rose-400 border-rose-500 bg-rose-50 dark:bg-rose-950/40';
  };

  const getPillarBadge = (status: 'excellent' | 'good' | 'needs-work' | 'critical') => {
    switch (status) {
      case 'excellent':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">Excellent</span>;
      case 'good':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">Good</span>;
      case 'needs-work':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">Needs Work</span>;
      case 'critical':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">Critical</span>;
    }
  };

  const country = getCountryById(selectedCountryId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
          <Search className="w-3.5 h-3.5" />
          <span>{t('ats.title', 'Enterprise ATS Diagnostic & Keyword Matcher')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {t('ats.subtitle', 'Real ATS Resume Scoring & Alignment Engine')}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
          {t('ats.description', 'Evaluate your resume against real job requirements with zero fabricated scores. Inspect keyword coverage, technical skills, quantified impact, section parsability, and country-specific anti-bias compliance.')}
        </p>
      </div>

      {/* Input Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Resume Input */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                1. Select Resume Source
              </h2>
            </div>
            {/* Country Selector */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <Globe className="w-3.5 h-3.5" />
              <select
                value={selectedCountryId}
                onChange={(e) => setSelectedCountryId(e.target.value)}
                className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-2 py-1 text-xs font-medium text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {COUNTRIES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Toggle between Active Resume and Custom Text */}
          <div className="flex rounded-xl bg-neutral-100 dark:bg-neutral-800 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSourceType('active')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all ${
                sourceType === 'active'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              Active Builder Draft ({resumeData.personal.fullName || 'Draft'})
            </button>
            <button
              type="button"
              onClick={() => setSourceType('paste')}
              className={`flex-1 py-2 px-3 rounded-lg transition-all ${
                sourceType === 'paste'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              Paste / Upload Custom CV
            </button>
          </div>

          {sourceType === 'active' ? (
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                  {resumeData.personal.fullName || 'Untitled Candidate'}
                </span>
                <span className="text-neutral-500">
                  {resumeData.personal.jobTitle || 'No target job title'}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">Experience</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-200">{resumeData.experience?.length || 0} roles</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">Skills</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-200">{resumeData.skills?.length || 0} items</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">Education</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-200">{resumeData.education?.length || 0} entries</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">Target Market</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-200">{country.name}</span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 pt-1">
                Using current live data from your Resume Builder session. Any modifications you make in the builder will be evaluated in real time.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Paste resume text or upload document
                </label>
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadFileName ? uploadFileName : 'Upload file (.txt, .md)'}</span>
                  <input
                    type="file"
                    accept=".txt,.md,.rtf,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={9}
                placeholder="Paste full resume text here, including Contact Information, Summary, Experience bullet points, Education, and Skills..."
                className="w-full text-xs font-mono p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-neutral-400 resize-none"
              />
              <div className="flex justify-between text-[11px] text-neutral-400">
                <span>{customText.trim() ? `${customText.trim().split(/\s+/).length} words entered` : '0 words'}</span>
                <span>Plain text, markdown, or RTF</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Job Description Input */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                2. Target Job Description (Requisition)
              </h2>
            </div>
            <span className="text-xs text-neutral-500">Benchmark or Custom</span>
          </div>

          {/* Quick Benchmark Selectors */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
              1-Click Industry Requisitions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_JOB_BENCHMARKS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleSelectBenchmark(b)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedBenchmarkId === b.id
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 font-bold border border-purple-300 dark:border-purple-700'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {b.title.split(' ')[0]} {b.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(e.target.value);
              setSelectedBenchmarkId('');
            }}
            rows={7}
            placeholder="Paste target job description, requirements, and responsibilities..."
            className="w-full text-xs font-mono p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-neutral-400 resize-none"
          />

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">
              {jobDescription.trim() ? `${jobDescription.trim().split(/\s+/).length} words in requisition` : '0 words'}
            </span>
            <button
              type="button"
              onClick={handleScan}
              disabled={isScanning}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing Match Criteria...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{hasScanned ? 'Re-Analyze Match' : 'Run Genuine ATS Diagnostic'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Overall Score Banner */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-6">
              {/* Score Circle / Dial */}
              <div className={`w-28 h-28 rounded-2xl border-4 flex flex-col items-center justify-center shrink-0 shadow-inner ${getScoreColor(analysis.overallScore)}`}>
                <span className="text-4xl font-black tracking-tight">{analysis.overallScore}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">out of 100</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100">
                    Grade {analysis.grade}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${getScoreColor(analysis.overallScore)}`}>
                    {analysis.overallScore >= 80 ? 'Interview Ready' : analysis.overallScore >= 60 ? 'Competitive with Gaps' : 'Needs Optimization'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium max-w-xl">
                  {analysis.verdict}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
                  <span>{analysis.wordCount} total words</span>
                  <span>&bull;</span>
                  <span>{analysis.bulletCount} experience bullets</span>
                  <span>&bull;</span>
                  <span>{analysis.metricsFound.length} measurable metrics</span>
                  <span>&bull;</span>
                  <span>{analysis.actionVerbsFound.length} decisive action verbs</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                type="button"
                onClick={onNavigateToBuilder}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-bold text-xs transition-colors shadow-sm"
              >
                <span>Apply in Resume Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5 Pillar Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-6">
            {Object.entries(analysis.pillars).map(([key, pillar]) => (
              <div
                key={key}
                className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-850/50 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Weight {pillar.weight}%
                  </span>
                  {getPillarBadge(pillar.status)}
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate pr-1">
                    {pillar.name}
                  </h3>
                  <span className="text-sm font-black text-neutral-900 dark:text-neutral-100">
                    {pillar.score}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pillar.score >= 80 ? 'bg-emerald-500' : pillar.score >= 65 ? 'bg-blue-500' : pillar.score >= 45 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-snug">
                  {pillar.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Inspection Split: Keywords & Skill Gaps + Specific Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Hard Skills & Keywords Match Matrix */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Skills &amp; Keyword Alignment
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCopyMissingKeywords}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 cursor-pointer"
              >
                {copiedMissing ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Missing ({analysis.missingHardSkills.length + analysis.missingJdKeywords.length})</span>
                  </>
                )}
              </button>
            </div>

            {/* Matched Technical Skills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Matched Skills &amp; Qualifications ({analysis.matchedHardSkills.length})</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.matchedHardSkills.length === 0 ? (
                  <span className="text-xs text-neutral-400 italic">No direct hard skill matches from this job description yet.</span>
                ) : (
                  analysis.matchedHardSkills.map(s => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    >
                      ✓ {s}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Missing Technical Skills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Missing Technical Keywords Required by Role ({analysis.missingHardSkills.length})</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.missingHardSkills.length === 0 ? (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ All major technical requirements from this requisition are present!
                  </span>
                ) : (
                  analysis.missingHardSkills.map(s => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                    >
                      + {s}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Missing Vocabulary Terms */}
            {analysis.missingJdKeywords.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Additional High-Frequency Role Terms Missing</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.missingJdKeywords.slice(0, 10).map(k => (
                    <span
                      key={k}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Concrete Metrics Proof */}
            <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>Detected Impact Metrics ({analysis.metricsFound.length})</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.metricsFound.length === 0 ? (
                  <span className="text-xs text-neutral-400 italic">No numbers, percentages, or financial metrics detected. Add measurable results.</span>
                ) : (
                  analysis.metricsFound.map(m => (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                    >
                      {m}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Exact Actionable Feedback & Fixes */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  Targeted Action Plan ({analysis.feedbackItems.length} Findings)
                </h3>
              </div>
              <span className="text-xs text-neutral-500">Ranked by Severity</span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {analysis.feedbackItems.map(item => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-colors ${
                    item.severity === 'critical'
                      ? 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60'
                      : item.severity === 'warning'
                      ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60'
                      : 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                      {item.severity === 'critical' && <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                      {item.severity === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                      {item.severity === 'positive' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      <span>{item.title}</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold text-neutral-400">
                      {item.pillar}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>
                  {item.suggestion && (
                    <div className="pt-1 text-[11px] font-medium text-neutral-700 dark:text-neutral-200 bg-white/70 dark:bg-neutral-900/70 p-2 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50">
                      <span className="font-bold text-blue-600 dark:text-blue-400 mr-1">Action:</span>
                      {item.suggestion}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ATS Optimization Hub & Educational Resources (Phase 12 Internal Linking) */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              ATS Optimization Resources &amp; Strategic Guides
            </h3>
            <p className="text-xs text-neutral-500">
              Fix detected parsing issues, optimize keyword density, and format your bullet points with these verified tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <a
              href="/ats-guide"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('ats-guide');
              }}
              className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 rounded-2xl transition-all space-y-1.5 shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Definitive Guide to ATS</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Learn how Taleo, Workday, and Greenhouse parse text and token algorithms.
              </p>
            </a>

            <a
              href="/resume-skills"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('resume-skills');
              }}
              className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 rounded-2xl transition-all space-y-1.5 shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Top Resume Skills Catalog</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Add missing high-frequency keywords across Tech, Healthcare, Finance, and Sales.
              </p>
            </a>

            <a
              href="/resume-bullet-generator"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('resume-bullet-generator');
              }}
              className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 rounded-2xl transition-all space-y-1.5 shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Bullet Point Generator</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Convert weak duties into quantifiable Google X-Y-Z achievement bullets.
              </p>
            </a>

            <a
              href="/resume-word-counter"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('resume-word-counter');
              }}
              className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 rounded-2xl transition-all space-y-1.5 shadow-2xs group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Resume Word Counter</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Scan for overused clichés, verify reading time, and calibrate 1-page fit.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
