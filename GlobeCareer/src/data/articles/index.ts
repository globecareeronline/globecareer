import type { Article } from './types';
import { EUROPEAN_CV_ARTICLES } from './european-cv';
import { QUALIFICATION_ARTICLES } from './qualifications';
import { APPLICATION_ARTICLES } from './applications';

/**
 * The guide library.
 *
 * Every article URL, sitemap entry and prerendered page is derived from this
 * array, so adding an article here is the only step needed for it to exist on
 * the site. Routes, SEO metadata and structured data are generated, never
 * duplicated by hand.
 */

export const BLOG_PATH = '/blog';

export const ARTICLES: Article[] = [
  ...EUROPEAN_CV_ARTICLES,
  ...QUALIFICATION_ARTICLES,
  ...APPLICATION_ARTICLES,
].sort((a, b) => (a.published === b.published ? a.slug.localeCompare(b.slug) : b.published.localeCompare(a.published)));

const BY_SLUG = new Map(ARTICLES.map((article) => [article.slug, article]));

export function getArticle(slug: string): Article | undefined {
  return BY_SLUG.get(slug);
}

export function getArticlePath(slug: string): string {
  return `${BLOG_PATH}/${slug}`;
}

/** Every article URL, consumed by the prerenderer and the sitemap generator. */
export function getArticlePaths(): string[] {
  return ARTICLES.map((article) => getArticlePath(article.slug));
}

/** Articles related to the given slug, resolved and filtered to real entries. */
export function getRelatedArticles(slug: string): Article[] {
  const article = getArticle(slug);
  if (!article) return [];
  return article.related
    .filter((related) => related !== slug)
    .map((related) => getArticle(related))
    .filter((related): related is Article => Boolean(related));
}

export type { Article, ArticleSection, ArticleFaq, ArticleCluster } from './types';
export { CLUSTER_LABELS } from './types';
