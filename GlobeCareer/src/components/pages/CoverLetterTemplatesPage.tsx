import React, { useState } from 'react';
import {
  FileText,
  ArrowRight,
  Check,
  Building,
  Globe,
  GraduationCap,
  Compass,
  Briefcase,
  Award,
  Mail,
  Send,
  User,
  Paperclip,
  Sparkles,
  Copy,
  Layers,
  ChevronRight
} from 'lucide-react';

/* =========================================================================
   1. COVER LETTER TEMPLATES (5 Core Specs)
   ========================================================================= */

export interface CoverLetterTemplateSpec {
  id: string;
  name: string;
  category: string;
  bestFor: string;
  icon: React.ReactNode;
  openingParagraph: string;
  bodyParagraphs: string[];
  closingParagraph: string;
}

export const COVER_LETTER_TEMPLATES: CoverLetterTemplateSpec[] = [
  {
    id: 'modern-corporate',
    name: 'Modern Professional Corporate',
    category: 'Corporate & Mid-to-Senior',
    bestFor: 'Finance, Consulting, Enterprise Software, Marketing',
    icon: <Building className="w-4 h-4 text-blue-600" />,
    openingParagraph: 'I am writing to express my enthusiastic interest in the [Job Title] role at [Company Name]. Having followed your company’s market growth and disciplined product innovation, I am eager to contribute my [X] years of experience driving operational excellence and technical scalability.',
    bodyParagraphs: [
      'Throughout my professional career, I have dedicated myself to solving high-stakes organizational challenges. In my previous role as [Current Role] at [Current Company], I directed cross-functional initiatives that resulted in a [X]% increase in operational throughput while reducing annual costs by $[X]. I bridge technical precision with transparent stakeholder alignment to ensure strategic milestones are delivered ahead of schedule.',
      'What specifically attracts me to [Company Name] is your commitment to sustainable team performance and thoughtful customer experience. I am eager to apply my background in agile team coaching, process automation, and data-driven analysis to expand your department’s impact.'
    ],
    closingParagraph: 'I would welcome the opportunity to discuss in detail how my background and verified achievements will serve [Company Name]’s strategic priorities. Thank you for your time, consideration, and review.'
  },
  {
    id: 'international-relocation',
    name: 'International Relocation & Visa Candidate',
    category: 'Global & Expat Hiring',
    bestFor: 'Candidates moving abroad to Europe, UK, US, Canada, UAE, Australia',
    icon: <Globe className="w-4 h-4 text-emerald-600" />,
    openingParagraph: 'I am writing to apply for the [Job Title] position with [Company Name] in [Target City, Target Country]. As a seasoned professional with extensive international experience, I am fully prepared to relocate to [Target Country] to contribute to your global team’s strategic objectives.',
    bodyParagraphs: [
      'In addressing my relocation and right-to-work profile: I hold [e.g. EU Citizenship / Valid Work Authorization / Eligibility for Skilled Worker Sponsorship / UAE Golden Visa], allowing for a seamless immigration and onboarding process. I am prepared to begin remote onboarding immediately and complete physical relocation within [30/60] days of an offer.',
      'Across my [X] years of cross-border experience, I have demonstrated a consistent ability to adapt rapidly to diverse regulatory environments and distributed workflows. At my previous firm, I managed asynchronous collaborations across 3 time zones, reducing communication lag and lifting team delivery rates by [X]%.'
    ],
    closingParagraph: 'I am available for interviews via video conference at your convenience, accommodating your local timezone. Thank you for your consideration of an international applicant.'
  },
  {
    id: 'career-pivot',
    name: 'Career Pivot & Transferable Skills',
    category: 'Career Changers',
    bestFor: 'Professionals transitioning into Tech, Product, or Data from other industries',
    icon: <Compass className="w-4 h-4 text-purple-600" />,
    openingParagraph: 'I am writing to present my candidacy for the [Job Title] role at [Company Name]. Bringing a unique interdisciplinary background in [Previous Industry] combined with rigorous modern training in [New Field/Skillset], I offer a differentiated perspective on how to tackle your team’s most challenging operational demands.',
    bodyParagraphs: [
      'While my earlier career was founded in [Previous Industry], the foundational competencies I cultivated—high-stakes stakeholder mediation, quantitative root-cause problem solving, and analytical data modeling—directly translate to the [Job Title] responsibilities. For example, by applying systematic data auditing, I spearheaded an internal workflow redesign that eliminated [X] hours of repetitive weekly administrative backlog.',
      'To formalize this transition, I recently completed specialized credentialing in [Key Technical Tool / Framework], engineering practical applications that mirror modern enterprise environments. My non-traditional trajectory gives me the resilience and adaptability to master new workflows at exceptional speed.'
    ],
    closingParagraph: 'I look forward to discussing how my multifaceted perspective and strong work ethic can deliver fresh momentum to [Company Name]. Thank you for your consideration.'
  },
  {
    id: 'recent-graduate',
    name: 'Recent Graduate & Entry-Level',
    category: 'University & Juniors',
    bestFor: 'Recent graduates, interns, apprentices, and entry-level specialists',
    icon: <GraduationCap className="w-4 h-4 text-amber-600" />,
    openingParagraph: 'I am writing to express my strong enthusiasm for the [Job Title] opportunity at [Company Name]. As a recent graduate holding a [Degree Name] in [Field of Study] from [University Name], I am eager to apply my academic foundation, technical coursework, and passion for continuous learning to your esteemed team.',
    bodyParagraphs: [
      'During my academic tenure, I maintained a [GPA / Grade, e.g. First Class Honours / 3.8 GPA] while actively engaging in applied project-based research. For my capstone thesis, I architected a functional [Project Description], implementing modern principles of [Technology/Methodology] and collaborating in an agile team of 4 student developers.',
      'Beyond theoretical knowledge, my recent internship at [Internship Company] gave me direct exposure to professional deliverables. I contributed to [specific feature or project], writing unit tests that achieved [X]% code coverage and participating in weekly technical retrospectives. I am eager to bring this same dedication and energy to [Company Name].'
    ],
    closingParagraph: 'Thank you for reviewing my application and supporting emerging talent. I would be thrilled to discuss how I can contribute to [Company Name]’s upcoming milestones.'
  },
  {
    id: 'executive-leadership',
    name: 'Executive & C-Suite Leadership',
    category: 'Executive & Board',
    bestFor: 'Directors, VPs, Heads of Department, General Managers, C-Suite',
    icon: <Briefcase className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />,
    openingParagraph: 'I am submitting my executive profile for the [Executive Job Title] position with [Company Name]. With over [X] years steering organizational growth, managing multi-million-dollar P&L budgets, and building high-performance cultures across international markets, I offer proven strategic stewardship for your next phase of scale.',
    bodyParagraphs: [
      'My leadership philosophy centers on linking technical rigor with fiscal discipline and transparent accountability. In my tenure as [Executive Title] at [Previous Organization], I orchestrated a departmental turnaround that expanded operating margins by [X]%, while simultaneously lowering unwanted talent turnover from [X]% to [X]% through structured talent development and performance benchmarking.',
      'At [Company Name], I see an exceptional opportunity to institutionalize operational efficiencies while capturing emerging global market opportunities. Whether guiding organizational restructuring, negotiating key partnerships, or steering cross-functional alignment, I focus on building enduring enterprise value.'
    ],
    closingParagraph: 'I welcome an exploratory dialogue regarding your strategic priorities and how my executive leadership can deliver sustained competitive advantage. Thank you for your consideration.'
  }
];

/* =========================================================================
   2. RECOMMENDATION LETTER TEMPLATES (3 Core Specs)
   ========================================================================= */

export interface RecommendationTemplateSpec {
  id: string;
  name: string;
  category: string;
  bestFor: string;
  icon: React.ReactNode;
  presetData: {
    candidateName: string;
    candidateRole: string;
    candidateStrengths: string;
    candidateAchievements: string;
    recommenderName: string;
    recommenderTitle: string;
    recommenderOrg: string;
    recommenderEmail: string;
    relationship: string;
    yearsKnown: string;
    purpose: 'employment' | 'graduate_school' | 'scholarship' | 'visa_immigration' | 'leadership';
    targetOrg: string;
    targetRole: string;
    recipientTitle: string;
    tone: 'enthusiastic' | 'formal_academic' | 'results_oriented' | 'executive';
    length: 'concise' | 'standard' | 'comprehensive';
  };
  sampleText: string;
}

export const RECOMMENDATION_TEMPLATES: RecommendationTemplateSpec[] = [
  {
    id: 'rec-software-eng',
    name: 'Senior Software Engineer Reference',
    category: 'Technical & Engineering',
    bestFor: 'Senior Engineers, Tech Leads, Cloud Architects, and Engineering Managers',
    icon: <Award className="w-4 h-4 text-blue-600" />,
    presetData: {
      candidateName: 'Alex Morgan',
      candidateRole: 'Senior Software Engineer',
      candidateStrengths: 'Distributed systems design, proactive cross-functional leadership, clean code architecture, and mentoring junior engineers',
      candidateAchievements: 'Spearheaded the migration of core payment microservices reducing latency by 38%; led an agile team of 6 engineers with 100% on-time sprint deliveries',
      recommenderName: 'Dr. Marcus Vance',
      recommenderTitle: 'VP of Engineering',
      recommenderOrg: 'CloudScale Technologies',
      recommenderEmail: 'm.vance@cloudscaletech.com',
      relationship: 'Former Direct Manager',
      yearsKnown: '4',
      purpose: 'employment',
      targetOrg: 'NextGen Solutions',
      targetRole: 'Staff Infrastructure Architect',
      recipientTitle: 'Engineering Search Committee',
      tone: 'results_oriented',
      length: 'standard',
    },
    sampleText: `October 24, 2026\n\nTo the Engineering Search Committee at NextGen Solutions,\n\nI am writing to provide my unreserved recommendation for Alex Morgan for the Staff Infrastructure Architect role. Having served as Alex’s Former Direct Manager for over 4 years at CloudScale Technologies, I have directly evaluated their technical stewardship and system design mastery.\n\nThroughout their tenure, Alex has demonstrated exceptional strengths in distributed systems design, proactive cross-functional leadership, clean code architecture, and mentoring junior engineers. What distinguishes Alex is their relentless focus on quantifiable system reliability and team velocity.\n\nAmong their notable contributions, Alex spearheaded the migration of core payment microservices reducing latency by 38%, and led an agile team of 6 engineers with 100% on-time sprint deliveries. They consistently elevate the engineers around them through structured architectural reviews.\n\nI recommend Alex Morgan with complete confidence and without reservation. Please feel free to reach out to me directly if you require additional perspective.\n\nSincerely,\nDr. Marcus Vance\nVP of Engineering\nCloudScale Technologies\nm.vance@cloudscaletech.com`
  },
  {
    id: 'rec-academic',
    name: 'Graduate School Academic Recommendation',
    category: 'Higher Education & Research',
    bestFor: 'Master’s, PhD, Fellowship, and International University Admissions',
    icon: <GraduationCap className="w-4 h-4 text-emerald-600" />,
    presetData: {
      candidateName: 'Elena Rostova',
      candidateRole: 'Research Assistant & Honors Graduate',
      candidateStrengths: 'Exceptional quantitative rigor, scholarly initiative, advanced econometric modeling, and collaborative inquiry',
      candidateAchievements: 'Authored an award-winning honors thesis on algorithmic fairness; co-authored a peer-reviewed symposium paper presented at IEEE',
      recommenderName: 'Prof. David K. Sterling',
      recommenderTitle: 'Professor & Department Chair of Computer Science',
      recommenderOrg: 'St. Andrews University',
      recommenderEmail: 'd.sterling@standrews.ac.uk',
      relationship: 'Academic Advisor & Professor',
      yearsKnown: '3',
      purpose: 'graduate_school',
      targetOrg: 'Oxford University',
      targetRole: 'MSc in Advanced Computer Science',
      recipientTitle: 'Graduate Admissions Committee',
      tone: 'formal_academic',
      length: 'comprehensive',
    },
    sampleText: `October 24, 2026\n\nTo the Graduate Admissions Committee at Oxford University,\n\nIt is my distinct academic privilege to recommend Elena Rostova for admission to the MSc in Advanced Computer Science program. As Professor & Department Chair of Computer Science at St. Andrews University, I have supervised Elena’s coursework and undergraduate research over the past 3 years.\n\nElena exemplifies the highest standards of intellectual curiosity, quantitative rigor, and disciplined scholarly inquiry. In my advanced seminars, Elena consistently ranked in the top 2% of the cohort, demonstrating rare acumen in econometric modeling and algorithmic ethics.\n\nElena authored an award-winning honors thesis on algorithmic fairness and co-authored a peer-reviewed symposium paper presented at IEEE. Her analytical maturity mirrors that of experienced doctoral candidates.\n\nI offer my strongest academic endorsement for Elena Rostova. She will undoubtedly make distinguished contributions to your scholarly community.\n\nRespectfully submitted,\nProf. David K. Sterling\nProfessor & Department Chair of Computer Science\nSt. Andrews University\nd.sterling@standrews.ac.uk`
  },
  {
    id: 'rec-executive',
    name: 'Product Manager Leadership Reference',
    category: 'Executive & Product Leadership',
    bestFor: 'Product Leaders, Directors, General Managers, and Cross-Functional Heads',
    icon: <Briefcase className="w-4 h-4 text-purple-600" />,
    presetData: {
      candidateName: 'Jordan Lee',
      candidateRole: 'Lead Product Manager',
      candidateStrengths: 'Customer discovery, data-driven product roadmapping, high-stakes stakeholder consensus, and international market expansion',
      candidateAchievements: 'Launched the European enterprise expansion product generating $2.4M ARR in its first 12 months; increased user retention by 24%',
      recommenderName: 'Sarah Jenkins',
      recommenderTitle: 'Chief Product Officer',
      recommenderOrg: 'Apex Commerce Global',
      recommenderEmail: 's.jenkins@apexcommerce.com',
      relationship: 'Direct Supervisor & CPO',
      yearsKnown: '2.5',
      purpose: 'leadership',
      targetOrg: 'Enterprise Dynamics B.V.',
      targetRole: 'Director of Product',
      recipientTitle: 'Executive Hiring Board',
      tone: 'executive',
      length: 'standard',
    },
    sampleText: `October 24, 2026\n\nTo the Executive Hiring Board at Enterprise Dynamics B.V.,\n\nI am pleased to provide this executive endorsement for Jordan Lee in consideration for the Director of Product role. Having worked closely with Jordan for 2.5 years as Chief Product Officer at Apex Commerce Global, I have witnessed their exceptional capacity to align high-level strategy with relentless operational execution.\n\nJordan excels in customer discovery, data-driven product roadmapping, high-stakes stakeholder consensus, and international market expansion. They command respect across both technical engineering squads and executive boardrooms.\n\nJordan launched our European enterprise expansion product, generating $2.4M ARR in its inaugural 12 months while boosting cohort retention by 24%. Their strategic clarity directly accelerated our company growth.\n\nJordan Lee represents executive talent of the highest caliber. I recommend them with complete enthusiasm.\n\nBest regards,\nSarah Jenkins\nChief Product Officer\nApex Commerce Global\ns.jenkins@apexcommerce.com`
  }
];

/* =========================================================================
   3. JOB APPLICATION EMAIL TEMPLATES (5 Core Specs)
   ========================================================================= */

export interface EmailTemplateSpec {
  id: string;
  name: string;
  category: string;
  bestFor: string;
  icon: React.ReactNode;
  presetData: {
    purpose: 'application' | 'recruiter_outreach' | 'networking' | 'referral_request' | 'follow_up';
    recipientNameOrRole: string;
    companyName: string;
    targetJobTitle: string;
    senderName: string;
    senderTitle: string;
    skillsAndExperience: string;
    contextOrJobSnippet: string;
    tone: 'professional_direct' | 'enthusiastic' | 'formal_executive';
    attachResume: boolean;
    portfolioUrl: string;
    mutualConnection: string;
    followUpDaysSince: string;
  };
  sampleSubject: string;
  sampleBody: string;
}

export const EMAIL_TEMPLATES: EmailTemplateSpec[] = [
  {
    id: 'email-direct-app',
    name: 'Direct Job Application Email',
    category: 'Job Application',
    bestFor: 'Submitting resume for an active open requisition with qualifications match',
    icon: <Mail className="w-4 h-4 text-blue-600" />,
    presetData: {
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
    sampleSubject: 'Application: Staff Infrastructure Engineer – David Miller',
    sampleBody: `Dear Hiring Team,\n\nI am writing to formally submit my application for the Staff Infrastructure Engineer position at Stripe.\n\nWith over 7+ years leading Kubernetes cluster operations, Terraform automation, and 99.99% uptime multi-region cloud migrations, I have built a career around delivering scalable infrastructure for high-throughput transactional platforms. Having reviewed Stripe’s technical requisition regarding distributed payment routing, I am confident my background directly serves your engineering priorities.\n\nMy complete resume is attached to this email for your review, and you may review my open-source architectural contributions at https://github.com/david-cloud.\n\nI look forward to discussing how my experience can support Stripe’s upcoming infrastructure milestones.\n\nSincerely,\nDavid Miller\nSenior Cloud Engineer`
  },
  {
    id: 'email-recruiter',
    name: 'Recruiter Outreach Message',
    category: 'Recruiter Outreach',
    bestFor: 'Connecting directly with in-house technical recruiters or talent partners',
    icon: <Send className="w-4 h-4 text-emerald-600" />,
    presetData: {
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
    sampleSubject: 'Senior Backend Engineer Roles at Monzo – Maya Patel',
    sampleBody: `Dear Sarah Jenkins,\n\nI hope your week is off to a great start. I have been following Monzo’s rapid engineering evolution and your recent expansion into US banking infrastructure with immense admiration.\n\nI am reaching out to introduce myself as a Backend Go Specialist with 5 years architecting high-throughput Go microservices, event-driven Kafka pipelines, and banking ledger integrations. I would love to explore whether my background aligns with open Senior Backend Engineer opportunities on your core ledger team.\n\nI have attached my resume and linked my professional profile (https://linkedin.com/in/mayapatel-tech). Would you have 10 minutes next week for a brief exploratory conversation?\n\nWarm regards,\nMaya Patel\nBackend Go Specialist`
  },
  {
    id: 'email-referral',
    name: 'Internal Referral Request',
    category: 'Referral & Network',
    bestFor: 'Reaching out politely to a former colleague, alumni, or contact for an internal referral',
    icon: <User className="w-4 h-4 text-purple-600" />,
    presetData: {
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
    sampleSubject: 'Quick Hello & Question regarding Canva\'s Lead Product Designer Opening',
    sampleBody: `Hi Brian,\n\nI hope all is well with you since our time together at TechCorp!\n\nI noticed that Canva is actively recruiting for a Lead Product Designer. Over the past 6 years, I have specialized in building design systems, enterprise SaaS workflows, and user research protocols.\n\nBecause of your firsthand experience with the Canva product design culture, I wanted to ask if you would be open to sharing my resume with the hiring team as an internal referral. You can view my recent case studies at https://emmawatson-design.com.\n\nIf you are comfortable doing so, I’d be immensely grateful. Either way, congratulations on all the exciting updates coming out of Canva lately!\n\nBest,\nEmma Watson\nSenior UI/UX Designer`
  },
  {
    id: 'email-follow-up',
    name: 'Application Follow-Up Email',
    category: 'Follow-Up',
    bestFor: 'Polite inquiry 10–14 days after submitting an application without an update',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    presetData: {
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
    sampleSubject: 'Following Up: Staff Systems Engineer Application – Liam Chen',
    sampleBody: `Dear Hiring Team,\n\nI am writing to respectfully follow up on my application for the Staff Systems Engineer position with Shopify, submitted approximately 12 days ago.\n\nI remain deeply enthusiastic about the opportunity to contribute my background in distributed systems, Ruby on Rails scalability, and large-scale merchant infrastructure to Shopify’s core platforms.\n\nPlease let me know if there is any supplementary information, architectural write-ups, or code samples I can provide to support the evaluation of my candidacy.\n\nThank you once again for your time, review, and consideration.\n\nBest regards,\nLiam Chen\nSystems Architect`
  },
  {
    id: 'email-networking',
    name: 'Professional Networking Outreach',
    category: 'Professional Networking',
    bestFor: 'Connecting with industry leaders, researchers, or practitioners for advice or informational interviews',
    icon: <Globe className="w-4 h-4 text-indigo-600" />,
    presetData: {
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
    sampleSubject: 'Admiration for AstraZeneca\'s oncology research & brief career question',
    sampleBody: `Dear Dr. Rebecca Stone,\n\nI am writing to share my sincere admiration for your recently published work on computational oncology and predictive biomarker modeling.\n\nAs a Bioinformatics Researcher specializing in genomic pipeline automation and clinical trial analytics, I have followed AstraZeneca’s computational medicine initiatives with keen interest. I am planning my next career step toward translational clinical data science and would be deeply grateful for 10–15 minutes of your perspective.\n\nIf your schedule permits a brief virtual coffee or phone conversation over the next few weeks, I would be honored to connect.\n\nThank you for your valuable time and pioneering research.\n\nRespectfully,\nJulian Alvarez\nBioinformatics Researcher`
  }
];

/* =========================================================================
   PAGE PROPS & MAIN COMPONENT
   ========================================================================= */

export type LetterTemplateType = 'all' | 'cover-letter' | 'recommendation' | 'email';

interface LetterAndEmailTemplatesPageProps {
  onUseCoverLetterTemplate?: (template: CoverLetterTemplateSpec) => void;
  onUseRecommendationPreset?: (presetData: any) => void;
  onUseEmailPreset?: (presetData: any) => void;
  initialType?: LetterTemplateType;
  onNavigate?: (page: string) => void;
}

export const LetterAndEmailTemplatesPage: React.FC<LetterAndEmailTemplatesPageProps> = ({
  onUseCoverLetterTemplate,
  onUseRecommendationPreset,
  onUseEmailPreset,
  initialType = 'all',
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<LetterTemplateType>(initialType);
  const [selectedItem, setSelectedItem] = useState<{
    kind: 'cover-letter' | 'recommendation' | 'email';
    id: string;
  }>({
    kind: 'cover-letter',
    id: COVER_LETTER_TEMPLATES[0].id
  });

  const [copied, setCopied] = useState(false);

  // Filter templates based on active tab
  const showCoverLetters = activeTab === 'all' || activeTab === 'cover-letter';
  const showRecommendations = activeTab === 'all' || activeTab === 'recommendation';
  const showEmails = activeTab === 'all' || activeTab === 'email';

  // Find active item spec
  const currentCoverLetter = COVER_LETTER_TEMPLATES.find(t => t.id === selectedItem.id) || COVER_LETTER_TEMPLATES[0];
  const currentRecommendation = RECOMMENDATION_TEMPLATES.find(t => t.id === selectedItem.id) || RECOMMENDATION_TEMPLATES[0];
  const currentEmail = EMAIL_TEMPLATES.find(t => t.id === selectedItem.id) || EMAIL_TEMPLATES[0];

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalCount = COVER_LETTER_TEMPLATES.length + RECOMMENDATION_TEMPLATES.length + EMAIL_TEMPLATES.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          Professional Career Correspondence
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Letter &amp; Email Templates
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Explore {totalCount} verified cover letter, recommendation letter, and job application email templates. Each template is calibrated for international hiring standards, complete with instant preview, copy-to-clipboard, and one-click transfer into our free builders.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'all'
              ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-sm'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          All Templates ({totalCount})
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('cover-letter');
            setSelectedItem({ kind: 'cover-letter', id: COVER_LETTER_TEMPLATES[0].id });
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'cover-letter'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Cover Letters ({COVER_LETTER_TEMPLATES.length})</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('recommendation');
            setSelectedItem({ kind: 'recommendation', id: RECOMMENDATION_TEMPLATES[0].id });
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'recommendation'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Recommendation Letters ({RECOMMENDATION_TEMPLATES.length})</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('email');
            setSelectedItem({ kind: 'email', id: EMAIL_TEMPLATES[0].id });
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'email'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Job Application Emails ({EMAIL_TEMPLATES.length})</span>
        </button>
      </div>

      {/* Main Grid: Left Selector List & Right Preview Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: List of Template Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Section: Cover Letters */}
          {showCoverLetters && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Cover Letter Templates
                </span>
                <span className="text-[11px] text-neutral-400">
                  {COVER_LETTER_TEMPLATES.length} templates
                </span>
              </div>
              <div className="space-y-2.5">
                {COVER_LETTER_TEMPLATES.map((tmpl) => {
                  const isSelected = selectedItem.kind === 'cover-letter' && selectedItem.id === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedItem({ kind: 'cover-letter', id: tmpl.id })}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-600/20'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl shrink-0">
                            {tmpl.icon}
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                              {tmpl.name}
                            </h3>
                            <span className="text-[11px] text-neutral-500 font-medium">
                              {tmpl.category}
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                        Best for: {tmpl.bestFor}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section: Recommendation Letters */}
          {showRecommendations && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  Recommendation Letter Templates
                </span>
                <span className="text-[11px] text-neutral-400">
                  {RECOMMENDATION_TEMPLATES.length} templates
                </span>
              </div>
              <div className="space-y-2.5">
                {RECOMMENDATION_TEMPLATES.map((tmpl) => {
                  const isSelected = selectedItem.kind === 'recommendation' && selectedItem.id === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedItem({ kind: 'recommendation', id: tmpl.id })}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-600/20'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl shrink-0">
                            {tmpl.icon}
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                              {tmpl.name}
                            </h3>
                            <span className="text-[11px] text-neutral-500 font-medium">
                              {tmpl.category}
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                        Best for: {tmpl.bestFor}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section: Job Application Emails */}
          {showEmails && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  Job Application Email Templates
                </span>
                <span className="text-[11px] text-neutral-400">
                  {EMAIL_TEMPLATES.length} templates
                </span>
              </div>
              <div className="space-y-2.5">
                {EMAIL_TEMPLATES.map((tmpl) => {
                  const isSelected = selectedItem.kind === 'email' && selectedItem.id === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedItem({ kind: 'email', id: tmpl.id })}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/30 ring-2 ring-amber-600/20'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl shrink-0">
                            {tmpl.icon}
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                              {tmpl.name}
                            </h3>
                            <span className="text-[11px] text-neutral-500 font-medium">
                              {tmpl.category}
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                        Best for: {tmpl.bestFor}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Template Prose Preview & Direct Builder Actions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-6">
            
            {/* KIND 1: COVER LETTER PREVIEW */}
            {selectedItem.kind === 'cover-letter' && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                      Cover Letter Template Preview
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {currentCoverLetter.name}
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Target Audience: {currentCoverLetter.bestFor}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const full = `Dear Hiring Committee,\n\n${currentCoverLetter.openingParagraph}\n\n${currentCoverLetter.bodyParagraphs.join('\n\n')}\n\n${currentCoverLetter.closingParagraph}\n\nSincerely,\n[Your Name]`;
                        handleCopyText(full);
                      }}
                      className="px-3.5 py-2 text-xs font-bold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Copy template text"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Text'}</span>
                    </button>

                    {onUseCoverLetterTemplate && (
                      <button
                        type="button"
                        onClick={() => onUseCoverLetterTemplate(currentCoverLetter)}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <span>Use in Builder</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Simulated Document Layout */}
                <div className="p-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-4 text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans">
                  <div className="text-[11px] text-neutral-400 font-mono">
                    [Date: Today] · [Target City, Target Country]
                  </div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Dear Hiring Committee,
                  </div>
                  <p className="text-justify leading-relaxed">{currentCoverLetter.openingParagraph}</p>
                  {currentCoverLetter.bodyParagraphs.map((p, idx) => (
                    <p key={idx} className="text-justify leading-relaxed">{p}</p>
                  ))}
                  <p className="text-justify leading-relaxed">{currentCoverLetter.closingParagraph}</p>
                  <div className="pt-2">
                    <div>Sincerely,</div>
                    <div className="font-bold text-neutral-900 dark:text-neutral-100 mt-1 uppercase">
                      [Your Full Name]
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* KIND 2: RECOMMENDATION LETTER PREVIEW */}
            {selectedItem.kind === 'recommendation' && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                      Recommendation Letter Template Preview
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {currentRecommendation.name}
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Target Audience: {currentRecommendation.bestFor}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyText(currentRecommendation.sampleText)}
                      className="px-3.5 py-2 text-xs font-bold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Copy template text"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Text'}</span>
                    </button>

                    {onUseRecommendationPreset && (
                      <button
                        type="button"
                        onClick={() => onUseRecommendationPreset(currentRecommendation.presetData)}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <span>Use in Builder</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Simulated Document Layout */}
                <div className="p-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-xs text-neutral-800 dark:text-neutral-200 font-sans leading-relaxed whitespace-pre-line">
                  {currentRecommendation.sampleText}
                </div>
              </>
            )}

            {/* KIND 3: JOB APPLICATION EMAIL PREVIEW */}
            {selectedItem.kind === 'email' && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                      Job Application Email Template Preview
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {currentEmail.name}
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Target Audience: {currentEmail.bestFor}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const full = `Subject: ${currentEmail.sampleSubject}\n\n${currentEmail.sampleBody}`;
                        handleCopyText(full);
                      }}
                      className="px-3.5 py-2 text-xs font-bold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Copy email subject and body"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Email'}</span>
                    </button>

                    {onUseEmailPreset && (
                      <button
                        type="button"
                        onClick={() => onUseEmailPreset(currentEmail.presetData)}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <span>Use in Generator</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Simulated Email Client Frame */}
                <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
                  {/* Email Header */}
                  <div className="p-4 bg-neutral-100 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-800 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-500 w-16 shrink-0">To:</span>
                      <span className="text-neutral-800 dark:text-neutral-200 font-mono text-[11px]">
                        {currentEmail.presetData.recipientNameOrRole} &lt;{currentEmail.presetData.companyName.toLowerCase().replace(/\s+/g, '')}@hiring.careers&gt;
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-500 w-16 shrink-0">Subject:</span>
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">
                        {currentEmail.sampleSubject}
                      </span>
                    </div>
                    {currentEmail.presetData.attachResume && (
                      <div className="flex items-center gap-2 pt-1 border-t border-neutral-200/60 dark:border-neutral-700/60">
                        <Paperclip className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="text-[11px] text-blue-700 dark:text-blue-300 font-medium">
                          Resume_David_Miller_ATS.pdf (240 KB)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Email Body */}
                  <div className="p-6 bg-white dark:bg-neutral-950 text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans whitespace-pre-line">
                    {currentEmail.sampleBody}
                  </div>
                </div>
              </>
            )}

            {/* Bottom Direct Links & Template Ecosystem */}
            <div className="p-5 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/80 space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/60 dark:border-neutral-700/60 pb-3">
                <span className="text-neutral-600 dark:text-neutral-400 font-medium">
                  All templates are 100% free with no watermarks and zero subscription paywalls.
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Global Career Suite
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-semibold text-blue-600 dark:text-blue-400">
                <button
                  type="button"
                  onClick={() => onNavigate?.('templates')}
                  className="hover:underline cursor-pointer"
                >
                  Resume Templates
                </button>
                <span className="text-neutral-300 dark:text-neutral-600">·</span>
                <button
                  type="button"
                  onClick={() => onNavigate?.('summary-templates')}
                  className="hover:underline cursor-pointer"
                >
                  Summary &amp; Objective Templates (18)
                </button>
                <span className="text-neutral-300 dark:text-neutral-600">·</span>
                <button
                  type="button"
                  onClick={() => onNavigate?.('bio-templates')}
                  className="hover:underline cursor-pointer"
                >
                  Bio Templates (15)
                </button>
                <span className="text-neutral-300 dark:text-neutral-600">·</span>
                <button
                  type="button"
                  onClick={() => onNavigate?.('resignation-letter-templates')}
                  className="hover:underline cursor-pointer"
                >
                  Resignation Templates (11)
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Backwards-compatible alias for existing imports
export const CoverLetterTemplatesPage = LetterAndEmailTemplatesPage;
