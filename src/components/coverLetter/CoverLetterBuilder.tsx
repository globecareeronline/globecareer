import React, { useState } from 'react';
import { CoverLetterData, ResumeData } from '../../types/resume';
import { COUNTRIES, getCountryById } from '../../data/countries';
import { exportResumeToDocx, exportCoverLetterToDocx } from '../../utils/docxExport';
import { 
  FileText, Download, Printer, Sparkles, Copy, 
  Check, ArrowRight, Building, Mail, Phone, MapPin 
} from 'lucide-react';

import { CoverLetterTemplateSpec, COVER_LETTER_TEMPLATES } from '../pages/CoverLetterTemplatesPage';

interface CoverLetterBuilderProps {
  resumeData?: ResumeData;
  initialTemplate?: CoverLetterTemplateSpec;
  onNavigateToBuilder?: () => void;
  onNavigateToTemplates?: () => void;
}

export const CoverLetterBuilder: React.FC<CoverLetterBuilderProps> = ({
  resumeData,
  initialTemplate,
  onNavigateToBuilder,
  onNavigateToTemplates
}) => {
  const initialCountryId = resumeData?.targetCountryId || 'us';
  const initialCountry = getCountryById(initialCountryId);

  const [countryId, setCountryId] = useState(initialCountryId);
  const country = getCountryById(countryId);
  const defaultCompany = 'Apex Innovations';

  const defaultTemplate = initialTemplate || COVER_LETTER_TEMPLATES[0];

  const [letterData, setLetterData] = useState<CoverLetterData>({
    id: 'cover-letter-1',
    targetCountryId: countryId,
    recipientName: 'Hiring Committee',
    recipientTitle: 'Talent Acquisition Team',
    companyName: defaultCompany,
    companyAddress: '100 Innovation Way, Suite 400',
    date: new Date().toISOString().split('T')[0],
    jobTitle: resumeData?.personal.jobTitle || 'Senior Software Engineer',
    referenceNumber: 'REQ-2026-948',
    salutation: country.id === 'de' ? 'Sehr geehrte Damen und Herren,' : (country.id === 'fr' ? 'Madame, Monsieur,' : 'Dear Hiring Team,'),
    openingParagraph: defaultTemplate.openingParagraph.replace(/\[Job Title\]/g, resumeData?.personal.jobTitle || 'Senior Software Engineer').replace(/\[Company Name\]/g, defaultCompany),
    bodyParagraphs: defaultTemplate.bodyParagraphs.map(p => p.replace(/\[Job Title\]/g, resumeData?.personal.jobTitle || 'Senior Software Engineer').replace(/\[Company Name\]/g, defaultCompany).replace(/\[Target Country\]/g, country.name)),
    closingParagraph: defaultTemplate.closingParagraph.replace(/\[Company Name\]/g, defaultCompany),
    signOff: country.id === 'de' ? 'Mit freundlichen Grüßen,' : (country.id === 'fr' ? 'Veuillez agréer, Madame, Monsieur, l\'expression de mes salutations distinguées,' : 'Sincerely,'),
    senderName: resumeData?.personal.fullName || 'Alex Rivera',
    senderTitle: resumeData?.personal.jobTitle || 'Senior Software Engineer',
    senderPhone: resumeData?.personal.phone || '+1 555-0149',
    senderEmail: resumeData?.personal.email || 'alex.rivera@example.com',
    senderAddress: resumeData ? [resumeData.personal.city, resumeData.personal.stateOrRegion, resumeData.personal.country].filter(Boolean).join(', ') : 'Austin, TX, United States'
  });

  const [copied, setCopied] = useState(false);

  // Sync template if changed from templates hub
  React.useEffect(() => {
    if (initialTemplate) {
      setLetterData(prev => ({
        ...prev,
        openingParagraph: initialTemplate.openingParagraph
          .replace(/\[Job Title\]/g, prev.jobTitle || 'Senior Software Engineer')
          .replace(/\[Company Name\]/g, prev.companyName || defaultCompany),
        bodyParagraphs: initialTemplate.bodyParagraphs.map(p =>
          p.replace(/\[Job Title\]/g, prev.jobTitle || 'Senior Software Engineer')
           .replace(/\[Company Name\]/g, prev.companyName || defaultCompany)
           .replace(/\[Target Country\]/g, country.name)
        ),
        closingParagraph: initialTemplate.closingParagraph
          .replace(/\[Company Name\]/g, prev.companyName || defaultCompany)
      }));
    }
  }, [initialTemplate]);

  const updateField = (field: keyof CoverLetterData, val: any) => {
    setLetterData(prev => ({ ...prev, [field]: val }));
  };

  const handleCountryChange = (newCId: string) => {
    setCountryId(newCId);
    const newCountry = getCountryById(newCId);
    let newSalutation = 'Dear Hiring Team,';
    let newSignOff = 'Sincerely,';

    if (newCountry.id === 'de' || newCountry.id === 'at') {
      newSalutation = 'Sehr geehrte Damen und Herren,';
      newSignOff = 'Mit freundlichen Grüßen,';
    } else if (newCountry.id === 'fr') {
      newSalutation = 'Madame, Monsieur,';
      newSignOff = 'Cordialement,';
    } else if (newCountry.id === 'es') {
      newSalutation = 'Estimado/a Responsable de Selección,';
      newSignOff = 'Atentamente,';
    } else if (newCountry.id === 'it') {
      newSalutation = 'Gentile Responsabile delle Risorse Umane,';
      newSignOff = 'Cordiali saluti,';
    }

    setLetterData(prev => ({
      ...prev,
      targetCountryId: newCId,
      salutation: newSalutation,
      signOff: newSignOff
    }));
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `${letterData.senderName || 'Cover_Letter'}_${country.name}`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const handleCopyText = () => {
    const fullText = `
${letterData.senderName}
${letterData.senderTitle}
${letterData.senderEmail} | ${letterData.senderPhone}
${letterData.senderAddress}

Date: ${letterData.date}

${letterData.recipientName}
${letterData.recipientTitle}
${letterData.companyName}
${letterData.companyAddress}

Subject: Application for ${letterData.jobTitle} ${letterData.referenceNumber ? `(Ref: ${letterData.referenceNumber})` : ''}

${letterData.salutation}

${letterData.openingParagraph}

${letterData.bodyParagraphs.join('\n\n')}

${letterData.closingParagraph}

${letterData.signOff}
${letterData.senderName}
    `.trim();

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6 no-print">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block mb-1">
            International Document Suite
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
            Country-Specific Cover Letter Builder
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Generate formal, culturally calibrated cover letters with country-standard salutations, reference lines, and typography.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onNavigateToTemplates && (
            <button
              type="button"
              onClick={onNavigateToTemplates}
              className="px-3.5 py-2 text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Browse Templates</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleCopyText}
            className="px-3.5 py-2 text-xs font-semibold bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Text' : 'Copy Text'}
          </button>
          <button
            type="button"
            onClick={() => exportCoverLetterToDocx({ ...letterData, paperSize: country.paperSize }, `${letterData.senderName}_Cover_Letter_${country.name}`)}
            className="px-3.5 py-2 text-xs font-semibold bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg hover:bg-neutral-50 flex items-center gap-1.5 transition-colors shadow-xs"
            title="Download Cover Letter as Microsoft Word DOCX"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            Word DOCX
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start print:block print:w-full print:m-0 print:p-0">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 space-y-6 no-print">
          {/* Target Country Selector */}
          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
              Target Country & Etiquette Standard
            </label>
            <select
              value={countryId}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none font-medium"
            >
              {COUNTRIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name} ({c.region})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-neutral-500">
              Salutations, sign-offs, and reference formatting automatically adapt to {country.name} business norms.
            </p>
          </div>

          {/* Job & Recipient Information */}
          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Recipient & Job Details
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={letterData.jobTitle}
                  onChange={(e) => updateField('jobTitle', e.target.value)}
                  placeholder="e.g. Lead Product Manager"
                  className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={letterData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  placeholder="e.g. Siemens AG or Stripe"
                  className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Job Requisition / Ref ID</label>
                  <input
                    type="text"
                    value={letterData.referenceNumber || ''}
                    onChange={(e) => updateField('referenceNumber', e.target.value)}
                    placeholder="e.g. REQ-2026-44"
                    className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Date</label>
                  <input
                    type="date"
                    value={letterData.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Recipient Name & Department</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={letterData.recipientName}
                    onChange={(e) => updateField('recipientName', e.target.value)}
                    placeholder="Recipient Name"
                    className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    value={letterData.recipientTitle}
                    onChange={(e) => updateField('recipientTitle', e.target.value)}
                    placeholder="Department / Title"
                    className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Letter Prose Editor */}
          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Letter Content & Body Paragraphs
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1 font-semibold">Salutation</label>
                <input
                  type="text"
                  value={letterData.salutation}
                  onChange={(e) => updateField('salutation', e.target.value)}
                  className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1 font-semibold">Opening Hook</label>
                <textarea
                  rows={3}
                  value={letterData.openingParagraph}
                  onChange={(e) => updateField('openingParagraph', e.target.value)}
                  className="w-full p-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1 font-semibold">Key Achievements & Fit</label>
                <textarea
                  rows={4}
                  value={letterData.bodyParagraphs[0] || ''}
                  onChange={(e) => {
                    const newBody = [...letterData.bodyParagraphs];
                    newBody[0] = e.target.value;
                    updateField('bodyParagraphs', newBody);
                  }}
                  className="w-full p-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1 font-semibold">Company Value & Motivation</label>
                <textarea
                  rows={3}
                  value={letterData.bodyParagraphs[1] || ''}
                  onChange={(e) => {
                    const newBody = [...letterData.bodyParagraphs];
                    newBody[1] = e.target.value;
                    updateField('bodyParagraphs', newBody);
                  }}
                  className="w-full p-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1 font-semibold">Closing Call to Action</label>
                <textarea
                  rows={2}
                  value={letterData.closingParagraph}
                  onChange={(e) => updateField('closingParagraph', e.target.value)}
                  className="w-full p-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-neutral-600 dark:text-neutral-400 mb-1 font-semibold">Sign-off</label>
                <input
                  type="text"
                  value={letterData.signOff}
                  onChange={(e) => updateField('signOff', e.target.value)}
                  className="w-full px-3 py-1.5 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Fidelity Letter Preview */}
        <div className="lg:col-span-7 flex justify-center sticky top-24 print:static print:w-full print:m-0 print:p-0 print:block">
          <div 
            id="cover-letter-paper"
            className="w-full max-w-[650px] bg-white text-neutral-900 shadow-2xl p-10 sm:p-12 border border-neutral-200 min-h-[780px] rounded-sm space-y-6 text-xs sm:text-[13px] leading-relaxed select-text"
          >
            {/* Sender Header */}
            <div className="border-b-2 border-neutral-900 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-neutral-900">
                {letterData.senderName}
              </h2>
              <div className="text-xs text-neutral-600 font-medium mt-0.5">
                {letterData.senderTitle}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-neutral-500">
                {letterData.senderEmail && <span>{letterData.senderEmail}</span>}
                {letterData.senderPhone && <span>· {letterData.senderPhone}</span>}
                {letterData.senderAddress && <span>· {letterData.senderAddress}</span>}
              </div>
            </div>

            {/* Date */}
            <div className="text-neutral-600 font-mono text-xs">
              {letterData.date}
            </div>

            {/* Recipient Details */}
            <div className="text-neutral-800 space-y-0.5 text-xs">
              <div className="font-bold">{letterData.recipientName}</div>
              <div>{letterData.recipientTitle}</div>
              <div className="font-semibold text-neutral-900">{letterData.companyName}</div>
              <div>{letterData.companyAddress}</div>
            </div>

            {/* Betreff / Subject Line */}
            <div className="font-bold text-neutral-900 text-sm border-l-2 border-blue-600 pl-3 py-0.5">
              Subject: Application for {letterData.jobTitle} {letterData.referenceNumber ? `(Ref: ${letterData.referenceNumber})` : ''}
            </div>

            {/* Salutation */}
            <div className="font-semibold text-neutral-900">
              {letterData.salutation}
            </div>

            {/* Body */}
            <div className="space-y-4 text-neutral-800 text-justify">
              <p>{letterData.openingParagraph}</p>
              {letterData.bodyParagraphs.map((p: string, idx: number) => (
                <p key={idx}>{p}</p>
              ))}
              <p>{letterData.closingParagraph}</p>
            </div>

            {/* Sign Off */}
            <div className="pt-4 space-y-6">
              <div>{letterData.signOff}</div>
              <div className="font-bold text-neutral-900 uppercase tracking-wide">
                {letterData.senderName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
