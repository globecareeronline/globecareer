import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, FileText, ArrowRight, Zap, Search } from 'lucide-react';

interface ATSGuidePageProps {
  onStartBuilder: () => void;
}

export const ATSGuidePage: React.FC<ATSGuidePageProps> = ({ onStartBuilder }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block">
          Comprehensive Technical Breakdown
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
          The Definitive Guide to Applicant Tracking Systems (ATS)
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Over 98% of Fortune 500 corporations and 70%+ of international mid-sized companies utilize Applicant Tracking Systems (such as Workday, Taleo, Greenhouse, and Lever) to parse, filter, and index candidate applications before any human recruiter reviews them.
        </p>
      </div>

      {/* Critical Transparency Notice */}
      <div className="p-4 bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-2xl text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
        <strong>Transparency & Ethics Notice:</strong> No resume builder can honestly guarantee that a specific format will achieve a "100% ATS score" across every proprietary employer setup. Recruiters configure individual knockout questions, location boundaries, and subjective criteria. GlobeCareer builds documents that comply strictly with standard UTF-8 parsing grammars, logical DOM order, and standard section naming conventions.
      </div>

      {/* How ATS Parsers Read Documents */}
      <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm space-y-5">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          How ATS Parsing Algorithms Actually Work
        </h2>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
          When you upload a PDF or DOCX file, the parser extracts raw text strings sequentially and attempts to map them into a structured database record:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">1. Tokenization</span>
            <p className="text-neutral-600 dark:text-neutral-400">
              The engine strips visual styles, colors, and borders, extracting a linear character stream.
            </p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">2. Entity Recognition</span>
            <p className="text-neutral-600 dark:text-neutral-400">
              Pattern matchers look for emails, phone prefixes, degree codes (B.Sc., M.Sc., MBA), and dates.
            </p>
          </div>
          <div className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1.5">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 block">3. Keyword Indexing</span>
            <p className="text-neutral-600 dark:text-neutral-400">
              Skills and job titles are indexed against the employer requisition's required criteria.
            </p>
          </div>
        </div>
      </div>

      {/* The 7 Deadly Formatting Mistakes */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          The 7 Formatting Traps That Cause Immediate ATS Rejection
        </h2>

        <div className="space-y-3">
          {[
            {
              title: '1. Text Boxes and Floating Divs',
              desc: 'Many visual graphic design tools place contact info or skills inside floating text boxes. Parsers frequently ignore floating coordinate frames entirely or read them completely out of chronological order.'
            },
            {
              title: '2. Buried Contact Details in Header / Footer Margins',
              desc: 'Standard word processor headers and footers are routinely ignored by older ATS parsers (like Taleo) to avoid reading document page numbers as candidate data.'
            },
            {
              title: '3. Creative Section Headings',
              desc: 'Using cute or unconventional headers like "My Journey", "Where I Excel", or "Things I Love" causes parsers to fail section identification. Always stick to standard titles: Work Experience, Education, Skills.'
            },
            {
              title: '4. Non-Standard PDF Flattening (Rasterized Images)',
              desc: 'If a PDF exports text as a flattened raster canvas (pixels instead of vector font glyphs), the ATS sees an entirely blank document with zero readable characters.'
            },
            {
              title: '5. Photographs in Anti-Bias Jurisdictions',
              desc: 'In the US, UK, and Canada, enterprise software (like Workday) can be configured to reject resumes containing image data to shield human hiring teams from civil rights litigation.'
            },
            {
              title: '6. Inconsistent Date Syntax',
              desc: 'Mixing formats (e.g. "Spring 2021" vs "03/2021") confuses parsing models that calculate total years of professional experience.'
            },
            {
              title: '7. Skill Graphs and Progress Bars',
              desc: 'Visual star ratings or 85% progress bars cannot be read by ATS software and waste valuable real estate without registering keyword credit.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-neutral-900 dark:text-neutral-100 block mb-0.5">
                  {item.title}
                </span>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable ATS Checklist */}
      <div className="p-8 bg-neutral-900 text-white dark:bg-neutral-950 border border-neutral-800 rounded-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">The GlobeCareer ATS Readiness Checklist</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Every resume generated by our builder adheres to these core criteria.
            </p>
          </div>
          <ShieldCheck className="w-8 h-8 text-blue-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {[
            'Single-column reading order hierarchy',
            'Selectable vector text in generated PDF and DOCX',
            'Standard section headers (Experience, Education, Skills)',
            'Standard reverse-chronological date ranges (YYYY-MM)',
            'Clear contact info in body flow (not margins)',
            'Country-compliant photo rules (optional/off for US/UK)',
            'Quantifiable accomplishments with %, $, numbers',
            'Full name as highest-level Heading 1'
          ].map((check, idx) => (
            <div key={idx} className="flex items-center gap-2 text-neutral-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{check}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onStartBuilder}
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors flex items-center gap-2"
          >
            Build an ATS Resume Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
