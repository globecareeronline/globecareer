import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/firestore';
import {
  collection,
  query,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import {
  Briefcase,
  Plus,
  Trash2,
  Calendar,
  Building,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Cloud,
  CheckCircle2,
  X
} from 'lucide-react';

export interface ApplicationItem {
  id: string;
  jobTitle: string;
  company: string;
  location?: string;
  targetCountry?: string;
  salary?: string;
  source?: string;
  appliedDate: string;
  status: 'wishlist' | 'applied' | 'interviewing' | 'offered' | 'rejected';
  notes?: string;
}

interface ApplicationTrackerPageProps {
  onOpenAuth?: () => void;
  onNavigateToJobs?: () => void;
}

export const ApplicationTrackerPage: React.FC<ApplicationTrackerPageProps> = ({
  onOpenAuth,
  onNavigateToJobs,
}) => {
  const { user } = useAuth();
  const [items, setItems] = useState<ApplicationItem[]>(() => {
    const saved = localStorage.getItem('globecareer_applications') || localStorage.getItem('globecv_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: 'seed-1',
        jobTitle: 'Senior Cloud Engineer',
        company: 'Stripe',
        location: 'San Francisco, CA / Remote',
        targetCountry: 'us',
        salary: '$165,000 - $210,000',
        appliedDate: '2026-10-18',
        status: 'applied',
        notes: 'Submitted US-tailored single-page CV without photo.',
      },
      {
        id: 'seed-2',
        jobTitle: 'Lead Product Designer',
        company: 'Monzo',
        location: 'London, United Kingdom',
        targetCountry: 'uk',
        salary: '£85,000 - £110,000',
        appliedDate: '2026-10-19',
        status: 'interviewing',
        notes: 'Initial recruiter screening scheduled for Thursday.',
      },
      {
        id: 'seed-3',
        jobTitle: 'Staff Full-Stack Engineer',
        company: 'Canva',
        location: 'Sydney, Australia',
        targetCountry: 'au',
        salary: 'A$170,000 - A$205,000',
        appliedDate: '2026-10-17',
        status: 'wishlist',
        notes: 'Targeting Sydney visa sponsorship pipeline.',
      },
    ];
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newStatus, setNewStatus] = useState<ApplicationItem['status']>('wishlist');
  const [newNotes, setNewNotes] = useState('');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('globecareer_applications', JSON.stringify(items));
    localStorage.setItem('globecv_applications', JSON.stringify(items));
  }, [items]);

  // Sync to Firestore if authenticated
  useEffect(() => {
    if (!user) return;
    try {
      const q = query(collection(db, 'users', user.uid, 'job_applications'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const cloudItems: ApplicationItem[] = [];
            snapshot.forEach((doc) => {
              cloudItems.push({ id: doc.id, ...(doc.data() as any) });
            });
            setItems(cloudItems);
          }
        },
        (err) => {
          console.warn('Firestore tracker sync notice:', err);
        }
      );
      return () => unsubscribe();
    } catch (e) {
      // offline fallback
    }
  }, [user]);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const newItem: ApplicationItem = {
      id: `app-${Date.now()}`,
      jobTitle: newTitle.trim(),
      company: newCompany.trim(),
      location: newLocation.trim(),
      salary: newSalary.trim(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: newStatus,
      notes: newNotes.trim(),
    };

    setItems((prev) => [newItem, ...prev]);

    if (user) {
      try {
        await setDoc(
          doc(db, 'users', user.uid, 'job_applications', newItem.id),
          {
            ...newItem,
            updatedAt: serverTimestamp(),
          }
        );
      } catch (err) {
        console.warn('Could not save to Firestore:', err);
      }
    }

    setNewTitle('');
    setNewCompany('');
    setNewLocation('');
    setNewSalary('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const handleUpdateStatus = async (itemId: string, status: ApplicationItem['status']) => {
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, status } : i))
    );
    if (user) {
      try {
        await setDoc(
          doc(db, 'users', user.uid, 'job_applications', itemId),
          { status, updatedAt: serverTimestamp() },
          { merge: true }
        );
      } catch (err) {
        console.warn('Could not update status in Firestore:', err);
      }
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    if (user) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'job_applications', itemId));
      } catch (err) {
        console.warn('Could not delete from Firestore:', err);
      }
    }
  };

  const columns: { status: ApplicationItem['status']; label: string; color: string }[] = [
    { status: 'wishlist', label: 'Wishlist', color: 'border-neutral-300 dark:border-neutral-700' },
    { status: 'applied', label: 'Applied', color: 'border-blue-400 dark:border-blue-500' },
    { status: 'interviewing', label: 'Interviewing', color: 'border-amber-400 dark:border-amber-500' },
    { status: 'offered', label: 'Offered', color: 'border-emerald-500 dark:border-emerald-400' },
    { status: 'rejected', label: 'Archived', color: 'border-neutral-200 dark:border-neutral-800' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 pb-20 text-neutral-900 dark:text-neutral-100 transition-colors">
      {/* Top Banner */}
      <section className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              <span>International Candidate Pipeline</span>
            </div>
            <h1 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight mt-1">
              Job Application Tracker
            </h1>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              Organize your cross-border job applications from initial wishlist to final job offer.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToJobs}
              className="py-2 px-3.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Browse Verified Jobs
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="py-2 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Track New Application
            </button>
          </div>
        </div>

        {/* Sync Status Banner */}
        <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <Cloud className={`w-4 h-4 ${user ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-400'}`} />
            {user ? (
              <span>Cloud synchronization active for <span className="font-semibold text-neutral-800 dark:text-neutral-200">{user.email}</span></span>
            ) : (
              <span>Tracking in local browser storage.</span>
            )}
          </div>
          {!user && (
            <button
              onClick={onOpenAuth}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold cursor-pointer"
            >
              Sign In to enable multi-device sync
            </button>
          )}
        </div>
      </section>

      {/* Kanban Board Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {columns.map((col) => {
            const colItems = items.filter((i) => i.status === col.status);
            return (
              <div
                key={col.status}
                className="bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 rounded-2xl p-3.5 space-y-3 min-h-[500px] flex flex-col transition-colors"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{col.label}</span>
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-800 px-1.5 py-0.5 rounded-md border border-neutral-200 dark:border-neutral-700">
                      {colItems.length}
                    </span>
                  </div>
                </div>

                {/* Cards List */}
                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {colItems.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-neutral-400 dark:text-neutral-500 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
                      No applications
                    </div>
                  ) : (
                    colItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white dark:bg-neutral-900 rounded-xl p-3.5 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-2.5 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all text-xs"
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <div>
                            <div className="font-bold text-neutral-900 dark:text-neutral-100 leading-snug">{item.jobTitle}</div>
                            <div className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 mt-0.5">{item.company}</div>
                          </div>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-neutral-300 hover:text-red-500 dark:text-neutral-600 dark:hover:text-red-400 transition-colors p-1 cursor-pointer"
                            title="Remove application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.location && (
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-neutral-400" />
                            <span>{item.location}</span>
                          </div>
                        )}

                        {item.salary && (
                          <div className="text-[11px] font-mono font-medium text-neutral-700 dark:text-neutral-300">
                            {item.salary}
                          </div>
                        )}

                        {item.notes && (
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-950 p-2 rounded-lg border border-neutral-100 dark:border-neutral-850 italic">
                            "{item.notes}"
                          </p>
                        )}

                        {/* Move stage dropdown */}
                        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                          <span className="text-[10px] text-neutral-400 dark:text-neutral-500">{item.appliedDate}</span>
                          <select
                            value={item.status}
                            onChange={(e) => handleUpdateStatus(item.id, e.target.value as any)}
                            className="text-[10px] bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-1.5 py-0.5 text-neutral-700 dark:text-neutral-300 focus:outline-hidden cursor-pointer"
                          >
                            <option value="wishlist">Wishlist</option>
                            <option value="applied">Applied</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="offered">Offered</option>
                            <option value="rejected">Archived</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden text-neutral-900 dark:text-neutral-100 transition-colors">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Track New Application</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full p-2 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-xl focus:outline-hidden focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Employer / Company *</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Stripe, Monzo, NHS"
                  className="w-full p-2 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-xl focus:outline-hidden focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. London / Remote"
                    className="w-full p-2 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-xl focus:outline-hidden focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Initial Stage</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-hidden focus:border-indigo-600 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100"
                  >
                    <option value="wishlist">Wishlist</option>
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offered">Offered</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Estimated Comp (Optional)</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    placeholder="e.g. $140k - $160k"
                    className="w-full p-2 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-xl focus:outline-hidden focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Date</label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-xl focus:outline-hidden focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Notes & Application Context</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Submitted UK CV variant via official Greenhouse portal..."
                  className="w-full p-2 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-xl focus:outline-hidden focus:border-indigo-600 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="py-2 px-4 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
