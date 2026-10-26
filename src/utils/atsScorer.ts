import { ResumeData } from '../types/resume';
import { getCountryById } from '../data/countries';

export interface ATSCheckItem {
  id: string;
  category: 'critical' | 'recommended' | 'bonus';
  title: string;
  passed: boolean;
  message: string;
  suggestion?: string;
}

export interface ATSAnalysisResult {
  score: number; // 0 to 100
  items: ATSCheckItem[];
  matchedKeywords: string[];
  missingKeywords: string[];
  actionVerbsFound: string[];
  metricsCount: number;
  wordCount: number;
}

const COMMON_ACTION_VERBS = [
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

export function analyzeResumeATS(resume: ResumeData, jobDescriptionText: string = ''): ATSAnalysisResult {
  const items: ATSCheckItem[] = [];
  const country = getCountryById(resume.targetCountryId);

  // 1. Contact info check
  const hasName = Boolean(resume.personal.fullName && resume.personal.fullName.trim().length > 2);
  items.push({
    id: 'name_check',
    category: 'critical',
    title: 'Full Name Clear Header',
    passed: hasName,
    message: hasName ? 'Full name is clearly specified at the top.' : 'Add your full name to ensure ATS candidate record creation.',
    suggestion: hasName ? undefined : 'Enter your first and last name in the Personal Information section.'
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasValidEmail = Boolean(resume.personal.email && emailRegex.test(resume.personal.email));
  items.push({
    id: 'email_check',
    category: 'critical',
    title: 'Valid Email Address',
    passed: hasValidEmail,
    message: hasValidEmail ? 'Professional email address provided.' : 'Valid email is required for recruiter outreach.',
    suggestion: hasValidEmail ? undefined : 'Add a clean, professional email (e.g., name@gmail.com).'
  });

  const hasPhone = Boolean(resume.personal.phone && resume.personal.phone.length > 5);
  items.push({
    id: 'phone_check',
    category: 'critical',
    title: 'Contact Phone Number',
    passed: hasPhone,
    message: hasPhone ? 'Phone number included with international or local dialing code.' : 'Phone number is missing.',
    suggestion: hasPhone ? undefined : `Include a reachable phone number starting with ${country.phonePrefix}.`
  });

  const hasLocation = Boolean(resume.personal.city && (resume.personal.stateOrRegion || resume.personal.country));
  items.push({
    id: 'location_check',
    category: 'critical',
    title: 'Geographic Location',
    passed: hasLocation,
    message: hasLocation ? 'City and jurisdiction specified.' : 'Location missing (City, State/Country required for geo-filtering).',
    suggestion: hasLocation ? undefined : 'Specify your city and country or state to match local candidate requisitions.'
  });

  // 2. Country-specific photo compliance check
  if (country.photoRule === 'discouraged') {
    const photoDisabled = !resume.design.showPhoto && !resume.personal.hasPhoto;
    items.push({
      id: 'photo_compliance',
      category: 'critical',
      title: `${country.name} Photo Policy Compliance`,
      passed: photoDisabled,
      message: photoDisabled 
        ? `Compliant with ${country.name} photo guidelines (no photo).`
        : `Photographs are strongly discouraged in ${country.name} due to EEOC/anti-bias regulations. Some enterprise ATS tools automatically filter out resumes with photos.`,
      suggestion: photoDisabled ? undefined : 'Switch to a No-Photo template or disable photo display for US, UK, Canada, Australia, and Ireland.'
    });
  } else {
    items.push({
      id: 'photo_compliance',
      category: 'recommended',
      title: `${country.name} Photo Format Option`,
      passed: true,
      message: `In ${country.name}, photos are ${country.photoRule}. Format aligns with local market customs.`
    });
  }

  // 3. Poland RODO GDPR check
  if (country.personalDataRules.requiresGDPRClause) {
    const hasClause = Boolean(resume.personal.gdprConsentClause && resume.personal.gdprConsentClause.length > 30);
    items.push({
      id: 'gdpr_compliance',
      category: 'critical',
      title: 'Polish RODO GDPR Consent Clause',
      passed: hasClause,
      message: hasClause 
        ? 'RODO legal processing clause is present.' 
        : 'Polish recruiters are legally forbidden from reviewing or storing CVs without the statutory RODO consent clause.',
      suggestion: hasClause ? undefined : 'Enable the Polish GDPR clause in the Personal section.'
    });
  }

  // 4. Experience & Bullet Points check
  const expCount = resume.experience?.length || 0;
  const totalBullets = resume.experience?.reduce((acc, exp) => acc + (exp.description?.length || 0), 0) || 0;
  const hasGoodExperience = expCount > 0 && totalBullets >= 2;
  items.push({
    id: 'experience_check',
    category: 'critical',
    title: 'Structured Work Experience',
    passed: hasGoodExperience,
    message: hasGoodExperience ? `Documented ${expCount} positions with ${totalBullets} descriptive bullet points.` : 'Add at least one role with descriptive achievement bullet points.',
    suggestion: hasGoodExperience ? undefined : 'Include job title, company name, dates, and 3-5 bullet points per role.'
  });

  // 5. Quantifiable metrics check
  const allText = JSON.stringify(resume);
  const metricRegex = /(\b\d+(\.\d+)?%|\$\d+[\d,]*|\b\d+([,\.]\d+)?\s*(users|clients|million|billion|k|hours|days|weeks|teams|engineers|projects|requests\/sec|mrr|arr))/gi;
  const metricsFound = allText.match(metricRegex) || [];
  const hasMetrics = metricsFound.length >= 2;
  items.push({
    id: 'metrics_check',
    category: 'recommended',
    title: 'Quantified Impact & Metrics',
    passed: hasMetrics,
    message: hasMetrics ? `Identified ${metricsFound.length} measurable impact points (percentages, currency, numbers).` : 'Few or no measurable metrics detected in experience descriptions.',
    suggestion: hasMetrics ? undefined : 'Quantify your accomplishments: e.g. "Increased speed by 35%", "Managed $200k budget", "Scaled from 10k to 50k users".'
  });

  // 6. Action verbs check
  const lowerText = allText.toLowerCase();
  const verbsFound = COMMON_ACTION_VERBS.filter(verb => {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    return regex.test(lowerText);
  });
  const hasActionVerbs = verbsFound.length >= 4;
  items.push({
    id: 'action_verbs_check',
    category: 'recommended',
    title: 'Strong Action Verbs',
    passed: hasActionVerbs,
    message: hasActionVerbs ? `Used ${verbsFound.length} strong action verbs (${verbsFound.slice(0, 4).join(', ')}, etc.).` : 'Use more decisive action verbs to start experience bullet points.',
    suggestion: hasActionVerbs ? undefined : 'Replace passive phrases ("Responsible for...") with decisive verbs ("Spearheaded", "Architected", "Engineered").'
  });

  // 7. Summary length check
  const summaryWords = resume.summary ? resume.summary.trim().split(/\s+/).length : 0;
  const isSummaryOptimal = summaryWords >= 25 && summaryWords <= 90;
  items.push({
    id: 'summary_check',
    category: 'recommended',
    title: 'Professional Summary Conciseness',
    passed: isSummaryOptimal,
    message: isSummaryOptimal 
      ? `Summary is concise and readable (${summaryWords} words).`
      : (summaryWords < 25 ? 'Summary is short or missing (aim for 30–75 words).' : 'Summary is over 90 words; recruiters and ATS parsers prefer punchy executive overviews.'),
    suggestion: isSummaryOptimal ? undefined : 'Aim for 3-4 sentences outlining your title, core strengths, and primary achievement.'
  });

  // 8. Education and skills checks
  const hasEducation = (resume.education?.length || 0) > 0;
  items.push({
    id: 'education_check',
    category: 'critical',
    title: 'Education Section',
    passed: hasEducation,
    message: hasEducation ? 'Education degrees and credentials listed.' : 'Education entries are missing.',
    suggestion: hasEducation ? undefined : 'Add your degree, university name, and graduation year.'
  });

  const skillsCount = resume.skills?.length || 0;
  const hasSkills = skillsCount >= 5;
  items.push({
    id: 'skills_check',
    category: 'critical',
    title: 'Key Skills Section',
    passed: hasSkills,
    message: hasSkills ? `${skillsCount} skills cataloged for ATS semantic keyword indexing.` : 'Add at least 5 relevant skills to improve ATS keyword indexing.',
    suggestion: hasSkills ? undefined : 'Add technical skills, tools, and domain proficiencies.'
  });

  // 9. Job description keyword matching (if provided)
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];
  if (jobDescriptionText && jobDescriptionText.trim().length > 30) {
    const stopWords = new Set([
      'with', 'that', 'this', 'have', 'from', 'they', 'will', 'would', 'there', 'their', 
      'what', 'about', 'which', 'when', 'make', 'like', 'time', 'just', 'know', 'take', 
      'person', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'other', 'than', 
      'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 
      'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 
      'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'for',
      'and', 'the', 'are', 'you', 'all', 'can', 'not', 'who', 'been', 'has', 'had',
      'were', 'was', 'should', 'must', 'each', 'such', 'both', 'between', 'same', 'looking'
    ]);
    
    // Look for technical words or nouns in job description
    const rawTokens = jobDescriptionText.toLowerCase().match(/\b[a-z]{3,20}\b/g) || [];
    const frequencyMap = new Map<string, number>();
    for (const token of rawTokens) {
      if (!stopWords.has(token)) {
        frequencyMap.set(token, (frequencyMap.get(token) || 0) + 1);
      }
    }

    // Top 15 keywords by frequency in job description
    const minOccurrences = frequencyMap.size > 25 ? 2 : 1;
    const sortedKeywords = Array.from(frequencyMap.entries())
      .filter(([_, count]) => count >= minOccurrences)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word]) => word);

    for (const kw of sortedKeywords) {
      if (lowerText.includes(kw)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    }
  }

  // Calculate score
  let score = 0;
  const totalWeight = items.reduce((acc, it) => acc + (it.category === 'critical' ? 15 : 10), 0);
  const earnedWeight = items.reduce((acc, it) => acc + (it.passed ? (it.category === 'critical' ? 15 : 10) : 0), 0);
  score = Math.round((earnedWeight / totalWeight) * 100);

  // If job description keywords tested, adjust score slightly
  if (matchedKeywords.length + missingKeywords.length > 0) {
    const keywordRatio = matchedKeywords.length / (matchedKeywords.length + missingKeywords.length);
    score = Math.round((score * 0.7) + (keywordRatio * 100 * 0.3));
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    items,
    matchedKeywords,
    missingKeywords,
    actionVerbsFound: verbsFound,
    metricsCount: metricsFound.length,
    wordCount: allText.split(/\s+/).length
  };
}
