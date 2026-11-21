import { useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_OUTPUT_LANGUAGE,
  OUTPUT_LANGUAGE_STORAGE_KEY,
  OUTPUT_LANGUAGES,
  COUNTRY_OUTPUT_LANGUAGES,
  type OutputLanguageCode,
  getOutputLanguage,
  isOutputLanguage,
} from './outputLanguages';

const CHANGE_EVENT = 'globecareer:output-language-change';

function readStored(): OutputLanguageCode {
  try {
    const saved = localStorage.getItem(OUTPUT_LANGUAGE_STORAGE_KEY);
    if (isOutputLanguage(saved)) return saved;
  } catch {
    /* storage blocked */
  }
  return DEFAULT_OUTPUT_LANGUAGE;
}

/**
 * The document (output) language chosen by the visitor.
 *
 * Deliberately independent of `LanguageContext` (website UI language): a user
 * reading the English site may still need a Spanish CV. The choice is persisted
 * so it survives step changes and navigation between tools, and it is only ever
 * changed by an explicit user action — never inferred from IP or browser locale.
 */
export function useOutputLanguage(countryId?: string) {
  const [language, setLanguageState] = useState<OutputLanguageCode>(DEFAULT_OUTPUT_LANGUAGE);

  useEffect(() => {
    setLanguageState(readStored());
    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<OutputLanguageCode>).detail;
      if (isOutputLanguage(detail)) setLanguageState(detail);
    };
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);

  const setLanguage = useCallback((code: OutputLanguageCode) => {
    if (!isOutputLanguage(code)) return;
    setLanguageState(code);
    try {
      localStorage.setItem(OUTPUT_LANGUAGE_STORAGE_KEY, code);
    } catch {
      /* storage blocked */
    }
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: code }));
  }, []);

  const countryLanguages: OutputLanguageCode[] =
    (countryId && COUNTRY_OUTPUT_LANGUAGES[countryId]) || ['en'];
  const info = getOutputLanguage(language);

  return {
    language,
    setLanguage,
    info,
    rtl: Boolean(info.rtl),
    /** Languages offered in the selector: the country's languages first, then all others. */
    options: OUTPUT_LANGUAGES,
    countryLanguages,
  };
}
