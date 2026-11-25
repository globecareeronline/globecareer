/**
 * Resolution rules for the Polish RODO privacy clause.
 *
 * The builder inserts a default Polish clause when Poland is selected. The
 * candidate must be able to clear it completely and have that choice stick, so
 * only an *undefined* value falls back to the default; an empty or
 * whitespace-only string means "no clause".
 */
export const resolveGdprClause = (
  value: string | undefined,
  defaultText?: string
): string => value ?? defaultText ?? '';

export const shouldRenderGdprClause = (value: string | undefined): boolean =>
  typeof value === 'string' && value.trim().length > 0;
