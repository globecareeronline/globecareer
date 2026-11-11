/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

import { HomePage } from './components/pages/HomePage';
import type { CoverLetterTemplateSpec } from './components/pages/CoverLetterTemplatesPage';
import { BackToTop } from './components/common/BackToTop';
import { LanguageDetectionBanner } from './components/common/LanguageDetectionBanner';
import { CookieConsentBanner } from './components/common/CookieConsentBanner';

// Lazy-loaded secondary pages & heavy modules to optimize Mobile LCP and FCP
const ResumeBuilderView = React.lazy(() => import('./components/builder/ResumeBuilderView').then(m => ({ default: m.ResumeBuilderView })));
const CountryGuidesPage = React.lazy(() => import('./components/pages/CountryGuidesPage').then(m => ({ default: m.CountryGuidesPage })));
const CountryDetailPage = React.lazy(() => import('./components/pages/CountryDetailPage').then(m => ({ default: m.CountryDetailPage })));
const TemplatesPage = React.lazy(() => import('./components/pages/TemplatesPage').then(m => ({ default: m.TemplatesPage })));
const JobExamplesPage = React.lazy(() => import('./components/pages/JobExamplesPage').then(m => ({ default: m.JobExamplesPage })));
const ATSGuidePage = React.lazy(() => import('./components/pages/ATSGuidePage').then(m => ({ default: m.ATSGuidePage })));
const ResumeWritingGuidePage = React.lazy(() => import('./components/pages/ResumeWritingGuidePage').then(m => ({ default: m.ResumeWritingGuidePage })));
const CoverLetterBuilder = React.lazy(() => import('./components/coverLetter/CoverLetterBuilder').then(m => ({ default: m.CoverLetterBuilder })));
const LetterAndEmailTemplatesPage = React.lazy(() => import('./components/pages/CoverLetterTemplatesPage').then(m => ({ default: m.LetterAndEmailTemplatesPage })));
const FAQPage = React.lazy(() => import('./components/pages/FAQPage').then(m => ({ default: m.FAQPage })));
const AboutUsPage = React.lazy(() => import('./components/pages/StaticPages').then(m => ({ default: m.AboutUsPage })));
const ContactPage = React.lazy(() => import('./components/pages/StaticPages').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = React.lazy(() => import('./components/pages/StaticPages').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfServicePage = React.lazy(() => import('./components/pages/StaticPages').then(m => ({ default: m.TermsOfServicePage })));
const CookiePolicyPage = React.lazy(() => import('./components/pages/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));
const ProfessionalBioGenerator = React.lazy(() => import('./components/tools/ProfessionalBioGenerator').then(m => ({ default: m.ProfessionalBioGenerator })));
const SummaryObjectiveGenerator = React.lazy(() => import('./components/tools/SummaryObjectiveGenerator').then(m => ({ default: m.SummaryObjectiveGenerator })));
const ResignationLetterGenerator = React.lazy(() => import('./components/tools/ResignationLetterGenerator').then(m => ({ default: m.ResignationLetterGenerator })));
const RecommendationGuidePage = React.lazy(() => import('./components/pages/RecommendationGuidePage').then(m => ({ default: m.RecommendationGuidePage })));
const JobsPage = React.lazy(() => import('./components/jobs/JobsPage').then(m => ({ default: m.JobsPage })));
const ApplicationTrackerPage = React.lazy(() => import('./components/tracker/ApplicationTrackerPage').then(m => ({ default: m.ApplicationTrackerPage })));
const RecommendationLetterBuilder = React.lazy(() => import('./components/recommendationLetter/RecommendationLetterBuilder').then(m => ({ default: m.RecommendationLetterBuilder })));
const JobApplicationEmailGenerator = React.lazy(() => import('./components/emailGenerator/JobApplicationEmailGenerator').then(m => ({ default: m.JobApplicationEmailGenerator })));
const InterviewPrepPage = React.lazy(() => import('./components/interview/InterviewPrepPage').then(m => ({ default: m.InterviewPrepPage })));
const ATSCheckerPage = React.lazy(() => import('./components/ats/ATSCheckerPage').then(m => ({ default: m.ATSCheckerPage })));
const AdminDashboard = React.lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AuthModal = React.lazy(() => import('./components/auth/AuthModal').then(m => ({ default: m.AuthModal })));
const CloudResumesModal = React.lazy(() => import('./components/resumes/CloudResumesModal').then(m => ({ default: m.CloudResumesModal })));
const EuropeanCVFormatPage = React.lazy(() => import('./components/pages/EuropeanCVFormatPage').then(m => ({ default: m.EuropeanCVFormatPage })));
const ResumeSkillsGuidePage = React.lazy(() => import('./components/pages/ResumeSkillsGuidePage').then(m => ({ default: m.ResumeSkillsGuidePage })));
const CVvsResumeGuidePage = React.lazy(() => import('./components/pages/CVvsResumeGuidePage').then(m => ({ default: m.CVvsResumeGuidePage })));
const ResumeWordCounter = React.lazy(() => import('./components/tools/ResumeWordCounter').then(m => ({ default: m.ResumeWordCounter })));
const ResumeBulletGenerator = React.lazy(() => import('./components/tools/ResumeBulletGenerator').then(m => ({ default: m.ResumeBulletGenerator })));
const ResumePhraseGenerator = React.lazy(() => import('./components/tools/ResumePhraseGenerator').then(m => ({ default: m.ResumePhraseGenerator })));
const ATSResumeMakerPage = React.lazy(() => import('./components/tools/ATSResumeMakerPage').then(m => ({ default: m.ATSResumeMakerPage })));
const GlobalResumeMap = React.lazy(() => import('./components/tools/GlobalResumeMap').then(m => ({ default: m.GlobalResumeMap })));
const ReverseChronologicalGuidePage = React.lazy(() => import('./components/pages/ReverseChronologicalGuidePage').then(m => ({ default: m.ReverseChronologicalGuidePage })));
const ResumeReferencesGuidePage = React.lazy(() => import('./components/pages/ResumeReferencesGuidePage').then(m => ({ default: m.ResumeReferencesGuidePage })));

const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Loading module...</p>
  </div>
);

import { generateSampleResume, SamplePersonaType } from './data/sampleResumes';
import { ResumeData, TemplateId } from './types/resume';
import { VerifiedJob } from './types/jobs';
import { getCountryById } from './data/countries';
import { applyPageSEO } from './utils/seo';

const PAGE_TO_PATH: Record<string, string> = {
  home: '/',
  builder: '/resume-builder',
  guides: '/country-guides',
  templates: '/templates',
  'job-examples': '/resume-examples',
  'ats-guide': '/ats-guide',
  'writing-guide': '/resume-writing-guide',
  'cover-letter': '/cover-letter-builder',
  'cover-letter-templates': '/letter-templates',
  'letter-templates': '/letter-templates',
  'recommendation-letter': '/recommendation-letter',
  'recommendation-guide': '/recommendation-letter-guide',
  'email-generator': '/email-generator',
  'bio-generator': '/bio-generator',
  'bio-templates': '/bio-templates',
  'summary-generator': '/summary-generator',
  'summary-templates': '/summary-templates',
  'resignation-letter': '/resignation-letter',
  'resignation-letter-templates': '/resignation-letter-templates',
  'interview-prep': '/interview-prep',
  'ats-checker': '/ats-checker',
  jobs: '/jobs',
  tracker: '/job-tracker',
  faq: '/faq',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookie-policy',
  'european-cv-format': '/european-cv-format',
  'resume-skills': '/resume-skills',
  'cv-vs-resume': '/cv-vs-resume',
  'resume-word-counter': '/resume-word-counter',
  'resume-bullet-generator': '/resume-bullet-generator',
  'phrase-generator': '/resume-phrase-generator',
  'ats-maker': '/ats-resume-maker',
  'resume-map': '/resume-map',
  'objective-generator': '/resume-objective-generator',
  'reverse-chronological': '/reverse-chronological-resume-format',
  'references-on-resume': '/references-on-resume',
  admin: '/admin',
};

const PAGE_ALIAS_MAP: Record<string, string> = {
  'resume-phrase-generator': 'phrase-generator',
  'phrase-generator': 'phrase-generator',
  'ats-resume-maker': 'ats-maker',
  'ats-cv-maker': 'ats-maker',
  'resume-map': 'resume-map',
  'resume-map-online': 'resume-map',
  'map-resume-online': 'resume-map',
  'online-resume-map': 'resume-map',
  'resume-objective-generator': 'objective-generator',
  'career-objective-generator': 'objective-generator',
  'reverse-chronological-resume-format': 'reverse-chronological',
  'chronological-resume-template': 'reverse-chronological',
  'resume-writing-guide': 'writing-guide',
  'country-guides': 'guides',
  'cover-letter-builder': 'cover-letter',
  'resume-builder': 'builder',
  'resume-templates': 'templates',
  'resume-examples': 'job-examples',
  'european-cv': 'european-cv-format',
  'eu-cv-format': 'european-cv-format',
  'skills-for-resume': 'resume-skills',
  'skills-to-put-on-resume': 'resume-skills',
  'how-to-list-references-on-a-resume': 'references-on-resume',
  'word-counter': 'resume-word-counter',
  'resume-length-checker': 'resume-word-counter',
  'bullet-generator': 'resume-bullet-generator',
  'bullet-point-generator': 'resume-bullet-generator',
  'letter-and-email-templates': 'letter-templates',
  'recommendation-letter-builder': 'recommendation-letter',
  'recommendation-letter-guide': 'recommendation-guide',
  'job-application-email': 'email-generator',
  'professional-bio-generator': 'bio-generator',
  'resume-summary-generator': 'summary-generator',
  'resignation-letter-generator': 'resignation-letter',
  'interview-preparation': 'interview-prep',
  'job-tracker': 'tracker',
};

const PATH_TO_PAGE: Record<string, string> = {
  '/': 'home',
  '/resume-builder': 'builder',
  '/country-guides': 'guides',
  '/templates': 'templates',
  '/resume-templates': 'templates',
  '/resume-examples': 'job-examples',
  '/job-examples': 'job-examples',
  '/ats-guide': 'ats-guide',
  '/resume-writing-guide': 'writing-guide',
  '/european-cv-format': 'european-cv-format',
  '/european-cv': 'european-cv-format',
  '/eu-cv-format': 'european-cv-format',
  '/resume-skills': 'resume-skills',
  '/skills-for-resume': 'resume-skills',
  '/skills-to-put-on-resume': 'resume-skills',
  '/cv-vs-resume': 'cv-vs-resume',
  '/difference-between-resume-and-cv': 'cv-vs-resume',
  '/resume-word-counter': 'resume-word-counter',
  '/word-counter': 'resume-word-counter',
  '/resume-length-checker': 'resume-word-counter',
  '/resume-bullet-generator': 'resume-bullet-generator',
  '/bullet-generator': 'resume-bullet-generator',
  '/bullet-point-generator': 'resume-bullet-generator',
  '/resume-phrase-generator': 'phrase-generator',
  '/phrase-generator': 'phrase-generator',
  '/ats-resume-maker': 'ats-maker',
  '/ats-cv-maker': 'ats-maker',
  '/resume-map': 'resume-map',
  '/resume-map-online': 'resume-map',
  '/map-resume-online': 'resume-map',
  '/online-resume-map': 'resume-map',
  '/resume-objective-generator': 'objective-generator',
  '/career-objective-generator': 'objective-generator',
  '/reverse-chronological-resume-format': 'reverse-chronological',
  '/chronological-resume-template': 'reverse-chronological',
  '/reverse-chronological': 'reverse-chronological',
  '/references-on-resume': 'references-on-resume',
  '/how-to-list-references-on-a-resume': 'references-on-resume',
  '/cover-letter-builder': 'cover-letter',
  '/cover-letter': 'cover-letter',
  '/cover-letter-templates': 'letter-templates',
  '/letter-templates': 'letter-templates',
  '/letter-and-email-templates': 'letter-templates',
  '/recommendation-letter': 'recommendation-letter',
  '/recommendation-letter-builder': 'recommendation-letter',
  '/recommendation-letter-guide': 'recommendation-guide',
  '/recommendation-guide': 'recommendation-guide',
  '/email-generator': 'email-generator',
  '/job-application-email': 'email-generator',
  '/bio-generator': 'bio-generator',
  '/professional-bio-generator': 'bio-generator',
  '/bio-templates': 'bio-templates',
  '/professional-bio-templates': 'bio-templates',
  '/summary-generator': 'summary-generator',
  '/resume-summary-generator': 'summary-generator',
  '/summary-templates': 'summary-templates',
  '/resume-summary-templates': 'summary-templates',
  '/career-objective-templates': 'summary-templates',
  '/resignation-letter': 'resignation-letter',
  '/resignation-letter-generator': 'resignation-letter',
  '/resignation-letter-templates': 'resignation-letter-templates',
  '/resignation-templates': 'resignation-letter-templates',
  '/interview-prep': 'interview-prep',
  '/interview-preparation': 'interview-prep',
  '/ats-checker': 'ats-checker',
  '/jobs': 'jobs',
  '/job-tracker': 'tracker',
  '/tracker': 'tracker',
  '/pricing': 'home',
  '/plans': 'home',
  '/subscription': 'tracker',
  '/billing': 'tracker',
  '/faq': 'faq',
  '/about': 'about',
  '/contact': 'contact',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/cookie-policy': 'cookies',
  '/admin': 'admin',
};

function parseRouteFromLocation(): { page: string; countryId?: string } {
  if (typeof window === 'undefined') return { page: 'home' };

  // File protocol local execution: parse from URL hash (e.g. file:///path/index.html#/templates)
  if (window.location.protocol === 'file:') {
    const rawHash = (window.location.hash || '').replace(/^#/, '').toLowerCase().replace(/\/$/, '') || '/';
    const hashCountryMatch = rawHash.match(/^\/(?:country|country-guides)\/([a-z0-9_-]+)$/);
    if (hashCountryMatch) {
      return { page: 'country-detail', countryId: hashCountryMatch[1] };
    }
    const hashMapped = PATH_TO_PAGE[rawHash];
    if (hashMapped) return { page: hashMapped };
    return { page: 'home' };
  }

  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const countryMatch = pathname.match(/^\/(?:country|country-guides)\/([a-z0-9_-]+)$/);
  if (countryMatch) {
    return { page: 'country-detail', countryId: countryMatch[1] };
  }
  
  const mapped = PATH_TO_PAGE[pathname];
  if (mapped) return { page: mapped };

  return { page: 'home' };
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('us');
  const [selectedCoverLetterTemplate, setSelectedCoverLetterTemplate] = useState<CoverLetterTemplateSpec | undefined>();
  const [selectedRecommendationPreset, setSelectedRecommendationPreset] = useState<any | undefined>();
  const [selectedEmailPreset, setSelectedEmailPreset] = useState<any | undefined>();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('globecareer_theme') || localStorage.getItem('globecv_theme');
    if (saved) return saved === 'dark';
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [isCloudResumesOpen, setIsCloudResumesOpen] = useState(false);

  const [activeResumeData, setActiveResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('globecareer_resume_data') || localStorage.getItem('globecv_resume_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return generateSampleResume('us', 'experienced');
  });

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('globecareer_theme', 'dark');
      localStorage.setItem('globecv_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('globecareer_theme', 'light');
      localStorage.setItem('globecv_theme', 'light');
    }
  }, [isDarkMode]);

  // Initial route parse, popstate, and hashchange listener for SEO and clean URL / local file navigation
  useEffect(() => {
    const handleRouteSync = () => {
      const { page, countryId } = parseRouteFromLocation();
      setCurrentPage(page);
      if (countryId) setSelectedCountryId(countryId);
      applyPageSEO(page, { countryId });
    };

    const initial = parseRouteFromLocation();
    if (initial.page !== 'home' || initial.countryId) {
      setCurrentPage(initial.page);
      if (initial.countryId) setSelectedCountryId(initial.countryId);
      applyPageSEO(initial.page, { countryId: initial.countryId });
    } else {
      applyPageSEO('home');
    }

    window.addEventListener('popstate', handleRouteSync);
    window.addEventListener('hashchange', handleRouteSync);
    return () => {
      window.removeEventListener('popstate', handleRouteSync);
      window.removeEventListener('hashchange', handleRouteSync);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const navigateTo = (rawPage: string, countryIdParam?: string) => {
    const page = PAGE_ALIAS_MAP[rawPage] || rawPage;
    setCurrentPage(page);
    let targetPath = PAGE_TO_PATH[page] || '/';
    if (page === 'country-detail') {
      const cId = countryIdParam || selectedCountryId || 'us';
      targetPath = `/country/${cId}`;
    }

    if (typeof window !== 'undefined') {
      try {
        if (window.location.protocol === 'file:') {
          window.location.hash = targetPath;
        } else if (window.location.pathname !== targetPath) {
          window.history.pushState(null, '', targetPath);
        }
      } catch (e) {
        try {
          window.location.hash = targetPath;
        } catch (_) {}
      }
    }
    applyPageSEO(page, { countryId: countryIdParam || selectedCountryId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch resume builder with pre-configured settings
  const handleStartResume = (countryId?: string, categoryId?: string, persona: SamplePersonaType = 'experienced') => {
    const targetCountry = countryId || activeResumeData.targetCountryId || 'us';
    const targetCategory = categoryId || activeResumeData.targetJobCategory || 'it-software';
    const newResume = generateSampleResume(targetCountry, persona, targetCategory);
    setActiveResumeData(newResume);
    setSelectedCountryId(targetCountry);
    navigateTo('builder');
  };

  const handleSelectCountryDetail = (countryId: string) => {
    setSelectedCountryId(countryId);
    navigateTo('country-detail', countryId);
  };

  const handleSelectTemplate = (templateId: TemplateId, countryId?: string) => {
    const targetCountry = countryId || selectedCountryId || activeResumeData.targetCountryId || 'us';
    const isPhotoTemplate = ['european_modern', 'executive_photo', 'creative_showcase'].includes(templateId);
    const country = getCountryById(targetCountry);

    // If a specific country is requested and differs from current resume, generate fresh sample for that country
    if (countryId && countryId !== activeResumeData.targetCountryId) {
      const newResume = generateSampleResume(targetCountry, 'experienced');
      newResume.design.templateId = templateId;
      newResume.design.showPhoto = isPhotoTemplate;
      newResume.design.paperSize = country.paperSize;
      setActiveResumeData(newResume);
      setSelectedCountryId(targetCountry);
    } else {
      setActiveResumeData(prev => ({
        ...prev,
        targetCountryId: targetCountry,
        design: {
          ...prev.design,
          templateId,
          showPhoto: isPhotoTemplate,
          paperSize: country.paperSize
        }
      }));
    }
    navigateTo('builder');
  };

  const handleSelectJobCategory = (catId: string) => {
    const updated = generateSampleResume(activeResumeData.targetCountryId, 'experienced', catId);
    setActiveResumeData(updated);
    navigateTo('builder');
  };

  const handleStartWithJob = (jobDescription?: string) => {
    navigateTo('builder');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-150 ${isDarkMode ? 'dark bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`}>
      {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-blue-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Universal Header with Top Bar Contract */}
      {currentPage !== 'admin' && (
        <Header
          currentPage={currentPage}
          onNavigate={navigateTo}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onOpenAuth={(mode) => {
            setAuthModalMode(mode || 'signin');
            setIsAuthModalOpen(true);
          }}
          onOpenCloudResumes={() => setIsCloudResumesOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {currentPage === 'home' && (
          <HomePage
            onStartResume={(cId, catId) => handleStartResume(cId, catId)}
            onNavigate={navigateTo}
          />
        )}

        {currentPage !== 'home' && (
          <React.Suspense fallback={<PageLoadingFallback />}>
            {currentPage === 'builder' && (
              <ResumeBuilderView
                initialResumeData={activeResumeData}
                onDataChange={setActiveResumeData}
                onOpenCloudResumes={() => setIsCloudResumesOpen(true)}
              />
            )}

            {currentPage === 'guides' && (
              <CountryGuidesPage
                onSelectCountry={handleSelectCountryDetail}
                onStartResumeForCountry={(cId) => handleStartResume(cId)}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'country-detail' && (
              <CountryDetailPage
                countryId={selectedCountryId}
                onBack={() => navigateTo('guides')}
                onStartResume={(cId, persona) => handleStartResume(cId, undefined, persona)}
                onNavigate={(page, cId) => {
                  if (cId) setSelectedCountryId(cId);
                  navigateTo(page);
                }}
              />
            )}

            {currentPage === 'templates' && (
              <TemplatesPage
                onSelectTemplate={handleSelectTemplate}
                initialCountryId={selectedCountryId}
                onCountryChange={setSelectedCountryId}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'jobs' && (
              <JobsPage
                onOpenAuth={() => setIsAuthModalOpen(true)}
                onNavigateToBuilder={handleStartWithJob}
              />
            )}

            {currentPage === 'tracker' && (
              <ApplicationTrackerPage
                onOpenAuth={() => setIsAuthModalOpen(true)}
                onNavigateToJobs={() => navigateTo('jobs')}
              />
            )}

            {currentPage === 'recommendation-letter' && (
              <RecommendationLetterBuilder
                onNavigate={navigateTo}
                initialPreset={selectedRecommendationPreset}
                onNavigateToTemplates={() => navigateTo('letter-templates')}
              />
            )}

            {currentPage === 'email-generator' && (
              <JobApplicationEmailGenerator
                onNavigate={navigateTo}
                initialPreset={selectedEmailPreset}
                onNavigateToTemplates={() => navigateTo('letter-templates')}
              />
            )}

            {currentPage === 'interview-prep' && (
              <InterviewPrepPage onNavigate={navigateTo} />
            )}

            {currentPage === 'ats-checker' && (
              <ATSCheckerPage
                resumeData={activeResumeData}
                onNavigateToBuilder={() => navigateTo('builder')}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'admin' && (
              <AdminDashboard
                onBackToApp={() => navigateTo('home')}
              />
            )}

            {currentPage === 'job-examples' && (
              <JobExamplesPage
                onSelectCategory={handleSelectJobCategory}
              />
            )}

            {currentPage === 'ats-guide' && (
              <ATSGuidePage
                onStartBuilder={() => navigateTo('builder')}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'writing-guide' && (
              <ResumeWritingGuidePage
                onStartBuilder={() => navigateTo('builder')}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'european-cv-format' && (
              <EuropeanCVFormatPage
                onStartBuilder={(preset) => {
                  if (preset === 'eu') {
                    setSelectedCountryId('de');
                  }
                  navigateTo('builder');
                }}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'resume-skills' && (
              <ResumeSkillsGuidePage
                onStartBuilder={(selectedSkills) => {
                  if (selectedSkills && selectedSkills.length > 0) {
                    setActiveResumeData(prev => {
                      const existingNames = new Set((prev.skills || []).map(sk => sk.name.toLowerCase()));
                      const newSkillItems = selectedSkills
                        .filter(s => !existingNames.has(s.toLowerCase()))
                        .map(s => ({
                          id: `skill_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
                          name: s,
                          category: 'Technical' as const,
                          level: 'Advanced' as const
                        }));

                      return {
                        ...prev,
                        skills: [...(prev.skills || []), ...newSkillItems]
                      };
                    });
                  }
                  navigateTo('builder');
                }}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'cv-vs-resume' && (
              <CVvsResumeGuidePage
                onStartBuilder={(countryId) => {
                  if (countryId) setSelectedCountryId(countryId);
                  navigateTo('builder');
                }}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'resume-word-counter' && (
              <ResumeWordCounter
                onNavigate={navigateTo}
                onStartBuilder={() => navigateTo('builder')}
              />
            )}

            {currentPage === 'resume-bullet-generator' && (
              <ResumeBulletGenerator
                onNavigate={navigateTo}
                onStartBuilder={() => navigateTo('builder')}
              />
            )}

            {currentPage === 'phrase-generator' && (
              <ResumePhraseGenerator
                onNavigate={navigateTo}
                onApplyToResume={(phrase) => {
                  setActiveResumeData(prev => {
                    const exp = [...(prev.experience || [])];
                    if (exp.length > 0) {
                      exp[0] = {
                        ...exp[0],
                        description: [...(exp[0].description || []), phrase]
                      };
                    }
                    return { ...prev, experience: exp };
                  });
                  navigateTo('builder');
                }}
              />
            )}

            {currentPage === 'ats-maker' && (
              <ATSResumeMakerPage
                onNavigate={navigateTo}
                onStartResumeForCountry={(countryId) => {
                  setSelectedCountryId(countryId);
                  navigateTo('builder');
                }}
              />
            )}

            {currentPage === 'resume-map' && (
              <GlobalResumeMap
                onNavigate={navigateTo}
                onSelectCountry={(countryId) => {
                  setSelectedCountryId(countryId);
                  navigateTo('country-detail', countryId);
                }}
                onStartResumeForCountry={(countryId) => {
                  setSelectedCountryId(countryId);
                  navigateTo('builder');
                }}
              />
            )}

            {currentPage === 'objective-generator' && (
              <SummaryObjectiveGenerator
                onNavigate={navigateTo}
                initialMode="objective"
                onApplyToResume={(summaryText) => {
                  setActiveResumeData(prev => ({
                    ...prev,
                    summary: summaryText
                  }));
                  navigateTo('builder');
                }}
              />
            )}

            {currentPage === 'reverse-chronological' && (
              <ReverseChronologicalGuidePage
                onStartBuilder={() => navigateTo('builder')}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'references-on-resume' && (
              <ResumeReferencesGuidePage
                onStartBuilder={() => navigateTo('builder')}
                onNavigate={navigateTo}
              />
            )}

            {currentPage === 'cover-letter' && (
              <CoverLetterBuilder
                resumeData={activeResumeData}
                initialTemplate={selectedCoverLetterTemplate}
                onNavigateToBuilder={() => navigateTo('builder')}
                onNavigateToTemplates={() => navigateTo('letter-templates')}
              />
            )}

            {(currentPage === 'cover-letter-templates' || currentPage === 'letter-templates') && (
              <LetterAndEmailTemplatesPage
                onUseCoverLetterTemplate={(template) => {
                  setSelectedCoverLetterTemplate(template);
                  navigateTo('cover-letter');
                }}
                onUseRecommendationPreset={(preset) => {
                  setSelectedRecommendationPreset(preset);
                  navigateTo('recommendation-letter');
                }}
                onUseEmailPreset={(preset) => {
                  setSelectedEmailPreset(preset);
                  navigateTo('email-generator');
                }}
                onNavigate={navigateTo}
              />
            )}

            {(currentPage === 'bio-generator' || currentPage === 'bio-templates') && (
              <ProfessionalBioGenerator
                onNavigate={navigateTo}
                initialTab={currentPage === 'bio-templates' ? 'templates' : 'generator'}
              />
            )}

            {(currentPage === 'summary-generator' || currentPage === 'summary-templates') && (
              <SummaryObjectiveGenerator
                onNavigate={navigateTo}
                initialTab={currentPage === 'summary-templates' ? 'templates' : 'generator'}
                onApplyToResume={(summaryText) => {
                  setActiveResumeData(prev => ({
                    ...prev,
                    summary: summaryText
                  }));
                  navigateTo('builder');
                }}
              />
            )}

            {(currentPage === 'resignation-letter' || currentPage === 'resignation-letter-templates') && (
              <ResignationLetterGenerator
                onNavigate={navigateTo}
                initialTab={currentPage === 'resignation-letter-templates' ? 'templates' : 'generator'}
              />
            )}

            {currentPage === 'recommendation-guide' && (
              <RecommendationGuidePage
                onStartBuilder={() => navigateTo('recommendation-letter')}
                onNavigateToTemplates={() => navigateTo('letter-templates')}
              />
            )}

            {currentPage === 'faq' && (
              <FAQPage />
            )}

            {currentPage === 'about' && (
              <AboutUsPage />
            )}

            {currentPage === 'contact' && (
              <ContactPage />
            )}

            {currentPage === 'privacy' && (
              <PrivacyPolicyPage />
            )}

            {currentPage === 'terms' && (
              <TermsOfServicePage />
            )}

            {currentPage === 'cookies' && (
              <CookiePolicyPage />
            )}
          </React.Suspense>
        )}
      </main>

      {/* Global Footer */}
      {currentPage !== 'admin' && (
        <Footer onNavigate={navigateTo} />
      )}

      {/* Modals wrapped in lightweight Suspense */}
      <React.Suspense fallback={null}>
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            defaultMode={authModalMode}
          />
        )}

        {isCloudResumesOpen && (
          <CloudResumesModal
            isOpen={isCloudResumesOpen}
            onClose={() => setIsCloudResumesOpen(false)}
            currentResumeData={activeResumeData}
            onLoadResume={(loadedResume) => {
              setActiveResumeData(loadedResume);
              navigateTo('builder');
            }}
            onOpenAuth={() => {
              setAuthModalMode('signin');
              setIsAuthModalOpen(true);
            }}
          />
        )}
      </React.Suspense>

      {/* Global Floating Utilities: Language Notification, Back To Top & Privacy Consent */}
      <LanguageDetectionBanner />
      <BackToTop />
      <CookieConsentBanner onNavigateToPolicy={navigateTo} />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}
