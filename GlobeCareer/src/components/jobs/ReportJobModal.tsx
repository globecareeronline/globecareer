import React, { useState } from 'react';
import { VerifiedJob, JobReport } from '../../types/jobs';
import { useAuth } from '../../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { X, Flag, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReportJobModalProps {
  job: VerifiedJob | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportJobModal: React.FC<ReportJobModalProps> = ({
  job,
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const [reason, setReason] = useState<JobReport['reason']>('broken_link');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const reportData: Omit<JobReport, 'id'> = {
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      reason,
      details: details.trim(),
      reportedBy: user?.email || 'anonymous',
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    try {
      await addDoc(collection(db, 'job_reports'), reportData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setDetails('');
        onClose();
      }, 1800);
    } catch (err: any) {
      console.warn('Error saving report to Firestore, logging locally:', err);
      // Fallback local storage for offline resilience
      try {
        const existing = localStorage.getItem('globecareer_offline_reports') || localStorage.getItem('globecv_offline_reports');
        const list = existing ? JSON.parse(existing) : [];
        list.push(reportData);
        localStorage.setItem('globecareer_offline_reports', JSON.stringify(list));
        localStorage.setItem('globecv_offline_reports', JSON.stringify(list));
      } catch (localErr) {
        // ignore
      }
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setDetails('');
        onClose();
      }, 1800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden text-neutral-900 dark:text-neutral-100 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-red-50/40 dark:bg-red-950/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 rounded-xl">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Report Listing</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Flag suspicious activity or broken links</p>
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
        <div className="p-6 space-y-4">
          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Report Received</div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                Thank you for keeping GlobeCareer safe. Our moderation team will investigate this listing immediately.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">{job.title}</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">{job.company} · {job.location}</div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Reason for reporting
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as any)}
                  className="w-full py-2 px-3 text-xs border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
                >
                  <option value="broken_link">Destination link is 404 or broken</option>
                  <option value="expired">Position is already closed / filled</option>
                  <option value="scam_money">Demands application fees or equipment money (Scam)</option>
                  <option value="misleading">Misleading job title or false compensation</option>
                  <option value="other">Other issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Additional Details (Optional)
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide context on what happened when trying to apply..."
                  className="w-full p-2.5 text-xs bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-xl focus:outline-hidden focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
