export type SeniorityLevel = 
  | 'Entry-Level / Graduate'
  | 'Junior (1-3 yrs)'
  | 'Mid-Level (3-6 yrs)'
  | 'Senior (6-10 yrs)'
  | 'Lead / Principal (10+ yrs)'
  | 'Executive / C-Suite'
  | 'Career Changer';

export type EmploymentType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Temporary'
  | 'Internship'
  | 'Graduate / Entry-level'
  | 'Remote'
  | 'Freelance'
  | 'Federal / Government';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  stateOrRegion: string;
  postalCode?: string;
  country: string;
  photoUrl?: string;
  hasPhoto: boolean;
  
  // Country specific optional fields
  dateOfBirth?: string;
  nationality?: string;
  workAuthorization?: string; // e.g. "US Citizen", "EU Right to Work", "Tier 2 Visa Sponsored"
  maritalStatus?: string;
  drivingLicense?: string;
  gdprConsentClause?: string;
  
  // Online profiles
  linkedIn?: string;
  github?: string;
  portfolioUrl?: string;
}

export interface WorkExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string; // YYYY-MM
  endDate: string;   // YYYY-MM or 'Present'
  isCurrent: boolean;
  employmentType?: EmploymentType;
  description: string[]; // Bullet points
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gradeOrHonors?: string; // GPA or Class degree
  highlights?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Technical' | 'Soft Skills' | 'Tools & Frameworks' | 'Other';
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  role?: string;
  url?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  technologies: string[];
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native / Bilingual' | 'Fluent (C2)' | 'Advanced (C1)' | 'Upper-Intermediate (B2)' | 'Intermediate (B1)' | 'Elementary (A2)' | 'Basic (A1)';
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface VolunteerItem {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string[];
}

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  role: string;
  company: string;
  email?: string;
  phone?: string;
  isAvailableUponRequest: boolean;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  content: string;
}

export type SectionType = 
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'projects'
  | 'languages'
  | 'awards'
  | 'volunteer'
  | 'publications'
  | 'references'
  | 'custom';

export interface SectionMeta {
  id: SectionType;
  title: string;
  enabled: boolean;
  customId?: string;
}

export type TemplateId = 
  // No-photo templates
  | 'ats_classic'
  | 'ivy_compact'
  | 'uk_corporate'
  | 'nordic_minimal'
  | 'tech_modern'
  // Photo templates
  | 'executive_photo'
  | 'european_modern'
  | 'creative_showcase';

export interface ResumeDesignSettings {
  templateId: TemplateId;
  fontFamily: 'sans' | 'serif' | 'mono';
  fontSize: 'compact' | 'normal' | 'relaxed';
  spacing: 'compact' | 'normal' | 'comfortable';
  accentColor: string; // Hex color code
  paperSize: 'letter' | 'a4';
  showPhoto: boolean;
  photoShape: 'circle' | 'rounded' | 'square';
  photoPosition: 'top-left' | 'top-right' | 'sidebar';
}

export interface ResumeData {
  id: string;
  targetCountryId: string;
  targetJobCategory: string;
  seniority: SeniorityLevel;
  employmentType: EmploymentType;
  lastModified: number;
  
  personal: PersonalInfo;
  summary: string;
  experience: WorkExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  languages: LanguageItem[];
  awards: AwardItem[];
  volunteer: VolunteerItem[];
  publications: PublicationItem[];
  references: ReferenceItem[];
  referencesUponRequestOnly: boolean;
  customSections: CustomSectionItem[];

  sectionsOrder: SectionMeta[];
  design: ResumeDesignSettings;
}

export interface CoverLetterData {
  id: string;
  targetCountryId: string;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;
  date: string;
  jobTitle: string;
  referenceNumber?: string;
  salutation: string;
  openingParagraph: string;
  bodyParagraphs: string[];
  closingParagraph: string;
  signOff: string;
  senderName: string;
  senderTitle: string;
  senderPhone: string;
  senderEmail: string;
  senderAddress: string;
}
