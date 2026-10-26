/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

import { HomePage } from './components/pages/HomePage';
import { ResumeBuilderView } from './components/builder/ResumeBuilderView';
import { CountryGuidesPage } from './components/pages/CountryGuidesPage';
import { CountryDetailPage } from './components/pages/CountryDetailPage';
import { TemplatesPage } from './components/pages/TemplatesPage';
import { JobExamplesPage } from './components/pages/JobExamplesPage';
import { ATSGuidePage } from './components/pages/ATSGuidePage';
import { ResumeWritingGuidePage } from './components/pages/ResumeWritingGuidePage';
import { CoverLetterBuilder } from './components/coverLetter/CoverLetterBuilder';
import { CoverLetterTemplateSpec, LetterAndEmailTemplatesPage } from './components/pages/CoverLetterTemplatesPage';
import { FAQPage } from './components/pages/FAQPage';
import { AboutUsPage, ContactPage, PrivacyPolicyPage, TermsOfServicePage } from './components/pages/StaticPages';
import { ProfessionalBioGenerator } from './components/tools/ProfessionalBioGenerator';
import { SummaryObjectiveGenerator } from './components/tools/SummaryObjectiveGenerator';
import { ResignationLetterGenerator } from './components/tools/ResignationLetterGenerator';
import { RecommendationGuidePage } from './components/pages/RecommendationGuidePage';

import { JobsPage } from './components/jobs/JobsPage';
import { ApplicationTrackerPage } from './components/tracker/ApplicationTrackerPage';
import { RecommendationLetterBuilder } from './components/recommendationLetter/RecommendationLetterBuilder';
import { JobApplicationEmailGenerator } from './components/emailGenerator/JobApplicationEmailGenerator';
import { InterviewPrepPage } from './components/interview/InterviewPrepPage';
import { ATSCheckerPage } from './components/ats/ATSCheckerPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthModal } from './components/auth/AuthModal';
import { CloudResumesModal } from './components/resumes/CloudResumesModal';

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
  admin: '/admin',
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
  '/career-objective-generator': 'summary-generator',
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

  const navigateTo = (page: string, countryIdParam?: string) => {
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
      {/* Universal Header with Top Bar Contract */}
      {currentPage !== 'admin' && (
        <Header
          currentPage={currentPage}
          onNavigate={navigateTo}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenCloudResumes={() => setIsCloudResumesOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onStartResume={(cId, catId) => handleStartResume(cId, catId)}
            onNavigate={navigateTo}
          />
        )}

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
          />
        )}

        {currentPage === 'country-detail' && (
          <CountryDetailPage
            countryId={selectedCountryId}
            onBack={() => navigateTo('guides')}
            onStartResume={(cId, persona) => handleStartResume(cId, undefined, persona)}
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
          />
        )}

        {currentPage === 'writing-guide' && (
          <ResumeWritingGuidePage
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
      </main>

      {/* Global Footer */}
      {currentPage !== 'admin' && (
        <Footer onNavigate={navigateTo} />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Cloud Resumes Modal */}
      <CloudResumesModal
        isOpen={isCloudResumesOpen}
        onClose={() => setIsCloudResumesOpen(false)}
        currentResumeData={activeResumeData}
        onLoadResume={(loadedResume) => {
          setActiveResumeData(loadedResume);
          navigateTo('builder');
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
