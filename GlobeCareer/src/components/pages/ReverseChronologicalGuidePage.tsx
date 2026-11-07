import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
  Layers,
  ChevronRight,
  BookmarkPlus,
  HelpCircle,
  Award,
  Zap,
  Globe
} from 'lucide-react';

interface ReverseChronologicalGuidePageProps {
  onStartBuilder: () => void;
  onNavigate: (page: string) => void;
}

const SAMPLE_CHRONOLOGICAL_TEMPLATE = `SARAH JENNINGS
Senior Operations & Process Optimization Manager
sarah.jennings@example.com | (555) 789-0123 | Dallas, TX | linkedin.com/in/sarahjennings

PROFESSIONAL SUMMARY
Results-driven Operations Leader with 8+ years of progressive experience scaling supply chain logistics, lean manufacturing workflows, and cross-functional enterprise initiatives. Proven track record of reducing cycle times by 35% and saving $1.4M across 4 fulfillment hubs.

PROFESSIONAL EXPERIENCE

Senior Operations Manager | Apex Logistics Group | Dallas, TX
August 2023 – Present
• Spearheaded enterprise warehouse management system (WMS) upgrade across 3 regional distribution centers, boosting order processing throughput by 28%.
• Directed a team of 4 shift supervisors and 65 warehouse fulfillment associates, reducing annual turnover from 24% to 9%.
• Orchestrated weekly lean Six Sigma kaizen events, identifying $420,000 in redundant material handling expenses.

Operations Supervisor | Apex Logistics Group | Dallas, TX
June 2020 – July 2023
• Supervised daily inbound receiving and inventory auditing for 45,000 SKUs with 99.85% inventory accuracy.
• Implemented automated barcode scanning protocol, cutting shipment intake time from 48 hours to 14 hours.
• Recognized with "Regional Operational Excellence Award" in 2022 for zero OSHA-recordable safety incidents.

Supply Chain Specialist | Trinity Freight Systems | Fort Worth, TX
August 2017 – May 2020
• Negotiated carrier contracts across 14 third-party freight providers, securing 12% freight rate discounts.
• Built automated Excel VBA dispatch reporting dashboards utilized daily by executive management.

EDUCATION
Texas A&M University — B.S. in Supply Chain Management (Cum Laude, 2017)

CERTIFICATIONS
• Certified Six Sigma Black Belt (CSSBB) — ASQ, 2022
• Project Management Professional (PMP) — PMI, 2021

SKILLS & TOOLS
Enterprise ERP (SAP S/4HANA, NetSuite), Lean Six Sigma, WMS Automation, Supply Chain Modeling, Vendor Negotiations, Cross-Functional Team Leadership`;

export const ReverseChronologicalGuidePage: React.FC<ReverseChronologicalGuidePageProps> = ({
  onStartBuilder,
  onNavigate
}) => {
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SAMPLE_CHRONOLOGICAL_TEMPLATE);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-blue-600 transition-colors"
          >
            GlobeCareer
          </button>
          <span>/</span>
          <button 
            onClick={() => onNavigate('writing-guide')} 
            className="hover:text-blue-600 transition-colors"
          >
            Resume Guides
          </button>
          <span>/</span>
          <span className="text-blue-600 dark:text-blue-400">Reverse Chronological Resume Format</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-900">
            <Clock className="w-3.5 h-3.5" />
            <span>The Gold Standard in Modern Hiring</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white leading-tight">
            Reverse Chronological Resume Format: Guide, Examples &amp; Free Template
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            Over 95% of recruiters, hiring managers, and Applicant Tracking Systems (ATS) prefer the reverse chronological resume format. Learn why it dominates global hiring, how to structure each section, and copy our proven template.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartBuilder}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30"
            >
              <span>Build Chronological Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('templates')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Browse All Templates</span>
            </button>
          </div>
        </div>

        {/* What Is Reverse Chronological Callout Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-neutral-950 dark:text-white">
            What is a Reverse Chronological Resume?
          </h2>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            A <strong>reverse chronological resume</strong> lists your work experience and education starting with your <em>most recent position at the very top</em>, progressing backward in time to earlier roles. 
          </p>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Recruiters prioritize what you are capable of delivering <em>right now</em>. By presenting your latest job title, newest technical proficiencies, and most senior responsibilities first, you immediately validate your qualification for the target job within the critical 7-second recruiter scan.
          </p>
        </div>

        {/* Visual Schematic Diagram */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 text-white border border-neutral-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Layers className="w-4 h-4" />
              <span>Anatomy of a Chronological Resume</span>
            </div>
            <span className="text-xs text-neutral-400">Strict Section Order</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-1.5">
              <span className="font-mono text-blue-400 font-bold">01. HEADER</span>
              <div className="font-bold text-white text-sm">Contact Info</div>
              <p className="text-[11px] text-neutral-300">Name, Title, City/State, Phone, Email, LinkedIn &amp; Portfolio.</p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-1.5">
              <span className="font-mono text-purple-400 font-bold">02. SUMMARY</span>
              <div className="font-bold text-white text-sm">Professional Summary</div>
              <p className="text-[11px] text-neutral-300">3–4 lines summarizing years of experience, core skills &amp; top wins.</p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-1.5 md:col-span-1 border-blue-500/50 bg-blue-950/20">
              <span className="font-mono text-emerald-400 font-bold">03. EXPERIENCE</span>
              <div className="font-bold text-white text-sm">Work History</div>
              <p className="text-[11px] text-neutral-300">Most recent role at the top. 4–6 metric-driven achievement bullets.</p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-1.5">
              <span className="font-mono text-amber-400 font-bold">04. EDUCATION</span>
              <div className="font-bold text-white text-sm">Degrees &amp; Dates</div>
              <p className="text-[11px] text-neutral-300">Degree, Major, Institution, Graduation Year, Honors/GPA if &gt;3.5.</p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-800/80 border border-neutral-700 space-y-1.5">
              <span className="font-mono text-rose-400 font-bold">05. SKILLS</span>
              <div className="font-bold text-white text-sm">Competencies</div>
              <p className="text-[11px] text-neutral-300">Hard skills, software tools, frameworks &amp; industry certifications.</p>
            </div>
          </div>
        </div>

        {/* Comparison: Chronological vs Functional vs Hybrid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-neutral-950 dark:text-white">
            Resume Format Comparison: Which Should You Use?
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Compare the three primary resume structures to understand why reverse-chronological wins in almost all hiring environments.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
              <thead className="bg-neutral-100 dark:bg-neutral-800/60 font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                <tr>
                  <th className="p-4">Format</th>
                  <th className="p-4">Primary Focus</th>
                  <th className="p-4">ATS Compatibility</th>
                  <th className="p-4">Best For</th>
                  <th className="p-4">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr className="bg-emerald-50/40 dark:bg-emerald-950/20">
                  <td className="p-4 font-bold text-neutral-900 dark:text-white">
                    Reverse Chronological
                  </td>
                  <td className="p-4">Career progression, promotions, and recent achievements</td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">100% — Flawless</td>
                  <td className="p-4">95%+ of all professionals, career climbers, and standard corporate applicants</td>
                  <td className="p-4 font-bold text-emerald-600">Standard &amp; Strongly Recommended</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-neutral-900 dark:text-white">
                    Hybrid / Combination
                  </td>
                  <td className="p-4">Blends extensive skill categories with chronological job history</td>
                  <td className="p-4 font-semibold text-blue-600">90% — Good</td>
                  <td className="p-4">Senior executives, consultants, career changers with transferable skills</td>
                  <td className="p-4 text-neutral-500">Viable for 10+ years experience</td>
                </tr>
                <tr className="bg-rose-50/30 dark:bg-rose-950/10">
                  <td className="p-4 font-bold text-neutral-900 dark:text-white">
                    Functional (Skills-Based)
                  </td>
                  <td className="p-4">Hides employer names/dates; groups duties by abstract skill buckets</td>
                  <td className="p-4 font-bold text-rose-600">Very Poor (&lt;40%)</td>
                  <td className="p-4">Severe employment gaps, returning to workforce</td>
                  <td className="p-4 font-bold text-rose-600">Avoid. ATS fails to parse dates/titles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section-by-Section Masterclass */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-neutral-950 dark:text-white">
            How to Structure Each Section in Reverse Chronological Order
          </h2>

          {/* 1. Work Experience Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <span>Section 01</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              The Work Experience Section (The Engine of Your Resume)
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Every job entry must follow an identical, clean typographic hierarchy so the ATS parser can link your job title to the correct employer and employment date range.
            </p>

            <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 font-mono text-xs sm:text-sm space-y-1 text-neutral-800 dark:text-neutral-200">
              <div className="font-bold text-blue-600 dark:text-blue-400">[Job Title] | [Company Name] | [City, State or Remote]</div>
              <div className="text-neutral-500">[Month Year] – [Month Year or Present]</div>
              <div className="pt-2 text-neutral-700 dark:text-neutral-300">
                • [Action Verb] + [Quantifiable Accomplishment] + [Methodology / Tool]<br />
                • [Action Verb] + [Quantifiable Accomplishment] + [Methodology / Tool]<br />
                • [Action Verb] + [Quantifiable Accomplishment] + [Methodology / Tool]
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Correct Chronological Format
                </span>
                <p className="text-neutral-600 dark:text-neutral-300 font-mono text-[11px]">
                  Senior Software Engineer | Stripe (2023 – Present)<br />
                  Software Engineer | Stripe (2021 – 2023)<br />
                  Junior Developer | Acme Corp (2019 – 2021)
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-1">
                <span className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Incorrect (Forward Chronological)
                </span>
                <p className="text-neutral-600 dark:text-neutral-300 font-mono text-[11px]">
                  Junior Developer | Acme Corp (2019 – 2021)<br />
                  Software Engineer | Stripe (2021 – 2023)<br />
                  Senior Software Engineer | Stripe (2023 – Present)
                </p>
              </div>
            </div>
          </div>

          {/* 2. Education Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider">
              <span>Section 02</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              The Education Section in Reverse Chronological Order
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              If you have multiple degrees (e.g. Master's and Bachelor's), list the highest degree first. Once you have graduated from college, high school education should be omitted.
            </p>

            <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 font-mono text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 space-y-1">
              <div>Columbia University — M.S. in Data Analytics (2023)</div>
              <div>University of Michigan — B.S. in Computer Science (2021)</div>
            </div>
          </div>
        </div>

        {/* Copyable Full Resume Template Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-neutral-950 dark:text-white">
                Complete Reverse Chronological Resume Template
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500">
                Copy this pre-formatted, ATS-certified template or load it into the builder.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-bold text-xs transition-colors"
              >
                {copiedTemplate ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedTemplate ? 'Copied Template' : 'Copy Text'}</span>
              </button>
              <button
                type="button"
                onClick={onStartBuilder}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
              >
                <span>Edit in Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <pre className="p-5 rounded-2xl bg-neutral-950 text-neutral-200 text-xs font-mono leading-relaxed overflow-x-auto border border-neutral-800 max-h-96">
            {SAMPLE_CHRONOLOGICAL_TEMPLATE}
          </pre>
        </div>

        {/* 5 Fatal Mistakes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-neutral-950 dark:text-white">
            5 Common Mistakes in Reverse Chronological Resumes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>1. Forgetting to Update Current Job to "Present"</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                If you are currently employed, always list your date as <em>"Month Year – Present"</em>. Listing an ended date when you are still there signals unemployment to ATS bots.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>2. Using Forward Chronological Order</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Starting your resume with your 2014 college internship forces recruiters to scroll down past outdated tasks before seeing your current senior qualifications.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>3. Inconsistent Date Formatting</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Do not mix "Jan 2022 – March 2024" with "06/2020 – 01/2022". Pick one standard convention (e.g. "Jun 2022 – Mar 2024") and apply it universally.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>4. Giving Equal Weight to Ancient Roles</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Your role from 10 years ago should have 1–2 bullets maximum. Focus 70% of your resume's page space on achievements from the last 3–5 years.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
            Frequently Asked Questions: Reverse Chronological Resume
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Why do ATS systems prefer the reverse chronological format?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Applicant Tracking Systems use natural language parsers that map time duration and recency to skill keywords. If a resume lists Python under a role dated 2024–Present, the ATS scores the candidate as possessing current, relevant proficiency.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                How far back should a chronological resume go?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                As a standard rule, include the last <strong>10 to 15 years</strong> of relevant professional history. Anything older than 15 years can be omitted or summarized in an "Earlier Career History" line to prevent age bias and conserve page space.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                What if I have an employment gap in my chronological resume?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Be honest and transparent. You can include a brief entry such as "Career Break / Continuing Education &amp; Certifications" (2022–2023) detailing courses completed, freelance projects, or caregiving, rather than attempting a functional format which arouses recruiter suspicion.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Does this format apply to international CVs in Europe and the UK?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Yes. Both British standard CVs and European Europass CVs follow the reverse-chronological order for both professional experience and education/training.
              </p>
            </div>
          </div>
        </div>

        {/* Topical Cluster & Optimization Standards */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
          <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
            Essential Resume Formats & Drafting Utilities
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Combine chronological sequencing with precise accomplishment metrics and regional standards:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => onNavigate('resume-bullet-generator')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Impact Formula</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Bullet Point Generator
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Turn passive duties into quantified Google X-Y-Z achievements.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('resume-word-counter')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">Length Checker</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Resume Word Counter
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Target 450–650 words for 1-page resumes and check verb frequency.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('cv-vs-resume')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">Comparison Guide</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                CV vs Resume Differences
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                When to use 1-page US resumes vs multi-page international CVs.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('references-on-resume')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">Formatting Rule</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                References on Resume
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Why "references upon request" is obsolete and how to format a reference sheet.
              </p>
            </button>
          </div>
        </div>

        {/* Final CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Ready to Build Your Chronological Resume?</h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Select one of our 18 ATS-compliant templates formatted specifically in reverse chronological order.
            </p>
          </div>
          <button
            onClick={onStartBuilder}
            className="px-6 py-3.5 rounded-xl bg-white text-blue-700 hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
          >
            Create My Resume Now
          </button>
        </div>

      </div>
    </div>
  );
};
