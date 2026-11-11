import React, { useState, useMemo } from 'react';
import {
  FileText,
  Copy,
  Check,
  Sparkles,
  RotateCcw,
  Briefcase,
  ArrowRight,
  Target,
  Award,
  Layers,
  CheckCircle2,
  BookmarkPlus,
  BookOpen,
  Search,
  Filter,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  Zap,
  HelpCircle
} from 'lucide-react';
import {
  SUMMARY_TEMPLATES,
  SUMMARY_FILTER_TYPES,
  SUMMARY_FILTER_CATEGORIES,
  SummaryTemplate
} from '../../data/summaryTemplates';

export type SummaryMode = 'summary' | 'objective' | 'headline';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'career_changer';

interface SummaryFormData {
  mode: SummaryMode;
  targetJobTitle: string;
  experienceLevel: ExperienceLevel;
  yearsOfExperience: string;
  keySkills: string;
  topAchievements: string;
  previousField: string; // for career changers
  industry: string;
}

const INITIAL_FORM: SummaryFormData = {
  mode: 'summary',
  targetJobTitle: '',
  experienceLevel: 'senior',
  yearsOfExperience: '8',
  keySkills: '',
  topAchievements: '',
  previousField: '',
  industry: 'Technology & SaaS',
};

const PRESETS = [
  {
    label: 'Senior Full Stack Engineer',
    mode: 'summary' as SummaryMode,
    data: {
      mode: 'summary' as SummaryMode,
      targetJobTitle: 'Senior Full Stack Engineer',
      experienceLevel: 'senior' as ExperienceLevel,
      yearsOfExperience: '7',
      keySkills: 'React, TypeScript, Node.js, distributed PostgreSQL, AWS microservices, automated CI/CD pipelines',
      topAchievements: 'architected event-driven ingestion pipeline handling 14M daily events with 99.99% uptime; reduced cloud spend by 32%',
      previousField: '',
      industry: 'FinTech & High-Scale SaaS',
    }
  },
  {
    label: 'Recent Computer Science Graduate',
    mode: 'objective' as SummaryMode,
    data: {
      mode: 'objective' as SummaryMode,
      targetJobTitle: 'Associate Software Developer',
      experienceLevel: 'entry' as ExperienceLevel,
      yearsOfExperience: '0',
      keySkills: 'Python, Java, Git, Data Structures & Algorithms, REST APIs, Agile sprint methodologies',
      topAchievements: 'built open-source university research portal with 1,200 active student users; capstone team lead',
      previousField: '',
      industry: 'Enterprise Software & Cloud Platforms',
    }
  },
  {
    label: 'Healthcare to HealthTech Pivot',
    mode: 'summary' as SummaryMode,
    data: {
      mode: 'summary' as SummaryMode,
      targetJobTitle: 'Clinical Product Operations Specialist',
      experienceLevel: 'career_changer' as ExperienceLevel,
      yearsOfExperience: '6',
      keySkills: 'EHR systems, clinical compliance, stakeholder mediation, process automation, user testing',
      topAchievements: 'spearheaded inpatient workflow digitization reducing patient intake wait times by 40%',
      previousField: 'Inpatient Hospital Nursing & Care Coordination',
      industry: 'Digital Health & Telemedicine',
    }
  }
];

interface GeneratedOption {
  title: string;
  text: string;
  atsScore: string;
  focus: string;
}

interface SummaryObjectiveGeneratorProps {
  onNavigate?: (page: string) => void;
  onApplyToResume?: (summaryText: string) => void;
  initialTab?: 'generator' | 'templates';
  initialMode?: SummaryMode;
}

export const SummaryObjectiveGenerator: React.FC<SummaryObjectiveGeneratorProps> = ({
  onNavigate,
  onApplyToResume,
  initialTab = 'generator',
  initialMode
}) => {
  const [activeTab, setActiveTab] = useState<'generator' | 'templates'>(initialTab);
  const [formData, setFormData] = useState<SummaryFormData>(() => {
    if (initialMode) {
      return {
        ...INITIAL_FORM,
        mode: initialMode,
        experienceLevel: initialMode === 'objective' ? 'entry' : 'senior',
        yearsOfExperience: initialMode === 'objective' ? '0' : '8'
      };
    }
    return INITIAL_FORM;
  });
  const [generatedOptions, setGeneratedOptions] = useState<GeneratedOption[] | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [appliedIdx, setAppliedIdx] = useState<number | null>(null);
  const [appliedTemplateId, setAppliedTemplateId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Template browser filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError(null);
  };

  const loadPreset = (presetData: Partial<SummaryFormData>) => {
    setFormData(prev => ({ ...prev, ...presetData }));
    setValidationError(null);
  };

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return SUMMARY_TEMPLATES.filter(tpl => {
      const matchesType = selectedTypeFilter === 'all' || tpl.type === selectedTypeFilter;
      const matchesCategory = selectedCategoryFilter === 'all' || tpl.industryCategory === selectedCategoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        tpl.title.toLowerCase().includes(q) ||
        tpl.targetRole.toLowerCase().includes(q) ||
        tpl.summaryText.toLowerCase().includes(q) ||
        tpl.tacticalFocus.toLowerCase().includes(q) ||
        tpl.primaryKeywords.some(k => k.toLowerCase().includes(q));

      return matchesType && matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedTypeFilter, selectedCategoryFilter]);

  // Load a template into the interactive generator
  const useTemplate = (tpl: SummaryTemplate) => {
    const newForm: SummaryFormData = {
      mode: tpl.type,
      targetJobTitle: tpl.targetRole,
      experienceLevel: tpl.experienceLevel === 'all' ? 'mid' : tpl.experienceLevel,
      yearsOfExperience: tpl.experienceLevel === 'senior' ? '8' : tpl.experienceLevel === 'entry' ? '1' : '5',
      keySkills: tpl.primaryKeywords.join(', '),
      topAchievements: tpl.tacticalFocus,
      previousField: tpl.experienceLevel === 'career_changer' ? 'Previous Professional Domain' : '',
      industry: tpl.industryCategory === 'tech' ? 'Technology & Software'
        : tpl.industryCategory === 'design' ? 'Product Design & Creative'
        : tpl.industryCategory === 'finance' ? 'Banking & Financial Markets'
        : tpl.industryCategory === 'healthcare' ? 'Healthcare & Clinical Operations'
        : 'Global Enterprise',
    };

    setFormData(newForm);
    setValidationError(null);

    // Populate generated variations with the template content as lead
    setGeneratedOptions([
      {
        title: `Curated Template: ${tpl.title}`,
        text: tpl.summaryText,
        atsScore: tpl.atsScore,
        focus: tpl.tacticalFocus
      },
      {
        title: 'High-Density Executive Variant',
        text: `${tpl.summaryText.split('.').slice(0, 2).join('.')}. Specialized in ${tpl.primaryKeywords.slice(0, 4).join(', ')} with an established track record of quantitative impact.`,
        atsScore: '96/100',
        focus: 'Crisp 2-sentence high-density layout'
      },
      {
        title: 'LinkedIn Headline Pairing',
        text: `${tpl.targetRole} | Specialized in ${tpl.primaryKeywords.slice(0, 3).join(' • ')} | Proven Impact`,
        atsScore: '94/100',
        focus: 'LinkedIn Header & Resume Header Tagline'
      }
    ]);

    setActiveTab('generator');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const generateStatements = () => {
    if (!formData.targetJobTitle.trim()) {
      setValidationError('Please specify your target job title.');
      return;
    }

    const title = formData.targetJobTitle.trim();
    const skills = formData.keySkills.trim() || 'cross-functional collaboration, technical execution, and problem solving';
    const achievements = formData.topAchievements.trim();
    const years = formData.yearsOfExperience.trim();
    const industry = formData.industry.trim() || 'global enterprise';
    const prevField = formData.previousField.trim();

    const options: GeneratedOption[] = [];

    if (formData.mode === 'summary') {
      if (formData.experienceLevel === 'career_changer') {
        options.push({
          title: 'Transferable Strengths & Domain Hybrid',
          text: `Versatile professional transitioning ${years ? `${years} years of proven expertise in ${prevField}` : `a strong foundation in ${prevField}`} into high-impact ${title} initiatives within ${industry}. Recognized for bridging technical precision with structured stakeholder alignment. Proven history of operational problem solving${achievements ? `, having ${achievements}` : ''}. Rapid learner combining deep domain knowledge with core competencies in ${skills}.`,
          atsScore: '98/100',
          focus: 'Emphasizes dual-domain synergy & rapid adaptability'
        });
        options.push({
          title: 'Results & Process Modernization',
          text: `Results-focused ${title} candidate offering a distinguished track record in ${prevField}. Leverages quantitative analytical rigor, cross-functional mediation, and dedication to excellence in ${skills}. Demonstrated ability to optimize workflows and scale operational performance${achievements ? `, having ${achievements}` : ''}. Eager to drive strategic milestones for growth-oriented teams.`,
          atsScore: '96/100',
          focus: 'Emphasizes quantitative execution & leadership transfer'
        });
        options.push({
          title: 'Concise Modern Profile',
          text: `Accomplished specialist pivoting from ${prevField} to deliver high-velocity solutions as a ${title}. Proficient in ${skills}${achievements ? ` with verified achievements including ${achievements}` : ''}. Dedicated to operational scalability and high-standard teamwork.`,
          atsScore: '94/100',
          focus: 'Crisp 3-sentence high-density layout'
        });
      } else {
        // Experienced professional
        options.push({
          title: 'Metrics-Driven & Quantifiable Scale',
          text: `Dedicated ${title} with ${years ? `${years}+ years of progressive experience` : 'proven industry expertise'} architecting scalable solutions across ${industry}. Expertise spans ${skills}. Proven record of cross-functional leadership and quantifiable impact${achievements ? `, having ${achievements}` : ''}. Passionate about maintaining high engineering and operational standards while delivering continuous business value.`,
          atsScore: '99/100',
          focus: 'Optimized for high-growth enterprise & corporate ATS'
        });
        options.push({
          title: 'Strategic Leadership & Collaboration',
          text: `Strategic, performance-driven ${title} offering ${years ? `${years} years of dedicated background` : 'a distinguished career record'} in ${industry}. Adept at leading multi-disciplinary teams, driving process automation, and mastering ${skills}. Track record includes ${achievements || 'consistently beating departmental delivery benchmarks ahead of schedule'}. Committed to building collaborative cultures that sustainably accelerate revenue and delivery velocity.`,
          atsScore: '97/100',
          focus: 'Focuses on team mentorship & strategic roadmap alignment'
        });
        options.push({
          title: 'High-Density 1-Page Summary',
          text: `Performance-focused ${title} with ${years ? `${years} years of experience` : 'deep specialization'} in ${skills}. Demonstrated track record of operational excellence${achievements ? `, notably ${achievements}` : ''}. Skilled in rapid architectural diagnostics and sustainable enterprise execution.`,
          atsScore: '95/100',
          focus: 'Compact single-column resume format'
        });
      }
    } else if (formData.mode === 'objective') {
      // Career Objective
      options.push({
        title: 'Action-Oriented Graduate Objective',
        text: `Motivated and academically grounded ${title} seeking to leverage rigorous foundational training in ${skills} to support mission-critical goals at an innovative ${industry} organization. Proven capability to apply applied project coursework, collaborative agile methodologies, and rapid problem-solving${achievements ? `, demonstrated by ${achievements}` : ''}. Eager to contribute high energy and continuous learning to an elite team.`,
        atsScore: '98/100',
        focus: 'Perfect for recent graduates & entry-level candidates'
      });
      options.push({
        title: 'Value-First Contribution Objective',
        text: `Driven professional pursuing an entry-to-mid-level ${title} position in ${industry}. Dedicated to applying strong technical proficiencies in ${skills} to accelerate departmental deliverables. Known for attention to detail, proactive team communication, and hands-on deliverables${achievements ? `, including ${achievements}` : ''}. Committed to creating immediate measurable value.`,
        atsScore: '96/100',
        focus: 'Highlights immediate utility & team collaboration'
      });
      options.push({
        title: 'Concise Modern Career Objective',
        text: `Enthusiastic candidate seeking a challenging ${title} role with a forward-thinking ${industry} employer. Offering demonstrated capability in ${skills} paired with a strong work ethic${achievements ? ` and proven results including ${achievements}` : ''}.`,
        atsScore: '93/100',
        focus: 'Crisp 2-sentence target objective'
      });
    } else {
      // Headline mode
      options.push({
        title: 'Comprehensive Authority Headline',
        text: `${title} | Specialized in ${skills.split(',').slice(0, 3).join(' • ')} | ${years ? `${years}+ Years Experience` : 'Enterprise Scale'}`,
        atsScore: '99/100',
        focus: 'LinkedIn Header & Resume Top Bar'
      });
      options.push({
        title: 'Metric & Value Headline',
        text: `${title} helping ${industry} teams scale | ${skills.split(',').slice(0, 2).join(' & ')} Specialist`,
        atsScore: '96/100',
        focus: 'Client-facing / Consultant branding'
      });
      options.push({
        title: 'Direct Keyword Headline',
        text: `${title} • ${skills.split(',').slice(0, 4).join(' • ')}`,
        atsScore: '94/100',
        focus: 'Clean minimal ATS standard'
      });
    }

    setGeneratedOptions(options);
  };

  const handleCopy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
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

  const handleApplyToResume = (text: string, idx: number) => {
    if (onApplyToResume) {
      onApplyToResume(text);
      setAppliedIdx(idx);
      setTimeout(() => setAppliedIdx(null), 2500);
    } else if (onNavigate) {
      onNavigate('builder');
    }
  };

  const handleApplyTemplateToResume = (text: string, templateId: string) => {
    if (onApplyToResume) {
      onApplyToResume(text);
      setAppliedTemplateId(templateId);
      setTimeout(() => setAppliedTemplateId(null), 2500);
    } else if (onNavigate) {
      onNavigate('builder');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Tabs */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Target className="w-3.5 h-3.5" />
              <span>Resume Opening &amp; Profile Optimization</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Resume Summary &amp; Objective Generator
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Create high-scoring ATS professional summaries, entry-level career objectives, and LinkedIn headline statements tailored to your target industry. 100% free with direct 1-click insertion into the Resume Builder.
            </p>
          </div>

          {/* Navigation View Switcher */}
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
              <span>Summary Templates ({SUMMARY_TEMPLATES.length})</span>
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
          <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Quick Presets (1-Click Sample Load)
              </span>
              <button
                type="button"
                onClick={() => {
                  setFormData(INITIAL_FORM);
                  setGeneratedOptions(null);
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
                    {p.mode === 'objective' ? 'Entry-Level Objective' : 'Professional Summary'}
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
                Explore all 18+ industry summary and objective templates in the library →
              </button>
            </div>
          </div>

          {/* Grid: Form & Variations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form: 5 Cols */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  1. Profile Parameters
                </h2>

                {/* Mode Selector */}
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Statement Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, mode: 'summary' }))}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        formData.mode === 'summary'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                      }`}
                    >
                      Summary
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, mode: 'objective' }))}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        formData.mode === 'objective'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                      }`}
                    >
                      Objective
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, mode: 'headline' }))}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        formData.mode === 'headline'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700'
                      }`}
                    >
                      Headline
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Target Role / Job Title *
                  </label>
                  <input
                    type="text"
                    name="targetJobTitle"
                    value={formData.targetJobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Senior Product Manager, Data Analyst"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Experience Level
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100"
                    >
                      <option value="entry">Entry-Level / Grad (0-2 yrs)</option>
                      <option value="mid">Mid-Level (3-6 yrs)</option>
                      <option value="senior">Senior / Lead (7+ yrs)</option>
                      <option value="career_changer">Career Changer / Pivot</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Years in Field
                    </label>
                    <input
                      type="text"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleInputChange}
                      placeholder="e.g. 5"
                      className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                </div>

                {formData.experienceLevel === 'career_changer' && (
                  <div>
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                      Previous Industry / Field *
                    </label>
                    <input
                      type="text"
                      name="previousField"
                      value={formData.previousField}
                      onChange={handleInputChange}
                      placeholder="e.g. Classroom Teaching, Hospitality Operations"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Target Industry
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    placeholder="e.g. Enterprise Cloud, FinTech, E-Commerce"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Core Technical &amp; Soft Skills
                  </label>
                  <textarea
                    name="keySkills"
                    value={formData.keySkills}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="e.g. Python, SQL, Tableau, Stakeholder Management, A/B Testing"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Signature Achievement (Quantifiable)
                  </label>
                  <textarea
                    name="topAchievements"
                    value={formData.topAchievements}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="e.g. increased organic inbound pipeline by 42% over 6 months; optimized database latency by 35%"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-neutral-100 leading-relaxed"
                  />
                </div>

                {validationError && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300">
                    {validationError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={generateStatements}
                  className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-blue-400 dark:text-blue-600" />
                  <span>Generate Profile Statements</span>
                </button>
              </div>
            </div>

            {/* Right Output: 7 Cols */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-6">
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                    Generated Variations &amp; ATS Scoring
                  </span>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                    {formData.targetJobTitle ? `${formData.targetJobTitle} – Tailored Options` : 'Your Tailored Statements'}
                  </h3>
                </div>

                {generatedOptions ? (
                  <div className="space-y-4">
                    {generatedOptions.map((opt, idx) => (
                      <div
                        key={idx}
                        className="p-5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3 transition-all hover:border-neutral-300 dark:hover:border-neutral-700"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/80 dark:border-neutral-800/80 pb-3">
                          <div>
                            <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                              {opt.title}
                            </h4>
                            <span className="text-[11px] text-neutral-500 font-medium">
                              {opt.focus}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                              ATS {opt.atsScore}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
                          {opt.text}
                        </p>

                        <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(opt.text, idx)}
                            className="px-3 py-1.5 text-xs font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleApplyToResume(opt.text, idx)}
                            className="px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            {appliedIdx === idx ? <CheckCircle2 className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                            <span>{appliedIdx === idx ? 'Applied to Resume!' : 'Use in Resume Builder'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3">
                    <Target className="w-8 h-8 text-neutral-400 mx-auto" />
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      Ready to Generate Your Statements
                    </h4>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                      Enter your target role and core skills on the left to generate 3 distinctive, ATS-calibrated variations ready for direct export.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: FREE TEMPLATE LIBRARY VIEW (18 TEMPLATES)
          ========================================================================= */}
      {activeTab === 'templates' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Filter & Search Bar */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates by role (e.g. Software, Product, Marketing, Executive) or skill..."
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
                  {SUMMARY_FILTER_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Type Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mr-1">
                Format:
              </span>
              {SUMMARY_FILTER_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedTypeFilter(t.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedTypeFilter === t.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
            <span>Showing <strong className="text-neutral-900 dark:text-neutral-100">{filteredTemplates.length}</strong> ATS-tested templates</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTypeFilter('all');
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
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300">
                        {tpl.badge}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {tpl.type === 'summary' ? 'Professional Summary' : tpl.type === 'objective' ? 'Career Objective' : 'LinkedIn Headline'}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0">
                      ATS {tpl.atsScore}
                    </span>
                  </div>

                  {/* Template Title & Target Role */}
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tpl.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium">
                      Target Role: <span className="text-neutral-700 dark:text-neutral-300 font-semibold">{tpl.targetRole}</span>
                    </p>
                  </div>

                  {/* Summary Text Card */}
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl">
                    <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
                      {tpl.summaryText}
                    </p>
                  </div>

                  {/* Tactical Focus & Keywords */}
                  <div className="space-y-2 text-[11px]">
                    <div className="text-neutral-500 flex items-start gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{tpl.tacticalFocus}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {tpl.primaryKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-md"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopyTemplate(tpl.summaryText, tpl.id)}
                      className="px-3 py-1.5 text-xs font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedTemplateId === tpl.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedTemplateId === tpl.id ? 'Copied' : 'Copy Text'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleApplyTemplateToResume(tpl.summaryText, tpl.id)}
                      className="px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/60 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {appliedTemplateId === tpl.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                      <span>{appliedTemplateId === tpl.id ? 'Added to Resume!' : 'Insert to Builder'}</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => useTemplate(tpl)}
                    className="px-3.5 py-1.5 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    <span>Customize in Generator</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          EDUCATIONAL GUIDE & ATS STRATEGY SECTION (BOTH MODES)
          ========================================================================= */}
      <div className="p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Strategic Comparison
          </span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            Professional Summary vs. Career Objective vs. LinkedIn Headline
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            Choose the right profile statement format based on your career stage, target hiring country, and platform requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Professional Summary
              </h4>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <strong>Best for:</strong> Experienced professionals (3+ years), team leads, and career switchers with transferable domain achievements.
            </p>
            <ul className="text-xs text-neutral-500 space-y-1.5 list-disc list-inside">
              <li>Length: 3 to 4 sentences (40-65 words).</li>
              <li>Includes core tech stack, total experience, and 1-2 quantified metrics.</li>
              <li>Replaces generic buzzwords with measurable outcomes.</li>
            </ul>
          </div>

          <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600" />
              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Career Objective
              </h4>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <strong>Best for:</strong> Recent university graduates, students, entry-level job seekers, or workers entering a brand-new discipline.
            </p>
            <ul className="text-xs text-neutral-500 space-y-1.5 list-disc list-inside">
              <li>Length: 2 to 3 concise sentences (30-50 words).</li>
              <li>Focuses on what value you will deliver to the employer, not what you want from them.</li>
              <li>Highlights relevant coursework, capstones, and agile habits.</li>
            </ul>
          </div>

          <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                LinkedIn Headline / Tagline
              </h4>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              <strong>Best for:</strong> LinkedIn header (under your name), portfolio header bars, and resume top bar subheadings.
            </p>
            <ul className="text-xs text-neutral-500 space-y-1.5 list-disc list-inside">
              <li>Length: 1 line (under 120 characters).</li>
              <li>Formula: Job Title | 3 Core Hard Skills | Metric or Scale.</li>
              <li>Optimizes recruiter search algorithm matches directly.</li>
            </ul>
          </div>
        </div>

        {/* 5 Rules of ATS High-Scoring Summaries */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 space-y-4">
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Top 5 Rules for Writing High-Scoring ATS Resume Summaries
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-600">01. Lead With Role</span>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Always open with your exact target title so ATS parsers index you for relevant recruiter queries.
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-600">02. Quantify Scale</span>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Incorporate metrics ($ revenue, % efficiency, latency, team size, user volume) in your summary.
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-600">03. Hard Skills First</span>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Prioritize concrete technical tools and frameworks over ambiguous clichés like "hard worker".
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-600">04. No 1st-Person "I"</span>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Resume summaries traditionally omit personal pronouns ("Experienced engineer" instead of "I am an engineer").
              </p>
            </div>
            <div className="p-3 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold text-blue-600">05. Keep It Under 70 Words</span>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Hiring managers spend 6-8 seconds on initial screening; concise summaries prevent visual fatigue.
              </p>
            </div>
          </div>
        </div>

        {/* Builder CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-sm">Ready to put your summary into a complete resume?</h4>
            <p className="text-xs text-blue-100">
              Format your entire CV for 40+ countries with ATS-tested templates, free PDF and DOCX export.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('builder')}
            className="px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Open Resume Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
