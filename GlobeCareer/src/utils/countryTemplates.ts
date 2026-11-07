import { TemplateId } from '../types/resume';
import { CountryConfig } from '../types/country';
import { getCountryById } from '../data/countries';
import { TEMPLATES, TemplateInfo, getTemplateById } from '../components/templates/TemplateList';

export interface CountryTemplateRecommendation {
  templateId: TemplateId;
  template: TemplateInfo;
  country: CountryConfig;
  rationale: string;
  formattingNotes: {
    photoRuleText: string;
    photoIsStandard: boolean;
    paperSizeText: string;
    dateFormatText: string;
    typicalLengthText: string;
    terminologyText: string;
    hiringHighlights: string[];
    governingRuleOrLaw: string;
  };
}

/**
 * Mapping table of specialized country template recommendations
 */
const COUNTRY_TEMPLATE_MAP: Record<string, { templateId: TemplateId; rationale: string; governingRuleOrLaw: string }> = {
  // North America
  us: {
    templateId: 'ats_classic',
    rationale: 'Engineered for US ATS parsing and strict EEOC anti-discrimination compliance: clean single-column hierarchy, no headshot photo, standard section headings, and quantifiable achievement metrics.',
    governingRuleOrLaw: 'US EEOC (Equal Employment Opportunity Commission) Pre-Employment Guidelines'
  },
  ca: {
    templateId: 'ats_classic',
    rationale: 'Fully compliant with Canadian Human Rights Act standards: blind-screening single-column ATS architecture, zero headshot or SIN, Letter size, and dedicated prominence for achievements and volunteer experience.',
    governingRuleOrLaw: 'Canadian Human Rights Act & Job Bank Canada Standards'
  },

  // United Kingdom & Commonwealth
  uk: {
    templateId: 'uk_corporate',
    rationale: 'Built to standard British recruitment conventions: structured 2-page Curriculum Vitae format with Personal Profile summary, reverse-chronological career history, and standard references declaration.',
    governingRuleOrLaw: 'UK Equality Act 2010 & British Hiring Conventions'
  },
  au: {
    templateId: 'uk_corporate',
    rationale: 'Tailored for Australian employment practices: comprehensive 2 to 3 page Commonwealth layout with detailed organizational scope, Fair Work Act blind screening (no photo), and formal referees section.',
    governingRuleOrLaw: 'Fair Work Act 2009 & Workforce Australia Guidelines'
  },
  nz: {
    templateId: 'uk_corporate',
    rationale: 'Aligned with New Zealand employment norms: chronological 2-page CV structure, no photo to uphold Human Rights Act compliance, and clear professional referee statements.',
    governingRuleOrLaw: 'Careers New Zealand & Employment New Zealand Standards'
  },
  ie: {
    templateId: 'uk_corporate',
    rationale: 'Strictly complies with Irish Employment Equality Acts: standard 2-page European English CV, no headshot, and concise personal statement.',
    governingRuleOrLaw: 'Irish Employment Equality Acts (WRC)'
  },
  za: {
    templateId: 'uk_corporate',
    rationale: 'Traditional South African Curriculum Vitae architecture: structured career milestones, comprehensive contact detail, and formal referee verification.',
    governingRuleOrLaw: 'South African Department of Employment and Labour'
  },

  // DACH & Continental Europe (Photo Customary)
  de: {
    templateId: 'european_modern',
    rationale: 'Traditional German tabular Lebenslauf layout: designated placement for a professional Bewerbungsfoto, chronological date-range milestones, A4 sizing, and standardized language proficiency grading.',
    governingRuleOrLaw: 'German Bundesagentur für Arbeit Standards (Allgemeines Gleichbehandlungsgesetz)'
  },
  at: {
    templateId: 'european_modern',
    rationale: 'Authentic Austrian Lebenslauf formatting: professional portrait headshot, chronological tabular history, and comprehensive educational credentials.',
    governingRuleOrLaw: 'Austrian AMS (Arbeitsmarktservice) Curriculum Vitae Guidelines'
  },
  ch: {
    templateId: 'european_modern',
    rationale: 'Swiss corporate standard: clean 2-page tabular layout with high-quality photo, residence permit category (e.g. C/B/G Permit), and multilingual fluency indicators.',
    governingRuleOrLaw: 'Swiss SECO / Treffpunkt-Arbeit Standards'
  },

  // Southern & Western Europe
  pt: {
    templateId: 'european_modern',
    rationale: 'Conforms to Portuguese recruitment customs (IEFP): professional portrait headshot, A4 paper size, structured European chronology, language proficiency grid, and residency/work authorization disclosures.',
    governingRuleOrLaw: 'IEFP (Instituto do Emprego e Formação Profissional) Guidelines'
  },
  es: {
    templateId: 'european_modern',
    rationale: 'Standard Spanish Currículum Vitae: professional headshot photo, reverse-chronological milestones, and clear presentation of idiomas (languages) and NIE/work rights.',
    governingRuleOrLaw: 'SEPE (Servicio Público de Empleo Estatal) Standards'
  },
  it: {
    templateId: 'european_modern',
    rationale: 'Italian standard Curriculum Vitae: professional photograph, reverse-chronological trajectory, language proficiencies, and privacy authorization clause compliance.',
    governingRuleOrLaw: 'Italian ANPAL & GDPR Privacy Standards'
  },
  fr: {
    templateId: 'european_modern',
    rationale: 'Classic French CV structure: professional photo placement, compact chronological career trajectory, French/English language ratings, and clear French contact formatting.',
    governingRuleOrLaw: 'France Travail (Pôle Emploi) Hiring Standards'
  },
  nl: {
    templateId: 'european_modern',
    rationale: 'Modern Dutch Curriculum Vitae: clean two-column layout with optional professional headshot, clear technical skills, and language competencies.',
    governingRuleOrLaw: 'UWV (Uitvoeringsinstituut Werknemersverzekeringen) Guidelines'
  },
  be: {
    templateId: 'european_modern',
    rationale: 'Belgian bilingual CV layout: accommodates multi-language proficiencies (Dutch, French, English), optional photo, and reverse-chronological career history.',
    governingRuleOrLaw: 'Actiris & Forem Belgian Employment Standards'
  },
  lu: {
    templateId: 'european_modern',
    rationale: 'Multilingual Luxembourg CV format: designed for trilingual candidate profiles with photo portrait, cross-border commuter status, and international credentials.',
    governingRuleOrLaw: 'ADEM Luxembourg Employment Agency'
  },
  gr: {
    templateId: 'european_modern',
    rationale: 'Traditional Greek CV architecture: professional photograph, military service status disclosure, and reverse-chronological academic and work milestones.',
    governingRuleOrLaw: 'DYPA (Greek Public Employment Service)'
  },

  // Central & Eastern Europe
  pl: {
    templateId: 'european_modern',
    rationale: 'Standard Polish CV format: includes professional photograph, contact demographics, and dedicated footer space for the mandatory Polish RODO/GDPR consent clause.',
    governingRuleOrLaw: 'Polish Labor Code (Kodeks Pracy) & RODO Requirements'
  },
  cz: {
    templateId: 'european_modern',
    rationale: 'Czech Životopis standard: structured two-column European format with professional headshot, language ratings, and chronological experience.',
    governingRuleOrLaw: 'Czech Republic Employment Agency (Úřad práce ČR)'
  },
  sk: {
    templateId: 'european_modern',
    rationale: 'Slovak Životopis: structured European format with professional photo, technical proficiencies, and education credentials.',
    governingRuleOrLaw: 'Central Office of Labour, Social Affairs and Family (ÚPSVaR)'
  },
  hu: {
    templateId: 'european_modern',
    rationale: 'Hungarian Önéletrajz layout: professional photograph, chronological career progression, and detailed language knowledge indicators.',
    governingRuleOrLaw: 'National Employment Service (NFSZ Hungary)'
  },
  ro: {
    templateId: 'european_modern',
    rationale: 'Romanian CV format: European standard with portrait photo, language proficiencies, and reverse-chronological work history.',
    governingRuleOrLaw: 'ANOFM (Agenția Națională pentru Ocuparea Forței de Muncă)'
  },
  bg: {
    templateId: 'european_modern',
    rationale: 'Bulgarian European CV: structured career milestones, professional photograph, and language proficiencies.',
    governingRuleOrLaw: 'Bulgarian Employment Agency (Агенция по заетостта)'
  },
  hr: {
    templateId: 'european_modern',
    rationale: 'Croatian Životopis layout: professional photo placement, structured education and experience, and language indicators.',
    governingRuleOrLaw: 'HZZ (Hrvatski zavod za zapošljavanje)'
  },
  si: {
    templateId: 'european_modern',
    rationale: 'Slovenian Življenjepis: clean two-column European structure with professional photo and comprehensive skill categorization.',
    governingRuleOrLaw: 'ZRSZ (Zavod Republike Slovenije za zaposlovanje)'
  },

  // Nordic & Baltic (Minimalist, egalitarian, no-clutter)
  se: {
    templateId: 'nordic_minimal',
    rationale: 'Scandinavian aesthetic restraint: clean Nordic typography, hairline section separators, team-oriented achievements, and balanced egalitarian structure without visual clutter.',
    governingRuleOrLaw: 'Arbetsförmedlingen (Swedish Public Employment Service)'
  },
  no: {
    templateId: 'nordic_minimal',
    rationale: 'Norwegian CV design: disciplined typography, egalitarian team achievements, concise layout, and clear competence listing.',
    governingRuleOrLaw: 'NAV (Norwegian Labour and Welfare Administration)'
  },
  dk: {
    templateId: 'nordic_minimal',
    rationale: 'Danish CV format: clean Scandinavian structure emphasizing collaborative impact, project deliverables, and straightforward competence matrix.',
    governingRuleOrLaw: 'Danish Jobnet / Styrelsen for Arbejdsmarked og Rekruttering'
  },
  fi: {
    templateId: 'nordic_minimal',
    rationale: 'Finnish Ansioluettelo: minimalist typography, precise technical and analytical competencies, and factual reverse-chronological history.',
    governingRuleOrLaw: 'TE Services (Työ- ja elinkeinopalvelut Finland)'
  },
  is: {
    templateId: 'nordic_minimal',
    rationale: 'Icelandic Ferilskrá: clean Scandinavian typography, concise factual career timeline, and project overview.',
    governingRuleOrLaw: 'Vinnumálastofnun (Directorate of Labour Iceland)'
  },
  ee: {
    templateId: 'nordic_minimal',
    rationale: 'Baltic digital economy CV: modern minimalist layout highlighting digital skillsets, international project experience, and languages.',
    governingRuleOrLaw: 'Töötukassa (Estonian Unemployment Insurance Fund)'
  },
  lv: {
    templateId: 'nordic_minimal',
    rationale: 'Latvian CV format: concise typography, clear educational qualifications, and structured work chronology.',
    governingRuleOrLaw: 'NVA (State Employment Agency of Latvia)'
  },
  lt: {
    templateId: 'nordic_minimal',
    rationale: 'Lithuanian CV layout: minimalist typography, structured professional experience, and language proficiencies.',
    governingRuleOrLaw: 'Užimtumo tarnyba (Lithuanian Employment Service)'
  },

  // Middle East & Gulf
  ae: {
    templateId: 'executive_photo',
    rationale: 'Optimized for UAE executive and multinational hiring: prominent professional headshot, clear visa/work authorization status (Golden Visa, residence), and international executive accomplishments.',
    governingRuleOrLaw: 'MOHRE (Ministry of Human Resources & Emiratisation UAE)'
  },
  sa: {
    templateId: 'executive_photo',
    rationale: 'Designed for Saudi Arabian corporate recruitment: executive headshot styling, Iqama transferability status, and quantifiable project and leadership milestones.',
    governingRuleOrLaw: 'Ministry of Human Resources and Social Development Saudi Arabia'
  },
  qa: {
    templateId: 'executive_photo',
    rationale: 'Tailored for Qatar multinational hiring: executive portrait headshot, visa/NOC status notation, and international career credentials.',
    governingRuleOrLaw: 'Ministry of Labour State of Qatar'
  },

  // Asia
  jp: {
    templateId: 'european_modern',
    rationale: 'Matches Japanese recruitment expectations (Shokumu-keirekisho): formal professional portrait photo, chronological milestones, and comprehensive academic and employment timeline.',
    governingRuleOrLaw: 'Hello Work (Ministry of Health, Labour and Welfare Japan)'
  },
  sg: {
    templateId: 'ats_classic',
    rationale: 'Complies with Singapore TAFEP fair employment guidelines: single-column merit-based ATS architecture without age or marital bias, highlighting verifiable career achievements.',
    governingRuleOrLaw: 'TAFEP (Tripartite Alliance for Fair & Progressive Employment Practices)'
  },
  in: {
    templateId: 'ats_classic',
    rationale: 'Standard Indian IT & corporate recruitment format: high-density ATS-optimized single column with technical competencies, project metrics, and academic qualifications.',
    governingRuleOrLaw: 'Ministry of Skill Development & NASSCOM Hiring Standards'
  }
};

/**
 * Get the single most suitable recommended template and country-specific formatting details
 */
export function getCountryTemplateRecommendation(countryId: string): CountryTemplateRecommendation {
  const country = getCountryById(countryId);
  const mapping = COUNTRY_TEMPLATE_MAP[country.id] || {
    templateId: country.photoRule === 'discouraged' ? 'ats_classic' : 'european_modern',
    rationale: `Tailored to ${country.name} hiring conventions and ${country.cvTerminology} guidelines.`,
    governingRuleOrLaw: `${country.name} Employment Standards`
  };

  const template = getTemplateById(mapping.templateId);

  // Formatting notes
  const photoIsStandard = country.photoRule === 'standard' || country.photoRule === 'recommended';
  let photoRuleText = 'No Photo (Anti-Bias / Blind Screening)';
  if (country.photoRule === 'standard') {
    photoRuleText = `Photo Customary (${country.name} Standard)`;
  } else if (country.photoRule === 'recommended') {
    photoRuleText = 'Photo Recommended for Recruiter Review';
  } else if (country.photoRule === 'optional') {
    photoRuleText = 'Photo Optional (Candidate Discretion)';
  } else {
    photoRuleText = 'No Photo (Blind Screening Standard)';
  }

  const paperSizeText = country.paperSize === 'letter' ? 'US Letter (8.5 × 11 in)' : 'ISO A4 (210 × 297 mm)';
  const dateFormatText = country.dateConvention;
  const typicalLengthText = country.standardLength;
  const terminologyText = country.cvTerminology;

  // Tailored hiring highlights
  const hiringHighlights = country.keyHiringNuances && country.keyHiringNuances.length > 0
    ? country.keyHiringNuances.slice(0, 3)
    : [
        `Follows ${country.name} ${country.cvTerminology} formatting conventions`,
        `Formatted on standard ${country.paperSize.toUpperCase()} dimensions`,
        `Adheres to national recruitment and data privacy guidelines`
      ];

  return {
    templateId: mapping.templateId,
    template,
    country,
    rationale: mapping.rationale,
    formattingNotes: {
      photoRuleText,
      photoIsStandard,
      paperSizeText,
      dateFormatText,
      typicalLengthText,
      terminologyText,
      hiringHighlights,
      governingRuleOrLaw: mapping.governingRuleOrLaw
    }
  };
}
