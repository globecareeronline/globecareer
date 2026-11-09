import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, FileText, Check, ChevronDown, 
  Loader2, Sparkles, FileCode, Mail, AlertCircle 
} from 'lucide-react';

export interface DownloadFormatOption {
  id: string;
  label: string;
  extension: string;
  description: string;
  badge?: string;
  isPrimary?: boolean;
  onExport: () => Promise<void> | void;
}

interface UnifiedDownloadButtonProps {
  documentTitle?: string;
  formats: DownloadFormatOption[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  buttonText?: string;
}

export const UnifiedDownloadButton: React.FC<UnifiedDownloadButtonProps> = ({
  documentTitle = 'Document',
  formats,
  className = '',
  size = 'md',
  buttonText = 'Download'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFormatId, setActiveFormatId] = useState<string | null>(null);
  const [successFormatId, setSuccessFormatId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Close on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelectFormat = async (format: DownloadFormatOption) => {
    try {
      setActiveFormatId(format.id);
      setErrorMessage(null);
      await Promise.resolve(format.onExport());
      setSuccessFormatId(format.id);
      setTimeout(() => {
        setSuccessFormatId(null);
        setIsOpen(false);
      }, 1200);
    } catch (err: any) {
      console.error('Export error:', err);
      setErrorMessage(err?.message || 'Export failed. Please try again.');
    } finally {
      setActiveFormatId(null);
    }
  };

  const getFormatIcon = (ext: string) => {
    const cleanExt = ext.toLowerCase().replace('.', '');
    if (cleanExt === 'pdf') {
      return (
        <span className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 font-bold text-[10px] flex items-center justify-center border border-red-200 dark:border-red-900 shrink-0">
          PDF
        </span>
      );
    }
    if (cleanExt === 'docx') {
      return (
        <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold text-[10px] flex items-center justify-center border border-blue-200 dark:border-blue-900 shrink-0">
          DOCX
        </span>
      );
    }
    if (cleanExt === 'txt') {
      return (
        <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-[10px] flex items-center justify-center border border-neutral-300 dark:border-neutral-700 shrink-0">
          TXT
        </span>
      );
    }
    if (cleanExt === 'json') {
      return (
        <span className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold text-[10px] flex items-center justify-center border border-amber-200 dark:border-amber-900 shrink-0">
          JSON
        </span>
      );
    }
    if (cleanExt === 'html') {
      return (
        <span className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex items-center justify-center border border-emerald-200 dark:border-emerald-900 shrink-0">
          HTML
        </span>
      );
    }
    if (cleanExt === 'eml') {
      return (
        <span className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] flex items-center justify-center border border-indigo-200 dark:border-indigo-900 shrink-0">
          EML
        </span>
      );
    }
    return (
      <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 font-bold text-[10px] flex items-center justify-center border border-neutral-200 shrink-0">
        <FileText className="w-4 h-4" />
      </span>
    );
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-xs font-bold',
    lg: 'px-5 py-2.5 text-sm font-bold'
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Primary Download Button */}
      <button
        type="button"
        id="unified-download-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`group inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${sizeClasses[size]}`}
      >
        <Download className="w-4 h-4 text-blue-400 dark:text-blue-600 transition-transform group-hover:-translate-y-0.5" />
        <span>{buttonText}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Accessible Export Menu Dropdown */}
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
          aria-label="Download format options"
        >
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Export {documentTitle}
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                100% Free
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
              Select your preferred file format:
            </p>
          </div>

          {/* Formats list */}
          <div className="p-1.5 space-y-1">
            {formats.map((format) => {
              const isLoading = activeFormatId === format.id;
              const isSuccess = successFormatId === format.id;

              return (
                <button
                  key={format.id}
                  type="button"
                  onClick={() => handleSelectFormat(format)}
                  disabled={Boolean(activeFormatId)}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-3 transition-colors cursor-pointer group ${
                    isSuccess 
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800' 
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {getFormatIcon(format.extension)}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {format.label}
                        </span>
                        {format.badge && (
                          <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.2 bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded">
                            {format.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                        {format.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center pl-2">
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                    ) : isSuccess ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <Check className="w-4 h-4" />
                        Saved
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-medium text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                        {format.extension}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Error Message if any */}
          {errorMessage && (
            <div className="mx-2 mb-2 p-2.5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl text-[11px] text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Footer note */}
          <div className="px-4 py-2 border-t border-neutral-100 dark:border-neutral-800 text-[10px] text-neutral-400 text-center">
            No watermark · No registration required · Instant save
          </div>
        </div>
      )}
    </div>
  );
};
