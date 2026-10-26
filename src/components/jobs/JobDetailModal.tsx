import React, { useState } from 'react';
import { VerifiedJob, JobCountry } from '../../types/jobs';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Briefcase,
  DollarSign,
  Lock,
  Sparkles,
  AlertTriangle,
  Clock,
  Flag,
  Share2,
  BookmarkPlus,
  Mail,
  Building,
  Check
} from 'lucide-react';

interface JobDetailModalProps {
  job: VerifiedJob | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenPricing?: (returnJob?: VerifiedJob) => void;
  onOpenAuth: () => void;
  onOpenReport: (job: VerifiedJob) => void;
  onOpenATSJobMatcher?: (jobDescription: string) => void;
  onSaveToPipeline?: (job: VerifiedJob) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  isOpen,
  onClose,
  onOpenAuth,
  onOpenReport,
  onOpenATSJobMatcher,
  onSaveToPipeline,
}) => {
  const { user, isPro, subscription, remainingApplications, recordJobApplication } = useAuth();
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !job) return null;

  const isExpired = job.status === 'expired' || job.status === 'closed';

  const handleApply = async () => {
    if (isExpired) {
      setApplyError('This job posting is closed and no longer accepting applications.');
      return;
    }

    setApplying(true);
    setApplyError(null);

    try {
      await recordJobApplication(job.id, job.title, job.company, job.location);
      setApplying(false);
      setApplySuccess('Application recorded in your Tracker! Opening official portal...');

      // Open the verified application URL in a safe new window
      setTimeout(() => {
        window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
      }, 600);
    } catch (err: any) {
      setApplying(false);
      // Still open the job portal even if storage failed
      window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSave = () => {
    if (onSaveToPipeline) {
      onSaveToPipeline(job);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const countryLabels: Record<JobCountry, { name: string; flag: string }> = {
    us: { name: 'United States', flag: '🇺🇸' },
    uk: { name: 'United Kingdom', flag: '🇬🇧' },
    ca: { name: 'Canada', flag: '🇨🇦' },
    au: { name: 'Australia', flag: '🇦🇺' },
    de: { name: 'Germany', flag: '🇩🇪' },
    fr: { name: 'France', flag: '🇫🇷' },
    nl: { name: 'Netherlands', flag: '🇳🇱' },
    sg: { name: 'Singapore', flag: '🇸🇬' },
    global: { name: 'Worldwide Remote', flag: '🌐' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-detail-title"
        className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Sticky Header */}
        <div className="p-6 sm:p-8 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70 shrink-0 relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close job details"
            className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xl">{countryLabels[job.country]?.flag || '🌐'}</span>
            <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
              {countryLabels[job.country]?.name || 'International'}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full capitalize ${
              isExpired
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
            }`}>
              {job.status === 'expired' ? 'Expired / Closed' : 'Verified Open'}
            </span>
            {job.visaSponsorship === 'yes' && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                Visa Sponsorship Verified
              </span>
            )}
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 capitalize">
              {job.workArrangement}
            </span>
          </div>

          <h2 id="job-detail-title" className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight pr-8">
            {job.title}
          </h2>

          <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-neutral-500 font-medium mt-2">
            <span className="flex items-center gap-1 font-semibold text-neutral-800 dark:text-neutral-200">
              <Building className="w-3.5 h-3.5" />
              {job.company}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              {job.location}
            </span>
            {job.salary && (
              <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-3.5 h-3.5" />
                {job.salary}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto grow">
          {/* Published Deadlines & Verification Timeline */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Application Deadline</span>
              <div className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                {job.deadline ? (
                  <span>
                    Closes on {new Date(job.deadline).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                ) : (
                  <span>No closing date published (Rolling intake)</span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">Verification Audit</span>
              <div className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Last verified {job.verifiedAt} (Fee-free confirmed)</span>
              </div>
            </div>
          </div>

          {/* Job Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Overview</h3>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Key Responsibilities</h3>
              <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Qualifications */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Required Qualifications</h3>
            <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Keywords */}
          {job.skills && job.skills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Target Skills & Keywords</h3>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg border border-neutral-200/60 dark:border-neutral-700/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Application Instructions */}
          {job.applicationInstructions && (
            <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 rounded-2xl space-y-1.5">
              <span className="text-xs font-bold text-blue-900 dark:text-blue-300 block">
                Employer Application Instructions
              </span>
              <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                {job.applicationInstructions}
              </p>
            </div>
          )}

          {/* Official Employer Contact Information (Revealed when published or strictly noted) */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/80 space-y-2 text-xs">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              Employer Contact & Recruitment Channels
            </span>
            {job.employerContactEmail ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500">Official Recruitment Email:</span>
                  <strong className="font-mono text-neutral-900 dark:text-neutral-100">{job.employerContactEmail}</strong>
                </div>
                <p className="text-[11px] text-neutral-400">
                  {job.contactEmailNotes}
                </p>
              </div>
            ) : (
              <p className="text-neutral-500">
                {job.contactEmailNotes || 'This employer exclusively manages candidate data via their verified applicant tracking system (ATS) to comply with privacy and employment laws.'}
              </p>
            )}
          </div>

          {/* Verification Evidence Breakdown */}
          <div className="p-4 bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/60 rounded-2xl space-y-2 text-xs">
            <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              GlobeCareer Verification Proof
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-neutral-400 block">Corporate Domain:</span>
                <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{job.verificationEvidence.domainName}</span>
              </div>
              <div>
                <span className="text-neutral-400 block">SSL Enforced:</span>
                <span className="font-semibold text-emerald-600">Confirmed (HTTPS)</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Zero Candidate Fee:</span>
                <span className="font-semibold text-emerald-600">Verified (100% Free)</span>
              </div>
              <div>
                <span className="text-neutral-400 block">Source Feed:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate block" title={job.verificationEvidence.officialSourceAttribution}>
                  {job.verificationEvidence.officialSourceAttribution}
                </span>
              </div>
            </div>
            {job.verificationEvidence.notes && (
              <p className="text-[11px] text-neutral-500 pt-1 border-t border-emerald-200/40 dark:border-emerald-900/40">
                Note: {job.verificationEvidence.notes}
              </p>
            )}
          </div>

          {/* Error Message */}
          {applyError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{applyError}</span>
            </div>
          )}

          {/* Success Message */}
          {applySuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{applySuccess}</span>
            </div>
          )}
        </div>

        {/* Sticky Footer Actions */}
        <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSave}
              className="p-3 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 transition-colors flex items-center gap-1.5"
              title="Save to Application Tracker"
            >
              <BookmarkPlus className="w-4 h-4" />
              <span>{savedSuccess ? 'Saved!' : 'Save'}</span>
            </button>

            {onOpenATSJobMatcher && (
              <button
                type="button"
                onClick={() => onOpenATSJobMatcher(job.description + ' ' + job.requirements.join(' '))}
                className="p-3 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-xl bg-white dark:bg-neutral-800 transition-colors flex items-center gap-1.5"
                title="Match Resume with ATS Keywords"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>ATS Match</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onOpenReport(job)}
              className="p-3 text-xs text-neutral-400 hover:text-rose-600 transition-colors"
              title="Report suspicious or broken listing"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isExpired ? (
              <button
                type="button"
                disabled
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-neutral-200 dark:bg-neutral-800 text-neutral-400 font-bold text-xs uppercase tracking-wider cursor-not-allowed"
              >
                Listing Closed
              </button>
            ) : (
              <button
                type="button"
                disabled={applying}
                onClick={handleApply}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-400 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{applying ? 'Opening Official Portal...' : 'Apply via Official Portal (Free)'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
