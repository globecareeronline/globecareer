import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Check, Copy, ArrowRight, Search, Filter, 
  HelpCircle, Lightbulb, Code2, HeartPulse, LineChart, 
  Megaphone, Users, Briefcase, Wrench, ShieldCheck, CheckCircle2
} from 'lucide-react';

interface ResumeSkillsGuidePageProps {
  onStartBuilder: (selectedSkills?: string[]) => void;
  onNavigate: (page: string) => void;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: any;
  description: string;
  hardSkills: string[];
  softSkills: string[];
}

export const ResumeSkillsGuidePage: React.FC<ResumeSkillsGuidePageProps> = ({
  onStartBuilder,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [checkedSkills, setCheckedSkills] = useState<Set<string>>(new Set());
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null);

  const categories: SkillCategory[] = [
    {
      id: 'tech',
      name: 'Software Engineering & IT',
      icon: Code2,
      description: 'Full-stack development, cloud infrastructure, API architecture, and database design.',
      hardSkills: [
        'TypeScript', 'React.js', 'Node.js', 'Python', 'AWS / Cloud Architecture',
        'Docker & Kubernetes', 'PostgreSQL / SQL', 'REST APIs & GraphQL',
        'CI/CD Pipelines (GitHub Actions)', 'System Architecture', 'Git Version Control', 'Unit & E2E Testing'
      ],
      softSkills: [
        'Code Review Mentorship', 'Cross-functional Collaboration', 'Technical Problem-solving',
        'Agile / Scrum Methodologies', 'Incident Management'
      ]
    },
    {
      id: 'data',
      name: 'Data Science & AI',
      icon: LineChart,
      description: 'Machine learning pipelines, predictive modeling, statistical analysis, and business intelligence.',
      hardSkills: [
        'Python (Pandas, NumPy)', 'SQL & Data Warehousing (BigQuery, Snowflake)',
        'Machine Learning & NLP', 'Tableau & Power BI', 'Data Modeling',
        'PyTorch / TensorFlow', 'A/B Testing & Hypothesis Testing', 'ETL Data Pipelines'
      ],
      softSkills: [
        'Translating Data to Business Stakeholders', 'Analytical Critical Thinking',
        'Data Storytelling', 'Iterative Experimentation'
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Nursing',
      icon: HeartPulse,
      description: 'Clinical patient care, diagnostic protocols, electronic medical records, and triage.',
      hardSkills: [
        'Patient Assessment & Triage', 'Electronic Health Records (Epic, Cerner)',
        'Medication Administration', 'BLS / ACLS Certification',
        'Phlebotomy & IV Insertion', 'Infection Control Protocols', 'Wound Care Management'
      ],
      softSkills: [
        'High-pressure Empathy', 'Crisis Decision-making', 'Interdisciplinary Team Communication',
        'Patient Advocacy', 'Active Listening'
      ]
    },
    {
      id: 'finance',
      name: 'Finance & Accounting',
      icon: Briefcase,
      description: 'Financial forecasting, GAAP compliance, ledger reconciliations, and risk modeling.',
      hardSkills: [
        'Financial Modeling & Forecasting', 'GAAP / IFRS Compliance',
        'Advanced Microsoft Excel (VLOOKUP, Pivot, Macros)', 'QuickBooks & SAP ERP',
        'Variance Analysis', 'Tax Compliance & Filing', 'Budgeting & P&L Management'
      ],
      softSkills: [
        'Attention to Detail & Precision', 'Risk Assessment', 'Executive Presentation',
        'Strategic Advisory', 'Ethical Governance'
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing & Sales',
      icon: Megaphone,
      description: 'Multi-channel acquisition, search engine optimization, pipeline closing, and CRM.',
      hardSkills: [
        'Search Engine Optimization (SEO)', 'Google Analytics 4 (GA4)',
        'Paid Search & Social Ads (Google Ads, Meta Ads)', 'HubSpot & Salesforce CRM',
        'Content Strategy & Copywriting', 'Conversion Rate Optimization (CRO)', 'Email Automation (Klaviyo)'
      ],
      softSkills: [
        'Persuasive Negotiation', 'Audience Psychology', 'Brand Storytelling',
        'Relationship Building', 'Adaptability to Market Trends'
      ]
    },
    {
      id: 'management',
      name: 'Project & Product Management',
      icon: Users,
      description: 'Roadmap prioritization, Agile sprint ceremonies, stakeholder alignment, and delivery.',
      hardSkills: [
        'Product Roadmap Strategy', 'Jira & Confluence', 'Agile / Scrum / Kanban Frameworks',
        'OKRs & KPI Tracking', 'User Research & Personas', 'Budget & Resource Allocation', 'Risk Mitigation'
      ],
      softSkills: [
        'Executive Stakeholder Management', 'Conflict Resolution', 'Cross-team Alignment',
        'Prioritization Under Constraints', 'Strategic Vision'
      ]
    }
  ];

  const handleToggleSkill = (skill: string) => {
    setCheckedSkills(prev => {
      const next = new Set(prev);
      if (next.has(skill)) {
        next.delete(skill);
      } else {
        next.add(skill);
      }
      return next;
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSkill(id);
    setTimeout(() => setCopiedSkill(null), 2000);
  };

  const filteredCategories = useMemo(() => {
    return categories.map(cat => {
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) return null;

      const q = searchTerm.toLowerCase().trim();
      if (!q) return cat;

      const hard = cat.hardSkills.filter(s => s.toLowerCase().includes(q));
      const soft = cat.softSkills.filter(s => s.toLowerCase().includes(q));

      if (hard.length === 0 && soft.length === 0 && !cat.name.toLowerCase().includes(q)) {
        return null;
      }

      return {
        ...cat,
        hardSkills: q ? hard : cat.hardSkills,
        softSkills: q ? soft : cat.softSkills
      };
    }).filter(Boolean) as SkillCategory[];
  }, [searchTerm, selectedCategory]);

  const handleApplySelectedSkills = () => {
    const list = Array.from(checkedSkills);
    if (list.length === 0) {
      onStartBuilder();
    } else {
      onStartBuilder(list);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-neutral-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            2026 ATS Skills Catalog & Strategy
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Top Skills to Put on a Resume: <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300">Hard, Soft & Technical</span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto mb-8 font-light leading-relaxed">
            Discover verified hard skills, soft skills, and technical proficiencies categorized by industry. Learn how to format skills for Applicant Tracking Systems (ATS) and insert them directly into your resume.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onStartBuilder()}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105 cursor-pointer"
            >
              <Wrench className="w-5 h-5" />
              Build Resume with Pre-Loaded Skills
            </button>
            <button
              onClick={() => onNavigate('job-examples')}
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Browse Role Examples
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">

        {/* Hard Skills vs Soft Skills Explanation */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              Hard Skills vs. Soft Skills: The Ideal Balance
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl mx-auto">
              Recruiters scan for quantifiable hard skills to confirm minimum qualifications, and soft skills to assess cultural fit and leadership potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-xl bg-blue-600 text-white font-bold text-sm">HARD</span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Hard Skills (Technical & Measurable)</h3>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                Specific, teachable abilities acquired through formal education, certifications, or professional on-the-job experience. These are the primary keywords ATS filters parse.
              </p>
              <ul className="text-xs space-y-1.5 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" /> Programming Languages (Python, Java, TypeScript)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" /> Specialized Software (Salesforce, QuickBooks, Figma)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" /> Industry Standards (GAAP, ISO 27001, HIPAA)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" /> Spoken Foreign Languages (CEFR C1 English, B2 German)</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50">
              <div className="flex items-center gap-3 mb-3">
                <span className="p-2 rounded-xl bg-purple-600 text-white font-bold text-sm">SOFT</span>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Soft Skills (Interpersonal & Execution)</h3>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                Personal attributes, behavioral traits, and communication strengths that dictate how effectively you collaborate with teammates, navigate conflict, and solve complex problems.
              </p>
              <ul className="text-xs space-y-1.5 text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" /> Cross-Functional Stakeholder Alignment</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" /> High-Pressure Crisis Prioritization</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" /> Mentorship & Team Talent Development</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" /> Empathetic Active Listening</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Skills Explorer & Selector */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                Interactive Industry Skills Explorer
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Select skills to bundle into your resume, or copy individual terms to your clipboard.
              </p>
            </div>

            {checkedSkills.size > 0 && (
              <button
                onClick={handleApplySelectedSkills}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Add ({checkedSkills.size}) to Resume Builder
              </button>
            )}
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search skills (e.g. React, GAAP, SEO, Python, Triage)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-3 px-4 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Industries</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Categories Grid */}
          <div className="space-y-8">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12 text-neutral-500 dark:text-neutral-400 text-sm">
                No matching skills found. Try searching for a different keyword or select "All Industries".
              </div>
            ) : (
              filteredCategories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <div key={cat.id} className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{cat.name}</h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{cat.description}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                        Hard & Technical Skills
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.hardSkills.map((skill) => {
                          const isChecked = checkedSkills.has(skill);
                          return (
                            <button
                              key={skill}
                              onClick={() => handleToggleSkill(skill)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                                isChecked
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                  : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:border-blue-400'
                              }`}
                            >
                              {isChecked ? <Check className="w-3.5 h-3.5" /> : null}
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                        Execution & Soft Skills
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.softSkills.map((skill) => {
                          const isChecked = checkedSkills.has(skill);
                          return (
                            <button
                              key={skill}
                              onClick={() => handleToggleSkill(skill)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
                                isChecked
                                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                                  : 'bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700 hover:border-purple-400'
                              }`}
                            >
                              {isChecked ? <Check className="w-3.5 h-3.5" /> : null}
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* How to List Skills on a Resume (Best Practice Guide) */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
            How to List Skills on Your Resume: 3 Proven Techniques
          </h2>

          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-1">
                1. Dedicated Categorized Skills Section
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Place a structured Skills section near the top or bottom of your resume. Categorize into sub-headings rather than one massive paragraph to help ATS parsers and human recruiters scan quickly.
              </p>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-xl font-mono text-xs text-neutral-800 dark:text-neutral-200 space-y-1">
                <div><strong>Languages:</strong> TypeScript, Python, SQL, JavaScript (ES6+)</div>
                <div><strong>Frameworks:</strong> React.js, Next.js, Node.js, Express, Tailwind CSS</div>
                <div><strong>Cloud & DevOps:</strong> AWS (S3, Lambda, CloudFront), Docker, CI/CD, Git</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-1">
                2. Weave Skills into Quantified Experience Bullets (Action + Skill + Result)
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                Listing "Python" in a bullet list proves you know the word; embedding it into an outcome proves competency.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl">
                  <div className="font-bold text-red-600 dark:text-red-400 mb-1">Weak (Keyword Only):</div>
                  <p className="text-neutral-700 dark:text-neutral-300">"Responsible for building web applications using React and optimizing SQL queries."</p>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">Strong (Skill + Metric):</div>
                  <p className="text-neutral-700 dark:text-neutral-300">"Architected modular front-end in <strong>React.js</strong> and indexed <strong>PostgreSQL</strong> databases, reducing page load latency by 42% for 150K monthly users."</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-700">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-1">
                3. Include Both Acronyms & Spelled-Out Terms
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Different ATS configurations search for either the abbreviation or the full name. Always write both at least once: e.g., <em>"Search Engine Optimization (SEO)"</em>, <em>"Amazon Web Services (AWS)"</em>, <em>"Certified Public Accountant (CPA)"</em>.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            Resume Skills Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                How many skills should I list on my resume?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Aim for 8 to 15 highly relevant skills in your dedicated skills section. Avoid listing every technology you have ever touched; focus strictly on skills requested in the job description.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                Should I include soft skills on my resume?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Yes, but avoid standalone generic buzzwords like "hard worker" or "detail-oriented" without evidence. Instead, demonstrate soft skills in your professional summary and experience accomplishments (e.g. "Mentored 4 junior engineers", "Negotiated vendor contracts saving $50K").
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                How do I know what skills the ATS is looking for?
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Copy the job description into GlobeCareer's free <strong>ATS Resume Checker</strong>. The system performs transparent semantic keyword analysis, highlights matched terms, and identifies missing skills you should add.
              </p>
            </div>
          </div>
        </section>

        {/* Related Skill & Optimization Tools Cluster */}
        <section className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Related Resume Optimization Tools
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Test your skills against live job descriptions and turn them into quantified achievements:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => onNavigate('ats-checker')}
              className="p-4 text-left rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">ATS Scanner</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                ATS Resume Checker
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Scan your resume against any job posting to verify keyword match percentage.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('resume-bullet-generator')}
              className="p-4 text-left rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">Impact Formula</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Bullet Point Generator
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Integrate hard skills into high-converting Google X-Y-Z accomplishment statements.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('resume-word-counter')}
              className="p-4 text-left rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">Length & Verbs</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Resume Word Counter
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Measure word count, action verb frequency, and 1 vs 2 page layout fitness.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('resume-writing-guide')}
              className="p-4 text-left rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:shadow-xs transition-all group"
            >
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">Writing Guide</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Resume Writing Guide
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Comprehensive step-by-step frameworks for crafting winning job applications.
              </p>
            </button>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
            Build Your Resume with ATS-Optimized Skills
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
            Format your skills cleanly, pass applicant tracking systems, and generate a professional vector PDF in minutes.
          </p>
          <button
            onClick={() => onStartBuilder()}
            className="px-8 py-4 bg-white text-blue-900 hover:bg-neutral-100 font-bold rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer text-base"
          >
            Open Free Resume Builder
          </button>
        </section>

      </div>
    </div>
  );
};
