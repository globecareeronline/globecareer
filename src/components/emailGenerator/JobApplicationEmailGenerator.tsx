import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  Building,
  User,
  Paperclip,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Link as LinkIcon,
  CheckCircle2,
  Share2,
  FileText
} from 'lucide-react';
import { WorkflowNavigation, WorkflowStep } from '../common/WorkflowNavigation';
import { UnifiedDownloadButton, DownloadFormatOption } from '../common/UnifiedDownloadButton';
import { exportEmailToEml, exportTextDocumentToDocx, exportTextToTxt } from '../../utils/documentExport';
import confetti from 'canvas-confetti';

export type EmailPurpose =
  | 'application'
  | 'recruiter_outreach'
  | 'networking'
  | 'referral_request'
  | 'follow_up';

export type EmailTone = 'professional_direct' | 'enthusiastic' | 'formal_executive';

type EmailStep = 'scenario' | 'details' | 'output';

const EMAIL_STEPS: WorkflowStep[] = [
  { id: 'scenario', label: 'Scenario & Target', description: 'Purpose, company & role' },
  { id: 'details', label: 'Your Pitch & Tone', description: 'Experience, tone & attachments' },
  { id: 'output', label: 'Email Output & Export', description: 'Subject, body & downloads' },
];

interface EmailFormData {
  purpose: EmailPurpose;
  recipientNameOrRole: string;
  companyName: string;
  targetJobTitle: string;
  senderName: string;
  senderTitle: string;
  skillsAndExperience: string;
  contextOrJobSnippet: string;
  tone: EmailTone;
  attachResume: boolean;
  portfolioUrl: string;
  mutualConnection: string;
  followUpDaysSince: string;
}

const INITIAL_FORM: EmailFormData = {
  purpose: 'application',
  recipientNameOrRole: '',
  companyName: '',
  targetJobTitle: '',
  senderName: '',
  senderTitle: '',
  skillsAndExperience: '',
  contextOrJobSnippet: '',
  tone: 'professional_direct',
  attachResume: true,
  portfolioUrl: '',
  mutualConnection: '',
  followUpDaysSince: '10',
};

const PRESETS: { label: string; description: string; data: Partial<EmailFormData> }[] = [
  {
    label: 'Direct Job Application',
    description: 'Submitting resume for an active open role with qualifications match',
    data: {
      purpose: 'application',
      recipientNameOrRole: 'Hiring Team',
      companyName: 'Stripe',
      targetJobTitle: 'Staff Infrastructure Engineer',
      senderName: 'David Miller',
      senderTitle: 'Senior Cloud Engineer',
      skillsAndExperience: '7+ years leading Kubernetes cluster operations, Terraform automation, and 99.99% uptime multi-region cloud migrations',
      contextOrJobSnippet: 'Requisition mentions high-scale payments routing and distributed systems resilience',
      tone: 'professional_direct',
      attachResume: true,
      portfolioUrl: 'https://github.com/david-cloud',
      mutualConnection: '',
      followUpDaysSince: '10',
    },
  },
  {
    label: 'Recruiter Outreach',
    description: 'Connecting directly with in-house talent acquisition or tech recruiters',
    data: {
      purpose: 'recruiter_outreach',
      recipientNameOrRole: 'Sarah Jenkins (Technical Recruiter)',
      companyName: 'Monzo',
      targetJobTitle: 'Senior Backend Engineer',
      senderName: 'Maya Patel',
      senderTitle: 'Backend Go Specialist',
      skillsAndExperience: '5 years architecting high-throughput Go microservices, event-driven Kafka pipelines, and banking ledger integrations',
      contextOrJobSnippet: 'Noticed Monzo’s recent expansion into US banking infrastructure',
      tone: 'enthusiastic',
      attachResume: true,
      portfolioUrl: 'https://linkedin.com/in/mayapatel-tech',
      mutualConnection: '',
      followUpDaysSince: '10',
    },
  },
  {
    label: 'Internal Referral Request',
    description: 'Reaching out politely to a mutual connection, former colleague, or alumnus',
    data: {
      purpose: 'referral_request',
      recipientNameOrRole: 'Chris Evans',
      companyName: 'Datadog',
      targetJobTitle: 'Product Manager, Cloud Observability',
      senderName: 'Jordan Chen',
      senderTitle: 'Technical PM',
      skillsAndExperience: '4 years leading APM observability tooling and enterprise developer dashboards',
      contextOrJobSnippet: 'Requisition #ENG-8849: Senior APM Platform Manager',
      tone: 'professional_direct',
      attachResume: true,
      portfolioUrl: '',
      mutualConnection: 'ex-colleagues at Splunk',
      followUpDaysSince: '10',
    },
  },
  {
    label: 'Application Follow-Up',
    description: 'Following up cordially 1-2 weeks after an initial portal or email application',
    data: {
      purpose: 'follow_up',
      recipientNameOrRole: 'Hiring Manager',
      companyName: 'Linear',
      targetJobTitle: 'Senior Product Designer',
      senderName: 'Chloe Bennett',
      senderTitle: 'Staff UI/UX Designer',
      skillsAndExperience: 'Design systems, high-fidelity interaction prototyping, and developer tooling ergonomics',
      contextOrJobSnippet: 'Applied through careers portal 12 days ago',
      tone: 'professional_direct',
      attachResume: true,
      portfolioUrl: 'https://chloebennett.design',
      mutualConnection: '',
      followUpDaysSince: '12',
    },
  },
  {
    label: 'Networking & Inquiry',
    description: 'Informational conversation inquiry with an engineering leader or manager',
    data: {
      purpose: 'networking',
      recipientNameOrRole: 'Dr. Rebecca Stone',
      companyName: 'AstraZeneca',
      targetJobTitle: 'Senior Clinical Data Scientist',
      senderName: 'Julian Alvarez',
      senderTitle: 'Bioinformatics Researcher',
      skillsAndExperience: 'Genomic pipeline automation, statistical modeling in R and Python, and clinical trial analytics',
      contextOrJobSnippet: 'Followed Dr. Stone’s recent research on computational oncology',
      tone: 'formal_executive',
      attachResume: false,
      portfolioUrl: 'https://scholar.google.com/citations?user=sample',
      mutualConnection: '',
      followUpDaysSince: '10',
    },
  },
];

export interface JobApplicationEmailGeneratorProps {
  onNavigate?: (page: string) => void;
  initialPreset?: Partial<EmailFormData>;
  onNavigateToTemplates?: () => void;
}

export const JobApplicationEmailGenerator: React.FC<JobApplicationEmailGeneratorProps> = ({
  onNavigate,
  initialPreset,
  onNavigateToTemplates,
}) => {
  const [formData, setFormData] = useState<EmailFormData>(INITIAL_FORM);
  const [currentStep, setCurrentStep] = useState<EmailStep>('scenario');
  const [subjectLine, setSubjectLine] = useState<string>('');
  const [emailBody, setEmailBody] = useState<string>('');
  const [copiedSubject, setCopiedSubject] = useState<boolean>(false);
  const [copiedBody, setCopiedBody] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync initial preset if passed from Templates Hub
  React.useEffect(() => {
    if (initialPreset) {
      setFormData(prev => ({ ...prev, ...initialPreset }));
      setValidationError(null);
    }
  }, [initialPreset]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setValidationError(null);
  };

  const loadPreset = (presetData: Partial<EmailFormData>) => {
    setFormData(prev => ({ ...prev, ...presetData }));
    setValidationError(null);
  };

  const generateEmail = () => {
    if (!formData.companyName.trim()) {
      setValidationError('Please enter the company or organization name.');
      setCurrentStep('scenario');
      return;
    }
    if (!formData.targetJobTitle.trim()) {
      setValidationError('Please enter the target job title.');
      setCurrentStep('scenario');
      return;
    }
    if (!formData.senderName.trim()) {
      setValidationError('Please enter your full name (sender).');
      setCurrentStep('details');
      return;
    }

    setValidationError(null);

    const recipient = formData.recipientNameOrRole.trim() || 'Hiring Team';
    const cName = formData.companyName.trim();
    const role = formData.targetJobTitle.trim();
    const sName = formData.senderName.trim();
    const sTitle = formData.senderTitle.trim() || 'Professional';
    const skills = formData.skillsAndExperience.trim() || 'my relevant background and technical experience';
    const context = formData.contextOrJobSnippet.trim();
    const portfolio = formData.portfolioUrl.trim();
    const connection = formData.mutualConnection.trim();
    const days = formData.followUpDaysSince.trim() || '10';

    let greeting = `Dear ${recipient},`;
    if (recipient.toLowerCase().includes('team') || recipient.toLowerCase().includes('committee')) {
      greeting = `Dear ${recipient},`;
    }

    let subject = '';
    let body = '';

    if (formData.purpose === 'application') {
      subject = `Application: ${role} – ${sName}`;

      const resumeNotice = formData.attachResume
        ? 'I have attached my resume and detailed career background for your review.'
        : 'My complete background and credentials are fully detailed below.';

      const portfolioNotice = portfolio ? ` You can also review my work and portfolio here: ${portfolio}.` : '';

      if (formData.tone === 'enthusiastic') {
        body = [
          greeting,
          '',
          `I am writing with great enthusiasm to submit my application for the ${role} position at ${cName}. Having closely tracked ${cName}'s innovations in this space, I am eager to contribute my expertise in ${skills}.`,
          '',
          `In my career as a ${sTitle}, I have focused on delivering measurable outcomes, driving cross-functional alignment, and building robust solutions${context ? ` matching your requisition needs (${context})` : ''}. I believe my background aligns directly with the challenges your team is tackling.`,
          '',
          `${resumeNotice}${portfolioNotice}`,
          '',
          `I would welcome the opportunity to discuss how my skill set and passion can add value to ${cName}. Thank you for your time, consideration, and leadership.`,
          '',
          'Warm regards,',
          '',
          sName,
          sTitle,
        ].join('\n');
      } else {
        body = [
          greeting,
          '',
          `Please accept this email as my formal application for the ${role} role at ${cName}. With a strong background in ${skills}, I am confident in my ability to make an immediate, positive impact on your team.`,
          '',
          `As a ${sTitle}, I have consistently demonstrated a track record of high-quality execution${context ? `, specifically within areas addressing ${context}` : ''}. I am drawn to ${cName} because of your team's commitment to engineering and operational excellence.`,
          '',
          `${resumeNotice}${portfolioNotice}`,
          '',
          'I would appreciate the opportunity to speak with you regarding the position and how my experience meets your current needs. Thank you for your consideration.',
          '',
          'Sincerely,',
          '',
          sName,
          sTitle,
        ].join('\n');
      }

    } else if (formData.purpose === 'recruiter_outreach') {
      subject = `Inquiry: ${role} Opportunities at ${cName} – ${sName}`;

      body = [
        greeting,
        '',
        `I hope this email finds you well! I noticed your work recruiting top talent for ${cName} and wanted to reach out directly regarding current or upcoming ${role} opportunities.`,
        '',
        `Briefly about my background: I am a ${sTitle} with specialized experience in ${skills}${context ? ` (${context})` : ''}. Over recent years, I have helped teams accelerate deliverable velocity, scale architecture, and solve high-stakes challenges.`,
        '',
        formData.attachResume ? 'I have attached my resume for reference.' : '',
        portfolio ? `Portfolio / Work reference: ${portfolio}` : '',
        '',
        `If you have 10 minutes for a brief conversation this or next week, I would love to connect and learn more about ${cName}'s roadmap.`,
        '',
        'Best regards,',
        '',
        sName,
        sTitle,
      ].filter(line => line !== undefined).join('\n');

    } else if (formData.purpose === 'referral_request') {
      subject = `${role} role at ${cName} – Reaching out / Referral inquiry`;

      body = [
        `Hi ${recipient},`,
        '',
        `I hope everything is going great with you! ${connection ? `Reaching out as ${connection}.` : ''}`,
        '',
        `I noticed that ${cName} currently has an open requisition for ${role}${context ? ` (${context})` : ''}, and given your experience with the company, I immediately thought of connecting with you.`,
        '',
        `With my recent background as a ${sTitle} focused on ${skills}, I believe this role would be a natural fit for my experience.`,
        '',
        `Would you be comfortable submitting an internal referral on my behalf or connecting me with the hiring manager? I have attached an up-to-date copy of my resume to make it as effortless as possible.`,
        '',
        'Either way, I appreciate your time and would love to catch up soon!',
        '',
        'Best,',
        '',
        sName,
      ].join('\n');

    } else if (formData.purpose === 'follow_up') {
      subject = `Following Up: Application for ${role} – ${sName}`;

      body = [
        greeting,
        '',
        `I hope you are having a productive week.`,
        '',
        `I am writing to follow up on my application for the ${role} position at ${cName}, which I submitted approximately ${days} days ago.`,
        '',
        `I remain very enthusiastic about the opportunity to join ${cName} and contribute my experience in ${skills}. Please let me know if there are any additional work samples, references, or details I can provide to assist in your evaluation.`,
        '',
        'Thank you once again for your time and continued consideration.',
        '',
        'Sincerely,',
        '',
        sName,
        sTitle,
      ].join('\n');

    } else {
      // networking
      subject = `Connecting regarding ${cName} & ${role} – ${sName}`;

      const intro = connection
        ? `I hope you are well! Reaching out via ${connection}.`
        : `I hope you are having a great week.`;

      const bodyPitch = `I have been following your career and the impactful work happening at ${cName}. As a fellow ${sTitle} with a focus in ${skills}, I deeply admire your team's approach${context ? ` to ${context}` : ''}.`;

      const ask = `If you have 15 minutes over the next few weeks for a brief virtual coffee or career chat, I would be grateful for the opportunity to hear your perspective on the industry and the culture at ${cName}.`;

      body = [
        greeting,
        '',
        intro,
        '',
        bodyPitch,
        '',
        ask,
        '',
        'Thank you very much for considering, and I look forward to connecting.',
        '',
        'Best regards,',
        '',
        sName,
        sTitle,
      ].join('\n');
    }

    setSubjectLine(subject);
    setEmailBody(body);
    setCurrentStep('output');
    try {
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
    } catch (e) {
      // ignore
    }
  };

  const handleCopySubject = async () => {
    if (!subjectLine) return;
    try {
      await navigator.clipboard.writeText(subjectLine);
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } catch (err) {
      console.warn('Copy subject error:', err);
    }
  };

  const handleCopyBody = async () => {
    if (!emailBody) return;
    try {
      await navigator.clipboard.writeText(`Subject: ${subjectLine}\n\n${emailBody}`);
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
    } catch (err) {
      console.warn('Copy body error:', err);
    }
  };

  const downloadFormats: DownloadFormatOption[] = [
    {
      id: 'eml',
      label: 'Standard Email (.eml)',
      extension: '.eml',
      description: 'Opens natively in Outlook, Apple Mail, Thunderbird with subject and body pre-filled',
      badge: 'Mail Client',
      isPrimary: true,
      onExport: () => {
        exportEmailToEml({
          subject: subjectLine || 'Application',
          body: emailBody,
          senderName: formData.senderName,
          recipientName: formData.recipientNameOrRole || formData.companyName
        }, `Email_${(formData.companyName || 'Application').replace(/[^a-zA-Z0-9]/g, '_')}`);
      }
    },
    {
      id: 'docx',
      label: 'Microsoft Word (.docx)',
      extension: '.docx',
      description: 'Word document with formatted Subject Line and clean body spacing',
      badge: 'Editable',
      onExport: () => {
        exportTextDocumentToDocx(
          `Subject: ${subjectLine || 'Application'}`,
          emailBody.split('\n\n'),
          `Email_${(formData.companyName || 'Application').replace(/[^a-zA-Z0-9]/g, '_')}`
        );
      }
    },
    {
      id: 'txt',
      label: 'Plain Text (.txt)',
      extension: '.txt',
      description: 'Clean text file with subject and email body for quick copy-pasting',
      badge: 'Text',
      onExport: () => {
        const fullText = `Subject: ${subjectLine}\n\n${emailBody}`;
        exportTextToTxt(fullText, `Email_${(formData.companyName || 'Application').replace(/[^a-zA-Z0-9]/g, '_')}`);
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Tool Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6 no-print">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            <Mail className="w-3.5 h-3.5" />
            <span>Single Unified Application Outreach Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Job Application Email Generator
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            Generate professional, personalized email correspondence for direct job applications, recruiter outreach, networking inquiries, internal referral requests, and polite application status follow-ups.
          </p>
        </div>

        {/* Global Export / Copy */}
        <div className="flex items-center gap-3">
          {emailBody && (
            <button
              type="button"
              onClick={handleCopyBody}
              className="px-3.5 py-2 text-xs font-semibold bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl hover:bg-neutral-50 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              {copiedBody ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBody ? 'Copied Full Email' : 'Copy Email'}</span>
            </button>
          )}

          <UnifiedDownloadButton
            documentTitle="Application Email"
            formats={downloadFormats}
            size="md"
          />
        </div>
      </div>

      {/* Preset Quick Fill */}
      <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3 shadow-xs no-print">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Outreach Presets (1-Click Sample Load)
          </span>
          <div className="flex items-center gap-3">
            {onNavigateToTemplates && (
              <button
                type="button"
                onClick={onNavigateToTemplates}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                Browse All Templates &rarr;
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setFormData(INITIAL_FORM);
                setSubjectLine('');
                setEmailBody('');
                setCurrentStep('scenario');
              }}
              className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Form
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                loadPreset(p.data);
              }}
              className="p-3 text-left bg-neutral-50 dark:bg-neutral-800/60 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-700 hover:border-blue-400 rounded-xl transition-all cursor-pointer group"
            >
              <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {p.label}
              </div>
              <div className="text-[10px] text-neutral-500 mt-0.5 line-clamp-2 leading-tight">
                {p.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Configuration & Workflow (5 cols) */}
        <div className="lg:col-span-5 space-y-6 no-print">
          
          {/* Step Pills */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl overflow-x-auto no-scrollbar text-xs font-bold">
            {EMAIL_STEPS.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentStep(s.id as EmailStep)}
                className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  currentStep === s.id
                    ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-neutral-200 dark:bg-neutral-700 text-[10px] flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          {/* Step 1: Scenario & Target Role */}
          {currentStep === 'scenario' && (
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4 animate-in fade-in duration-150">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-3 flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-600" />
                1. Scenario & Target Company
              </h2>

              {/* Email Purpose Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Email Purpose / Scenario <span className="text-rose-500">*</span>
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-xs font-bold bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500 text-neutral-900 dark:text-neutral-100"
                >
                  <option value="application">1. Direct Job Application Email</option>
                  <option value="recruiter_outreach">2. Recruiter & Talent Outreach</option>
                  <option value="referral_request">3. Internal Referral Request</option>
                  <option value="follow_up">4. Following Up on Job Application</option>
                  <option value="networking">5. Professional Networking & Inquiry</option>
                </select>
              </div>

              {/* Target Role & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Target Job Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="targetJobTitle"
                    value={formData.targetJobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Staff Infrastructure Engineer"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Company / Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Stripe or Monzo"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Recipient Name / Role
                </label>
                <input
                  type="text"
                  name="recipientNameOrRole"
                  value={formData.recipientNameOrRole}
                  onChange={handleInputChange}
                  placeholder="e.g. Sarah Jenkins or Hiring Team"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Step 2: Your Background, Angle & Tone */}
          {currentStep === 'details' && (
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4 animate-in fade-in duration-150">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                2. Your Pitch, Background & Tone
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Current Title or Field
                  </label>
                  <input
                    type="text"
                    name="senderTitle"
                    value={formData.senderTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Senior Cloud Architect"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Skills & Experience */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Relevant Skills, Achievements & Years
                </label>
                <textarea
                  name="skillsAndExperience"
                  rows={3}
                  value={formData.skillsAndExperience}
                  onChange={handleInputChange}
                  placeholder="e.g. 6+ years building scalable Go microservices, Kubernetes, and high-volume Kafka data streams"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Application Context or Job Snippet */}
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Application Context or Job Snippet (Optional)
                </label>
                <input
                  type="text"
                  name="contextOrJobSnippet"
                  value={formData.contextOrJobSnippet}
                  onChange={handleInputChange}
                  placeholder="e.g. Requisition asks for payments infrastructure scaling"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Purpose-specific extra fields */}
              {formData.purpose === 'referral_request' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Mutual Connection or How You Know Them
                  </label>
                  <input
                    type="text"
                    name="mutualConnection"
                    value={formData.mutualConnection}
                    onChange={handleInputChange}
                    placeholder="e.g. Former teammates at Splunk"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {formData.purpose === 'follow_up' && (
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Days Since Initial Application
                  </label>
                  <input
                    type="text"
                    name="followUpDaysSince"
                    value={formData.followUpDaysSince}
                    onChange={handleInputChange}
                    placeholder="e.g. 10"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Tone & Portfolio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Tone / Communication Style
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  >
                    <option value="professional_direct">Direct & Professional</option>
                    <option value="enthusiastic">Enthusiastic & High-Energy</option>
                    <option value="formal_executive">Formal & Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Portfolio / LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="attachResume"
                  name="attachResume"
                  checked={formData.attachResume}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 rounded border-neutral-300 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="attachResume" className="text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer select-none">
                  Mention attached Resume / CV in the email body
                </label>
              </div>

              <button
                type="button"
                onClick={generateEmail}
                className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Generate Email & Subject Line</span>
              </button>
            </div>
          )}

          {/* Step 3: Verification & Quick Download */}
          {currentStep === 'output' && (
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2.5 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    Email Ready to Send
                  </h3>
                  <span className="text-[11px] text-neutral-500">
                    Subject line and message body configured
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs bg-neutral-50 dark:bg-neutral-800/60 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Target Role:</span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">{formData.targetJobTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Company:</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{formData.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Sender:</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{formData.senderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Scenario:</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-blue-600 dark:text-blue-400">{formData.purpose.replace('_', ' ')}</span>
                </div>
              </div>

              <div className="pt-2">
                <UnifiedDownloadButton
                  documentTitle="Application Email"
                  formats={downloadFormats}
                  size="md"
                  className="w-full"
                />
              </div>
            </div>
          )}

          {validationError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Guided Step-by-Step Workflow Navigation */}
          <WorkflowNavigation
            steps={EMAIL_STEPS}
            currentStepId={currentStep}
            onStepChange={(stepId) => {
              if (stepId === 'output' && !emailBody) {
                generateEmail();
              } else {
                setCurrentStep(stepId as EmailStep);
              }
            }}
            onFinish={() => {
              if (!emailBody) {
                generateEmail();
              }
              handleCopyBody();
            }}
            finishLabel="Copy Full Email"
            className="pb-12"
          />
        </div>

        {/* Right Column: Generated Email Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            
            {/* Header / Actions */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Ready-to-Send Email Output
                </span>
                {emailBody && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                    Live Editable
                  </span>
                )}
              </div>

              {emailBody && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyBody}
                    className="px-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl text-xs font-semibold hover:bg-neutral-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Copy subject and full email body"
                  >
                    {copiedBody ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBody ? 'Copied!' : 'Copy Email'}</span>
                  </button>

                  <UnifiedDownloadButton
                    documentTitle="Application Email"
                    formats={downloadFormats}
                    size="sm"
                  />
                </div>
              )}
            </div>

            {/* Subject Line Bar */}
            {subjectLine && (
              <div className="p-4 bg-neutral-100/70 dark:bg-neutral-800/40 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
                <div className="flex-1 truncate">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Subject Line
                  </span>
                  <input
                    type="text"
                    value={subjectLine}
                    onChange={(e) => setSubjectLine(e.target.value)}
                    className="w-full text-xs font-bold text-neutral-900 dark:text-neutral-100 bg-transparent border-none focus:outline-none truncate"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleCopySubject}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-600 transition-colors shrink-0 cursor-pointer shadow-2xs"
                  title="Copy subject line only"
                >
                  {copiedSubject ? 'Copied!' : 'Copy Subject'}
                </button>
              </div>
            )}

            {/* Email Body Area */}
            <div className="p-6">
              {emailBody ? (
                <div className="space-y-4">
                  <div className="text-[11px] text-neutral-500 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <span>You can click inside the text area below to customize sentences or details.</span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      {emailBody.split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={16}
                    className="w-full font-sans text-xs text-neutral-800 dark:text-neutral-200 bg-transparent resize-y focus:outline-none leading-relaxed tracking-normal p-2 border border-transparent focus:border-blue-400 rounded-xl"
                  />
                </div>
              ) : (
                <div className="py-20 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 max-w-sm mx-auto">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      No Email Generated Yet
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Fill out the form on the left, or choose a 1-click Quick Preset above, then click <strong>Generate Email & Subject Line</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer tips */}
            {emailBody && (
              <div className="p-4 bg-neutral-50 dark:bg-neutral-800/40 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5" />
                  {formData.attachResume ? 'Resume attached reference included' : 'No attachment mentioned'}
                </span>
                <span>Calibrated for professional recruiters & hiring managers</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
