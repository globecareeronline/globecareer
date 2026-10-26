import React, { useState } from 'react';
import { TEMPLATES, TemplateInfo, getTemplateById } from '../templates/TemplateList';
import { COUNTRIES, getCountryById } from '../../data/countries';
import { generateSampleResume } from '../../data/sampleResumes';
import { ResumeRenderer } from '../templates/ResumeRenderer';
import { TemplateId } from '../../types/resume';
import { getCountryTemplateRecommendation } from '../../utils/countryTemplates';
import { 
  Check, ArrowRight, ShieldCheck, Sparkles, Image, FileText, 
  Globe, Info, CheckCircle2, ChevronRight, Layers, Award,
  FileCheck, AlertCircle
} from 'lucide-react';

interface TemplatesPageProps {
  onSelectTemplate: (templateId: TemplateId, countryId?: string) => void;
  initialCountryId?: string;
  onCountryChange?: (countryId: string) => void;
  onNavigate?: (page: string) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ 
  onSelectTemplate,
  initialCountryId = 'ca',
  onCountryChange,
  onNavigate
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>(initialCountryId || 'ca');
  const [filter, setFilter] = useState<'all' | 'no-photo' | 'photo'>('all');

  const selectedCountry = getCountryById(selectedCountryId);
  const recommendation = getCountryTemplateRecommendation(selectedCountryId);

  const handleCountrySelect = (countryId: string) => {
    setSelectedCountryId(countryId);
    if (onCountryChange) {
      onCountryChange(countryId);
    }
  };

  // Other templates (excluding the recommended template for the top showcase)
  const otherTemplates = TEMPLATES.filter(t => t.id !== recommendation.templateId);
  const filteredOtherTemplates = otherTemplates.filter(t => {
    if (filter === 'all') return true;
    return t.category === filter;
  });

  // Generate sample resume for recommended template tailored to selected country
  const recommendedSampleResume = generateSampleResume(selectedCountry.id, 'experienced');
  recommendedSampleResume.design.templateId = recommendation.templateId;
  recommendedSampleResume.design.showPhoto = recommendation.formattingNotes.photoIsStandard;
  recommendedSampleResume.design.paperSize = selectedCountry.paperSize;

  // Major quick-select countries requested in specs
  const QUICK_COUNTRIES = [
    { id: 'ca', name: 'Canada', flag: '🇨🇦' },
    { id: 'us', name: 'United States', flag: '🇺🇸' },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { id: 'de', name: 'Germany', flag: '🇩🇪' },
    { id: 'pt', name: 'Portugal', flag: '🇵🇹' },
    { id: 'au', name: 'Australia', flag: '🇦🇺' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Globe className="w-3.5 h-3.5" />
          Country-Specific CV Intelligence
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          International Resume & CV Templates
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
          Select your target hiring country to automatically view the strictly vetted, country-recommended CV format matching local anti-discrimination legislation, paper size, date convention, and ATS requirements.
        </p>
      </div>

      {/* Dynamic Country Selector Bar */}
      <div className="p-4 sm:p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label htmlFor="country-selector-dropdown" className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">
              Select Your Target Hiring Country
            </label>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedCountry.flag}</span>
              <span className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                {selectedCountry.name}
              </span>
              <span className="text-xs font-medium text-neutral-500">
                ({selectedCountry.cvTerminology} · {selectedCountry.paperSize.toUpperCase()})
              </span>
            </div>
          </div>

          {/* Full 40 Countries Dropdown */}
          <div className="w-full sm:w-auto">
            <select
              id="country-selector-dropdown"
              value={selectedCountryId}
              onChange={(e) => handleCountrySelect(e.target.value)}
              className="w-full sm:w-72 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-semibold px-3 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer shadow-xs"
            >
              {COUNTRIES.map((c) => (
                <option key={c.id} value={c.id} className="dark:bg-neutral-900">
                  {c.flag} {c.name} ({c.cvTerminology})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick-switch Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 overflow-x-auto no-scrollbar">
          <span className="text-xs font-semibold text-neutral-400 shrink-0">
            Quick Switch:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {QUICK_COUNTRIES.map((qc) => {
              const isActive = selectedCountryId === qc.id;
              return (
                <button
                  key={qc.id}
                  type="button"
                  onClick={() => handleCountrySelect(qc.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  <span>{qc.flag}</span>
                  <span>{qc.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 1. RECOMMENDED TEMPLATE FIRST SECTION */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                Primary Recommendation
              </span>
              <span className="text-xs font-medium text-neutral-400">
                Tailored for {selectedCountry.name}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight mt-1 flex items-center gap-2.5">
              <span>{selectedCountry.flag}</span>
              <span>Recommended for {selectedCountry.name}</span>
            </h2>
          </div>
          <div className="text-xs text-neutral-500 font-medium">
            Single most suitable professional format for {selectedCountry.name} employers
          </div>
        </div>

        {/* Featured Recommendation Showcase Card */}
        <div className="bg-white dark:bg-neutral-900 border-2 border-blue-500/30 dark:border-blue-500/30 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Scaled Preview */}
            <div className="lg:col-span-5 bg-neutral-100 dark:bg-neutral-950 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800 relative group min-h-[460px]">
              <div 
                className="cursor-pointer transition-transform duration-200 group-hover:scale-[1.02] flex justify-center w-full"
                onClick={() => onSelectTemplate(recommendation.templateId, selectedCountry.id)}
              >
                <ResumeRenderer 
                  data={recommendedSampleResume} 
                  scale={0.42} 
                  className="origin-top shadow-xl rounded-md overflow-hidden bg-white" 
                />
              </div>

              {/* Hover overlay button */}
              <div 
                className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs cursor-pointer"
                onClick={() => onSelectTemplate(recommendation.templateId, selectedCountry.id)}
              >
                <button
                  type="button"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all"
                >
                  <span>Use This Template for {selectedCountry.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-3 text-[11px] text-neutral-500 font-mono text-center">
                Interactive preview formatted with {selectedCountry.name} conventions
              </div>
            </div>

            {/* Right: Country-Specific Formatting & Nuances Breakdown */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Header with Badges */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-blue-600 dark:text-blue-400 block mb-1">
                      {selectedCountry.cvTerminology} Format
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100">
                      {recommendation.template.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      {recommendation.template.bestFor}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      recommendation.formattingNotes.photoIsStandard
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {recommendation.formattingNotes.photoRuleText}
                    </span>
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {selectedCountry.paperSize.toUpperCase()} Dimensions
                    </span>
                  </div>
                </div>

                {/* Country Rationale */}
                <div className="p-4 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-2xl">
                  <div className="text-xs font-bold text-blue-900 dark:text-blue-200 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    Why Recommended for {selectedCountry.name}:
                  </div>
                  <p className="text-xs text-blue-950 dark:text-blue-100 leading-relaxed">
                    {recommendation.rationale}
                  </p>
                  <div className="mt-2 text-[11px] text-blue-700/80 dark:text-blue-300/80 font-mono">
                    Authority: {recommendation.formattingNotes.governingRuleOrLaw}
                  </div>
                </div>

                {/* 4-Item Country Conventions Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                      Photo Policy
                    </span>
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {selectedCountry.photoRule === 'discouraged' ? 'No Photo' : selectedCountry.photoRule === 'standard' ? 'Photo Customary' : 'Optional'}
                    </span>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      {selectedCountry.photoRule === 'discouraged' ? 'Blind screening' : 'Professional headshot'}
                    </span>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                      Paper Size
                    </span>
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {recommendation.formattingNotes.paperSizeText}
                    </span>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      Standard printer format
                    </span>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                      Date Format
                    </span>
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 font-mono">
                      {recommendation.formattingNotes.dateFormatText}
                    </span>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      e.g., {selectedCountry.dateFormatExample}
                    </span>
                  </div>

                  <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">
                      Typical Length
                    </span>
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {recommendation.formattingNotes.typicalLengthText}
                    </span>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">
                      Standard industry length
                    </span>
                  </div>
                </div>

                {/* Country Hiring Practices Highlights */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 block">
                    Essential {selectedCountry.name} Hiring Practices:
                  </span>
                  <div className="space-y-1.5">
                    {recommendation.formattingNotes.hiringHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA Action Bar */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Pre-Configured for {selectedCountry.name} ({selectedCountry.paperSize.toUpperCase()})</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectTemplate(recommendation.templateId, selectedCountry.id)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Start with Recommended for {selectedCountry.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE OTHER TEMPLATES SECTION BELOW */}
      <section className="space-y-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Explore Other Templates
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Prefer a different visual presentation or industry layout? Choose any of the remaining {otherTemplates.length} templates below. All styles can be fully customized for {selectedCountry.name}.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl w-fit shrink-0">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                filter === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              All Alternatives ({otherTemplates.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('no-photo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ${
                filter === 'no-photo'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              No-Photo ATS
            </button>
            <button
              type="button"
              onClick={() => setFilter('photo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ${
                filter === 'photo'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              Photo CVs
            </button>
          </div>
        </div>

        {/* Other Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOtherTemplates.map((template) => {
            // Generate sample preview data matching this template
            const isPhoto = template.category === 'photo';
            const mockResume = generateSampleResume(
              isPhoto ? 'de' : selectedCountry.id, 
              'experienced'
            );
            mockResume.design.templateId = template.id;
            mockResume.design.showPhoto = isPhoto;
            mockResume.design.paperSize = selectedCountry.paperSize;

            const isPhotoConflict = selectedCountry.photoRule === 'discouraged' && isPhoto;

            return (
              <div
                key={template.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {template.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {template.bestFor}
                      </p>
                    </div>
                    <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                      template.category === 'photo' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' 
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {template.category === 'photo' ? 'Photo CV' : 'No Photo (ATS)'}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {template.description}
                  </p>

                  {isPhotoConflict && (
                    <div className="p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span>Note: Photos are discouraged in {selectedCountry.name}.</span>
                    </div>
                  )}
                </div>

                {/* Scaled Render Container */}
                <div 
                  className="bg-neutral-100 dark:bg-neutral-950 p-3 flex justify-center border-y border-neutral-200 dark:border-neutral-800 overflow-hidden h-[330px] relative group cursor-pointer"
                  onClick={() => onSelectTemplate(template.id, selectedCountry.id)}
                >
                  <ResumeRenderer data={mockResume} scale={0.37} className="origin-top" />
                  <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                    <span className="px-4 py-2 bg-white text-neutral-900 rounded-xl text-xs font-bold shadow-lg">
                      Use This Template
                    </span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-4 bg-white dark:bg-neutral-900 flex items-center justify-between">
                  <div className="text-[11px] text-neutral-500 font-medium">
                    {template.atsCompliant ? '✓ Standard ATS Compatible' : 'Creative Layout'}
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectTemplate(template.id, selectedCountry.id)}
                    className="px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    Select Template
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Free Career Document Template Ecosystem Cross-Links */}
      <section className="p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            Complete Career Document Suite
          </span>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            More Free ATS &amp; Career Templates
          </h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            Streamline your entire international job search. Every template library is 100% free with instant copy, customization, and export.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/summary-templates"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('summary-templates');
            }}
            className="p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-600 rounded-2xl transition-all group flex flex-col justify-between space-y-3 cursor-pointer"
          >
            <div className="space-y-1.5">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                18 Formats
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                Resume Summary &amp; Objectives
              </h3>
              <p className="text-[11px] text-neutral-500 leading-snug">
                ATS-tested summaries, graduate objectives, and LinkedIn headlines.
              </p>
            </div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Browse Summaries <ArrowRight className="w-3 h-3" />
            </span>
          </a>

          <a
            href="/bio-templates"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('bio-templates');
            }}
            className="p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-600 rounded-2xl transition-all group flex flex-col justify-between space-y-3 cursor-pointer"
          >
            <div className="space-y-1.5">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                15 Profiles
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-indigo-600 transition-colors">
                Professional Bio Templates
              </h3>
              <p className="text-[11px] text-neutral-500 leading-snug">
                Executive, speaker, consultant, and portfolio bios in 1st/3rd person POV.
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Browse Bios <ArrowRight className="w-3 h-3" />
            </span>
          </a>

          <a
            href="/letter-templates"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('letter-templates');
            }}
            className="p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-600 rounded-2xl transition-all group flex flex-col justify-between space-y-3 cursor-pointer"
          >
            <div className="space-y-1.5">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                12+ Templates
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 transition-colors">
                Cover &amp; Outreach Letters
              </h3>
              <p className="text-[11px] text-neutral-500 leading-snug">
                Targeted cover letters, recommendation letters, and cold outreach emails.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Browse Letters <ArrowRight className="w-3 h-3" />
            </span>
          </a>

          <a
            href="/resignation-letter-templates"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('resignation-letter-templates');
            }}
            className="p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-600 rounded-2xl transition-all group flex flex-col justify-between space-y-3 cursor-pointer"
          >
            <div className="space-y-1.5">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                11 Scenarios
              </span>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 transition-colors">
                Resignation Letter Templates
              </h3>
              <p className="text-[11px] text-neutral-500 leading-snug">
                Two weeks' notice, urgent short notice, relocation, and retirement letters.
              </p>
            </div>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Browse Resignations <ArrowRight className="w-3 h-3" />
            </span>
          </a>
        </div>
      </section>
    </div>
  );
};
