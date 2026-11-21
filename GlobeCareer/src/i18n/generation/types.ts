import { DEFAULT_SECTION_TITLE_EN } from '../outputLanguages';

export type SectionId =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'projects'
  | 'languages'
  | 'references'
  | 'volunteer'
  | 'interests';

export type ProfileTone = 'professional' | 'executive' | 'creative' | 'friendly' | 'academic';

/**
 * A generation pack holds sentence *frames*, not finished prose. Each frame is
 * written natively for its language and filled with the user's own facts, so
 * the output is produced in the selected language rather than translated
 * afterwards. Placeholders use `{name}` syntax and are resolved by `fill()`.
 */
export interface OutputCopy {
  headings: Record<SectionId, string>;

  /**
   * Defaults used when a tool's own English placeholder text is still in the
   * field: the letter generators must not paste English sample sentences into a
   * document written in another language.
   */
  defaults: {
    strengths: string;
    gratitude: string;
    transition: string;
  };

  profile: {
    atCompany: string;
    expYears: string;
    expDefault: string;
    skillsDefault: string;
    tone: Record<ProfileTone, string>;
    shortFirst: string;
    shortThird: string;
    mediumFirst: string;
    mediumThird: string;
    extended: string;
    achievementLead: string;
    educationLead: string;
  };

  summary: {
    metrics: string;
    leadership: string;
    concise: string;
    objective: string;
  };

  letter: {
    salutation: string;
    signoff: string;
    subject: string;
    opening: string;
    body: string;
    closing: string;
  };

  resignation: {
    salutation: string;
    signoff: string;
    twoWeeks: string;
    shortNotice: string;
    immediate: string;
    relocation: string;
    retirement: string;
    closing: string;
  };

  recommendation: {
    salutation: string;
    signoff: string;
    opening: string;
    skills: string;
    achievements: string;
    character: string;
    closing: string;
  };

  email: {
    greeting: string;
    subject: string;
    intro: string;
    value: string;
    request: string;
    attachment: string;
    signoff: string;
  };

  bullets: {
    verbFirst: string;
    metricFirst: string;
    methodFirst: string;
    concise: string;
  };
}

export type CopyVars = Record<string, string | number | undefined>;

/** Replaces `{placeholder}` tokens; unknown tokens are left untouched. */
export function fill(template: string, vars: CopyVars): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = vars[key];
    return value === undefined || value === null ? match : String(value);
  });
}

/**
 * Every English title the app itself writes into `sectionsOrder`. A stored title
 * that matches one of these is an untouched default and is therefore rendered
 * in the output language; anything else is the user's own wording and is kept.
 */
export const SECTION_TITLE_ALIASES_EN: Record<string, string[]> = {
  summary: ['Professional Summary', 'Profile Summary', 'Summary'],
  experience: ['Work Experience', 'Professional Experience', 'Experience'],
  education: ['Education', 'Education & Qualifications', 'Education and Qualifications'],
  skills: [
    'Skills & Competencies',
    'Key Competencies & Skills',
    'Key Skills',
    'Key Skills & Competencies',
    'Skills',
  ],
  certifications: ['Certifications', 'Certifications & Licenses', 'Certifications & Accreditations'],
  projects: ['Projects', 'Key Projects'],
  languages: ['Languages'],
  references: ['References'],
  volunteer: ['Volunteer & Community Leadership', 'Volunteer Experience'],
  interests: ['Interests'],
};

/**
 * Resolves a resume section heading. A title the user renamed is preserved
 * verbatim; an untouched default is rendered in the output language.
 */
export function localizeSectionTitle(
  id: string,
  storedTitle: string | undefined,
  headings: Partial<Record<SectionId, string>>
): string | undefined {
  const englishDefault = DEFAULT_SECTION_TITLE_EN[id];
  const localized = headings[id as SectionId];
  if (!localized) return storedTitle || englishDefault;
  if (!storedTitle) return localized;
  const stored = storedTitle.trim().toLowerCase();
  const aliases = SECTION_TITLE_ALIASES_EN[id] || (englishDefault ? [englishDefault] : []);
  if (aliases.some((alias) => alias.trim().toLowerCase() === stored)) {
    return localized;
  }
  return storedTitle;
}
