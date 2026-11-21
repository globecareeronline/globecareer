/**
 * Shared guide navigation entries.
 *
 * The header dropdown and the footer Guides strip both read this list so the
 * navigation cannot drift from the article library: every entry resolves to a
 * real /blog/<slug> page defined in src/data/articles.
 */
export interface GuideNavLink {
  slug: string;
  /** Short label used in navigation. */
  label: string;
  /** One-line context shown in the header dropdown. */
  description: string;
}

export const GUIDE_NAV_LINKS: GuideNavLink[] = [
  {
    slug: 'european-cv-template',
    label: 'European CV Template',
    description: 'Section order, length and format rules',
  },
  {
    slug: 'europass-cv-format-explained',
    label: 'Europass CV Format',
    description: 'Structure, sections and alternatives',
  },
  {
    slug: 'eu-cv-format-vs-us-resume',
    label: 'EU CV vs US Resume',
    description: 'The differences that actually matter',
  },
  {
    slug: 'italian-cv-format',
    label: 'Italian CV Format',
    description: 'Privacy clause and photo rules',
  },
  {
    slug: 'cv-photo-europe',
    label: 'CV Photos in Europe',
    description: 'Which countries expect a photo',
  },
  {
    slug: 'eqf-levels-explained',
    label: 'EQF Levels Explained',
    description: 'The 8 levels and what they mean on a CV',
  },
  {
    slug: 'diploma-supplement-explained',
    label: 'Diploma Supplement',
    description: 'Contents, purpose and when to send it',
  },
  {
    slug: 'cover-letter-for-european-cv',
    label: 'Cover Letter for a European CV',
    description: 'Structure, tone and real openings',
  },
  {
    slug: 'job-in-switzerland',
    label: 'Jobs in Switzerland',
    description: 'Permits, CV rules and realistic steps',
  },
  {
    slug: 'eu-work-visa-us-citizens',
    label: 'Working in the EU as a US Citizen',
    description: 'Routes, permits and CV changes',
  },
];

/** Nav page key for a guide article, matching App.navigateTo('article:<slug>'). */
export function guidePageKey(slug: string): string {
  return `article:${slug}`;
}
