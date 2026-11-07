import { TemplateId } from '../../types/resume';

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  category: 'no-photo' | 'photo';
  bestFor: string;
  description: string;
  columns: 1 | 2;
  atsCompliant: boolean;
}

export const TEMPLATES: TemplateInfo[] = [
  // NO PHOTO TEMPLATES
  {
    id: 'ats_classic',
    name: 'ATS Classic Clean',
    category: 'no-photo',
    bestFor: 'United States, UK, Canada, Australia, Ireland',
    description: 'A single-column layout optimized for 100% ATS parsing fidelity. Standard section headings and clean hierarchy.',
    columns: 1,
    atsCompliant: true
  },
  {
    id: 'ivy_compact',
    name: 'Ivy League Compact',
    category: 'no-photo',
    bestFor: 'Finance, Consulting, Law, Tech, US Corporate',
    description: 'High-density, single-column design with distinguished serif headings and compact line spacing for strict 1-page limits.',
    columns: 1,
    atsCompliant: true
  },
  {
    id: 'uk_corporate',
    name: 'UK Standard 2-Pager',
    category: 'no-photo',
    bestFor: 'United Kingdom, Commonwealth, Ireland',
    description: 'Strictly structured two-page British format with Personal Profile, chronological career history, and references statement.',
    columns: 1,
    atsCompliant: true
  },
  {
    id: 'nordic_minimal',
    name: 'Nordic Minimalist',
    category: 'no-photo',
    bestFor: 'Sweden, Norway, Denmark, Finland, Tech Startups',
    description: 'Airy, disciplined Scandinavian typography with hairline dividers, team-oriented achievements, and quiet aesthetic restraint.',
    columns: 1,
    atsCompliant: true
  },
  {
    id: 'tech_modern',
    name: 'Tech & Engineering',
    category: 'no-photo',
    bestFor: 'Software Engineers, DevOps, Data Scientists, Web Developers',
    description: 'Modern technical resume with categorized competencies, GitHub and project links, and quantifiable metric callouts.',
    columns: 2,
    atsCompliant: true
  },

  // PHOTO TEMPLATES
  {
    id: 'european_modern',
    name: 'Continental European (Lebenslauf)',
    category: 'photo',
    bestFor: 'Germany, Austria, Switzerland, Poland, Czechia, EU',
    description: 'Traditional tabular Lebenslauf layout featuring a professional application photo, date/place of birth, and language proficiency grid.',
    columns: 2,
    atsCompliant: true
  },
  {
    id: 'executive_photo',
    name: 'Global Executive Headshot',
    category: 'photo',
    bestFor: 'UAE, Qatar, Saudi Arabia, Singapore, France, Executive C-Suite',
    description: 'Prominent header photo styling with executive summary, visa/work eligibility status, and international leadership metrics.',
    columns: 1,
    atsCompliant: true
  },
  {
    id: 'creative_showcase',
    name: 'Creative Studio & Portfolio',
    category: 'photo',
    bestFor: 'Graphic Design, Marketing, Hospitality, Architecture',
    description: 'Distinctive sidebar layout with photo portrait, visual skill indicators, language proficiencies, and project showcases.',
    columns: 2,
    atsCompliant: false
  }
];

export function getTemplateById(id: TemplateId): TemplateInfo {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
}
