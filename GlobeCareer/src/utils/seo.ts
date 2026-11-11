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

const BASE_DOMAIN = 'https://globecareer.online';

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
    title: 'Global CV Standards & Hiring Rules Across 47 Countries | GlobeCareer',
    description: 'Explore verified CV formats, photo rules, paper sizes, and legal hiring standards across 47 nations, including US, UK, Canada, India, Pakistan, Brazil, and Germany.',
    canonicalPath: '/country-guides',
    ogType: 'website',
    keywords: [
      'cv standards',
      'international cv format',
      'country specific resume guide',
      'cv photo requirements',
      'us letter vs a4 resume',
      'european cv standards'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Country-Specific CV and Resume Guides (47 Countries)',
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

    if (countryId === 'in') {
      return {
        title: 'India Resume & CV Format Guide (2-Page Standard) | GlobeCareer',
        description: 'Complete guide to Indian CV formatting: 2–3 page IT and tech resumes, notice period highlights, academic achievements, and A4 standards.',
        canonicalPath: '/country/in',
        ogType: 'article',
        keywords: ['india resume format', 'cv format india', 'resume template india', 'indian cv format for freshers', 'notice period on resume'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Indian Resume and Curriculum Vitae Hiring Guidelines',
          description: 'Hiring standards in India: 2-page tech format, notice period conventions, and academic project formatting.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/in`
        }
      };
    }

    if (countryId === 'pk') {
      return {
        title: 'Pakistan CV Format & Resume Guide (2-Page Standard) | GlobeCareer',
        description: 'Master the standard Pakistani CV format: 2-page professional layout, education & division conventions, notice period, and ATS compatibility.',
        canonicalPath: '/country/pk',
        ogType: 'article',
        keywords: ['pakistan cv format', 'cv format in pakistan', 'resume template pakistan', 'pakistan job application format', 'best cv format for pakistan'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Pakistan Curriculum Vitae and Resume Standards',
          description: 'Verified guidelines for formatting corporate and tech job applications in Pakistan.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/pk`
        }
      };
    }

    if (countryId === 'bd') {
      return {
        title: 'Bangladesh CV Format & Standard Resume Guide | GlobeCareer',
        description: 'Official Bangladeshi CV conventions: 2-page structured format, passport photograph norms, SSC/HSC and university CGPA layout, and references.',
        canonicalPath: '/country/bd',
        ogType: 'article',
        keywords: ['bangladesh cv format', 'cv format bangladesh', 'bd jobs cv format', 'standard cv format in bangladesh', 'resume format bd'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Bangladesh Curriculum Vitae Standards and Hiring Guidelines',
          description: 'Standard documentation guidelines for corporate, banking, and government CVs in Bangladesh.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/bd`
        }
      };
    }

    if (countryId === 'br') {
      return {
        title: 'Brazil Currículo Vitae Format & LGPD Guide | GlobeCareer',
        description: 'Learn Brazilian Currículo standards: 1–2 page professional format, LGPD data protection consent, objective statement, and no-photo corporate rules.',
        canonicalPath: '/country/br',
        ogType: 'article',
        keywords: ['curriculo vitae brasil', 'modelo de curriculo', 'curriculo formato brasil', 'curriculo lattes vs profissional', 'brazil resume format'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Padrões de Currículo Vitae e Emprego no Brasil',
          description: 'Diretrizes oficiais para elaboração de currículos profissionais compatíveis com a LGPD no Brasil.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/br`
        }
      };
    }

    if (countryId === 'tr') {
      return {
        title: 'Turkey Özgeçmiş (CV) Format & KVKK Guide | GlobeCareer',
        description: 'Standard Turkish özgeçmiş conventions: professional photo placement, military service status, KVKK consent clause, and reverse chronological layout.',
        canonicalPath: '/country/tr',
        ogType: 'article',
        keywords: ['turkey cv format', 'ozgecmis ornekleri', 'turkce cv formati', 'kvkk cv metni', 'kariyer net cv formati'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Türkiye Özgeçmiş (CV) Standartları ve İşe Alım Rehberi',
          description: 'Türkiye iş piyasası için profesyonel özgeçmiş hazırlama kuralları ve KVKK onay bildirimleri.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/tr`
        }
      };
    }

    if (countryId === 'my') {
      return {
        title: 'Malaysia Resume & CV Format Guide | GlobeCareer',
        description: 'Complete guide to Malaysian CV conventions: 2-page professional layout, language proficiencies (Bahasa Malaysia, English), and SSC/MNC hiring standards.',
        canonicalPath: '/country/my',
        ogType: 'article',
        keywords: ['malaysia resume format', 'cv format malaysia', 'jobstreet cv format', 'malaysian resume template', 'resume format for fresh graduates malaysia'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Malaysian Resume and Curriculum Vitae Hiring Standards',
          description: 'Guidelines for preparing professional resumes for local companies and multinational SSCs in Malaysia.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/my`
        }
      };
    }

    if (countryId === 'id') {
      return {
        title: 'Indonesia CV Format & Pas Foto Standards | GlobeCareer',
        description: 'Master Indonesian CV conventions: 1–2 page format, pas foto requirements, IPK/GPA guidelines, and bilingual English/Bahasa Indonesia structures.',
        canonicalPath: '/country/id',
        ogType: 'article',
        keywords: ['indonesia cv format', 'format cv indonesia', 'contoh cv lamaran kerja', 'cv ats indonesia', 'pas foto cv indonesia'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Panduan dan Standar Format CV Lamaran Kerja di Indonesia',
          description: 'Pedoman resmi penyusunan curriculum vitae profesional untuk perusahaan swasta, BUMN, dan startup di Indonesia.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/id`
        }
      };
    }

    if (countryId === 'ru') {
      return {
        title: 'Russia Резюме Format & hh.ru Standards Guide | GlobeCareer',
        description: 'Complete guide to Russian резюме standards: 1–2 page professional format, photo conventions, metro station location, and quantified achievements.',
        canonicalPath: '/country/ru',
        ogType: 'article',
        keywords: ['russia resume format', 'резюме образец', 'формат резюме россия', 'составить резюме для работы', 'hh ru резюме стандарты'],
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Стандарты составления резюме для трудоустройства в России',
          description: 'Официальные правила оформления резюме в соответствии с требованиями порталов HeadHunter и работодателей РФ.',
          mainEntityOfPage: `${BASE_DOMAIN}/country/ru`
        }
      };
    }
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
    title: 'Short Professional Bio Generator – 1-Click LinkedIn, Twitter & Executive Bios | GlobeCareer',
    description: 'Generate concise 2-sentence to 150-word professional bios for LinkedIn, executive portfolios, speakers, and resumes. 100% free with 5 custom tone options.',
    canonicalPath: '/bio-generator',
    ogType: 'website',
    keywords: [
      'short professional bio generator',
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
    title: 'Free Resume Summary Generator – 3 ATS Profiles in 10s | GlobeCareer',
    description: 'Generate ATS-optimized professional resume summaries tailored to your target job title, experience level, and key skills. 1-click copy & direct builder insertion.',
    canonicalPath: '/summary-generator',
    ogType: 'website',
    keywords: [
      'resume summary generator',
      'free resume summary generator',
      'professional summary generator',
      'resume summary examples',
      'ats resume summary',
      'summary statement generator'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GlobeCareer Resume Summary Generator',
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
    title: '11+ Free Resignation Letter Templates – 2 Weeks Notice & Immediate | GlobeCareer',
    description: 'Download and copy 11+ professional resignation letter templates for two weeks notice, short notice, relocation, and career pivots. Free formal DOCX & text.',
    canonicalPath: '/resignation-letter-templates',
    ogType: 'website',
    keywords: [
      'resignation letter templates',
      'two weeks notice letter template',
      'short notice resignation letter',
      'resignation letter due to relocation',
      'immediate resignation letter template',
      'formal resignation letter template'
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
  }),

  'european-cv-format': () => ({
    title: 'European CV Format & EU Templates (A4 & CEFR) | GlobeCareer',
    description: 'Create a standardized European Union CV. Includes ISO A4 dimensions, CEFR language grids, country photo rules, and instant free vector PDF export.',
    canonicalPath: '/european-cv-format',
    ogType: 'article',
    keywords: [
      'european cv format',
      'european resume template',
      'eu cv template',
      'cv format',
      'curriculum vitae format',
      'cv templates europe',
      'cefr language levels'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TechArticle',
          headline: 'European CV Format and EU Curriculum Vitae Guidelines',
          description: 'Comprehensive guide to formatting a standardized European Union CV with A4 paper dimensions and CEFR language proficiencies.',
          url: `${BASE_DOMAIN}/european-cv-format`
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the standard European CV paper size?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'European job applications strictly adhere to the International ISO 216 A4 paper size (210 × 297 mm).'
              }
            },
            {
              '@type': 'Question',
              name: 'How should language skills be listed on a European CV?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use the Common European Framework of Reference for Languages (CEFR), categorizing proficiency from A1 (Beginner) to C2 (Mastery/Native-like).'
              }
            }
          ]
        }
      ]
    }
  }),

  'resume-skills': () => ({
    title: 'Top Skills for Resume: Hard, Soft & Technical | GlobeCareer',
    description: 'Discover verified hard skills, soft skills, and technical proficiencies for resumes by industry. Includes ATS formatting rules and instant builder insertion.',
    canonicalPath: '/resume-skills',
    ogType: 'article',
    keywords: [
      'skills for resume',
      'skills to put on resume',
      'hard skills to put on resume',
      'skills to add to resume',
      'skills on resume',
      'how to list skills on a resume',
      'technical skills for resume'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'Top Resume Skills Catalog & Strategy Guide',
          description: 'Curated repository of industry-vetted hard, soft, and technical skills formatted for Applicant Tracking Systems.',
          url: `${BASE_DOMAIN}/resume-skills`
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What are the best skills to put on a resume?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The best skills directly match the job description keywords, balancing hard technical proficiencies (e.g. Python, SQL, Financial Modeling) with measurable execution skills (e.g. Cross-functional leadership, Agile).'
              }
            },
            {
              '@type': 'Question',
              name: 'How many skills should I include on my resume?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A dedicated skills section should contain between 8 and 15 targeted skills, categorized by domain for rapid ATS and recruiter scanning.'
              }
            }
          ]
        }
      ]
    }
  }),

  'cv-vs-resume': () => ({
    title: 'CV vs Resume: Key Differences by Country & Length | GlobeCareer',
    description: 'Understand the difference between a CV and a resume. Complete breakdown of US 1-page standards, European 2-page formats, paper sizes, and photo rules.',
    canonicalPath: '/cv-vs-resume',
    ogType: 'article',
    keywords: [
      'cv versus resume',
      'what is curriculum vitae and resume',
      'cv meaning resume',
      'difference between a resume and a cv',
      'how is a cv different from a resume',
      'how long should a cv be',
      'can a resume be 2 pages'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'CV vs Resume: Global Differences and Regional Standards',
          description: 'Detailed analysis of the difference between a Curriculum Vitae and a Resume across North America, the UK, Europe, and academia.',
          url: `${BASE_DOMAIN}/cv-vs-resume`
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the main difference between a CV and a resume?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'In the US and Canada, a resume is a concise 1-page summary for corporate jobs, whereas a CV is an exhaustive academic/medical dossier. In the UK and Europe, a CV is the universal 2-page document used for all corporate applications.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can a resume be two pages long?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, if you have over 7–10 years of relevant professional experience. For entry-level and mid-level roles under 7 years, a 1-page resume is strictly expected in the US and Canada.'
              }
            }
          ]
        }
      ]
    }
  }),

  'resume-word-counter': () => ({
    title: 'Resume Word Counter – Length, Reading Time & ATS Analyzer | GlobeCareer',
    description: 'Free online resume word counter. Check word count, character count, recruiter reading time, action verb density, and 1-page vs 2-page fit instantly.',
    canonicalPath: '/resume-word-counter',
    ogType: 'website',
    keywords: [
      'resume word count',
      'how many words should a resume be',
      'resume length checker',
      'cv word count',
      'resume reading time',
      'how long should a resume be',
      'resume character counter'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'GlobeCareer Resume Word Counter',
          url: `${BASE_DOMAIN}/resume-word-counter`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
          description: 'Real-time resume word counter, character counter, reading time calculator, and action verb density analyzer.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'How many words should a resume be?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A 1-page resume should ideally contain between 350 and 500 words. A 2-page resume for senior professionals should contain between 600 and 950 words.'
              }
            },
            {
              '@type': 'Question',
              name: 'Does ATS have a maximum resume word count?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'While ATS systems do not enforce a hard word count limit, resumes over 1,000 words dilute keyword density and risk parsing errors, reducing your overall match score.'
              }
            }
          ]
        }
      ]
    }
  }),

  'resume-bullet-generator': () => ({
    title: 'Resume Bullet Point Generator – Google X-Y-Z Impact Formula | GlobeCareer',
    description: 'Generate high-impact, quantifiable resume bullets using the Google X-Y-Z and PAR formulas. Transform passive job duties into ATS-optimized achievement statements.',
    canonicalPath: '/resume-bullet-generator',
    ogType: 'website',
    keywords: [
      'resume bullet point generator',
      'google xyz formula resume',
      'resume bullet points',
      'how to write resume bullet points',
      'quantifiable resume accomplishments',
      'resume achievement generator'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'GlobeCareer Resume Bullet Point Generator',
          url: `${BASE_DOMAIN}/resume-bullet-generator`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
          description: 'Interactive resume bullet point generator utilizing the Google X-Y-Z formula to produce metric-driven, ATS-compliant accomplishment statements.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the Google X-Y-Z resume formula?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The Google X-Y-Z formula states: Accomplished [X] as measured by [Y], by doing [Z]. It emphasizes leading with business outcomes and backing them up with quantifiable metrics.'
              }
            },
            {
              '@type': 'Question',
              name: 'How many bullet points should I have per job on my resume?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Include 4 to 6 bullet points for your most recent role, and 2 to 4 bullet points for earlier positions held 3 or more years ago.'
              }
            }
          ]
        }
      ]
    }
  }),

  'reverse-chronological': () => ({
    title: 'Reverse Chronological Resume Format: Guide, Examples & Free Template | GlobeCareer',
    description: 'Master the reverse chronological resume format preferred by 95% of recruiters and ATS. Section-by-section breakdown, formatting rules, and free downloadable template.',
    canonicalPath: '/reverse-chronological-resume-format',
    ogType: 'article',
    keywords: [
      'reverse chronological resume format',
      'chronological resume template',
      'reverse chronological order resume',
      'chronological cv format',
      'reverse-chronological resume template',
      'reverse chronological order'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'Reverse Chronological Resume Format: Guide, Examples & Template',
          description: 'In-depth guide explaining how to format and structure a reverse-chronological resume for maximum ATS readability and recruiter engagement.',
          url: `${BASE_DOMAIN}/reverse-chronological-resume-format`
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Why do recruiters prefer the reverse chronological resume format?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Recruiters prefer reverse chronological order because it immediately presents the candidate\'s most recent, senior, and relevant experience first, making qualification evaluation fast and objective.'
              }
            },
            {
              '@type': 'Question',
              name: 'How far back should a reverse chronological resume go?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most professional resumes should cover the last 10 to 15 years of relevant career history. Earlier positions can be omitted or briefly summarized.'
              }
            }
          ]
        }
      ]
    }
  }),

  'references-on-resume': () => ({
    title: 'References on a Resume: Should You Include Them? (2026 Guide) | GlobeCareer',
    description: 'Learn why you should not put references on a resume, how to create a professional standalone reference sheet, and copy email request templates.',
    canonicalPath: '/references-on-resume',
    ogType: 'article',
    keywords: [
      'references on resume',
      'how to list references on a resume',
      'should you put references on a resume',
      'references available upon request',
      'resume reference sheet',
      'reference page template'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'References on a Resume: Best Practices, Etiquette & Reference Sheet',
          description: 'Comprehensive analysis on why modern resumes omit references, with instructions on formatting a standalone reference sheet and reference email etiquette.',
          url: `${BASE_DOMAIN}/references-on-resume`
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Should you put references on a resume?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. References take up valuable resume space, expose referees\' private contact details, and are only needed at the final interview/offer stage.'
              }
            },
            {
              '@type': 'Question',
              name: 'Should I write "References available upon request"?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Employers already assume references are available upon request. Writing this phrase is outdated and wastes a line of resume space.'
              }
            }
          ]
        }
      ]
    }
  }),

  'objective-generator': () => ({
    title: 'Free Resume Objective Generator – Entry-Level & Career Change ATS Objectives | GlobeCareer',
    description: 'Create tailored, ATS-friendly resume objectives for entry-level jobs, internships, recent college grads, and career pivots. Free instant generation with proven formulas.',
    canonicalPath: '/resume-objective-generator',
    ogType: 'website',
    keywords: [
      'resume objective generator',
      'free resume objective generator',
      'career objective generator',
      'entry level resume objective',
      'student resume objective generator',
      'ats resume objective'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'GlobeCareer Resume Objective Generator',
          url: `${BASE_DOMAIN}/resume-objective-generator`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
          description: 'Interactive resume objective generator engineered for entry-level candidates, students, and career changers.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the difference between a resume summary and a resume objective?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A resume summary highlights past achievements and quantifiable metrics for experienced professionals (3+ years). A resume objective focuses on transferable skills, education, and the future value an entry-level candidate or career changer will deliver to the employer.'
              }
            },
            {
              '@type': 'Question',
              name: 'How long should a resume objective be?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A resume objective should be 2 to 3 concise sentences (30 to 50 words) that state the target role, core hard skills or degree, and the specific value offered to the company.'
              }
            }
          ]
        }
      ]
    }
  }),

  'phrase-generator': () => ({
    title: 'Free Resume Phrase Generator – 80+ Power Action Phrases | GlobeCareer',
    description: 'Generate high-impact, quantifiable resume phrases and action statements across leadership, engineering, sales, analytics, and operations. 100% free.',
    canonicalPath: '/resume-phrase-generator',
    ogType: 'website',
    keywords: [
      'resume phrase generator',
      'resume action phrases',
      'power phrases for resume',
      'resume bullet point generator',
      'professional phrases for resume',
      'quantifiable resume statements'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'GlobeCareer Resume Phrase Generator',
          url: `${BASE_DOMAIN}/resume-phrase-generator`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
          description: 'Interactive phrase generator that transforms passive duties into high-impact, quantifiable accomplishment statements for resumes.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Why should I avoid writing "Responsible for" on my resume?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '"Responsible for" merely recites your basic job description rather than your accomplishments. High-impact action phrases lead with powerful past-tense verbs (e.g. Spearheaded, Engineered, Accelerated) and include quantifiable business outcomes.'
              }
            },
            {
              '@type': 'Question',
              name: 'How do I quantify accomplishments if my role didn\'t have sales numbers?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'You can quantify scale, frequency, team size, time savings, volume processed, or adoption rates (e.g., "mentored 5 junior engineers", "shortened weekly reporting from 8 hours to 2 hours", "managed $250k budget").'
              }
            }
          ]
        }
      ]
    }
  }),

  'ats-maker': () => ({
    title: 'Free ATS Resume Maker – Build Applicant Tracking System-Proof CVs | GlobeCareer',
    description: 'Create an ATS-proof resume guaranteed to parse cleanly into Workday, Taleo, Greenhouse, and Lever. Single-column templates with instant PDF & Word export.',
    canonicalPath: '/ats-resume-maker',
    ogType: 'website',
    keywords: [
      'ats resume maker',
      'ats cv maker',
      'ats friendly resume maker',
      'applicant tracking system resume builder',
      'workday resume format',
      'free ats resume builder'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'GlobeCareer ATS Resume Maker',
          url: `${BASE_DOMAIN}/ats-resume-maker`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
          description: 'Specialized single-column ATS resume maker engineered to achieve 100% parsing fidelity across enterprise Applicant Tracking Systems.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What makes a resume ATS compliant?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'An ATS-compliant resume utilizes a single-column layout, standard section titles (Work Experience, Education, Skills), machine-readable dates (MM/YYYY), selectable vector text, and zero floating text boxes or multi-column tables.'
              }
            },
            {
              '@type': 'Question',
              name: 'Does an ATS reject resumes automatically?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'ATS platforms do not reject candidates on their own. They parse the text, index skills and tenure, and rank candidates based on keyword match to the job description. Parsing errors cause candidates to rank near the bottom where recruiters seldom look.'
              }
            }
          ]
        }
      ]
    }
  }),

  'resume-map': () => ({
    title: 'Online Resume Map – Global CV & Hiring Standards Across 47 Countries | GlobeCareer',
    description: 'Explore interactive international CV standards across 47 countries. Compare photo rules, US Letter vs A4 paper sizes, and regional hiring regulations.',
    canonicalPath: '/resume-map',
    ogType: 'website',
    keywords: [
      'resume map online',
      'map resume online',
      'online resume map',
      'global resume map',
      'international cv standards map',
      'world cv requirements'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          name: 'GlobeCareer Online Resume Map',
          url: `${BASE_DOMAIN}/resume-map`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All',
          description: 'Interactive global map and comparative matrix of international resume and CV standards across 47 countries.',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Which countries strictly prohibit photos on resumes?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Photos are strictly discouraged in the United States (EEOC guidelines), United Kingdom (Equality Act 2010), Canada (Human Rights Act), Australia, and Ireland to avoid unconscious bias claims.'
              }
            },
            {
              '@type': 'Question',
              name: 'Which countries require a professional photo on a CV?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Professional photos are standard and customary in Germany (Lebenslauf), Austria, Switzerland, France, Japan (Rirekisho), and commonly expected across the Middle East (UAE, Saudi Arabia, Qatar).'
              }
            }
          ]
        }
      ]
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
