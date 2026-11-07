/**
 * Real ATS Parsing & Analysis Engine for GlobeCareer
 * Modeled after enterprise applicant tracking systems (Greenhouse, Workday, Lever, Taleo, iCIMS).
 * Produces genuine, dynamic, criteria-based evaluation scores from 0 to 100.
 */

import { ResumeData } from '../types/resume';
import { getCountryById } from '../data/countries';

export interface ATSPillarScore {
  name: string;
  score: number; // 0 to 100
  weight: number; // Percentage contribution (e.g., 35)
  earnedScore: number; // Calculated weighted points
  status: 'excellent' | 'good' | 'needs-work' | 'critical';
  summary: string;
}

export interface ATSFeedbackItem {
  id: string;
  pillar: 'keywords' | 'experience' | 'metrics' | 'structure' | 'readability' | 'country';
  severity: 'critical' | 'warning' | 'positive';
  title: string;
  description: string;
  suggestion?: string;
}

export interface RealATSAnalysis {
  overallScore: number; // 0 to 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  verdict: string;
  pillars: {
    keywords: ATSPillarScore;
    experience: ATSPillarScore;
    metrics: ATSPillarScore;
    structure: ATSPillarScore;
    readability: ATSPillarScore;
  };
  matchedHardSkills: string[];
  missingHardSkills: string[];
  matchedSoftSkills: string[];
  missingSoftSkills: string[];
  missingJdKeywords: string[];
  matchedJdKeywords: string[];
  actionVerbsFound: string[];
  metricsFound: string[];
  wordCount: number;
  readingTimeMinutes: number;
  bulletCount: number;
  feedbackItems: ATSFeedbackItem[];
  detectedSections: string[];
  missingSections: string[];
}

// Curated technical & domain skill vocabulary for deep tokenization
const KNOWN_HARD_SKILLS = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'golang', 'rust', 'ruby', 'php', 'swift', 'kotlin',
  'react', 'react native', 'angular', 'vue', 'next.js', 'node.js', 'express', 'django', 'fastapi', 'flask', 'spring boot',
  'sql', 'postgresql', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'dynamodb', 'graphql', 'rest api', 'grpc',
  'aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'github actions', 'jenkins',
  'linux', 'unix', 'bash', 'git', 'microservices', 'serverless', 'system design', 'distributed systems',
  'machine learning', 'deep learning', 'nlp', 'computer vision', 'tensorflow', 'pytorch', 'scikit-learn', 'data science',
  'pandas', 'numpy', 'tableau', 'power bi', 'looker', 'snowflake', 'bigquery', 'data modeling', 'etl',
  'product management', 'roadmap', 'jira', 'confluence', 'agile', 'scrum', 'kanban', 'user stories', 'okrs',
  'ui/ux', 'figma', 'wireframing', 'user research', 'prototyping', 'design systems',
  'seo', 'sem', 'google analytics', 'copywriting', 'content strategy', 'email marketing', 'crm', 'salesforce', 'hubspot',
  'financial modeling', 'excel', 'accounting', 'budgeting', 'forecasting', 'valuation', 'p&l', 'due diligence',
  'project management', 'pmp', 'prince2', 'risk management', 'stakeholder management', 'change management',
  'cybersecurity', 'soc2', 'iso 27001', 'penetration testing', 'incident response', 'iam', 'oauth', 'compliance'
];

const KNOWN_SOFT_SKILLS = [
  'leadership', 'mentorship', 'communication', 'collaboration', 'problem solving', 'critical thinking',
  'negotiation', 'adaptability', 'cross-functional', 'time management', 'decision making',
  'presentation', 'conflict resolution', 'emotional intelligence', 'client relations', 'team building'
];

const ACTION_VERBS = [
  'accelerated', 'achieved', 'administered', 'analyzed', 'architected', 'automated',
  'built', 'championed', 'coached', 'collaborated', 'compiled', 'coordinated',
  'decreased', 'delivered', 'deployed', 'designed', 'developed', 'directed',
  'eliminated', 'engineered', 'established', 'executed', 'expanded', 'expedited',
  'facilitated', 'formulated', 'generated', 'governed', 'guided', 'headed',
  'implemented', 'improved', 'increased', 'initiated', 'inspected', 'instituted',
  'launched', 'led', 'managed', 'mentored', 'maximized', 'migrated', 'minimized',
  'negotiated', 'optimized', 'orchestrated', 'overhauled', 'oversaw', 'partnered',
  'pioneered', 'planned', 'produced', 'published', 'reconciled', 'reduced',
  'redesigned', 're-engineered', 'resolved', 'restructured', 'revamped', 'scaled',
  'spearheaded', 'standardized', 'streamlined', 'supervised', 'surpassed', 'trained',
  'transformed', 'upgraded', 'validated'
];

const STOP_WORDS = new Set([
  'and', 'the', 'for', 'with', 'from', 'that', 'this', 'have', 'will', 'your', 'about',
  'must', 'should', 'more', 'their', 'work', 'team', 'years', 'skills', 'experience',
  'ability', 'required', 'preferred', 'opportunity', 'company', 'candidate', 'position',
  'role', 'responsible', 'including', 'apply', 'joining', 'join', 'status', 'equal',
  'employment', 'benefits', 'working', 'responsibilities', 'qualifications', 'requirements',
  'description', 'summary', 'location', 'salary', 'overview', 'seeking', 'looking',
  'what', 'which', 'when', 'into', 'than', 'them', 'they', 'were', 'been', 'each',
  'also', 'such', 'well', 'both', 'between', 'same', 'help', 'make', 'take', 'come'
]);

/**
 * Extracts normalized text from either a ResumeData model or raw string
 */
export function extractResumePlainText(resume: ResumeData | string): string {
  if (typeof resume === 'string') {
    return resume;
  }

  const parts: string[] = [];
  if (resume.personal.fullName) parts.push(resume.personal.fullName);
  if (resume.personal.jobTitle) parts.push(resume.personal.jobTitle);
  if (resume.personal.email) parts.push(resume.personal.email);
  if (resume.personal.phone) parts.push(resume.personal.phone);
  if (resume.personal.city) parts.push(resume.personal.city);
  if (resume.personal.stateOrRegion) parts.push(resume.personal.stateOrRegion);
  if (resume.personal.country) parts.push(resume.personal.country);
  if (resume.personal.linkedIn) parts.push(resume.personal.linkedIn);
  if (resume.personal.portfolioUrl) parts.push(resume.personal.portfolioUrl);
  if (resume.personal.github) parts.push(resume.personal.github);

  if (resume.summary) {
    parts.push('Professional Summary');
    parts.push(resume.summary);
  }

  if (resume.experience && resume.experience.length > 0) {
    parts.push('Work Experience');
    for (const exp of resume.experience) {
      parts.push(`${exp.jobTitle} at ${exp.company} (${exp.location || ''})`);
      if (exp.startDate || exp.endDate) {
        parts.push(`${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}`);
      }
      if (exp.description && exp.description.length > 0) {
        parts.push(exp.description.join('\n'));
      }
    }
  }

  if (resume.education && resume.education.length > 0) {
    parts.push('Education');
    for (const edu of resume.education) {
      parts.push(`${edu.degree} in ${edu.fieldOfStudy} - ${edu.institution} (${edu.endDate || edu.startDate || ''})`);
      if (edu.gradeOrHonors) parts.push(edu.gradeOrHonors);
      if (edu.highlights && edu.highlights.length > 0) parts.push(edu.highlights.join('\n'));
    }
  }

  if (resume.skills && resume.skills.length > 0) {
    parts.push('Key Skills');
    parts.push(resume.skills.map(s => s.name).join(', '));
  }

  if (resume.certifications && resume.certifications.length > 0) {
    parts.push('Certifications');
    for (const cert of resume.certifications) {
      parts.push(`${cert.name} - ${cert.issuer} (${cert.issueDate || ''})`);
    }
  }

  if (resume.projects && resume.projects.length > 0) {
    parts.push('Projects');
    for (const proj of resume.projects) {
      parts.push(`${proj.name}: ${proj.description}`);
      if (proj.technologies) parts.push(proj.technologies.join(', '));
    }
  }

  if (resume.languages && resume.languages.length > 0) {
    parts.push('Languages');
    parts.push(resume.languages.map(l => `${l.language} (${l.proficiency})`).join(', '));
  }

  if (resume.personal.gdprConsentClause) {
    parts.push(resume.personal.gdprConsentClause);
  }

  return parts.join('\n\n');
}

/**
 * Tokenize text into normalized unique keywords, filtering out stop words
 */
function extractSignificantKeywords(text: string): { word: string; count: number }[] {
  const words = text.toLowerCase().match(/\b[a-z0-9+#.-]{3,25}\b/g) || [];
  const map: Record<string, number> = {};

  for (const w of words) {
    const clean = w.replace(/^[.-]+|[.-]+$/g, '');
    if (clean.length >= 3 && !STOP_WORDS.has(clean)) {
      map[clean] = (map[clean] || 0) + 1;
    }
  }

  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([word, count]) => ({ word, count }));
}

/**
 * Detects presence of standard ATS sections
 */
function inspectSections(text: string): { found: string[]; missing: string[] } {
  const lower = text.toLowerCase();
  const sectionKeywords: Record<string, RegExp> = {
    'Contact Information': /\b(email|phone|tel|linkedin|github|portfolio|contact)\b/i,
    'Professional Summary / About': /\b(summary|objective|profile|about me|executive summary|overview)\b/i,
    'Work Experience': /\b(experience|employment|work history|professional background|career history)\b/i,
    'Education': /\b(education|university|college|degree|bachelor|master|phd|diploma|gpa)\b/i,
    'Skills': /\b(skills|competencies|technologies|proficiencies|technical stack|expertise)\b/i,
  };

  const found: string[] = [];
  const missing: string[] = [];

  for (const [section, regex] of Object.entries(sectionKeywords)) {
    if (regex.test(lower)) {
      found.push(section);
    } else {
      missing.push(section);
    }
  }

  return { found, missing };
}

/**
 * Comprehensive, honest ATS Evaluator
 */
export function runGenuineATSAnalysis(
  resumeInput: ResumeData | string,
  jobDescriptionInput: string = '',
  targetCountryId: string = 'us'
): RealATSAnalysis {
  const resumeText = extractResumePlainText(resumeInput).trim();
  const resumeLower = resumeText.toLowerCase();
  const jdText = jobDescriptionInput.trim();
  const jdLower = jdText.toLowerCase();
  const country = getCountryById(targetCountryId);

  const feedbackItems: ATSFeedbackItem[] = [];

  // 1. Text Metrics
  const words = resumeText.match(/\b\w+\b/g) || [];
  const wordCount = words.length;
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / 200));

  // Bullet points
  const bulletLines = resumeText.split('\n').filter(line => {
    const t = line.trim();
    return t.startsWith('•') || t.startsWith('-') || t.startsWith('*') || /^\d+\.\s/.test(t);
  });
  const bulletCount = bulletLines.length;

  // 2. Metrics & Numbers Detection
  // Matches: percentages (35%), currency ($50k, €100M), multipliers (3x), user counts (50,000 users)
  const metricRegex = /\b(\d+(\.\d+)?%|\$\d+[\d,]*[kKmMbB]?|€\d+[\d,]*[kKmMbB]?|£\d+[\d,]*[kKmMbB]?|\d+x\b|\d+([,\.]\d+)?\s*(users|clients|customers|million|billion|k|hours|days|weeks|teams|engineers|projects|requests\/sec|mrr|arr|conversions|leads))/gi;
  const rawMetrics = resumeText.match(metricRegex) || [];
  const metricsFound = Array.from(new Set(rawMetrics.map(m => m.trim())));

  // 3. Action Verbs
  const actionVerbsFound = ACTION_VERBS.filter(verb => {
    const r = new RegExp(`\\b${verb}\\b`, 'i');
    return r.test(resumeLower);
  });

  // 4. Section Structure Check
  const { found: detectedSections, missing: missingSections } = inspectSections(resumeText);

  // 5. Hard Skills & Soft Skills Analysis
  const resumeHardSkills = KNOWN_HARD_SKILLS.filter(skill => resumeLower.includes(skill));
  const resumeSoftSkills = KNOWN_SOFT_SKILLS.filter(skill => resumeLower.includes(skill));

  // JD Skill Extraction (if JD is provided)
  let jdHardSkills: string[] = [];
  let jdSoftSkills: string[] = [];
  let jdTopKeywords: string[] = [];

  const hasJobDescription = jdText.length >= 40;

  if (hasJobDescription) {
    jdHardSkills = KNOWN_HARD_SKILLS.filter(skill => jdLower.includes(skill));
    jdSoftSkills = KNOWN_SOFT_SKILLS.filter(skill => jdLower.includes(skill));

    const jdKeywordPairs = extractSignificantKeywords(jdText);
    jdTopKeywords = jdKeywordPairs
      .filter(k => k.count >= 2 || jdHardSkills.includes(k.word))
      .slice(0, 25)
      .map(k => k.word);
  }

  // Matched vs Missing
  const matchedHardSkills = jdHardSkills.filter(s => resumeLower.includes(s));
  const missingHardSkills = jdHardSkills.filter(s => !resumeLower.includes(s));

  const matchedSoftSkills = jdSoftSkills.filter(s => resumeLower.includes(s));
  const missingSoftSkills = jdSoftSkills.filter(s => !resumeLower.includes(s));

  const matchedJdKeywords = jdTopKeywords.filter(k => resumeLower.includes(k));
  const missingJdKeywords = jdTopKeywords.filter(k => !resumeLower.includes(k));

  // -------------------------------------------------------------
  // PILLAR 1: KEYWORD & SKILLS MATCH (Weight: 35%)
  // -------------------------------------------------------------
  let keywordScore = 0;
  if (!hasJobDescription) {
    // General keyword health when no JD is provided
    const hardCount = resumeHardSkills.length;
    const softCount = resumeSoftSkills.length;
    if (hardCount >= 8 && softCount >= 4) keywordScore = 88;
    else if (hardCount >= 5) keywordScore = 72;
    else if (hardCount >= 2) keywordScore = 50;
    else if (hardCount >= 1) keywordScore = 30;
    else keywordScore = 15;
  } else {
    // Genuine comparison against Job Description
    const totalJdHard = jdHardSkills.length;
    const totalJdKeywords = jdTopKeywords.length;

    let hardRatio = 0.5;
    if (totalJdHard > 0) {
      hardRatio = matchedHardSkills.length / totalJdHard;
    }

    let overallRatio = 0.5;
    if (totalJdKeywords > 0) {
      overallRatio = matchedJdKeywords.length / totalJdKeywords;
    }

    // Weighted match: hard technical skills matter more than generic vocabulary
    const calculatedMatch = Math.round((hardRatio * 0.65 + overallRatio * 0.35) * 100);
    keywordScore = Math.min(100, Math.max(10, calculatedMatch));
  }

  // Feedback for Pillar 1
  if (hasJobDescription && missingHardSkills.length > 0) {
    feedbackItems.push({
      id: 'missing-hard-skills',
      pillar: 'keywords',
      severity: missingHardSkills.length > 3 ? 'critical' : 'warning',
      title: `Missing ${missingHardSkills.length} Required Technical Skill${missingHardSkills.length > 1 ? 's' : ''}`,
      description: `The job description demands these key skills that are not detected in your resume: ${missingHardSkills.slice(0, 6).join(', ')}.`,
      suggestion: 'Integrate these exact skill keywords into your Skills list or Work Experience bullet points where you have used them.'
    });
  } else if (hasJobDescription && missingHardSkills.length === 0 && jdHardSkills.length > 0) {
    feedbackItems.push({
      id: 'all-hard-skills-matched',
      pillar: 'keywords',
      severity: 'positive',
      title: 'Strong Technical Skill Coverage',
      description: `Matched all ${jdHardSkills.length} core technical competencies found in the job requisition (${jdHardSkills.slice(0, 5).join(', ')}).`
    });
  }

  if (hasJobDescription && missingJdKeywords.length > 4) {
    feedbackItems.push({
      id: 'missing-jd-terms',
      pillar: 'keywords',
      severity: 'warning',
      title: 'Missing ATS Role Vocabulary',
      description: `High-frequency keywords from the job description are absent: ${missingJdKeywords.slice(0, 5).join(', ')}.`,
      suggestion: 'Mirror the employer\'s vocabulary to ensure recruiter semantic match algorithms rank you in the top 10% tier.'
    });
  }

  // -------------------------------------------------------------
  // PILLAR 2: EXPERIENCE & TITLE FIT (Weight: 20%)
  // -------------------------------------------------------------
  let expScore = 0;
  const hasExperienceSection = detectedSections.includes('Work Experience');
  const hasMultipleBullets = bulletCount >= 3;

  if (wordCount < 60) {
    expScore = 10;
  } else if (!hasExperienceSection) {
    expScore = 20;
  } else {
    let base = 60;
    if (bulletCount >= 6) base += 20;
    else if (bulletCount >= 3) base += 10;

    // Check for chronological date patterns (e.g., 2020 - 2023 or Present)
    const dateMatch = resumeText.match(/\b(20\d\d|19\d\d)\b/g);
    if (dateMatch && dateMatch.length >= 2) base += 10;

    // If job title is in JD, give boost
    if (typeof resumeInput !== 'string' && resumeInput.personal.jobTitle && hasJobDescription) {
      const cleanTitle = resumeInput.personal.jobTitle.toLowerCase();
      if (jdLower.includes(cleanTitle)) {
        base += 10;
      }
    }

    expScore = Math.min(100, Math.max(15, base));
  }

  if (!hasExperienceSection) {
    feedbackItems.push({
      id: 'missing-experience-section',
      pillar: 'experience',
      severity: 'critical',
      title: 'Work Experience Section Not Found',
      description: 'Enterprise ATS parsers require a distinct "Work Experience" or "Professional Experience" header.',
      suggestion: 'Add your chronological career history with job titles, company names, and descriptive achievement bullets.'
    });
  } else if (bulletCount < 3) {
    feedbackItems.push({
      id: 'insufficient-bullets',
      pillar: 'experience',
      severity: 'warning',
      title: 'Experience Bullets are Too Sparse',
      description: `Detected only ${bulletCount} bullet points. Recruiters look for 3 to 5 targeted accomplishments per position.`,
      suggestion: 'Expand each role into 3-4 bullet points demonstrating problem solved, action taken, and quantifiable outcome.'
    });
  }

  // -------------------------------------------------------------
  // PILLAR 3: QUANTIFIED METRICS & RESULTS (Weight: 15%)
  // -------------------------------------------------------------
  let metricsScore = 0;
  if (metricsFound.length >= 6) {
    metricsScore = 95;
  } else if (metricsFound.length >= 4) {
    metricsScore = 80;
  } else if (metricsFound.length >= 2) {
    metricsScore = 65;
  } else if (metricsFound.length === 1) {
    metricsScore = 40;
  } else {
    metricsScore = 15;
  }

  if (metricsFound.length === 0) {
    feedbackItems.push({
      id: 'zero-metrics',
      pillar: 'metrics',
      severity: 'critical',
      title: 'No Measurable Metrics or KPIs Found',
      description: 'Your experience descriptions contain no percentages (%), revenue ($/€/£), time savings, or scaling metrics.',
      suggestion: 'Transform duty statements into results. Example: Instead of "Built marketing campaigns", write "Generated $180k in pipeline with 28% higher CTR across 3 quarters".'
    });
  } else if (metricsFound.length < 3) {
    feedbackItems.push({
      id: 'few-metrics',
      pillar: 'metrics',
      severity: 'warning',
      title: 'Add More Quantified Achievements',
      description: `Only ${metricsFound.length} metric detected (${metricsFound.join(', ')}). High-scoring resumes average 4–8 numbers or percentages.`,
      suggestion: 'Add concrete numbers: budget managed, percentage performance improvement, team headcount, or user growth.'
    });
  } else {
    feedbackItems.push({
      id: 'strong-metrics',
      pillar: 'metrics',
      severity: 'positive',
      title: 'Excellent Quantified Impact',
      description: `Found ${metricsFound.length} tangible metrics (${metricsFound.slice(0, 4).join(', ')}). This validates real business impact.`
    });
  }

  // -------------------------------------------------------------
  // PILLAR 4: ATS STRUCTURE & PARSABILITY (Weight: 15%)
  // -------------------------------------------------------------
  let structureScore = 100;
  const criticalContactElements = {
    email: /[\w.-]+@[\w.-]+\.\w{2,}/i.test(resumeText),
    phone: /(\+?\d{1,4}?[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{3,5}/.test(resumeText),
    location: /\b(city|remote|united states|kingdom|germany|france|canada|australia|dubai|london|berlin|paris|new york|toronto|sydney)\b/i.test(resumeText) || (typeof resumeInput !== 'string' && Boolean(resumeInput.personal.city)),
  };

  if (!criticalContactElements.email) {
    structureScore -= 30;
    feedbackItems.push({
      id: 'missing-email',
      pillar: 'structure',
      severity: 'critical',
      title: 'Email Address Missing or Unparseable',
      description: 'Recruiters and ATS workflows cannot auto-create candidate profiles without a valid email.',
      suggestion: 'Ensure your email is in plain text near the top of the resume header.'
    });
  }

  if (!criticalContactElements.phone) {
    structureScore -= 20;
    feedbackItems.push({
      id: 'missing-phone',
      pillar: 'structure',
      severity: 'critical',
      title: 'Contact Phone Number Missing',
      description: 'No telephone number found. Include international dialing codes if applying abroad.',
      suggestion: `Add your reachable phone number (e.g. ${country.phonePrefix} ...).`
    });
  }

  if (missingSections.length > 0) {
    structureScore -= (missingSections.length * 15);
    feedbackItems.push({
      id: 'missing-sections',
      pillar: 'structure',
      severity: missingSections.length >= 2 ? 'critical' : 'warning',
      title: `Missing Standard ATS Section: ${missingSections.join(', ')}`,
      description: `ATS parsers look for standard headings. You are missing: ${missingSections.join(', ')}.`,
      suggestion: 'Use unambiguous standard headings like "Professional Summary", "Work Experience", "Education", and "Skills".'
    });
  }

  // Country compliance
  if (country.photoRule === 'discouraged') {
    if (typeof resumeInput !== 'string' && (resumeInput.design.showPhoto || resumeInput.personal.hasPhoto)) {
      structureScore -= 15;
      feedbackItems.push({
        id: 'country-photo-warning',
        pillar: 'country',
        severity: 'critical',
        title: `Anti-Bias Photo Violation (${country.name})`,
        description: `Headshot photographs are discouraged in ${country.name} under EEOC/employment anti-bias regulations. Some enterprise ATS tools reject resumes with photos.`,
        suggestion: 'Switch to a No-Photo template or toggle off photo inclusion.'
      });
    }
  }

  if (country.personalDataRules.requiresGDPRClause) {
    const hasGdpr = resumeLower.includes('zgoda') || resumeLower.includes('przetwarzanie danych') || resumeLower.includes('gdpr') || resumeLower.includes('rodo');
    if (!hasGdpr) {
      structureScore -= 15;
      feedbackItems.push({
        id: 'country-gdpr-missing',
        pillar: 'country',
        severity: 'critical',
        title: 'Polish RODO GDPR Clause Missing',
        description: 'Under Polish labor law, recruiters cannot legally retain or process CVs without the statutory RODO consent statement.',
        suggestion: 'Enable the RODO GDPR clause in the Personal section.'
      });
    }
  }

  structureScore = Math.min(100, Math.max(10, structureScore));

  // -------------------------------------------------------------
  // PILLAR 5: READABILITY & ACTION VERBS (Weight: 15%)
  // -------------------------------------------------------------
  let readabilityScore = 75;

  // Word count evaluation
  if (wordCount < 150) {
    readabilityScore -= 40;
    feedbackItems.push({
      id: 'word-count-dangerously-low',
      pillar: 'readability',
      severity: 'critical',
      title: 'Resume is Extremely Short',
      description: `Your resume contains only ${wordCount} words. Standard professional resumes range from 450 to 900 words.`,
      suggestion: 'Expand your work history, skills, achievements, and education to give ATS enough semantic context.'
    });
  } else if (wordCount > 1300) {
    readabilityScore -= 20;
    feedbackItems.push({
      id: 'word-count-too-high',
      pillar: 'readability',
      severity: 'warning',
      title: 'Resume is Excessively Verbose',
      description: `${wordCount} words detected. Resumes over 1,000 words risk poor parsing and human recruiter fatigue.`,
      suggestion: 'Trim older or irrelevant roles and consolidate bullets into concise, impactful achievement statements.'
    });
  } else {
    readabilityScore += 10;
  }

  // Action verbs evaluation
  if (actionVerbsFound.length >= 8) {
    readabilityScore += 15;
    feedbackItems.push({
      id: 'strong-action-verbs',
      pillar: 'readability',
      severity: 'positive',
      title: 'High Decisive Action Verb Density',
      description: `Found ${actionVerbsFound.length} powerful action verbs (${actionVerbsFound.slice(0, 5).join(', ')}). This gives your experience high persuasive momentum.`
    });
  } else if (actionVerbsFound.length <= 2) {
    readabilityScore -= 25;
    feedbackItems.push({
      id: 'weak-action-verbs',
      pillar: 'readability',
      severity: 'warning',
      title: 'Passive Phrasing Detected',
      description: `Only ${actionVerbsFound.length} strong action verbs found. Passive statements like "Responsible for" weaken your candidate ranking.`,
      suggestion: 'Begin bullet points with decisive action verbs like Spearheaded, Engineered, Orchestrated, Automated, or Negotiated.'
    });
  }

  readabilityScore = Math.min(100, Math.max(15, readabilityScore));

  // -------------------------------------------------------------
  // OVERALL WEIGHTED SCORE CALCULATION
  // -------------------------------------------------------------
  // Pillars:
  // - keywords: 35%
  // - experience: 20%
  // - metrics: 15%
  // - structure: 15%
  // - readability: 15%
  const totalEarnedPoints =
    (keywordScore * 0.35) +
    (expScore * 0.20) +
    (metricsScore * 0.15) +
    (structureScore * 0.15) +
    (readabilityScore * 0.15);

  const overallScore = Math.round(Math.min(100, Math.max(5, totalEarnedPoints)));

  // Grade & Verdict
  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'C';
  let verdict = '';

  if (overallScore >= 92) {
    grade = 'A+';
    verdict = 'Top 5% Candidate: Highly optimized for modern enterprise ATS algorithms and recruiters.';
  } else if (overallScore >= 82) {
    grade = 'A';
    verdict = 'Interview-Ready: Strong ATS keyword indexing, clean structure, and clear metric proof.';
  } else if (overallScore >= 70) {
    grade = 'B';
    verdict = 'Competitive: Good structural foundation, but missing specific keywords or metrics needed to guarantee screening passing.';
  } else if (overallScore >= 55) {
    grade = 'C';
    verdict = 'At Risk of ATS Filter: Missing key technical keywords, quantified metrics, or required sections.';
  } else if (overallScore >= 40) {
    grade = 'D';
    verdict = 'High Filter Failure Risk: Unlikely to pass automated ATS parser without substantial restructuring and keyword matching.';
  } else {
    grade = 'F';
    verdict = 'Critical Revision Required: Resume lacks fundamental contact elements, metrics, or alignment with target role.';
  }

  const getPillarStatus = (s: number): 'excellent' | 'good' | 'needs-work' | 'critical' => {
    if (s >= 85) return 'excellent';
    if (s >= 70) return 'good';
    if (s >= 50) return 'needs-work';
    return 'critical';
  };

  return {
    overallScore,
    grade,
    verdict,
    pillars: {
      keywords: {
        name: 'Keywords & Skill Matching',
        score: keywordScore,
        weight: 35,
        earnedScore: Math.round(keywordScore * 0.35),
        status: getPillarStatus(keywordScore),
        summary: hasJobDescription 
          ? `Matched ${matchedHardSkills.length}/${jdHardSkills.length || 1} core technical skills and ${matchedJdKeywords.length}/${jdTopKeywords.length || 1} job vocabulary terms.`
          : `Cataloged ${resumeHardSkills.length} technical skills and ${resumeSoftSkills.length} competencies.`
      },
      experience: {
        name: 'Work Experience & Role Fit',
        score: expScore,
        weight: 20,
        earnedScore: Math.round(expScore * 0.20),
        status: getPillarStatus(expScore),
        summary: `${bulletCount} descriptive achievement bullet points documented.`
      },
      metrics: {
        name: 'Quantified Impact & Metrics',
        score: metricsScore,
        weight: 15,
        earnedScore: Math.round(metricsScore * 0.15),
        status: getPillarStatus(metricsScore),
        summary: `Identified ${metricsFound.length} measurable metrics (percentages, revenue, multipliers, scaling figures).`
      },
      structure: {
        name: 'ATS Structure & Parsability',
        score: structureScore,
        weight: 15,
        earnedScore: Math.round(structureScore * 0.15),
        status: getPillarStatus(structureScore),
        summary: `Detected ${detectedSections.length} core sections with valid contact endpoints and ${country.name} compliance.`
      },
      readability: {
        name: 'Action Verbs & Readability',
        score: readabilityScore,
        weight: 15,
        earnedScore: Math.round(readabilityScore * 0.15),
        status: getPillarStatus(readabilityScore),
        summary: `${wordCount} words (~${readingTimeMinutes} min reading time) with ${actionVerbsFound.length} decisive action verbs.`
      }
    },
    matchedHardSkills,
    missingHardSkills,
    matchedSoftSkills,
    missingSoftSkills,
    missingJdKeywords,
    matchedJdKeywords,
    actionVerbsFound,
    metricsFound,
    wordCount,
    readingTimeMinutes,
    bulletCount,
    feedbackItems,
    detectedSections,
    missingSections
  };
}

/**
 * Standard industry benchmark job descriptions for instant testing
 */
export const SAMPLE_JOB_BENCHMARKS = [
  {
    id: 'software-engineer',
    title: 'Senior Full Stack Software Engineer',
    category: 'Engineering',
    description: `We are looking for a Senior Full Stack Engineer with 4+ years of professional experience building scalable distributed web applications.
Required Technical Skills:
- TypeScript, JavaScript, React, Node.js, Next.js, and modern frontend architecture.
- REST API, GraphQL, PostgreSQL, Redis, Docker, and Kubernetes.
- Cloud platforms (AWS, GCP) and automated CI/CD pipeline deployment.
- Experience with system design, microservices, and database performance optimization.
Responsibilities:
- Spearhead frontend and backend feature engineering to scale our SaaS product to 500k active users.
- Architect high-throughput APIs delivering sub-100ms response times.
- Collaborate with product management, UI/UX designers, and cross-functional teams in an Agile environment.
- Champion code quality, automated unit testing, and technical documentation.`
  },
  {
    id: 'product-manager',
    title: 'Senior Product Manager (SaaS)',
    category: 'Product',
    description: `We are hiring a Senior Product Manager to drive product roadmap, user acquisition, and monetization strategy.
Required Skills:
- 4+ years experience in SaaS product management, Agile, Scrum, Jira, and user research.
- Proven track record defining OKRs, roadmap prioritization, and managing cross-functional engineering teams.
- Data-driven decision making using SQL, Tableau, Google Analytics, and A/B testing methodologies.
- Exceptional stakeholder management, communication, and executive presentation capabilities.
Responsibilities:
- Lead discovery and delivery for high-impact growth initiatives, increasing user retention by 25%.
- Define comprehensive user stories, product requirements (PRDs), and feature release plans.
- Collaborate with engineering, marketing, and sales leadership to launch new pricing tiers.`
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst & Business Intelligence',
    category: 'Data',
    description: `Looking for an experienced Data Analyst to transform complex raw data into strategic business insights.
Required Skills:
- SQL (advanced queries, window functions, CTEs), Python (Pandas, NumPy), and ETL data pipelines.
- Data visualization in Tableau, Power BI, or Looker.
- Familiarity with Snowflake, BigQuery, data modeling, and statistical analysis.
- Strong problem solving, business acumen, and cross-functional communication.
Responsibilities:
- Build automated executive dashboards tracking MRR, ARR, CAC, LTV, and customer churn.
- Conduct deep-dive analysis on user behavior leading to a 15% decrease in drop-off rates.
- Partner with finance and operations to reconcile financial forecasts.`
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth Manager',
    category: 'Marketing',
    description: `We are seeking a Growth Marketing Manager to oversee multi-channel demand generation and paid acquisition.
Required Skills:
- Hands-on expertise in SEO, SEM, Google Ads, LinkedIn Ads, and Meta advertising.
- CRM workflows in HubSpot, Salesforce, email marketing automation, and conversion rate optimization (CRO).
- Google Analytics 4, Tag Manager, copywriting, and content strategy.
- Budget management with accountability for ROAS, CAC, and lead volume.
Responsibilities:
- Managed $450k annual performance marketing budget, delivering 3.8x ROAS.
- Spearheaded organic SEO strategy that tripled monthly organic search traffic.
- Execute A/B tests on landing pages, improving conversion rates by 32%.`
  },
  {
    id: 'financial-analyst',
    title: 'Corporate Financial Analyst',
    category: 'Finance',
    description: `Global enterprise seeking a Financial Analyst for budgeting, forecasting, and investment valuation.
Required Skills:
- Advanced financial modeling in Excel (DCF, sensitivity tables, Monte Carlo, VBA).
- Corporate accounting, P&L management, GAAP / IFRS compliance, and variance analysis.
- Experience with ERP systems (SAP, Oracle, NetSuite) and PowerPoint executive presentations.
- Strong analytical rigor, due diligence, and financial reporting.
Responsibilities:
- Formulate quarterly financial forecast models across 5 international business units.
- Analyzed capital expenditures resulting in $1.2M in annual cost reductions.
- Partner with executive leadership to prepare board decks and investor relations materials.`
  }
];
