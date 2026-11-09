import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode =
  | 'en' // English (US, UK, CA, AU, NZ, IE, SG, ZA)
  | 'de' // German (Germany, Austria, Switzerland, Luxembourg)
  | 'fr' // French (France, Belgium, Switzerland, Luxembourg, Canada)
  | 'es' // Spanish (Spain)
  | 'it' // Italian (Italy, Switzerland)
  | 'pt' // Portuguese (Portugal)
  | 'pl' // Polish (Poland)
  | 'nl' // Dutch (Netherlands, Belgium)
  | 'sv' // Swedish (Sweden)
  | 'no' // Norwegian (Norway)
  | 'da' // Danish (Denmark)
  | 'fi' // Finnish (Finland)
  | 'cs' // Czech (Czech Republic)
  | 'sk' // Slovak (Slovakia)
  | 'hu' // Hungarian (Hungary)
  | 'ro' // Romanian (Romania)
  | 'bg' // Bulgarian (Bulgaria)
  | 'el' // Greek (Greece)
  | 'hr' // Croatian (Croatia)
  | 'ja' // Japanese (Japan)
  | 'ar' // Arabic (UAE, Saudi Arabia, Qatar - RTL)
  | 'hi'; // Hindi (India)

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  isRTL?: boolean;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪', isRTL: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

export type Translations = Record<string, string>;

// Translations dictionary
export const EN_TRANSLATIONS: Translations = {
    // Nav
    'nav.resumeAndCv': 'Resume & CV',
    'nav.resumeBuilder': 'Resume Builder',
    'nav.templates': 'Templates',
    'nav.resumeTemplates': 'Resume Templates',
    'nav.resumeExamples': 'Resume Examples',
    'nav.atsGuide': 'ATS Hiring Guide',
    'nav.writingGuide': 'Resume Writing Guide',
    'nav.lettersAndOutreach': 'Letters & Outreach',
    'nav.coverLetterBuilder': 'Cover Letter Builder',
    'nav.recommendationLetter': 'Recommendation Letter Builder',
    'nav.emailGenerator': 'Job Application Email Generator',
    'nav.letterTemplates': 'Letter & Email Templates',
    'nav.careerTools': 'Career Tools',
    'nav.atsChecker': 'ATS Resume Checker',
    'nav.bioGenerator': 'Professional Bio Generator',
    'nav.summaryGenerator': 'Summary & Objective Generator',
    'nav.resignationLetter': 'Resignation Letter Generator',
    'nav.interviewPrep': 'Interview Preparation',
    'nav.recommendationGuide': 'Recommendation Guide',
    'nav.jobsAndMobility': 'Jobs & Mobility',
    'nav.verifiedJobs': 'Verified Jobs Portal',
    'nav.jobTracker': 'Job Application Tracker',
    'nav.countryGuides': '40 Country Guides',
    'nav.signIn': 'Sign In',
    'nav.signUp': 'Sign Up Free',
    'nav.signOut': 'Sign Out',
    'nav.cloudResumes': 'Cloud Saved Resumes',
    'nav.adminPortal': 'Admin Portal',
    'nav.myTracker': 'My Application Tracker',

    // Home
    'home.badge': '100% Free · 40 Country Standards · Zero Watermarks',
    'home.heroTitle1': 'Build Your Global Career.',
    'home.heroTitle2': 'Stand Out Anywhere.',
    'home.heroSubtitle': 'Create country-tailored, ATS-friendly resumes, cover letters, and application outreach matching hiring norms in 40 jurisdictions. Free forever.',
    'home.targetDestination': 'Target Destination',
    'home.targetIndustry': 'Target Industry',
    'home.previewCvRules': 'Preview CV Rules',
    'home.startBuildingFree': 'Start Building Free',
    'home.selectCountryPlaceholder': 'Choose Country',

    // Resume Builder Steps
    'builder.stepPersonal': 'Personal',
    'builder.stepSummary': 'Summary',
    'builder.stepExperience': 'Experience',
    'builder.stepEducation': 'Education',
    'builder.stepSkills': 'Skills',
    'builder.stepMore': 'More',
    'builder.stepDesign': 'Design',
    'builder.next': 'Next',
    'builder.back': 'Back',
    'builder.finish': 'Complete Resume',
    'builder.preview': 'Preview Resume',
    'builder.exportPdf': 'Download PDF',
    'builder.exportDocx': 'Download Word (DOCX)',
    'builder.saveDraft': 'Save Draft',
    'builder.fullName': 'Full Name',
    'builder.jobTitle': 'Target Job Title',
    'builder.email': 'Email Address',
    'builder.phone': 'Phone Number',
    'builder.location': 'City & Country',
    'builder.addExperience': '+ Add Experience',
    'builder.addEducation': '+ Add Education',
    'builder.addSkill': '+ Add Skill',

    // ATS Checker
    'ats.badge': 'Transparent Applicant Tracking System Diagnostic',
    'ats.title': 'ATS Resume Checker & Keyword Matcher',
    'ats.subtitle': 'Evaluate how applicant tracking systems parse your resume. Compare your qualifications against target job descriptions, discover missing industry keywords, and fix formatting traps before applying.',
    'ats.dataSource': '1. Resume Data Source',
    'ats.activeResume': 'Active Resume',
    'ats.pasteText': 'Paste Custom Text',
    'ats.uploadFile': 'Upload Resume File',
    'ats.targetJobDescription': '2. Target Job Description',
    'ats.runDiagnostic': 'Run Genuine ATS Analysis',
    'ats.compatibilityScore': 'ATS Compatibility Score',
    'ats.quantifiedMetrics': 'Quantified Metrics',
    'ats.actionVerbs': 'Action Verbs Found',
    'ats.readability': 'Word Count & Readability',
    'ats.criticalIssues': 'Critical Issues to Fix',
    'ats.recommendations': 'Recommended Optimizations',
    'ats.passedChecks': 'Passed ATS Criteria',
    'ats.matchedKeywords': 'Matched Keywords',
    'ats.missingKeywords': 'Missing Must-Have Keywords',
    'ats.copyKeywords': 'Copy Missing Keywords',
    'ats.importSkills': 'Import Missing Skills to Resume',

    // Auth Modal
    'auth.signInTitle': 'Sign In to GlobeCareer',
    'auth.signUpTitle': 'Create Your Account',
    'auth.forgotTitle': 'Reset Password',
    'auth.signInSubtitle': 'Access cloud resumes, saved drafts & job tracker',
    'auth.signUpSubtitle': 'Start 100% free with unlimited export & verified jobs',
    'auth.forgotSubtitle': 'Enter your email to receive password reset instructions',
    'auth.googleButton': 'Continue with Google',
    'auth.orWithEmail': 'or with email',
    'auth.fullName': 'Full Name',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot?',
    'auth.sendResetLink': 'Send Reset Link',
    'auth.createAccount': 'Create Account',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',
    'auth.rememberedPassword': 'Remembered your password?',
    'auth.showPassword': 'Show password',
    'auth.hidePassword': 'Hide password',

    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.copy': 'Copy',
    'common.copied': 'Copied!',
    'common.download': 'Download',
    'common.search': 'Search',
    'common.allCountries': 'All 40 Countries',
    'common.language': 'Language',
  };

export const isSupportedLanguage = (code?: string): code is LanguageCode => {
  return Boolean(code && SUPPORTED_LANGUAGES.some((l) => l.code === code));
};

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: EN_TRANSLATIONS,
} as Record<LanguageCode, Translations>;


interface LanguageContextType {
  currentLanguage: LanguageCode;
  languageInfo: LanguageInfo;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string, defaultText?: string) => string;
  isRTL: boolean;
  detectedCountryCode?: string;
  isAutoDetected: boolean;
  isLanguageNoticeOpen: boolean;
  dismissLanguageNotice: (keepCurrent?: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Heuristic mapping from IANA timezone to primary Country and Language
const TIMEZONE_TO_LANG_MAP: Record<string, { lang: LanguageCode; country: string }> = {
  'America/New_York': { lang: 'en', country: 'us' },
  'America/Chicago': { lang: 'en', country: 'us' },
  'America/Denver': { lang: 'en', country: 'us' },
  'America/Los_Angeles': { lang: 'en', country: 'us' },
  'America/Toronto': { lang: 'en', country: 'ca' },
  'America/Vancouver': { lang: 'en', country: 'ca' },
  'Europe/London': { lang: 'en', country: 'uk' },
  'Australia/Sydney': { lang: 'en', country: 'au' },
  'Australia/Melbourne': { lang: 'en', country: 'au' },
  'Pacific/Auckland': { lang: 'en', country: 'nz' },
  'Europe/Dublin': { lang: 'en', country: 'ie' },
  'Europe/Berlin': { lang: 'de', country: 'de' },
  'Europe/Vienna': { lang: 'de', country: 'at' },
  'Europe/Zurich': { lang: 'de', country: 'ch' },
  'Europe/Paris': { lang: 'fr', country: 'fr' },
  'Europe/Brussels': { lang: 'fr', country: 'be' },
  'Europe/Luxembourg': { lang: 'fr', country: 'lu' },
  'Europe/Madrid': { lang: 'es', country: 'es' },
  'Europe/Rome': { lang: 'it', country: 'it' },
  'Europe/Lisbon': { lang: 'pt', country: 'pt' },
  'Europe/Warsaw': { lang: 'pl', country: 'pl' },
  'Europe/Amsterdam': { lang: 'nl', country: 'nl' },
  'Europe/Stockholm': { lang: 'sv', country: 'se' },
  'Europe/Oslo': { lang: 'no', country: 'no' },
  'Europe/Copenhagen': { lang: 'da', country: 'dk' },
  'Europe/Helsinki': { lang: 'fi', country: 'fi' },
  'Europe/Prague': { lang: 'cs', country: 'cz' },
  'Europe/Bratislava': { lang: 'sk', country: 'sk' },
  'Europe/Budapest': { lang: 'hu', country: 'hu' },
  'Europe/Bucharest': { lang: 'ro', country: 'ro' },
  'Europe/Sofia': { lang: 'bg', country: 'bg' },
  'Europe/Athens': { lang: 'el', country: 'gr' },
  'Europe/Zagreb': { lang: 'hr', country: 'hr' },
  'Asia/Tokyo': { lang: 'ja', country: 'jp' },
  'Asia/Dubai': { lang: 'ar', country: 'ae' },
  'Asia/Riyadh': { lang: 'ar', country: 'sa' },
  'Asia/Qatar': { lang: 'ar', country: 'qa' },
  'Asia/Kolkata': { lang: 'hi', country: 'in' },
  'Asia/Singapore': { lang: 'en', country: 'sg' },
  'Africa/Johannesburg': { lang: 'en', country: 'za' },
};

export function detectVisitorLocale(): {
  lang: LanguageCode;
  country?: string;
  isAutoDetected: boolean;
} {
  if (typeof window === 'undefined') {
    return { lang: 'en', isAutoDetected: false };
  }

  // Priority 1: User's explicitly chosen manual language preference
  try {
    const isManual = localStorage.getItem('globecareer_lang_manual') === 'true';
    const saved = localStorage.getItem('globecareer_lang') as LanguageCode;
    if (isManual && saved && isSupportedLanguage(saved)) {
      return { lang: saved, isAutoDetected: false };
    }
  } catch (e) {}

  // Priority 2: Explicit URL parameter (?lang=xx or ?hl=xx)
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const paramLang = (searchParams.get('lang') || searchParams.get('hl'))?.toLowerCase();
    if (paramLang) {
      const normalized = paramLang.split(/[-_]/)[0] as LanguageCode;
      if (isSupportedLanguage(normalized)) {
        return { lang: normalized, isAutoDetected: false };
      }
    }
  } catch (e) {}

  // Priority 3: Browser's preferred language list (navigator.languages / navigator.language)
  try {
    const navLangs = navigator.languages || [navigator.language || 'en'];
    for (const raw of navLangs) {
      if (!raw) continue;
      const normalized = raw.toLowerCase().trim().split(/[-_]/)[0] as LanguageCode;
      if (normalized && isSupportedLanguage(normalized)) {
        return {
          lang: normalized,
          isAutoDetected: normalized !== 'en',
        };
      }
    }
  } catch (e) {}

  // Priority 4: Reliable timezone heuristic as a secondary country hint
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && TIMEZONE_TO_LANG_MAP[tz]) {
      const match = TIMEZONE_TO_LANG_MAP[tz];
      if (isSupportedLanguage(match.lang)) {
        return {
          lang: match.lang,
          country: match.country,
          isAutoDetected: match.lang !== 'en',
        };
      }
    }
  } catch (e) {}

  // Priority 5: Default fallback
  return { lang: 'en', isAutoDetected: false };
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = detectVisitorLocale();
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>(initial.lang);
  const [detectedCountryCode] = useState<string | undefined>(initial.country);
    const [extraLoaded, setExtraLoaded] = useState(false);

  useEffect(() => {
    if (initial.lang !== "en" || currentLanguage !== "en") {
      import("../data/extraTranslations").then((mod) => {
        Object.assign(TRANSLATIONS, mod.EXTRA_TRANSLATIONS);
        setExtraLoaded(true);
      }).catch(() => {});
    }
  }, [currentLanguage]);
const [isAutoDetected] = useState<boolean>(initial.isAutoDetected);
  const [isLanguageNoticeOpen, setIsLanguageNoticeOpen] = useState<boolean>(() => {
    if (!initial.isAutoDetected) return false;
    try {
      const dismissed = localStorage.getItem('globecareer_lang_prompt_dismissed');
      const isManual = localStorage.getItem('globecareer_lang_manual');
      return dismissed !== 'true' && isManual !== 'true';
    } catch (_) {
      return false;
    }
  });

  const languageInfo = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
  const isRTL = Boolean(languageInfo.isRTL);

  const setLanguage = (code: LanguageCode) => {
    if (isSupportedLanguage(code)) {
      if (code !== 'en' && !extraLoaded) {
        import('../data/extraTranslations').then((mod) => {
          Object.assign(TRANSLATIONS, mod.EXTRA_TRANSLATIONS);
          setExtraLoaded(true);
          setCurrentLanguageState(code);
        }).catch(() => {
          setCurrentLanguageState(code);
        });
      } else {
        setCurrentLanguageState(code);
      }
      setIsLanguageNoticeOpen(false);
      try {
        localStorage.setItem('globecareer_lang', code);
        localStorage.setItem('globecareer_lang_manual', 'true');
      } catch (e) {}
    }
  };

  const dismissLanguageNotice = (keepCurrent = true) => {
    setIsLanguageNoticeOpen(false);
    try {
      localStorage.setItem('globecareer_lang_prompt_dismissed', 'true');
      if (keepCurrent) {
        localStorage.setItem('globecareer_lang_manual', 'true');
        localStorage.setItem('globecareer_lang', currentLanguage);
      }
    } catch (e) {}
  };

  // Sync html document dir and lang attributes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLanguage;
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      if (isRTL) {
        document.documentElement.classList.add('rtl-layout');
      } else {
        document.documentElement.classList.remove('rtl-layout');
      }
    }
  }, [currentLanguage, isRTL]);

  const t = (key: string, defaultText?: string): string => {
    const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    if (dict && dict[key]) return dict[key];
    // Fallback to English
    if (TRANSLATIONS.en && TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        languageInfo,
        setLanguage,
        t,
        isRTL,
        detectedCountryCode,
        isAutoDetected,
        isLanguageNoticeOpen,
        dismissLanguageNotice,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
