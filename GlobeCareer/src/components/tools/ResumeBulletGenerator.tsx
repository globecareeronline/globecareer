import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Award,
  Layers,
  Zap,
  Target,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ResumeBulletGeneratorProps {
  onNavigate: (page: string) => void;
  onStartBuilder?: () => void;
}

type FormulaType = 'google_xyz' | 'par' | 'metric_first' | 'cost_reduction';

interface IndustryPreset {
  id: string;
  name: string;
  defaultAction: string;
  defaultTask: string;
  defaultMetric: string;
  defaultMethod: string;
  recommendedVerbs: string[];
}

const PRESETS: IndustryPreset[] = [
  {
    id: 'software',
    name: 'Software Engineering & Cloud',
    defaultAction: 'Engineered',
    defaultTask: 'distributed microservices API architecture',
    defaultMetric: 'reducing API response latency by 42% across 14M daily requests',
    defaultMethod: 'using Node.js, Redis caching, and AWS Lambda serverless pipelines',
    recommendedVerbs: ['Engineered', 'Architected', 'Spearheaded', 'Optimized', 'Automated', 'Deployed', 'Refactored']
  },
  {
    id: 'product',
    name: 'Product Management',
    defaultAction: 'Spearheaded',
    defaultTask: 'the end-to-end launch of a self-serve onboarding flow',
    defaultMetric: 'increasing 30-day user activation by 28% and ARR by $1.8M',
    defaultMethod: 'by conducting user telemetry analysis and iterating weekly A/B experiment loops',
    recommendedVerbs: ['Spearheaded', 'Orchestrated', 'Delivered', 'Mobilized', 'Prioritized', 'Validated', 'Scaled']
  },
  {
    id: 'sales',
    name: 'Sales & Business Development',
    defaultAction: 'Surpassed',
    defaultTask: 'annual B2B enterprise software quota',
    defaultMetric: 'delivering 138% of plan ($3.4M in closed contracts)',
    defaultMethod: 'by prospecting 85+ Fortune 1000 accounts through multi-channel executive outreach',
    recommendedVerbs: ['Surpassed', 'Negotiated', 'Closed', 'Generated', 'Expanded', 'Secured', 'Accelerated']
  },
  {
    id: 'marketing',
    name: 'Marketing & Growth',
    defaultAction: 'Scaled',
    defaultTask: 'organic search traffic and inbound lead generation',
    defaultMetric: 'from 25,000 to 180,000 monthly visitors (620% increase) within 8 months',
    defaultMethod: 'by implementing programmatic SEO clusters, technical schema audits, and backlink outreach',
    recommendedVerbs: ['Scaled', 'Amplified', 'Executed', 'Optimized', 'Cultivated', 'Launched', 'Revitalized']
  },
  {
    id: 'finance',
    name: 'Finance & Accounting',
    defaultAction: 'Streamlined',
    defaultTask: 'the monthly financial close and consolidation workflow',
    defaultMetric: 'shortening the reporting cycle from 9 business days to 3 days',
    defaultMethod: 'by automating general ledger reconciliations and ERP integrations in NetSuite',
    recommendedVerbs: ['Streamlined', 'Consolidated', 'Forecasted', 'Audited', 'Standardized', 'Benchmarked', 'Restructured']
  },
  {
    id: 'operations',
    name: 'Operations & Logistics',
    defaultAction: 'Realigned',
    defaultTask: 'warehouse fulfillment routing and inventory management',
    defaultMetric: 'cutting fulfillment error rates by 64% and saving $220,000 in freight expenses',
    defaultMethod: 'through lean Six Sigma workflow redesign and barcode automation',
    recommendedVerbs: ['Realigned', 'Overhauled', 'Coordinated', 'Eliminated', 'Maximized', 'Standardized', 'Slashed']
  },
  {
    id: 'customer_success',
    name: 'Customer Success & Support',
    defaultAction: 'Elevated',
    defaultTask: 'enterprise customer satisfaction (CSAT) scores',
    defaultMetric: 'from 81% to 96% while reducing first-response time by 45%',
    defaultMethod: 'by authoring a 60-article knowledge base and training 12 tier-1 support agents',
    recommendedVerbs: ['Elevated', 'Resolved', 'Retained', 'Advocated', 'Coached', 'Facilitated', 'Standardized']
  }
];

const CURATED_BULLETS = [
  { role: 'Senior Software Engineer', bullet: 'Architected event-driven microservices ingestion pipeline handling 18M daily records with 99.99% uptime using TypeScript, Kafka, and PostgreSQL.' },
  { role: 'DevOps / Cloud Engineer', bullet: 'Automated CI/CD deployment workflows with GitHub Actions and Terraform, shrinking developer deployment time from 45 minutes to 7 minutes.' },
  { role: 'Product Manager', bullet: 'Spearheaded conversion rate optimization across checkout funnels, generating a $2.4M ARR increase and a 19% boost in checkout completions.' },
  { role: 'Digital Marketer', bullet: 'Managed $650,000 annual paid media budget across Google and Meta, generating 4.8x ROAS and acquiring 14,000 net-new paid subscriptions.' },
  { role: 'Financial Analyst', bullet: 'Constructed multi-scenario DCF valuation and variance models for 3 corporate acquisitions totaling $42M in enterprise value.' },
  { role: 'Data Scientist', bullet: 'Engineered predictive customer churn classification model in Python (XGBoost), enabling targeted retention campaigns that preserved $850k in recurring revenue.' },
  { role: 'HR & Talent Lead', bullet: 'Overhauled full-lifecycle recruitment for 85 technical roles across 4 countries, lowering average time-to-hire by 32% (from 58 to 39 days).' },
  { role: 'Executive Assistant', bullet: 'Coordinated complex international travel, calendar scheduling, and board meeting logistics across 6 time zones for C-suite executive leadership.' }
];

export const ResumeBulletGenerator: React.FC<ResumeBulletGeneratorProps> = ({
  onNavigate,
  onStartBuilder
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('software');
  const [formula, setFormula] = useState<FormulaType>('google_xyz');

  const [actionVerb, setActionVerb] = useState<string>('Engineered');
  const [taskDescription, setTaskDescription] = useState<string>('distributed microservices API architecture');
  const [metricImpact, setMetricImpact] = useState<string>('reducing API response latency by 42% across 14M daily requests');
  const [methodTool, setMethodTool] = useState<string>('using Node.js, Redis caching, and AWS Lambda serverless pipelines');

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const activePreset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];

  const handleSelectPreset = (preset: IndustryPreset) => {
    setSelectedPresetId(preset.id);
    setActionVerb(preset.defaultAction);
    setTaskDescription(preset.defaultTask);
    setMetricImpact(preset.defaultMetric);
    setMethodTool(preset.defaultMethod);
  };

  // Generate 4 distinct bullet variations
  const generatedBullets = useMemo(() => {
    const verb = actionVerb.trim();
    const task = taskDescription.trim();
    const metric = metricImpact.trim();
    const method = methodTool.trim();

    if (!verb || !task) {
      return [];
    }

    // Clean punctuation
    const cleanVerb = verb.charAt(0).toUpperCase() + verb.slice(1);
    const cleanTask = task.replace(/\.$/, '');
    const cleanMetric = metric ? metric.replace(/\.$/, '') : '';
    const cleanMethod = method ? method.replace(/\.$/, '') : '';

    const variations = [
      {
        title: 'Google X-Y-Z Formula (Accomplished [X] as measured by [Y], by doing [Z])',
        badge: 'Recommended by Google Recruiters',
        text: cleanMetric && cleanMethod 
          ? `${cleanVerb} ${cleanTask}, ${cleanMetric}, ${cleanMethod}.`
          : cleanMetric 
            ? `${cleanVerb} ${cleanTask}, ${cleanMetric}.`
            : `${cleanVerb} ${cleanTask} ${cleanMethod}.`
      },
      {
        title: 'Metric-First (Executive / High-Impact Style)',
        badge: 'Top Choice for Senior & Executive Roles',
        text: cleanMetric && cleanMethod
          ? `${cleanMetric.charAt(0).toUpperCase() + cleanMetric.slice(1)} by ${cleanVerb.toLowerCase()} ${cleanTask} ${cleanMethod}.`
          : `${cleanVerb} ${cleanTask}, achieving ${cleanMetric || 'superior performance'}.`
      },
      {
        title: 'Action-Method-Result (Technical / Engineering Standard)',
        badge: 'Ideal for Technical & Operations Roles',
        text: cleanMethod && cleanMetric
          ? `${cleanVerb} ${cleanTask} through ${cleanMethod.replace(/^(using|by|through)\s+/i, '')}, directly ${cleanMetric}.`
          : `${cleanVerb} ${cleanTask} ${cleanMethod}.`
      },
      {
        title: 'Concise 1-Line ATS Bullet',
        badge: 'Best for 1-Page Resume Layouts',
        text: `${cleanVerb} ${cleanTask}${cleanMetric ? `, ${cleanMetric}` : ''}.`
      }
    ];

    return variations;
  }, [actionVerb, taskDescription, metricImpact, methodTool]);

  // Quality check score
  const qualityCheck = useMemo(() => {
    let score = 0;
    const feedback: string[] = [];

    if (actionVerb.trim().length > 2) {
      score += 25;
      feedback.push('Starts with strong active verb');
    }
    if (taskDescription.trim().length > 10) {
      score += 25;
      feedback.push('Specific initiative or project identified');
    }
    if (/\d+|%|\$|saved|increased|reduced|boosted/i.test(metricImpact)) {
      score += 30;
      feedback.push('Quantifiable metric included (%, $, numbers)');
    } else {
      feedback.push('Missing quantifiable metric (e.g. 25%, $100k, 12 hours)');
    }
    if (methodTool.trim().length > 10) {
      score += 20;
      feedback.push('Context, methodology, or tooling specified');
    }

    return { score, feedback };
  }, [actionVerb, taskDescription, metricImpact, methodTool]);

  const handleCopyBullet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleStartResume = () => {
    if (onStartBuilder) {
      onStartBuilder();
    } else {
      onNavigate('builder');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-blue-600 transition-colors"
            >
              GlobeCareer
            </button>
            <span>/</span>
            <span className="text-neutral-700 dark:text-neutral-300">Free Career Tools</span>
            <span>/</span>
            <span className="text-blue-600 dark:text-blue-400">Resume Bullet Point Generator</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white">
                Resume Bullet Point &amp; Impact Generator
              </h1>
              <p className="mt-1 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl">
                Transform ordinary job duties into high-impact, quantifiable accomplishment bullets using the Google X-Y-Z formula. Built for ATS parsers and hiring managers.
              </p>
            </div>

            <button
              onClick={handleStartResume}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 shrink-0"
            >
              <span>Build ATS Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Industry Presets Carousel */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            Select Your Field for Instant Industry Templates:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedPresetId === preset.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Builder Form & Live Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Form: Step-by-Step Inputs (5 Cols) */}
          <div className="lg:col-span-5 space-y-5 p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
                  Bullet Point Builder
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleSelectPreset(activePreset)}
                className="text-xs text-neutral-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                title="Reset to preset defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Step 1: Action Verb */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                1. Power Action Verb
              </label>
              <input
                type="text"
                value={actionVerb}
                onChange={(e) => setActionVerb(e.target.value)}
                placeholder="e.g. Spearheaded, Engineered, Generated..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activePreset.recommendedVerbs.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setActionVerb(v)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                      actionVerb.toLowerCase() === v.toLowerCase()
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Task or Initiative */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                2. What Did You Do? (Initiative / Project)
              </label>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="e.g. distributed microservices API architecture"
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Step 3: Quantifiable Impact */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                  3. Quantifiable Impact / Metric
                </label>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">Crucial for ATS</span>
              </div>
              <textarea
                value={metricImpact}
                onChange={(e) => setMetricImpact(e.target.value)}
                placeholder="e.g. reducing API latency by 42% across 14M daily requests"
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Step 4: Tools & Methodology */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                4. Tools, Frameworks, or Strategy Used
              </label>
              <textarea
                value={methodTool}
                onChange={(e) => setMethodTool(e.target.value)}
                placeholder="e.g. using Node.js, Redis caching, and AWS Lambda"
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Strength Meter */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">Bullet Strength Score</span>
                <span className={qualityCheck.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}>
                  {qualityCheck.score}% / 100%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    qualityCheck.score >= 80 
                      ? 'bg-emerald-500' 
                      : qualityCheck.score >= 50 
                        ? 'bg-amber-500' 
                        : 'bg-rose-500'
                  }`}
                  style={{ width: `${qualityCheck.score}%` }}
                />
              </div>
              <ul className="text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1 pt-1">
                {qualityCheck.feedback.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    {qualityCheck.score >= 80 || item.includes('Included') || item.includes('Starts') || item.includes('Specific') ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Outputs: Generated Bullet Variations (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
                  Generated ATS Bullet Points
                </h3>
              </div>
              <span className="text-xs text-neutral-500 font-medium">Click any bullet to copy</span>
            </div>

            {/* Generated Variation Cards */}
            <div className="space-y-4">
              {generatedBullets.map((b, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      {b.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                      {b.badge}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/70 dark:border-neutral-700/70 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
                    • {b.text}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-neutral-400">
                      Word Count: {b.text.split(/\s+/).length} words
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyBullet(`• ${b.text}`, idx)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          copiedIndex === idx
                            ? 'bg-emerald-600 text-white'
                            : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                        }`}
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy Bullet'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleStartResume}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                      >
                        <span>Insert in Resume</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Google X-Y-Z Callout Box */}
            <div className="p-5 rounded-3xl bg-neutral-900 text-white space-y-2 border border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>The Google X-Y-Z Formula Explained</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Made famous by former SVP of People Operations at Google Laszlo Bock: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>. Never just write what you were tasked with; write what the outcome was and how it was measured.
              </p>
            </div>

          </div>

        </div>

        {/* Curated Library of 8 Role Bullets */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">
                Proven Resume Bullet Point Examples by Profession
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Study these high-converting bullets for ideas on phrasing, metric density, and active voice.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hidden sm:inline">
              8 Real-World Examples
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CURATED_BULLETS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-600 dark:text-blue-400">{item.role}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyBullet(item.bullet, idx + 10)}
                    className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 flex items-center gap-1 text-[11px]"
                  >
                    {copiedIndex === idx + 10 ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIndex === idx + 10 ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-mono">
                  {item.bullet}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
          <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
            Frequently Asked Questions: How to Write Resume Bullet Points
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                How many bullet points should I have per job?
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                For your most recent or relevant role, include <strong>4 to 6 high-impact bullets</strong>. For older roles (3–7 years ago), 3 to 4 bullets are sufficient. For roles over 7 years ago, condense into 2 bullets or a brief summary line.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                What if my job didn't have measurable numbers?
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                You can almost always estimate scale or frequency: team size ("mentored 4 junior engineers"), volume handled ("processed 60+ weekly invoices"), speed/time saved ("shaved 3 hours off the weekly review"), or adoption ("utilized by 40 internal stakeholders").
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                Should resume bullets end with a period?
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Consistency is key. Modern resume formatting conventions recommend ending bullet points with a period if they form a full sentence or express a complete thought, which Google X-Y-Z bullets do.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                Why should I avoid "Responsible for..."?
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                "Responsible for" merely states your job description—what you were supposed to do. Employers want to know what you actually achieved and improved. Strong action verbs like "spearheaded", "accelerated", or "engineered" immediately signal proactive ownership.
              </p>
            </div>
          </div>
        </div>

        {/* Related Career Tools & Guides Hub (Topical Authority Cluster) */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
          <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
            Recommended Resume Writing & Optimization Tools
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Polish your accomplishment bullets and ensure your full resume meets global recruitment standards:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => onNavigate('resume-word-counter')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Interactive Tool</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Resume Word Counter
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Audit length, page-fit ratio, and action verb density in real-time.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('resume-writing-guide')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">Pillar Guide</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Resume Writing Guide
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Step-by-step frameworks for work experience, summaries, and impact metrics.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('resume-skills')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">Keywords & Skills</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Resume Skills Matrix
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Hard and soft skills categorized by 14 international industry domains.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('ats-checker')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">ATS Scanner</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                ATS Resume Checker
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Scan your final resume against target job descriptions for parser pass rates.
              </p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
