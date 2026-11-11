import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Award,
  Layers,
  Zap,
  Target,
  CheckCircle2,
  Search,
  Filter,
  BookmarkPlus,
  Sliders,
  ChevronRight,
  TrendingUp,
  Briefcase
} from 'lucide-react';

interface ResumePhraseGeneratorProps {
  onNavigate: (page: string) => void;
  onApplyToResume?: (phrase: string) => void;
}

type SeniorityLevel = 'junior' | 'mid' | 'senior' | 'executive';

interface PhraseCategory {
  id: string;
  name: string;
  description: string;
  verbs: string[];
  defaultProject: string;
  defaultMetric: string;
}

const PHRASE_CATEGORIES: PhraseCategory[] = [
  {
    id: 'leadership',
    name: 'Leadership & Team Management',
    description: 'Guiding cross-functional teams, hiring, coaching, and strategic governance.',
    verbs: ['Spearheaded', 'Orchestrated', 'Mobilized', 'Mentored', 'Empowered', 'Steered', 'Cultivated'],
    defaultProject: 'cross-functional engineering and design team across 3 time zones',
    defaultMetric: 'scaling sprint velocity by 34% and cutting voluntary team turnover to under 4%'
  },
  {
    id: 'technical',
    name: 'Technical & Engineering Delivery',
    description: 'Architecture, software development, cloud infrastructure, and CI/CD pipelines.',
    verbs: ['Architected', 'Engineered', 'Overhauled', 'Automated', 'Refactored', 'Deployed', 'Benchmarked'],
    defaultProject: 'distributed microservices API and asynchronous data processing pipelines',
    defaultMetric: 'reducing server response latency by 48% across 12M daily customer requests'
  },
  {
    id: 'process',
    name: 'Process Optimization & Automation',
    description: 'Eliminating manual toil, lean operations, and workflow automation.',
    verbs: ['Streamlined', 'Automated', 'Standardized', 'Consolidated', 'Revamped', 'Eliminated', 'Accelerated'],
    defaultProject: 'end-to-end client onboarding and KYC compliance verification workflow',
    defaultMetric: 'shortening turnaround time from 7 business days to 4 hours with 99.8% audit accuracy'
  },
  {
    id: 'revenue',
    name: 'Sales, Growth & Revenue',
    description: 'New business acquisition, pipeline acceleration, and enterprise account growth.',
    verbs: ['Generated', 'Negotiated', 'Closed', 'Surpassed', 'Captured', 'Expanded', 'Accelerated'],
    defaultProject: 'strategic enterprise software expansion across Fortune 500 accounts',
    defaultMetric: 'delivering $3.2M in annual recurring revenue (ARR) at 142% of annual quota'
  },
  {
    id: 'analytics',
    name: 'Data Analytics & Insights',
    description: 'Predictive modeling, business intelligence dashboards, and econometric analysis.',
    verbs: ['Synthesized', 'Modeled', 'Uncovered', 'Formulated', 'Forecasted', 'Translated', 'Leveraged'],
    defaultProject: 'predictive customer churn model and multi-touch attribution dashboards in SQL and Python',
    defaultMetric: 'identifying $650,000 in preventable revenue loss and guiding product roadmap priorities'
  },
  {
    id: 'customer',
    name: 'Customer Success & Retention',
    description: 'Client relationship management, NPS enhancement, and escalations.',
    verbs: ['Elevated', 'Championed', 'Retained', 'Resolved', 'Partnered', 'Coached', 'Advocated'],
    defaultProject: 'tiered customer health scoring and proactive quarterly business review (QBR) cadence',
    defaultMetric: 'driving enterprise gross revenue retention to 97.4% and lifting CSAT from 82% to 96%'
  },
  {
    id: 'collaboration',
    name: 'Cross-Functional Collaboration',
    description: 'Bridging technical and non-technical stakeholders, product discovery, and alignment.',
    verbs: ['Bridged', 'Synchronized', 'Co-authored', 'Mediated', 'Aligned', 'Facilitated', 'Consolidated'],
    defaultProject: 'go-to-market alignment between Engineering, Product, Legal, and Sales operations',
    defaultMetric: 'delivering 4 major compliance releases on schedule with zero regulatory blockers'
  }
];

interface CuratedPhrase {
  id: string;
  category: string;
  level: SeniorityLevel;
  phrase: string;
  highlightVerb: string;
}

const CURATED_PHRASES: CuratedPhrase[] = [
  // Leadership
  { id: 'l1', category: 'leadership', level: 'senior', highlightVerb: 'Spearheaded', phrase: 'Spearheaded agile transformation across 4 squads (28 engineers), lifting sprint delivery consistency from 68% to 94%.' },
  { id: 'l2', category: 'leadership', level: 'executive', highlightVerb: 'Orchestrated', phrase: 'Orchestrated global reorganization of customer support division, establishing 24/7 follow-the-sun operations in Manila and Dublin.' },
  { id: 'l3', category: 'leadership', level: 'mid', highlightVerb: 'Mentored', phrase: 'Mentored 6 junior and mid-level software developers, 4 of whom earned promotions within 14 months.' },
  { id: 'l4', category: 'leadership', level: 'executive', highlightVerb: 'Steered', phrase: 'Steered multi-year enterprise technology roadmap with a $6.5M capital budget, reporting bi-weekly progress to board of directors.' },

  // Technical
  { id: 't1', category: 'technical', level: 'senior', highlightVerb: 'Architected', phrase: 'Architected zero-downtime migration of monolith to Kubernetes microservices, achieving 99.99% service availability.' },
  { id: 't2', category: 'technical', level: 'mid', highlightVerb: 'Engineered', phrase: 'Engineered asynchronous webhook notification system in TypeScript and Redis, processing 4M+ webhook dispatches daily.' },
  { id: 't3', category: 'technical', level: 'senior', highlightVerb: 'Automated', phrase: 'Automated end-to-end security vulnerability scanning within GitHub Actions, catching 120+ CVEs pre-production.' },
  { id: 't4', category: 'technical', level: 'junior', highlightVerb: 'Refactored', phrase: 'Refactored legacy React UI components into accessible design-token primitives, reducing bundle size by 38 KB.' },

  // Process
  { id: 'p1', category: 'process', level: 'mid', highlightVerb: 'Streamlined', phrase: 'Streamlined monthly financial close cycle from 10 days to 3.5 days by automating GL account reconciliations in NetSuite.' },
  { id: 'p2', category: 'process', level: 'senior', highlightVerb: 'Overhauled', phrase: 'Overhauled technical incident response playbooks, shrinking Mean Time to Resolution (MTTR) by 54% across P1/P2 incidents.' },
  { id: 'p3', category: 'process', level: 'junior', highlightVerb: 'Standardized', phrase: 'Standardized candidate interview scorecards across 14 hiring managers, reducing hiring variance and bias.' },
  { id: 'p4', category: 'process', level: 'senior', highlightVerb: 'Eliminated', phrase: 'Eliminated manual spreadsheet data entry by integrating Stripe billing webhooks with Salesforce CRM via Zapier and Node.js.' },

  // Revenue & Sales
  { id: 'r1', category: 'revenue', level: 'senior', highlightVerb: 'Captured', phrase: 'Captured $2.8M in net-new ARR by executing consultative outbound campaigns targeting VP-level decision makers in Healthcare.' },
  { id: 'r2', category: 'revenue', level: 'executive', highlightVerb: 'Negotiated', phrase: 'Negotiated 3-year enterprise software license contract valued at $4.1M with Tier-1 multinational investment bank.' },
  { id: 'r3', category: 'revenue', level: 'mid', highlightVerb: 'Expanded', phrase: 'Expanded land-and-expand revenue by 46% year-over-year through strategic adoption roadmaps with existing client accounts.' },
  { id: 'r4', category: 'revenue', level: 'junior', highlightVerb: 'Generated', phrase: 'Generated 140+ qualified sales pipeline opportunities in Q3, outperforming SDR benchmark targets by 128%.' },

  // Analytics
  { id: 'a1', category: 'analytics', level: 'senior', highlightVerb: 'Modeled', phrase: 'Constructed multi-scenario revenue forecasting model in Python and Prophet, improving annual budget variance accuracy by 18%.' },
  { id: 'a2', category: 'analytics', level: 'mid', highlightVerb: 'Synthesized', phrase: 'Synthesized product telemetry across 250,000 active web users, uncovering 3 onboarding friction points that hindered activation.' },
  { id: 'a3', category: 'analytics', level: 'senior', highlightVerb: 'Leveraged', phrase: 'Leveraged Tableau and Snowflake to build executive KPI dashboard utilized daily by C-suite for capital allocation decisions.' },
  { id: 'a4', category: 'analytics', level: 'junior', highlightVerb: 'Translated', phrase: 'Translated complex SQL query results into actionable weekly marketing performance decks for non-technical stakeholders.' },

  // Customer
  { id: 'c1', category: 'customer', level: 'senior', highlightVerb: 'Elevated', phrase: 'Elevated net promoter score (NPS) from +38 to +64 across 80 key enterprise accounts by establishing a Customer Advisory Board.' },
  { id: 'c2', category: 'customer', level: 'mid', highlightVerb: 'Championed', phrase: 'Championed top customer feature requests during weekly product planning, directly preventing the churn of 3 flagship accounts.' },
  { id: 'c3', category: 'customer', level: 'junior', highlightVerb: 'Resolved', phrase: 'Resolved 80+ customer support tickets weekly with a 98.4% first-contact resolution rate and 4.9/5 satisfaction rating.' },

  // Collaboration
  { id: 'cb1', category: 'collaboration', level: 'senior', highlightVerb: 'Synchronized', phrase: 'Synchronized cross-functional efforts between Product, Compliance, and Security to earn SOC 2 Type II certification on schedule.' },
  { id: 'cb2', category: 'collaboration', level: 'mid', highlightVerb: 'Co-authored', phrase: 'Co-authored comprehensive API documentation and Postman collections, enabling 15 third-party partners to integrate within 30 days.' }
];

export const ResumePhraseGenerator: React.FC<ResumePhraseGeneratorProps> = ({
  onNavigate,
  onApplyToResume
}) => {
  const [selectedCatId, setSelectedCatId] = useState<string>('leadership');
  const [selectedLevel, setSelectedLevel] = useState<SeniorityLevel>('senior');
  const [actionVerb, setActionVerb] = useState<string>('Spearheaded');
  const [projectInput, setProjectInput] = useState<string>('cross-functional engineering and design team across 3 time zones');
  const [metricInput, setMetricInput] = useState<string>('scaling sprint velocity by 34% and cutting voluntary team turnover to under 4%');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [appliedId, setAppliedId] = useState<string | null>(null);

  const activeCategory = PHRASE_CATEGORIES.find(c => c.id === selectedCatId) || PHRASE_CATEGORIES[0];

  const handleSelectCategory = (cat: PhraseCategory) => {
    setSelectedCatId(cat.id);
    setActionVerb(cat.verbs[0]);
    setProjectInput(cat.defaultProject);
    setMetricInput(cat.defaultMetric);
  };

  // 3 Dynamic Generated Phrase Variations
  const generatedVariations = useMemo(() => {
    const v = actionVerb.trim();
    const p = projectInput.trim() || 'core project initiatives';
    const m = metricInput.trim() || 'delivering measurable operational improvements';

    return [
      {
        title: 'Action-First (Standard ATS High-Impact)',
        formula: 'Action Verb + What You Did / Project + Quantifiable Result',
        text: `${v} ${p}, ${m}.`
      },
      {
        title: 'Outcome-Driven (Metric-Leading Hook)',
        formula: 'Quantifiable Result + Achieved By + Action Verb + Project',
        text: `Achieved ${m} by ${v.toLowerCase().replace(/ed$/, 'ing')} ${p}.`
      },
      {
        title: 'Context & Method (Senior / Executive Scope)',
        formula: 'Action Verb + Project + Utilizing Best Practices + Delivering Result',
        text: `${v} ${p} to optimize delivery velocity, successfully ${m}.`
      }
    ];
  }, [actionVerb, projectInput, metricInput]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApply = (text: string, id: string) => {
    if (onApplyToResume) {
      onApplyToResume(text);
      setAppliedId(id);
      setTimeout(() => setAppliedId(null), 3000);
    } else {
      // Fallback: save to localStorage and navigate to builder
      try {
        const saved = localStorage.getItem('globecareer_resume_data') || '{}';
        const parsed = JSON.parse(saved);
        if (parsed.experience && parsed.experience.length > 0) {
          if (!parsed.experience[0].bullets) parsed.experience[0].bullets = [];
          parsed.experience[0].bullets.push(text);
          localStorage.setItem('globecareer_resume_data', JSON.stringify(parsed));
        }
      } catch (e) {
        // ignore
      }
      onNavigate('builder');
    }
  };

  // Filter curated phrases
  const filteredPhrases = useMemo(() => {
    return CURATED_PHRASES.filter(item => {
      const matchesSearch = !searchQuery || 
        item.phrase.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.highlightVerb.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCat = selectedCatId === 'all' || item.category === selectedCatId;
      const matchesLevel = filterLevel === 'all' || item.level === filterLevel;

      return matchesSearch && matchesCat && matchesLevel;
    });
  }, [searchQuery, selectedCatId, filterLevel]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
            Interactive Career Wording Tool
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            ATS Action Phrases
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Free Resume Phrase Generator – Power Action Phrases for Every Role
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Stuck writing bullet points or describing your past experience? Generate high-converting, quantifiable resume action phrases calibrated for Applicant Tracking Systems and hiring managers. Choose a category, customize key metrics, or copy from 80+ curated phrases.
        </p>
      </div>

      {/* Main Interactive Customizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Controls (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <h2 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
                1. Select Competency & Power Verb
              </h2>
            </div>
            <button
              type="button"
              onClick={() => handleSelectCategory(activeCategory)}
              className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
          </div>

          {/* Category Selector Pills */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Core Competency / Skill Area
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PHRASE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                    selectedCatId === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <div className="font-bold line-clamp-1">{cat.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Verb Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Select Lead Action Verb
            </label>
            <div className="flex flex-wrap gap-1.5">
              {activeCategory.verbs.map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setActionVerb(v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    actionVerb === v
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Project / Scope Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
              <span>What did you lead, build, or manage? (Scope & Context)</span>
            </label>
            <input
              type="text"
              value={projectInput}
              onChange={e => setProjectInput(e.target.value)}
              placeholder="e.g. distributed microservices API and asynchronous data pipelines"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Metric / Quantifiable Result Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
              <span>Quantifiable Result / Metric Impact ($ revenue, % efficiency, team size)</span>
            </label>
            <input
              type="text"
              value={metricInput}
              onChange={e => setMetricInput(e.target.value)}
              placeholder="e.g. reducing server response latency by 48% across 12M daily customer requests"
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

        </div>

        {/* Right Output Variations (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-neutral-900 text-white p-6 rounded-3xl space-y-5 border border-neutral-800 shadow-md">
            
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-neutral-100">
                  Generated Resume Phrases
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                Live Output
              </span>
            </div>

            <div className="space-y-4">
              {generatedVariations.map((v, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2.5 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-400 text-[11px]">{v.title}</span>
                  </div>
                  <p className="text-xs text-neutral-200 leading-relaxed font-sans font-medium">
                    {v.text}
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-neutral-800/60">
                    <button
                      type="button"
                      onClick={() => handleCopy(v.text, `gen_${idx}`)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold text-neutral-300 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedId === `gen_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === `gen_${idx}` ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApply(v.text, `gen_${idx}`)}
                      className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-[11px] font-bold text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <BookmarkPlus className="w-3 h-3" />
                      <span>{appliedId === `gen_${idx}` ? 'Added!' : 'Add to Resume'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resume Builder Callout */}
            <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 space-y-2 text-xs">
              <div className="font-bold text-neutral-200">Export Directly to Your CV</div>
              <p className="text-neutral-400 text-[11px]">
                Import these phrases into GlobeCareer's ATS-compliant Resume Builder for 40+ country formats with instant PDF and Word DOCX downloads.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('builder')}
                className="w-full mt-2 py-2 px-3 bg-white hover:bg-neutral-100 text-neutral-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Open Resume Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Curated Phrase Library */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100">
              Browse 80+ Pre-Tested Resume Phrases by Seniority & Function
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Filter by experience level and competency to find the exact wording for your industry.
            </p>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-500">Level:</span>
            {['all', 'junior', 'mid', 'senior', 'executive'].map(lvl => (
              <button
                key={lvl}
                type="button"
                onClick={() => setFilterLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  filterLevel === lvl
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-bold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search phrases by keyword, metric, or role (e.g. 'kubernetes', 'arr', 'turnover', 'tableau')..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phrases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPhrases.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2.5 flex flex-col justify-between hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-blue-600 dark:text-blue-400 capitalize">
                    {item.category} • {item.level}
                  </span>
                  <span className="text-neutral-400 font-mono text-[10px]">
                    Verb: {item.highlightVerb}
                  </span>
                </div>
                <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
                  {item.phrase}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200/50 dark:border-neutral-800/60">
                <button
                  type="button"
                  onClick={() => handleCopy(item.phrase, item.id)}
                  className="px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[11px] font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleApply(item.phrase, item.id)}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <BookmarkPlus className="w-3 h-3" />
                  <span>Insert to Builder</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Educational Guide: Writing High-Impact Resume Phrases */}
      <div className="p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Recruiter Formula
          </span>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            How to Transform Weak Job Responsibilities into High-Impact Phrases
          </h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            Applicant Tracking Systems and executive recruiters discard passive duty listings. Compare the difference below:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-2xl space-y-2">
            <div className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>✕ Weak / Passive Duty (Avoid)</span>
            </div>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono">
              "Responsible for managing social media accounts, writing weekly newsletters, and assisting marketing team with campaigns."
            </p>
            <p className="text-[11px] text-neutral-500">
              Why it fails: Contains no metrics, uses the passive phrase "responsible for", and gives zero sense of business impact.
            </p>
          </div>

          <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl space-y-2">
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>✓ Strong Action Phrase (Recommended)</span>
            </div>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono">
              "Scaled organic LinkedIn follower base by 320% (from 12k to 51k) and drove 14,000 monthly blog visits by producing 8 data-driven technical whitepapers."
            </p>
            <p className="text-[11px] text-neutral-500">
              Why it wins: Leads with a power verb ("Scaled"), quantifies exact baseline and growth, and identifies the exact deliverable.
            </p>
          </div>
        </div>

        {/* Cross-linking to related tools */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <h4 className="text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-3">
            Related Resume Writing & Optimization Tools:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => onNavigate('resume-bullet-generator')}
              className="p-3 text-left rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-colors"
            >
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400">Resume Bullet Point Generator</div>
              <p className="text-[11px] text-neutral-500 mt-0.5">Use the Google X-Y-Z formula for full work history bullet points.</p>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('summary-generator')}
              className="p-3 text-left rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-colors"
            >
              <div className="text-xs font-bold text-teal-600 dark:text-teal-400">Resume Summary Generator</div>
              <p className="text-[11px] text-neutral-500 mt-0.5">Generate your 3-4 sentence professional profile statement.</p>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('resume-skills')}
              className="p-3 text-left rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-colors"
            >
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400">Resume Skills Matrix</div>
              <p className="text-[11px] text-neutral-500 mt-0.5">Browse categorized hard and soft skills for 14 major industries.</p>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
