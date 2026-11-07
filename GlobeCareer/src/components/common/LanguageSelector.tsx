import React, { useState, useRef, useEffect } from 'react';
import { useTranslation, SUPPORTED_LANGUAGES, LanguageCode } from '../../context/LanguageContext';
import { Globe, ChevronDown, Check, Search } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'header' | 'footer' | 'compact';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { currentLanguage, languageInfo, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    (lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      lang.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
    setSearch('');
  };

  const isFooter = variant === 'footer';

  // Strictly fixed button dimensions so changing language never resizes or shifts layout
  const buttonClasses = isFooter
    ? 'w-[138px] h-[36px] flex items-center justify-between px-3 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-medium transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
    : 'w-[110px] sm:w-[130px] h-[36px] flex items-center justify-between px-2.5 rounded-xl border border-neutral-200 hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold shadow-xs hover:bg-neutral-50 dark:hover:bg-neutral-700/60 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer';

  return (
    <div className={`relative inline-block text-left shrink-0 ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClasses}
        aria-label="Select website language"
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none shrink-0" role="img" aria-hidden="true">
          {languageInfo.flag}
        </span>
        <span className="flex-1 min-w-0 text-left rtl:text-right px-1.5 truncate font-medium text-xs">
          {languageInfo.nativeName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 opacity-60 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-1.5 w-64 rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-200 dark:border-neutral-800 py-2 focus:outline-none animate-in fade-in zoom-in-95 duration-100 ${
            isFooter ? 'bottom-full mb-2 end-0' : 'end-0'
          }`}
          style={{ maxHeight: '380px' }}
        >
          <div className="px-3 pb-2 pt-1 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500">
              <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search language / Sprache..."
                className="w-full bg-transparent border-none text-xs text-neutral-800 dark:text-neutral-100 focus:outline-none placeholder:text-neutral-400"
                autoFocus
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-60 py-1 divide-y divide-neutral-100/50 dark:divide-neutral-800/50">
            {filteredLanguages.length === 0 ? (
              <div className="px-4 py-3 text-xs text-neutral-400 text-center">
                No matching language
              </div>
            ) : (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === currentLanguage;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors text-left rtl:text-right cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold'
                        : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/80'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span className="text-base leading-none shrink-0">{lang.flag}</span>
                      <span className="truncate">
                        <span className="font-medium">{lang.nativeName}</span>
                        {lang.name !== lang.nativeName && (
                          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 ms-1.5">
                            ({lang.name})
                          </span>
                        )}
                      </span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 ms-2" />}
                  </button>
                );
              })
            )}
          </div>

          <div className="px-3 pt-2 pb-1 border-t border-neutral-100 dark:border-neutral-800 text-[10px] text-neutral-400 flex items-center justify-between">
            <span>22 Languages &bull; 40+ Countries</span>
            <Globe className="w-3 h-3 text-neutral-400" />
          </div>
        </div>
      )}
    </div>
  );
};
