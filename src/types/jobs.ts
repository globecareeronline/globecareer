export type JobCountry = 'us' | 'uk' | 'ca' | 'au' | 'de' | 'fr' | 'nl' | 'sg' | 'global';

export interface VerificationEvidence {
  domainChecked: boolean;
  domainName: string;
  httpsConfirmed: boolean;
  feeFreeConfirmed: boolean;
  employerVerified: boolean;
  officialSourceAttribution: string;
  lastCheckedAt: string;
  notes?: string;
}

export interface VerifiedJob {
  id: string;
  title: string;
  company: string;
  country: JobCountry;
  location: string;
  city?: string;
  workArrangement: 'remote' | 'hybrid' | 'onsite';
  employmentType: 'full-time' | 'part-time' | 'internship' | 'contract';
  experienceLevel: 'entry-level' | 'mid-level' | 'senior' | 'lead';
  visaSponsorship: 'yes' | 'no' | 'unspecified';
  salary?: string;
  source: 'direct_ats' | 'usajobs' | 'adzuna' | 'dwp' | 'official_careers';
  canonicalUrl: string; // Source listing URL
  applicationUrl: string; // Direct application URL (revealed to Pro)
  employerContactEmail?: string; // Revealed only when legitimately published by employer
  contactEmailNotes?: string;
  verificationStatus: 'verified' | 'partner' | 'review';
  status: 'active' | 'expired' | 'closed';
  deadline?: string; // If published by employer (e.g. "2026-11-30") or undefined for "No closing date published"
  postedAt: string;
  verifiedAt: string;
  description: string;
  responsibilities?: string[];
  requirements: string[];
  skills?: string[];
  applicationInstructions?: string;
  verificationEvidence: VerificationEvidence;
}

export interface JobFilter {
  country: 'all' | JobCountry;
  workArrangement: 'all' | 'remote' | 'hybrid' | 'onsite';
  employmentType: 'all' | 'full-time' | 'part-time' | 'internship' | 'contract';
  experienceLevel: 'all' | 'entry-level' | 'mid-level' | 'senior' | 'lead';
  visaOnly: boolean;
  keyword: string;
  status: 'active' | 'all' | 'expired';
  sortBy: 'newest' | 'deadline' | 'company';
}

export interface JobReport {
  id: string;
  jobId: string;
  jobTitle: string;
  company?: string;
  reportedBy?: string;
  reason: 'scam_money' | 'broken_link' | 'expired' | 'misleading' | 'other';
  details: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: string;
}

