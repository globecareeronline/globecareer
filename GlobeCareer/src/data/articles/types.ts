/**
 * Shared types for the GlobeCareer guide/article library.
 *
 * Articles are plain structured data rather than one component per page: the
 * route, the SEO metadata, the JSON-LD, the sitemap entry and the prerendered
 * HTML are all derived from these objects, so an article cannot drift out of
 * sync with the page that renders it.
 */

export type ArticleCluster = 'european-cv' | 'qualifications' | 'applications';

export type ArticleIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';

export interface ArticleTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface ArticleCallout {
  title: string;
  body: string;
  tone?: 'info' | 'warning' | 'tip';
}

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs?: string[];
  /** Body copy that belongs after the table or callout in the same section. */
  paragraphsAfter?: string[];
  bullets?: string[];
  steps?: string[];
  table?: ArticleTable;
  callout?: ArticleCallout;
}

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface ArticleCta {
  heading: string;
  body: string;
  label: string;
  /** Tool page the CTA opens. Resolved to a real URL by PAGE_TO_PATH. */
  page: string;
}

export interface Article {
  slug: string;
  cluster: ArticleCluster;
  /** The visible <h1> of the article. */
  h1: string;
  /** <title> tag. Kept distinct from the h1 so neither reads as keyword stuffing. */
  seoTitle: string;
  description: string;
  primaryKeyword: string;
  keywords: string[];
  intent: ArticleIntent;
  published: string;
  updated: string;
  readingMinutes: number;
  keyTakeaways: string[];
  intro: string[];
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  related: string[];
  cta: ArticleCta;
}

export const CLUSTER_LABELS: Record<ArticleCluster, string> = {
  'european-cv': 'European CV formats',
  qualifications: 'Qualifications & frameworks',
  applications: 'Applications & mobility',
};
