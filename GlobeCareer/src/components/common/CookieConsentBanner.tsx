import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Settings2, Check } from 'lucide-react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'globecareer_cookie_preferences';
const LEGACY_KEY = 'globecv_cookie_preferences';

export const CookieConsentBanner: React.FC<{ onNavigateToPolicy?: (page: string) => void }> = ({
  onNavigateToPolicy,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_KEY);
    if (!saved) {
      // Delay showing banner slightly to avoid layout flash
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    } else {
      try {
        setPreferences(JSON.parse(saved));
      } catch (e) {}
    }

    // Listen to custom global event so Footer "Cookie Settings" link can reopen modal
    const handleReopen = () => {
      setShowModal(true);
    };
    window.addEventListener('globecareer:open-cookie-settings', handleReopen);
    window.addEventListener('globecv:open-cookie-settings', handleReopen);
    return () => {
      window.removeEventListener('globecareer:open-cookie-settings', handleReopen);
      window.removeEventListener('globecv:open-cookie-settings', handleReopen);
    };
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    const updated = { ...prefs, timestamp: new Date().toISOString() };
    setPreferences(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setIsOpen(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: '',
    });
  };

  const handleEssentialOnly = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: '',
    });
  };

  return (
    <>
      {/* Floating Bottom Banner */}
      {isOpen && !showModal && (
        <aside
          aria-label="Cookie and privacy preferences"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-2xl text-xs text-neutral-700 dark:text-neutral-300 space-y-3 transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Cookie &amp; Privacy Preferences</span>
            </div>
            <button
              type="button"
              onClick={handleEssentialOnly}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-0.5"
              aria-label="Dismiss banner with essential cookies"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
            GlobeCareer uses essential local storage to save your resume drafts locally. With your permission, we also use cookies to understand site performance and deliver non-intrusive career partner information.
          </p>

          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5" />
              Customize
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="py-1.5 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer text-[11px]"
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="py-1.5 px-3.5 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer text-[11px] shadow-xs"
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Detailed Customization Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden text-xs text-neutral-800 dark:text-neutral-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="cookie-modal-title" className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    Cookie &amp; Consent Settings
                  </h2>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Control how data and cookies are used on this device
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg cursor-pointer"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Categories */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Category 1: Strictly Necessary */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950/60 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100 text-xs">
                    1. Strictly Necessary Storage
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Always Active
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Required for core platform functionality, including saving your active resume draft in <code className="font-mono text-neutral-800 dark:text-neutral-200">localStorage</code>, persisting theme preferences (light/dark mode), and managing secure Firebase authentication tokens when signed in.
                </p>
              </div>

              {/* Category 2: Analytics & Performance */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950/60 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100 text-xs">
                    2. Analytics &amp; Experience Metrics
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      aria-label="Enable Analytics & Experience Metrics"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({ ...preferences, analytics: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Helps us understand aggregated traffic and which country guides or templates are most useful, with zero personal career data shared.
                </p>
              </div>

              {/* Category 3: Advertising & Commercial Partners */}
              <div className="p-4 bg-neutral-50 dark:bg-neutral-950/60 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100 text-xs">
                    3. Advertising &amp; Sponsor Personalization
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      aria-label="Enable Advertising & Sponsor Personalization"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences({ ...preferences, marketing: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Allows Google AdSense and authorized partners to serve relevant, non-intrusive career advertisements without obstructing document builder views.
                </p>
              </div>

              {onNavigateToPolicy && (
                <div className="pt-2 text-center text-[11px] text-neutral-500">
                  Read our full{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      onNavigateToPolicy('cookie-policy');
                    }}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold underline cursor-pointer"
                  >
                    Cookie Policy
                  </button>{' '}
                  and{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      onNavigateToPolicy('privacy');
                    }}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold underline cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  .
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-950/90 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="py-2 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold text-xs hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={() => savePreferences(preferences)}
                className="py-2 px-5 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold text-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer shadow-xs"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
