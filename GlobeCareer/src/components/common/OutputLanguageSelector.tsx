import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe2, Search } from 'lucide-react';
import {
  OUTPUT_LANGUAGES,
  type OutputLanguageCode,
  getOutputLanguage,
} from '../../i18n/outputLanguages';

interface OutputLanguageSelectorProps {
  language: OutputLanguageCode;
  onChange: (code: OutputLanguageCode) => void;
  /** Optional country voice: its languages are listed first. */
  countryLanguages?: OutputLanguageCode[];
  className?: string;
}

/**
 * The one Output Language control used by every generator on the site.
 *
 * Identical markup, dimensions and position in each tool. It controls the
 * language of the generated document only; the website interface keeps its own
 * language setting. Nothing is ever preselected from the visitor's location.
 */
export const OutputLanguageSelector: React.FC<OutputLanguageSelectorProps> = ({
  language,
  onChange,
  countryLanguages = [],
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const current = getOutputLanguage(language);

  // The country's own languages lead the list, then everything else.
  const ordered = React.useMemo(() => {
    const preferred = countryLanguages
      .map((code) => OUTPUT_LANGUAGES.find((l) => l.code === code))
      .filter((l): l is (typeof OUTPUT_LANGUAGES)[number] => Boolean(l));
    const rest = OUTPUT_LANGUAGES.filter((l) => !countryLanguages.includes(l.code));
    return [...preferred, ...rest];
  }, [countryLanguages]);

  const filtered = ordered.filter(
    (l) =>
      !query ||
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(query.toLowerCase()) ||
      l.code.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) return;
    setActiveIndex(Math.max(0, filtered.findIndex((l) => l.code === language)));
    const raf = requestAnimationFrame(() => searchRef.current?.focus());
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDocDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, [open]);

  const commit = (code: OutputLanguageCode) => {
    onChange(code);
    setOpen(false);
    setQuery('');
    buttonRef.current?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
      buttonRef.current?.focus();
      return;
    }
    if (!open) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const target = filtered[activeIndex];
      if (target) commit(target.code);
    }
  };

  return (
    <div
      className={`rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 shadow-xs ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
        <div className="flex items-start gap-2 sm:min-w-[190px]">
          <Globe2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" aria-hidden="true" />
          <div>
            <span
              id="output-language-label"
              className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300"
            >
              Output Language
            </span>
            <span className="block text-[11px] text-neutral-500 dark:text-neutral-400">
              Documents are generated in this language
            </span>
          </div>
        </div>

        <div className="relative w-full sm:w-72" ref={containerRef} onKeyDown={onKeyDown}>
          <button
            type="button"
            ref={buttonRef}
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-labelledby="output-language-label"
            className="w-full h-[38px] flex items-center justify-between gap-2 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 text-xs font-semibold hover:border-neutral-400 dark:hover:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <span className="truncate">
              {current.nativeName}
              {current.nativeName !== current.name && (
                <span className="ms-1.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                  ({current.name})
                </span>
              )}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 shrink-0 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          {open && (
            <div className="absolute z-50 mt-1.5 w-full min-w-[16rem] rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-200 dark:border-neutral-800 py-2">
              <div className="px-2.5 pb-2">
                <div className="flex items-center gap-2 px-2.5 py-1.5 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActiveIndex(0);
                    }}
                    placeholder="Search language…"
                    aria-label="Search output language"
                    className="w-full bg-transparent border-none text-xs text-neutral-800 dark:text-neutral-100 focus:outline-none placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <ul role="listbox" aria-labelledby="output-language-label" className="max-h-64 overflow-y-auto py-1">
                {filtered.length === 0 && (
                  <li className="px-4 py-3 text-xs text-neutral-400 text-center">No matching language</li>
                )}
                {filtered.map((option, index) => {
                  const selected = option.code === language;
                  return (
                    <li key={option.code} role="none">
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => commit(option.code)}
                        className={`w-full flex items-center justify-between gap-2 px-3.5 py-2 text-xs text-start transition-colors cursor-pointer ${
                          index === activeIndex
                            ? 'bg-neutral-100 dark:bg-neutral-800'
                            : 'bg-transparent'
                        } ${selected ? 'font-bold text-blue-700 dark:text-blue-300' : 'text-neutral-700 dark:text-neutral-200'}`}
                      >
                        <span className="truncate">
                          {option.nativeName}
                          {option.nativeName !== option.name && (
                            <span className="ms-1.5 text-[10px] font-normal text-neutral-500 dark:text-neutral-400">
                              ({option.name})
                            </span>
                          )}
                        </span>
                        {selected && <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="px-3 pt-2 pb-1 border-t border-neutral-100 dark:border-neutral-800 text-[10px] text-neutral-400">
                {OUTPUT_LANGUAGES.length} output languages · your choice is remembered
              </div>
            </div>
          )}
        </div>

        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 sm:flex-1">
          {current.rtl ? 'Right-to-left document layout.' : 'Applies to text, preview and downloads.'}
        </p>
      </div>
    </div>
  );
};
