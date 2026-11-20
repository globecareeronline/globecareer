import { ROLE_EXAMPLES, getRoleExample, getRoleExamplePath } from './data/roleExamples';
import { getArticle, getArticlePaths } from './data/articles';

/**
 * Role-level resume example routes.
 *
 * These live under the existing /resume-examples hub (a sub-path, not a new
 * top-level URL family) so the hub keeps its authority and the role pages stay
 * one click away from it.
 */
export const ROLE_PATH_PREFIX = '/resume-examples/';

export const ROLE_PATH_PATTERN = /^\/resume-examples\/([a-z0-9-]+)$/;

/** Returns the known role slug for a /resume-examples/:slug path, else null. */
export function matchRolePath(pathname: string): string | null {
  const match = pathname.match(ROLE_PATH_PATTERN);
  if (!match) return null;
  return getRoleExample(match[1]) ? match[1] : null;
}

/** Every role example URL, used by the prerenderer and the sitemap check. */
export function getRolePaths(): string[] {
  return ROLE_EXAMPLES.map((role) => getRoleExamplePath(role.slug));
}

/**
 * Guide article routes.
 *
 * One page key ('article') serves the whole library; the slug is resolved from
 * the URL and validated against the article data, so an unknown slug falls
 * through to the normal 404 path instead of rendering an empty page.
 */
export const BLOG_PATH = '/blog';

export const ARTICLE_PATH_PATTERN = /^\/blog\/([a-z0-9-]+)$/;

/** Returns the known article slug for a /blog/:slug path, else null. */
export function matchArticlePath(pathname: string): string | null {
  const match = pathname.match(ARTICLE_PATH_PATTERN);
  if (!match) return null;
  return getArticle(match[1]) ? match[1] : null;
}

/** Every indexable guide URL: the index plus each article. */
export function getGuidePaths(): string[] {
  return [BLOG_PATH, ...getArticlePaths()];
}
