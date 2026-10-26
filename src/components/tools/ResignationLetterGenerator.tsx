import React, { useState, useMemo } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  RotateCcw,
  Briefcase,
  Calendar,
  AlertCircle,
  Building,
  User,
  ArrowRight,
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ShieldAlert,
  HelpCircle,
  Globe2
} from 'lucide-react';
import {
  RESIGNATION_TEMPLATES,
  RESIGNATION_FILTER_CATEGORIES,
  ResignationTemplate
} from '../../data/resignationTemplates';

export type ResignationType =
  | 'two_weeks'
  | 'short_notice'
  | 'immediate'
  | 'relocation'
  | 'retirement'
  | 'career_growth';

export type ResignationTone = 'formal_courteous' | 'warm_grateful' | 'brief_direct';

interface ResignationFormData {
  employeeName: string;
  jobTitle: string;
  managerName: string;
  managerTitle: string;
  companyName: string;
  resignationType: ResignationType;
  lastWorkingDay: string;
  reasonForLeaving: string;
  transitionAssistance: string;
  gratitudeNote: string;
  tone: ResignationTone;
}

const INITIAL_FORM: ResignationFormData = {
  employeeName: '',
  jobTitle: '',
  managerName: '',
  managerTitle: 'Engineering Manager',
  companyName: '',
  resignationType: 'two_weeks',
  lastWorkingDay: '',
  reasonForLeaving: 'pursuing a new professional career opportunity',
  transitionAssistance: 'I am fully committed to assisting with the handover of my active projects, documenting key processes, and training team members during my remaining time.',
  gratitudeNote: 'I want to express my sincere appreciation for the mentorship, professional growth opportunities, and collaboration I have experienced during my time with the team.',
  tone: 'formal_courteous',
};

const PRESETS = [
  {
    label: 'Standard Two Weeks Notice',
    description: 'Polite, professional corporate resignation with transition support',
    data: {
      employeeName: 'Sarah Jenkins',
      jobTitle: 'Senior Financial Analyst',
      managerName: 'Robert Vance',
      managerTitle: 'Director of Finance',
      companyName: 'Meridian Capital Partners',
      resignationType: 'two_weeks' as ResignationType,
      lastWorkingDay: 'November 14, 2026',
      reasonForLeaving: 'accepting an opportunity that aligns with my long-term career goals',
      transitionAssistance: 'During these next two weeks, I am eager to complete ongoing quarterly forecasting audits and assist in transferring my workflow documentation to ensure uninterrupted continuity.',
      gratitudeNote: 'Thank you for your steady guidance and for fostering an environment of rigorous professional excellence over the past four years.',
      tone: 'formal_courteous' as ResignationTone,
    }
  },
  {
    label: 'International Relocation',
    description: 'Resignation due to cross-border family or overseas career move',
    data: {
      employeeName: 'Julian Alvarez',
      jobTitle: 'Full Stack Software Engineer',
      managerName: 'Claire Dupont',
      managerTitle: 'VP of Technology',
      companyName: 'Strata Tech Solutions',
      resignationType: 'relocation' as ResignationType,
      lastWorkingDay: 'December 1, 2026',
      reasonForLeaving: 'relocating internationally to Europe for personal and family reasons',
      transitionAssistance: 'I will ensure all current microservice documentation is fully updated in Confluence and conduct paired knowledge-sharing sessions with junior team members prior to my departure.',
      gratitudeNote: 'Working with the engineering group has been a highlight of my career, and I remain grateful for the trust and support you have shown me.',
      tone: 'warm_grateful' as ResignationTone,
    }
  },
  {
    label: 'Executive / Short Notice',
    description: 'Direct, structured departure for accelerated transitions',
    data: {
      employeeName: 'Marcus Cole',
      jobTitle: 'Director of Operations',
      managerName: 'Amanda Richardson',
      managerTitle: 'Chief Operating Officer',
      companyName: 'Apex Logistics Global',
      resignationType: 'short_notice' as ResignationType,
      lastWorkingDay: 'November 6, 2026',
      reasonForLeaving: 'stepping into an accelerated executive engagement',
      transitionAssistance: 'I have scheduled priority transition briefings with department supervisors and organized all strategic KPI dashboards for a seamless handover.',
      gratitudeNote: 'I am proud of the milestones our operations division has achieved together and wish the organization continued success.',
      tone: 'brief_direct' as ResignationTone,
    }
  }
];

interface ResignationLetterGeneratorProps {
  onNavigate?: (page: string) => void;
  initialTab?: 'generator' | 'templates';
}

export const ResignationLetterGenerator: React.FC<ResignationLetterGeneratorProps> = ({
  onNavigate,
  initialTab = 'generator'
}) => {
  const [activeTab, setActiveTab] = useState<'generator' | 'templates'>(initialTab);
  const [formData, setFormData] = useState<ResignationFormData>(INITIAL_FORM);
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Template browser filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError(null);
  };

  const loadPreset = (presetData: Partial<ResignationFormData>) => {
    setFormData(prev => ({ ...prev, ...presetData }));
    setValidationError(null);
  };

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return RESIGNATION_TEMPLATES.filter(tpl => {
      const matchesCategory = selectedCategoryFilter === 'all' || tpl.category === selectedCategoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        tpl.title.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q) ||
        tpl.sampleLetter.toLowerCase().includes(q) ||
        tpl.suggestedNoticePeriod.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategoryFilter]);

  // Load template into generator
  const useTemplate = (tpl: ResignationTemplate) => {
    setFormData(tpl.defaultData);
    setGeneratedLetter(tpl.sampleLetter);
    setValidationError(null);
    setActiveTab('generator');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const generateLetterText = (): string => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const empName = formData.employeeName.trim() || '[Your Full Name]';
    const role = formData.jobTitle.trim() || '[Your Job Title]';
    const mgrName = formData.managerName.trim() || '[Manager Name]';
    const mgrTitle = formData.managerTitle.trim() || '[Manager Title]';
    const company = formData.companyName.trim() || '[Company Name]';
    const lastDay = formData.lastWorkingDay.trim() || '[Last Working Date, e.g. November 15, 2026]';
    const reason = formData.reasonForLeaving.trim() || 'pursuing a new professional opportunity';
    const transition = formData.transitionAssistance.trim();
    const gratitude = formData.gratitudeNote.trim();

    let openingSentence = '';
    if (formData.resignationType === 'immediate') {
      openingSentence = `Please accept this letter as formal notification that I am resigning from my position as ${role} with ${company}, effective immediately as of today, ${today}. Due to unexpected and extenuating personal circumstances, I am unable to provide the standard notice period.`;
    } else if (formData.resignationType === 'short_notice') {
      openingSentence = `Please accept this letter as formal notification that I am resigning from my position as ${role} with ${company}. My last day of employment will be ${lastDay}. I regret that I am unable to offer full standard notice due to ${reason}.`;
    } else if (formData.resignationType === 'relocation') {
      openingSentence = `Please accept this letter as formal notification that I am resigning from my position as ${role} with ${company}. Due to an upcoming relocation, my final day of employment will be ${lastDay}.`;
    } else if (formData.resignationType === 'retirement') {
      openingSentence = `Please accept this letter as notification of my formal retirement from my position as ${role} with ${company}, effective ${lastDay}.`;
    } else {
      // standard two weeks
      openingSentence = `Please accept this letter as formal notification that I am resigning from my position as ${role} with ${company}. In accordance with my notice period, my final working day will be ${lastDay}.`;
    }

    const lines = [
      today,
      '',
      mgrName,
      mgrTitle,
      company,
      '',
      `Dear ${mgrName},`,
      '',
      openingSentence,
      '',
      gratitude,
      '',
      transition,
      '',
      'I wish you, the team, and the company continued success in all upcoming endeavors. Please let me know how else I can assist in finalizing administrative and project transitions before my departure.',
      '',
      'Sincerely,',
      '',
      empName,
      role,
    ];

    return lines.join('\n');
  };

  const handleGenerate = () => {
    if (!formData.employeeName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    if (!formData.companyName.trim()) {
      setValidationError('Please enter the company name.');
      return;
    }
    if (!formData.lastWorkingDay.trim()) {
      setValidationError('Please specify your last working day.');
      return;
    }

    setValidationError(null);
    setGeneratedLetter(generateLetterText());
  };

  const handleCopy = async () => {
    if (!generatedLetter) return;
    try {
      await navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback
    }
  };

  const handleCopyTemplate = async (text: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTemplateId(templateId);
      setTimeout(() => setCopiedTemplateId(null), 2000);
    } catch (e) {
      // fallback
    }
  };

  const handleDownloadTxt = (textToDownload?: string, filenameSuffix?: string) => {
    const text = textToDownload || generatedLetter;
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const name = formData.employeeName ? formData.employeeName.replace(/\s+/g, '_') : 'Formal';
    a.download = `${name}_Resignation_Letter${filenameSuffix ? `_${filenameSuffix}` : ''}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Tabs */}
      <div className="space-y-6 no-print">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Professional Career Transition</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Resignation Letter Generator
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Create respectful, legally structured resignation letters for two weeks' notice, career transitions, international relocations, and formal retirements. 100% free with clean formatting and printable export.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shrink-0 self-start md:self-end">
            <button
              type="button"
              onClick={() => setActiveTab('generator')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Generator</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'templates'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Resignation Templates ({RESIGNATION_TEMPLATES.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: INTERACTIVE GENERATOR VIEW
          ========================================================================= */}
      {activeTab === 'generator' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Preset Quick Fill */}
          <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3 shadow-xs no-print">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Quick Presets (1-Click Sample Load)
              </span>
              <button
                type="button"
                onClick={() => {
                  setFormData(INITIAL_FORM);
                  setGeneratedLetter('');
                }}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Form
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => loadPreset(p.data)}
                  className="p-3 text-left bg-neutral-50 dark:bg-neutral-800/60 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-700 hover:border-blue-400 rounded-xl transition-all cursor-pointer group"
                >
                  <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {p.label}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    {p.description}
                  </div>
                </button>
              ))}
            </div>
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => setActiveTab('templates')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Browse all 11+ departure scenarios in the template library →
              </button>
            </div>
          </div>

          {/* Grid: Form & Letter Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form: 5 Cols */}
            <div className="lg:col-span-5 space-y-6 no-print">
              <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Departure Parameters
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="employeeName"
                      value={formData.employeeName}
                      onChange={handleInputChange}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Your Current Job Title *
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Financial Analyst"
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Manager's Name
                    </label>
                    <input
                      type="text"
                      name="managerName"
                      value={formData.managerName}
                      onChange={handleInputChange}
                      placeholder="e.g. Robert Vance"
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Manager's Title
                    </label>
                    <input
                      type="text"
                      name="managerTitle"
                      value={formData.managerTitle}
                      onChange={handleInputChange}
                      placeholder="e.g. Director of Finance"
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Meridian Capital Partners"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Notice Type
                    </label>
                    <select
                      name="resignationType"
                      value={formData.resignationType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="two_weeks">Standard Two Weeks Notice</option>
                      <option value="short_notice">Short Notice / Urgent</option>
                      <option value="relocation">Relocation / Move</option>
                      <option value="career_growth">Career Opportunity / Pivot</option>
                      <option value="retirement">Retirement</option>
                      <option value="immediate">Immediate Resignation</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Last Working Day *
                    </label>
                    <input
                      type="text"
                      name="lastWorkingDay"
                      value={formData.lastWorkingDay}
                      onChange={handleInputChange}
                      placeholder="e.g. November 14, 2026"
                      className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Expression of Gratitude
                  </label>
                  <textarea
                    name="gratitudeNote"
                    value={formData.gratitudeNote}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Handover &amp; Transition Plan
                  </label>
                  <textarea
                    name="transitionAssistance"
                    value={formData.transitionAssistance}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {validationError && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300">
                    {validationError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleGenerate}
                  className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-blue-400 dark:text-blue-600" />
                  <span>Generate Resignation Letter</span>
                </button>
              </div>
            </div>

            {/* Right Output: 7 Cols */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5 no-print">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                      Formal Letter Preview
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                      {formData.companyName ? `Resignation – ${formData.companyName}` : 'Your Resignation Letter'}
                    </h3>
                  </div>

                  {generatedLetter && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="px-3.5 py-2 text-xs font-bold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handlePrint}
                        className="px-3.5 py-2 text-xs font-bold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadTxt()}
                        className="px-3.5 py-2 text-xs font-bold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>TXT</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Letter Document Box */}
                {generatedLetter ? (
                  <div className="p-8 sm:p-10 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-900 dark:text-neutral-100 text-xs font-sans leading-relaxed whitespace-pre-line shadow-xs">
                    {generatedLetter}
                  </div>
                ) : (
                  <div className="p-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3 no-print">
                    <FileText className="w-8 h-8 text-neutral-400 mx-auto" />
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Ready to Generate Your Resignation Letter
                    </h4>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                      Fill in your company details and last working day, or pick a sample preset to generate a dignified, legally sound departure letter.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: FREE RESIGNATION TEMPLATE LIBRARY (11 TEMPLATES)
          ========================================================================= */}
      {activeTab === 'templates' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Search & Category Filter Bar */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resignation templates by reason (e.g. 2 weeks, short notice, relocation, retirement, personal)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <Filter className="w-3.5 h-3.5 text-neutral-400" />
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-medium text-neutral-800 dark:text-neutral-200"
                >
                  {RESIGNATION_FILTER_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mr-1">
                Scenario:
              </span>
              {RESIGNATION_FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedCategoryFilter === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
            <span>Showing <strong className="text-neutral-900 dark:text-neutral-100">{filteredTemplates.length}</strong> professionally crafted templates</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategoryFilter('all');
                }}
                className="text-blue-600 hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300">
                      {tpl.badge}
                    </span>
                    <span className="text-[11px] font-medium text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {tpl.suggestedNoticePeriod}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tpl.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>

                  {/* Letter Sample Preview */}
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl max-h-48 overflow-y-auto">
                    <pre className="text-[11px] text-neutral-800 dark:text-neutral-200 font-sans whitespace-pre-line leading-relaxed">
                      {tpl.sampleLetter}
                    </pre>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopyTemplate(tpl.sampleLetter, tpl.id)}
                      className="px-3 py-1.5 text-xs font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedTemplateId === tpl.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedTemplateId === tpl.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadTxt(tpl.sampleLetter, tpl.category)}
                      className="px-3 py-1.5 text-xs font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>TXT</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => useTemplate(tpl)}
                    className="px-3.5 py-1.5 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    <span>Use &amp; Edit Letter</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          EDUCATIONAL RESIGNATION GUIDE & COMPLIANCE SECTION
          ========================================================================= */}
      <div className="p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-8 no-print">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Global Compliance &amp; Professional Etiquette
          </span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Resignation Notice Standards by Jurisdiction
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            Notice periods vary substantially by jurisdiction and employment contract. Review these general standards before finalizing your departure date.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" />
              United States &amp; Canada
            </span>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold">
              Standard: 2 Weeks (14 Days)
            </p>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Most US roles are "at-will", meaning two weeks is customary professional courtesy rather than statutory law. Executive agreements may mandate 30-90 days.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" />
              United Kingdom
            </span>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold">
              Standard: 1 to 3 Months
            </p>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              UK employment contracts legally specify notice periods (commonly 1 month during probation and up to 3 months for mid-to-senior personnel).
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" />
              Germany &amp; European Union
            </span>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold">
              Standard: 4 Weeks to End of Month
            </p>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Statutory German notice (BGB § 622) is typically 4 weeks to the 15th or end of a calendar month, extending with tenure up to 7 months.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5" />
              Australia &amp; New Zealand
            </span>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold">
              Standard: 1 to 4 Weeks
            </p>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Governed by National Employment Standards (NES) and Modern Awards, notice scales from 1 week (&lt; 1 yr service) to 4 weeks (5+ yrs service).
            </p>
          </div>
        </div>

        {/* 5 Golden Rules */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 space-y-4">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            5 Golden Rules of Professional Resignation Letters
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-600">01. Keep It Positive</span>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Never air grievances or criticize leadership in your letter. It remains permanently in your HR file.
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-600">02. Explicit Last Day</span>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                State the exact date of your final working day to prevent ambiguity regarding payroll and benefit vesting.
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-600">03. Offer Handover</span>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Volunteering to document workflows and train peers preserves professional goodwill and future references.
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-600">04. Deliver Personally</span>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Inform your direct manager via 1-on-1 meeting or call before handing or emailing this formal written letter.
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-600">05. Verify PTO &amp; Health</span>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Check company policy on accrued unused vacation payout and benefits extension date prior to submission.
              </p>
            </div>
          </div>
        </div>

        {/* Cross Link to Resume Builder */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-sm">Updating your CV for your next chapter?</h4>
            <p className="text-xs text-blue-100">
              Use GlobeCareer's international resume builder with tailored formatting for 40+ countries.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('builder')}
            className="px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Launch Resume Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
