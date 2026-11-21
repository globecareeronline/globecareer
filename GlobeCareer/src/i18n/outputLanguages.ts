/**
 * Output Language registry.
 *
 * This is the language of the *generated document* (CV headings, cover letters,
 * bios, emails, bullets), which is deliberately independent of the website UI
 * language in LanguageContext. A visitor browsing the site in English may still
 * need a Spanish CV, and the site must never infer the document language from
 * their location.
 *
 * Only languages that actually have a complete generation pack are listed here:
 * the selector must never offer a language the generators cannot produce.
 */

export type OutputLanguageCode =
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'it'
  | 'pt'
  | 'nl'
  | 'pl'
  | 'ro'
  | 'tr'
  | 'el'
  | 'ar';

export interface OutputLanguageInfo {
  code: OutputLanguageCode;
  /** English name, e.g. "Spanish". */
  name: string;
  /** Endonym, e.g. "Español". */
  nativeName: string;
  rtl?: boolean;
  /** Intl locale used for dates inside generated documents. */
  locale: string;
}

export const OUTPUT_LANGUAGES: OutputLanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', locale: 'en-US' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', locale: 'es-ES' },
  { code: 'fr', name: 'French', nativeName: 'Français', locale: 'fr-FR' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', locale: 'de-DE' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', locale: 'it-IT' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', locale: 'pt-PT' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', locale: 'nl-NL' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', locale: 'pl-PL' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', locale: 'ro-RO' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', locale: 'tr-TR' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', locale: 'el-GR' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true, locale: 'ar-AE' },
];

export const DEFAULT_OUTPUT_LANGUAGE: OutputLanguageCode = 'en';

export const OUTPUT_LANGUAGE_STORAGE_KEY = 'globecareer_output_language';

export function getOutputLanguage(code?: string | null): OutputLanguageInfo {
  const found = OUTPUT_LANGUAGES.find((l) => l.code === code);
  return found || OUTPUT_LANGUAGES[0];
}

export function isOutputLanguage(code?: string | null): code is OutputLanguageCode {
  return Boolean(code && OUTPUT_LANGUAGES.some((l) => l.code === code));
}

export function isRtlOutputLanguage(code?: string | null): boolean {
  return Boolean(getOutputLanguage(code).rtl);
}

/**
 * Languages offered for each of the 47 supported countries, national language
 * first. Countries whose national language does not yet have a generation pack
 * fall back to English only, which is still an explicit user choice rather than
 * an automatic decision.
 */
export const COUNTRY_OUTPUT_LANGUAGES: Record<string, OutputLanguageCode[]> = {
  us: ['en'],
  ca: ['en', 'fr'],
  uk: ['en'],
  au: ['en'],
  nz: ['en'],
  de: ['de'],
  fr: ['fr'],
  nl: ['nl'],
  ie: ['en'],
  it: ['it'],
  es: ['es'],
  pt: ['pt'],
  pl: ['pl'],
  se: ['en'],
  no: ['en'],
  dk: ['en'],
  fi: ['en'],
  ch: ['de', 'fr', 'it'],
  at: ['de'],
  be: ['nl', 'fr'],
  lu: ['fr', 'de'],
  cz: ['en'],
  sk: ['en'],
  hu: ['en'],
  ro: ['ro'],
  bg: ['en'],
  gr: ['el'],
  hr: ['en'],
  si: ['en'],
  ee: ['en'],
  lv: ['en'],
  lt: ['en'],
  is: ['en'],
  jp: ['en'],
  sg: ['en'],
  ae: ['ar', 'en'],
  sa: ['ar', 'en'],
  qa: ['ar', 'en'],
  za: ['en'],
  in: ['en'],
  pk: ['en'],
  bd: ['en'],
  br: ['pt'],
  tr: ['tr'],
  my: ['en'],
  id: ['en'],
  ru: ['en'],
};

/** Ordered language options for a country; English is always available. */
export function getCountryOutputLanguages(countryId?: string): OutputLanguageInfo[] {
  const codes = (countryId && COUNTRY_OUTPUT_LANGUAGES[countryId]) || ['en'];
  return codes.map((code) => getOutputLanguage(code));
}

/** Localized date for document bodies (e.g. 21 November 2026 / 21 de noviembre de 2026). */
export function formatOutputDate(date: Date, code: OutputLanguageCode): string {
  try {
    return new Intl.DateTimeFormat(getOutputLanguage(code).locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

/**
 * The English defaults the resume builder writes into `sectionsOrder`.
 *
 * A user may rename a section; when the stored title is still one of these
 * defaults it is treated as "not customized" and rendered in the output
 * language. A renamed section keeps the user's own wording.
 */
export const DEFAULT_SECTION_TITLE_EN: Record<string, string> = {
  summary: 'Professional Summary',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills & Competencies',
  certifications: 'Certifications',
  projects: 'Projects',
  languages: 'Languages',
  references: 'References',
  volunteer: 'Volunteer & Community Leadership',
  interests: 'Interests',
};
