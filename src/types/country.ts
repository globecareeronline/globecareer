export type CountryRegion = 
  | 'North America' 
  | 'Europe' 
  | 'Asia-Pacific' 
  | 'Middle East' 
  | 'Africa';

export type PhotoConvention = 
  | 'discouraged'    // E.g. US, UK, Canada, Australia, Ireland (anti-discrimination laws)
  | 'optional'        // E.g. Netherlands, Sweden, Spain, Denmark
  | 'standard'        // E.g. Germany, Austria, Switzerland, Japan, France
  | 'recommended';    // E.g. UAE, Saudi Arabia, Qatar

export interface CountrySource {
  title: string;
  url?: string;
  institution: string;
  notes: string;
}

export interface CountryConfig {
  id: string;
  name: string;
  nativeName?: string;
  region: CountryRegion;
  code: string; // ISO 2-letter
  flag: string; // Emoji
  cvTerminology: string; // e.g. "Resume", "CV", "Lebenslauf", "Rirekisho"
  standardLength: string; // e.g. "1 page standard (2 max)", "1-2 pages", "2 pages"
  paperSize: 'letter' | 'a4';
  photoRule: PhotoConvention;
  photoNotice: string;
  dateConvention: string; // e.g. "MM/YYYY", "DD/MM/YYYY", "YYYY-MM"
  dateFormatExample: string;
  addressConvention: string;
  phonePrefix: string;
  spellingVariant: 'US English' | 'UK English' | 'Canadian English' | 'Australian English' | 'Local / International English';
  
  personalDataRules: {
    dobAllowed: boolean;
    dobLabel?: string;
    nationalityAllowed: boolean;
    maritalStatusAllowed: boolean;
    workAuthStatusRecommended: boolean;
    workAuthLabel?: string;
    requiresGDPRClause: boolean;
    gdprClauseText?: string;
    drivingLicenseCommon: boolean;
  };

  atsRecommendations: string;
  recommendedStructure: string[];
  governmentSectorAdvice?: string;
  keyHiringNuances: string[];
  sources: CountrySource[];
}
