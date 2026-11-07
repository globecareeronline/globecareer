import React, { useState, useMemo } from 'react';
import {
  FileText,
  Clock,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Lightbulb,
  Zap,
  BookOpen,
  Info
} from 'lucide-react';

interface ResumeWordCounterProps {
  onNavigate: (page: string) => void;
  onStartBuilder?: () => void;
}

const POWER_ACTION_VERBS = new Set([
  'spearheaded', 'orchestrated', 'architected', 'engineered', 'streamlined', 'accelerated',
  'optimized', 'pioneered', 'implemented', 'transformed', 'delivered', 'generated',
  'amplified', 'boosted', 'curated', 'negotiated', 'formulated', 'mobilized',
  'consolidated', 'modernized', 'revitalized', 'devised', 'surpassed', 'capitalized',
  'executed', 'standardized', 'championed', 'deployed', 'automated', 'scaled',
  'authored', 'navigated', 'integrated', 'maximized', 'minimized', 'realigned',
  'restructured', 'supervised', 'directed', 'founded', 'established', 'initiated',
  'resolved', 'secured', 'upgraded', 'expanded', 'centralized', 'cultivated',
  'produced', 'benchmarked', 'diagnosed', 'coached', 'facilitated', 'drove'
]);

const BUZZWORDS_AND_CLICHES = [
  { phrase: 'responsible for', tip: 'Passive phrasing. Replace with an active verb like "Directed", "Executed", or "Managed".' },
  { phrase: 'duties included', tip: 'Describes a job specification rather than your accomplishments. Lead with results instead.' },
  { phrase: 'hard-working', tip: 'Subjective claim. Demonstrate your work ethic through measurable achievements.' },
  { phrase: 'hard working', tip: 'Subjective claim. Demonstrate your work ethic through measurable achievements.' },
  { phrase: 'team player', tip: 'Overused buzzword. Show collaboration by mentioning cross-functional initiatives and team size.' },
  { phrase: 'go-getter', tip: 'Informal slang. Replace with "self-directed", "initiated", or "spearheaded".' },
  { phrase: 'think outside the box', tip: 'Cliché. Highlight a specific novel solution, patent, or design you created.' },
  { phrase: 'synergy', tip: 'Corporate jargon. Specify the exact business benefits or workflow alignments achieved.' },
  { phrase: 'results-driven', tip: 'Empty claim unless paired immediately with numerical data (%, $, hours saved).' },
  { phrase: 'results driven', tip: 'Empty claim unless paired immediately with numerical data (%, $, hours saved).' },
  { phrase: 'detail-oriented', tip: 'Show, don\'t tell. Prove precision through error-rate reduction or compliance accuracy.' },
  { phrase: 'detail oriented', tip: 'Show, don\'t tell. Prove precision through error-rate reduction or compliance accuracy.' },
  { phrase: 'proven track record', tip: 'Redundant. Your experience section itself is your track record.' },
  { phrase: 'dynamic', tip: 'Vague adjective. Describe your actual scope, speed of delivery, or adaptability.' },
  { phrase: 'fast learner', tip: 'Expected standard for all candidates. Highlight rapid onboarding or certifications instead.' }
];

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing',
  'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t',
  'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if',
  'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s',
  'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re',
  'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t',
  'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s',
  'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t',
  'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself',
  'yourselves'
]);

const SAMPLE_ENTRY = `ALEXA CHEN
alexa.chen@example.com | (555) 234-5678 | San Francisco, CA | linkedin.com/in/alexachen

PROFESSIONAL SUMMARY
Motivated Software Engineering graduate from UC Berkeley with hands-on experience in full-stack web development, RESTful APIs, and distributed cloud applications. Proven ability to build production-grade web applications using TypeScript, React, and Python.

EDUCATION
University of California, Berkeley — B.S. in Computer Science (GPA: 3.82)
Relevant Coursework: Data Structures & Algorithms, Database Systems, Cloud Computing, Operating Systems

TECHNICAL SKILLS
Languages: Python, TypeScript, JavaScript, SQL, Java
Frameworks & Libraries: React, Node.js, Express, Next.js, Tailwind CSS
Databases & Cloud: PostgreSQL, MongoDB, AWS (S3, Lambda), Docker, Git

PROJECTS & EXPERIENCE
Full Stack Engineering Intern | Apex Cloud Solutions (June 2025 – August 2025)
• Engineered a real-time event analytics dashboard using React, TypeScript, and WebSockets, reducing page load latency by 34%.
• Spearheaded backend REST API migration from monolithic endpoints to AWS Lambda microservices, decreasing server operating costs by 22%.
• Implemented automated CI/CD pipeline using GitHub Actions, ensuring 99.4% test coverage across 45 repository pull requests.

Campus Collaboration Portal (Lead Developer)
• Architected open-source university collaboration platform utilized by over 1,400 active undergraduate students.
• Integrated PostgreSQL full-text search indexing, accelerating document search retrieval times by 3.2x.
• Deployed Docker containers to AWS ECS with zero downtime deployment configuration.`;

const SAMPLE_MID_TECH = `MARCUS STERLING
marcus.sterling@example.com | +1 (312) 555-0192 | Chicago, IL | github.com/msterling

PROFESSIONAL SUMMARY
Senior Product Manager with 6+ years of experience leading high-velocity B2B SaaS teams. Proven track record of scaling user retention, optimizing recurring revenue funnels, and launching ML-driven workflow products. Led cross-functional squads of 14 engineers and product designers to deliver $8.4M in ARR growth.

CORE COMPETENCIES
Product Strategy, Roadmapping, A/B Testing, User Research, OKR Frameworks, Agile & Scrum, Mixpanel, Amplitude, SQL, Jira, Figma

PROFESSIONAL EXPERIENCE
Lead Product Manager | CloudFlow Analytics | Chicago, IL (2023 – Present)
• Spearheaded end-to-end launch of automated forecasting module, generating $4.2M new ARR within 9 months of release.
• Accelerated customer activation rate by 28% through iterative onboarding experiment loops across 12,000 monthly signups.
• Orchestrated weekly sprint planning and sprint retrospectives for a distributed team of 16 engineers and 3 designers.
• Negotiated vendor SLA terms for external data enrichment APIs, slashing third-party SaaS expenditures by $140,000 annually.

Product Manager | NexaTech Solutions | Chicago, IL (2020 – 2023)
• Directed feature development for enterprise compliance reporting suite adopted by 45 Fortune 500 financial institutions.
• Automated customer feedback sentiment tagging using Python NLP scripts, shortening product discovery cycle from 6 weeks to 10 days.
• Modernized billing and self-serve upgrade flows, boosting monthly checkout conversion rate from 3.1% to 5.4%.
• Mentored 3 associate product managers in metric instrumentation, SQL query optimization, and user interview methodologies.

EDUCATION & CERTIFICATIONS
University of Illinois Urbana-Champaign — B.S. in Industrial Engineering
Certified Scrum Product Owner (CSPO) | Pragmatic Institute Certified (PMC-III)`;

export const ResumeWordCounter: React.FC<ResumeWordCounterProps> = ({
  onNavigate,
  onStartBuilder
}) => {
  const [text, setText] = useState<string>(SAMPLE_MID_TECH);
  const [copied, setCopied] = useState<boolean>(false);

  // Analysis computations
  const analysis = useMemo(() => {
    const raw = text.trim();
    if (!raw) {
      return {
        words: 0,
        charactersWithSpaces: 0,
        charactersNoSpaces: 0,
        scanTimeSec: 0,
        readTimeMin: 0,
        bulletsCount: 0,
        avgWordsPerBullet: 0,
        actionVerbsFound: [] as { verb: string; count: number }[],
        actionVerbDensity: 0,
        clichesFound: [] as { phrase: string; tip: string; count: number }[],
        topKeywords: [] as { word: string; count: number }[],
        pageEstimate: 'empty',
        pageRecommendation: 'Paste or type your resume to see real-time length and word count benchmarks.'
      };
    }

    // Words
    const wordList = raw.split(/\s+/).filter(Boolean);
    const words = wordList.length;

    // Characters
    const charactersWithSpaces = raw.length;
    const charactersNoSpaces = raw.replace(/\s/g, '').length;

    // Reading time: Recruiter scan avg ~7.4s; In-depth read ~220 words per minute
    const readTimeMin = +(words / 220).toFixed(1);
    const scanTimeSec = 7.4;

    // Bullets
    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
    const bulletLines = lines.filter(line => /^[•\-\*⁃–—]|\d+\.\s/.test(line));
    const bulletsCount = bulletLines.length;
    let avgWordsPerBullet = 0;
    if (bulletsCount > 0) {
      const totalBulletWords = bulletLines.reduce((acc, line) => {
        const cleaned = line.replace(/^[•\-\*⁃–—]|\d+\.\s/, '').trim();
        return acc + cleaned.split(/\s+/).filter(Boolean).length;
      }, 0);
      avgWordsPerBullet = Math.round(totalBulletWords / bulletsCount);
    }

    // Action Verbs
    const verbCounts: Record<string, number> = {};
    let totalActionVerbs = 0;
    wordList.forEach(w => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '');
      if (POWER_ACTION_VERBS.has(clean)) {
        verbCounts[clean] = (verbCounts[clean] || 0) + 1;
        totalActionVerbs++;
      }
    });

    const actionVerbsFound = Object.entries(verbCounts)
      .map(([verb, count]) => ({ verb, count }))
      .sort((a, b) => b.count - a.count);

    const actionVerbDensity = words > 0 ? +((totalActionVerbs / words) * 100).toFixed(1) : 0;

    // Cliches and buzzwords
    const lowerRaw = raw.toLowerCase();
    const clichesFound: { phrase: string; tip: string; count: number }[] = [];
    BUZZWORDS_AND_CLICHES.forEach(item => {
      const regex = new RegExp(`\\b${item.phrase.replace('-', '[- ]')}\\b`, 'gi');
      const matches = lowerRaw.match(regex);
      if (matches && matches.length > 0) {
        clichesFound.push({
          phrase: item.phrase,
          tip: item.tip,
          count: matches.length
        });
      }
    });

    // Top repeated keywords (excluding stop words)
    const freqMap: Record<string, number> = {};
    wordList.forEach(w => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (clean.length > 2 && !STOP_WORDS.has(clean) && !/^\d+$/.test(clean)) {
        freqMap[clean] = (freqMap[clean] || 0) + 1;
      }
    });
    const topKeywords = Object.entries(freqMap)
      .map(([word, count]) => ({ word, count }))
      .filter(item => item.count >= 2)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Page classification
    let pageEstimate: 'too_short' | 'one_page' | 'two_pages' | 'too_long' = 'one_page';
    let pageRecommendation = '';

    if (words < 300) {
      pageEstimate = 'too_short';
      pageRecommendation = 'Under 300 words. Your resume likely lacks sufficient quantifiable impact, skills, or context. Recruiters may perceive this as incomplete.';
    } else if (words <= 520) {
      pageEstimate = 'one_page';
      pageRecommendation = 'Optimal 1-Page Resume (300–520 words). Ideal for candidates with 0–7 years of experience. Fits cleanly on standard US Letter / A4 without awkward trailing lines.';
    } else if (words <= 950) {
      pageEstimate = 'two_pages';
      pageRecommendation = 'Optimal 2-Page Resume (550–950 words). Recommended for senior professionals, managers, and specialists with 8+ years of career progression.';
    } else {
      pageEstimate = 'too_long';
      pageRecommendation = 'Over 950 words. Risk of spilling into a 3rd page or overwhelming recruiters. Over 80% of hiring managers disregard third pages in corporate hiring.';
    }

    return {
      words,
      charactersWithSpaces,
      charactersNoSpaces,
      scanTimeSec,
      readTimeMin,
      bulletsCount,
      avgWordsPerBullet,
      actionVerbsFound,
      actionVerbDensity,
      clichesFound,
      topKeywords,
      pageEstimate,
      pageRecommendation
    };
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <span className="text-blue-600 dark:text-blue-400">Resume Word Counter</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 dark:text-white">
                Resume Word Counter &amp; Length Analyzer
              </h1>
              <p className="mt-1 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl">
                Analyze your resume word count, reading time, action verb density, and page fit. Instant real-time feedback aligned with 2026 recruiter scan standards.
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

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. Words */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Words</span>
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-neutral-900 dark:text-white">
              {analysis.words.toLocaleString()}
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">
              {analysis.words <= 520 ? '1-Page Target: 350-500' : '2-Page Target: 550-900'}
            </div>
          </div>

          {/* 2. Page Fit */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Page Fit</span>
              <Layers className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-xl font-black capitalize text-neutral-900 dark:text-white">
              {analysis.pageEstimate === 'one_page' && <span className="text-emerald-600 dark:text-emerald-400">1 Page</span>}
              {analysis.pageEstimate === 'two_pages' && <span className="text-blue-600 dark:text-blue-400">2 Pages</span>}
              {analysis.pageEstimate === 'too_short' && <span className="text-amber-500">&lt; 1 Page</span>}
              {analysis.pageEstimate === 'too_long' && <span className="text-rose-500">3+ Pages</span>}
              {analysis.pageEstimate === 'empty' && '—'}
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">
              US Letter &amp; A4 Formats
            </div>
          </div>

          {/* 3. Reading Time */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Read Time</span>
              <Clock className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-neutral-900 dark:text-white">
              {analysis.readTimeMin} <span className="text-xs font-semibold text-neutral-500">min</span>
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">
              Recruiter Scan: ~7.4s
            </div>
          </div>

          {/* 4. Bullets Count */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Bullets</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-neutral-900 dark:text-white">
              {analysis.bulletsCount}
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">
              Avg {analysis.avgWordsPerBullet} words/bullet
            </div>
          </div>

          {/* 5. Action Verbs */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Action Verbs</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-neutral-900 dark:text-white">
              {analysis.actionVerbsFound.reduce((a, b) => a + b.count, 0)}
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">
              Density: {analysis.actionVerbDensity}%
            </div>
          </div>

          {/* 6. Characters */}
          <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Characters</span>
              <Sparkles className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-2xl font-black text-neutral-900 dark:text-white">
              {analysis.charactersNoSpaces.toLocaleString()}
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">
              {analysis.charactersWithSpaces.toLocaleString()} w/ spaces
            </div>
          </div>
        </div>

        {/* Page Fit Advice Banner */}
        <div className={`p-4 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm ${
          analysis.pageEstimate === 'one_page' || analysis.pageEstimate === 'two_pages'
            ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
        }`}>
          {analysis.pageEstimate === 'one_page' || analysis.pageEstimate === 'two_pages' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-bold">
              {analysis.pageEstimate === 'one_page' && 'Well-Calibrated 1-Page Resume'}
              {analysis.pageEstimate === 'two_pages' && 'Well-Calibrated 2-Page Resume'}
              {analysis.pageEstimate === 'too_short' && 'Resume Appears Too Brief'}
              {analysis.pageEstimate === 'too_long' && 'Resume Length Warning: May Exceed 2 Pages'}
            </div>
            <div className="text-xs opacity-90 mt-0.5">{analysis.pageRecommendation}</div>
          </div>
        </div>

        {/* Main Workspace: Text Area & Side Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Editor Area (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Paste or Edit Your Resume Content
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setText(SAMPLE_ENTRY)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-neutral-200/80 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                >
                  Entry-Level Sample
                </button>
                <button
                  type="button"
                  onClick={() => setText(SAMPLE_MID_TECH)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-neutral-200/80 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                >
                  Mid-Level Sample
                </button>
                <button
                  type="button"
                  onClick={() => setText('')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Clear text"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the full text of your resume here to calculate word count, bullet lengths, reading time, action verb ratio, and ATS buzzwords..."
                rows={18}
                className="w-full p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs sm:text-sm leading-relaxed resize-y shadow-inner text-neutral-800 dark:text-neutral-200"
              />
              
              <div className="absolute right-3 bottom-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-semibold transition-colors shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Quick helper note */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <Info className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Tip: Include your full name, contact, summary, experience, education, and skills for an accurate page length simulation.</span>
            </div>
          </div>

          {/* Diagnostic Sidebar (1 Col) */}
          <div className="space-y-4">
            
            {/* Clichés & Passive Phrases Box */}
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                    Clichés &amp; Buzzwords
                  </h3>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  analysis.clichesFound.length === 0 
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                }`}>
                  {analysis.clichesFound.length} Detected
                </span>
              </div>

              {analysis.clichesFound.length === 0 ? (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>No passive clichés or fluff phrases detected! Clean, professional copy.</span>
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {analysis.clichesFound.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-amber-900 dark:text-amber-200">
                        <span className="capitalize">"{item.phrase}"</span>
                        <span className="text-[10px] text-amber-600 dark:text-amber-400">×{item.count}</span>
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-300">{item.tip}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Verbs Found Box */}
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                    Power Action Verbs
                  </h3>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {analysis.actionVerbsFound.length} Distinct
                </span>
              </div>

              {analysis.actionVerbsFound.length === 0 ? (
                <p className="text-xs text-neutral-500">
                  No high-impact action verbs detected yet. Try leading your bullet points with verbs like <em>spearheaded, engineered, accelerated,</em> or <em>streamlined</em>.
                </p>
              ) : (
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                  {analysis.actionVerbsFound.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-[11px] font-semibold text-blue-700 dark:text-blue-300"
                    >
                      {item.verb} {item.count > 1 && <span className="opacity-70">({item.count})</span>}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Top Recurring Keywords */}
            <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                    Top Recurring Terms
                  </h3>
                </div>
                <span className="text-[11px] text-neutral-500">ATS Density</span>
              </div>

              {analysis.topKeywords.length === 0 ? (
                <p className="text-xs text-neutral-500">No repeated terms found.</p>
              ) : (
                <div className="space-y-1.5">
                  {analysis.topKeywords.slice(0, 6).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="font-medium text-neutral-700 dark:text-neutral-300 capitalize">{item.word}</span>
                      <span className="font-mono text-[11px] text-neutral-500">{item.count}×</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-3 shadow-lg">
              <h4 className="font-bold text-sm">Need a Guaranteed 1-Page or 2-Page Layout?</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                Our free Builder automatically formats margins, line height, and section padding to fit your resume seamlessly on one or two pages.
              </p>
              <button
                type="button"
                onClick={handleStartResume}
                className="w-full py-2.5 rounded-xl bg-white text-blue-700 hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Open Resume Builder
              </button>
            </div>

          </div>
        </div>

        {/* Comprehensive SEO Guidance & FAQ Section */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white">
              How Many Words Should a Resume Be? (2026 Standards)
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Recruiter benchmarks, ATS character parsing limits, and page-by-page word count guidelines across North America, the UK, and Europe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 font-black">
                1
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                1-Page Resume (350–500 Words)
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Who it is for:</strong> Recent graduates, entry-level job seekers, and professionals with under 7 years of work experience.
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Over 72% of recruiters in the US and Canada expect a concise single-page resume for early and mid-career positions. Under 350 words looks sparse; over 550 words causes trailing lines to spill over onto an awkward 2nd page.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 font-black">
                2
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                2-Page Resume (600–950 Words)
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Who it is for:</strong> Senior professionals, engineering leads, managers, directors, and executives with 8+ years of career history.
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Also the default standard for standard corporate CVs in the UK, Germany, and across Europe. Ensure your 2nd page fills at least 70% of the page so it does not look like an afterthought.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 font-black">
                3+
              </div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                3+ Page CV (Academic &amp; Medical Only)
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <strong>Who it is for:</strong> Academic researchers, medical doctors, university professors, and scientists listing publications, grants, and clinical trials.
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                For commercial corporate applications, 3-page resumes have an 84% higher recruiter drop-off rate. Always condense commercial resumes to 1 or 2 pages maximum.
              </p>
            </div>
          </div>

          {/* Section: Ideal Bullet Length Formula */}
          <div className="p-6 rounded-3xl bg-neutral-900 text-white space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span>The Ideal Resume Bullet Point Length Formula</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Aim for 12 to 20 Words Per Bullet Point
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Bullets under 8 words tend to be passive job descriptions ("Maintained server database"), whereas bullets over 28 words cause recruiter eye fatigue. The highest-converting formula uses:
            </p>
            <div className="p-4 rounded-2xl bg-neutral-800 border border-neutral-700 text-xs sm:text-sm font-mono text-emerald-300">
              [Strong Action Verb] + [Specific Task / Initiative] + [Quantifiable Business Impact (% or $)] + [Tools or Methodology]
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('resume-bullet-generator')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>Automate With Bullet Point Generator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Frequently Asked Questions About Resume Length &amp; Word Count
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                  Does ATS check resume word count?
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  ATS parsers do not have a hard word count limit, but they parse text into keyword clusters. If your resume is under 300 words, you risk missing essential hard skill keywords. For detailed parsing mechanics, read our <a href="/ats-guide" onClick={(e) => { e.preventDefault(); onNavigate('ats-guide'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">Definitive Guide to ATS</a> or test your match with our <a href="/ats-checker" onClick={(e) => { e.preventDefault(); onNavigate('ats-checker'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">ATS Resume Checker</a>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                  How long does a recruiter spend reading a resume?
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Eye-tracking studies by Ladders show recruiters spend an average of <strong>7.4 seconds</strong> on their initial scan. During this scan, they look at your Name, Current Job Title &amp; Company, Previous Job Title &amp; Company, Dates, and Education.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                  What if my resume spills 2 lines onto page 2?
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  A resume with only a few orphan lines on page 2 looks sloppy. You should format your sections in standard <a href="/reverse-chronological-resume-format" onClick={(e) => { e.preventDefault(); onNavigate('reverse-chronological'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">Reverse Chronological Resume Format</a>, tighten line spacing, or expand bullet points with quantifiable data to fill at least half of page 2.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                  Is a European CV longer than an American resume?
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Yes. In the UK and Europe, standard professional CVs are typically 2 full A4 pages (around 600–900 words). Explore the differences in our <a href="/european-cv-format" onClick={(e) => { e.preventDefault(); onNavigate('european-cv-format'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">European CV Format Guide</a> and <a href="/cv-vs-resume" onClick={(e) => { e.preventDefault(); onNavigate('cv-vs-resume'); }} className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700">CV vs Resume Comparison</a>.
                </p>
              </div>
            </div>
          </div>

          {/* Related Tools & Formatting Standards Hub */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Related Optimization Tools &amp; Format Specifications
              </h3>
              <p className="text-xs text-neutral-500">
                Enhance your resume content with these complementary free utilities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <a
                href="/resume-bullet-generator"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('resume-bullet-generator');
                }}
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-all space-y-1 group"
              >
                <div className="font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  <span>Bullet Point Generator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-[11px] text-neutral-500">Craft Google X-Y-Z quantifiable achievements.</p>
              </a>

              <a
                href="/reverse-chronological-resume-format"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('reverse-chronological');
                }}
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-all space-y-1 group"
              >
                <div className="font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  <span>Chronological Format</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-[11px] text-neutral-500">The 1-page standard preferred by 95% of recruiters.</p>
              </a>

              <a
                href="/resume-skills"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('resume-skills');
                }}
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-all space-y-1 group"
              >
                <div className="font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  <span>Top Skills Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-[11px] text-neutral-500">Add vetted technical and soft skill keywords.</p>
              </a>

              <a
                href="/ats-checker"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('ats-checker');
                }}
                className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 transition-all space-y-1 group"
              >
                <div className="font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  <span>ATS Resume Checker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-[11px] text-neutral-500">Scan keyword match against your target job post.</p>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
