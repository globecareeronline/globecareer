import React, { useState, useMemo } from 'react';
import { VERIFIED_JOBS } from '../../data/verifiedJobs';
import { VerifiedJob, JobCountry } from '../../types/jobs';
import { VerificationEvidenceModal } from './VerificationEvidenceModal';
import { ReportJobModal } from './ReportJobModal';
import { JobDetailModal } from './JobDetailModal';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  ShieldCheck,
  ExternalLink,
  Flag,
  Globe,
  Briefcase,
  MapPin,
  Lock,
  Sparkles,
  CheckCircle2,
  BookmarkPlus,
  Info,
  Calendar,
  Filter,
  ArrowUpDown,
  RotateCcw,
  Check,
  AlertCircle
} from 'lucide-react';

interface JobsPageProps {
  onOpenPricing?: (returnJob?: VerifiedJob) => void;
  onOpenAuth: () => void;
  onNavigateToBuilder?: (jobDescription?: string) => void;
  onOpenCheckout?: (plan: 'monthly' | 'annual', returnJob?: VerifiedJob) => void;
}

export const JobsPage: React.FC<JobsPageProps> = ({
  onOpenPricing,
  onOpenAuth,
  onNavigateToBuilder,
  onOpenCheckout,
}) => {
  const { user } = useAuth();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<'all' | JobCountry>('all');
  const [workArrangement, setWorkArrangement] = useState<'all' | 'remote' | 'hybrid' | 'onsite'>('all');
  const [employmentType, setEmploymentType] = useState<'all' | 'full-time' | 'part-time' | 'internship' | 'contract'>('all');
  const [experienceLevel, setExperienceLevel] = useState<'all' | 'entry-level' | 'mid-level' | 'senior' | 'lead'>('all');
  const [visaOnly, setVisaOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'active' | 'all' | 'expired'>('active');
  const [sortBy, setSortBy] = useState<'newest' | 'deadline' | 'company'>('newest');

  // Modals state
  const [selectedJob, setSelectedJob] = useState<VerifiedJob | null>(null);
  const [auditJob, setAuditJob] = useState<VerifiedJob | null>(null);
  const [reportingJob, setReportingJob] = useState<VerifiedJob | null>(null);
  const [savedJobSuccess, setSavedJobSuccess] = useState<string | null>(null);

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

  // Filter listings
  const filteredJobs = useMemo(() => {
    return VERIFIED_JOBS.filter((job) => {
      // Status filter
      if (statusFilter === 'active' && job.status !== 'active') return false;
      if (statusFilter === 'expired' && job.status !== 'expired' && job.status !== 'closed') return false;

      // Country filter
      if (selectedCountry !== 'all' && job.country !== selectedCountry) {
        return false;
      }

      // Work arrangement
      if (workArrangement !== 'all' && job.workArrangement !== workArrangement) {
        return false;
      }

      // Employment type
      if (employmentType !== 'all' && job.employmentType !== employmentType) {
        return false;
      }

      // Experience level
      if (experienceLevel !== 'all' && job.experienceLevel !== experienceLevel) {
        return false;
      }

      // Visa sponsorship
      if (visaOnly && job.visaSponsorship !== 'yes') {
        return false;
      }

      // Search query (Title, Company, Location, Requirements, Skills)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesLocation = job.location.toLowerCase().includes(q);
        const matchesReqs = job.requirements?.some((r) => r.toLowerCase().includes(q));
        const matchesSkills = job.skills?.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesLocation && !matchesReqs && !matchesSkills) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      }
      if (sortBy === 'deadline') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (sortBy === 'company') {
        return a.company.localeCompare(b.company);
      }
      return 0;
    });
  }, [
    selectedCountry,
    workArrangement,
    employmentType,
    experienceLevel,
    visaOnly,
    statusFilter,
    searchQuery,
    sortBy,
  ]);

  const handleSaveToPipeline = (job: VerifiedJob) => {
    try {
      const existing = localStorage.getItem('globecareer_applications') || localStorage.getItem('globecv_applications');
      const list = existing ? JSON.parse(existing) : [];
      const alreadySaved = list.some((i: any) => i.id === job.id || (i.jobTitle === job.title && i.company === job.company));
      if (!alreadySaved) {
        list.push({
          id: `app-${Date.now()}`,
          jobTitle: job.title,
          company: job.company,
          location: job.location,
          targetCountry: job.country,
          source: job.verificationEvidence.officialSourceAttribution,
          appliedDate: new Date().toISOString().split('T')[0],
          status: 'wishlist',
          notes: `Added from GlobeCareer Verified Jobs. Canonical URL: ${job.canonicalUrl}`,
        });
        localStorage.setItem('globecareer_applications', JSON.stringify(list));
      }
      setSavedJobSuccess(`Saved "${job.title}" to your Application Tracker.`);
      setTimeout(() => setSavedJobSuccess(null), 3000);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCountry('all');
    setWorkArrangement('all');
    setEmploymentType('all');
    setExperienceLevel('all');
    setVisaOnly(false);
    setStatusFilter('active');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 pb-20 text-neutral-900 dark:text-neutral-100">
      {/* Hero Header */}
      <section className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified International Opportunities
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
                Authentic International Careers Portal
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
                Every opportunity is audited directly against real employer career platforms, government registries, or authorized ATS feeds. Zero fee-charging scams, zero phantom job listings.
              </p>
            </div>

            {/* 100% Free Access Notice */}
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs shrink-0 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block">100% Free & Open Access</span>
              <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Unlimited Direct Applications</span>
              </div>
              <div className="text-[11px] text-neutral-500">
                Zero paywalls · Verified employer ATS links
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Search Bar & Primary Filters */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-5 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, employer (e.g. Stripe, SAP), skills, or keywords..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Country Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value as any)}
                aria-label="Filter by Country"
                className="w-full px-3 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl focus:outline-none text-neutral-800 dark:text-neutral-200"
              >
                <option value="all">🌐 All Countries</option>
                <option value="us">🇺🇸 United States</option>
                <option value="uk">🇬🇧 United Kingdom</option>
                <option value="ca">🇨🇦 Canada</option>
                <option value="au">🇦🇺 Australia</option>
                <option value="de">🇩🇪 Germany</option>
                <option value="fr">🇫🇷 France</option>
                <option value="nl">🇳🇱 Netherlands</option>
                <option value="global">🌍 Worldwide Remote</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort by Criteria"
                className="w-full px-3 py-2.5 text-xs bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl focus:outline-none text-neutral-800 dark:text-neutral-200"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="deadline">Sort: Approaching Deadline</option>
                <option value="company">Sort: Company Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Secondary Quick-Filter Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              {/* Work Arrangement */}
              <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                {(['all', 'remote', 'hybrid', 'onsite'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setWorkArrangement(mode)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                      workArrangement === mode
                        ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                    }`}
                  >
                    {mode === 'all' ? 'All Formats' : mode}
                  </button>
                ))}
              </div>

              {/* Experience Level */}
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                aria-label="Filter by Experience Level"
                className="px-2.5 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-neutral-700 dark:text-neutral-300 focus:outline-none"
              >
                <option value="all">All Levels</option>
                <option value="entry-level">Entry-Level / Graduate</option>
                <option value="mid-level">Mid-Level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead / Executive</option>
              </select>

              {/* Visa Sponsorship Toggle */}
              <button
                type="button"
                onClick={() => setVisaOnly(!visaOnly)}
                className={`px-3 py-1 rounded-xl font-medium border transition-colors flex items-center gap-1.5 ${
                  visaOnly
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                    : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {visaOnly && <Check className="w-3.5 h-3.5 text-blue-600" />}
                Visa Sponsorship
              </button>

              {/* Status Toggle (Active vs Expired) */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                aria-label="Filter by Listing Status"
                className="px-2.5 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-neutral-700 dark:text-neutral-300 focus:outline-none"
              >
                <option value="active">Active Openings</option>
                <option value="all">All (Active & Expired)</option>
                <option value="expired">Closed / Expired Archive</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCountry !== 'all' || workArrangement !== 'all' || experienceLevel !== 'all' || visaOnly || statusFilter !== 'active') && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 inline-flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Saved Success Notification */}
        {savedJobSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{savedJobSuccess}</span>
          </div>
        )}

        {/* Listings Count Bar */}
        <div className="flex items-center justify-between text-xs text-neutral-500 px-1">
          <div>
            Showing <strong className="text-neutral-900 dark:text-neutral-100">{filteredJobs.length}</strong> verified opportunities
            {selectedCountry !== 'all' && ` in ${countryLabels[selectedCountry]?.name}`}
            {statusFilter === 'expired' && ' (Closed / Expired Archive)'}
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% Fee-Free & Verified Sources</span>
          </div>
        </div>

        {/* Job Listings Grid */}
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 mx-auto flex items-center justify-center text-neutral-400">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">No matching verified jobs found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                No vacancies currently match your active filters. Try broadening your criteria or reset the search query.
              </p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const isClosed = job.status === 'expired' || job.status === 'closed';

              return (
                <div
                  key={job.id}
                  className={`bg-white dark:bg-neutral-900 border rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-5 ${
                    isClosed
                      ? 'border-neutral-200 dark:border-neutral-800 opacity-75'
                      : 'border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-800'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-base">{countryLabels[job.country]?.flag || '🌐'}</span>
                        <span className="text-[11px] font-semibold text-neutral-500">
                          {countryLabels[job.country]?.name || 'International'}
                        </span>
                        <span className="text-neutral-300 dark:text-neutral-700">·</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full">
                          {job.workArrangement}
                        </span>
                      </div>

                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                        isClosed
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {isClosed ? 'Closed' : 'Verified'}
                      </span>
                    </div>

                    {/* Job Title & Company */}
                    <div className="space-y-1">
                      <h2
                        onClick={() => setSelectedJob(job)}
                        className="text-base font-bold text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors line-clamp-2"
                      >
                        {job.title}
                      </h2>
                      <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>{job.company}</span>
                      </div>
                    </div>

                    {/* Location & Salary */}
                    <div className="space-y-1 text-xs text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      {job.salary && (
                        <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {job.salary}
                        </div>
                      )}
                    </div>

                    {/* Snippet Description */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Deadline & Audit Note */}
                    <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {job.deadline ? `Closes ${job.deadline}` : 'No closing date published'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAuditJob(job)}
                        className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 underline text-[10px]"
                      >
                        Audit Evidence
                      </button>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveToPipeline(job)}
                      className="p-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title="Save to Application Tracker"
                    >
                      <BookmarkPlus className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedJob(job)}
                        className="px-3 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        View Details
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedJob(job)}
                        className="px-3.5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Apply Free</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      <JobDetailModal
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        onOpenPricing={(job) => {
          setSelectedJob(null);
          if (onOpenCheckout) {
            onOpenCheckout('monthly', job);
          } else if (onOpenPricing) {
            onOpenPricing(job);
          }
        }}
        onOpenAuth={() => {
          setSelectedJob(null);
          onOpenAuth();
        }}
        onOpenReport={(job) => {
          setReportingJob(job);
        }}
        onOpenATSJobMatcher={(desc) => {
          if (onNavigateToBuilder) {
            onNavigateToBuilder(desc);
          }
        }}
        onSaveToPipeline={handleSaveToPipeline}
      />

      <VerificationEvidenceModal
        job={auditJob}
        isOpen={!!auditJob}
        onClose={() => setAuditJob(null)}
      />

      <ReportJobModal
        job={reportingJob}
        isOpen={!!reportingJob}
        onClose={() => setReportingJob(null)}
      />
    </div>
  );
};
