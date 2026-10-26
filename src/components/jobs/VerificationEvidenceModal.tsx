import React from 'react';
import { VerifiedJob } from '../../types/jobs';
import { X, ShieldCheck, CheckCircle2, Globe, ExternalLink, Lock, AlertTriangle, FileText } from 'lucide-react';

interface VerificationEvidenceModalProps {
  job: VerifiedJob | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationEvidenceModal: React.FC<VerificationEvidenceModalProps> = ({
  job,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !job) return null;

  const ev = job.verificationEvidence;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden text-neutral-900 dark:text-neutral-100 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-emerald-50/50 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Verification Audit Record</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Automated multi-point authenticity check</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Target Job Info */}
          <div className="p-3.5 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1">
            <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">{job.title}</div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
              <span>{job.company}</span>
              <span>·</span>
              <span>{job.location}</span>
            </div>
          </div>

          {/* 5-Point Verification Matrix */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              5-Point Verification Results
            </h3>

            {/* Check 1 */}
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">Employer Domain Authenticity</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Target domain <span className="font-mono text-neutral-700 dark:text-neutral-300">{ev.domainName}</span> has valid WHOIS records and corporate identity.
                </div>
              </div>
            </div>

            {/* Check 2 */}
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">Secure Destination Verified (HTTPS)</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Application endpoint uses valid TLS/HTTPS encryption with no suspicious redirects.
                </div>
              </div>
            </div>

            {/* Check 3 */}
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">Fee-Free & Scam Screening Passed</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Scanned description for pay-to-apply demands, equipment fees, or cryptocurrency requests. 0 red flags detected.
                </div>
              </div>
            </div>

            {/* Check 4 */}
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">Official Source Attribution</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {ev.officialSourceAttribution}
                </div>
              </div>
            </div>

            {/* Check 5 */}
            <div className="flex items-start gap-3 p-3 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <FileText className="w-4 h-4 text-neutral-600 dark:text-neutral-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">Last Freshness Verification</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Verified at: <span className="font-mono text-neutral-700 dark:text-neutral-300">{new Date(ev.lastCheckedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Canonical Link */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Direct Application Link</span>
            <a
              href={job.canonicalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
            >
              Open Official Career Page
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Legal Notice */}
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl flex items-start gap-2.5 text-[11px] text-neutral-600 dark:text-neutral-300 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-neutral-900 dark:text-neutral-100">Independent Platform Notice:</strong> GlobeCareer verifies source authenticity, destination encryption, and scam markers. We do not guarantee job offers, visa grants, or interview appointments. Employers make all final hiring decisions.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-xs font-medium rounded-xl transition-colors cursor-pointer"
          >
            Close Audit Report
          </button>
        </div>
      </div>
    </div>
  );
};
