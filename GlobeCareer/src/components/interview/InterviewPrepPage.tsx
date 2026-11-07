import React, { useState, useEffect, useMemo } from 'react';
import {
  HelpCircle,
  Sparkles,
  BookOpen,
  Award,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  Clock,
  Briefcase,
  Globe,
  Sliders,
  BookmarkPlus,
  Send,
  ShieldCheck,
  FileText
} from 'lucide-react';

export type InterviewCategory =
  | 'all'
  | 'hr_cultural'
  | 'behavioral'
  | 'technical_skills'
  | 'situational_leadership'
  | 'jd_tailored';

export interface InterviewQuestion {
  id: string;
  category: 'hr_cultural' | 'behavioral' | 'technical_skills' | 'situational_leadership' | 'jd_tailored';
  question: string;
  interviewerIntent: string;
  answerFramework: string[];
  starGuide?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  sampleAnswerSnippet: string;
  pitfallsToAvoid: string;
  relevanceKeywords?: string[];
}

const BASE_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q1',
    category: 'hr_cultural',
    question: 'Tell me about yourself and your professional journey.',
    interviewerIntent: 'Assessing your executive summary, career narrative coherence, communication clarity, and immediate relevance to this vacancy.',
    answerFramework: [
      '1. Present (30s): Current role, core domain expertise, and a defining recent win.',
      '2. Past (45s): 2–3 key milestones and technical progression that built your foundation.',
      '3. Future (30s): Why this specific company and role represent the logical next chapter.'
    ],
    sampleAnswerSnippet: 'For the past 4 years, I have served as a Senior Cloud Engineer specializing in Kubernetes scalability and zero-downtime migrations. Previously, I honed my backend systems foundation at TechCorp where I automated CI/CD pipelines for 40+ engineering squads. What drew me to this role is your recent expansion into multi-region latency optimization, which is precisely the problem space I have spent the last 3 years mastering.',
    pitfallsToAvoid: 'Do not recite your entire chronological resume from university or ramble past 2 minutes.',
  },
  {
    id: 'q2',
    category: 'hr_cultural',
    question: 'Why are you interested in joining our company specifically?',
    interviewerIntent: 'Testing whether you conducted genuine research into their product, culture, and business model versus blasting identical applications.',
    answerFramework: [
      '1. Specific Product/Mission Hook: Mention an exact feature, technology challenge, or recent milestone.',
      '2. Cultural or Engineering Alignment: How their working philosophy aligns with your execution style.',
      '3. Value Proposition: The specific problem you can solve for them within your first 90 days.'
    ],
    sampleAnswerSnippet: 'I have followed your infrastructure migration closely, especially your engineering blog post on adopting event-driven architecture. Having tackled identical data reconciliation hurdles in my previous role, I admire how your team balanced performance with strict regulatory compliance. I want to bring my specialized experience in high-throughput streaming directly to your next development cycle.',
    pitfallsToAvoid: 'Never give generic compliments like "You are a market leader" or focus on personal perks like salary or remote flexibility.',
  },
  {
    id: 'q3',
    category: 'behavioral',
    question: 'Describe a high-stakes disagreement with a stakeholder or teammate and how you resolved it.',
    interviewerIntent: 'Measuring emotional intelligence, psychological safety, professional diplomacy, and commitment to objective business outcomes.',
    answerFramework: [
      'Situation: Context of the technical or strategic impasse and what was at risk.',
      'Task: Your responsibility in navigating the disagreement constructively.',
      'Action: How you separated egos, anchored the discussion in empirical data, and found consensus.',
      'Result: The ultimate outcome, relationship status, and positive business impact.'
    ],
    starGuide: {
      situation: 'Our product manager requested accelerating launch by cutting end-to-end integration testing, which risked database inconsistency.',
      task: 'I needed to balance the urgent quarterly deadline with our 99.9% reliability SLA.',
      action: 'I convened a 30-minute working session with historical defect telemetry showing that unverified releases led to 4x longer recovery times. We collaboratively agreed to ship a phased rollout to 10% of users while keeping automated regression test passes active.',
      result: 'The product launched on schedule with zero critical production incidents, and our collaborative compromise became our department standard.'
    },
    sampleAnswerSnippet: 'In my last role, our product lead wanted to expedite a launch by deferring security audits. Rather than arguing defensively, I scheduled a joint review where we mapped out risk probabilities and crafted a parallel audit schedule. We delivered the launch on date with zero vulnerability regressions.',
    pitfallsToAvoid: 'Never portray the other party as incompetent or claim you were 100% right with zero compromise.',
  },
  {
    id: 'q4',
    category: 'behavioral',
    question: 'Tell me about a project that missed expectations or failed, and what you learned.',
    interviewerIntent: 'Evaluating intellectual honesty, resilience, blameless root-cause analysis, and capacity for growth.',
    answerFramework: [
      '1. Context: A genuine failure with real consequences (not a disguised humblebrag).',
      '2. Ownership: Unreservedly taking responsibility for your role in the breakdown.',
      '3. Retrospective: The exact process change or safeguard you instituted afterward.',
      '4. Long-term Growth: How this lesson prevented subsequent failures.'
    ],
    starGuide: {
      situation: 'We migrated an analytics database under an aggressive 3-week timeline without load-testing at peak Friday traffic volumes.',
      task: 'As lead engineer, I was responsible for migration verification and failover protocols.',
      action: 'Queries bottlenecked during peak trading hours. I immediately executed a zero-data-loss rollback within 12 minutes, conducted a transparent post-mortem, and built an automated shadow-traffic load test environment.',
      result: 'The delayed re-launch ran flawlessly, and shadow load-testing became mandatory across our organization.'
    },
    sampleAnswerSnippet: 'Early in my senior tenure, I underestimated the cache invalidation complexity during a data redesign, causing a 20-minute latency spike for 5% of users. I owned the oversight, rolled back swiftly, and engineered synthetic load-testing safeguards that prevented any recurrence.',
    pitfallsToAvoid: 'Avoid saying "I have never failed" or blaming junior team members.',
  },
  {
    id: 'q5',
    category: 'technical_skills',
    question: 'How do you approach learning and mastering a new technology or domain quickly?',
    interviewerIntent: 'Gauging intellectual curiosity, autonomous problem solving, and ability to ramp up fast in an unfamiliar tech stack.',
    answerFramework: [
      '1. Structured Learning Framework: Official documentation, building disposable proof-of-concept prototypes, reading production code.',
      '2. Concrete Example: A recent time you mastered an unfamiliar tool and delivered under pressure.',
      '3. Knowledge Sharing: Documenting findings to accelerate team ramp-up.'
    ],
    sampleAnswerSnippet: 'When our team decided to adopt Rust for our gateway service, I started by building small CLI prototypes against our existing APIs. Within two weeks, I had benchmarked memory profiles, compiled an internal best-practices guide for the team, and deployed the first microservice to production.',
    pitfallsToAvoid: 'Do not claim to know everything or rely solely on passive tutorial video watching.',
  },
  {
    id: 'q6',
    category: 'situational_leadership',
    question: 'How do you prioritize competing deadlines when multiple stakeholders demand urgency?',
    interviewerIntent: 'Testing prioritization frameworks, boundary setting, stakeholder management, and focus on company-level ROI.',
    answerFramework: [
      '1. Prioritization Framework: Impact vs. Effort, cost of delay, and critical path analysis.',
      '2. Transparent Communication: Proactive alignment rather than silent burnout.',
      '3. Negotiation & Trade-offs: Offering viable alternatives and setting expectations.'
    ],
    sampleAnswerSnippet: 'I rely on a transparent impact-versus-urgency matrix. When competing requests arrive from marketing and security, I bring both leads together, present our engineering capacity models, and agree on what gets expedited and what gets scheduled for next sprint with firm dates.',
    pitfallsToAvoid: 'Never say "I just work 16-hour days to get everything done" — interviewers look for sustainable prioritization.',
  },
  {
    id: 'q7',
    category: 'hr_cultural',
    question: 'What is your greatest professional weakness, and how do you manage it?',
    interviewerIntent: 'Assessing self-awareness and proactive personal development mechanisms.',
    answerFramework: [
      '1. Acknowledge a genuine, non-fatal operational weakness (e.g., perfectionism in early drafts, delegating too late).',
      '2. Concrete counter-measure: The exact system, checklist, or habit you created to neutralize it.',
      '3. Measurable improvement: Evidence that the counter-measure is working.'
    ],
    sampleAnswerSnippet: 'In the past, I tended to over-polish architectural documents before sharing them with teammates. Recognizing this delayed feedback loops, I implemented a strict 70% draft rule: I now publish rough design proposals within 48 hours for early critique, which accelerated our project validation cycles by 25%.',
    pitfallsToAvoid: 'Do not say fake weaknesses like "I work too hard" or critical disqualifiers like "I miss deadlines".',
  },
];

export const InterviewPrepPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  // Configuration State
  const [jobTitle, setJobTitle] = useState('Senior Software Engineer');
  const [industry, setIndustry] = useState('tech');
  const [seniority, setSeniority] = useState('senior');
  const [country, setCountry] = useState('us');
  const [jobDescription, setJobDescription] = useState('');

  // View & Tab State
  const [activeTab, setActiveTab] = useState<'questions' | 'builder' | 'mock'>('questions');
  const [selectedCategory, setSelectedCategory] = useState<InterviewCategory>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>('q1');

  // Answer Builder State
  const [builderQuestion, setBuilderQuestion] = useState<string>('Describe a high-stakes disagreement with a stakeholder or teammate and how you resolved it.');
  const [starS, setStarS] = useState('');
  const [starT, setStarT] = useState('');
  const [starA, setStarA] = useState('');
  const [starR, setStarR] = useState('');
  const [savedAnswers, setSavedAnswers] = useState<{ id: string; question: string; answer: string; date: string }[]>(() => {
    try {
      const saved = localStorage.getItem('globecareer_interview_answers');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Mock Interview State
  const [mockIndex, setMockIndex] = useState(0);
  const [mockAnswer, setMockAnswer] = useState('');
  const [mockFeedback, setMockFeedback] = useState<{
    score: number;
    breakdown: { label: string; score: number; max: number; passed: boolean; note: string }[];
    actionVerbsFound: string[];
    metricsFound: string[];
    suggestions: string[];
  } | null>(null);

  // Country-Specific Nuance Advice
  const countryAdvice: Record<string, { label: string; flag: string; tip: string }> = {
    us: {
      label: 'United States',
      flag: '🇺🇸',
      tip: 'American interviewers prize energetic initiative, quantified business impact ($ and % ROI), and direct ownership statements ("I led", "I architected").',
    },
    uk: {
      label: 'United Kingdom',
      flag: '🇬🇧',
      tip: 'British recruiters value structured competency-based STAR answers paired with collaborative modesty. Use "we" for team context and clearly demarcate your personal role.',
    },
    de: {
      label: 'Germany',
      flag: '🇩🇪',
      tip: 'German interviews favor factual precision, technical depth, and methodical problem-solving. Avoid hyperbolic marketing speak and provide exact methodologies.',
    },
    ca: {
      label: 'Canada',
      flag: '🇨🇦',
      tip: 'Canadian hiring teams emphasize cultural adaptability, collaborative consensus, and structured professional diplomacy alongside technical competence.',
    },
    au: {
      label: 'Australia',
      flag: '🇦🇺',
      tip: 'Australian interviewers respond well to down-to-earth authenticity, practical pragmatism, and low ego coupled with decisive problem-solving.',
    },
    global: {
      label: 'Worldwide Remote',
      flag: '🌐',
      tip: 'Remote hiring managers heavily evaluate asynchronous clarity, disciplined documentation habits, self-directed autonomy, and proactive communication.',
    },
  };

  // Dynamic JD-tailored questions extraction
  const tailoredQuestions: InterviewQuestion[] = useMemo(() => {
    if (!jobDescription.trim() || jobDescription.length < 50) return [];
    
    const words = jobDescription.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
    const keywords = Array.from(new Set(words)).filter(w => 
      !['with', 'from', 'have', 'that', 'this', 'will', 'your', 'about', 'must', 'should', 'more'].includes(w)
    ).slice(0, 8);

    return [
      {
        id: 'jd_1',
        category: 'jd_tailored',
        question: `How does your background directly address our requirements for ${keywords.slice(0, 3).join(', ')}?`,
        interviewerIntent: 'Evaluating exact alignment with the technical and operational keywords listed in this specific job requisition.',
        answerFramework: [
          '1. Direct confirmation: State your years of direct experience with these domains.',
          '2. Practical application: Describe a real project where you leveraged these tools under pressure.',
          '3. Business result: Share the efficiency or revenue outcome achieved.'
        ],
        sampleAnswerSnippet: `Throughout my career, I have worked directly with ${keywords.slice(0, 2).join(' and ')}, deploying production solutions that achieved measurable operational gains.`,
        pitfallsToAvoid: 'Do not simply repeat the keywords back to the interviewer without illustrating tangible practical usage.',
        relevanceKeywords: keywords.slice(0, 4)
      },
      {
        id: 'jd_2',
        category: 'jd_tailored',
        question: `Our team relies heavily on ${keywords[3] || 'cross-functional execution'}. Describe an instance where you spearheaded an initiative involving this.`,
        interviewerIntent: 'Verifying that your claimed experience matches the depth required in the job description.',
        answerFramework: [
          '1. Context and challenge.',
          '2. Your tactical execution.',
          '3. Metrics and lessons learned.'
        ],
        sampleAnswerSnippet: `In my previous role, our primary challenge was optimizing ${keywords[3] || 'operational throughput'}, which required deep architectural analysis and team consensus.`,
        pitfallsToAvoid: 'Avoid staying theoretical; name concrete tools and timelines.',
        relevanceKeywords: [keywords[3] || 'execution']
      }
    ];
  }, [jobDescription]);

  const allQuestions = useMemo(() => {
    return [...BASE_QUESTIONS, ...tailoredQuestions];
  }, [tailoredQuestions]);

  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'all') return allQuestions;
    return allQuestions.filter(q => q.category === selectedCategory);
  }, [allQuestions, selectedCategory]);

  // Answer Builder Save Handler
  const handleSaveAnswer = () => {
    const fullText = [
      starS ? `Situation: ${starS}` : '',
      starT ? `Task: ${starT}` : '',
      starA ? `Action: ${starA}` : '',
      starR ? `Result: ${starR}` : ''
    ].filter(Boolean).join('\n\n');

    if (!fullText.trim()) return;

    const newRecord = {
      id: `ans_${Date.now()}`,
      question: builderQuestion,
      answer: fullText,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updated = [newRecord, ...savedAnswers];
    setSavedAnswers(updated);
    try {
      localStorage.setItem('globecareer_interview_answers', JSON.stringify(updated));
    } catch (e) {
      // LocalStorage access safe catch
    }

    setStarS('');
    setStarT('');
    setStarA('');
    setStarR('');
  };

  const handleDeleteSavedAnswer = (id: string) => {
    const updated = savedAnswers.filter(a => a.id !== id);
    setSavedAnswers(updated);
    try {
      localStorage.setItem('globecareer_interview_answers', JSON.stringify(updated));
    } catch (e) {}
  };

  // Mock Practice Evaluate
  const handleEvaluateMock = () => {
    if (!mockAnswer.trim()) return;

    const text = mockAnswer.toLowerCase();
    const wordCount = mockAnswer.split(/\s+/).filter(Boolean).length;

    // Detect action verbs
    const actionVerbsList = [
      'led', 'managed', 'designed', 'built', 'spearheaded', 'optimized', 'achieved', 
      'delivered', 'architected', 'reduced', 'increased', 'developed', 'coordinated', 
      'launched', 'mentored', 'streamlined', 'resolved', 'analyzed', 'created'
    ];
    const verbsFound = actionVerbsList.filter(v => text.includes(v));

    // Detect metrics (numbers, %, $, x, headcount)
    const metricsRegex = /\b(\d+[%$kmb]?|\$[\d,.]+|\d+x|\d+\s*(percent|users|engineers|months|weeks|days|dollars))\b/gi;
    const metricsMatches = mockAnswer.match(metricsRegex) || [];
    const uniqueMetrics = Array.from(new Set(metricsMatches));

    // Detect STAR elements
    const hasSituation = text.includes('when') || text.includes('project') || text.includes('situation') || text.includes('challenge') || text.includes('company');
    const hasAction = verbsFound.length >= 2 || text.includes('i did') || text.includes('i led') || text.includes('i implemented') || text.includes('my approach');
    const hasResult = text.includes('result') || text.includes('outcome') || text.includes('impact') || text.includes('increased') || text.includes('reduced') || uniqueMetrics.length > 0;

    // Rubric items
    const breakdown = [
      {
        label: 'Structure & Narrative (STAR)',
        score: (hasSituation ? 8 : 2) + (hasAction ? 10 : 3) + (hasResult ? 7 : 2),
        max: 25,
        passed: hasSituation && hasAction && hasResult,
        note: hasSituation && hasAction && hasResult ? 'Clear progression from context to action to outcome.' : 'Ensure you clearly distinguish the challenge, your action, and final outcome.'
      },
      {
        label: 'Quantified Impact & Proof',
        score: uniqueMetrics.length >= 2 ? 25 : uniqueMetrics.length === 1 ? 16 : 8,
        max: 25,
        passed: uniqueMetrics.length >= 1,
        note: uniqueMetrics.length >= 1 ? `Found ${uniqueMetrics.length} quantified metric(s).` : 'Missing numerical evidence ($, %, headcount, time saved).'
      },
      {
        label: 'Action & Leadership Vocabulary',
        score: verbsFound.length >= 3 ? 25 : verbsFound.length >= 1 ? 18 : 10,
        max: 25,
        passed: verbsFound.length >= 2,
        note: verbsFound.length >= 2 ? `Used strong impact verbs: ${verbsFound.slice(0, 4).join(', ')}.` : 'Incorporate more active power verbs (e.g. spearheaded, delivered, optimized).'
      },
      {
        label: 'Length & Spoken Delivery Pace',
        score: wordCount >= 130 && wordCount <= 350 ? 25 : wordCount >= 80 ? 18 : 10,
        max: 25,
        passed: wordCount >= 130 && wordCount <= 350,
        note: wordCount >= 130 && wordCount <= 350 ? `${wordCount} words (ideal 1–2.5 minute spoken pace).` : `${wordCount} words. Aim for 150–300 words for balanced depth.`
      }
    ];

    const totalScore = breakdown.reduce((acc, curr) => acc + curr.score, 0);

    const suggestions: string[] = [];
    if (uniqueMetrics.length === 0) {
      suggestions.push('Add at least one quantified business result (e.g. "improved throughput by 25%", "saved 15 hours weekly").');
    }
    if (wordCount < 120) {
      suggestions.push('Your answer is quite brief. Elaborate further on the specific technical hurdles you overcame.');
    }
    if (wordCount > 400) {
      suggestions.push('Answer is over 400 words. Trim contextual backstory to avoid losing the interviewer’s attention.');
    }
    if (verbsFound.length < 2) {
      suggestions.push('Replace passive language with proactive verbs: "I orchestrated", "I resolved", "I launched".');
    }

    setMockFeedback({
      score: totalScore,
      breakdown,
      actionVerbsFound: verbsFound,
      metricsFound: uniqueMetrics,
      suggestions
    });
  };

  const handleStartMockQuestion = (question: InterviewQuestion) => {
    const idx = allQuestions.findIndex(q => q.id === question.id);
    if (idx !== -1) setMockIndex(idx);
    setMockAnswer('');
    setMockFeedback(null);
    setActiveTab('mock');
  };

  const currentMockQ = allQuestions[mockIndex] || allQuestions[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
          <Award className="w-3.5 h-3.5" />
          <span>Complete Interview Preparation & Simulation Suite</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          International Interview Preparation
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Prepare for high-stakes international interviews with role-specific question banks, STAR method answer frameworks, local hiring nuances, and deterministic mock practice evaluation.
        </p>
      </div>

      {/* Target Role & Country Intelligence Bar */}
      <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            Interview Target Parameters
          </span>
          <span className="text-xs text-neutral-400">
            Tailors questions and cultural expectations
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
              Target Job Title
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer"
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
              Industry / Field
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500 font-semibold"
            >
              <option value="tech">Software & Technology</option>
              <option value="finance">Finance, Banking & Fintech</option>
              <option value="healthcare">Healthcare & Life Sciences</option>
              <option value="marketing">Marketing, Creative & Sales</option>
              <option value="engineering">Engineering & Operations</option>
              <option value="general">General Business & Consulting</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
              Seniority Level
            </label>
            <select
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500 font-semibold"
            >
              <option value="entry">Entry-Level (0–2 yrs)</option>
              <option value="mid">Mid-Level (3–5 yrs)</option>
              <option value="senior">Senior / Staff (6–10 yrs)</option>
              <option value="lead">Lead / Director (10+ yrs)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
              Target Country Nuance
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500 font-semibold"
            >
              <option value="us">🇺🇸 United States (Metrics & Impact)</option>
              <option value="uk">🇬🇧 United Kingdom (Competency STAR)</option>
              <option value="de">🇩🇪 Germany (Methodology & Precision)</option>
              <option value="ca">🇨🇦 Canada (Teamwork & Diplomacy)</option>
              <option value="au">🇦🇺 Australia (Pragmatism & Authenticity)</option>
              <option value="global">🌐 Worldwide Remote (Autonomy & Async)</option>
            </select>
          </div>
        </div>

        {/* Optional Job Description Matcher Input */}
        <div className="pt-2">
          <label className="block text-[11px] font-semibold text-neutral-500 mb-1">
            Paste Job Description (Optional — generates tailored behavioral & technical questions)
          </label>
          <textarea
            rows={2}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste requirements, tech stack, or responsibilities from the job posting to generate tailored interview questions..."
            className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Cultural Nuance Alert Box */}
        {countryAdvice[country] && (
          <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl flex items-center gap-3 text-xs text-blue-950 dark:text-blue-200">
            <span className="text-xl shrink-0">{countryAdvice[country].flag}</span>
            <div>
              <strong>{countryAdvice[country].label} Interview Nuance:</strong> {countryAdvice[country].tip}
            </div>
          </div>
        )}
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800">
        <button
          type="button"
          onClick={() => setActiveTab('questions')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'questions'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Question Bank & Frameworks ({filteredQuestions.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('builder')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'builder'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          <BookmarkPlus className="w-4 h-4" />
          <span>STAR Answer Builder ({savedAnswers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mock')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'mock'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          <span>Interactive Mock Practice</span>
        </button>
      </div>

      {/* TAB 1: QUESTION BANK */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'hr_cultural', label: 'HR & Cultural Fit' },
              { id: 'behavioral', label: 'Behavioral STAR' },
              { id: 'technical_skills', label: 'Technical & Domain' },
              { id: 'situational_leadership', label: 'Leadership & Conflict' },
              ...(tailoredQuestions.length > 0 ? [{ id: 'jd_tailored', label: `Job Description Tailored (${tailoredQuestions.length})` }] : [])
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as InterviewCategory)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-2xs'
                    : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedQuestionId === q.id;
              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs overflow-hidden transition-all"
                >
                  <div
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          q.category === 'behavioral' 
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' 
                            : q.category === 'technical_skills'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : q.category === 'jd_tailored'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}>
                          {q.category.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {q.question}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartMockQuestion(q);
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        title="Practice this question in Mock mode"
                      >
                        <PlayCircle className="w-3.5 h-3.5" />
                        <span>Practice</span>
                      </button>
                      <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-5 sm:p-6 border-t border-neutral-100 dark:border-neutral-800 space-y-5 bg-neutral-50/40 dark:bg-neutral-950/20 text-xs">
                      {/* What recruiter is looking for */}
                      <div className="space-y-1">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 text-xs">
                          <HelpCircle className="w-4 h-4 text-blue-600" />
                          What the Interviewer Is Looking For
                        </span>
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {q.interviewerIntent}
                        </p>
                      </div>

                      {/* Recommended Framework */}
                      <div className="space-y-1.5">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 block">
                          Recommended Answer Framework
                        </span>
                        <ul className="space-y-1 text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800">
                          {q.answerFramework.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2">
                              <span className="text-blue-600 font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* STAR Breakdown if available */}
                      {q.starGuide && (
                        <div className="p-4 bg-purple-50/40 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 rounded-xl space-y-2">
                          <span className="font-bold text-purple-900 dark:text-purple-300 block">
                            STAR Method Architecture
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                            <div><strong>Situation:</strong> {q.starGuide.situation}</div>
                            <div><strong>Task:</strong> {q.starGuide.task}</div>
                            <div><strong>Action:</strong> {q.starGuide.action}</div>
                            <div><strong>Result:</strong> {q.starGuide.result}</div>
                          </div>
                        </div>
                      )}

                      {/* Sample Answer */}
                      <div className="space-y-1">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 block">
                          Model Answer Excerpt
                        </span>
                        <p className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-700 dark:text-neutral-300 italic leading-relaxed">
                          "{q.sampleAnswerSnippet}"
                        </p>
                      </div>

                      {/* Pitfalls to Avoid */}
                      <div className="p-3 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl flex items-center gap-2 text-rose-800 dark:text-rose-300">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <div>
                          <strong>Common Pitfall:</strong> {q.pitfallsToAvoid}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: STAR ANSWER BUILDER & LIBRARY */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: STAR Editor */}
          <div className="lg:col-span-6 space-y-5 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-3">
              Draft & Save Structured STAR Answer
            </h2>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Target Interview Question
              </label>
              <input
                type="text"
                value={builderQuestion}
                onChange={(e) => setBuilderQuestion(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500 font-semibold"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center justify-between">
                  <span>S – Situation (Context & Challenge)</span>
                  <span className="text-[10px] text-neutral-400 font-normal">~20% of time</span>
                </label>
                <textarea
                  rows={2}
                  value={starS}
                  onChange={(e) => setStarS(e.target.value)}
                  placeholder="Set the stage: Where were you, what was the project, and what was the core bottleneck?"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center justify-between">
                  <span>T – Task (Your Mandate)</span>
                  <span className="text-[10px] text-neutral-400 font-normal">~10% of time</span>
                </label>
                <textarea
                  rows={2}
                  value={starT}
                  onChange={(e) => setStarT(e.target.value)}
                  placeholder="What was your specific personal responsibility in this situation?"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center justify-between">
                  <span>A – Action (What You Did)</span>
                  <span className="text-[10px] text-neutral-400 font-normal">~50% of time (Crucial)</span>
                </label>
                <textarea
                  rows={3}
                  value={starA}
                  onChange={(e) => setStarA(e.target.value)}
                  placeholder="What concrete actions did you take? Use action verbs (spearheaded, designed, audited, rallied)."
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center justify-between">
                  <span>R – Result (Quantified Business Impact)</span>
                  <span className="text-[10px] text-neutral-400 font-normal">~20% of time</span>
                </label>
                <textarea
                  rows={2}
                  value={starR}
                  onChange={(e) => setStarR(e.target.value)}
                  placeholder="What happened? Share numbers, percentages, speedups, money saved, or team lessons."
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="button"
              disabled={!starS && !starA}
              onClick={handleSaveAnswer}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookmarkPlus className="w-4 h-4" />
              <span>Save to Answer Bank</span>
            </button>
          </div>

          {/* Right Column: Saved Answers Bank */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                Your Saved Answer Library ({savedAnswers.length})
              </span>
              <span className="text-[11px] text-neutral-400">
                Saved locally in browser
              </span>
            </div>

            {savedAnswers.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
                <FileText className="w-8 h-8 text-neutral-400 mx-auto" />
                <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-200">No Saved Answers Yet</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Draft your STAR responses on the left and save them here for quick review before your interviews.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedAnswers.map((ans) => (
                  <div
                    key={ans.id}
                    className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                          Question
                        </span>
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                          {ans.question}
                        </h4>
                      </div>
                      <span className="text-[10px] text-neutral-400 shrink-0">{ans.date}</span>
                    </div>

                    <p className="text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-line leading-relaxed bg-neutral-50 dark:bg-neutral-800/40 p-3 rounded-xl">
                      {ans.answer}
                    </p>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleDeleteSavedAnswer(ans.id)}
                        className="text-xs text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE MOCK PRACTICE */}
      {activeTab === 'mock' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Question Banner */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4" />
                Live Question {mockIndex + 1} of {allQuestions.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={mockIndex === 0}
                  onClick={() => {
                    setMockIndex(prev => Math.max(0, prev - 1));
                    setMockAnswer('');
                    setMockFeedback(null);
                  }}
                  className="px-2.5 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg disabled:opacity-30 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={mockIndex >= allQuestions.length - 1}
                  onClick={() => {
                    setMockIndex(prev => Math.min(allQuestions.length - 1, prev + 1));
                    setMockAnswer('');
                    setMockFeedback(null);
                  }}
                  className="px-2.5 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-lg disabled:opacity-30 cursor-pointer"
                >
                  Next Question
                </button>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {currentMockQ.question}
            </h2>

            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl text-xs text-neutral-600 dark:text-neutral-400">
              <strong>Evaluation Criteria:</strong> {currentMockQ.interviewerIntent}
            </div>

            {/* Answer Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Type your spoken response (or notes):</span>
                <span className="font-mono text-[11px]">
                  {mockAnswer.split(/\s+/).filter(Boolean).length} words · ~{Math.round(mockAnswer.split(/\s+/).filter(Boolean).length / 130 * 10) / 10} min spoken
                </span>
              </div>
              <textarea
                rows={8}
                value={mockAnswer}
                onChange={(e) => setMockAnswer(e.target.value)}
                placeholder="Structure your answer using Situation, Task, Action, and Result. Include quantifiable metrics and active leadership verbs..."
                className="w-full p-4 text-xs bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-300 dark:border-neutral-700 rounded-2xl focus:outline-none focus:border-blue-500 leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMockAnswer('');
                  setMockFeedback(null);
                }}
                className="px-4 py-2 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer"
              >
                Clear
              </button>

              <button
                type="button"
                disabled={!mockAnswer.trim()}
                onClick={handleEvaluateMock}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Evaluate My Answer</span>
              </button>
            </div>
          </div>

          {/* Feedback Output Panel */}
          {mockFeedback && (
            <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-md space-y-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                    Mock Response Analysis & Rubric
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Scored using local linguistic checklists (STAR structure, impact metrics, and action verbs).
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black font-mono text-blue-600 dark:text-blue-400">
                    {mockFeedback.score}
                  </span>
                  <span className="text-xs text-neutral-400">/ 100</span>
                </div>
              </div>

              {/* Rubric Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockFeedback.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        {item.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                        {item.score}/{item.max}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.passed ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${(item.score / item.max) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* Specific Improvement Tips */}
              {mockFeedback.suggestions.length > 0 && (
                <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-2xl space-y-2">
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Key Suggestions to Elevate This Answer
                  </span>
                  <ul className="space-y-1 text-xs text-amber-800 dark:text-amber-200 list-disc list-inside">
                    {mockFeedback.suggestions.map((sug, sIdx) => (
                      <li key={sIdx}>{sug}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Transparency Notice */}
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800/40 rounded-xl text-[11px] text-neutral-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Transparent Rubric:</strong> Evaluation is computed directly in your browser using structured linguistic rules, STAR detection, and metric matching. We do not transmit your answers to third-party AI models.
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
