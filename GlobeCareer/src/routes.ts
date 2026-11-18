import { ROLE_EXAMPLES, getRoleExample, getRoleExamplePath } from './data/roleExamples';

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
