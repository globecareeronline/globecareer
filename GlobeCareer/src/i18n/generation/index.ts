import type { OutputLanguageCode } from '../outputLanguages';
import type { CopyVars, OutputCopy, ProfileTone, SectionId } from './types';
import { fill, localizeSectionTitle } from './types';
import { en, es, fr, it, pt } from './packs/latin';
import { de, nl, pl } from './packs/germanic';
import { ar, el, ro, tr } from './packs/other';

export type { CopyVars, OutputCopy, ProfileTone, SectionId } from './types';
export { fill, localizeSectionTitle } from './types';

export const OUTPUT_COPY: Record<OutputLanguageCode, OutputCopy> = {
  en,
  es,
  fr,
  de,
  it,
  pt,
  nl,
  pl,
  ro,
  tr,
  el,
  ar,
};

export function getCopy(language: OutputLanguageCode): OutputCopy {
  return OUTPUT_COPY[language] || OUTPUT_COPY.en;
}

export function sectionHeading(
  language: OutputLanguageCode,
  id: SectionId,
  storedTitle?: string
): string {
  const headings = getCopy(language).headings;
  return localizeSectionTitle(id, storedTitle, headings) || headings[id];
}

// ---------------------------------------------------------------------------
// Professional bio
// ---------------------------------------------------------------------------

export interface BioFacts {
  name: string;
  role: string;
  company?: string;
  years?: string;
  skills?: string;
  achievement?: string;
  education?: string;
  personal?: string;
  tone: ProfileTone;
  perspective: 'first' | 'third';
}

export function buildBio(language: OutputLanguageCode, facts: BioFacts) {
  const copy = getCopy(language);
  const p = copy.profile;
  const first = facts.name.trim().split(/\s+/)[0] || facts.name;
  const vars: CopyVars = {
    name: facts.name,
    first,
    role: facts.role,
    company: facts.company || '',
    atCompany: facts.company ? fill(p.atCompany, { company: facts.company }) : '',
    exp: facts.years ? fill(p.expYears, { years: facts.years }) : p.expDefault,
    skills: facts.skills || p.skillsDefault,
    tone: p.tone[facts.tone] || p.tone.professional,
    achievement: facts.achievement ? fill(p.achievementLead, { achievement: facts.achievement }) : '',
    education: facts.education ? fill(p.educationLead, { education: facts.education }) : '',
    personal: facts.personal || '',
  };
  const isFirst = facts.perspective === 'first';
  return {
    short: fill(isFirst ? p.shortFirst : p.shortThird, vars).replace(/\s+/g, ' ').trim(),
    medium: fill(isFirst ? p.mediumFirst : p.mediumThird, vars).replace(/\s+/g, ' ').trim(),
    extended: facts.personal
      ? `${fill(isFirst ? p.mediumFirst : p.mediumThird, vars).replace(/\s+/g, ' ').trim()} ${fill(p.extended, vars)}`.trim()
      : fill(isFirst ? p.mediumFirst : p.mediumThird, vars).replace(/\s+/g, ' ').trim(),
  };
}

// ---------------------------------------------------------------------------
// Summary / objective / headline
// ---------------------------------------------------------------------------

export type SummaryStyle = 'metrics' | 'leadership' | 'concise';

export interface SummaryFacts {
  role: string;
  years?: string;
  skills?: string;
  industry?: string;
  achievement?: string;
}

export function buildSummary(
  language: OutputLanguageCode,
  style: SummaryStyle,
  facts: SummaryFacts
): string {
  const copy = getCopy(language);
  const vars: CopyVars = {
    role: facts.role,
    years: facts.years || '',
    skills: facts.skills || copy.profile.skillsDefault,
    industry: facts.industry || '',
    achievement: facts.achievement
      ? fill(copy.profile.achievementLead, { achievement: facts.achievement })
      : '',
  };
  return fill(copy.summary[style], vars).replace(/\s+/g, ' ').trim();
}

export function buildObjective(language: OutputLanguageCode, facts: SummaryFacts): string {
  const copy = getCopy(language);
  return fill(copy.summary.objective, {
    role: facts.role,
    years: facts.years || '',
    skills: facts.skills || copy.profile.skillsDefault,
    industry: facts.industry || '',
    achievement: facts.achievement
      ? fill(copy.profile.achievementLead, { achievement: facts.achievement })
      : '',
  })
    .replace(/\s+/g, ' ')
    .trim();
}

// ---------------------------------------------------------------------------
// Cover letter
// ---------------------------------------------------------------------------

export interface CoverLetterFacts {
  role: string;
  company: string;
  skills?: string;
}

export function buildCoverLetter(language: OutputLanguageCode, facts: CoverLetterFacts) {
  const copy = getCopy(language);
  const vars: CopyVars = {
    role: facts.role,
    company: facts.company,
    skills: facts.skills || copy.profile.skillsDefault,
  };
  return {
    salutation: fill(copy.letter.salutation, vars),
    signoff: fill(copy.letter.signoff, vars),
    subject: fill(copy.letter.subject, vars),
    opening: fill(copy.letter.opening, vars),
    body: fill(copy.letter.body, vars),
    closing: fill(copy.letter.closing, vars),
  };
}

// ---------------------------------------------------------------------------
// Resignation letter
// ---------------------------------------------------------------------------

export type ResignationKind =
  | 'two_weeks'
  | 'short_notice'
  | 'immediate'
  | 'relocation'
  | 'retirement'
  | 'career_growth';

export interface ResignationFacts {
  role: string;
  company: string;
  manager: string;
  lastDay: string;
  kind: ResignationKind;
}

export function buildResignation(language: OutputLanguageCode, facts: ResignationFacts) {
  const copy = getCopy(language);
  const vars: CopyVars = {
    role: facts.role,
    company: facts.company,
    manager: facts.manager,
    lastDay: facts.lastDay,
  };
  const opening =
    facts.kind === 'immediate'
      ? copy.resignation.immediate
      : facts.kind === 'short_notice'
        ? copy.resignation.shortNotice
        : facts.kind === 'relocation'
          ? copy.resignation.relocation
          : facts.kind === 'retirement'
            ? copy.resignation.retirement
            : copy.resignation.twoWeeks;
  return {
    salutation: fill(copy.resignation.salutation, vars),
    signoff: fill(copy.resignation.signoff, vars),
    opening: fill(opening, vars),
    closing: fill(copy.resignation.closing, vars),
    /** Used instead of the tool's English sample paragraphs. */
    gratitude: copy.defaults.gratitude,
    transition: copy.defaults.transition,
  };
}

// ---------------------------------------------------------------------------
// Recommendation letter
// ---------------------------------------------------------------------------

export interface RecommendationFacts {
  candidate: string;
  targetRole: string;
  targetOrg: string;
  org: string;
  relationship: string;
  years: string;
  strengths?: string;
  achievements?: string;
  recipient: string;
}

export function buildRecommendation(language: OutputLanguageCode, facts: RecommendationFacts) {
  const copy = getCopy(language);
  const vars: CopyVars = {
    candidate: facts.candidate,
    targetRole: facts.targetRole,
    targetOrg: facts.targetOrg,
    org: facts.org,
    relationship: facts.relationship,
    years: facts.years,
    strengths: facts.strengths || getCopy(language).defaults.strengths,
    achievements: facts.achievements || '',
    recipient: facts.recipient,
  };
  return {
    salutation: fill(copy.recommendation.salutation, vars),
    signoff: fill(copy.recommendation.signoff, vars),
    opening: fill(copy.recommendation.opening, vars),
    skills: fill(copy.recommendation.skills, vars),
    achievements: facts.achievements ? fill(copy.recommendation.achievements, vars) : '',
    character: fill(copy.recommendation.character, vars),
    closing: fill(copy.recommendation.closing, vars),
  };
}

// ---------------------------------------------------------------------------
// Job application email
// ---------------------------------------------------------------------------

export interface EmailFacts {
  recipient: string;
  role: string;
  company: string;
  name: string;
  skills?: string;
}

export function buildEmail(language: OutputLanguageCode, facts: EmailFacts) {
  const copy = getCopy(language);
  const vars: CopyVars = {
    recipient: facts.recipient,
    role: facts.role,
    company: facts.company,
    name: facts.name,
    skills: facts.skills || copy.profile.skillsDefault,
  };
  return {
    greeting: fill(copy.email.greeting, vars),
    subject: fill(copy.email.subject, vars),
    intro: fill(copy.email.intro, vars),
    value: fill(copy.email.value, vars),
    request: fill(copy.email.request, vars),
    attachment: fill(copy.email.attachment, vars),
    signoff: fill(copy.email.signoff, vars),
  };
}

// ---------------------------------------------------------------------------
// Resume bullets / phrases
// ---------------------------------------------------------------------------

export interface BulletFacts {
  verb: string;
  task: string;
  metric?: string;
  method?: string;
}

export function buildBullets(language: OutputLanguageCode, facts: BulletFacts) {
  const copy = getCopy(language);
  const vars: CopyVars = {
    verb: facts.verb,
    task: facts.task,
    metric: facts.metric || '',
    method: facts.method || '',
  };
  return {
    verbFirst: fill(copy.bullets.verbFirst, vars).replace(/\s+/g, ' ').trim(),
    metricFirst: facts.metric
      ? fill(copy.bullets.metricFirst, vars).replace(/\s+/g, ' ').trim()
      : fill(copy.bullets.verbFirst, vars).replace(/\s+/g, ' ').trim(),
    methodFirst: facts.method
      ? fill(copy.bullets.methodFirst, vars).replace(/\s+/g, ' ').trim()
      : fill(copy.bullets.verbFirst, vars).replace(/\s+/g, ' ').trim(),
    concise: fill(copy.bullets.concise, vars).replace(/\s+/g, ' ').trim(),
  };
}
