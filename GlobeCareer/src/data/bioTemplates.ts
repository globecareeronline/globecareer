/**
 * GlobeCareer Professional Bio Templates Library
 * Real, selectable, professionally authored bios across 15+ industry sectors and roles.
 * Supports Short (~50w), Medium (~120w), and Extended (~200w) lengths in both 1st and 3rd person POV.
 */

export interface BioTemplate {
  id: string;
  title: string;
  category: 'tech' | 'design' | 'marketing' | 'leadership' | 'academic' | 'entry_level' | 'freelance' | 'healthcare' | 'operations';
  targetAudience: string;
  badge: string;
  defaultData: {
    fullName: string;
    currentRole: string;
    companyOrBrand: string;
    yearsOfExperience: string;
    coreSkills: string;
    keyAchievements: string;
    educationOrCert: string;
    personalTouch: string;
    tone: 'professional' | 'executive' | 'creative' | 'friendly' | 'academic';
    perspective: 'first' | 'third';
  };
  sampleOutputs: {
    firstPerson: {
      short: string;
      medium: string;
      extended: string;
    };
    thirdPerson: {
      short: string;
      medium: string;
      extended: string;
    };
  };
}

export const BIO_CATEGORIES = [
  { id: 'all', label: 'All Templates' },
  { id: 'tech', label: 'Software & IT' },
  { id: 'design', label: 'Design & UI/UX' },
  { id: 'marketing', label: 'Marketing & SEO' },
  { id: 'leadership', label: 'Executives & Leaders' },
  { id: 'operations', label: 'Project & Operations' },
  { id: 'academic', label: 'Education & Research' },
  { id: 'healthcare', label: 'Healthcare & Clinical' },
  { id: 'freelance', label: 'Freelancers & Consultants' },
  { id: 'entry_level', label: 'Students & Graduates' },
];

export const BIO_TEMPLATES: BioTemplate[] = [
  // 1. Software Developers and IT Professionals
  {
    id: 'software-dev-it',
    title: 'Senior Software Engineer & Distributed Systems Lead',
    category: 'tech',
    targetAudience: 'Backend Engineers, Distributed Systems Specialists, Cloud Engineers',
    badge: 'Tech • Systems',
    defaultData: {
      fullName: 'Marcus Vance',
      currentRole: 'Staff Backend Systems Engineer',
      companyOrBrand: 'Nexis Cloud Solutions',
      yearsOfExperience: '9',
      coreSkills: 'Golang, distributed microservices, Kubernetes, PostgreSQL clustering, and high-throughput event queues',
      keyAchievements: 'architected a real-time transactional payment gateway handling 120,000 requests per second with sub-50ms latency and 99.999% uptime',
      educationOrCert: 'B.S. in Computer Science from University of Michigan and AWS Solutions Architect Professional',
      personalTouch: 'actively contributes to open-source RPC networking libraries and mentors junior developers through regional coding bootcamps',
      tone: 'professional',
      perspective: 'third'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am a Staff Backend Systems Engineer at Nexis Cloud Solutions with over 9 years of experience engineering distributed cloud backends, Golang microservices, and high-throughput data pipelines.',
        medium: 'I am a Staff Backend Systems Engineer at Nexis Cloud Solutions specializing in Golang, distributed microservices, Kubernetes, and PostgreSQL clustering. Over the past 9 years, I have architected mission-critical architectures that support multi-region scale. Notably, I led the development of a real-time payment gateway processing 120,000 requests per second with 99.999% uptime. I hold a B.S. in Computer Science from the University of Michigan and an AWS Solutions Architect Professional certification.',
        extended: 'I am a Staff Backend Systems Engineer at Nexis Cloud Solutions specializing in Golang, distributed microservices, Kubernetes, and PostgreSQL clustering. Over the past 9 years, I have engineered fault-tolerant cloud systems that support massive consumer and enterprise scale. Most recently, I led the core team that built a multi-region transactional payment gateway handling 120,000 requests per second with sub-50ms latency and 99.999% reliability. I hold a B.S. in Computer Science from the University of Michigan alongside AWS Solutions Architect Professional credentials. Outside of day-to-day engineering, I actively contribute to open-source distributed networking tools, review technical RFCs, and mentor early-career engineers across distributed development teams.'
      },
      thirdPerson: {
        short: 'Marcus Vance is a Staff Backend Systems Engineer at Nexis Cloud Solutions with 9+ years of experience engineering fault-tolerant microservices, high-throughput pipelines, and distributed cloud backends.',
        medium: 'Marcus Vance is a Staff Backend Systems Engineer at Nexis Cloud Solutions specializing in Golang, distributed microservices, Kubernetes, and PostgreSQL clustering. With over 9 years of systems engineering experience, Marcus has directed the rollout of high-availability cloud platforms, notably architecting a transactional payment gateway processing 120,000 requests per second. He holds a B.S. in Computer Science from the University of Michigan and is an AWS Solutions Architect Professional.',
        extended: 'Marcus Vance is a Staff Backend Systems Engineer at Nexis Cloud Solutions specializing in Golang, distributed microservices, Kubernetes, and PostgreSQL clustering. With over 9 years of production systems experience, Marcus has led foundational architectural modernizations across enterprise cloud backbones. Notably, he directed the engineering of a transactional payment gateway capable of handling 120,000 requests per second with sub-50ms latency and five-nines uptime. Marcus earned his B.S. in Computer Science from the University of Michigan and holds an AWS Solutions Architect Professional credential. Outside of engineering architecture, he contributes to open-source networking libraries and mentors underrepresented developers entering cloud computing.'
      }
    }
  },

  // 2. Web Developers and Full Stack Engineers
  {
    id: 'web-dev-fullstack',
    title: 'Full Stack Web Developer & Frontend Architect',
    category: 'tech',
    targetAudience: 'Web Developers, JavaScript/TypeScript Engineers, Full-Stack Architects',
    badge: 'Web • Full Stack',
    defaultData: {
      fullName: 'Elena Rostova',
      currentRole: 'Lead Full Stack Web Developer',
      companyOrBrand: 'Kinetic Digital Labs',
      yearsOfExperience: '7',
      coreSkills: 'TypeScript, React 19, Next.js, Node.js, GraphQL, and modern web performance optimization',
      keyAchievements: 're-architected a high-traffic SaaS portal that lowered initial page load times by 62% and lifted mobile trial conversions by 28%',
      educationOrCert: 'B.Sc. in Software Engineering and Google Mobile Web Specialist Certification',
      personalTouch: 'speaks regularly on web accessibility standards (WCAG 2.2) and designs lightweight CSS typography engines',
      tone: 'creative',
      perspective: 'first'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am a Lead Full Stack Web Developer building high-performance, accessible digital experiences with React, Next.js, TypeScript, and modern Node backends.',
        medium: 'I am a Lead Full Stack Web Developer at Kinetic Digital Labs with 7 years of experience engineering resilient web applications. My work centers on TypeScript, React 19, Next.js, and GraphQL architectures. Recently, I spearheaded the frontend overhaul of our flagship customer portal, reducing load times by 62% and increasing conversion rates by 28%. When I am not building web apps, I advocate for accessible web typography and international design standards.',
        extended: 'I am a Lead Full Stack Web Developer at Kinetic Digital Labs with 7 years of experience crafting high-performance, accessible web platforms. I specialize in bridging intricate frontend ergonomics (React 19, Next.js, Tailwind) with robust backend services (Node.js, GraphQL, PostgreSQL). Over my career, I have modernized consumer-facing web apps that serve millions of monthly active users, recently delivering an architectural rewrite that trimmed bundle weights by 55% and sped up page interactions by 62%. I hold a B.Sc. in Software Engineering and speak at web development conferences on WCAG 2.2 accessibility. Outside of code, I experiment with generative typography and contribute to developer tooling.'
      },
      thirdPerson: {
        short: 'Elena Rostova is a Lead Full Stack Web Developer at Kinetic Digital Labs specializing in TypeScript, Next.js, React, and high-performance, accessible web architectures.',
        medium: 'Elena Rostova is a Lead Full Stack Web Developer at Kinetic Digital Labs with 7 years of experience building modern web applications. Specializing in TypeScript, React 19, Next.js, and GraphQL APIs, Elena led the frontend overhaul of a flagship customer portal that improved initial load times by 62% and elevated user conversion by 28%. She holds a B.Sc. in Software Engineering and is a frequent speaker on WCAG 2.2 accessibility compliance.',
        extended: 'Elena Rostova is a Lead Full Stack Web Developer at Kinetic Digital Labs with 7 years of experience architecting scalable, accessible digital products. Combining technical rigor across React, Next.js, TypeScript, and Node.js microservices, Elena focuses on performance tuning and intuitive component design. She recently directed a cross-functional modernization of a multi-tenant web platform that cut latency by 62% and dramatically enhanced Core Web Vitals. Elena holds a B.Sc. in Software Engineering and frequently speaks at developer summits regarding accessibility standards. In her personal time, she designs open-source CSS layout frameworks.'
      }
    }
  },

  // 3. Graphic Designers and UI/UX Designers
  {
    id: 'graphic-ui-ux-designer',
    title: 'Senior Product & UI/UX Designer',
    category: 'design',
    targetAudience: 'UI/UX Designers, Product Designers, Design System Leads, Brand Architects',
    badge: 'Design • Product',
    defaultData: {
      fullName: 'Aria Chen',
      currentRole: 'Principal Product Designer',
      companyOrBrand: 'Aura Design Systems',
      yearsOfExperience: '8',
      coreSkills: 'enterprise design systems, Figma token architecture, qualitative user research, and cross-platform design ergonomics',
      keyAchievements: 'unified 14 disparate enterprise products into a coherent design token architecture adopted by 65 engineers across 4 continents',
      educationOrCert: 'B.Des in Interaction Design from Rhode Island School of Design (RISD)',
      personalTouch: 'passionate about zero-waste typography, tactile print publication, and ethical human-centered design',
      tone: 'creative',
      perspective: 'first'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am a Principal Product Designer dedicated to crafting coherent, accessible design systems that turn complex enterprise software into effortless human experiences.',
        medium: 'I am a Principal Product Designer at Aura Design Systems with 8 years of experience shaping intuitive digital interfaces. Specializing in design systems, token architecture, and user research, I recently unified 14 disparate product lines into a single accessible design language adopted by over 65 engineers globally. I hold a B.Des from RISD and believe deeply that great design is quiet, honest, and profoundly useful.',
        extended: 'I am a Principal Product Designer at Aura Design Systems with 8 years of experience leading product design, design systems, and interaction architecture. I collaborate closely with engineering and product leaders to synthesize complex workflows into calm, accessible user interfaces. Most recently, I led the development of a company-wide design token system that slashed product-to-code iteration cycles by 40% across 14 enterprise applications. I graduated with a B.Des in Interaction Design from RISD. When I step away from Figma, I curate independent print publications, study vintage architectural typography, and mentor emerging designers from non-traditional backgrounds.'
      },
      thirdPerson: {
        short: 'Aria Chen is a Principal Product Designer at Aura Design Systems with 8 years of experience building accessible design systems and scalable user interfaces.',
        medium: 'Aria Chen is a Principal Product Designer at Aura Design Systems with 8 years of experience leading UI/UX strategy for enterprise software. Specializing in design token architecture, interactive prototyping, and user testing, Aria spearheaded a unified design framework adopted by 65 engineers across 14 products. She holds a B.Des from Rhode Island School of Design and champions accessibility-first design cultures.',
        extended: 'Aria Chen is a Principal Product Designer at Aura Design Systems with 8 years of experience driving design system strategy and cross-platform user experience. Recognized for bridging design aesthetics with structural engineering constraints, Aria recently led the creation of an enterprise-grade design token system that accelerated feature delivery across 14 commercial applications. She earned her B.Des in Interaction Design from the Rhode Island School of Design (RISD). Outside of digital product design, Aria produces independent print zines, researches ergonomic interfaces, and mentors early-career designers across global communities.'
      }
    }
  },

  // 4. Digital Marketers and SEO Specialists
  {
    id: 'digital-marketer-seo',
    title: 'Head of Growth Marketing & Organic SEO Strategist',
    category: 'marketing',
    targetAudience: 'Digital Marketers, SEO Leads, Content Growth Managers, Acquisition Strategists',
    badge: 'Marketing • Growth',
    defaultData: {
      fullName: 'Simon Sterling',
      currentRole: 'Head of Growth Marketing & Organic Search',
      companyOrBrand: 'Apex Commerce Global',
      yearsOfExperience: '10',
      coreSkills: 'technical SEO auditing, programmatic content engines, customer acquisition loops, and conversion rate optimization (CRO)',
      keyAchievements: 'scaled organic search traffic from 150K to 2.4M monthly visitors, driving an incremental $18M in annualized enterprise pipeline',
      educationOrCert: 'B.A. in Communications & Certified Analytics Professional (CAP)',
      personalTouch: 'publishes a weekly teardown of search engine algorithm shifts and judges regional growth marketing competitions',
      tone: 'professional',
      perspective: 'third'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am an Organic Growth & Technical SEO Strategist with 10 years of experience scaling organic search engines, content marketing funnels, and enterprise revenue pipelines.',
        medium: 'I am the Head of Growth Marketing at Apex Commerce Global, bringing a decade of data-driven experience in technical SEO, programmatic content expansion, and customer acquisition. Throughout my career, I have specialized in turning organic search into a predictable revenue driver—notably scaling our inbound footprint from 150K to 2.4M monthly visits and delivering $18M in ARR pipeline. I hold credentials in advanced marketing analytics and write extensively on search intelligence.',
        extended: 'I am the Head of Growth Marketing at Apex Commerce Global, with 10 years of experience building scalable organic acquisition engines for fast-growing technology companies. My expertise sits at the intersection of technical site architecture, data-driven content strategy, and conversion optimization. Over the last three years, I architected a programmatic SEO and editorial engine that expanded organic traffic from 150K to 2.4M monthly sessions, contributing $18M in verified pipeline revenue. In addition to commercial consulting, I write a weekly industry newsletter dissecting search algorithm shifts, mentor startup founders, and speak at growth marketing conferences.'
      },
      thirdPerson: {
        short: 'Simon Sterling is the Head of Growth Marketing at Apex Commerce Global, specializing in technical SEO, programmatic content engines, and enterprise acquisition loops.',
        medium: 'Simon Sterling is the Head of Growth Marketing at Apex Commerce Global with 10 years of experience leading organic acquisition and conversion optimization. Known for building resilient SEO engines, Simon scaled Apex Commerce’s organic search traffic from 150K to over 2.4M monthly unique visitors, generating $18M in attributable enterprise pipeline. He holds a degree in Communications and is a Certified Analytics Professional.',
        extended: 'Simon Sterling is the Head of Growth Marketing at Apex Commerce Global with over a decade of leadership in technical SEO, customer acquisition economics, and conversion rate optimization. Combining analytical telemetry with editorial execution, Simon directed a multi-channel growth overhaul that expanded organic visibility to 2.4M monthly visits while reducing paid acquisition reliance by 42%. He is a Certified Analytics Professional and frequently contributes thought leadership on AI search shifts and search engine ergonomics. Simon also advises high-growth startups on scalable international distribution.'
      }
    }
  },

  // 5. Entrepreneurs and Business Owners
  {
    id: 'entrepreneur-founder',
    title: 'Tech Founder & Venture Operator',
    category: 'leadership',
    targetAudience: 'Startup Founders, Co-Founders, Small Business Owners, Managing Directors',
    badge: 'Founder • Venture',
    defaultData: {
      fullName: 'Tariq Mansour',
      currentRole: 'Founder & CEO',
      companyOrBrand: 'Veritas Logistics Technology',
      yearsOfExperience: '12',
      coreSkills: 'venture fundraising, cross-border supply chain operations, B2B enterprise sales, and organizational culture design',
      keyAchievements: 'bootstrapped and scaled Veritas to an 8-figure valuation, serving over 400 global freight partners across EMEA and North America',
      educationOrCert: 'B.S. in Industrial Engineering from Purdue University',
      personalTouch: 'angel investor in early-stage climate tech startups and guest lecturer on sustainable enterprise building',
      tone: 'executive',
      perspective: 'third'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am the Founder & CEO of Veritas Logistics Technology, an entrepreneur with 12 years of experience scaling modern B2B supply chain infrastructure.',
        medium: 'I am the Founder and CEO of Veritas Logistics Technology. Over the past 12 years, I have built and operated companies at the crossroads of logistics, automated workflows, and global commerce. I led Veritas from a napkin concept to an 8-figure enterprise platform supporting 400+ freight operators across two continents. As an engineer-turned-operator, I focus relentlessly on disciplined unit economics and mission-driven team culture.',
        extended: 'I am the Founder and CEO of Veritas Logistics Technology, with 12 years of experience scaling international business ventures from zero to profitability. Originally trained as an industrial engineer at Purdue University, I combine operational rigor with empathetic leadership. At Veritas, I led our team from initial customer discovery through multi-market expansion, building a software ecosystem that now powers logistics operations for over 400 freight partners across EMEA and North America. Beyond running Veritas, I actively angel invest in early-stage supply chain and climate tech ventures, mentor first-time immigrant founders, and lecture on ethical entrepreneurship.'
      },
      thirdPerson: {
        short: 'Tariq Mansour is the Founder & CEO of Veritas Logistics Technology, an operator with 12 years of experience scaling international B2B platforms.',
        medium: 'Tariq Mansour is the Founder & CEO of Veritas Logistics Technology. With 12 years of experience building scalable venture infrastructure, Tariq guided Veritas from inception to an 8-figure enterprise platform servicing over 400 commercial logistics providers across EMEA and North America. A graduate of Purdue University in Industrial Engineering, Tariq combines engineering discipline with high-conviction company building.',
        extended: 'Tariq Mansour is the Founder & CEO of Veritas Logistics Technology, bringing 12 years of experience in company formation, venture operations, and supply chain software. Under his leadership, Veritas developed proprietary logistics routing platforms that now process millions in freight cargo across two continents. Tariq holds a B.S. in Industrial Engineering from Purdue University and is known for prioritizing capital efficiency and sustainable operational growth. An active angel investor in early-stage logistics and sustainability startups, Tariq regularly advises university entrepreneurship cohorts and speaks on international market penetration.'
      }
    }
  },

  // 6. Students and Recent Graduates
  {
    id: 'student-recent-graduate',
    title: 'Recent Computer Science Graduate & Junior Engineer',
    category: 'entry_level',
    targetAudience: 'College Students, University Grads, Interns, Early-Career Juniors',
    badge: 'Entry-Level • Graduate',
    defaultData: {
      fullName: 'Chloe Nguyen',
      currentRole: 'Associate Software Engineer',
      companyOrBrand: 'Recent CS Graduate',
      yearsOfExperience: '1',
      coreSkills: 'Python, Java, Git workflows, SQL data modeling, algorithms, and agile team sprint collaboration',
      keyAchievements: 'developed an open-source campus food redistribution app that connected 3,500 students with local dining halls, cutting weekly campus food waste by 30%',
      educationOrCert: 'B.S. in Computer Science with Honors from University of Washington',
      personalTouch: 'president of Women in Computer Science and avid competitive collegiate hackathon finalist',
      tone: 'friendly',
      perspective: 'first'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am an Associate Software Engineer and recent CS graduate from the University of Washington, passionate about writing clean, reliable code in Python, Java, and modern web frameworks.',
        medium: 'I am an Associate Software Engineer and recent Computer Science graduate (Honors) from the University of Washington. During my studies, I focused on data structures, distributed systems, and collaborative software engineering. I co-created an open-source campus food waste portal that supported over 3,500 peers and won 1st place in the regional social impact hackathon. I am eager to contribute strong foundational fundamentals and curiosity to a collaborative engineering team.',
        extended: 'I am an Associate Software Engineer and recent graduate from the University of Washington, where I earned my B.S. in Computer Science with Honors. Throughout university, I prioritized hands-on project work in Python, Java, and modern web technologies. As lead developer on our senior capstone, I engineered a community food redistribution application that connected 3,500 active students with dining surplus, directly reducing campus food waste by 30%. I served as president of our Women in Computer Science chapter, organizing workshops for over 200 incoming students. I bring strong analytical curiosity, disciplined Git hygiene, and an eagerness to learn from senior engineers.'
      },
      thirdPerson: {
        short: 'Chloe Nguyen is an Associate Software Engineer and recent Computer Science graduate from the University of Washington with demonstrated project experience in Python, Java, and web systems.',
        medium: 'Chloe Nguyen is an Associate Software Engineer who recently earned her B.S. in Computer Science with Honors from the University of Washington. With proficiencies across Python, Java, SQL, and agile methodologies, Chloe co-developed a campus sustainability platform supporting 3,500 active users. Known for proactive problem-solving, she served as president of Women in Computer Science and is seeking to contribute to mission-critical engineering initiatives.',
        extended: 'Chloe Nguyen is an Associate Software Engineer and recent Computer Science honors graduate from the University of Washington. During her academic career, Chloe emphasized practical software engineering, cloud computing, and algorithmic efficiency. She led the development team behind a campus food recovery platform that served over 3,500 students and received university sustainability honors. A former president of the Women in Computer Science association, Chloe is dedicated to fostering inclusive engineering cultures and contributing dependable code to high-velocity development squads.'
      }
    }
  },

  // 7. Freelancers and Independent Consultants
  {
    id: 'freelancer-consultant',
    title: 'Independent B2B Growth Consultant & Fractional Strategist',
    category: 'freelance',
    targetAudience: 'Freelancers, Independent Contractors, Fractional Executives, Solo Agency Owners',
    badge: 'Freelance • Advisory',
    defaultData: {
      fullName: 'Julian Mercer',
      currentRole: 'Principal Consultant & Fractional CMO',
      companyOrBrand: 'Mercer Advisory Group',
      yearsOfExperience: '11',
      coreSkills: 'go-to-market strategy, B2B SaaS positioning, marketing team audits, and fractional executive leadership',
      keyAchievements: 'advised 22 venture-backed startups through Series A and B transitions, unlocking an average 3.2x lift in sales pipeline velocity',
      educationOrCert: 'MBA from Northwestern University (Kellogg)',
      personalTouch: 'hosts a monthly roundtable for solo fractional operators and writes on the economics of independent knowledge work',
      tone: 'professional',
      perspective: 'first'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am a Fractional CMO and Growth Strategist helping B2B technology companies build repeatable go-to-market engines and accelerate customer acquisition.',
        medium: 'I am a Fractional CMO and B2B growth consultant with 11 years of experience guiding venture-backed tech startups. Through Mercer Advisory Group, I partner with founders to refine positioning, align sales and marketing pipelines, and audit go-to-market teams. Having advised 22 companies through Series A and B inflection points, I focus on building sustainable in-house marketing capabilities rather than temporary vanity metrics.',
        extended: 'I am a Fractional CMO and independent growth consultant with 11 years of experience advising high-growth B2B software companies. Through my advisory practice, I step into executive leadership roles to architect go-to-market strategies, overhaul positioning, and build high-retention customer acquisition loops. Over the past five years, I have partnered with 22 venture-funded technology firms, driving an average 3.2x acceleration in enterprise pipeline velocity. I hold an MBA from Northwestern University’s Kellogg School of Management. When I am not working directly with founders, I host roundtables for independent consultants and publish insights on modern fractional leadership.'
      },
      thirdPerson: {
        short: 'Julian Mercer is a Fractional CMO and B2B Growth Consultant with 11 years of experience advising venture-backed SaaS startups on go-to-market execution.',
        medium: 'Julian Mercer is a Fractional CMO and Principal Consultant at Mercer Advisory Group with 11 years of experience in B2B tech strategy. Julian has partnered with 22 venture-backed companies across North America and Europe, driving an average 3.2x lift in pipeline efficiency. He holds an MBA from the Kellogg School of Management and specializes in translating technical product advantages into commercial market leadership.',
        extended: 'Julian Mercer is a Fractional CMO and Principal Consultant at Mercer Advisory Group, offering 11 years of expertise in commercial strategy, B2B software positioning, and marketing organization design. Having guided 22 high-growth companies through critical Series A and B milestones, Julian helps executive teams replace guesswork with rigorous customer acquisition frameworks. He earned his MBA from Northwestern University’s Kellogg School of Management. Julian frequently contributes to publications on fractional executive models and facilitates mastermind sessions for senior independent consultants.'
      }
    }
  },

  // 8. Executives and Senior Professionals
  {
    id: 'executive-senior-leader',
    title: 'Vice President of Global Operations & Transformation',
    category: 'leadership',
    targetAudience: 'C-Suite Executives, VPs, Managing Directors, Board Advisors',
    badge: 'Executive • C-Suite',
    defaultData: {
      fullName: 'Catherine Thorne',
      currentRole: 'VP of Global Operations & Supply Chain',
      companyOrBrand: 'Aegis Global Enterprises',
      yearsOfExperience: '18',
      coreSkills: 'cross-border operational governance, multi-plant manufacturing, P&L stewardship ($250M+), and post-merger integration',
      keyAchievements: 'orchestrated a global operational consolidation across 8 international facilities, capturing $42M in recurring EBITDA synergies while improving safety indices by 34%',
      educationOrCert: 'M.S. in Operations Research from MIT and Lean Six Sigma Master Black Belt',
      personalTouch: 'serves on the advisory board of the Global Manufacturing Institute and advocates for STEM apprenticeships in secondary schools',
      tone: 'executive',
      perspective: 'third'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am an executive operations leader with 18 years of global experience managing large-scale manufacturing networks, enterprise P&Ls, and post-merger integrations.',
        medium: 'I serve as VP of Global Operations at Aegis Global Enterprises, directing an 18-year career focused on operational excellence, supply chain resilience, and P&L transformation ($250M+). Throughout my career, I have led international manufacturing turnarounds across Europe, North America, and Asia. Recently, I directed an 8-facility consolidation that unlocked $42M in recurring EBITDA synergies while lifting plant safety records to all-time highs. I hold an M.S. from MIT.',
        extended: 'I serve as VP of Global Operations at Aegis Global Enterprises with 18 years of senior leadership experience across industrial manufacturing, international logistics, and organizational restructuring. I manage end-to-end P&Ls exceeding $250M, leading teams of over 2,200 employees across 8 worldwide facilities. Over my tenure, I led a multi-year manufacturing modernization program that yielded $42M in recurring EBITDA expansion and lowered global inventory overhead by 26%. I hold an M.S. in Operations Research from MIT and am a Lean Six Sigma Master Black Belt. Alongside corporate duties, I advise international trade bodies and champion technical apprenticeships for young women in engineering.'
      },
      thirdPerson: {
        short: 'Catherine Thorne is the VP of Global Operations at Aegis Global Enterprises with 18 years of executive leadership across international supply chains and multi-plant operations.',
        medium: 'Catherine Thorne is the VP of Global Operations at Aegis Global Enterprises, overseeing an 18-year career dedicated to manufacturing transformation, P&L stewardship, and organizational scale. Managing multi-site operations across 8 countries, Catherine orchestrated a post-merger operational alignment that captured $42M in annual EBITDA synergies. She holds an M.S. from MIT and is a Lean Six Sigma Master Black Belt.',
        extended: 'Catherine Thorne is the VP of Global Operations at Aegis Global Enterprises, bringing 18 years of executive leadership in supply chain governance, global manufacturing networks, and P&L management exceeding $250M. Recognized for driving operational resilience during macro supply disruptions, Catherine led an 8-facility consolidation that delivered $42M in sustainable EBITDA improvements while elevating safety standards by 34%. She earned her M.S. in Operations Research from MIT and holds Master Black Belt Lean credentials. Catherine serves as an advisory board member for the Global Manufacturing Institute and mentors future industrial executives.'
      }
    }
  },

  // 9. Project Managers and Scrum Masters
  {
    id: 'project-manager-agile',
    title: 'Senior Technical Project Manager & Agile Coach',
    category: 'operations',
    targetAudience: 'Project Managers, Technical Program Managers (TPM), Scrum Masters, Delivery Leads',
    badge: 'Operations • PM',
    defaultData: {
      fullName: 'David Kalu',
      currentRole: 'Senior Technical Program Manager',
      companyOrBrand: 'Apex Health Systems',
      yearsOfExperience: '8',
      coreSkills: 'agile sprint delivery, cross-functional engineering alignment, risk mitigation, JIRA governance, and regulatory compliance (HIPAA/SOC2)',
      keyAchievements: 'delivered a multi-million-dollar EHR cloud migration 6 weeks ahead of schedule across 9 distributed engineering squads with zero downtime',
      educationOrCert: 'PMP (Project Management Professional) and Certified ScrumMaster (CSM)',
      personalTouch: 'organizes local tech mentorship meetups and writes on async communication strategies for remote engineering squads',
      tone: 'professional',
      perspective: 'third'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am a Senior Technical Program Manager with 8 years of experience leading complex software deliveries, agile transformations, and cross-functional engineering initiatives.',
        medium: 'I am a Senior Technical Program Manager at Apex Health Systems with 8 years of experience orchestrating complex software rollouts. Specializing in agile execution, engineering alignment, and risk management, I recently delivered a multi-million-dollar electronic health record migration 6 weeks ahead of schedule across 9 squads with zero clinical disruption. I hold PMP and CSM certifications and take pride in fostering high-trust engineering cultures.',
        extended: 'I am a Senior Technical Program Manager at Apex Health Systems with 8 years of experience driving large-scale digital transformation and technical delivery. I specialize in unblocking dependencies for cross-functional teams, translating executive roadmaps into actionable sprints, and maintaining stringent HIPAA and SOC2 compliance. Recently, I directed the cloud migration of our core health records platform, guiding 9 distributed engineering squads to complete the project 6 weeks ahead of schedule with zero unexpected downtime. I hold both PMP and CSM designations and am deeply committed to sustainable engineering velocity and transparent team communication.'
      },
      thirdPerson: {
        short: 'David Kalu is a Senior Technical Program Manager at Apex Health Systems with 8 years of experience guiding complex software deliveries and agile team transformations.',
        medium: 'David Kalu is a Senior Technical Program Manager at Apex Health Systems with 8 years of experience steering high-stakes digital initiatives. Specializing in agile program delivery and technical risk mitigation, David led a multi-million-dollar cloud health record migration completed 6 weeks ahead of schedule across 9 distributed engineering teams. He is a Certified PMP and CSM professional.',
        extended: 'David Kalu is a Senior Technical Program Manager at Apex Health Systems, offering 8 years of proven expertise in technical program management, cross-functional coordination, and software delivery governance. Known for creating clarity in complex environments, David recently coordinated 9 engineering squads through an enterprise cloud migration, beating projected launch dates by 6 weeks while maintaining zero downtime for healthcare clients. David holds credentials including Project Management Professional (PMP) and Certified ScrumMaster (CSM), and actively advocates for asynchronous communication frameworks in remote-first teams.'
      }
    }
  },

  // 10. Data Analysts and Data Scientists
  {
    id: 'data-analyst-scientist',
    title: 'Lead Data Scientist & Analytics Architect',
    category: 'tech',
    targetAudience: 'Data Analysts, Data Scientists, BI Developers, Machine Learning Engineers',
    badge: 'Data • Analytics',
    defaultData: {
      fullName: 'Dr. Aris Thorne',
      currentRole: 'Lead Data Scientist',
      companyOrBrand: 'Quantix Analytics Labs',
      yearsOfExperience: '6',
      coreSkills: 'predictive modeling, Python, SQL, causal inference, customer lifetime value modeling, and automated ETL pipelines',
      keyAchievements: 'built an algorithmic churn prediction model that saved $4.5M in annual customer retention for a major telecommunications provider',
      educationOrCert: 'Ph.D. in Applied Statistics from Columbia University',
      personalTouch: 'regular reviewer for international machine learning journals and passionate data visualization creator',
      tone: 'academic',
      perspective: 'third'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am a Lead Data Scientist specializing in statistical modeling, causal inference, and machine learning pipelines that translate complex datasets into measurable business growth.',
        medium: 'I am a Lead Data Scientist at Quantix Analytics Labs with 6 years of experience applying predictive modeling and statistical telemetry to commercial problems. With a Ph.D. in Applied Statistics from Columbia University, I build machine learning pipelines in Python and SQL that extract clear signals from messy data. My churn forecasting algorithms recently preserved $4.5M in annual enterprise revenue for a national telecommunications partner.',
        extended: 'I am a Lead Data Scientist at Quantix Analytics Labs, where I apply empirical statistics, machine learning, and causal inference to solve complex enterprise challenges. Holding a Ph.D. in Applied Statistics from Columbia University, I bridge theoretical statistical rigor with pragmatic commercial engineering. Over my 6 years in industry, I have developed predictive retention engines, automated forecasting pipelines, and pricing optimization algorithms—notably building an early churn detection framework that saved $4.5M in recurring revenue. In my spare time, I review papers for machine learning publications and create open-source data visualizations.'
      },
      thirdPerson: {
        short: 'Dr. Aris Thorne is a Lead Data Scientist at Quantix Analytics Labs with 6 years of experience building predictive models, machine learning pipelines, and statistical forecasting frameworks.',
        medium: 'Dr. Aris Thorne is a Lead Data Scientist at Quantix Analytics Labs specializing in applied statistical modeling, Python machine learning pipelines, and customer telemetry. Holding a Ph.D. in Applied Statistics from Columbia University, Dr. Thorne architected an enterprise churn prediction model that yielded $4.5M in annual customer retention. He is a frequent peer reviewer for computational data journals.',
        extended: 'Dr. Aris Thorne is a Lead Data Scientist at Quantix Analytics Labs, bringing 6 years of expertise in machine learning development, statistical modeling, and algorithmic optimization. Recognized for translating high-dimensional datasets into strategic executive intelligence, Dr. Thorne designed a real-time behavioral telemetry system that reduced customer attrition and preserved $4.5M in annual contract value. He earned his Ph.D. in Applied Statistics from Columbia University and regularly contributes technical reviews to international data science publications.'
      }
    }
  },

  // 11. Teachers and Academic Professionals
  {
    id: 'teacher-academic',
    title: 'Senior Educator & Curriculum Development Specialist',
    category: 'academic',
    targetAudience: 'Teachers, University Lecturers, Instructional Designers, Academic Researchers',
    badge: 'Education • Faculty',
    defaultData: {
      fullName: 'Hannah Scott',
      currentRole: 'Senior Secondary Educator & STEM Curriculum Lead',
      companyOrBrand: 'Oakridge International Academy',
      yearsOfExperience: '12',
      coreSkills: 'inquiry-based learning, secondary STEM curriculum design, educational technology integration, and student mentorship',
      keyAchievements: 'redesigned the regional AP Physics curriculum, increasing student passing rates from 68% to 92% across a cohort of 400 students over three years',
      educationOrCert: 'M.Ed. in Curriculum and Instruction from Boston College',
      personalTouch: 'founded an after-school robotics club that won state championships two years in a row',
      tone: 'academic',
      perspective: 'first'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am a Senior Educator and STEM Curriculum Lead with 12 years of experience creating rigorous, engaging learning environments that empower young scholars to excel.',
        medium: 'I am a Senior Secondary Educator and STEM Curriculum Lead at Oakridge International Academy with 12 years of classroom and curriculum design experience. Holding an M.Ed. from Boston College, I specialize in inquiry-based STEM pedagogy and student mentorship. My redesign of the regional AP Physics sequence improved exam pass rates from 68% to 92% over three consecutive years, opening university pathways for hundreds of aspiring engineers.',
        extended: 'I am a Senior Secondary Educator and STEM Curriculum Lead at Oakridge International Academy with 12 years of dedicated experience in pedagogical innovation, curriculum development, and student development. I hold an M.Ed. in Curriculum and Instruction from Boston College and believe education should inspire intellectual courage and compassionate inquiry. Over my career, I spearheaded a modernized AP Physics and computational thinking framework that elevated student passing benchmarks from 68% to 92%. Beyond the classroom, I founded our school’s robotics club, secure STEM grants for underrepresented students, and lead district-wide professional development workshops on experiential science education.'
      },
      thirdPerson: {
        short: 'Hannah Scott is a Senior Educator and STEM Curriculum Lead at Oakridge International Academy with 12 years of experience in secondary pedagogical excellence.',
        medium: 'Hannah Scott is a Senior Secondary Educator and STEM Curriculum Lead at Oakridge International Academy with 12 years of teaching and instructional leadership experience. Holding an M.Ed. from Boston College, Hannah restructured the academy’s AP Physics curriculum, lifting student passing outcomes from 68% to 92%. She is dedicated to fostering inclusive STEM pathways for young scholars.',
        extended: 'Hannah Scott is a Senior Secondary Educator and STEM Curriculum Lead at Oakridge International Academy with 12 years of classroom leadership, curriculum development, and faculty mentorship experience. Known for inquiry-driven teaching frameworks, Hannah directed a complete curriculum overhaul that propelled district AP pass rates from 68% to 92% over three years. She holds an M.Ed. in Curriculum and Instruction from Boston College. Hannah also founded a nationally recognized student robotics program and regularly conducts training sessions for educators on modern interactive STEM pedagogy.'
      }
    }
  },

  // 12. Healthcare Professionals and Clinicians
  {
    id: 'healthcare-clinician',
    title: 'Clinical Nurse Specialist & Patient Care Coordinator',
    category: 'healthcare',
    targetAudience: 'Registered Nurses, Nurse Practitioners, Clinical Coordinators, Medical Specialists',
    badge: 'Healthcare • Clinical',
    defaultData: {
      fullName: 'Samantha Rivera, RN, BSN',
      currentRole: 'Lead Clinical Nurse Specialist',
      companyOrBrand: 'Metropolitan Medical Center',
      yearsOfExperience: '10',
      coreSkills: 'critical care telemetry, clinical workflow optimization, interdisciplinary team leadership, and compassionate patient advocacy',
      keyAchievements: 'implemented a standardized post-operative bedside handover protocol that reduced unit medication administration errors by 44%',
      educationOrCert: 'B.S. in Nursing from Georgetown University and CCRN (Critical Care Registered Nurse) certification',
      personalTouch: 'volunteers at community health clinics providing free hypertension and diabetes screenings',
      tone: 'professional',
      perspective: 'third'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am a Lead Clinical Nurse Specialist with 10 years of experience delivering high-standard critical care, clinical safety improvements, and compassionate patient advocacy.',
        medium: 'I am a Lead Clinical Nurse Specialist at Metropolitan Medical Center with 10 years of acute care experience. Holding a BSN from Georgetown University and CCRN credentials, I coordinate interdisciplinary medical teams to deliver exceptional patient-centered care. I recently led the development of a standardized bedside handover protocol that reduced medication errors by 44% across our 36-bed surgical unit.',
        extended: 'I am a Lead Clinical Nurse Specialist at Metropolitan Medical Center with a decade of bedside and clinical coordination experience in critical care environments. I hold a Bachelor of Science in Nursing from Georgetown University and active CCRN certification. Throughout my career, I have championed evidence-based practice and interdisciplinary collaboration to enhance patient outcomes and nurse well-being. My leadership on our unit quality committee resulted in a standardized clinical handover process that decreased post-operative medication errors by 44%. Outside the hospital, I volunteer at community health clinics offering preventative cardiovascular screenings and health literacy workshops.'
      },
      thirdPerson: {
        short: 'Samantha Rivera, RN, BSN, is a Lead Clinical Nurse Specialist at Metropolitan Medical Center with 10 years of experience in acute critical care and clinical safety protocols.',
        medium: 'Samantha Rivera, RN, BSN, is a Lead Clinical Nurse Specialist at Metropolitan Medical Center with 10 years of acute care leadership. Holding a BSN from Georgetown University and CCRN credentials, Samantha spearheaded a post-surgical safety initiative that reduced medication administration errors by 44%. She is widely recognized for combining clinical excellence with compassionate bedside advocacy.',
        extended: 'Samantha Rivera, RN, BSN, is a Lead Clinical Nurse Specialist at Metropolitan Medical Center with 10 years of experience in intensive care nursing, clinical protocol design, and healthcare quality management. Combining deep clinical acumen with empathetic patient advocacy, Samantha led a multi-disciplinary initiative that reduced post-operative handover complications by 44%. She earned her nursing degree from Georgetown University and holds CCRN certification. Samantha also serves as a clinical preceptor for new nursing graduates and volunteers at local community health clinics.'
      }
    }
  },

  // 13. LinkedIn About Section Bio
  {
    id: 'linkedin-about-executive',
    title: 'LinkedIn "About" Section: Modern Authority & Value Proposition',
    category: 'leadership',
    targetAudience: 'Professionals Optimizing Their LinkedIn Profiles, Job Seekers, Executives',
    badge: 'LinkedIn • Profile',
    defaultData: {
      fullName: 'Patrick O’Connor',
      currentRole: 'Director of Enterprise Partnerships',
      companyOrBrand: 'SaaS Global Network',
      yearsOfExperience: '12',
      coreSkills: 'enterprise commercial alliances, strategic co-selling, revenue operations, and cross-border executive negotiations',
      keyAchievements: 'built global partnership ecosystem that generated $35M in sourced revenue across EMEA and North America',
      educationOrCert: 'B.A. in International Business from Trinity College Dublin',
      personalTouch: 'believes great partnerships are built on radical empathy and shared upside',
      tone: 'friendly',
      perspective: 'first'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I build high-trust commercial partnerships that help enterprise technology companies scale recurring revenue across global markets.',
        medium: 'I am the Director of Enterprise Partnerships at SaaS Global Network with 12 years of experience turning strategic alliances into reliable revenue growth. Over my career, I have negotiated co-selling agreements and built partner ecosystems that have sourced over $35M in contract value. I believe the best business partnerships are grounded in shared upside and transparent communication. Let’s connect if you are scaling international alliances.',
        extended: 'I build high-trust commercial partnerships that help enterprise technology organizations unlock new markets. As Director of Enterprise Partnerships at SaaS Global Network, I have spent the last 12 years structuring multi-party alliances, technology integrations, and co-selling programs across North America and Europe. My teams have originated over $35M in partner-sourced contract value by aligning incentives and executing with disciplined consistency. What drives me is connecting visionary founders with global distribution channels. When I am not structuring agreements, I mentor early-stage entrepreneurs and write about the future of partner ecosystems. Always open to connecting with fellow commercial leaders.'
      },
      thirdPerson: {
        short: 'Patrick O’Connor is a Director of Enterprise Partnerships with 12 years of experience developing international commercial ecosystems and $35M+ in partner revenue.',
        medium: 'Patrick O’Connor is the Director of Enterprise Partnerships at SaaS Global Network with 12 years of experience structuring high-impact commercial alliances. Having built partner ecosystems that generated $35M in verified software revenue across EMEA and North America, Patrick specializes in aligning executive incentives and scaling co-selling channels.',
        extended: 'Patrick O’Connor is the Director of Enterprise Partnerships at SaaS Global Network, offering 12 years of leadership in corporate alliances, international business development, and ecosystem revenue growth. He has successfully negotiated commercial agreements with global system integrators and SaaS leaders, sourcing more than $35M in enterprise pipeline. Patrick holds a degree in International Business from Trinity College Dublin and is an advocate for collaborative, value-driven business partnerships.'
      }
    }
  },

  // 14. Keynote Speaker & Author Bio
  {
    id: 'keynote-speaker-author',
    title: 'Keynote Speaker, Author & Industry Futurist',
    category: 'marketing',
    targetAudience: 'Conference Speakers, Published Authors, Podcast Hosts, Thought Leaders',
    badge: 'Speaker • Author',
    defaultData: {
      fullName: 'Dr. Evelyn Brand',
      currentRole: 'Keynote Speaker & Author',
      companyOrBrand: 'The Human Work Institute',
      yearsOfExperience: '15',
      coreSkills: 'future of work keynote speaking, organizational psychology, bestselling business authorship, and executive summits',
      keyAchievements: 'delivered 120+ keynote addresses across 18 countries, including TEDx, World Economic Forum side sessions, and Fortune 500 annual retreats',
      educationOrCert: 'Ph.D. in Organizational Behavior from Stanford University',
      personalTouch: 'author of the bestselling book "The Adaptive Workplace" and host of the Future Horizon podcast',
      tone: 'executive',
      perspective: 'third'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am a Keynote Speaker and Organizational Psychologist exploring how AI, distributed culture, and human empathy are reshaping the modern workplace.',
        medium: 'I am an author, keynote speaker, and founder of The Human Work Institute. With a Ph.D. in Organizational Behavior from Stanford, I have spent 15 years researching how high-performing teams navigate technological disruption. Having addressed over 120 conferences in 18 countries, I translate academic research into actionable executive strategies. I am the author of "The Adaptive Workplace" and host of the Future Horizon podcast.',
        extended: 'I am a Keynote Speaker, Organizational Psychologist, and author of the business bestseller "The Adaptive Workplace." With a doctorate from Stanford University and 15 years of empirical research, I study how rapid technological shifts impact workplace psychology, leadership retention, and organizational trust. I have delivered over 120 keynotes across 18 nations for organizations including Fortune 500 leadership summits, global tech conferences, and university commencements. My mission is to ensure that as workplaces become more automated, they also become more humane, purposeful, and resilient.'
      },
      thirdPerson: {
        short: 'Dr. Evelyn Brand is an international Keynote Speaker, Organizational Psychologist, and author of "The Adaptive Workplace," having spoken in 18 countries.',
        medium: 'Dr. Evelyn Brand is an internationally recognized Keynote Speaker and author of "The Adaptive Workplace." Holding a Ph.D. in Organizational Behavior from Stanford University, Dr. Brand has delivered over 120 keynotes worldwide, helping executive leadership teams navigate the intersection of workplace automation, organizational culture, and human potential.',
        extended: 'Dr. Evelyn Brand is an international Keynote Speaker, Organizational Psychologist, and the bestselling author of "The Adaptive Workplace." With a Ph.D. from Stanford University and 15 years of empirical research, Dr. Brand advises global leadership teams on building resilient, human-centered workplace cultures in an era of rapid technological transformation. She has addressed audiences across 18 countries at major conferences, corporate retreats, and industry summits. Dr. Brand also hosts the Future Horizon podcast, exploring the evolving relationship between technology and human fulfillment.'
      }
    }
  },

  // 15. Creative Professional & Portfolio Bio
  {
    id: 'creative-portfolio-bio',
    title: 'Creative Director & Visual Storyteller',
    category: 'design',
    targetAudience: 'Creative Directors, Copywriters, Photographers, Filmmakers, Brand Stylists',
    badge: 'Creative • Portfolio',
    defaultData: {
      fullName: 'Leo Rossi',
      currentRole: 'Independent Creative Director',
      companyOrBrand: 'Studio Rossi & Co.',
      yearsOfExperience: '12',
      coreSkills: 'brand identity systems, editorial creative direction, brand storytelling, and multi-channel campaign production',
      keyAchievements: 'directed brand rebrands for 30+ fashion and luxury lifestyle brands, earning 3 Cannes Lions and 2 D&AD Pencils',
      educationOrCert: 'B.A. in Fine Arts from Central Saint Martins, London',
      personalTouch: 'collector of 1970s analog cameras and traditional Japanese printmaking enthusiast',
      tone: 'creative',
      perspective: 'first'
    },
    sampleOutputs: {
      firstPerson: {
        short: 'I am an Independent Creative Director crafting bold, thoughtful brand narratives at the intersection of contemporary culture, typography, and visual elegance.',
        medium: 'I am an Independent Creative Director and visual storyteller based in London. With 12 years of experience leading multi-disciplinary campaigns for fashion, lifestyle, and design-led technology brands, I build visual identities that command attention without shouting. My work has earned Cannes Lions and D&AD honors, but my greatest satisfaction comes from shaping work that endures beyond seasonal trends.',
        extended: 'I am an Independent Creative Director working globally across brand identity, editorial direction, and visual storytelling. Trained in Fine Arts at Central Saint Martins, I spend my days collaborating with visionary founders, designers, and cinematographers to craft brand worlds that resonate emotionally. Over the past 12 years, I have directed creative transformations for over 30 international lifestyle and technology brands, earning recognitions including Cannes Lions and D&AD Pencils. I believe great creative direction is an exercise in clarity, restraint, and obsessive craft.'
      },
      thirdPerson: {
        short: 'Leo Rossi is an Independent Creative Director and visual storyteller with 12 years of experience crafting award-winning brand identities and campaigns.',
        medium: 'Leo Rossi is an Independent Creative Director based between London and Milan with 12 years of experience guiding visual identity and brand campaigns. A graduate of Central Saint Martins, Leo’s work has garnered honors including Cannes Lions and D&AD Pencils for its disciplined balance of modern typography and enduring cultural resonance.',
        extended: 'Leo Rossi is an Independent Creative Director and visual narrative consultant with 12 years of experience leading global brand reinventions across luxury, fashion, and technology sectors. Educated at Central Saint Martins in London, Leo has directed cross-medium campaigns for over 30 international brands, earning awards from Cannes Lions, D&AD, and the Art Directors Club. His creative philosophy champions cultural authenticity, typographics precision, and human-led storytelling.'
      }
    }
  }
];
