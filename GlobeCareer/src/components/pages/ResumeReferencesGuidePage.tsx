import React, { useState } from 'react';
import {
  FileText,
  Users,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  Mail,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  Lock,
  ExternalLink
} from 'lucide-react';

interface ResumeReferencesGuidePageProps {
  onStartBuilder: () => void;
  onNavigate: (page: string) => void;
}

const REFERENCE_SHEET_TEMPLATE = `SARAH JENNINGS
Senior Operations & Process Optimization Manager
sarah.jennings@example.com | (555) 789-0123 | Dallas, TX | linkedin.com/in/sarahjennings

PROFESSIONAL REFERENCES

1. DAVID PATEL, VP OF SUPPLY CHAIN OPERATIONS
Company: Apex Logistics Group
Relationship: Direct Manager for 3 years (2021 – 2024)
Phone: (555) 987-6543
Email: david.patel@apexlogistics-example.com
Context: Supervised my management of regional fulfillment centers, WMS deployment, and Lean Six Sigma initiatives.

2. DR. ELEANOR VANCE, CHIEF TECHNOLOGY OFFICER
Company: NexaTech Solutions
Relationship: Cross-Functional Project Sponsor & Stakeholder (2020 – 2022)
Phone: (555) 345-6789
Email: e.vance@nexatech-example.com
Context: Collaborated closely on enterprise ERP migration and automated warehouse dispatch systems.

3. MICHAEL CHANG, SENIOR PROCESS ENGINEER
Company: Trinity Freight Systems
Relationship: Peer Colleague & Senior Technical Lead (2018 – 2020)
Phone: (555) 876-5432
Email: mchang@trinityfreight-example.com
Context: Partnered on freight rate renegotiations and vendor SLA metric dashboards.`;

const EMAIL_TEMPLATE_MANAGER = `Subject: Quick favor / Reference request – Sarah Jennings

Hi David,

I hope you're having a great week!

I am currently interviewing for a Senior Director of Operations role at [Company Name]. The hiring team was very impressed by our warehouse automation work at Apex Logistics, and they have requested a list of professional references.

Given how closely we collaborated over the past three years, would you feel comfortable serving as a professional reference for me?

The role primarily focuses on multi-site warehouse management, lean manufacturing, and cross-functional team leadership—very similar to our kaizen and WMS overhaul projects.

If you're willing, I'd be happy to share my current resume and the job description for your review. Please let me know the best phone number and email address you'd prefer I provide them.

Thank you so much for your continuous guidance and support!

Warm regards,
Sarah Jennings
(555) 789-0123`;

export const ResumeReferencesGuidePage: React.FC<ResumeReferencesGuidePageProps> = ({
  onStartBuilder,
  onNavigate
}) => {
  const [copiedSheet, setCopiedSheet] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleCopySheet = () => {
    navigator.clipboard.writeText(REFERENCE_SHEET_TEMPLATE);
    setCopiedSheet(true);
    setTimeout(() => setCopiedSheet(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_TEMPLATE_MANAGER);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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
          <span className="text-blue-600 dark:text-blue-400">References on a Resume</span>
        </div>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-900">
            <Users className="w-3.5 h-3.5" />
            <span>Modern Hiring Consensus</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white leading-tight">
            Should You Put References on a Resume? (And How to List Them)
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            The short answer is <strong>no</strong>. Learn why including references or writing "References available upon request" hurts your resume, how to create a separate professional Reference Sheet, and copy our email templates to ask referees.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartBuilder}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30"
            >
              <span>Build Professional Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('letter-templates')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
            >
              <span>View Outreach Templates</span>
            </button>
          </div>
        </div>

        {/* The Verdict Box: Why References Don't Belong on Your Resume */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>The Modern Recruiting Standard</span>
          </div>

          <h2 className="text-2xl font-black text-neutral-950 dark:text-white">
            Why You Should NOT Put References on Your Resume
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2">
              <span className="font-bold text-neutral-900 dark:text-white block">1. Wastes Prime Page Space</span>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
                Your resume should strictly contain 1 or 2 pages of high-impact achievements. Listing 3 references consumes 15–20% of a page that could otherwise prove quantifiable career wins.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2">
              <span className="font-bold text-neutral-900 dark:text-white block">2. Privacy &amp; Data Security (GDPR)</span>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
                When you upload your resume to public job boards, hundreds of automated bots crawl it. Publishing your former manager's personal phone and email exposes them to spam and violates GDPR in Europe.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2">
              <span className="font-bold text-neutral-900 dark:text-white block">3. Premature in the Hiring Process</span>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-xs">
                Recruiters never call references during the initial resume review. References are only contacted at the final stage before issuing a formal job offer.
              </p>
            </div>
          </div>

          {/* Callout: Why "References Available Upon Request" is Dead */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-amber-900 dark:text-amber-200 space-y-1">
            <span className="font-bold">Avoid Writing: "References Available Upon Request"</span>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              Employers already assume references are available upon request. Stating it explicitly is considered dated filler text that dates your resume back to the 1990s. Delete the line completely.
            </p>
          </div>
        </div>

        {/* How to Build a Professional Reference Sheet */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-neutral-950 dark:text-white">
                The Correct Solution: A Standalone Reference Sheet
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Create a dedicated 1-page document with identical typography and header branding as your resume, to be provided when requested.
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopySheet}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-bold text-xs transition-colors shrink-0"
            >
              {copiedSheet ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSheet ? 'Copied' : 'Copy Reference Sheet'}</span>
            </button>
          </div>

          <pre className="p-5 rounded-3xl bg-neutral-950 text-neutral-200 text-xs font-mono leading-relaxed overflow-x-auto border border-neutral-800">
            {REFERENCE_SHEET_TEMPLATE}
          </pre>
        </div>

        {/* What to Include for Each Reference */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-neutral-950 dark:text-white">
            What Information to Include for Each Reference
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            For each of your 3 to 4 professional references, provide the following standard data fields:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">Full Name &amp; Suffix</span>
              <p className="text-neutral-600 dark:text-neutral-300">e.g. Dr. Eleanor Vance, PMP</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">Current Job Title</span>
              <p className="text-neutral-600 dark:text-neutral-300">e.g. VP of Global Supply Chain</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">Current Company</span>
              <p className="text-neutral-600 dark:text-neutral-300">Even if different from where you worked</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">Professional Relationship</span>
              <p className="text-neutral-600 dark:text-neutral-300">e.g. "Former Direct Manager for 3 Years"</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">Direct Phone &amp; Email</span>
              <p className="text-neutral-600 dark:text-neutral-300">Confirm their preferred contact method</p>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400">Brief Context Line</span>
              <p className="text-neutral-600 dark:text-neutral-300">1 sentence on projects you delivered together</p>
            </div>
          </div>
        </div>

        {/* Email Template: How to Ask Someone to Be Your Reference */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600">
                <Mail className="w-4 h-4" />
                <span>Reference Etiquette</span>
              </div>
              <h2 className="text-2xl font-black text-neutral-950 dark:text-white mt-1">
                How to Ask Someone to Be Your Reference (Email Template)
              </h2>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-bold text-xs transition-colors shrink-0"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Never list someone as a reference without asking their permission first. Referees caught by surprise may give hesitant answers that cost you the offer. Send this proven email:
          </p>

          <pre className="p-5 rounded-2xl bg-neutral-950 text-neutral-200 text-xs font-mono leading-relaxed overflow-x-auto border border-neutral-800">
            {EMAIL_TEMPLATE_MANAGER}
          </pre>
        </div>

        {/* FAQ Section */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
          <h2 className="text-2xl font-bold text-neutral-950 dark:text-white">
            Frequently Asked Questions About Resume References
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                How many references should I have?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Most employers ask for <strong>3 references</strong>. For senior executive roles, prepare 4 to 5 references (at least 2 direct managers, 1 peer/cross-functional partner, and 1 direct report to validate your management style).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Can I use a personal or character reference?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Only if you are an entry-level candidate with zero professional work history (e.g. a professor, coach, or volunteer supervisor). Corporate recruiters prioritize professional references who can attest to your technical output and reliability.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                What if I left my previous company on bad terms?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                You do not have to list your most recent direct manager if the relationship was strained. You can list a senior project lead, a department head, or a trusted former manager from another department who knows your work quality.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                When should I bring my reference sheet to an interview?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Bring 2 printed copies to final-round in-person interviews in a professional folder. For remote video interviews, keep the PDF ready to email immediately when the recruiter or hiring manager asks for it.
              </p>
            </div>
          </div>
        </div>

        {/* Related Application Documents & Career Tools */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
          <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
            Related Job Application Documents & Reference Tools
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Equip your job search with formal recommendation letters, professional outreach emails, and formatted resumes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => onNavigate('recommendation-letter')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Document Builder</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Recommendation Letter
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Draft formal letters of recommendation for former colleagues or students.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('email-generator')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">Outreach Tool</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Cold Email Generator
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Generate networking emails to re-engage past managers and ask for references.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('reverse-chronological-resume-format')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">Formatting Pillar</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Chronological Resume
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                The standard resume layout that avoids wasting space on references.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('cover-letter-builder')}
              className="p-4 text-left rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:shadow-sm transition-all group"
            >
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">Cover Letter</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-between">
                Cover Letter Builder
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Pair your resume with a tailored cover letter explaining your career narrative.
              </p>
            </button>
          </div>
        </div>

        {/* Final CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Build an ATS-Friendly Resume Without Clutter</h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Format your experience, education, and skills with perfect margins and vector PDF export.
            </p>
          </div>
          <button
            onClick={onStartBuilder}
            className="px-6 py-3.5 rounded-xl bg-white text-blue-700 hover:bg-neutral-100 font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0"
          >
            Open Resume Builder
          </button>
        </div>

      </div>
    </div>
  );
};
