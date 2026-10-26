/**
 * GlobeCareer Resignation Letter Templates Library
 * Real, selectable, legally prudent, and professionally diplomatic resignation letters
 * covering 11+ distinct departure scenarios and notice periods.
 */

export interface ResignationTemplate {
  id: string;
  title: string;
  category: 'standard' | 'short_notice' | 'immediate' | 'career_growth' | 'relocation' | 'personal' | 'retirement' | 'diplomatic';
  badge: string;
  description: string;
  suggestedNoticePeriod: string;
  defaultData: {
    employeeName: string;
    jobTitle: string;
    managerName: string;
    managerTitle: string;
    companyName: string;
    resignationType: 'two_weeks' | 'short_notice' | 'immediate' | 'relocation' | 'retirement' | 'career_growth';
    lastWorkingDay: string;
    reasonForLeaving: string;
    transitionAssistance: string;
    gratitudeNote: string;
    tone: 'formal_courteous' | 'warm_grateful' | 'brief_direct';
  };
  sampleLetter: string;
}

export const RESIGNATION_FILTER_CATEGORIES = [
  { id: 'all', label: 'All Scenarios' },
  { id: 'standard', label: 'Standard 2 Weeks' },
  { id: 'career_growth', label: 'New Job / Career Growth' },
  { id: 'short_notice', label: 'Short Notice' },
  { id: 'immediate', label: 'Immediate Departure' },
  { id: 'relocation', label: 'Relocation & International' },
  { id: 'personal', label: 'Personal & Family' },
  { id: 'retirement', label: 'Retirement' },
  { id: 'diplomatic', label: 'Diplomatic & Executive' },
];

export const RESIGNATION_TEMPLATES: ResignationTemplate[] = [
  // 1. Standard Two-Weeks' Notice
  {
    id: 'standard-two-weeks',
    title: 'Standard Two Weeks\' Notice Resignation Letter',
    category: 'standard',
    badge: 'Standard • Corporate',
    description: 'The customary, polite 2-week notice letter suitable for corporate, tech, and general professional employment.',
    suggestedNoticePeriod: '14 calendar days (or per your employment contract)',
    defaultData: {
      employeeName: 'Sarah Jenkins',
      jobTitle: 'Senior Financial Analyst',
      managerName: 'Robert Vance',
      managerTitle: 'Director of Finance',
      companyName: 'Meridian Capital Partners',
      resignationType: 'two_weeks',
      lastWorkingDay: 'November 14, 2026',
      reasonForLeaving: 'accepting an opportunity that aligns with my long-term career aspirations',
      transitionAssistance: 'During these next two weeks, I am fully committed to completing ongoing quarterly forecasting audits and transferring all workflow documentation to ensure an uninterrupted handover.',
      gratitudeNote: 'Thank you for your steady guidance, mentorship, and support over the past four years. I have greatly valued working with this exceptional team.',
      tone: 'formal_courteous'
    },
    sampleLetter: `October 24, 2026

Robert Vance
Director of Finance
Meridian Capital Partners

Dear Robert,

Please accept this letter as formal notification that I am resigning from my position as Senior Financial Analyst with Meridian Capital Partners. In accordance with my notice period, my final working day will be November 14, 2026.

Thank you for your steady guidance, mentorship, and support over the past four years. I have greatly valued working with this exceptional team and appreciate the opportunities I have had to grow professionally during my tenure.

During these next two weeks, I am fully committed to completing ongoing quarterly forecasting audits and transferring all workflow documentation to ensure an uninterrupted handover. Please let me know how else I can assist during this transition period.

I wish you, the finance team, and Meridian Capital Partners continued success in all upcoming endeavors.

Sincerely,

Sarah Jenkins
Senior Financial Analyst`
  },

  // 2. Career Growth & New Opportunity
  {
    id: 'career-growth-new-job',
    title: 'Career Growth & New Opportunity Resignation Letter',
    category: 'career_growth',
    badge: 'Career Growth • Diplomatic',
    description: 'Respectful letter when resigning to accept an advanced position or pivot into a new career path.',
    suggestedNoticePeriod: '2 to 4 weeks (subject to contractual notice)',
    defaultData: {
      employeeName: 'David Mercer',
      jobTitle: 'Product Marketing Manager',
      managerName: 'Laura Sterling',
      managerTitle: 'VP of Marketing',
      companyName: 'CloudScale Technologies',
      resignationType: 'career_growth',
      lastWorkingDay: 'November 20, 2026',
      reasonForLeaving: 'accepting a senior leadership role that will expand my scope in enterprise product strategy',
      transitionAssistance: 'I have prepared a comprehensive transition roadmap detailing all active Q4 campaign deliverables, agency contacts, and asset repositories to ensure seamless continuation.',
      gratitudeNote: 'I want to express my deepest gratitude for your encouragement and the collaborative culture you have built. The experience I gained here has been instrumental to my professional development.',
      tone: 'warm_grateful'
    },
    sampleLetter: `October 24, 2026

Laura Sterling
VP of Marketing
CloudScale Technologies

Dear Laura,

Please accept this letter as formal notification that I am resigning from my position as Product Marketing Manager at CloudScale Technologies. My last working day will be November 20, 2026.

I have accepted a senior leadership opportunity that allows me to expand my professional scope in enterprise product strategy. This decision was not made lightly, as I have thoroughly enjoyed my time at CloudScale.

I want to express my deepest gratitude for your encouragement and the collaborative culture you have built. The experience I gained here has been instrumental to my professional development, and I am proud of the campaign milestones our team achieved together.

I have prepared a comprehensive transition roadmap detailing all active Q4 campaign deliverables, agency contacts, and asset repositories to ensure seamless continuation. I will work diligently over the coming weeks to onboard team members to my active responsibilities.

I wish you and CloudScale Technologies continued momentum and prosperity.

Sincerely,

David Mercer
Product Marketing Manager`
  },

  // 3. Short Notice Departure
  {
    id: 'short-notice-resignation',
    title: 'Short Notice Resignation Letter',
    category: 'short_notice',
    badge: 'Short Notice • Prudent',
    description: 'Diplomatic letter when you must depart before the customary two-week period due to accelerated start dates or timing.',
    suggestedNoticePeriod: '3 to 7 calendar days',
    defaultData: {
      employeeName: 'Marcus Cole',
      jobTitle: 'Operations Supervisor',
      managerName: 'Amanda Richardson',
      managerTitle: 'Director of Logistics',
      companyName: 'Apex Global Freight',
      resignationType: 'short_notice',
      lastWorkingDay: 'October 30, 2026',
      reasonForLeaving: 'unexpected scheduling requirements associated with an accelerated professional engagement',
      transitionAssistance: 'To expedite the transition, I have compiled full operating SOPs for the distribution hub and scheduled priority handover sessions with assistant supervisors this week.',
      gratitudeNote: 'I sincerely apologize for the compressed timeline and am grateful for the opportunities and trust you have extended to me during my employment.',
      tone: 'brief_direct'
    },
    sampleLetter: `October 24, 2026

Amanda Richardson
Director of Logistics
Apex Global Freight

Dear Amanda,

Please accept this letter as formal notification that I am resigning from my position as Operations Supervisor with Apex Global Freight. My last working day will be October 30, 2026.

I sincerely regret that I am unable to provide the standard two-week notice due to unexpected scheduling requirements associated with an accelerated professional engagement. I apologize for any inconvenience this compressed timeline may cause.

To expedite the transition, I have compiled full operating SOPs for the distribution hub and scheduled priority handover sessions with assistant supervisors this week. I will do everything within my power over my remaining days to ensure our daily operations proceed without disruption.

Thank you for your guidance and for the trust you have extended to me during my time with Apex Global Freight. I wish the entire team continued success.

Sincerely,

Marcus Cole
Operations Supervisor`
  },

  // 4. Immediate Resignation (Extenuating Circumstances)
  {
    id: 'immediate-resignation-letter',
    title: 'Immediate Resignation Letter (Extenuating Circumstances)',
    category: 'immediate',
    badge: 'Immediate • Legally Cautious',
    description: 'Formal notification when circumstances require your departure effective immediately with zero notice.',
    suggestedNoticePeriod: 'Effective immediately (same-day)',
    defaultData: {
      employeeName: 'Elena Rostova',
      jobTitle: 'Customer Care Lead',
      managerName: 'Jonathan Hayes',
      managerTitle: 'Head of Customer Experience',
      companyName: 'Omni Retail B.V.',
      resignationType: 'immediate',
      lastWorkingDay: 'October 24, 2026',
      reasonForLeaving: 'unforeseen and urgent personal circumstances requiring my immediate full-time attention',
      transitionAssistance: 'I have updated all active customer escalation tickets in the CRM and shared master credentials and status notes with the shift supervisor.',
      gratitudeNote: 'I regret that I cannot fulfill a standard transition and remain appreciative of the support and understanding of the management team.',
      tone: 'brief_direct'
    },
    sampleLetter: `October 24, 2026

Jonathan Hayes
Head of Customer Experience
Omni Retail B.V.

Dear Jonathan,

Please accept this letter as formal notification that I am resigning from my position as Customer Care Lead with Omni Retail B.V., effective immediately as of today, October 24, 2026.

Due to unforeseen and urgent personal circumstances requiring my immediate and undivided attention, I am unable to provide a notice period. I deeply regret any operational difficulty this abrupt departure may cause.

Prior to submitting this letter, I updated all active customer escalation tickets in the CRM, documented ongoing case statuses, and handed over key administrative credentials to the shift supervisor. Please let me know how best to coordinate the return of company-issued equipment and address final administrative matters.

Thank you for your professional support during my tenure with Omni Retail.

Sincerely,

Elena Rostova
Customer Care Lead`
  },

  // 5. Personal or Family Reasons
  {
    id: 'personal-family-resignation',
    title: 'Resignation for Personal or Family Reasons',
    category: 'personal',
    badge: 'Personal • Compassionate',
    description: 'Professional and private resignation letter citing family or personal priorities without oversharing details.',
    suggestedNoticePeriod: '2 weeks (or as personal situation permits)',
    defaultData: {
      employeeName: 'Hannah Abbott',
      jobTitle: 'Senior Clinical Research Coordinator',
      managerName: 'Dr. Michael Chang',
      managerTitle: 'Director of Clinical Trials',
      companyName: 'BioHealth Laboratories',
      resignationType: 'two_weeks',
      lastWorkingDay: 'November 15, 2026',
      reasonForLeaving: 'personal and family considerations that require my full-time focus at this time',
      transitionAssistance: 'I will ensure all patient trial logs, audit binders, and compliance records are completely synchronized and reviewed with our secondary clinical coordinator.',
      gratitudeNote: 'Working alongside you and the clinical research group has been deeply rewarding, and I am grateful for your compassion and professional leadership.',
      tone: 'warm_grateful'
    },
    sampleLetter: `October 24, 2026

Dr. Michael Chang
Director of Clinical Trials
BioHealth Laboratories

Dear Dr. Chang,

Please accept this letter as formal notice of my resignation from my position as Senior Clinical Research Coordinator with BioHealth Laboratories. My last working day will be November 15, 2026.

Due to personal and family circumstances that require my full-time attention at this juncture, I must step away from my professional role. While this was a difficult decision, focusing on my family’s needs must be my primary priority.

Working alongside you and the clinical research group has been deeply rewarding. I am grateful for the compassion, intellectual camaraderie, and professional trust you have extended to me throughout my years with the lab.

Over my remaining time, I will ensure all patient trial logs, audit binders, and regulatory compliance records are completely synchronized and reviewed with our secondary coordinator to guarantee uninterrupted clinical trial governance.

Thank you for your understanding. I wish you and the team continued breakthroughs in your research.

Sincerely,

Hannah Abbott
Senior Clinical Research Coordinator`
  },

  // 6. International Relocation Resignation
  {
    id: 'relocation-international-resignation',
    title: 'International Relocation Resignation Letter',
    category: 'relocation',
    badge: 'Relocation • Global',
    description: 'Polite resignation letter when relocating overseas or to another domestic market.',
    suggestedNoticePeriod: '2 to 4 weeks',
    defaultData: {
      employeeName: 'Julian Alvarez',
      jobTitle: 'Senior Full Stack Software Engineer',
      managerName: 'Claire Dupont',
      managerTitle: 'VP of Engineering',
      companyName: 'Strata Software Systems',
      resignationType: 'relocation',
      lastWorkingDay: 'November 28, 2026',
      reasonForLeaving: 'relocating permanently to Europe for family and personal reasons',
      transitionAssistance: 'I will complete all pending code reviews, update microservice architecture documentation in Confluence, and conduct knowledge transfer sessions with the team.',
      gratitudeNote: 'Working with our engineering group has been a defining highlight of my career. I am thankful for the challenging projects and friendship of my colleagues.',
      tone: 'warm_grateful'
    },
    sampleLetter: `October 24, 2026

Claire Dupont
VP of Engineering
Strata Software Systems

Dear Claire,

Please accept this letter as formal notification that I am resigning from my position as Senior Full Stack Software Engineer with Strata Software Systems. My last day of employment will be November 28, 2026.

My resignation is prompted by an upcoming international relocation to Europe for family and personal reasons. Because our team currently operates on a hybrid local model, I will be unable to continue my duties from overseas.

Working with our engineering group has been a defining highlight of my career. I am deeply thankful for the challenging architectural initiatives, executive support, and collaborative spirit that define Strata’s culture.

During the next month, I will complete all pending pull requests, update microservice documentation in Confluence, and lead structured paired-programming sessions with team members to ensure total project continuity.

I wish you and Strata Software Systems continued technical and commercial success.

Sincerely,

Julian Alvarez
Senior Full Stack Software Engineer`
  },

  // 7. Formal Retirement Letter
  {
    id: 'formal-retirement-letter',
    title: 'Formal Retirement Resignation Letter',
    category: 'retirement',
    badge: 'Retirement • Milestone',
    description: 'Celebratory, dignified formal retirement letter concluding a long and distinguished tenure.',
    suggestedNoticePeriod: '30 to 90 calendar days',
    defaultData: {
      employeeName: 'Arthur Pendelton',
      jobTitle: 'Chief Mechanical Engineer',
      managerName: 'Rebecca Vance',
      managerTitle: 'Executive VP of Engineering',
      companyName: 'Titan Industrial Manufacturing',
      resignationType: 'retirement',
      lastWorkingDay: 'December 31, 2026',
      reasonForLeaving: 'formal retirement after 24 rewarding years with the organization',
      transitionAssistance: 'I am eager to spend my remaining two months mentoring the incoming engineering leads, archiving design patents, and facilitating a seamless leadership transfer.',
      gratitudeNote: 'It has been the honor of my professional life to contribute to Titan’s engineering legacy. I will carry fond memories of the brilliant colleagues I have worked alongside.',
      tone: 'formal_courteous'
    },
    sampleLetter: `October 24, 2026

Rebecca Vance
Executive VP of Engineering
Titan Industrial Manufacturing

Dear Rebecca,

Please accept this letter as formal notification of my retirement from my role as Chief Mechanical Engineer with Titan Industrial Manufacturing, effective December 31, 2026.

After 24 rewarding years with the organization, I have decided the time is right to embark on the next chapter of my life. It has been the distinct honor of my professional career to contribute to Titan’s engineering innovations, and I take immense pride in the resilient products our division has designed and shipped.

I am immensely grateful to the executive board, my fellow engineers, and the entire manufacturing staff for their friendship, dedication, and steadfast support over more than two decades.

Over the coming two months, I am committed to working closely with you to ensure an orderly transition. I will focus on mentoring the incoming senior engineering leads, completing documentation on active proprietary patent filings, and transferring project oversight.

I leave Titan with profound respect for the company and wish you all enduring prosperity and engineering excellence.

Sincerely,

Arthur Pendelton
Chief Mechanical Engineer`
  },

  // 8. Health or Medical Circumstances
  {
    id: 'health-medical-resignation',
    title: 'Resignation Due to Health or Medical Circumstances',
    category: 'personal',
    badge: 'Health • Private & Polite',
    description: 'Prudent letter resigning due to personal health recovery without disclosing confidential medical details.',
    suggestedNoticePeriod: 'Immediate or short notice (per medical counsel)',
    defaultData: {
      employeeName: 'Catherine Murphy',
      jobTitle: 'Administrative Coordinator',
      managerName: 'Stephen Cole',
      managerTitle: 'Office Managing Partner',
      companyName: 'Sterling & Partners LLP',
      resignationType: 'two_weeks',
      lastWorkingDay: 'November 6, 2026',
      reasonForLeaving: 'a health condition that necessitates dedicated medical treatment and recovery',
      transitionAssistance: 'I have compiled a comprehensive master spreadsheet of all scheduled partner filings, client meetings, and supply vendors to assist my replacement.',
      gratitudeNote: 'Thank you for your kindness, professional support, and understanding during this period. I have thoroughly enjoyed working with the firm.',
      tone: 'formal_courteous'
    },
    sampleLetter: `October 24, 2026

Stephen Cole
Office Managing Partner
Sterling & Partners LLP

Dear Stephen,

Please accept this letter as formal notice that I am resigning from my position as Administrative Coordinator with Sterling & Partners LLP. My last day of employment will be November 6, 2026.

Upon the advice of my physician, I must attend to a health condition that requires dedicated medical treatment and recovery. While I regret having to step away from my duties, focusing on my recovery is essential at this time.

I have thoroughly enjoyed my time with the firm and am grateful for the respect, kindness, and flexibility management has extended to me.

To facilitate an orderly handover, I have organized a master status guide detailing scheduled client meetings, vendor contacts, and court filing schedules. I will ensure our administrative assistants are fully briefed prior to my departure.

Thank you for your understanding and support.

Sincerely,

Catherine Murphy
Administrative Coordinator`
  },

  // 9. Diplomatic & Executive Separation
  {
    id: 'diplomatic-executive-resignation',
    title: 'Diplomatic Executive Resignation Letter',
    category: 'diplomatic',
    badge: 'Executive • Board Level',
    description: 'Polished, diplomatic departure letter for directors, VPs, and corporate executives preserving board relationships.',
    suggestedNoticePeriod: '30 to 60 calendar days',
    defaultData: {
      employeeName: 'Victoria Sterling',
      jobTitle: 'Vice President of People & Culture',
      managerName: 'Alexander Hayes',
      managerTitle: 'Chief Executive Officer',
      companyName: 'Aura Enterprise Software',
      resignationType: 'career_growth',
      lastWorkingDay: 'December 15, 2026',
      reasonForLeaving: 'transitioning into an executive advisory and board role',
      transitionAssistance: 'I will partner with you and the executive committee to outline search specifications for my successor, finalize year-end compensation reviews, and brief the department directors.',
      gratitudeNote: 'Leading the People organization through our period of high growth has been deeply fulfilling. I value the trust and partnership we have shared.',
      tone: 'executive' as any
    },
    sampleLetter: `October 24, 2026

Alexander Hayes
Chief Executive Officer
Aura Enterprise Software

Dear Alexander,

Please accept this letter as formal notification of my resignation as Vice President of People & Culture with Aura Enterprise Software, effective December 15, 2026.

I have accepted an invitation to take on an executive advisory and board role that aligns with my long-term career aspirations.

Leading Aura’s People organization through our international expansion and talent transformation has been one of the most fulfilling chapters of my executive career. I am deeply grateful for the partnership and trust we have maintained, as well as the support of the board of directors.

During this extended notice window, I am fully committed to executing a structured leadership succession. I will collaborate closely with you to finalize our annual performance and compensation cycles, brief the senior people directors, and assist in onboarding interim or permanent leadership.

I remain a champion of Aura’s mission and wish the executive leadership team, our employees, and the company continued global scale.

Warm regards,

Victoria Sterling
Vice President of People & Culture`
  },

  // 10. Concise & Direct 1-Paragraph Resignation
  {
    id: 'concise-direct-resignation',
    title: 'Concise & Direct Resignation Letter (1 Paragraph)',
    category: 'standard',
    badge: 'Concise • Simple',
    description: 'A minimal, no-nonsense formal letter fulfilling contractual notice requirements with zero unnecessary details.',
    suggestedNoticePeriod: '14 calendar days',
    defaultData: {
      employeeName: 'Thomas Wright',
      jobTitle: 'Marketing Specialist',
      managerName: 'Rachel Green',
      managerTitle: 'Marketing Manager',
      companyName: 'Vertex Digital Media',
      resignationType: 'two_weeks',
      lastWorkingDay: 'November 7, 2026',
      reasonForLeaving: 'pursuing another professional opportunity',
      transitionAssistance: 'I will finalize all active campaign drafts and document open tasks before my final day.',
      gratitudeNote: 'Thank you for your guidance and the opportunity to contribute to the marketing team.',
      tone: 'brief_direct'
    },
    sampleLetter: `October 24, 2026

Rachel Green
Marketing Manager
Vertex Digital Media

Dear Rachel,

Please accept this letter as formal notification that I am resigning from my position as Marketing Specialist at Vertex Digital Media. My final day of employment will be November 7, 2026. Thank you for the guidance and opportunities provided to me during my time with the company. I will finalize all active campaign deliverables and document my workflow to ensure a smooth transition before my departure.

Sincerely,

Thomas Wright
Marketing Specialist`
  },

  // 11. Handover & Transition-Centric Resignation
  {
    id: 'handover-transition-resignation',
    title: 'Handover & Knowledge-Transfer Centric Resignation',
    category: 'standard',
    badge: 'Handover • Team First',
    description: 'A proactive letter detailing an explicit 4-part transition plan to reassure leadership and maintain strong goodwill.',
    suggestedNoticePeriod: '14 to 30 calendar days',
    defaultData: {
      employeeName: 'Deepak Patel',
      jobTitle: 'Lead Cloud Infrastructure Architect',
      managerName: 'Nathaniel Reed',
      managerTitle: 'Director of Platform Engineering',
      companyName: 'Nova FinTech B.V.',
      resignationType: 'two_weeks',
      lastWorkingDay: 'November 20, 2026',
      reasonForLeaving: 'accepting an opportunity in open-source infrastructure architecture',
      transitionAssistance: 'I have scheduled daily handover briefings, verified Terraform state documentation, and prepared recorded architecture walkthroughs for all junior platform engineers.',
      gratitudeNote: 'I am immensely grateful for the technical freedom and support you have given me over the last three years. Nova has been a truly fantastic place to build.',
      tone: 'warm_grateful'
    },
    sampleLetter: `October 24, 2026

Nathaniel Reed
Director of Platform Engineering
Nova FinTech B.V.

Dear Nathaniel,

Please accept this letter as formal notification that I am resigning from my role as Lead Cloud Infrastructure Architect at Nova FinTech B.V., with my final day set for November 20, 2026.

I have accepted an exciting role in open-source infrastructure research. Working with you and our platform team has been one of the most rewarding periods of my technical career, and I remain deeply thankful for the trust and engineering autonomy you granted me.

My primary priority between now and November 20 is ensuring that Nova’s cloud operations continue without missing a beat. I have established the following handover plan:
1. Daily paired knowledge-transfer sessions with our senior site reliability engineers.
2. Complete verification and documentation of all Terraform infrastructure modules and AWS IAM boundaries in Notion.
3. Pre-recorded video walkthroughs for emergency failover and disaster recovery runbooks.
4. Finalizing Q4 cloud cost tagging to assist finance with budget forecasting.

Please let me know if there are additional priorities you would like me to address before my departure. I wish Nova FinTech continued growth and engineering excellence.

Sincerely,

Deepak Patel
Lead Cloud Infrastructure Architect`
  }
];
