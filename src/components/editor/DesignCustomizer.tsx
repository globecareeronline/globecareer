import React, { useState } from 'react';
import { ResumeData, TemplateId } from '../../types/resume';
import { TEMPLATES, getTemplateById } from '../templates/TemplateList';
import { getCountryById } from '../../data/countries';
import { getCountryTemplateRecommendation } from '../../utils/countryTemplates';
import { Palette, Type, Sliders, Check, AlertTriangle, FileText, Image, Sparkles } from 'lucide-react';

interface DesignCustomizerProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ACCENT_COLORS = [
  { name: 'Navy Corporate', hex: '#1e3a8a' },
  { name: 'Executive Slate', hex: '#334155' },
  { name: 'Emerald Trust', hex: '#065f46' },
  { name: 'Burgundy Classic', hex: '#881337' },
  { name: 'Deep Indigo', hex: '#4338ca' },
  { name: 'Warm Charcoal', hex: '#1c1917' },
  { name: 'Steel Teal', hex: '#0f766e' },
  { name: 'Royal Cobalt', hex: '#2563eb' }
];

export const DesignCustomizer: React.FC<DesignCustomizerProps> = ({ data, onChange }) => {
  const [templateFilter, setTemplateFilter] = useState<'all' | 'no-photo' | 'photo'>('all');
  const country = getCountryById(data.targetCountryId);
  const design = data.design;
  const recommendation = getCountryTemplateRecommendation(data.targetCountryId);
  const isRecommendedActive = design.templateId === recommendation.templateId;

  const updateDesign = (field: keyof typeof design, value: any) => {
    onChange({
      ...data,
      design: {
        ...data.design,
        [field]: value
      }
    });
  };

  const handleTemplateSelect = (templateId: TemplateId) => {
    const template = getTemplateById(templateId);
    const shouldEnablePhoto = template.category === 'photo';
    
    onChange({
      ...data,
      design: {
        ...data.design,
        templateId,
        showPhoto: shouldEnablePhoto
      }
    });
  };

  // Other templates (excluding the recommended template)
  const otherTemplates = TEMPLATES.filter(t => t.id !== recommendation.templateId);
  const filteredOtherTemplates = otherTemplates.filter(t => {
    if (templateFilter === 'all') return true;
    return t.category === templateFilter;
  });

  const selectedTemplate = getTemplateById(design.templateId);
  const hasPhotoConflict = country.photoRule === 'discouraged' && selectedTemplate.category === 'photo';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          Templates & Visual Design
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Choose between ATS-optimized single-column formats and European/executive photo templates.
        </p>
      </div>

      {/* Incompatibility Notice if Photo chosen for US/UK/Canada/Australia */}
      {hasPhotoConflict && (
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-semibold block mb-0.5">Format Caution for {country.name}:</span>
            You have selected a photo-based template for {country.name}, where photographs are strictly discouraged by anti-discrimination hiring regulations (EEOC / Equality Act). Consider switching to a No-Photo template like <strong>ATS Classic Clean</strong> or <strong>Ivy League Compact</strong>.
          </div>
        </div>
      )}

      {/* 1. RECOMMENDED FOR COUNTRY SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-base">{country.flag}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Recommended for {country.name}
            </span>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
            {country.cvTerminology} · {country.paperSize.toUpperCase()}
          </span>
        </div>

        {/* Featured Recommended Card */}
        <div 
          onClick={() => handleTemplateSelect(recommendation.templateId)}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            isRecommendedActive
              ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-600/20 shadow-xs'
              : 'border-blue-200 dark:border-blue-900 bg-white dark:bg-neutral-900 hover:border-blue-400'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-neutral-900 dark:text-neutral-100">
                  {recommendation.template.name}
                </span>
                <span className="text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  Best Match
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                {recommendation.template.bestFor}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                recommendation.formattingNotes.photoIsStandard 
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' 
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {recommendation.formattingNotes.photoRuleText}
              </span>

              {isRecommendedActive ? (
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3 h-3" />
                </div>
              ) : (
                <button
                  type="button"
                  className="px-2.5 py-1 text-[11px] font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2.5 leading-relaxed">
            {recommendation.rationale}
          </p>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2.5 border-t border-neutral-200/80 dark:border-neutral-800 text-[11px]">
            <div>
              <span className="text-neutral-400 block text-[10px]">Paper Size:</span>
              <strong className="text-neutral-800 dark:text-neutral-200">{recommendation.formattingNotes.paperSizeText}</strong>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px]">Date Format:</span>
              <strong className="text-neutral-800 dark:text-neutral-200 font-mono">{recommendation.formattingNotes.dateFormatText}</strong>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-neutral-400 block text-[10px]">Typical Length:</span>
              <strong className="text-neutral-800 dark:text-neutral-200">{recommendation.formattingNotes.typicalLengthText}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. EXPLORE OTHER TEMPLATES SECTION BELOW */}
      <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              Explore Other Templates ({otherTemplates.length})
            </h4>
            <p className="text-[11px] text-neutral-500">
              Alternative styles and visual formats
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <button
              type="button"
              onClick={() => setTemplateFilter('all')}
              className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors ${
                templateFilter === 'all' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setTemplateFilter('no-photo')}
              className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors ${
                templateFilter === 'no-photo' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              No-Photo
            </button>
            <button
              type="button"
              onClick={() => setTemplateFilter('photo')}
              className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors ${
                templateFilter === 'photo' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              Photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredOtherTemplates.map((template) => {
            const isSelected = design.templateId === template.id;
            return (
              <div
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-600/20 shadow-xs' 
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-xs text-neutral-900 dark:text-neutral-100 block">
                      {template.name}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">
                      Best for: {template.bestFor}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      template.category === 'photo' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {template.category === 'photo' ? 'Photo' : 'No Photo'}
                    </span>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  {template.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Typography & Sizing */}
      <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          Typography & Layout Geometry
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Font Family
            </label>
            <select
              value={design.fontFamily}
              onChange={(e) => updateDesign('fontFamily', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
            >
              <option value="sans">Plus Jakarta Sans (Modern)</option>
              <option value="serif">Source Serif 4 (Executive)</option>
              <option value="mono">JetBrains Mono (Technical)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Font Scale
            </label>
            <select
              value={design.fontSize}
              onChange={(e) => updateDesign('fontSize', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
            >
              <option value="compact">Compact (1-Page Density)</option>
              <option value="normal">Normal (Standard)</option>
              <option value="relaxed">Relaxed (Spacious)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Section Spacing
            </label>
            <select
              value={design.spacing}
              onChange={(e) => updateDesign('spacing', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
            >
              <option value="compact">Tight (Strict Limits)</option>
              <option value="normal">Standard</option>
              <option value="comfortable">Comfortable</option>
            </select>
          </div>
        </div>

        {/* Paper Size selector */}
        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block">
              Paper Standard: {design.paperSize === 'letter' ? 'US Letter (8.5 × 11 in)' : 'International A4 (210 × 297 mm)'}
            </span>
            <span className="text-[11px] text-neutral-500">
              Standard format for {country.name} is {country.paperSize === 'letter' ? 'US Letter' : 'A4'}.
            </span>
          </div>
          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <button
              type="button"
              onClick={() => updateDesign('paperSize', 'letter')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                design.paperSize === 'letter' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500'
              }`}
            >
              US Letter
            </button>
            <button
              type="button"
              onClick={() => updateDesign('paperSize', 'a4')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                design.paperSize === 'a4' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500'
              }`}
            >
              A4 (Global)
            </button>
          </div>
        </div>
      </div>

      {/* Accent Color Palette */}
      <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
          Accent Color Theme
        </label>
        <div className="flex flex-wrap gap-2.5">
          {ACCENT_COLORS.map((col) => (
            <button
              key={col.hex}
              type="button"
              onClick={() => updateDesign('accentColor', col.hex)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all"
              style={{
                borderColor: design.accentColor === col.hex ? col.hex : 'transparent',
                backgroundColor: design.accentColor === col.hex ? `${col.hex}15` : 'transparent'
              }}
            >
              <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: col.hex }} />
              <span className="text-neutral-800 dark:text-neutral-200">{col.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Headshot Controls (Shape & Display) */}
      {selectedTemplate.category === 'photo' && (
        <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Headshot Crop Shape
            </span>
            <div className="flex items-center gap-1.5">
              {(['circle', 'rounded', 'square'] as const).map((shape) => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => updateDesign('photoShape', shape)}
                  className={`px-2.5 py-1 text-xs capitalize rounded-lg transition-colors ${
                    design.photoShape === shape ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
