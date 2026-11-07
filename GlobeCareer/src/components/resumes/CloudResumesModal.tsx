import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firebase';
import {
  collection,
  query,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';
import { ResumeData } from '../../types/resume';
import { Cloud, Trash2, X, Plus, AlertCircle, CheckCircle2, Clock, Globe } from 'lucide-react';

interface CloudResumesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentResumeData: ResumeData;
  onLoadResume: (data: ResumeData) => void;
  onOpenAuth: () => void;
}

interface SavedCloudResume {
  id: string;
  title: string;
  targetCountryId: string;
  templateId: string;
  updatedAt: string;
  resumeData: ResumeData;
}

export const CloudResumesModal: React.FC<CloudResumesModalProps> = ({
  isOpen,
  onClose,
  currentResumeData,
  onLoadResume,
  onOpenAuth,
}) => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<SavedCloudResume[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveTitle, setSaveTitle] = useState('');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to user's saved resumes
  useEffect(() => {
    if (!user) {
      setResumes([]);
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, 'users', user.uid, 'resumes'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const list: SavedCloudResume[] = [];
          snapshot.forEach((doc) => {
            const d = doc.data();
            list.push({
              id: doc.id,
              title: d.title || 'Untitled Resume',
              targetCountryId: d.targetCountryId || 'us',
              templateId: d.templateId || 'ats_classic',
              updatedAt: d.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
              resumeData: d.resumeData,
            });
          });
          setResumes(list);
          setLoading(false);
        },
        (err) => {
          console.warn('Resumes listener note:', err);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (e) {
      setLoading(false);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSaveCurrent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError(null);

    const title = saveTitle.trim() || `${currentResumeData.personal.fullName || 'Resume'} (${currentResumeData.targetCountryId.toUpperCase()})`;
    const docId = `cv-${Date.now()}`;

    try {
      await setDoc(doc(db, 'users', user.uid, 'resumes', docId), {
        title,
        targetCountryId: currentResumeData.targetCountryId,
        templateId: currentResumeData.design.templateId,
        resumeData: currentResumeData,
        updatedAt: serverTimestamp(),
      });
      setSaveTitle('');
      setSaveSuccess(`"${title}" saved to your cloud library!`);
      setTimeout(() => setSaveSuccess(null), 3000);
    } catch (err: any) {
      console.warn('Could not save to cloud:', err);
      setError('Could not sync to cloud. Changes are safely saved in local storage.');
    }
  };

  const handleDelete = async (resumeId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'resumes', resumeId));
    } catch (e) {
      console.warn('Delete error:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden text-neutral-900 dark:text-neutral-100 transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Cloud Resumes</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Access and sync your CVs across devices</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {!user ? (
            <div className="text-center py-6 space-y-3">
              <Cloud className="w-10 h-10 text-neutral-300 dark:text-neutral-600 mx-auto" />
              <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Free Local Storage Active</div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Your current resume is automatically saved in your browser’s local storage.
                Sign in to back up your resumes to the cloud and manage multiple tailored versions.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                className="py-2 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Sign In or Create Free Account
              </button>
            </div>
          ) : (
            <>
              {/* Save current form */}
              <form onSubmit={handleSaveCurrent} className="p-4 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Save Active Resume to Cloud
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={saveTitle}
                    onChange={(e) => setSaveTitle(e.target.value)}
                    placeholder={`e.g. ${currentResumeData.personal.fullName || 'My Resume'} (${currentResumeData.targetCountryId.toUpperCase()})`}
                    className="flex-1 px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:border-indigo-600 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-xs font-semibold rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    Save Version
                  </button>
                </div>
                {saveSuccess && (
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    ✓ {saveSuccess}
                  </div>
                )}
                {error && (
                  <div className="text-[11px] text-red-600 dark:text-red-400 font-medium">
                    {error}
                  </div>
                )}
              </form>

              {/* Saved list */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Your Saved Resumes ({resumes.length})
                </div>

                {loading ? (
                  <div className="py-6 text-center text-xs text-neutral-400 dark:text-neutral-500">Loading your cloud resumes...</div>
                ) : resumes.length === 0 ? (
                  <div className="py-8 text-center text-xs text-neutral-400 dark:text-neutral-500 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                    No cloud resumes saved yet. Save your active draft above.
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                    {resumes.map((r) => (
                      <div
                        key={r.id}
                        className="p-3.5 flex items-center justify-between gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">{r.title}</div>
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                            <span className="uppercase font-semibold text-neutral-700 dark:text-neutral-300">{r.targetCountryId}</span>
                            <span>·</span>
                            <span>Template: {r.templateId}</span>
                            <span>·</span>
                            <span>{new Date(r.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              onLoadResume(r.resumeData);
                              onClose();
                            }}
                            className="py-1.5 px-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                          >
                            Load
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(r.id)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete cloud resume"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
