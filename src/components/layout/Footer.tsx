import React from 'react';
import { GlobeCareerLogo } from '../common/GlobeCareerLogo';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 no-print transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        {/* 1. Brand & Tagline at the Top */}
        <div className="space-y-3.5 max-w-2xl pb-8 border-b border-neutral-200 dark:border-neutral-800">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg inline-block"
            title="GlobeCareer – Build Your Global Career. Stand Out Anywhere."
          >
            <GlobeCareerLogo size="sm" showWordmark={true} />
          </a>
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              Build Your Global Career. Stand Out Anywhere.
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Free country-tailored resume builder, cover letters, outreach tools, and career templates across 40+ countries. Zero paywalls, zero watermarks.
            </p>
          </div>
        </div>

        {/* 2. Four Main Sections in Upper Row: Career Tools, Template Libraries, Jobs & Mobility, About & Legal */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 border-b border-neutral-200 dark:border-neutral-800">
          {/* Group 1: Career Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
              Career Tools
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href="/resume-builder"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('builder');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Resume Builder
              </a>
              <a
                href="/cover-letter-builder"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('cover-letter');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Cover Letter Builder
              </a>
              <a
                href="/recommendation-letter"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('recommendation-letter');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Recommendation Letter Builder
              </a>
              <a
                href="/email-generator"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('email-generator');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Job Application Email Generator
              </a>
              <a
                href="/bio-generator"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('bio-generator');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Professional Bio Generator
              </a>
              <a
                href="/summary-generator"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('summary-generator');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Summary &amp; Objective Generator
              </a>
              <a
                href="/resignation-letter"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('resignation-letter');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Resignation Letter Generator
              </a>
              <a
                href="/ats-checker"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('ats-checker');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                ATS Resume Checker
              </a>
              <a
                href="/interview-prep"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('interview-prep');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Interview Preparation
              </a>
            </div>
          </div>

          {/* Group 2: Template Libraries */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
              Template Libraries
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href="/templates"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('templates');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Resume &amp; CV Templates
              </a>
              <a
                href="/letter-templates"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('letter-templates');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Letter &amp; Email Templates
              </a>
              <a
                href="/bio-templates"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('bio-templates');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Professional Bio Templates (15)
              </a>
              <a
                href="/summary-templates"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('summary-templates');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Summary &amp; Objective Templates (18)
              </a>
              <a
                href="/resignation-letter-templates"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('resignation-letter-templates');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Resignation Letter Templates (11)
              </a>
              <a
                href="/resume-examples"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('job-examples');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Role-Specific Resume Examples
              </a>
            </div>
          </div>

          {/* Group 3: Jobs & Mobility */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
              Jobs &amp; Mobility
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href="/jobs"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('jobs');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Verified Jobs Portal
              </a>
              <a
                href="/job-tracker"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('tracker');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Job Application Tracker
              </a>
              <a
                href="/country-guides"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('guides');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Country Guides (40+)
              </a>
              <a
                href="/recommendation-letter-guide"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('recommendation-guide');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Recommendation Letter Guide
              </a>
              <a
                href="/ats-guide"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('ats-guide');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                ATS Compatibility Guide
              </a>
              <a
                href="/resume-writing-guide"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('writing-guide');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Resume Writing Guide
              </a>
            </div>
          </div>

          {/* Group 4: About & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
              About &amp; Legal
            </h4>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('about');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About GlobeCareer
              </a>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('contact');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact &amp; Support
              </a>
              <a
                href="/faq"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('faq');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Frequently Asked Questions
              </a>
              <a
                href="/privacy"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('privacy');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('terms');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/cookie-policy"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('cookies');
                }}
                className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Cookie Preferences
              </a>
            </div>
          </div>
        </div>

        {/* 3. Questions? in Lower-Row Position */}
        <div className="pt-6 space-y-2">
          <h4 className="font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider text-[11px]">
            Questions?
          </h4>
          <div className="flex flex-col space-y-2 text-xs">
            <a
              href="mailto:info@globecareer.online"
              className="text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              info@globecareer.online
            </a>
          </div>
        </div>

        {/* Global Compliance & Trust Strip */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} GlobeCareer. All rights reserved. Free international career platform.</p>
          <div className="flex items-center gap-6">
            <span>40+ Countries Supported</span>
            <span>•</span>
            <span>100% Free &amp; Open Access</span>
            <span>•</span>
            <span>No Watermarks</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
