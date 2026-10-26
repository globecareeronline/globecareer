import React, { useState } from 'react';
import { Mail, Shield, CheckCircle2, Trash2, Send } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Our Mission & Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          About GlobeCareer
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          GlobeCareer was founded on a simple principle: talent is global, but hiring conventions are local. An outstanding software engineer from Europe applying for a US position shouldn't be discarded simply because their resume has a photo; and an experienced marketing executive applying in Germany shouldn't be overlooked because their application lacks a structured Tabellarischer Lebenslauf.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block">40 Verified Jurisdictions</span>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Every country profile is grounded in statutory labor regulations, public employment agencies, and verified regional practices.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block">Zero-Lockin Privacy</span>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Your career history, contact details, and documents are stored client-side in your own browser, never on remote database servers.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block">Genuine Exports</span>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            True selectable-text vector PDFs and genuine Microsoft Word (.docx) files created with production-grade typographic discipline.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Contact GlobeCareer Support
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Have questions about country guidelines, legal compliance, or document exports? Reach out to our team.
        </p>
      </div>

      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm">
        {submitted ? (
          <div className="p-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Message Received
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
              Thank you for contacting GlobeCareer. Our team reviews all inquiries promptly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-xs font-semibold text-blue-600 hover:underline pt-2"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Inquiry or Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry or suggested country guideline update..."
                className="w-full p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none leading-relaxed"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC = () => {
  const [cleared, setCleared] = useState(false);

  const handleClearData = () => {
    localStorage.removeItem('globecv_resume_data');
    localStorage.removeItem('globecv_saved_drafts');
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Client-Side Privacy Guarantee
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Last updated: October 2026.
        </p>
      </div>

      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-5 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          1. Data Minimization & Local Storage Architecture
        </h3>
        <p>
          GlobeCareer operates under strict privacy-by-design standards. We do not require registration or personal account creation. Any information you input into the resume or cover letter builder—including your full name, contact information, work history, education, and uploaded photos—is stored strictly within your browser’s local client storage (<code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">window.localStorage</code>).
        </p>

        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          2. No Third-Party Sales or Brokerage
        </h3>
        <p>
          We never sell, rent, or monetize your resume data, employment credentials, or contact details with data brokers, recruiters, or advertisers.
        </p>

        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          3. Document Generation
        </h3>
        <p>
          Both PDF print output and Microsoft Word (.docx) generation occur directly in-memory on your device using client-side JavaScript libraries. No copies of your documents are stored on remote web servers.
        </p>

        {/* Clear Data Control Button */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-bold text-neutral-900 dark:text-neutral-100 block">
                Manage Your Local Resume Data
              </span>
              <span className="text-[11px] text-neutral-500">
                You can permanently purge all stored draft resumes and preferences from this device at any time.
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearData}
              className="px-4 py-2 text-xs font-semibold bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {cleared ? 'All Stored Data Cleared!' : 'Purge All Local Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Legal Agreement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Last updated: October 2026.
        </p>
      </div>

      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-5 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          1. Terms of Acceptance
        </h3>
        <p>
          By accessing or using GlobeCareer, you agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, please discontinue using the service.
        </p>

        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          2. Accuracy of Representation
        </h3>
        <p>
          GlobeCareer provides formatting templates, regulatory guidelines, and structural recommendations. Users are solely responsible for ensuring the truthfulness and accuracy of all employment histories, qualifications, degrees, licenses, and achievements entered into their documents. GlobeCareer strictly condemns fabricated resumes.
        </p>

        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          3. No Employment Guarantee
        </h3>
        <p>
          GlobeCareer does not warrant or guarantee that utilizing our templates, ATS optimizations, or country-specific recommendations will guarantee job interviews, employment offers, or specific recruitment outcomes.
        </p>

        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          4. Intellectual Property
        </h3>
        <p>
          You retain complete ownership of all personal content and text you create. GlobeCareer retains all rights to its application code, formatting algorithms, and design templates.
        </p>

        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          5. 100% Free Access & Usage Terms
        </h3>
        <p>
          GlobeCareer provides 100% free access to all core career tools: the Resume Builder, Cover Letter Builder, Recommendation Letter Builder, Job Application Email Generator, Interview Preparation Toolkit, and ATS Resume Checker. No subscriptions, credit cards, or payment credentials are required to generate, edit, or download documents in PDF or Microsoft Word DOCX formats.
        </p>

        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          6. Verified Job Opportunities & Anti-Scam Standards
        </h3>
        <p>
          Verified job listings in the GlobeCareer portal are audited against official employer career systems, direct ATS gateways, and verified corporate sources without placement fees or paywalls. GlobeCareer is not an employer, recruiter, or staffing firm, and cannot guarantee hiring decisions, interviews, or employment offers.
        </p>

        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
          7. Responsible Tool Usage
        </h3>
        <p>
          Users agree to provide truthful, accurate career information when generating resumes, letters of recommendation, and application materials. Automated scraping or abusive bot submissions to third-party employer portals are strictly prohibited.
        </p>
      </div>
    </div>
  );
};
