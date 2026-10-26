/**
 * GlobeCareer SEO Metadata & Schema.org Structured Data Engine
 * Maps every distinct page and country guide to unique, non-duplicative
 * titles, meta descriptions, canonical URLs, and Schema.org JSON-LD.
 */

import { getCountryById, COUNTRIES } from '../data/countries';

export interface PageSEOMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  structuredData: Record<string, any>;
  keywords?: string[];
  noIndex?: boolean;
}

const BASE_DOMAIN = 'https://globecareer.com';

export const PAGE_SEO_MAP: Record<string, (params?: Record<string, any>) => PageSEOMetadata> = {
  home: () => ({
    title: 'GlobeCareer – Build Your Global Career. Stand Out Anywhere.',
    description: 'Free international career platform. Create ATS-friendly resumes, cover letters, recommendation letters, outreach emails, and interview preparation for 40+ countries.',
    canonicalPath: '/',
    ogType: 'website',
    keywords: [
      'free cv maker',
      'make a resume free',
      'resume maker free',
      'international resume builder',
      'ats friendly cv',
      'resume templates'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${BASE_DOMAIN}/#webapp`,
          name: 'GlobeCareer',
          url: BASE_DOMAIN,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
          description: 'International resume and CV builder tailored to hiring regulations and formatting standards across 40 nations.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          featureList: [
            '40 Country-Specific Hiring Standards',
            'Photo vs No-Photo Regulation Filtering',
            '100% Vector PDF and Microsoft Word DOCX Export',
            'Real-Time ATS Keyword Matcher',
            'Interactive Cover Letter Builder',
            'Job Application Pipeline Tracker'
          ]
        },
        {
          '@type': 'Organization',
          '@id': `${BASE_DOMAIN}/#organization`,
          name: 'GlobeCareer',
          url: BASE_DOMAIN,
          logo: `${BASE_DOMAIN}/globecareer-logo.png`,
          sameAs: []
        }
      ]
    }
  }),

  builder: () => ({
    title: 'Free Resume Builder – ATS-Friendly CV Formatter | GlobeCareer',
    description: 'Build and format your professional resume with real-time ATS keyword matching, section guidelines, and instant free vector PDF and DOCX downloads.',
    canonicalPath: '/resume-builder',
    ogType: 'website',
    keywords: [
      'free resume builder',
      'cv formatter',
      'ats resume builder',
      'resume maker online',
      'download resume pdf'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GlobeCareer Resume Builder',
      url: `${BASE_DOMAIN}/resume-builder`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      description: 'Interactive resume and CV creation workspace with real-time ATS keyword matching, multi-language support, and native PDF/Word export.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  guides: () => ({
    title: 'Country CV Formats & Hiring Guides (40 Countries) | GlobeCareer',
    description: 'Explore verified CV formats, photo requirements, paper sizes, and legal hiring rules across 40 nations, including the US, UK, Germany, Canada, and Australia.',
    canonicalPath: '/country-guides',
    ogType: 'website',
    keywords: [
      'international cv format',
      'country specific resume guide',
      'cv photo requirements',
      'us letter vs a4 resume',
      'european cv standards'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Country-Specific CV and Resume Guides',
      url: `${BASE_DOMAIN}/country-guides`,
      description: 'Directory of verified hiring conventions, photo regulations, and resume formats for 40 countries worldwide.',
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: COUNTRIES.slice(0, 15).map((c, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: `${c.name} (${c.cvTerminology})`,
          url: `${BASE_DOMAIN}/country/${c.id}`
        }))
      }
    }
  }),

  'country-detail': (params) => {
    const countryId = params?.countryId || 'us';
    const c = getCountryById(countryId);

    // Highly customized SEO metadata for major search countries
    if (countryId === 'us') {
      return {
        title: 'USA Resume Format & Template Guide (No-Photo EEOC) | GlobeCareer',
        description: 'Learn strict US resume standards: 1-page limit, US Letter dimensions, and EEOC anti-discrimination photo prohibitions. Download ATS templates.',
        canonicalPath: '/country/us',
        ogType: 'article',
        keywords: ['usa resume format', 'resume template usa', 'federal resume example', 'us resume photo rules', 'eeoc resume standards'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'United States Resume Standards & Hiring Regulations',
          description: 'Official hiring guidelines for US resumes: photo prohibitions, 1-page limits, and EEOC compliance.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/us`
        }
      };
    }

    if (countryId === 'uk') {
      return {
        title: 'UK CV Format & Template Guide (2-Page British Standard) | GlobeCareer',
        description: 'Master the standard 2-page British Curriculum Vitae format with personal profile, Equality Act photo guidelines, and UK spelling conventions.',
        canonicalPath: '/country/uk',
        ogType: 'article',
        keywords: ['uk cv format', 'cv format uk', 'cv example uk', 'british resume template', 'uk cv length'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'United Kingdom Curriculum Vitae Standards',
          description: 'Official British CV standards: 2-page format, Equality Act photo guidelines, and personal profile structure.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/uk`
        }
      };
    }

    if (countryId === 'de') {
      return {
        title: 'German CV Format (Tabellarischer Lebenslauf Guide) | GlobeCareer',
        description: 'Comprehensive guide to the German Tabellarischer Lebenslauf: Bewerbungsfoto placement, chronological structure, and DIN A4 formatting standards.',
        canonicalPath: '/country/de',
        ogType: 'article',
        keywords: ['german cv format', 'tabellarischer lebenslauf', 'cv germany', 'deutsch cv format', 'bewerbungsfoto guide'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'German Tabellarischer Lebenslauf Standards',
          description: 'German employment documentation requirements including Bewerbungsfoto norms and tabular chronology.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/de`
        }
      };
    }

    if (countryId === 'ca') {
      return {
        title: 'Canadian Resume Format & Template Guide | GlobeCareer',
        description: 'Create a Canadian-standard resume adhering to human rights photo exclusions, reverse-chronological experience, and French/English bilingual conventions.',
        canonicalPath: '/country/ca',
        ogType: 'article',
        keywords: ['canadian resume format', 'resume format canada', 'canadian style resume', 'canada cv templates'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Canadian Resume and Employment Standards',
          description: 'Guidelines for crafting ATS-compliant Canadian resumes adhering to provincial human rights codes.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/ca`
        }
      };
    }

    if (countryId === 'au') {
      return {
        title: 'Australian Resume Format & CV Template Guide | GlobeCareer',
        description: 'Complete guide to Australian CV formatting: 2–3 page standard length, key achievements, reference norms, and International A4 paper sizing.',
        canonicalPath: '/country/au',
        ogType: 'article',
        keywords: ['australian resume format', 'resume format australia', 'australia cv templates', 'aussie resume format'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Australian Resume and CV Guidelines',
          description: 'Hiring standards in Australia: standard document length, achievement formatting, and local recruiter conventions.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/au`
        }
      };
    }

    // Default dynamic configuration for remaining countries
    return {
      title: `${c.name} ${c.cvTerminology} Format & Hiring Guide | GlobeCareer`,
      description: `Official hiring guidelines for ${c.name}: ${c.photoRule === 'discouraged' ? 'Photo discouraged' : c.photoRule === 'standard' ? 'Photo customary' : 'Photo optional'}, standard length ${c.standardLength}, ${c.paperSize.toUpperCase()} paper size.`,
      canonicalPath: `/country/${c.id}`,
      ogType: 'article',
      keywords: [`${c.name.toLowerCase()} cv format`, `${c.name.toLowerCase()} resume format`, `${c.name.toLowerCase()} job application`],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `${c.name} ${c.cvTerminology} Format and Hiring Guide`,
        description: `Verified guidelines for formatting job applications and CVs in ${c.name}.`,
        mainEntityOfPage: `${BASE_DOMAIN}/country/${c.id}`
      }
    };
  },

  templates: () => ({
    title: 'ATS Resume Templates & Formats (Single-Column & Photo) | GlobeCareer',
    description: 'Browse free ATS-tested resume templates and international photo CV formats. Engineered for corporate ATS parsing and European executive standards.',
    canonicalPath: '/templates',
    ogType: 'website',
    keywords: [
      'ats resume templates',
      'one page resume',
      'chronological resume template',
      'free resume templates docx',
      'executive cv template'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'ATS Resume & CV Templates',
      url: `${BASE_DOMAIN}/templates`,
      description: 'Collection of ATS-optimized single-column resume templates and European photo CV layouts.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'job-examples': () => ({
    title: 'Resume Examples & Professional Templates by Role | GlobeCareer',
    description: 'Explore verified resume examples and proven bullet points for software engineers, marketing, finance, healthcare, and entry-level positions.',
    canonicalPath: '/resume-examples',
    ogType: 'website',
    keywords: [
      'software engineer resume',
      'entry level it jobs resume',
      'marketing resume examples',
      'nursing resume sample',
      'finance resume template'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Role-Specific Resume Examples',
      url: `${BASE_DOMAIN}/resume-examples`,
      description: 'Curated resume samples and impact bullet formulas across 10 major career sectors.'
    }
  }),

  'ats-guide': () => ({
    title: 'ATS Resume Optimization Handbook & Screening Checklist | GlobeCareer',
    description: 'Understand how Applicant Tracking Systems parse resumes. Learn parsing mechanics, avoid formatting pitfalls, and follow our verified ATS checklist.',
    canonicalPath: '/ats-guide',
    ogType: 'article',
    keywords: [
      'ats resume templates',
      'resume optimization tools',
      'how ats works',
      'applicant tracking system guide',
      'ats formatting checklist'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'The Applicant Tracking System (ATS) Optimization Handbook',
      description: 'A realistic, evidence-based guide to navigating corporate resume screening parsers.',
      url: `${BASE_DOMAIN}/ats-guide`
    }
  }),

  'writing-guide': () => ({
    title: 'How to Write a Professional Resume – Complete Guide | GlobeCareer',
    description: 'Comprehensive resume writing handbook: action verbs, the Google X-Y-Z achievement formula, section hierarchy, and paper size conventions.',
    canonicalPath: '/resume-writing-guide',
    ogType: 'article',
    keywords: [
      'how should a resume look',
      'how long can a resume be',
      'what is a resume summary',
      'skills for resume',
      'how to update your resume'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Write an Effective International Resume',
      description: 'Step-by-step guidance for drafting an impactful, interview-winning resume.',
      url: `${BASE_DOMAIN}/resume-writing-guide`
    }
  }),

  'cover-letter': () => ({
    title: 'Free Cover Letter Generator & Career Document Builder | GlobeCareer',
    description: 'Create tailored, professional cover letters matched to your target role and country hiring norms. Live preview with instant download.',
    canonicalPath: '/cover-letter-builder',
    ogType: 'website',
    keywords: [
      'cover letter generator',
      'free cover letter builder',
      'professional cover letter format',
      'cover letter templates microsoft word'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GlobeCareer Cover Letter Generator',
      url: `${BASE_DOMAIN}/cover-letter-builder`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'cover-letter-templates': () => ({
    title: 'Professional Cover Letter Templates (Modern & Executive) | GlobeCareer',
    description: 'Choose from clean, ATS-compliant cover letter templates designed for corporate, tech, executive, and creative job applications.',
    canonicalPath: '/cover-letter-templates',
    ogType: 'website',
    keywords: [
      'cover letter templates',
      'standard cover letter template',
      'modern cover letter format',
      'executive cover letter templates'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Cover Letter Templates',
      url: `${BASE_DOMAIN}/cover-letter-templates`
    }
  }),

  'letter-templates': () => ({
    title: 'Free Cover Letter, Recommendation & Job Application Email Templates | GlobeCareer',
    description: 'Explore verified cover letter formats, recommendation letter templates, and job application email templates for international career advancement.',
    canonicalPath: '/letter-templates',
    ogType: 'website',
    keywords: [
      'cover letter templates',
      'recommendation letter format',
      'job application email template',
      'recruiter outreach email',
      'reference letter examples'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Letter & Outreach Templates',
      url: `${BASE_DOMAIN}/letter-templates`
    }
  }),

  'bio-generator': () => ({
    title: 'Free Professional Bio Generator (Short, LinkedIn & Executive) | GlobeCareer',
    description: 'Generate polished professional biographies, executive summaries, speaker bios, and LinkedIn profiles. 100% free with tailored tones and instant export.',
    canonicalPath: '/bio-generator',
    ogType: 'website',
    keywords: [
      'professional bio generator',
      'short bio generator',
      'executive bio generator',
      'linkedin bio generator',
      'bio maker online free',
      'about me bio generator'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GlobeCareer Professional Bio Generator',
      url: `${BASE_DOMAIN}/bio-generator`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'summary-generator': () => ({
    title: 'Free Resume Summary & Career Objective Generator | GlobeCareer',
    description: 'Create high-scoring ATS resume summaries, entry-level career objectives, and LinkedIn headlines. 100% free with 1-click insertion into the Resume Builder.',
    canonicalPath: '/summary-generator',
    ogType: 'website',
    keywords: [
      'resume summary generator',
      'career objective generator',
      'professional summary generator',
      'resume objective examples',
      'resume summary examples',
      'ats resume summary'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GlobeCareer Resume Summary & Objective Generator',
      url: `${BASE_DOMAIN}/summary-generator`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'resignation-letter': () => ({
    title: 'Free Resignation Letter Generator (2 Weeks Notice & Immediate) | GlobeCareer',
    description: 'Create respectful, formal resignation letters for standard two weeks notice, short notice, and international relocation. Free download and print formatting.',
    canonicalPath: '/resignation-letter',
    ogType: 'website',
    keywords: [
      'resignation letter generator',
      'two weeks notice letter',
      'simple resignation letter',
      'formal resignation letter template',
      'resignation letter with immediate effect',
      'resignation letter due to relocation'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GlobeCareer Resignation Letter Generator',
      url: `${BASE_DOMAIN}/resignation-letter`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'bio-templates': () => ({
    title: 'Free Professional Bio Templates & Executive Bio Examples | GlobeCareer',
    description: 'Browse 15+ free professional bio templates for software engineers, executives, designers, consultants, and founders. First & third-person formats with 1-click export.',
    canonicalPath: '/bio-templates',
    ogType: 'website',
    keywords: [
      'professional bio templates',
      'short bio templates',
      'executive bio examples',
      'linkedin bio template',
      'about me template free',
      'bio maker online'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Free Professional Bio Templates',
      url: `${BASE_DOMAIN}/bio-templates`,
      description: 'Collection of 15+ professionally formatted bio templates in first-person and third-person perspectives across 9 major industries.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'summary-templates': () => ({
    title: 'Free Resume Summary & Career Objective Templates (18+ ATS Formats) | GlobeCareer',
    description: '18+ ATS-tested resume summaries, entry-level career objectives, and LinkedIn headline templates across Tech, Design, Finance, Healthcare, and Operations.',
    canonicalPath: '/summary-templates',
    ogType: 'website',
    keywords: [
      'resume summary templates',
      'career objective templates',
      'resume summary examples',
      'linkedin headline templates',
      'ats resume objective',
      'professional summary docx'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Resume Summary & Career Objective Templates',
      url: `${BASE_DOMAIN}/summary-templates`,
      description: 'Collection of 18+ ATS-calibrated professional summaries, career objectives, and LinkedIn headlines ready for instant resume builder insertion.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'resignation-letter-templates': () => ({
    title: 'Free Resignation Letter Templates (2 Weeks, Short Notice & Relocation) | GlobeCareer',
    description: '11+ free formal resignation letter templates covering standard two weeks notice, short notice, immediate effect, relocation, retirement, and career pivots.',
    canonicalPath: '/resignation-letter-templates',
    ogType: 'website',
    keywords: [
      'resignation letter templates',
      'two weeks notice letter template',
      'short notice resignation letter',
      'resignation letter due to relocation',
      'immediate resignation letter template'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Resignation Letter Templates',
      url: `${BASE_DOMAIN}/resignation-letter-templates`,
      description: 'Collection of 11+ legally prudent, professionally structured resignation letter templates for diverse notice periods and departure reasons.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'recommendation-guide': () => ({
    title: 'How to Write a Letter of Recommendation: Guide, Formats & FAQs | GlobeCareer',
    description: 'Learn the exact 4-part structure, examples, and professional formatting for employment, academic, and graduate school recommendation letters.',
    canonicalPath: '/recommendation-letter-guide',
    ogType: 'article',
    keywords: [
      'how to write a letter of recommendation',
      'academic letter of recommendation format',
      'employment reference letter guide',
      'recommendation letter for graduate school',
      'letter of recommendation template'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'How to Write a Recommendation Letter: Format, Examples & Free Templates',
      description: 'Comprehensive guide to structuring employment and academic letters of recommendation.',
      mainEntityOfPage: `${BASE_DOMAIN}/recommendation-letter-guide`
    }
  }),

  jobs: () => ({
    title: 'Verified International Jobs & Visa Sponsorship Listings | GlobeCareer',
    description: 'Discover verified international positions and remote opportunities across the US, UK, Canada, and Australia with anti-scam authenticity verification.',
    canonicalPath: '/jobs',
    ogType: 'website',
    keywords: [
      'international remote jobs',
      'entry level it jobs',
      'visa sponsorship jobs usa',
      'remote software engineer jobs',
      'verified international positions'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Verified International Job Opportunities',
      url: `${BASE_DOMAIN}/jobs`,
      description: 'Hand-screened international and remote jobs with verified employer authenticity and canonical career application links.'
    }
  }),

  tracker: () => ({
    title: 'Job Application Tracker – Kanban Pipeline & Management | GlobeCareer',
    description: 'Organize your job search with a free Kanban application tracker. Track wishlists, interviews, salaries, and follow-ups with local and cloud backup.',
    canonicalPath: '/job-tracker',
    ogType: 'website',
    keywords: [
      'job application tracker',
      'job search tracker',
      'job application tracking sheet',
      'job application pipeline'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GlobeCareer Job Application Tracker',
      url: `${BASE_DOMAIN}/job-tracker`,
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'recommendation-letter': () => ({
    title: 'Free Recommendation Letter Generator & Builder | GlobeCareer',
    description: 'Generate structured, professional letters of recommendation for employment, graduate school, scholarships, and international visas. 100% free.',
    canonicalPath: '/recommendation-letter',
    ogType: 'website',
    keywords: [
      'recommendation letter generator',
      'letter of recommendation template',
      'reference letter builder',
      'academic recommendation letter',
      'employment reference letter'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GlobeCareer Recommendation Letter Builder',
      url: `${BASE_DOMAIN}/recommendation-letter`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'email-generator': () => ({
    title: 'Job Application Email Generator – 5 Outreach Formats | GlobeCareer',
    description: 'Generate professional job application emails, recruiter outreach messages, referral requests, and follow-ups. Edit and copy instantly.',
    canonicalPath: '/email-generator',
    ogType: 'website',
    keywords: [
      'job application email generator',
      'cold email to recruiter',
      'job inquiry email template',
      'interview follow up email',
      'job referral request email'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GlobeCareer Job Application Email Generator',
      url: `${BASE_DOMAIN}/email-generator`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'interview-prep': () => ({
    title: 'Interview Preparation Toolkit – STAR Method & Mock Practice | GlobeCareer',
    description: 'Master behavioral and role-specific interviews with question frameworks, country-specific hiring tips, STAR answer builder, and mock interview practice.',
    canonicalPath: '/interview-prep',
    ogType: 'website',
    keywords: [
      'interview preparation',
      'star method interview questions',
      'mock interview practice',
      'behavioral interview questions',
      'international job interview tips'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GlobeCareer Interview Preparation Toolkit',
      url: `${BASE_DOMAIN}/interview-prep`,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  'ats-checker': () => ({
    title: 'Free ATS Resume Checker & Job Description Matcher | GlobeCareer',
    description: 'Scan your resume against any job description. Transparent keyword matching, formatting diagnostics, and missing skill suggestions.',
    canonicalPath: '/ats-checker',
    ogType: 'website',
    keywords: [
      'ats resume checker free',
      'resume scanner ats',
      'ats score calculator',
      'job description keyword matcher',
      'resume optimization tool'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GlobeCareer ATS Resume Checker',
      url: `${BASE_DOMAIN}/ats-checker`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }),

  faq: () => ({
    title: 'International CV & Resume FAQ – Guidelines & Formats | GlobeCareer',
    description: 'Frequently asked questions regarding international CV formats, paper sizes (US Letter vs A4), photo rules, ATS parsing, and vector exports.',
    canonicalPath: '/faq',
    ogType: 'website',
    keywords: ['how long should a cv be', 'can a resume be 2 pages', 'cv vs resume', 'resume paper size standard'],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What paper size should I use: A4 or US Letter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'If applying to companies in the US, Canada, or the Philippines, format your document as US Letter (8.5 × 11 in). For virtually all other countries worldwide (UK, EU, Australia, Singapore, India, Middle East), International A4 (210 × 297 mm) is standard.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can any tool guarantee a 100% ATS score?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. No automated algorithm can guarantee an interview. GlobeCareer ensures your document parses cleanly without formatting glitches by using single-column flow, standard headers, and UTF-8 vector text.'
          }
        },
        {
          '@type': 'Question',
          name: 'Does GlobeCareer store or sell my private resume data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Never. GlobeCareer is built with privacy-by-design architecture. Your resume data, photos, and files reside in your local browser storage unless you voluntarily choose to sync with your private cloud account.'
          }
        }
      ]
    }
  }),

  about: () => ({
    title: 'About GlobeCareer – Mission & International Hiring Standards',
    description: 'Learn about GlobeCareer’s privacy-by-design mission to bridge global talent with country-specific hiring regulations and formatting standards.',
    canonicalPath: '/about',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About GlobeCareer',
      url: `${BASE_DOMAIN}/about`
    }
  }),

  contact: () => ({
    title: 'Contact Support & Inquiries | GlobeCareer',
    description: 'Get in touch with the GlobeCareer team for technical assistance, partnership opportunities, and feedback.',
    canonicalPath: '/contact',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact GlobeCareer',
      url: `${BASE_DOMAIN}/contact`
    }
  }),

  privacy: () => ({
    title: 'Privacy Policy – Zero Data Retention Architecture | GlobeCareer',
    description: 'Read GlobeCareer’s privacy-by-design policy. Your resume data stays in your browser; zero tracking cookies and zero unsolicited data collection.',
    canonicalPath: '/privacy',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'GlobeCareer Privacy Policy',
      url: `${BASE_DOMAIN}/privacy`
    }
  }),

  terms: () => ({
    title: 'Terms of Service | GlobeCareer',
    description: 'Review the terms and conditions governing the use of GlobeCareer’s free international resume builder, tools, and services.',
    canonicalPath: '/terms',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'GlobeCareer Terms of Service',
      url: `${BASE_DOMAIN}/terms`
    }
  }),

  cookies: () => ({
    title: 'Cookie Policy & Data Preferences | GlobeCareer',
    description: 'Understand how GlobeCareer uses essential local storage and advertising cookies, and manage your cookie preferences.',
    canonicalPath: '/cookie-policy',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'GlobeCareer Cookie Policy',
      url: `${BASE_DOMAIN}/cookie-policy`
    }
  })
};

/**
 * Updates DOM title, meta description, canonical link, OpenGraph tags,
 * and dynamically injects the page-specific JSON-LD structured data script.
 */
export function applyPageSEO(pageKey: string, params?: Record<string, any>): PageSEOMetadata {
  const getter = PAGE_SEO_MAP[pageKey] || PAGE_SEO_MAP.home;
  const meta = getter(params);

  if (typeof document === 'undefined') return meta;

  // 1. Title
  document.title = meta.title;

  // 2. Meta description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', meta.description);

  // 3. Canonical link
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute('href', `${BASE_DOMAIN}${meta.canonicalPath}`);

  // 4. OpenGraph tags
  const ogTags: Record<string, string> = {
    'og:title': meta.title,
    'og:description': meta.description,
    'og:url': `${BASE_DOMAIN}${meta.canonicalPath}`,
    'og:type': meta.ogType || 'website'
  };

  Object.entries(ogTags).forEach(([prop, val]) => {
    let tag = document.querySelector(`meta[property="${prop}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', prop);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', val);
  });

  // 5. Twitter tags
  const twitterTags: Record<string, string> = {
    'twitter:title': meta.title,
    'twitter:description': meta.description
  };

  Object.entries(twitterTags).forEach(([name, val]) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', val);
  });

  // 6. Robots indexability
  let robotsTag = document.querySelector('meta[name="robots"]');
  if (!robotsTag) {
    robotsTag = document.createElement('meta');
    robotsTag.setAttribute('name', 'robots');
    document.head.appendChild(robotsTag);
  }
  robotsTag.setAttribute('content', meta.noIndex ? 'noindex, nofollow' : 'index, follow');

  // 7. Dynamic JSON-LD Structured Data
  let script = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'dynamic-page-schema';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(meta.structuredData);

  return meta;
}
