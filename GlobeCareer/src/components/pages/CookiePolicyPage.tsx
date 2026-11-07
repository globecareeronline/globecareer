import React from 'react';
import { ShieldCheck, Cookie, Settings2 } from 'lucide-react';

export const CookiePolicyPage: React.FC<{ onOpenCookieSettings?: () => void }> = ({
  onOpenCookieSettings,
}) => {
  const handleOpenSettings = () => {
    if (onOpenCookieSettings) {
      onOpenCookieSettings();
    } else {
      window.dispatchEvent(new CustomEvent('globecareer:open-cookie-settings'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-neutral-800 dark:text-neutral-200">
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 block">
          Transparency &amp; Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Last updated: October 2026. Compliant with ePrivacy Directive, GDPR, and Google Publisher Policies.
        </p>
      </div>

      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xs space-y-6 text-xs leading-relaxed">
        <div className="flex items-center justify-between p-4 bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl">
          <div className="space-y-1">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 text-xs block">
              Manage Your Cookie Preferences
            </span>
            <span className="text-[11px] text-neutral-600 dark:text-neutral-400">
              You can adjust or revoke your cookie choices on this device at any time.
            </span>
          </div>
          <button
            type="button"
            onClick={handleOpenSettings}
            className="py-2 px-4 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold text-xs rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
          >
            <Settings2 className="w-3.5 h-3.5" />
            Cookie Settings
          </button>
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            1. What Are Cookies and Local Storage Technologies?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Cookies are small text files that websites store on your computer or mobile device when you visit. In addition to HTTP cookies, GlobeCareer utilizes modern browser storage technologies such as <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">window.localStorage</code> and session tokens. These technologies allow the application to remember your preferences (such as light or dark theme) and preserve your in-progress resume drafts on your device without forcing you to create an account.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            2. Categories of Cookies We Use
          </h2>
          <div className="space-y-3 pt-1">
            <div className="p-3.5 bg-neutral-50 dark:bg-neutral-950/60 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <span className="font-bold text-neutral-900 dark:text-neutral-100 block mb-1">
                A. Strictly Necessary &amp; Functional Storage (Always Active)
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                These identifiers and storage entries are essential for platform operation. They persist your resume drafts in your browser, maintain your selected country formatting rules, remember your theme preference (light/dark mode), and keep your session authenticated if you sign in to GlobeCareer. Without these, core features such as drafting a resume or maintaining your session would fail.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-50 dark:bg-neutral-950/60 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <span className="font-bold text-neutral-900 dark:text-neutral-100 block mb-1">
                B. Performance &amp; Analytics Cookies (Optional)
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                These entries allow us to count page visits, analyze user journeys, and understand which country CV templates and ATS guides are most valuable to job seekers. All metrics are aggregated anonymously.
              </p>
            </div>

            <div className="p-3.5 bg-neutral-50 dark:bg-neutral-950/60 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <span className="font-bold text-neutral-900 dark:text-neutral-100 block mb-1">
                C. Advertising &amp; Third-Party Cookies (Optional)
              </span>
              <p className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                GlobeCareer partners with trusted advertising networks, including Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising at any time through our Cookie Settings or by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline">Google Ads Settings</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            3. How to Control and Delete Cookies
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            You can modify your preferences at any time by clicking the "Cookie Settings" button above or via the link in the footer of every page. You can also configure your web browser to block or delete cookies entirely through your browser settings (Chrome, Firefox, Safari, Edge). Please note that clearing browser local storage will delete unsaved local resume drafts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            4. Contact Our Team
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            For inquiries regarding our use of cookies, data protection, or privacy controls, please email <a href="mailto:info@globecareer.online" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">info@globecareer.online</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
