import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { Globe, X, Check } from 'lucide-react';

export const LanguageDetectionBanner: React.FC = () => {
  const {
    currentLanguage,
    languageInfo,
    setLanguage,
    isLanguageNoticeOpen,
    dismissLanguageNotice,
  } = useTranslation();

  if (!isLanguageNoticeOpen || currentLanguage === 'en') {
    return null;
  }

  const handleKeep = () => {
    dismissLanguageNotice(true);
  };

  const handleSwitchToEnglish = () => {
    setLanguage('en');
  };

  const handleDismiss = () => {
    dismissLanguageNotice(false);
  };

  return (
    <aside
      role="region"
      aria-label="Language preference notification"
      className="fixed bottom-5 start-5 z-40 max-w-[340px] sm:max-w-sm bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-2xl p-3.5 text-xs text-neutral-800 dark:text-neutral-200 animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-lg leading-none" role="img" aria-hidden="true">
            {languageInfo.flag}
          </span>
          <div>
            <span className="font-bold text-neutral-950 dark:text-white block text-xs">
              {languageInfo.nativeName} ({languageInfo.name})
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Auto-detected from browser settings
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Dismiss language notification"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-neutral-100 dark:border-neutral-800">
        <button
          type="button"
          onClick={handleKeep}
          className="flex-1 py-1.5 px-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-center transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex items-center justify-center gap-1 text-[11px]"
        >
          <Check className="w-3 h-3" />
          <span>Keep {languageInfo.nativeName}</span>
        </button>

        <button
          type="button"
          onClick={handleSwitchToEnglish}
          className="py-1.5 px-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl text-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-[11px]"
        >
          English
        </button>
      </div>
    </aside>
  );
};
