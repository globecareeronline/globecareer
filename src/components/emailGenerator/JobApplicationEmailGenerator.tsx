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
  Share2
} from 'lucide-react';

export type EmailPurpose =
  | 'application'
  | 'recruiter_outreach'
  | 'networking'
  | 'referral_request'
  | 'follow_up';

export type EmailTone = 'professional_direct' | 'enthusiastic' | 'formal_executive';

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
    description: 'Reaching out politely to an existing contact or alumnus for a referral',
    data: {
      purpose: 'referral_request',
      recipientNameOrRole: 'Brian Cole',
      companyName: 'Canva',
      targetJobTitle: 'Lead Product Designer',
      senderName: 'Emma Watson',
      senderTitle: 'Senior UI/UX Designer',
      skillsAndExperience: '6 years crafting design systems, enterprise SaaS workflows, and user research protocols',
      contextOrJobSnippet: 'Applying for the Design Systems Lead opening in Sydney',
      tone: 'professional_direct',
      attachResume: true,
      portfolioUrl: 'https://emmawatson-design.com',
      mutualConnection: 'Former colleagues at TechCorp / Sydney Design Meetup',
      followUpDaysSince: '10',
    },
  },
  {
    label: 'Application Follow-Up',
    description: 'Polite status inquiry 10–14 days after submitting application',
    data: {
      purpose: 'follow_up',
      recipientNameOrRole: 'Hiring Team',
      companyName: 'Shopify',
      targetJobTitle: 'Staff Systems Engineer',
      senderName: 'Liam Chen',
      senderTitle: 'Systems Architect',
      skillsAndExperience: 'Distributed systems, Ruby on Rails scalability, and large-scale merchant infrastructure',
      contextOrJobSnippet: 'Applied on October 8th via Shopify Career Portal',
      tone: 'professional_direct',
      attachResume: false,
      portfolioUrl: '',
      mutualConnection: '',
      followUpDaysSince: '12',
    },
  },
  {
    label: 'Professional Networking',
    description: 'Introductory outreach for mutual connection, advice, or career chat',
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
      return;
    }
    if (!formData.targetJobTitle.trim()) {
      setValidationError('Please specify the target job title or role.');
      return;
    }
    if (!formData.senderName.trim()) {
      setValidationError('Please enter your full name as the sender.');
      return;
    }

    setValidationError(null);

    const sName = formData.senderName.trim();
    const sTitle = formData.senderTitle.trim() || 'Professional';
    const cName = formData.companyName.trim();
    const role = formData.targetJobTitle.trim();
    const recipient = formData.recipientNameOrRole.trim() || 'Hiring Team';
    const skills = formData.skillsAndExperience.trim() || 'relevant domain experience and a proven track record of execution';
    const context = formData.contextOrJobSnippet.trim();
    const portfolio = formData.portfolioUrl.trim();
    const connection = formData.mutualConnection.trim();
    const days = formData.followUpDaysSince.trim() || 'several';

    // Salutation
    const isNamedPerson = !recipient.toLowerCase().includes('team') && !recipient.toLowerCase().includes('manager');
    const greeting = isNamedPerson ? `Dear ${recipient},` : `Dear ${recipient} at ${cName},`;

    let subject = '';
    let body = '';

    if (formData.purpose === 'application') {
      subject = `Application: ${role} – ${sName}`;
      
      const hook = formData.tone === 'enthusiastic'
        ? `I am writing to express my strong enthusiasm for the ${role} opening at ${cName}. Having closely tracked ${cName}'s impressive trajectory, I was thrilled to see this opportunity.`
        : formData.tone === 'formal_executive'
          ? `Please accept this formal submission of my credentials for the position of ${role} with ${cName}.`
          : `I am writing to formally apply for the ${role} vacancy at ${cName}.`;

      const match = context
        ? `With expertise in ${skills}, my background aligns directly with your mandate for ${context}. In my current capacity as ${sTitle}, I have specialized in driving measurable impact and solving complex operational problems.`
        : `With strong core proficiencies in ${skills}, my background as ${sTitle} aligns closely with the technical and collaborative requirements of this role.`;

      const attachments = [];
      if (formData.attachResume) attachments.push('attached my updated resume/CV for your detailed review');
      if (portfolio) attachments.push(`included my portfolio/work samples here: ${portfolio}`);
      const attachSentence = attachments.length > 0
        ? `For your convenience, I have ${attachments.join(' and ')}.`
        : '';

      const closing = formData.tone === 'enthusiastic'
        ? `I would welcome the opportunity to discuss how my skillset and proactive approach can contribute immediately to ${cName}'s ongoing success. Thank you very much for your time and consideration.`
        : `I look forward to discussing how my experience can support ${cName}'s objectives. Thank you for your review.`;

      body = [
        greeting,
        '',
        hook,
        '',
        match,
        '',
        attachSentence,
        attachSentence ? '' : null,
        closing,
        '',
        'Best regards,',
        '',
        sName,
        sTitle,
        portfolio ? portfolio : '',
      ].filter(l => l !== null).join('\n');

    } else if (formData.purpose === 'recruiter_outreach') {
      subject = `Candidate Inquiry: ${role} Opportunities – ${sName}`;

      const hook = `I hope this note finds you well. I am reaching out because I have been following ${cName}'s work and wanted to inquire about opportunities for a ${role}.`;
      const pitch = `As a ${sTitle} with specialized experience in ${skills}, I have spent recent years delivering high-impact outcomes. ${context ? `Given ${cName}'s focus on ${context}, I believe my background could be of immediate value.` : `I am very keen on ${cName}'s engineering culture and mission.`}`;
      const attachSentence = formData.attachResume
        ? `I have attached my resume for your reference${portfolio ? `, and you can explore my recent work at ${portfolio}` : ''}.`
        : portfolio ? `You can review my professional background and portfolio at ${portfolio}.` : '';

      body = [
        greeting,
        '',
        hook,
        '',
        pitch,
        '',
        attachSentence,
        attachSentence ? '' : null,
        `If you have 10 minutes in the coming weeks, I would welcome the chance to introduce myself and learn more about your talent pipeline at ${cName}.`,
        '',
        'Warm regards,',
        '',
        sName,
        sTitle,
      ].filter(l => l !== null).join('\n');

    } else if (formData.purpose === 'referral_request') {
      subject = `${cName} ${role} Opening – Referral Inquiry (${sName})`;

      const intro = connection
        ? `I hope you're doing well! I'm reaching out because of our connection through ${connection}.`
        : `I hope you are having a productive week!`;

      const pitch = `I came across the ${role} opening at ${cName} and was immediately drawn to the role. Given my background as ${sTitle} with expertise in ${skills}, I believe I could make a strong contribution to your team.`;

      const request = `Would you be open to providing an internal referral or passing my resume along to the hiring team? I have attached my resume and would be delighted to provide any details or bullet points to make the referral seamless for you.`;

      body = [
        greeting,
        '',
        intro,
        '',
        pitch,
        '',
        request,
        portfolio ? `\nYou can also review my work and portfolio here: ${portfolio}\n` : '',
        `Either way, I truly appreciate your time and wish you continued success at ${cName}!`,
        '',
        'Best regards,',
        '',
        sName,
      ].filter(l => l !== null).join('\n');

    } else if (formData.purpose === 'follow_up') {
      subject = `Following Up: Application for ${role} – ${sName}`;

      const intro = `I hope you are having a wonderful week.`;
      const contextLine = `I am writing to politely follow up on my application for the ${role} position at ${cName}, which I submitted approximately ${days} days ago${context ? ` (${context})` : ''}.`;
      const reiterate = `I remain exceptionally enthusiastic about the opportunity to contribute my experience in ${skills} to the team at ${cName}.`;
      const ask = `I understand your team is reviewing numerous candidate profiles, but I wanted to reaffirm my strong interest and check if there are any additional materials or clarifications I can provide at this stage.`;

      body = [
        greeting,
        '',
        intro,
        '',
        contextLine,
        '',
        reiterate,
        '',
        ask,
        '',
        'Thank you again for your time, consideration, and continued communication.',
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Tool Header */}
      <div className="space-y-3">
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

      {/* Preset Quick Fill */}
      <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Select an Email Scenario (1-Click Sample Load)
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateToTemplates ? onNavigateToTemplates() : onNavigate?.('letter-templates')}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
            >
              Browse All Templates &rarr;
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData(INITIAL_FORM);
                setSubjectLine('');
                setEmailBody('');
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
              onClick={() => loadPreset(p.data)}
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
        
        {/* Left Column: Form Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-5">
            
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

            {/* Recipient & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            {/* Target Role & Sender Name */}
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
                  Your Full Name (Sender) <span className="text-rose-500">*</span>
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
            </div>

            {/* Sender Current Title */}
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
                  How You Know Each Other (Mutual Context)
                </label>
                <input
                  type="text"
                  name="mutualConnection"
                  value={formData.mutualConnection}
                  onChange={handleInputChange}
                  placeholder="e.g. Former colleagues at TechCorp / Met at PyCon"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            {formData.purpose === 'follow_up' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Days Since Submission
                </label>
                <input
                  type="text"
                  name="followUpDaysSince"
                  value={formData.followUpDaysSince}
                  onChange={handleInputChange}
                  placeholder="e.g. 10 or 14"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Tone & Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Preferred Tone
                </label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                >
                  <option value="professional_direct">Professional & Direct</option>
                  <option value="enthusiastic">Enthusiastic & Engaging</option>
                  <option value="formal_executive">Formal & Executive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Portfolio / Profile URL
                </label>
                <input
                  type="text"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleInputChange}
                  placeholder="e.g. github.com/user or linkedin.com/in/user"
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

            {validationError && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <button
              type="button"
              onClick={generateEmail}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Generate Email & Subject Line</span>
            </button>
          </div>
        </div>

        {/* Right Column: Generated Email Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            
            {/* Header / Actions */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Ready-to-Send Email Output
                </span>
              </div>

              {emailBody && (
                <button
                  type="button"
                  onClick={handleCopyBody}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Copy subject and full email body"
                >
                  {copiedBody ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBody ? 'Copied Full Email!' : 'Copy Entire Email'}</span>
                </button>
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
                <div className="space-y-3">
                  <div className="text-[11px] text-neutral-500 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <span>Click anywhere in the email body below to personalize details before sending.</span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      {emailBody.split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={18}
                    className="w-full font-sans text-xs text-neutral-800 dark:text-neutral-200 bg-transparent resize-y focus:outline-none leading-relaxed p-2 border border-transparent focus:border-blue-400 rounded-xl"
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
                      Select your email scenario from the presets above or enter the target company and role on the left, then click <strong>Generate Email & Subject Line</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tips Card */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-xs space-y-2 text-neutral-600 dark:text-neutral-400">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Pro Tips for International Outreach
            </span>
            <ul className="space-y-1 text-[11px] list-disc list-inside">
              <li>Keep cold emails concise (100–180 words). Busy recruiters and managers skim on mobile.</li>
              <li>Always customize the first sentence to reference a specific project, product, or recent achievement.</li>
              <li>Double-check time zones when following up — 10 to 14 calendar days is the standard professional window.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
