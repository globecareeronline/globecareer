/**
 * GlobeCareer Resume Summary & Objective Templates Library
 * Real, selectable, highly distinct summaries, career objectives, and LinkedIn headlines
 * covering 16+ career paths and experience levels.
 */

export interface SummaryTemplate {
  id: string;
  title: string;
  type: 'summary' | 'objective' | 'headline';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'career_changer' | 'all';
  industryCategory: 'tech' | 'design' | 'marketing' | 'operations' | 'sales' | 'finance' | 'healthcare' | 'admin' | 'leadership' | 'freelance';
  badge: string;
  targetRole: string;
  summaryText: string;
  atsScore: string;
  primaryKeywords: string[];
  tacticalFocus: string;
}

export const SUMMARY_FILTER_TYPES = [
  { id: 'all', label: 'All Formats' },
  { id: 'summary', label: 'Professional Summaries' },
  { id: 'objective', label: 'Career Objectives' },
  { id: 'headline', label: 'LinkedIn Headlines' },
];

export const SUMMARY_FILTER_CATEGORIES = [
  { id: 'all', label: 'All Industries' },
  { id: 'tech', label: 'Software & Data' },
  { id: 'design', label: 'UI/UX & Creative' },
  { id: 'marketing', label: 'Marketing & SEO' },
  { id: 'operations', label: 'Project Management' },
  { id: 'sales', label: 'Sales & Support' },
  { id: 'finance', label: 'Finance & Accounting' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'admin', label: 'Administrative' },
  { id: 'leadership', label: 'Executive Leadership' },
  { id: 'freelance', label: 'Freelancers & Remote' },
];

export const SUMMARY_TEMPLATES: SummaryTemplate[] = [
  // 1. Software Engineering - Experienced Professional Summary
  {
    id: 'tech-software-eng-summary',
    title: 'Senior Software Engineer & Cloud Architect Summary',
    type: 'summary',
    experienceLevel: 'senior',
    industryCategory: 'tech',
    badge: 'Senior • Tech',
    targetRole: 'Senior Full Stack / Cloud Engineer',
    summaryText: 'Results-driven Senior Software Engineer with 8+ years of experience architecting distributed cloud backends, microservices, and high-concurrency APIs across AWS and GCP. Expert in TypeScript, Node.js, Go, and PostgreSQL. Demonstrated record of leading cross-functional squads to reduce infrastructure costs by 34% while maintaining 99.99% system availability. Passionate about automated CI/CD pipelines, code quality standards, and developer productivity tooling.',
    atsScore: '99/100',
    primaryKeywords: ['TypeScript', 'Go', 'Distributed Systems', 'PostgreSQL', 'AWS', 'Microservices', 'CI/CD'],
    tacticalFocus: 'Emphasizes technical stack depth, quantitative cloud cost optimization, and uptime reliability.'
  },

  // 2. Web Development - Mid-Level Full Stack Summary
  {
    id: 'tech-web-dev-summary',
    title: 'Mid-Level Full Stack Web Developer Summary',
    type: 'summary',
    experienceLevel: 'mid',
    industryCategory: 'tech',
    badge: 'Mid-Level • Web',
    targetRole: 'Full Stack Web Developer',
    summaryText: 'Versatile Full Stack Web Developer with 5 years of commercial experience engineering high-performance web applications with React, Next.js, TypeScript, and REST/GraphQL APIs. Proven ability to optimize Core Web Vitals, improve accessibility (WCAG 2.2), and deliver clean, maintainable modular code. Collaborated on redesigning a consumer-facing platform serving 650K active monthly users, increasing mobile page speed by 48%.',
    atsScore: '97/100',
    primaryKeywords: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Core Web Vitals', 'REST APIs'],
    tacticalFocus: 'Highlights modern JavaScript frameworks, web performance metrics, and user-scale impact.'
  },

  // 3. Computer Science Graduate - Entry-Level Objective
  {
    id: 'tech-graduate-objective',
    title: 'Computer Science Graduate Career Objective',
    type: 'objective',
    experienceLevel: 'entry',
    industryCategory: 'tech',
    badge: 'Entry-Level • Graduate',
    targetRole: 'Junior Software Engineer',
    summaryText: 'Detail-oriented Computer Science graduate (B.S. Honors) with strong foundational training in algorithms, object-oriented programming, and relational databases. Proficient in Python, Java, Git, and automated testing frameworks. Completed an open-source campus resource reservation platform utilized by 2,000+ peers. Seeking to contribute fast learning agility, clean coding habits, and proactive team collaboration as an Associate Software Engineer.',
    atsScore: '96/100',
    primaryKeywords: ['Python', 'Java', 'Git', 'Algorithms', 'SQL', 'Automated Testing', 'Junior Engineer'],
    tacticalFocus: 'Emphasizes university honors, open-source practical project evidence, and collaborative mindset.'
  },

  // 4. UI/UX & Graphic Design - Experienced Summary
  {
    id: 'design-product-uiux-summary',
    title: 'Senior Product & UI/UX Designer Summary',
    type: 'summary',
    experienceLevel: 'senior',
    industryCategory: 'design',
    badge: 'Senior • Design',
    targetRole: 'Lead Product Designer',
    summaryText: 'User-centered Lead Product Designer with 7+ years of experience turning complex business workflows into intuitive, accessible digital products across B2B SaaS and consumer mobile apps. Specialized in multi-brand design systems, Figma token architectures, and end-to-end qualitative user research. Directed a multi-product design unification project that reduced developer handoff friction by 40% and elevated user satisfaction scores (CSAT) to 94%.',
    atsScore: '98/100',
    primaryKeywords: ['Design Systems', 'Figma Tokens', 'UI/UX Design', 'User Research', 'Prototyping', 'Accessibility'],
    tacticalFocus: 'Combines design token systems with measurable business outcomes and cross-functional alignment.'
  },

  // 5. Graphic Design to UX Design - Career Change Objective
  {
    id: 'design-career-changer-objective',
    title: 'Visual Designer Transitioning to Product/UX Objective',
    type: 'objective',
    experienceLevel: 'career_changer',
    industryCategory: 'design',
    badge: 'Career Changer • Design',
    targetRole: 'Associate UX/UI Designer',
    summaryText: 'Accomplished Visual Designer offering 5 years of expertise in typography, brand hierarchy, and visual storytelling, transitioning into user experience (UX) and product design. Recently earned Google UX Design Professional Certification with hands-on capstones in wireframing, usability testing, and interactive prototyping. Eager to leverage strong visual problem-solving and stakeholder communication to design engaging, human-centric software experiences.',
    atsScore: '95/100',
    primaryKeywords: ['UX Design', 'Wireframing', 'Usability Testing', 'Figma', 'Visual Hierarchy', 'User Research'],
    tacticalFocus: 'Validates transferable visual skills, formal credentialing, and user-centric problem-solving.'
  },

  // 6. Digital Marketing & SEO - Experienced Summary
  {
    id: 'marketing-seo-growth-summary',
    title: 'Growth Marketing & Technical SEO Specialist Summary',
    type: 'summary',
    experienceLevel: 'senior',
    industryCategory: 'marketing',
    badge: 'Senior • Growth',
    targetRole: 'Growth Marketing Manager / SEO Lead',
    summaryText: 'Analytical Growth Marketing Specialist with 6+ years of experience executing programmatic SEO campaigns, conversion rate optimization (CRO), and content acquisition funnels. Master of Google Search Console, Ahrefs, SEMrush, and GA4 telemetry. Scaled organic search traffic from 200K to 1.8M monthly visits for an enterprise e-commerce platform, contributing $12M in attributable pipeline with a 24% reduction in blended CAC.',
    atsScore: '99/100',
    primaryKeywords: ['Technical SEO', 'Organic Growth', 'CRO', 'GA4', 'Content Strategy', 'Ahrefs', 'Customer Acquisition'],
    tacticalFocus: 'Quantifies organic traffic scale, CAC reduction, and multi-million dollar revenue attribution.'
  },

  // 7. Project Management & Agile - Senior Summary
  {
    id: 'operations-pm-summary',
    title: 'Senior Technical Project Manager & Scrum Master Summary',
    type: 'summary',
    experienceLevel: 'senior',
    industryCategory: 'operations',
    badge: 'Senior • Agile',
    targetRole: 'Senior Technical Program Manager',
    summaryText: 'PMP and CSM certified Senior Technical Project Manager with 9+ years of experience leading multi-squad software development initiatives across distributed time zones. Expert in agile sprint governance, risk mitigation, and executive roadmap delivery. Directed the delivery of a $4.2M cloud migration across 8 engineering teams, finishing 4 weeks ahead of schedule with zero business disruption and strict SOC2 compliance.',
    atsScore: '98/100',
    primaryKeywords: ['PMP', 'CSM', 'Agile Governance', 'Scrum', 'Risk Management', 'Stakeholder Alignment', 'JIRA'],
    tacticalFocus: 'Certifications first (PMP, CSM), schedule performance index, and cloud governance compliance.'
  },

  // 8. Data Analytics & Business Intelligence - Mid-Level Summary
  {
    id: 'tech-data-analyst-summary',
    title: 'Data Analyst & Business Intelligence Specialist Summary',
    type: 'summary',
    experienceLevel: 'mid',
    industryCategory: 'tech',
    badge: 'Mid-Level • Data',
    targetRole: 'Senior Data / BI Analyst',
    summaryText: 'Quantitative Data Analyst with 5 years of experience architecting automated SQL data pipelines, predictive dashboards in Power BI and Tableau, and statistical cohorts. Skilled in Python (pandas, NumPy), dbt, and BigQuery. Partnered with commercial leadership to identify customer drop-off bottlenecks, producing actionable predictive insights that lifted annual customer retention by 18% and saved $1.6M in recurring churn.',
    atsScore: '97/100',
    primaryKeywords: ['SQL', 'Tableau', 'Power BI', 'Python', 'BigQuery', 'dbt', 'Data Modeling', 'Cohort Analysis'],
    tacticalFocus: 'Demonstrates SQL/BI tooling mastery and translates analytics directly into retained revenue.'
  },

  // 9. Sales & Customer Service - Experienced Summary
  {
    id: 'sales-account-exec-summary',
    title: 'Enterprise Account Executive & B2B Sales Summary',
    type: 'summary',
    experienceLevel: 'senior',
    industryCategory: 'sales',
    badge: 'Senior • Sales',
    targetRole: 'Senior Account Executive',
    summaryText: 'Top-performing Enterprise Account Executive with 7+ years of experience closing multi-year B2B software contracts across Fortune 500 accounts. Consistently exceeded annual quotas (134% average attainment), generating $16.5M in cumulative new business ARR. Skilled in consultative discovery, MEDDICC qualification, executive contract negotiations, and partnership co-selling. Recognized for building sustainable buyer relationships that maintain a 98% gross retention rate.',
    atsScore: '99/100',
    primaryKeywords: ['Enterprise Sales', 'B2B SaaS', 'MEDDICC', 'Quota Attainment', 'Pipeline Generation', 'Contract Negotiation'],
    tacticalFocus: 'Leads with quota attainment percentages, closed ARR volume, and structured sales methodology.'
  },

  // 10. Customer Support to Customer Success - Career Change Objective
  {
    id: 'sales-cs-career-changer-objective',
    title: 'Customer Support Lead Transitioning to Customer Success (CSM) Objective',
    type: 'objective',
    experienceLevel: 'career_changer',
    industryCategory: 'sales',
    badge: 'Career Changer • CS',
    targetRole: 'Customer Success Manager',
    summaryText: 'High-empathy Customer Support Lead offering 4 years of experience resolving complex technical client inquiries and managing tiered escalations, seeking to transition into a Customer Success Manager role. Proven history of maintaining a 97% customer satisfaction (CSAT) rating and identifying cross-sell opportunities that drove $350K in account expansion. Eager to leverage proactive relationship management and product onboarding expertise to drive net revenue retention (NRR).',
    atsScore: '96/100',
    primaryKeywords: ['Customer Success', 'CSAT', 'Net Revenue Retention', 'Onboarding', 'Account Expansion', 'SaaS Retention'],
    tacticalFocus: 'Bridges frontline support metrics into proactive customer success retention and account growth.'
  },

  // 11. Administrative & Operations - Experienced Summary
  {
    id: 'admin-operations-summary',
    title: 'Executive Assistant & Office Operations Manager Summary',
    type: 'summary',
    experienceLevel: 'senior',
    industryCategory: 'admin',
    badge: 'Experienced • Operations',
    targetRole: 'Executive Assistant to C-Suite / Operations Manager',
    summaryText: 'Proactive and discreet Executive Assistant with 8+ years of experience providing mission-critical operational and calendar support to C-Suite leadership. Expert in global travel orchestration, board meeting preparation, expense reconciliation, and confidential project tracking. Streamlined cross-departmental administrative workflows, reducing monthly executive scheduling delays by 35% and saving 12+ administrative hours weekly.',
    atsScore: '97/100',
    primaryKeywords: ['Executive Support', 'Calendar Management', 'Board Relations', 'Travel Coordination', 'Confidential Administration'],
    tacticalFocus: 'Highlights executive discretion, complex calendar management, and time-saving workflow improvements.'
  },

  // 12. Healthcare - Registered Nurse Summary
  {
    id: 'healthcare-rn-summary',
    title: 'Registered Nurse (RN) & Clinical Care Coordinator Summary',
    type: 'summary',
    experienceLevel: 'mid',
    industryCategory: 'healthcare',
    badge: 'Healthcare • Clinical',
    targetRole: 'Registered Nurse (Acute Care / ICU)',
    summaryText: 'Compassionate, board-certified Registered Nurse (BSN, RN, CCRN) with 6 years of fast-paced acute care and telemetry experience in Level 1 trauma centers. Proficient in advanced cardiac life support (ACLS), electronic health record systems (Epic, Cerner), and bedside patient advocacy. Recognized for clinical vigilance and team mentorship, leading a quality improvement committee that reduced hospital-acquired pressure injury rates by 38%.',
    atsScore: '98/100',
    primaryKeywords: ['BSN', 'Registered Nurse', 'ACLS', 'Epic EHR', 'Critical Care', 'Patient Safety', 'Clinical Coordination'],
    tacticalFocus: 'Puts credentials up front (BSN, CCRN), cites EHR systems, and demonstrates safety quality outcomes.'
  },

  // 13. Finance & Accounting - Experienced Summary
  {
    id: 'finance-senior-accountant-summary',
    title: 'Senior Financial Analyst & Corporate Accountant Summary',
    type: 'summary',
    experienceLevel: 'senior',
    industryCategory: 'finance',
    badge: 'Senior • Finance',
    targetRole: 'Senior Financial Analyst / Controller',
    summaryText: 'Analytical Senior Financial Analyst (CPA candidate) with 7 years of experience in corporate financial planning and analysis (FP&A), variance analysis, and GAAP-compliant monthly closing. Advanced financial modeling skills in Excel, NetSuite, and SQL. Spearheaded the automation of quarterly variance reports across 6 operating entities, reducing closing turnaround by 4 business days while identifying $850K in operational cost redundancies.',
    atsScore: '98/100',
    primaryKeywords: ['FP&A', 'Financial Modeling', 'GAAP', 'Variance Analysis', 'NetSuite', 'Cost Optimization', 'Excel VBA'],
    tacticalFocus: 'Balances compliance rigor (GAAP, closing times) with strategic commercial FP&A savings.'
  },

  // 14. Freelancers and Remote Workers Summary
  {
    id: 'freelance-remote-worker-summary',
    title: 'Autonomous Remote Software & Technical Writer Summary',
    type: 'summary',
    experienceLevel: 'senior',
    industryCategory: 'freelance',
    badge: 'Remote • Specialist',
    targetRole: 'Senior Technical Writer / Remote Specialist',
    summaryText: 'Autonomous, self-directed Senior Technical Writer with 8 years of distributed remote experience producing developer documentation, API references, and architecture whitepapers. Expert in Git-based docs-as-code workflows (Markdown, Docusaurus, OpenAPI). Authored developer documentation for a public cloud SDK adopted by 80,000 active developers, reducing developer support ticket volume by 42%. Proven ability to communicate asynchronously with global engineering teams.',
    atsScore: '97/100',
    primaryKeywords: ['Technical Writing', 'API Documentation', 'Docs as Code', 'Markdown', 'Remote Collaboration', 'OpenAPI'],
    tacticalFocus: 'Highlights remote autonomy, docs-as-code toolchains, and direct reduction in engineering support load.'
  },

  // 15. Executive Leadership Summary
  {
    id: 'leadership-vp-executive-summary',
    title: 'Vice President of Engineering / CTO Executive Summary',
    type: 'summary',
    experienceLevel: 'senior',
    industryCategory: 'leadership',
    badge: 'Executive • VP/CTO',
    targetRole: 'VP of Engineering / Chief Technology Officer',
    summaryText: 'Transformational VP of Engineering with 15+ years of experience scaling global technology organizations from 25 to 180+ multi-disciplinary engineers across 4 international hubs. Full P&L responsibility ($35M budget) overseeing cloud infrastructure, security compliance, and product delivery. Architected high-velocity engineering cultures that delivered 4 flagship SaaS enterprise releases on time while reducing team attrition to under 6%.',
    atsScore: '99/100',
    primaryKeywords: ['Engineering Leadership', 'P&L Management', 'Scale', 'Organizational Culture', 'Executive Strategy', 'Cloud Architecture'],
    tacticalFocus: 'Emphasizes organizational scale (25 to 180+ engineers), P&L stewardship, and retention stability.'
  },

  // 16. LinkedIn Headlines (Impactful Single-Line Statements)
  {
    id: 'headline-software-cloud',
    title: 'Senior Cloud & Backend Engineer LinkedIn Headline',
    type: 'headline',
    experienceLevel: 'senior',
    industryCategory: 'tech',
    badge: 'Headline • Tech',
    targetRole: 'Senior Backend Engineer',
    summaryText: 'Senior Backend Engineer | Golang & Distributed Systems Specialist | Architecting High-Concurrency Cloud Systems Serving 10M+ Users',
    atsScore: '99/100',
    primaryKeywords: ['Senior Backend Engineer', 'Golang', 'Distributed Systems', 'Cloud Systems'],
    tacticalFocus: 'Keywords + Technology Depth + Proven Scale'
  },
  {
    id: 'headline-growth-marketing',
    title: 'B2B Growth & Technical SEO Lead LinkedIn Headline',
    type: 'headline',
    experienceLevel: 'senior',
    industryCategory: 'marketing',
    badge: 'Headline • Growth',
    targetRole: 'Head of Growth Marketing',
    summaryText: 'Head of Growth Marketing & SEO | Scaling Inbound Pipelines from $0 to $18M ARR | Technical SEO & Programmatic Content Architect',
    atsScore: '98/100',
    primaryKeywords: ['Growth Marketing', 'Technical SEO', 'ARR Growth', 'Content Strategy'],
    tacticalFocus: 'Role + Commercial Proof ($18M ARR) + Specialization'
  },
  {
    id: 'headline-recent-grad',
    title: 'Computer Science Graduate LinkedIn Headline',
    type: 'headline',
    experienceLevel: 'entry',
    industryCategory: 'tech',
    badge: 'Headline • Graduate',
    targetRole: 'Aspiring Software Engineer',
    summaryText: 'Computer Science Graduate (Honors) @ UW | Python & Cloud Systems Developer | Seeking Junior Engineering Opportunities',
    atsScore: '96/100',
    primaryKeywords: ['Computer Science Graduate', 'Python', 'Cloud Developer', 'Junior Software Engineer'],
    tacticalFocus: 'Education Credential + Technical Core + Clear Job Search Intent'
  }
];
