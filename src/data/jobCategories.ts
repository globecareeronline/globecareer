export interface JobCategoryConfig {
  id: string;
  name: string;
  description: string;
  suggestedSkills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  recommendedSections: string[];
  sampleBulletPoints: string[];
  sampleSummary: string;
  keywords: string[];
}

export const JOB_CATEGORIES: JobCategoryConfig[] = [
  {
    id: 'it-software',
    name: 'IT and Software Development',
    description: 'Backend, systems architecture, distributed microservices, cloud engineering, and DevOps.',
    suggestedSkills: {
      technical: ['Distributed Systems', 'Microservices', 'RESTful APIs', 'gRPC', 'Database Design', 'System Architecture', 'CI/CD Pipelines'],
      soft: ['Agile Mentorship', 'Cross-functional Collaboration', 'Code Review Leadership', 'Incident Response'],
      tools: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'PostgreSQL', 'Redis', 'Terraform', 'Git', 'Kafka']
    },
    recommendedSections: ['summary', 'skills', 'experience', 'projects', 'certifications', 'education'],
    sampleBulletPoints: [
      'Architected and deployed high-throughput event-driven microservices handling 24,000 requests/sec with 99.98% uptime on Kubernetes.',
      'Reduced database query latency by 42% through query optimization, connection pooling, and multi-region Redis cache clustering.',
      'Led migration of monolithic backend to containerized cloud architecture, cutting annual infrastructure expenditures by $160,000.',
      'Implemented automated automated CI/CD pipelines with GitHub Actions, reducing release cycle time from bi-weekly to daily.'
    ],
    sampleSummary: 'Senior Software Engineer with 7+ years of experience designing scalable distributed backend systems and cloud-native microservices. Proven track record leading engineering squads, reducing infrastructure costs, and maintaining 99.99% availability.',
    keywords: ['microservices', 'kubernetes', 'docker', 'ci/cd', 'aws', 'rest api', 'distributed systems', 'scalability', 'postgresql', 'latency']
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Frontend, full-stack, responsive web applications, modern JavaScript/TypeScript frameworks, and accessible UI/UX.',
    suggestedSkills: {
      technical: ['TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js', 'GraphQL', 'Tailwind CSS', 'State Management', 'Web Accessibility (WCAG 2.1)'],
      soft: ['Design Systems Advocacy', 'Iterative Prototyping', 'User Empathy', 'Asynchronous Communication'],
      tools: ['Vite', 'Webpack', 'Jest', 'Playwright', 'Figma', 'Storybook', 'Postman']
    },
    recommendedSections: ['summary', 'skills', 'experience', 'projects', 'education'],
    sampleBulletPoints: [
      'Engineered responsive web client in TypeScript and React serving 450,000 monthly active users with sub-1.2s Core Web Vitals.',
      'Spearheaded accessible design system adoption across 14 product squads, increasing UI development velocity by 35%.',
      'Integrated real-time WebSocket notifications and optimistic UI updates, cutting user perceived latency by 60%.'
    ],
    sampleSummary: 'Full-Stack Web Developer specialized in modern TypeScript, React, and modular architecture. Passionate about performant user experiences, accessible design systems, and resilient frontend pipelines.',
    keywords: ['typescript', 'react', 'next.js', 'frontend', 'full-stack', 'wcag', 'performance', 'tailwind css', 'ui/ux', 'core web vitals']
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    description: 'Brand identity, marketing collateral, typography, digital media, packaging, and visual systems.',
    suggestedSkills: {
      technical: ['Brand Identity Design', 'Typography Hierarchy', 'Packaging Design', 'Motion Graphics', 'Print Production', 'Color Theory'],
      soft: ['Client Presentation', 'Art Direction', 'Creative Problem Solving', 'Creative Brief Translation'],
      tools: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'After Effects', 'Figma', 'Blender']
    },
    recommendedSections: ['summary', 'skills', 'projects', 'experience', 'education', 'awards'],
    sampleBulletPoints: [
      'Directed comprehensive brand redesign for multi-channel fintech company, resulting in a 28% increase in brand recognition.',
      'Created 120+ cohesive marketing assets across digital and print that generated a 4.2x ROAS in regional advertising campaigns.',
      'Authored 60-page global brand guideline specification adopted across 6 international office locations.'
    ],
    sampleSummary: 'Award-winning Graphic Designer & Art Director with 6+ years transforming brand narratives into compelling visual identities across print, packaging, and digital media.',
    keywords: ['branding', 'typography', 'illustrator', 'photoshop', 'art direction', 'packaging', 'visual identity', 'indesign', 'print design']
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    description: 'Performance marketing, SEO, SEM, content strategy, email marketing automation, and social media growth.',
    suggestedSkills: {
      technical: ['Search Engine Optimization (SEO)', 'Google Ads (PPC)', 'Meta Ads Manager', 'Conversion Rate Optimization (CRO)', 'Marketing Automation', 'A/B Testing'],
      soft: ['Analytical Mindset', 'Strategic Storytelling', 'Budget Management', 'Stakeholder Communication'],
      tools: ['Google Analytics 4', 'Google Tag Manager', 'SEMrush', 'HubSpot', 'Klaviyo', 'Looker Studio']
    },
    recommendedSections: ['summary', 'skills', 'experience', 'certifications', 'education'],
    sampleBulletPoints: [
      'Scaled monthly organic search traffic by 185% over 12 months through technical SEO audits, site architecture restructuring, and content clusters.',
      'Managed $1.2M annual paid search and social budget with a blended ROAS of 380%, driving $4.56M in attributed revenue.',
      'Architected automated email lifecycle workflows that lifted customer retention rate by 22% and reduced churn by 14%.'
    ],
    sampleSummary: 'Data-driven Digital Marketing Specialist with 5+ years driving multi-channel customer acquisition and revenue growth. Expert in organic SEO scalability, paid media optimization, and automated conversion funnels.',
    keywords: ['seo', 'sem', 'ppc', 'google ads', 'meta ads', 'cro', 'roas', 'hubspot', 'conversion rate', 'growth marketing']
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Business intelligence, exploratory data analysis, statistical modeling, ETL pipelines, and interactive dashboards.',
    suggestedSkills: {
      technical: ['SQL (Advanced)', 'Python (Pandas, NumPy)', 'R', 'Statistical Analysis', 'A/B Test Evaluation', 'Predictive Modeling', 'ETL Processes'],
      soft: ['Executive Data Storytelling', 'Business Acumen', 'Cross-functional Alignment', 'Root Cause Investigation'],
      tools: ['Tableau', 'Power BI', 'Snowflake', 'BigQuery', 'dbt', 'Jupyter', 'Excel (Power Query)']
    },
    recommendedSections: ['summary', 'skills', 'experience', 'projects', 'education', 'certifications'],
    sampleBulletPoints: [
      'Built automated executive Power BI and Tableau dashboards tracking 45 operational KPIs across 8 regional business divisions.',
      'Designed SQL and Python predictive models that identified 3 key consumer churn indicators, preserving $850,000 in recurring revenue.',
      'Partnered with product managers to formulate and analyze 30+ A/B experiments, improving onboarding checkout conversion by 18%.'
    ],
    sampleSummary: 'Business Intelligence & Data Analyst with 5+ years experience turning complex enterprise datasets into actionable strategic roadmaps. Adept in advanced SQL modeling, Python analytics, and interactive dashboard engineering.',
    keywords: ['sql', 'python', 'tableau', 'power bi', 'bigquery', 'snowflake', 'a/b testing', 'business intelligence', 'dashboards', 'statistics']
  },
  {
    id: 'engineering',
    name: 'Engineering',
    description: 'Mechanical, electrical, civil, industrial, and robotics engineering.',
    suggestedSkills: {
      technical: ['CAD Modeling', 'Finite Element Analysis (FEA)', 'Design for Manufacturing (DFM)', 'PLC Programming', 'Thermodynamics', 'Geometric Dimensioning & Tolerancing (GD&T)'],
      soft: ['Cross-disciplinary Project Management', 'Root Cause Failure Analysis', 'Safety Compliance Auditing'],
      tools: ['SolidWorks', 'AutoCAD', 'MATLAB', 'ANSYS', 'CATIA', 'Siemens NX']
    },
    recommendedSections: ['summary', 'skills', 'experience', 'education', 'certifications', 'projects'],
    sampleBulletPoints: [
      'Engineered structural mechanical assemblies in SolidWorks and ANSYS, reducing prototype material costs by 19% while meeting ISO 9001 standards.',
      'Supervised commissioning of $3.4M automated assembly line, delivering project 3 weeks ahead of schedule and under budget.',
      'Conducted root-cause failure analysis (RCFA) across 200+ electro-mechanical test units, decreasing field warranty defects by 31%.'
    ],
    sampleSummary: 'Licensed Professional Engineer (PE) with 8+ years leading mechanical and industrial design from initial concept modeling through fabrication and quality certification.',
    keywords: ['cad', 'solidworks', 'ansys', 'fea', 'dfm', 'manufacturing', 'autocad', 'iso 9001', 'mechanical engineering', 'quality control']
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Nursing, clinical care, healthcare administration, pharmacy, and patient management.',
    suggestedSkills: {
      technical: ['Patient Assessment & Triage', 'Electronic Health Records (EHR)', 'Medication Administration', 'ICU / Acute Care Protocols', 'HIPAA Compliance', 'Infection Control'],
      soft: ['Compassionate Care', 'Crisis De-escalation', 'Interdisciplinary Teamwork', 'Patient Advocacy'],
      tools: ['Epic Systems', 'Cerner', 'Meditech', 'BLS / ACLS Certified', 'IV Pumps']
    },
    recommendedSections: ['summary', 'certifications', 'experience', 'education', 'skills'],
    sampleBulletPoints: [
      'Delivered critical care nursing to 12-bed intensive care unit patients, adhering rigorously to Joint Commission safety protocols.',
      'Streamlined patient discharge documentation workflow in Epic Systems, reducing readmission rates by 12% across 600+ cases.',
      'Trained 25 incoming staff nurses on electronic medication reconciliation and sterile barrier protocol standards.'
    ],
    sampleSummary: 'Dedicated Registered Nurse (RN) with 6+ years delivering high-acuity patient care in acute medical-surgical and intensive care environments. Certified in BLS, ACLS, and proficient with Epic EHR.',
    keywords: ['patient care', 'epic', 'ehr', 'nursing', 'clinical', 'hipaa', 'acls', 'bls', 'acute care', 'triage']
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Teaching, curriculum design, academic administration, instructional technology, and corporate training.',
    suggestedSkills: {
      technical: ['Curriculum Development', 'Differentiated Instruction', 'Learning Management Systems (LMS)', 'Student Assessment', 'Classroom Technology Integration'],
      soft: ['Parent-Teacher Collaboration', 'Culturally Responsive Pedagogy', 'Conflict Resolution', 'Student Mentorship'],
      tools: ['Canvas LMS', 'Google Classroom', 'Blackboard', 'Nearpod', 'PowerSchool']
    },
    recommendedSections: ['summary', 'education', 'experience', 'certifications', 'skills', 'awards'],
    sampleBulletPoints: [
      'Designed and facilitated inquiry-based STEM curriculum for 140+ secondary students, boosting standardized test pass rates by 24%.',
      'Administered Canvas LMS integration for hybrid learning environment, achieving 98% on-time assignment submission rate.',
      'Chaired departmental academic review committee, revising cross-grade course benchmarks to align with state standards.'
    ],
    sampleSummary: 'Certified Educator with 7+ years delivering student-centered curricula and integrating instructional technology. Proven success accelerating academic achievement and fostering inclusive learning cultures.',
    keywords: ['curriculum development', 'pedagogy', 'lms', 'instruction', 'classroom management', 'assessment', 'stem', 'canvas']
  },
  {
    id: 'finance-accounting',
    name: 'Finance and Accounting',
    description: 'Financial analysis, audit, CPA accounting, treasury, corporate budgeting, and tax compliance.',
    suggestedSkills: {
      technical: ['GAAP & IFRS Compliance', 'Financial Modeling (DCF, LBO)', 'General Ledger Reconciliation', 'Budget Forecasting', 'Variance Analysis', 'Tax Provision Preparation'],
      soft: ['Audit Defense', 'Executive Presentation', 'Ethical Governance', 'Attention to Detail'],
      tools: ['Excel (Advanced VBA)', 'SAP ERP', 'NetSuite', 'QuickBooks Enterprise', 'Hyperion', 'Bloomberg Terminal']
    },
    recommendedSections: ['summary', 'certifications', 'experience', 'education', 'skills'],
    sampleBulletPoints: [
      'Managed month-end closing, financial reporting, and general ledger reconciliation for $85M division in SAP ERP.',
      'Developed rolling 3-year DCF financial forecasting models used by the board of directors to evaluate $12M capital acquisition.',
      'Coordinated external Big Four audit preparations, closing all PBC requests 5 days ahead of schedule with zero material deficiencies.'
    ],
    sampleSummary: 'Chartered Accountant / Financial Analyst with 7+ years managing financial reporting, GAAP compliance, and corporate forecasting. Proven track record optimizing cash flow and strengthening internal controls.',
    keywords: ['gaap', 'ifrs', 'financial modeling', 'general ledger', 'reconciliation', 'budgeting', 'sap', 'netsuite', 'audit', 'tax']
  },
  {
    id: 'administration',
    name: 'Administration',
    description: 'Executive assistance, office management, operations support, vendor coordination, and document governance.',
    suggestedSkills: {
      technical: ['Calendar & Travel Management', 'Records Governance', 'Budget Tracking', 'Event Coordination', 'Executive Correspondence', 'Workflow Automation'],
      soft: ['Discretion & Confidentiality', 'Multitasking Under Pressure', 'Interpersonal Diplomacy', 'Proactive Organization'],
      tools: ['Microsoft 365', 'Google Workspace', 'Slack', 'Asana', 'DocuSign', 'Concur', 'Zoom']
    },
    recommendedSections: ['summary', 'skills', 'experience', 'education', 'certifications'],
    sampleBulletPoints: [
      'Supported 3 C-Suite executives across complex calendar schedules, domestic/international itineraries, and board meetings.',
      'Negotiated corporate vendor contracts for office supplies and IT facilities, reducing annual operating overhead by $34,000.',
      'Designed digital filing system in SharePoint, accelerating inter-departmental document retrieval time by 50%.'
    ],
    sampleSummary: 'Executive Assistant & Office Manager with 8+ years supporting senior executives in fast-paced corporate settings. Highly organized with mastery in calendar coordination, travel logistics, and vendor negotiations.',
    keywords: ['calendar management', 'travel coordination', 'executive support', 'office management', 'confidentiality', 'sharepoint', 'logistics']
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'B2B enterprise sales, account management, pipeline generation, contract negotiation, and customer acquisition.',
    suggestedSkills: {
      technical: ['B2B Enterprise Sales', 'Pipeline Forecasting', 'Contract Negotiation', 'Lead Qualification (MEDDIC)', 'Cold Outreach', 'Client Retention'],
      soft: ['Relationship Building', 'High-Stakes Pitching', 'Resilience', 'Active Listening'],
      tools: ['Salesforce CRM', 'HubSpot', 'LinkedIn Sales Navigator', 'Gong.io', 'Outreach.io', 'ZoomInfo']
    },
    recommendedSections: ['summary', 'experience', 'skills', 'education', 'awards'],
    sampleBulletPoints: [
      'Exceeded annual quota by 142% ($2.8M closed ARR), finishing as #1 Account Executive across North America sales team.',
      'Sourced and closed 18 enterprise logos using MEDDIC qualification methodology with an average deal size of $120,000.',
      'Shortened sales cycle from 90 days to 62 days by instituting structured discovery calls and stakeholder champion mapping.'
    ],
    sampleSummary: 'Enterprise Account Executive with 6+ years driving consultative B2B software sales. Consistent top 5% producer with proven capability navigating complex procurement cycles and closing 7-figure agreements.',
    keywords: ['salesforce', 'pipeline', 'b2b sales', 'quota', 'arr', 'closing', 'meddic', 'negotiation', 'lead generation']
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    description: 'Customer support, omnichannel resolution, customer success, ticketing systems, and client satisfaction.',
    suggestedSkills: {
      technical: ['Helpdesk Management', 'SLA Adherence', 'Omnichannel Communication', 'Billing Resolution', 'Root Cause Escalation', 'CSAT/NPS Tracking'],
      soft: ['Conflict De-escalation', 'Empathetic Communication', 'Patience', 'Active Listening'],
      tools: ['Zendesk', 'Intercom', 'Freshdesk', 'Salesforce Service Cloud', 'Jira Service Management']
    },
    recommendedSections: ['summary', 'skills', 'experience', 'education', 'languages'],
    sampleBulletPoints: [
      'Resolved 65+ inbound tickets daily via chat, email, and phone while maintaining a 97.8% positive CSAT satisfaction rating.',
      'Decreased average first-response time from 42 minutes to 11 minutes by co-authoring 80 internal and customer-facing FAQ articles.',
      'De-escalated critical enterprise client concerns, preventing contract cancellation for 4 high-value accounts.'
    ],
    sampleSummary: 'Customer Support Specialist with 4+ years delivering empathetic, rapid-response resolutions across omni-channel helpdesk platforms. Consistently awarded top CSAT honors for customer retention.',
    keywords: ['zendesk', 'csat', 'customer satisfaction', 'helpdesk', 'sla', 'intercom', 'ticket resolution', 'support']
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    description: 'Hotel operations, front office, food & beverage management, guest relations, and event hosting.',
    suggestedSkills: {
      technical: ['Guest Relations Management', 'PMS Operations', 'Food Safety Standards (HACCP)', 'Inventory & Cost Control', 'Banqueting Coordination'],
      soft: ['Cultural Sensitivity', 'Crisis Calmness', 'Anticipatory Service', 'Team Leadership'],
      tools: ['Opera PMS', 'Micros POS', 'Toast', 'OpenTable', 'Marriott/Hilton Brand Standards']
    },
    recommendedSections: ['summary', 'experience', 'skills', 'languages', 'education', 'certifications'],
    sampleBulletPoints: [
      'Managed front desk operations and concierge service for 220-room luxury boutique hotel, driving TripAdvisor ranking into the top 5 in the city.',
      'Supervised banqueting operations for 40+ corporate conferences and gala dinners with up to 500 guests with zero service discrepancies.',
      'Trained 30 food & beverage staff members in upscale service standards, boosting average guest check spend by 16%.'
    ],
    sampleSummary: 'Hospitality Professional with 6+ years managing front-of-house and guest relations in 4- and 5-star international hotels. Dedicated to delivering bespoke customer experiences and maximizing RevPAR.',
    keywords: ['opera pms', 'hospitality', 'guest relations', 'front desk', 'food and beverage', 'haccp', 'banquet', 'customer experience']
  },
  {
    id: 'logistics',
    name: 'Logistics',
    description: 'Supply chain management, warehouse operations, freight forwarding, customs clearance, and route dispatch.',
    suggestedSkills: {
      technical: ['Warehouse Management Systems (WMS)', 'Freight Forwarding & Customs', 'Inventory Forecasting', 'Route Optimization', 'Fleet Management', 'DOT/OSHA Regulations'],
      soft: ['Vendor Relationship Management', 'High-Stress Prioritization', 'Contingency Planning'],
      tools: ['SAP SCM', 'Manhattan Associates WMS', 'Oracle Transportation', 'Excel (Advanced)', 'GPS Telematics']
    },
    recommendedSections: ['summary', 'skills', 'experience', 'certifications', 'education'],
    sampleBulletPoints: [
      'Coordinated dispatch and fulfillment operations across 180,000 sq ft regional distribution center, achieving 99.4% on-time delivery.',
      'Renegotiated LTL freight shipping contracts across 12 domestic carrier partners, saving $280,000 in annual transport fees.',
      'Reduced warehouse inventory shrinkage by 35% through barcode scanning validation and strict cycle counting protocols.'
    ],
    sampleSummary: 'Supply Chain & Logistics Specialist with 7+ years overseeing multi-site distribution, carrier management, and inventory optimization. Expert in lean warehouse operations and transportation routing.',
    keywords: ['supply chain', 'logistics', 'wms', 'freight', 'procurement', 'inventory management', 'route optimization', 'shipping']
  },
  {
    id: 'construction',
    name: 'Construction',
    description: 'Site management, civil contracting, general contracting, project estimation, and safety inspections.',
    suggestedSkills: {
      technical: ['Site Supervision', 'Blueprint & Schematics Reading', 'OSHA 30 Safety Protocols', 'Subcontractor Scheduling', 'Budget & Cost Estimation', 'Quality Assurance Inspections'],
      soft: ['Subcontractor Negotiation', 'Safety Leadership', 'Conflict Mediation', 'Deadline Enforcement'],
      tools: ['Procore', 'PlanGrid', 'Bluebeam Revu', 'Primavera P6', 'MS Project']
    },
    recommendedSections: ['summary', 'certifications', 'experience', 'skills', 'education'],
    sampleBulletPoints: [
      'Supervised site operations for $24M commercial mixed-use high-rise project, achieving zero OSHA lost-time incidents across 250,000 man-hours.',
      'Managed 14 specialized subcontractor trades, maintaining milestone deliverables within 2% variance of target master schedule.',
      'Reviewed submittals and RFIs in Procore and Bluebeam, resolving engineering discrepancies before field installation.'
    ],
    sampleSummary: 'Construction Project Manager / Superintendent with 10+ years directing commercial building projects from ground-breaking through closeout. Certified in OSHA 30 and proficient in Procore and Primavera P6.',
    keywords: ['construction', 'site supervision', 'osha', 'procore', 'bluebeam', 'estimating', 'subcontractors', 'project management']
  },
  {
    id: 'skilled-trades',
    name: 'Skilled Trades',
    description: 'Electricians, plumbers, HVAC technicians, carpenters, welders, and maintenance mechanics.',
    suggestedSkills: {
      technical: ['Diagnostic Troubleshooting', 'National Electrical / Plumbing Codes (NEC/UPC)', 'HVAC Refrigerant Handling (EPA 608)', 'Preventative Maintenance', 'Blueprint Schematics'],
      soft: ['Safety Compliance', 'Customer Communication', 'Field Problem Solving', 'Reliability'],
      tools: ['Digital Multimeter', 'Manifold Gauges', 'Power Tools', 'Fluke Diagnostics', 'Soldering & Welding']
    },
    recommendedSections: ['summary', 'certifications', 'skills', 'experience', 'education'],
    sampleBulletPoints: [
      'Performed troubleshooting, repair, and installation of residential and commercial 3-phase electrical systems adhering strictly to NEC codes.',
      'Diagnosed and serviced over 350 HVAC cooling and heating units with a 96% first-time fix rate.',
      'Maintained 100% safety record with zero accidents or OSHA non-compliance citations over 6 years of field service.'
    ],
    sampleSummary: 'Licensed Journeyman Electrician & HVAC Specialist with 8+ years hands-on experience installing, troubleshooting, and repairing commercial and residential systems. EPA 608 Universal and OSHA 10 certified.',
    keywords: ['trades', 'electrical', 'hvac', 'plumbing', 'troubleshooting', 'epa 608', 'journeyman', 'maintenance', 'nec']
  },
  {
    id: 'management',
    name: 'Management',
    description: 'Operations management, department directors, program management, cross-functional leadership, and organizational strategy.',
    suggestedSkills: {
      technical: ['P&L Management', 'Strategic Planning', 'Resource Allocation', 'Process Optimization (Lean / Six Sigma)', 'Change Management', 'KPI Dashboards'],
      soft: ['Executive Leadership', 'Talent Coaching', 'Board Reporting', 'Cross-functional Alignment'],
      tools: ['Jira / Confluence', 'Asana Enterprise', 'Tableau', 'Workday', 'SAP ERP']
    },
    recommendedSections: ['summary', 'experience', 'skills', 'education', 'certifications'],
    sampleBulletPoints: [
      'Spearheaded operational turnaround for 65-person business unit, reversing a 2-year margin decline into a $4.2M net profit expansion.',
      'Reduced department employee turnover from 24% to 8% through mentorship tracks, clear career roadmaps, and compensation benchmarking.',
      'Instituted Lean operational workflows across 4 facilities, eliminating $750,000 in redundant operational expenditure.'
    ],
    sampleSummary: 'Results-driven Operations Director with 10+ years directing cross-functional teams, managing $30M+ annual P&L budgets, and scaling operational efficiency in fast-growing enterprises.',
    keywords: ['p&l', 'leadership', 'strategy', 'operations', 'budget management', 'turnaround', 'kpis', 'change management']
  },
  {
    id: 'research',
    name: 'Research',
    description: 'Academic research, clinical trials, R&D scientist, laboratory methodology, and scientific publication.',
    suggestedSkills: {
      technical: ['Experimental Design', 'Grant Writing', 'Statistical Analysis (SPSS, R, Python)', 'Peer-reviewed Publishing', 'Spectroscopy & Chromatography', 'IRB / Ethics Compliance'],
      soft: ['Scientific Rigor', 'Symposium Presentation', 'Collaboration with Principal Investigators', 'Peer Review'],
      tools: ['RStudio', 'LaTeX', 'GraphPad Prism', 'MATLAB', 'PubMed / Web of Science']
    },
    recommendedSections: ['summary', 'publications', 'experience', 'education', 'skills', 'awards'],
    sampleBulletPoints: [
      'Published 6 peer-reviewed research papers in high-impact international journals with over 180 total scholarly citations.',
      'Co-authored competitive government research grant proposal securing $450,000 in funding for biomedical nanotechnology investigations.',
      'Analyzed high-throughput experimental datasets using R and Python, accelerating molecular target validation by 4 months.'
    ],
    sampleSummary: 'Postdoctoral Research Scientist with 6+ years designing controlled laboratory experiments, publishing peer-reviewed investigations, and managing federal grant budgets in molecular biology and biotechnology.',
    keywords: ['research', 'publications', 'experimental design', 'grant writing', 'data analysis', 'scientific', 'peer-reviewed', 'lab']
  },
  {
    id: 'other',
    name: 'Other / General Professional',
    description: 'General professional, career changers, non-profit, consulting, and multifaceted roles.',
    suggestedSkills: {
      technical: ['Project Coordination', 'Data Analysis', 'Process Documentation', 'Report Writing', 'Workflow Optimization'],
      soft: ['Critical Thinking', 'Adaptability', 'Clear Communication', 'Time Management'],
      tools: ['Microsoft Office', 'Google Workspace', 'Slack', 'Trello', 'Zoom']
    },
    recommendedSections: ['summary', 'skills', 'experience', 'education', 'certifications'],
    sampleBulletPoints: [
      'Coordinated cross-departmental operations and project deliverables, ensuring 100% on-time milestone delivery.',
      'Compiled analytical reports and executive briefings, uncovering operational bottlenecks and presenting recommendations.',
      'Streamlined internal workflow documentation, reducing new team member onboarding duration by 3 weeks.'
    ],
    sampleSummary: 'Versatile professional with strong problem-solving capabilities, cross-functional project coordination experience, and a proven ability to adapt rapidly to evolving business priorities.',
    keywords: ['project management', 'collaboration', 'operations', 'communication', 'problem solving', 'analysis']
  }
];

export function getJobCategoryById(id: string): JobCategoryConfig {
  const found = JOB_CATEGORIES.find(c => c.id === id);
  return found || JOB_CATEGORIES[0];
}
