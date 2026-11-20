/**
 * Role-level resume example content.
 *
 * Every field here is written for one specific occupation: no shared boilerplate,
 * no keyword stuffing and no invented statistics. Numbers that appear in the
 * example bullets come from the app's own job-category data (JOB_CATEGORIES),
 * and the guidance is qualitative on purpose — we do not publish salary or
 * hiring-rate figures we cannot verify.
 */

export interface RoleFaq {
  q: string;
  a: string;
}

export interface RoleExample {
  slug: string;
  roleName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  alsoCalled: string[];
  intro: string[];
  responsibilities: string[];
  skills: { core: string[]; tools: string[]; soft: string[] };
  qualifications: string[];
  experience: { level: string; expectation: string }[];
  resumeTips: { title: string; detail: string }[];
  keywords: string[];
  categoryId: string;
  faqs: RoleFaq[];
  related: string[];
}

export const ROLE_EXAMPLES: RoleExample[] = [
  {
    slug: 'customer-service',
    roleName: 'Customer Service Representative',
    h1: 'Customer Service Resume Example & Writing Guide',
    metaTitle: 'Customer Service Resume Example, Skills & ATS Keywords | GlobeCareer',
    metaDescription:
      'Customer service resume example with real responsibility statements, the skills recruiters screen for, and the ATS keywords that match support job descriptions.',
    alsoCalled: ['Customer Support Specialist', 'Client Service Representative', 'Contact Centre Agent'],
    intro: [
      'A customer service resume is judged on two things before anyone reads a word of it: whether the reader can see how many customers you handled, and whether they believe you can keep your composure when a conversation goes badly. Hiring managers for support roles screen for volume, channel mix and resolution quality, because those three numbers predict how quickly you will be productive on their queue.',
      'This page breaks the role into the parts a recruiter actually scores — responsibilities, tools, qualifications and the experience level they expect — then shows how to turn that into resume lines that survive an applicant tracking system.'
    ],
    responsibilities: [
      'Respond to customer enquiries by phone, email, live chat or social channels within the team’s published response targets.',
      'Resolve order, billing, delivery and account problems, escalating only the cases that genuinely need a specialist or a supervisor.',
      'Record every interaction accurately in the CRM so the next agent or the account owner has full context.',
      'Process returns, exchanges, refunds and address changes while following policy and fraud checks.',
      'Explain products, pricing, contract terms and self-service options in plain language.',
      'Identify recurring complaint patterns and feed them back to product, operations or the knowledge base.',
      'Meet quality, adherence and customer satisfaction targets without cutting corners on verification.'
    ],
    skills: {
      core: [
        'Complaint de-escalation',
        'Order and billing support',
        'Ticket triage and prioritisation',
        'Policy interpretation',
        'Multi-channel written communication',
        'Data accuracy and verification',
        'Knowledge-base writing'
      ],
      tools: ['Zendesk', 'Freshdesk', 'Salesforce Service Cloud', 'HubSpot Service Hub', 'Intercom', 'Shopify admin', 'LiveChat', 'Google Workspace'],
      soft: ['Patience under pressure', 'Clear written English', 'Active listening', 'Ownership of follow-ups', 'Empathy without over-promising']
    },
    qualifications: [
      'Secondary education is the normal minimum; a customer-facing certificate or apprenticeship helps at entry level.',
      'Demonstrated experience with at least one ticketing or CRM system — specify which, because job descriptions name them.',
      'Typing speed and accuracy sufficient for live chat, usually stated as words per minute on support job ads.',
      'Language ability at the level the market requires, expressed on a recognised scale such as CEFR rather than “fluent”.',
      'Willingness to work shifts or weekends for contact-centre roles — say so explicitly if you can.'
    ],
    experience: [
      { level: 'Entry (0–2 years)', expectation: 'Retail, hospitality or volunteer contact with the public counts. Show volume of people served and any cash, booking or complaint handling.' },
      { level: 'Mid (2–5 years)', expectation: 'Own a channel or product area, handle escalations, and show measurable quality or resolution outcomes.' },
      { level: 'Senior / Team lead', expectation: 'Coaching, queue management, quality assurance, workforce planning and process or knowledge-base ownership.' }
    ],
    resumeTips: [
      { title: 'Lead with volume and channel', detail: '“Handled 60–80 inbound chats per day across chat and email” tells a support manager more than “excellent communication skills”.' },
      { title: 'Name your stack', detail: 'Put the ticketing system, CRM and any help-centre tooling in a Tools line. ATS filters for these exact product names.' },
      { title: 'Quantify resolution, not just activity', detail: 'First-contact resolution, reopen rate, backlog cleared, average handle time and satisfaction scores are the metrics support teams track.' },
      { title: 'Show the difficult cases', detail: 'One line about a billing dispute, a retention save or a policy exception you resolved cleanly is worth five lines about answering phones.' },
      { title: 'Keep the summary short', detail: 'Two sentences: the channels and products you support, then the outcome you are known for.' }
    ],
    keywords: [
      'customer service',
      'customer support',
      'first contact resolution',
      'crm',
      'zendesk',
      'ticketing',
      'escalation',
      'live chat',
      'average handle time',
      'customer satisfaction',
      'order management',
      'complaint resolution'
    ],
    categoryId: 'customer-service',
    faqs: [
      { q: 'Do I need customer service experience to apply?', a: 'Not always. Retail, hospitality, call-centre and volunteer roles all produce the same evidence — volume of people helped, problems resolved, systems used. Name the transferable part explicitly in your summary rather than hoping the reader infers it.' },
      { q: 'Should I list typing speed?', a: 'Only if the job advert asks for it or you are applying to a live-chat-heavy team. In that case put the number in your skills line, for example “65 WPM with 99% accuracy”.' },
      { q: 'How long should a customer service resume be?', a: 'One page is enough for up to about five years of experience. Two pages is acceptable when you are listing several employers, multiple channels and a promotion into coaching or escalations.' },
      { q: 'What is the strongest single line for this role?', a: 'A line that pairs a workload with a result and a system — for example resolving a set daily volume in a named CRM while keeping reopens low. It proves capacity, tooling and quality at once.' }
    ],
    related: ['sales-representative', 'project-manager', 'registered-nurse']
  },
  {
    slug: 'software-engineer',
    roleName: 'Software Engineer',
    h1: 'Software Engineer Resume Example & Writing Guide',
    metaTitle: 'Software Engineer Resume Example, Skills & ATS Keywords | GlobeCareer',
    metaDescription:
      'Software engineer resume example with responsibility statements by level, the tools recruiters search for, and guidance on writing impact-focused bullets.',
    alsoCalled: ['Software Developer', 'Backend Engineer', 'Full-Stack Engineer', 'Application Developer'],
    intro: [
      'Engineering resumes are read by two audiences: a recruiter matching keywords from the job description, and an engineer who wants to know what you actually built. The first audience decides whether you reach the second, so the document has to be technically specific and scannable at the same time.',
      'The most common failure is a list of technologies with no evidence of what was delivered. A stronger resume states the system you worked on, the constraint you were under, and the measured change in behaviour, cost or reliability that followed.'
    ],
    responsibilities: [
      'Design, build and maintain services or user-facing features in the team’s primary language and framework.',
      'Write and review code with tests, documentation and observability built in rather than added later.',
      'Debug production incidents, participate in on-call rotations and write post-incident reviews.',
      'Work with product, design and data colleagues to turn requirements into technical designs.',
      'Improve build, deployment and test pipelines so releases stay small and reversible.',
      'Review architecture and data models for performance, cost and failure behaviour.',
      'Mentor less experienced engineers through pairing and code review.'
    ],
    skills: {
      core: [
        'Data structures and algorithms',
        'API design (REST, gRPC)',
        'Relational and NoSQL data modelling',
        'Testing and test automation',
        'Debugging and profiling',
        'Version control and code review',
        'CI/CD and infrastructure as code',
        'System design and scalability'
      ],
      tools: ['TypeScript', 'Python', 'Java', 'Go', 'React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS or GCP', 'Terraform', 'GitHub Actions'],
      soft: ['Written technical communication', 'Design review participation', 'Pragmatic prioritisation', 'Mentoring', 'Incident ownership']
    },
    qualifications: [
      'A computer science degree is common but not universal; a portfolio, open-source contributions or a credible alternative training route can substitute when the work is demonstrable.',
      'Evidence of shipped software in production, with the scale and the part you personally owned.',
      'Testing discipline — describe how you test, not only that you do.',
      'For senior roles, at least one example of technical leadership: a design you drove, a migration you planned, or a team you unblocked.',
      'Cloud and container familiarity at the level the role requires; state the provider you have actually used.'
    ],
    experience: [
      { level: 'Junior (0–2 years)', expectation: 'Delivers scoped tasks with review, writes tests, fixes bugs, and explains their own code clearly.' },
      { level: 'Mid (2–5 years)', expectation: 'Owns a service or feature area end to end, including design, rollout and on-call.' },
      { level: 'Senior / Staff', expectation: 'Sets technical direction, leads multi-team migrations, and improves reliability or cost across systems they do not personally write.' }
    ],
    resumeTips: [
      { title: 'State the system, then the change', detail: '“Rewrote the pricing service to cache tariff lookups, cutting p95 latency from 900 ms to 120 ms” reads as engineering; “worked on pricing service” does not.' },
      { title: 'Separate languages from outcomes', detail: 'A single compact Skills line for languages, frameworks and infrastructure keeps the experience section free for what you delivered.' },
      { title: 'Show ownership boundaries', detail: 'Say “designed and shipped” only where it is true; otherwise “contributed to” or “maintained”. Interviewers probe this line first.' },
      { title: 'Include one reliability story', detail: 'Incident response, error-budget work or a migration with a rollback plan demonstrates judgement that pure feature work does not.' },
      { title: 'Mirror the job description vocabulary', detail: 'If the posting says “observability” and you wrote “monitoring”, include both once — ATS matching is literal, human readers are not.' }
    ],
    keywords: [
      'software engineer',
      'software developer',
      'typescript',
      'python',
      'rest api',
      'microservices',
      'unit testing',
      'ci/cd',
      'docker',
      'kubernetes',
      'system design',
      'code review'
    ],
    categoryId: 'it-software',
    faqs: [
      { q: 'Should I include a projects section?', a: 'Yes when you have under about three years of professional experience, or when a project demonstrates a skill the job asks for that your paid work does not cover. Two or three substantial projects beat ten tutorials.' },
      { q: 'How technical should the resume be?', a: 'Technical enough that an engineer recognises the work, plain enough that a recruiter can summarise it. Name the technology once, then describe behaviour and impact rather than repeating the stack in every line.' },
      { q: 'Do I need a degree to get past screening?', a: 'Some employers filter on one, and you cannot change that from the resume. Where a degree is not mandatory, a portfolio, contributions to real repositories and clearly described production work carry the same weight in most engineering hiring processes.' },
      { q: 'What belongs in the summary?', a: 'Two sentences: your specialism and scale, then the kind of problem you are known for solving. Avoid listing every language there — that belongs in Skills.' }
    ],
    related: ['data-analyst', 'project-manager', 'customer-service']
  },
  {
    slug: 'registered-nurse',
    roleName: 'Registered Nurse',
    h1: 'Registered Nurse Resume Example & Writing Guide',
    metaTitle: 'Registered Nurse Resume Example, Skills & ATS Keywords | GlobeCareer',
    metaDescription:
      'Registered nurse resume example covering clinical responsibilities, licences, specialisms and the screening keywords used in nursing job descriptions.',
    alsoCalled: ['Staff Nurse', 'RN', 'Clinical Nurse', 'Ward Nurse'],
    intro: [
      'Nursing resumes are credential-first documents. Before a hiring manager reads about your clinical judgement, they check licence status, registration body, specialism and the settings you have worked in — because those determine whether you can be rostered at all.',
      'After the credentials, the resume has to show patient volume, acuity, documentation habits and teamwork under pressure. This guide covers what to include for each of those, plus how to describe clinical experience without breaching patient confidentiality.'
    ],
    responsibilities: [
      'Assess, plan, implement and evaluate nursing care for an assigned patient group across a shift.',
      'Administer medication and treatments, checking rights, dosages and allergy status before administration.',
      'Monitor vital signs, deterioration and pain, escalating through the correct clinical pathway.',
      'Maintain accurate, contemporaneous records in the electronic patient record system.',
      'Educate patients and families on condition, medication, wound care and discharge instructions.',
      'Coordinate with doctors, allied health, pharmacy and social work on the care plan.',
      'Supervise and support nursing assistants and students, and contribute to handover.'
    ],
    skills: {
      core: [
        'Patient assessment and triage',
        'Medication administration and safety',
        'IV therapy and cannulation',
        'Wound care and aseptic technique',
        'Clinical documentation',
        'Infection prevention and control',
        'Deteriorating-patient recognition',
        'Shift handover'
      ],
      tools: ['Electronic health records (Epic, Cerner, Meditech)', 'Medication management systems', 'Patient monitoring equipment', 'Infusion pumps', 'Barcode medication administration'],
      soft: ['Calm escalation', 'Prioritisation across competing needs', 'Family communication', 'Team handover clarity', 'Cultural sensitivity']
    },
    qualifications: [
      'Active registration or licensure with the relevant nursing council for the country you are applying in — the number and status belong on page one.',
      'Recognised nursing qualification (diploma, associate degree or bachelor’s, depending on jurisdiction).',
      'Mandatory training certificates the employer will ask for: basic life support, manual handling, safeguarding, infection control.',
      'Specialism certification where relevant — critical care, emergency, paediatric, oncology or theatre.',
      'Language proficiency at the level the regulator requires, evidenced by the accepted test for that country.'
    ],
    experience: [
      { level: 'Newly qualified', expectation: 'Clinical placements, preceptorship and supervised practice; highlight hours, settings and competencies signed off.' },
      { level: 'Experienced staff nurse', expectation: 'Independent patient load, acuity level, ward specialism, and mentoring of juniors or students.' },
      { level: 'Senior / Charge nurse', expectation: 'Shift coordination, rostering, quality improvement, audit participation, incident review and staff development.' }
    ],
    resumeTips: [
      { title: 'Put registration above experience', detail: 'Registration body, licence status and expiry belong in the header area. Recruiters filter on this before reading anything else.' },
      { title: 'Describe the setting, not just the title', detail: '“30-bed acute medical ward, average 6 patients per shift, high-acuity respiratory cohort” is concrete and does not identify patients.' },
      { title: 'Name systems and equipment', detail: 'Electronic record systems, infusion devices and monitoring equipment are frequently listed in nursing job descriptions and screened literally.' },
      { title: 'Quantify safely', detail: 'Bed counts, caseload, shift pattern and training delivered are all shareable. Never include patient identifiers, dates of birth or ward incidents that could identify someone.' },
      { title: 'List mandatory training', detail: 'A compact Training line with current certificates saves the recruiter a question and signals that you are deployment-ready.' }
    ],
    keywords: [
      'registered nurse',
      'patient care',
      'clinical assessment',
      'medication administration',
      'electronic health record',
      'infection control',
      'triage',
      'wound care',
      'patient safety',
      'care planning',
      'bls',
      'handover'
    ],
    categoryId: 'healthcare',
    faqs: [
      { q: 'How do I show international nursing experience?', a: 'Give the country, the registration body, the equivalent qualification level and the language test result if the destination regulator requires one. Add a plain-language note on the healthcare system so the reader can map your setting onto theirs.' },
      { q: 'What if my licence is pending?', a: 'State the status honestly: application submitted, exam passed, or registration expected by a specific date. Never imply an active licence you do not hold — it is a verification failure and usually an automatic rejection.' },
      { q: 'Should I include clinical placements?', a: 'Yes for newly qualified nurses, with the ward type, hours and competencies signed off. Once you have a year of post-registration practice, placements can shrink to one line or drop out.' },
      { q: 'Which specialism keywords matter most?', a: 'The ones in the advert. A critical-care role screens for ventilator, vasopressor and monitoring vocabulary; a community role screens for chronic disease management and independent caseload language.' }
    ],
    related: ['teacher', 'customer-service', 'project-manager']
  },
  {
    slug: 'teacher',
    roleName: 'Teacher',
    h1: 'Teacher Resume Example & Writing Guide',
    metaTitle: 'Teacher Resume Example, Skills & ATS Keywords | GlobeCareer',
    metaDescription:
      'Teacher resume example with classroom responsibilities, qualification and certification requirements, and the keywords used in teaching job descriptions.',
    alsoCalled: ['Classroom Teacher', 'Subject Teacher', 'Primary Teacher', 'Secondary Teacher'],
    intro: [
      'A teaching resume has to prove three separate things: that you are qualified to be in the room, that you can plan and deliver a curriculum, and that students actually progress under your instruction. Schools read for all three, and international schools add a fourth — whether your qualification and language level transfer.',
      'This guide shows how to present each element, including how to describe class sizes, year groups, curriculum frameworks and outcomes without inflating them.'
    ],
    responsibilities: [
      'Plan and deliver lessons aligned to the relevant curriculum framework and scheme of work.',
      'Differentiate instruction for mixed-ability classes, including students with additional needs and language learners.',
      'Assess learning through formative and summative tasks, and record progress against standards.',
      'Manage classroom behaviour using the school’s policy, keeping a calm and predictable environment.',
      'Communicate with parents and guardians through reports, conferences and routine updates.',
      'Collaborate with department colleagues on planning, moderation and resource development.',
      'Contribute to co-curricular activities, trips and school improvement priorities.'
    ],
    skills: {
      core: [
        'Curriculum planning',
        'Lesson design and sequencing',
        'Formative assessment',
        'Differentiation and scaffolding',
        'Behaviour management',
        'Literacy and numeracy support',
        'Student progress tracking',
        'Parent communication'
      ],
      tools: ['Google Classroom', 'Microsoft Teams for Education', 'Canvas', 'Schoology', 'Seesaw', 'Interactive whiteboards', 'Student information systems (SIMS, PowerSchool)'],
      soft: ['Patience and consistency', 'Clear explanation', 'Collaboration with colleagues', 'Reflective practice', 'Cultural responsiveness']
    },
    qualifications: [
      'A recognised teaching qualification for the jurisdiction — bachelor of education, PGCE, teaching diploma or equivalent.',
      'Teaching licence, registration or certification number where the country requires one.',
      'Subject or phase specialism matching the vacancy, stated plainly in the header.',
      'Safeguarding and child-protection training, plus a clearable background check for the country of employment.',
      'For international schools: evidence of curriculum experience (national curriculum, IB, Cambridge, Common Core) and language proficiency at the required level.'
    ],
    experience: [
      { level: 'Early career (0–2 years)', expectation: 'Teaching practice, supply or assistant roles; show year groups, class sizes and planning responsibilities.' },
      { level: 'Established teacher (2–6 years)', expectation: 'Full class responsibility, assessment ownership, exam classes, and evidence of student progress.' },
      { level: 'Lead / Head of department', expectation: 'Curriculum leadership, mentoring, moderation, inspection preparation and whole-school projects.' }
    ],
    resumeTips: [
      { title: 'Name the curriculum', detail: '“Cambridge IGCSE” or “Grade 6 Common Core” tells a school immediately whether you can teach their programme; “teaching experience” does not.' },
      { title: 'State year groups and class sizes', detail: 'Phase, ages, class size and number of classes per week are the first facts a head of department checks.' },
      { title: 'Show progress, not just activity', detail: 'Assessment outcomes, intervention groups run, or uptake in your subject are stronger than a list of clubs you supervised.' },
      { title: 'Keep safeguarding visible', detail: 'One line for safeguarding training and background-check status prevents an assumption that you have not done it.' },
      { title: 'Tailor the philosophy to the school', detail: 'A two-sentence summary that matches the school’s stated approach is more persuasive than a generic statement about loving teaching.' }
    ],
    keywords: [
      'teacher',
      'lesson planning',
      'curriculum',
      'classroom management',
      'differentiation',
      'formative assessment',
      'student progress',
      'safeguarding',
      'parent communication',
      'igcse',
      'ib',
      'primary education'
    ],
    categoryId: 'education',
    faqs: [
      { q: 'How do I apply for teaching jobs in another country?', a: 'Lead with your qualification’s equivalence, your licence status and your curriculum experience, then add language evidence if the destination requires it. Country guides on this site summarise the document conventions each market expects.' },
      { q: 'Should the resume include a teaching philosophy?', a: 'Keep it to two sentences inside the summary. A separate long philosophy statement is usually requested at application stage, not in the resume itself.' },
      { q: 'Do supply or tutoring roles count as experience?', a: 'Yes, if you describe them properly: year groups, planning responsibility, class size and outcomes. Group them under one heading rather than listing each short assignment separately.' },
      { q: 'What about references?', a: 'Keep them off the resume. Schools request referees through their own safeguarding process, and a separate reference sheet is the right place for the details.' }
    ],
    related: ['registered-nurse', 'customer-service', 'project-manager']
  },
  {
    slug: 'data-analyst',
    roleName: 'Data Analyst',
    h1: 'Data Analyst Resume Example & Writing Guide',
    metaTitle: 'Data Analyst Resume Example, Skills & ATS Keywords | GlobeCareer',
    metaDescription:
      'Data analyst resume example with SQL, dashboarding and stakeholder responsibilities, the tools hiring teams screen for, and guidance on proving business impact.',
    alsoCalled: ['Business Analyst (Data)', 'BI Analyst', 'Reporting Analyst', 'Insights Analyst'],
    intro: [
      'Analyst resumes are frequently rejected for the same reason: they list tools but not decisions. A hiring team already assumes you can write SQL; what it cannot assume is that you know which question matters, that your numbers are right, and that someone changed what they were doing because of your work.',
      'This page sets out the responsibilities, skills and qualification evidence that actually get screened, then shows how to phrase results so the business value is visible.'
    ],
    responsibilities: [
      'Write SQL queries against production and warehouse data to answer commercial and operational questions.',
      'Build and maintain dashboards and recurring reports that stakeholders use to run their area.',
      'Clean, validate and reconcile data, documenting assumptions and known quality issues.',
      'Define metrics consistently and check that different reports agree with each other.',
      'Present findings to non-technical stakeholders with a clear recommendation, not just a chart.',
      'Support experiments and A/B tests through sample sizing, analysis and interpretation.',
      'Automate manual reporting so analysis time goes to new questions.'
    ],
    skills: {
      core: [
        'SQL (joins, window functions, aggregation)',
        'Data cleaning and validation',
        'Exploratory analysis',
        'Metric definition',
        'Dashboard design',
        'Statistical literacy (distributions, significance, confidence)',
        'Data storytelling',
        'Spreadsheet modelling'
      ],
      tools: ['SQL', 'Python (pandas)', 'R', 'Excel / Google Sheets', 'Tableau', 'Power BI', 'Looker', 'dbt', 'BigQuery', 'Snowflake', 'Git'],
      soft: ['Question framing', 'Stakeholder expectation management', 'Scepticism about data quality', 'Plain-language explanation', 'Prioritisation']
    },
    qualifications: [
      'A quantitative degree is common but not required; demonstrable projects with real datasets often carry more weight than the subject studied.',
      'Evidence of SQL fluency in a working context, not only a course certificate.',
      'At least one dashboard or report you built that someone else used regularly — describe the audience and the decision it supported.',
      'Statistics literacy sufficient to avoid misreading significance, seasonality and small samples.',
      'Domain knowledge relevant to the employer: finance, marketing, operations or product analytics.'
    ],
    experience: [
      { level: 'Junior (0–2 years)', expectation: 'Writes reliable SQL, maintains reports, answers defined questions, and documents work so it can be checked.' },
      { level: 'Mid (2–5 years)', expectation: 'Owns a metric area or dashboard suite, runs analyses end to end, and influences decisions with findings.' },
      { level: 'Senior / Lead', expectation: 'Sets measurement standards, designs experiments, mentors analysts, and governs data definitions across teams.' }
    ],
    resumeTips: [
      { title: 'Lead with the decision', detail: '“Reframed churn reporting around cohort retention, which changed how the retention team prioritised outreach” shows judgement; “built dashboards” does not.' },
      { title: 'Be specific about SQL depth', detail: 'Window functions, CTEs, query performance tuning and data modelling distinguish an analyst from a report builder.' },
      { title: 'Quantify scope carefully', detail: 'Table counts, rows processed, report audiences and time saved are safe and checkable. Avoid inventing revenue impact you cannot attribute.' },
      { title: 'Show data-quality work', detail: 'Reconciliation, validation rules and documentation are what separate a trusted analyst from a fast one.' },
      { title: 'List the stack once', detail: 'One compact Tools line covering warehouse, BI tool and scripting language keeps the rest of the page for evidence.' }
    ],
    keywords: [
      'data analyst',
      'sql',
      'tableau',
      'power bi',
      'dashboard',
      'data visualization',
      'python',
      'excel',
      'a/b testing',
      'data cleaning',
      'reporting',
      'stakeholder management'
    ],
    categoryId: 'data-analysis',
    faqs: [
      { q: 'Do I need a portfolio as a data analyst?', a: 'It helps most when your paid work is not obviously analytical. Two projects with real, messy data — including how you cleaned it and what you concluded — are far more persuasive than certificates alone.' },
      { q: 'How much statistics do I need on the resume?', a: 'Enough to support the claims you make. If you ran experiments, say so and name the method. If you did not, do not use statistics vocabulary as decoration — it is the first thing an interviewer probes.' },
      { q: 'Is Excel still worth listing?', a: 'Yes. Many analyst roles still run on spreadsheets for ad-hoc work, and finance or operations teams will ask about it directly.' },
      { q: 'How do I show impact without access to revenue figures?', a: 'Describe the change in behaviour: a report that replaced a manual process, a metric that was redefined, a decision that was reversed. That is verifiable and still demonstrates influence.' }
    ],
    related: ['software-engineer', 'project-manager', 'marketing-manager']
  },
  {
    slug: 'project-manager',
    roleName: 'Project Manager',
    h1: 'Project Manager Resume Example & Writing Guide',
    metaTitle: 'Project Manager Resume Example, Skills & ATS Keywords | GlobeCareer',
    metaDescription:
      'Project manager resume example with delivery responsibilities, methodology and stakeholder skills, plus how to quantify scope, budget and schedule outcomes.',
    alsoCalled: ['Delivery Manager', 'Programme Manager', 'Project Lead', 'PM'],
    intro: [
      'Project management resumes are screened for scope: how large was the team, how much money was involved, how many dependencies, and what happened to the date when reality intervened. Titles vary wildly between organisations, so the numbers do the work of explaining your seniority.',
      'The guidance below covers the responsibilities employers expect, the methodologies they name in adverts, and how to describe delivery honestly — including projects that slipped.'
    ],
    responsibilities: [
      'Define scope, milestones, deliverables and acceptance criteria with the sponsor and workstream leads.',
      'Build and maintain the delivery plan, tracking dependencies, risks and critical path.',
      'Run ceremonies and reporting: status updates, steering meetings, risk reviews and change control.',
      'Manage budget, forecasts and vendor or contractor purchase orders.',
      'Coordinate cross-functional teams and remove blockers before they become delays.',
      'Manage stakeholder expectations through explicit trade-off conversations about scope, time and cost.',
      'Run closure activities: handover, documentation, lessons learned and benefits tracking.'
    ],
    skills: {
      core: [
        'Scope and change control',
        'Schedule and critical-path management',
        'Risk and issue management',
        'Budget tracking and forecasting',
        'Stakeholder communication',
        'Vendor management',
        'Agile and waterfall delivery',
        'Benefits realisation'
      ],
      tools: ['Jira', 'Azure DevOps', 'Asana', 'Monday.com', 'MS Project', 'Smartsheet', 'Confluence', 'Miro', 'Power BI'],
      soft: ['Negotiation', 'Decision facilitation', 'Written status clarity', 'Conflict resolution', 'Comfort with ambiguity']
    },
    qualifications: [
      'A recognised certification helps where adverts name one: PRINCE2, PMP, AgilePM, Scrum Master or SAFe.',
      'Evidence of end-to-end delivery — from business case through to handover — rather than coordination only.',
      'Budget and headcount scale you have actually managed, stated numerically.',
      'Methodology experience matching the employer: predictive, agile or hybrid.',
      'Sector familiarity, because regulatory and procurement constraints differ sharply between industries.'
    ],
    experience: [
      { level: 'Coordinator / Junior PM (0–3 years)', expectation: 'Runs plans, reporting and meeting cadence for a workstream inside a larger programme.' },
      { level: 'Project Manager (3–7 years)', expectation: 'Owns delivery of a project with a budget, a cross-functional team and external dependencies.' },
      { level: 'Senior PM / Programme Manager', expectation: 'Runs multiple projects or a portfolio, owns governance, and manages senior stakeholders and vendors.' }
    ],
    resumeTips: [
      { title: 'Quantify four things', detail: 'Team size, budget, duration and outcome. Those four numbers communicate seniority faster than any adjective.' },
      { title: 'Separate delivery from coordination', detail: 'If you owned the plan, the budget and the trade-offs, say so. If you supported reporting, describe that accurately — overstating ownership is caught in the first interview.' },
      { title: 'Describe how you recovered a project', detail: 'A re-plan, a scope trade-off or an escalated dependency you resolved demonstrates the actual skill being hired.' },
      { title: 'Name the methodology with context', detail: '“Ran two-week sprints for a 14-person team while maintaining a stage-gated governance plan” is more credible than listing certifications alone.' },
      { title: 'Include the handover', detail: 'Closure, documentation and benefits tracking show you finish projects rather than abandoning them at go-live.' }
    ],
    keywords: [
      'project manager',
      'project management',
      'stakeholder management',
      'risk management',
      'budget management',
      'agile',
      'scrum',
      'prince2',
      'pmp',
      'milestones',
      'change control',
      'delivery'
    ],
    categoryId: 'management',
    faqs: [
      { q: 'Which certification should I put first?', a: 'Whichever the advert names. PRINCE2 is common in UK and public-sector hiring, PMP in larger international organisations, and Scrum Master or SAFe where agile delivery is central. Put the credential and its status on one line, not in the summary.' },
      { q: 'How do I move into project management from another role?', a: 'Show delivery evidence from your current job: a migration you coordinated, a vendor you managed, a schedule you owned. Then add the certification the market expects so the reader does not have to guess whether you know the vocabulary.' },
      { q: 'Should I include failed or delayed projects?', a: 'Not as failures, but do not claim flawless delivery either — interviewers ask. Describe the re-plan, what you changed and what the project delivered in the end.' },
      { q: 'What is the difference between project and programme manager?', a: 'A project manager owns one delivery with a defined outcome. A programme manager owns a group of related projects plus the governance, benefits and interdependencies between them. Use the title your employer used, then explain scope in the numbers.' }
    ],
    related: ['software-engineer', 'data-analyst', 'marketing-manager']
  },
  {
    slug: 'marketing-manager',
    roleName: 'Marketing Manager',
    h1: 'Marketing Manager Resume Example & Writing Guide',
    metaTitle: 'Marketing Manager Resume Example, Skills & ATS Keywords | GlobeCareer',
    metaDescription:
      'Marketing manager resume example with campaign, channel and budget responsibilities, the metrics hiring teams look for, and the tools they screen for by name.',
    alsoCalled: ['Digital Marketing Manager', 'Growth Manager', 'Brand Manager', 'Campaign Manager'],
    intro: [
      'Marketing resumes are read by people who will ask what the campaign cost and what it returned. Vague claims about “driving awareness” do not survive that conversation, so the resume needs channel, budget, audience and result in the same line.',
      'Below are the responsibilities, tools and qualifications that marketing job descriptions actually screen for, and how to describe performance without cherry-picking numbers.'
    ],
    responsibilities: [
      'Own campaign strategy and execution across the channels in scope — paid, organic, email, social, content or partnerships.',
      'Manage the marketing budget, track spend against plan and reallocate to what performs.',
      'Plan and brief creative work, then review assets against brand and channel requirements.',
      'Run email and lifecycle programmes: segmentation, sequencing, deliverability and list hygiene.',
      'Coordinate SEO, content and paid search so they reinforce rather than compete.',
      'Report on channel performance with attribution caveats stated plainly.',
      'Brief and manage agencies, freelancers and internal contributors.'
    ],
    skills: {
      core: [
        'Campaign planning and execution',
        'Budget management',
        'Channel strategy (paid, organic, email, social)',
        'Audience segmentation',
        'Conversion optimisation',
        'Content and creative briefing',
        'Analytics and attribution literacy',
        'Agency and vendor management'
      ],
      tools: ['Google Ads', 'Meta Ads Manager', 'Google Analytics 4', 'HubSpot', 'Mailchimp / Klaviyo', 'SEMrush / Ahrefs', 'Looker Studio', 'Hootsuite', 'Figma'],
      soft: ['Commercial judgement', 'Cross-team influence', 'Copy judgement', 'Prioritisation under budget limits', 'Clear reporting']
    },
    qualifications: [
      'A marketing, business or communications degree is common; channel certifications and evidence of delivered campaigns matter more at interview.',
      'Demonstrated ownership of a budget and a channel, with the numbers to describe both.',
      'Platform certifications where adverts list them — Google Ads, GA4, Meta Blueprint.',
      'Evidence of working with creative and content teams rather than executing alone.',
      'Sector context: B2B, B2C, e-commerce, SaaS and regulated industries screen very differently.'
    ],
    experience: [
      { level: 'Executive / Coordinator (0–2 years)', expectation: 'Runs defined channel tasks, builds campaigns to brief, and reports results accurately.' },
      { level: 'Manager (2–6 years)', expectation: 'Owns a channel or campaign portfolio with a budget, plus agency and stakeholder management.' },
      { level: 'Senior / Head of Marketing', expectation: 'Owns the marketing plan and total budget, sets positioning, and is accountable for pipeline or revenue contribution.' }
    ],
    resumeTips: [
      { title: 'One line, one campaign', detail: 'Channel, audience, budget and outcome in the same sentence. For example a paid-social programme with a stated spend and a cost-per-acquisition change.' },
      { title: 'Be honest about attribution', detail: 'If results came from a team effort or a blended channel, say so. Marketing interviews test whether you understand attribution, and overclaiming is easy to spot.' },
      { title: 'Name the platforms', detail: 'Google Ads, Meta, GA4, HubSpot and Klaviyo are screened literally by ATS filters and by recruiters scanning for stack fit.' },
      { title: 'Show the creative side too', detail: 'Briefing and reviewing creative is a real skill; a line about a brand refresh or a content programme rounds out a purely performance-led resume.' },
      { title: 'Keep the summary commercial', detail: 'State the channels you own and the type of growth you deliver. Save the descriptive adjectives for the cover letter.' }
    ],
    keywords: [
      'marketing manager',
      'digital marketing',
      'campaign management',
      'google ads',
      'meta ads',
      'google analytics',
      'email marketing',
      'seo',
      'content marketing',
      'conversion rate',
      'budget management',
      'hubspot'
    ],
    categoryId: 'digital-marketing',
    faqs: [
      { q: 'How do I show marketing results without confidential data?', a: 'Use relative and structural figures: percentage change in a metric you owned, budget size, audience size, number of campaigns, or the process you replaced. Avoid attributing revenue you cannot evidence.' },
      { q: 'Is a generalist or specialist resume stronger?', a: 'Specialist for larger teams that hire for one channel; generalist for smaller companies where one person owns the mix. Match the advert, and describe breadth as a deliberate choice rather than a lack of focus.' },
      { q: 'Should I include freelance or agency work?', a: 'Yes, grouped under one heading with client types and outcomes. Agency experience in particular signals pace and multi-client management.' },
      { q: 'Which metrics belong on the page?', a: 'The ones your role controlled: spend, cost per acquisition, conversion rate, list growth, organic sessions, engagement. Pick two or three per role rather than listing every number you have.' }
    ],
    related: ['sales-representative', 'data-analyst', 'project-manager']
  },
  {
    slug: 'sales-representative',
    roleName: 'Sales Representative',
    h1: 'Sales Representative Resume Example & Writing Guide',
    metaTitle: 'Sales Representative Resume Example, Skills & ATS Keywords | GlobeCareer',
    metaDescription:
      'Sales representative resume example with quota, pipeline and account responsibilities, plus how to present targets, territory and CRM experience credibly.',
    alsoCalled: ['Account Executive', 'Business Development Representative', 'Sales Executive', 'Territory Manager'],
    intro: [
      'Sales hiring is unusually measurable: managers want to know your quota, your attainment against it, the length of your sales cycle and the size of the deals you close. A resume without those numbers reads as junior or evasive, whichever is further from the truth.',
      'This guide covers the responsibilities and skills that sales adverts screen for, and how to present performance when your quota, territory or product changed mid-year.'
    ],
    responsibilities: [
      'Build and work a pipeline through prospecting, qualification, discovery and closing.',
      'Manage a defined territory, account list or inbound lead flow against a quota.',
      'Run discovery calls and product demonstrations tailored to the buyer’s situation.',
      'Prepare proposals, pricing and commercial terms within the approved framework.',
      'Negotiate and close, then hand over cleanly to onboarding or delivery.',
      'Maintain CRM records, forecasts and activity reporting accurately.',
      'Coordinate with marketing, technical specialists and customer success on larger deals.'
    ],
    skills: {
      core: [
        'Prospecting and lead qualification',
        'Discovery questioning',
        'Demo and presentation delivery',
        'Objection handling',
        'Negotiation and closing',
        'Pipeline and forecast management',
        'Territory planning',
        'Account planning'
      ],
      tools: ['Salesforce', 'HubSpot CRM', 'Pipedrive', 'Outreach', 'Salesloft', 'LinkedIn Sales Navigator', 'ZoomInfo', 'Gong'],
      soft: ['Resilience after rejection', 'Listening over pitching', 'Commercial judgement', 'Follow-through discipline', 'Cross-team coordination']
    },
    qualifications: [
      'A degree is common for B2B technology sales but not required where there is a record of quota attainment.',
      'Verifiable attainment history — quota, actual, and the period it covers.',
      'CRM fluency, named explicitly; most sales operations teams screen for the specific platform.',
      'Product or sector knowledge matching the employer’s buyer.',
      'Driving licence or travel willingness where the territory requires it.'
    ],
    experience: [
      { level: 'SDR / Junior (0–2 years)', expectation: 'Outbound or inbound qualification volume, meetings booked, and conversion from lead to opportunity.' },
      { level: 'Account Executive (2–5 years)', expectation: 'Owned quota, average deal size, cycle length and attainment across several periods.' },
      { level: 'Senior / Key accounts', expectation: 'Larger or strategic accounts, multi-stakeholder deals, team selling and forecasting responsibility.' }
    ],
    resumeTips: [
      { title: 'Put attainment in the first bullet', detail: 'Quota, actual, period and rank if relevant. Sales managers scan for this before anything else on the page.' },
      { title: 'Explain a missed year', detail: 'If you missed quota because of a territory change or a product sunset, state the context briefly. Silence invites the worst assumption.' },
      { title: 'Describe deal shape', detail: 'Average deal size, sales cycle length and buyer persona tell a manager whether your experience maps onto their motion.' },
      { title: 'Name the CRM and the stack', detail: 'CRM, sequencing tool and conversation-intelligence platform are screened literally, and they signal process discipline.' },
      { title: 'Show pipeline creation, not only closing', detail: 'Self-sourced pipeline share is one of the strongest signals for mid-market and enterprise roles.' }
    ],
    keywords: [
      'sales representative',
      'account executive',
      'quota attainment',
      'pipeline management',
      'prospecting',
      'salesforce',
      'crm',
      'negotiation',
      'b2b sales',
      'forecasting',
      'lead generation',
      'account management'
    ],
    categoryId: 'sales',
    faqs: [
      { q: 'How do I state quota attainment?', a: 'Give the target, the result and the period: a percentage plus the currency or unit makes it checkable. Add your rank or team percentile only if it is genuinely comparable.' },
      { q: 'What if my numbers are confidential?', a: 'Use percentages and relative figures rather than absolute contract values, and give deal size bands rather than exact amounts. Most employers accept this and will ask for detail at interview.' },
      { q: 'Should I include non-sales jobs?', a: 'Include them briefly when they explain a career change or demonstrate customer-facing skill, but keep the sales roles dominant. A resume that reads as half retail and half sales is harder to screen.' },
      { q: 'Which CRM should I list if I have used several?', a: 'List them all in one compact line, with the primary one first. Sales operations teams search for their own platform and will not infer equivalence between Salesforce and HubSpot.' }
    ],
    related: ['marketing-manager', 'customer-service', 'project-manager']
  }
];

export const ROLE_EXAMPLE_SLUGS = ROLE_EXAMPLES.map((r) => r.slug);

export function getRoleExample(slug: string): RoleExample | undefined {
  return ROLE_EXAMPLES.find((r) => r.slug === slug);
}

export function getRoleExamplePath(slug: string): string {
  return `/resume-examples/${slug}`;
}
