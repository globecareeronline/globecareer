import { CountryConfig } from '../types/country';

export const COUNTRIES: CountryConfig[] = [
  {
    id: 'us',
    name: 'United States',
    region: 'North America',
    code: 'US',
    flag: '🇺🇸',
    cvTerminology: 'Resume',
    standardLength: '1 page strictly (2 pages max for 10+ years experience)',
    paperSize: 'letter',
    photoRule: 'discouraged',
    photoNotice: 'Photographs are strictly discouraged on US resumes under EEOC (Equal Employment Opportunity Commission) anti-discrimination practices. Resumes with photos are often discarded immediately to prevent bias claims.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '05/2021 – Present',
    addressConvention: 'City, State (e.g., Austin, TX)',
    phonePrefix: '+1',
    spellingVariant: 'US English',
    personalDataRules: {
      dobAllowed: false,
      nationalityAllowed: false,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Work Authorization (e.g. US Citizen / Green Card / STEM OPT)',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: 'Use single-column layout, standard headers (Experience, Education, Skills), no columns or header text boxes, strong action verbs, and quantifiable metrics ($ saved, % increased).',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'certifications', 'projects'],
    governmentSectorAdvice: 'Federal resumes (USAJOBS) are a major exception: they require 4–6 pages including GS rating, supervisor names, contact info, hours worked per week, and salary history.',
    keyHiringNuances: [
      'Strict 1-page rule for early-to-mid career professionals',
      'Never include age, marital status, gender, religion, or headshot',
      'Quantify achievements using the XYZ formula: Accomplished [X] as measured by [Y] by doing [Z]',
      'State US work authorization if applying from abroad or on visa'
    ],
    sources: [
      { title: 'EEOC Pre-Employment Inquiries Guidelines', institution: 'US Equal Employment Opportunity Commission', notes: 'Prohibits asking for age, marital status, photo' },
      { title: 'USAJOBS Federal Resume Guide', institution: 'US Office of Personnel Management', notes: 'Detailed specs for US government employment' }
    ]
  },
  {
    id: 'ca',
    name: 'Canada',
    region: 'North America',
    code: 'CA',
    flag: '🇨🇦',
    cvTerminology: 'Resume',
    standardLength: '1 to 2 pages',
    paperSize: 'letter',
    photoRule: 'discouraged',
    photoNotice: 'Photos are discouraged under the Canadian Human Rights Act. Canadian employers screen blindly to avoid unconscious bias regarding ethnicity, age, or appearance.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '03/2020 – 11/2023',
    addressConvention: 'City, Province (e.g., Toronto, ON)',
    phonePrefix: '+1',
    spellingVariant: 'Canadian English',
    personalDataRules: {
      dobAllowed: false,
      nationalityAllowed: false,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Canadian Work Eligibility (e.g. Canadian Citizen / PR / Open Work Permit)',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: 'Simple formatting, keyword alignment with National Occupational Classification (NOC) job descriptions.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'certifications', 'volunteer'],
    keyHiringNuances: [
      'No photo, no SIN (Social Insurance Number), no birthdate',
      'Volunteer experience is highly valued in Canadian hiring culture',
      'State Canadian work status clearly if relocating or holding an IEC/PGWP permit',
      'Highlight bilingual capability (English/French) if applicable'
    ],
    sources: [
      { title: 'Resume Writing Standards', institution: 'Job Bank Canada (Government of Canada)', notes: 'Standards for civilian Canadian resumes' }
    ]
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    region: 'Europe',
    code: 'GB',
    flag: '🇬🇧',
    cvTerminology: 'Curriculum Vitae (CV)',
    standardLength: 'Strictly 2 pages standard',
    paperSize: 'a4',
    photoRule: 'discouraged',
    photoNotice: 'Photographs are not recommended in the UK under the Equality Act 2010. Including a headshot is seen as unorthodox in corporate hiring and risks automatic ATS rejection.',
    dateConvention: 'MM/YYYY or Month Year',
    dateFormatExample: 'Sept 2021 – Present',
    addressConvention: 'Town/City, County / Postcode (e.g., Manchester, M1 4BT)',
    phonePrefix: '+44',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: false,
      nationalityAllowed: false,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Right to Work in UK (e.g. UK Citizen / Settled Status / Skilled Worker Visa Required)',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: 'Standard A4 document with 2 pages. Include a concise Personal Profile, clean work history, and "References available upon request".',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'certifications', 'references'],
    keyHiringNuances: [
      '2 pages is the de-facto standard (1 page is considered too brief for experienced applicants)',
      'Include a concise 3-4 sentence Personal Profile at the top',
      'Use UK English spelling (e.g., analyse, organise, programme)',
      'Education usually includes GCSEs/A-Levels for early career, or Degree Class (e.g., First Class Honours, 2:1)'
    ],
    sources: [
      { title: 'How to write a CV', institution: 'National Careers Service (UK Gov)', notes: 'UK official employment standards' }
    ]
  },
  {
    id: 'au',
    name: 'Australia',
    region: 'Asia-Pacific',
    code: 'AU',
    flag: '🇦🇺',
    cvTerminology: 'Resume / CV',
    standardLength: '2 to 3 pages',
    paperSize: 'a4',
    photoRule: 'discouraged',
    photoNotice: 'Photos are generally discouraged in Australia to comply with the Fair Work Act anti-discrimination standards.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '02/2019 – Present',
    addressConvention: 'Suburb, State, Postcode (e.g., Fitzroy, VIC 3065)',
    phonePrefix: '+61',
    spellingVariant: 'Australian English',
    personalDataRules: {
      dobAllowed: false,
      nationalityAllowed: false,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Australian Work Rights (e.g. Australian Citizen / PR / TSS 482 Visa)',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: 'Clear reverse-chronological format, detailed responsibilities and achievements, Australian visa status noted.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'certifications', 'references'],
    keyHiringNuances: [
      'Australian resumes are typically longer (2 to 3 pages) with rich context on company size and responsibilities',
      'Citizenship or working visa status should be stated right in the contact section',
      'Referees: 2 contactable professional references or "Available upon request"',
      'Use Australian English spelling conventions'
    ],
    sources: [
      { title: 'Resume Advice', institution: 'Workforce Australia (Australian Government)', notes: 'Official workforce guidelines' }
    ]
  },
  {
    id: 'nz',
    name: 'New Zealand',
    region: 'Asia-Pacific',
    code: 'NZ',
    flag: '🇳🇿',
    cvTerminology: 'CV',
    standardLength: '2 pages',
    paperSize: 'a4',
    photoRule: 'discouraged',
    photoNotice: 'Photographs are not recommended in New Zealand under Human Rights Commission guidelines to prevent unconscious bias.',
    dateConvention: 'DD/MM/YYYY or Month YYYY',
    dateFormatExample: 'March 2021 – Present',
    addressConvention: 'City, Region, Postal Code (e.g., Wellington 6011)',
    phonePrefix: '+64',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: false,
      nationalityAllowed: false,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'NZ Visa / Work Entitlement (e.g. NZ Citizen / Resident Visa / Accredited Employer Work Visa)',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: 'Clear layout, emphasis on teamwork, community contribution, and verified Kiwi references.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'volunteer', 'references'],
    keyHiringNuances: [
      'Keep tone down-to-earth and collaborative; avoid overly aggressive self-promotion',
      'State New Zealand work rights clearly',
      'Provide 2 contactable referees'
    ],
    sources: [
      { title: 'Creating a New Zealand Style CV', institution: 'Careers New Zealand', notes: 'Government advice on NZ CV norms' }
    ]
  },
  {
    id: 'de',
    name: 'Germany',
    nativeName: 'Deutschland',
    region: 'Europe',
    code: 'DE',
    flag: '🇩🇪',
    cvTerminology: 'Lebenslauf',
    standardLength: '1 to 2 pages (tabular format)',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional application photograph (Bewerbungsfoto) is traditional and widely expected in Germany, positioned in the top right corner. While legally not mandatory under the AGG (General Equal Treatment Act), recruiters still strongly prefer it.',
    dateConvention: 'MM/YYYY or DD.MM.YYYY',
    dateFormatExample: '04/2020 – Heute',
    addressConvention: 'Straße, Hausnr., PLZ Ort (e.g., Musterstr. 12, 10115 Berlin)',
    phonePrefix: '+49',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Geburtsdatum & Ort (Date & Place of Birth)',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Arbeitserlaubnis / EU Blue Card Status',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Strict chronological tabular order (Tabellarischer Lebenslauf) with exact date ranges, German or English CEFR language levels (A1-C2).',
    recommendedStructure: ['experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Tabellarischer Lebenslauf format: clean 2-column tabular alignment with dates on the left',
      'Include Date and Place of Birth, and German language level (e.g., C1 - Verhandlungssicher)',
      'German hiring packages often include references as an attachment (Arbeitszeugnisse)',
      'Traditional applications include City, Date, and handwritten/digital signature at bottom'
    ],
    sources: [
      { title: 'Bewerbungstipps: Der Lebenslauf', institution: 'Bundesagentur für Arbeit', notes: 'German Federal Employment Agency' }
    ]
  },
  {
    id: 'fr',
    name: 'France',
    region: 'Europe',
    code: 'FR',
    flag: '🇫🇷',
    cvTerminology: 'CV (Curriculum Vitae)',
    standardLength: 'Strictly 1 page for junior/mid, 2 pages for senior/exec',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A clean professional photo is standard on French CVs. While French labor code forbids discrimination, recruiters still customary expect a professional portrait.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '01/2021 – Présent',
    addressConvention: 'Code Postal, Ville (e.g., 75008 Paris)',
    phonePrefix: '+33',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Âge ou Date de Naissance (Optional)',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Titre de Séjour / Autorisation de travail en France',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: '1-page density, clear sections: Formation, Expérience Professionnelle, Compétences, Langues.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      '1 page is golden in France for under 10 years of experience',
      'Driving license (Permis B) and mobility range are frequently noted',
      'Languages must be explicit with CEFR or fluency scale (Courant, Bilingue, Notions)',
      'Leitmotif or objective title directly under your name'
    ],
    sources: [
      { title: 'Rédiger un CV percutant', institution: 'France Travail (Pôle Emploi)', notes: 'National French employment agency' }
    ]
  },
  {
    id: 'nl',
    name: 'Netherlands',
    region: 'Europe',
    code: 'NL',
    flag: '🇳🇱',
    cvTerminology: 'Nederlands CV',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photos are optional and common. Dutch employers appreciate clean, modern styling without exaggerated claims.',
    dateConvention: 'MM/YYYY or DD-MM-YYYY',
    dateFormatExample: '09/2021 – heden',
    addressConvention: 'Postcode, Plaats (e.g., 1012 AB Amsterdam)',
    phonePrefix: '+31',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Geboortedatum (Date of birth)',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Verblijfsstatus / BSN / Right to Work',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Concise, direct, chronological layout. Dutch work culture favors factual clarity over hyperbole.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Down-to-earth tone (nuchterheid): state concrete responsibilities rather than self-aggrandizing adjectives',
      'List hobbies/interests briefly as cultural fit is important in Dutch teams',
      'English resumes are widely accepted in multinational Dutch hubs'
    ],
    sources: [
      { title: 'CV maken en voorbeelden', institution: 'UWV (Uitvoeringsinstituut Werknemersverzekeringen)', notes: 'Dutch employee insurance agency' }
    ]
  },
  {
    id: 'ie',
    name: 'Ireland',
    region: 'Europe',
    code: 'IE',
    flag: '🇮🇪',
    cvTerminology: 'Curriculum Vitae (CV)',
    standardLength: '2 pages standard',
    paperSize: 'a4',
    photoRule: 'discouraged',
    photoNotice: 'Photos are discouraged in Ireland under the Employment Equality Acts 1998-2015 to prevent bias based on gender, race, or age.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '08/2021 – Present',
    addressConvention: 'Town, County, Eircode (e.g., Dublin 2, D02 X285)',
    phonePrefix: '+353',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: false,
      nationalityAllowed: false,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Stamp 4 / EU Citizen / Critical Skills Visa Eligibility',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: '2-page clean format, personal statement, educational qualifications with Irish NFQ level equivalents.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'certifications', 'references'],
    keyHiringNuances: [
      '2 pages standard format',
      'Tech hub of Europe: strong emphasis on technical frameworks, cloud credentials, and quantified impact',
      'Visa status (Critical Skills Employment Permit / Stamp 4) is important for non-EEA nationals'
    ],
    sources: [
      { title: 'Writing your CV', institution: 'Citizens Information Board Ireland', notes: 'Statutory Irish public service advice' }
    ]
  },
  {
    id: 'it',
    name: 'Italy',
    region: 'Europe',
    code: 'IT',
    flag: '🇮🇹',
    cvTerminology: 'Curriculum Vitae (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional headshot is customary in Italy. Modern Italian resumes frequently include a photo alongside GDPR consent.',
    dateConvention: 'DD/MM/YYYY or MM/YYYY',
    dateFormatExample: '05/2020 – presente',
    addressConvention: 'Via/Piazza, CAP Città, Prov. (e.g., Via Roma 1, 20121 Milano MI)',
    phonePrefix: '+39',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Data e Luogo di Nascita',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Permesso di soggiorno / Cittadinanza UE',
      requiresGDPRClause: true,
      gdprClauseText: 'Autorizzo il trattamento dei miei dati personali ai sensi del D.Lgs. 196/2003 e del Regolamento UE 2016/679 (GDPR).',
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Ensure privacy consent clause is present at the end of the document, otherwise recruiters cannot process data under Italian law.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Include the legal privacy consent clause at the footer',
      'Photo is widely accepted and expected in private sector applications',
      'Europass format was historically common, but custom modern 1-2 page designs are now preferred by top employers'
    ],
    sources: [
      { title: 'Guida alla stesura del CV', institution: 'ANPAL (Agenzia Nazionale Politiche Attive Lavoro)', notes: 'Italian national employment authority' }
    ]
  },
  {
    id: 'es',
    name: 'Spain',
    region: 'Europe',
    code: 'ES',
    flag: '🇪🇸',
    cvTerminology: 'Currículum Vitae (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A formal photo (foto carnet) is standard on Spanish CVs, placed in the top header. Although blind CVs exist, 85%+ of Spanish employers still expect a photograph.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '06/2021 – Actualidad',
    addressConvention: 'Calle, Código Postal, Ciudad (e.g., 28001 Madrid)',
    phonePrefix: '+34',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Fecha de nacimiento',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Permiso de trabajo / DNI / NIE',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Reverse chronological order, CEFR language levels (e.g. Inglés C1), driver license B if relevant.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'A professional photo is standard practice',
      'Include DNI/NIE or state work authorization if applying from outside the EU',
      'Languages (Idiomas) are heavily scrutinized in Spanish corporate hiring'
    ],
    sources: [
      { title: 'Elaboración del Curriculum Vitae', institution: 'SEPE (Servicio Público de Empleo Estatal)', notes: 'Spanish State Public Employment Service' }
    ]
  },
  {
    id: 'pt',
    name: 'Portugal',
    region: 'Europe',
    code: 'PT',
    flag: '🇵🇹',
    cvTerminology: 'Currículo (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional portrait photo is standard practice in Portugal.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '07/2021 – Presente',
    addressConvention: 'Código Postal, Cidade (e.g., 1000-001 Lisboa)',
    phonePrefix: '+351',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Data de nascimento',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Título de Residência / Visto CPLP / Cidadania UE',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Clear layout, emphasis on international tech languages, Portuguese NIF/residence authorization for expats.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Photo is widely customary and expected',
      'Growing tech hub (Lisbon/Porto): English resumes are standard in IT/startups',
      'State residency status for foreign applicants (CPLP, Golden Visa, D8/D7, EU national)'
    ],
    sources: [
      { title: 'Dicas para elaboração de CV', institution: 'IEFP (Instituto do Emprego e Formação Profissional)', notes: 'Portuguese Institute for Employment' }
    ]
  },
  {
    id: 'pl',
    name: 'Poland',
    region: 'Europe',
    code: 'PL',
    flag: '🇵🇱',
    cvTerminology: 'Curriculum Vitae (CV z Klauzulą RODO)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional photograph is standard and expected in Poland. Furthermore, Polish law strictly mandates a GDPR (RODO) consent clause at the bottom.',
    dateConvention: 'MM.YYYY or MM/YYYY',
    dateFormatExample: '09.2021 – obecnie',
    addressConvention: 'Kod pocztowy, Miejscowość (e.g., 00-001 Warszawa)',
    phonePrefix: '+48',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Data urodzenia',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Pozwolenie na pracę / Karta Pobytu / Obywatelstwo UE',
      requiresGDPRClause: true,
      gdprClauseText: 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji (zgodnie z ustawą z dnia 10 maja 2018 roku o ochronie danych osobowych (Dz. Ustaw z 2018, poz. 1000) oraz zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO)).',
      drivingLicenseCommon: true
    },
    atsRecommendations: 'MANDATORY: You must include the Polish GDPR/RODO clause in the footer; Polish recruiters are legally prohibited from reviewing CVs without this clause.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'RODO consent clause is a strict legal requirement in Poland',
      'Photo is standard practice',
      'Tech sector in Warsaw/Kraków/Wrocław accepts English CVs with Polish RODO clause'
    ],
    sources: [
      { title: 'Zasady ochrony danych w rekrutacji (RODO)', institution: 'UODO (Urząd Ochrony Danych Osobowych)', notes: 'Polish Data Protection Office' }
    ]
  },
  {
    id: 'se',
    name: 'Sweden',
    region: 'Europe',
    code: 'SE',
    flag: '🇸🇪',
    cvTerminology: 'CV (Curriculum Vitae)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photos are optional in Sweden. Many candidates include a casual-professional headshot, but hiring focuses purely on merit and cultural alignment.',
    dateConvention: 'YYYY-MM or MM/YYYY',
    dateFormatExample: '2021-06 – Nuvarande',
    addressConvention: 'Postnummer, Ort (e.g., 111 22 Stockholm)',
    phonePrefix: '+46',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Födelsedatum',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Uppehållstillstånd / Personnummer / EU Citizen',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Clear, modest, structured. Highlight collaborative achievements and teamwork rather than sole credit.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'references'],
    keyHiringNuances: [
      'Swedish work culture emphasizes flat hierarchies, consensus, and work-life balance',
      'References (Referenser) are checked thoroughly before extending offers',
      'English proficiency is virtually universal in Swedish business'
    ],
    sources: [
      { title: 'Tips för ett bra CV', institution: 'Arbetsförmedlingen (Swedish Public Employment Service)', notes: 'Official Swedish employment agency' }
    ]
  },
  {
    id: 'no',
    name: 'Norway',
    region: 'Europe',
    code: 'NO',
    flag: '🇳🇴',
    cvTerminology: 'CV',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photos are optional. A clean, modest headshot is acceptable but never required.',
    dateConvention: 'MM.YYYY or DD.MM.YYYY',
    dateFormatExample: '08.2021 – Nåværende',
    addressConvention: 'Postnummer, Poststed (e.g., 0150 Oslo)',
    phonePrefix: '+47',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Fødselsdato',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Oppholdstillatelse / D-nummer / EØS-borger',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Simple, factual, reverse chronological. References are standard at the bottom.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'references'],
    keyHiringNuances: [
      'Factual, unembellished tone',
      'Strong worker protections: mention references with phone numbers or available upon request',
      'High degree of English fluency expected'
    ],
    sources: [
      { title: 'Slik skriver du en god CV', institution: 'NAV (Arbeids- og velferdsetaten)', notes: 'Norwegian Labour and Welfare Administration' }
    ]
  },
  {
    id: 'dk',
    name: 'Denmark',
    region: 'Europe',
    code: 'DK',
    flag: '🇩🇰',
    cvTerminology: 'CV',
    standardLength: '2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional, warm photograph is common and widely expected on Danish CVs, often paired with personal interests.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '10/2021 – Nuværende',
    addressConvention: 'Postnr. By (e.g., 2100 København Ø)',
    phonePrefix: '+45',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Fødselsdato',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Arbejdstilladelse / CPR nummer / EU Citizen',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Highlight personal motivation, cultural fit, and spare-time activities (Fritid/interesser).',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'references'],
    keyHiringNuances: [
      'Danish employers place high value on team harmony and cultural fit',
      'A short "Fritid" (Leisure / Volunteer) section is standard',
      'Clean Scandinavian minimalist typography'
    ],
    sources: [
      { title: 'Guide til det gode CV', institution: 'Jobnet / Styrelsen for Arbejdsmarked og Rekruttering', notes: 'Danish Agency for Labour Market and Recruitment' }
    ]
  },
  {
    id: 'fi',
    name: 'Finland',
    region: 'Europe',
    code: 'FI',
    flag: '🇫🇮',
    cvTerminology: 'Ansioluettelo / CV',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photos are optional but increasingly common in Finnish applications. Keep it simple and natural.',
    dateConvention: 'DD.MM.YYYY or MM/YYYY',
    dateFormatExample: '05/2021 – Nykypäivä',
    addressConvention: 'Postinumero, Postitoimipaikka (e.g., 00100 Helsinki)',
    phonePrefix: '+358',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Syntymäaika',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Työlupa / Henkilötunnus / EU Citizen',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Honest, precise, tech-forward. Finns value modesty, directness, and verified skills.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'languages', 'certifications'],
    keyHiringNuances: [
      'High appreciation for exact technical descriptions without buzzword fluff',
      'Strong education system: detail university degrees and specialized thesis projects',
      'Language proficiencies must be clearly stated'
    ],
    sources: [
      { title: 'Vinkkejä CV:n tekoon', institution: 'Työmarkkinatori (TE-palvelut)', notes: 'Finnish Employment and Economic Development Services' }
    ]
  },
  {
    id: 'ch',
    name: 'Switzerland',
    region: 'Europe',
    code: 'CH',
    flag: '🇨🇭',
    cvTerminology: 'Lebenslauf / CV',
    standardLength: '2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A top-tier studio photograph is standard and expected in Switzerland. Candidates also must clearly specify their Swiss work permit status (Permit B, C, L, G or Swiss Citizen).',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '03/2021 – Present',
    addressConvention: 'PLZ Ort, Kanton (e.g., 8001 Zürich)',
    phonePrefix: '+41',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Date of Birth & Nationality',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Swiss Permit Status (e.g. Swiss Citizen / Permit C / Permit B / EU-EFTA)',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Chronological, precise, accompanied by certificates (Diplome und Zeugnisse).',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Swiss residency/permit status is the single most critical filter for international applicants',
      'Multilingual fluency (German, French, Italian, English) provides huge competitive edge',
      'Impeccable formatting with zero typos is expected'
    ],
    sources: [
      { title: 'Dossier de candidature et CV', institution: 'SECO (State Secretariat for Economic Affairs Switzerland)', notes: 'Swiss Federal Department of Economic Affairs' }
    ]
  },
  {
    id: 'at',
    name: 'Austria',
    region: 'Europe',
    code: 'AT',
    flag: '🇦🇹',
    cvTerminology: 'Lebenslauf',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional application photo (Bewerbungsfoto) is standard in Austria. Academic titles (e.g., Mag., DI, Dr., B.Sc.) are culturally important and should precede your name.',
    dateConvention: 'MM/YYYY or DD.MM.YYYY',
    dateFormatExample: '06.2020 – laufend',
    addressConvention: 'PLZ Ort (e.g., 1010 Wien)',
    phonePrefix: '+43',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Geburtsdatum & Geburtsort',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Rot-Weiß-Rot-Karte / EU-Bürger',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Tabular Lebenslauf, academic titles prominently displayed, reverse chronological.',
    recommendedStructure: ['experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Honorifics and academic titles are legally recognized and respected in Austria',
      'Photo is widely customary and expected',
      'Red-White-Red Card (Rot-Weiß-Rot-Karte) status should be highlighted for non-EU applicants'
    ],
    sources: [
      { title: 'Tipps für den perfekten Lebenslauf', institution: 'AMS (Arbeitsmarktservice Österreich)', notes: 'Austrian Public Employment Service' }
    ]
  },
  {
    id: 'be',
    name: 'Belgium',
    region: 'Europe',
    code: 'BE',
    flag: '🇧🇪',
    cvTerminology: 'CV (Curriculum Vitae)',
    standardLength: '2 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photos are optional and common. Due to Belgium’s trilingual constitution (Dutch, French, German), language proficiencies are scrutinized closely.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '04/2021 – Present',
    addressConvention: 'Code Postal / Postcode, Ville / Stad (e.g., 1000 Bruxelles / Brussel)',
    phonePrefix: '+32',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Date de naissance / Geboortedatum',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Single Permit / Permis Unique / EU Citizen',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Language grid using CEFR levels, international EU organization experience, driver license.',
    recommendedStructure: ['summary', 'experience', 'education', 'languages', 'skills', 'certifications'],
    keyHiringNuances: [
      'Trilingual market: indicate proficiency in Dutch, French, and English explicitly',
      'EU institutions presence makes international experience highly valued'
    ],
    sources: [
      { title: 'Le CV réussi', institution: 'Actiris & Forem', notes: 'Brussels & Walloon employment services' }
    ]
  },
  {
    id: 'lu',
    name: 'Luxembourg',
    region: 'Europe',
    code: 'LU',
    flag: '🇱🇺',
    cvTerminology: 'CV (Curriculum Vitae)',
    standardLength: '2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional portrait is standard in Luxembourg, reflecting European financial and legal traditions.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '05/2021 – Present',
    addressConvention: 'Code Postal, Ville (e.g., L-1150 Luxembourg)',
    phonePrefix: '+352',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Date de naissance',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Autorisation de séjour et de travail',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Multilingual CV, finance/legal terminology, cross-border commuter status if applicable.',
    recommendedStructure: ['summary', 'languages', 'experience', 'education', 'skills', 'certifications'],
    keyHiringNuances: [
      'Languages (French, German, English, Luxembourgish) are often placed near the top',
      'Leading European financial services and investment fund center'
    ],
    sources: [
      { title: 'Rédiger son CV pour le Luxembourg', institution: 'ADEM (Agence pour le développement de l’emploi)', notes: 'National Employment Agency of Luxembourg' }
    ]
  },
  {
    id: 'cz',
    name: 'Czechia',
    region: 'Europe',
    code: 'CZ',
    flag: '🇨🇿',
    cvTerminology: 'Životopis (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional photo is customary in Czechia, especially in sales, client-facing, and corporate roles.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '01/2021 – dosud',
    addressConvention: 'PSČ Město (e.g., 110 00 Praha 1)',
    phonePrefix: '+420',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Datum narození',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Zaměstnanecká karta / Občan EU',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Clear reverse chronological structure, driving license category, language levels.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Photo is standard practice',
      'Prague and Brno are major European tech & shared services hubs where English CVs are standard',
      'Driving license (Řidičský průkaz sk. B) commonly requested'
    ],
    sources: [
      { title: 'Jak napsat životopis', institution: 'Úřad práce ČR', notes: 'Czech Labour Office' }
    ]
  },
  {
    id: 'sk',
    name: 'Slovakia',
    region: 'Europe',
    code: 'SK',
    flag: '🇸🇰',
    cvTerminology: 'Životopis (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional photo is customary and welcomed on Slovak CVs.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '03/2021 – súčasnosť',
    addressConvention: 'PSČ Mesto (e.g., 811 01 Bratislava)',
    phonePrefix: '+421',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Dátum narodenia',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Prechodný pobyt na účel zamestnania / Občan EÚ',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Structured, chronological, highlighting language competencies and automotive/industrial or IT skills.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Photo is standard practice',
      'Bratislava SSC/IT sector hires extensively in English'
    ],
    sources: [
      { title: 'Tvorba životopisu', institution: 'Ústredie práce, sociálnych vecí a rodiny (ÚPSVaR)', notes: 'Slovak Central Office of Labour' }
    ]
  },
  {
    id: 'hu',
    name: 'Hungary',
    region: 'Europe',
    code: 'HU',
    flag: '🇭🇺',
    cvTerminology: 'Önéletrajz (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional portrait photo is standard practice in Hungary.',
    dateConvention: 'YYYY.MM or MM/YYYY',
    dateFormatExample: '2021.05 – Jelenleg',
    addressConvention: 'Irányítószám, Település (e.g., 1051 Budapest)',
    phonePrefix: '+36',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Születési idő',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Munkavállalási engedély / EU Állampolgár',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Reverse chronological, certified language exam certificates (e.g. Középfok B2, Felsőfok C1).',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'In Hungarian language documents, family name precedes given name, but in English CVs use standard First Last format',
      'State language exam grades (Nyelvvizsga)'
    ],
    sources: [
      { title: 'Önéletrajz készítési útmutató', institution: 'Nemzeti Foglalkoztatási Szolgálat (NFSZ)', notes: 'Hungarian National Employment Service' }
    ]
  },
  {
    id: 'ro',
    name: 'Romania',
    region: 'Europe',
    code: 'RO',
    flag: '🇷🇴',
    cvTerminology: 'Curriculum Vitae (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional photograph is customary and expected on Romanian resumes.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '02/2021 – Prezent',
    addressConvention: 'Cod Poștal, Oraș (e.g., 010011 București)',
    phonePrefix: '+40',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Data nașterii',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Permis de ședere în scop de muncă / Cetățean UE',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Clear technical breakdown, foreign language proficiencies, driving license.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Huge IT and outsourcing sector: English CVs are mandatory for multinationals in Bucharest, Cluj, and Iași',
      'Photo is widely customary'
    ],
    sources: [
      { title: 'Ghid întocmire CV', institution: 'ANOFM (Agenția Națională pentru Ocuparea Forței de Muncă)', notes: 'Romanian National Employment Agency' }
    ]
  },
  {
    id: 'bg',
    name: 'Bulgaria',
    region: 'Europe',
    code: 'BG',
    flag: '🇧🇬',
    cvTerminology: 'Автобиография (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A formal photo is standard practice in Bulgarian job applications.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '07/2021 – Настояще',
    addressConvention: 'Пощенски код, Град (e.g., 1000 София)',
    phonePrefix: '+359',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Дата на раждане',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Разрешение за работа / Гражданин на ЕС',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Clear reverse chronological format, technical skills list, foreign languages.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Sofia is a top IT and BPO hub; English language resumes are standard in these sectors',
      'Photo is standard practice'
    ],
    sources: [
      { title: 'Как да подготвим CV', institution: 'Агенция по заетостта', notes: 'Bulgarian Employment Agency' }
    ]
  },
  {
    id: 'gr',
    name: 'Greece',
    region: 'Europe',
    code: 'GR',
    flag: '🇬🇷',
    cvTerminology: 'Βιογραφικό Σημείωμα (CV)',
    standardLength: '2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional photograph is customary and expected on Greek CVs.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '04/2021 – Σήμερα',
    addressConvention: 'Τ.Κ., Πόλη (e.g., 104 31 Αθήνα)',
    phonePrefix: '+30',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Ημερομηνία Γέννησης',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Άδεια διαμονής για εργασία / Πολίτης ΕΕ',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Clean 2-page layout. For male candidates, military service status (Fulfilled / Exempt) is culturally standard to state.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Military service obligation status is standard for male Greek citizens',
      'English proficiency (e.g., Proficiency Michigan / Cambridge) is heavily emphasized',
      'Photo is customary'
    ],
    sources: [
      { title: 'Σύνταξη Βιογραφικού Σημειώματος', institution: 'ΔΥΠΑ (Public Employment Service Greece)', notes: 'Greek Public Employment Service' }
    ]
  },
  {
    id: 'hr',
    name: 'Croatia',
    region: 'Europe',
    code: 'HR',
    flag: '🇭🇷',
    cvTerminology: 'Životopis (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional portrait photo is standard practice in Croatia.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '06/2021 – danas',
    addressConvention: 'Poštanski broj, Grad (e.g., 10000 Zagreb)',
    phonePrefix: '+385',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Datum rođenja',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Radna dozvola / EU državljanin',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Reverse chronological order, language competencies, driver license.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Photo is standard practice',
      'IT and tourism sectors accept English applications broadly'
    ],
    sources: [
      { title: 'Pisanje životopisa', institution: 'HZZ (Hrvatski zavod za zapošljavanje)', notes: 'Croatian Employment Service' }
    ]
  },
  {
    id: 'si',
    name: 'Slovenia',
    region: 'Europe',
    code: 'SI',
    flag: '🇸🇮',
    cvTerminology: 'Življenjepis (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional photo is standard practice on Slovenian resumes.',
    dateConvention: 'DD.MM.YYYY or MM/YYYY',
    dateFormatExample: '05/2021 – sedanjost',
    addressConvention: 'Poštna št., Kraj (e.g., 1000 Ljubljana)',
    phonePrefix: '+386',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Rojstni datum',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Enotno dovoljenje za prebivanje in delo / Državljan EU',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Structured tabular or modern format, driving license, foreign languages.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Photo is standard practice',
      'High multilingual capability (Slovenian, English, German, Italian)'
    ],
    sources: [
      { title: 'Kako napisati življenjepis', institution: 'ZRSZ (Zavod Republike Slovenije za zaposlovanje)', notes: 'Employment Service of Slovenia' }
    ]
  },
  {
    id: 'ee',
    name: 'Estonia',
    region: 'Europe',
    code: 'EE',
    flag: '🇪🇪',
    cvTerminology: 'CV / Elulookirjeldus',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photos are optional. Estonia is a digital-first economy; clean modern tech formatting is favored over formal headshots.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '08/2021 – Praegune',
    addressConvention: 'Postiindeks, Linn (e.g., 10115 Tallinn)',
    phonePrefix: '+372',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Sünniaeg',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Töötamise registreerimine / e-Residency / EU Citizen',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: 'Clean, modern, link to GitHub/portfolio, concise bullet points.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'projects', 'languages'],
    keyHiringNuances: [
      'Startup-driven culture with high digital literacy',
      'English is the working language in virtually all tech companies and unicorns',
      'Keep it direct and metrics-oriented'
    ],
    sources: [
      { title: 'Kandideerimisdokumendid', institution: 'Töötukassa (Estonian Unemployment Insurance Fund)', notes: 'Estonian Employment Fund' }
    ]
  },
  {
    id: 'lv',
    name: 'Latvia',
    region: 'Europe',
    code: 'LV',
    flag: '🇱🇻',
    cvTerminology: 'CV (Dzīvesgājums)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'A professional photograph is optional and commonly included.',
    dateConvention: 'DD.MM.YYYY or MM/YYYY',
    dateFormatExample: '09/2021 – Pašlaik',
    addressConvention: 'LV-XXXX, Pilsēta (e.g., LV-1050 Rīga)',
    phonePrefix: '+371',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Dzimšanas datums',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Uzturēšanās atļauja ar tiesībām strādāt / ES pilsonis',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Reverse chronological order, language skills (Latvian, English), driving license.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Riga tech and fintech hub uses English predominantly',
      'Photo is optional but common'
    ],
    sources: [
      { title: 'CV paraugi un ieteikumi', institution: 'NVA (Nodarbinātības valsts aģentūra)', notes: 'State Employment Agency of Latvia' }
    ]
  },
  {
    id: 'lt',
    name: 'Lithuania',
    region: 'Europe',
    code: 'LT',
    flag: '🇱🇹',
    cvTerminology: 'CV (Gyvenimo aprašymas)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photos are optional and common. Modern IT companies focus on GitHub/portfolio links.',
    dateConvention: 'YYYY-MM or MM/YYYY',
    dateFormatExample: '2021-06 – Dabar',
    addressConvention: 'LT-XXXXX, Miestas (e.g., LT-01103 Vilnius)',
    phonePrefix: '+370',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Gimimo data',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Leidimas gyventi su teise dirbti / ES pilietis',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Modern concise formatting, technical proficiencies, fintech knowledge where applicable.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'languages', 'certifications'],
    keyHiringNuances: [
      'Major European fintech capital: emphasize regulatory compliance and cloud architecture skills',
      'English is common for multinational teams in Vilnius and Kaunas'
    ],
    sources: [
      { title: 'CV rengimas', institution: 'Užimtumo tarnyba', notes: 'Lithuanian Employment Services' }
    ]
  },
  {
    id: 'is',
    name: 'Iceland',
    region: 'Europe',
    code: 'IS',
    flag: '🇮🇸',
    cvTerminology: 'Ferilskrá (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photos are optional on Icelandic CVs. Professional references and informal networking are paramount.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '04/2021 – Núverandi',
    addressConvention: 'Póstnúmer, Staður (e.g., 101 Reykjavík)',
    phonePrefix: '+354',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Kennitala / Fæðingardagur',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Atvinnuleyfi / Kennitala / EEA Citizen',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: 'Clear, humble, factual. List 2 professional references with telephone numbers.',
    recommendedStructure: ['summary', 'experience', 'education', 'skills', 'languages', 'references'],
    keyHiringNuances: [
      'Extremely flat organizational hierarchies',
      'References are checked thoroughly in Iceland’s tight-knit market',
      'State personal ID (Kennitala) or visa eligibility for foreigners'
    ],
    sources: [
      { title: 'Gerð ferilskrár', institution: 'Vinnumálastofnun (Directorate of Labour Iceland)', notes: 'Icelandic Directorate of Labour' }
    ]
  },
  {
    id: 'jp',
    name: 'Japan',
    region: 'Asia-Pacific',
    code: 'JP',
    flag: '🇯🇵',
    cvTerminology: 'Resume (Rirekisho / Shokumu-keirekisho)',
    standardLength: '2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A formal studio photograph in dark business attire (suit and tie/blouse) is standard practice and expected in traditional Japanese hiring. In international tech firms in Tokyo, western-style CVs are common.',
    dateConvention: 'YYYY/MM or YYYY年MM月',
    dateFormatExample: '2021/04 – 現在',
    addressConvention: 'Postal Code, Prefecture, City, Ward (e.g., 〒100-0001 Tokyo, Chiyoda-ku)',
    phonePrefix: '+81',
    spellingVariant: 'US English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: '生年月日 (Date of Birth)',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: '在留資格 / 就労ビザ (Visa status e.g. Engineer/Specialist in Humanities, Permanent Resident)',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: 'Chronological timeline without gaps, JLPT score (N1/N2), TOEIC score for English ability.',
    recommendedStructure: ['experience', 'education', 'skills', 'languages', 'certifications'],
    keyHiringNuances: [
      'Two traditional documents: Rirekisho (profile/chronology) and Shokumu-keirekisho (detailed career achievements)',
      'Explain any career gaps respectfully and clearly',
      'Include JLPT Japanese level and TOEIC scores if applicable',
      'Foreign candidates must state their Japanese visa status'
    ],
    sources: [
      { title: '履歴書・職務経歴書の書き方', institution: 'Hello Work (Ministry of Health, Labour and Welfare Japan)', notes: 'Official Japanese public employment agency' }
    ]
  },
  {
    id: 'sg',
    name: 'Singapore',
    region: 'Asia-Pacific',
    code: 'SG',
    flag: '🇸🇬',
    cvTerminology: 'Resume / CV',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photos are optional. Under TAFEP (Tripartite Alliance for Fair & Progressive Employment Practices) guidelines, hiring should be based on merit rather than age, race, or gender.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '05/2021 – Present',
    addressConvention: 'Singapore + Postal code (e.g., Singapore 049318)',
    phonePrefix: '+65',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: false,
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Residential Status (e.g. Singapore Citizen / PR / EP / S-Pass Required)',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: 'Quantifiable achievements, international exposure across ASEAN, explicit work pass status.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'certifications'],
    keyHiringNuances: [
      'MOM (Ministry of Manpower) regulations require reporting hiring fairness: state work pass eligibility',
      'Highlight regional leadership and APAC market experience',
      'Do not include full NRIC/FIN number (privacy protection)'
    ],
    sources: [
      { title: 'Fair Employment Guidelines', institution: 'TAFEP & Ministry of Manpower (MOM)', notes: 'Singapore Government Fair Consideration Framework' }
    ]
  },
  {
    id: 'ae',
    name: 'United Arab Emirates',
    region: 'Middle East',
    code: 'AE',
    flag: '🇦🇪',
    cvTerminology: 'Curriculum Vitae (CV)',
    standardLength: '2 to 3 pages',
    paperSize: 'a4',
    photoRule: 'recommended',
    photoNotice: 'A professional photograph is standard and recommended in the UAE. Employers and recruiters in Dubai and Abu Dhabi routinely screen candidates with headshots, nationality, and visa status.',
    dateConvention: 'DD/MM/YYYY or MM/YYYY',
    dateFormatExample: '01/2021 – Present',
    addressConvention: 'City, Emirate, UAE (e.g., Dubai Marina, Dubai, UAE)',
    phonePrefix: '+971',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Date of Birth (Commonly requested)',
      nationalityAllowed: true,
      maritalStatusAllowed: true,
      workAuthStatusRecommended: true,
      workAuthLabel: 'UAE Visa Status (e.g. Golden Visa / Employment Visa / Visit Visa / Dependents)',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: '2-3 pages, comprehensive role descriptions, GCC driving license, notice period and current UAE location.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'languages', 'certifications'],
    keyHiringNuances: [
      'UAE hiring is fast-paced: state your Notice Period (e.g. Immediately Available / 30 Days) prominently',
      'Mention UAE Driving License if held',
      'Golden Visa holders receive significant hiring priority'
    ],
    sources: [
      { title: 'Working in the UAE Guide', institution: 'MOHRE (Ministry of Human Resources and Emiratisation)', notes: 'UAE Ministry of Labour' }
    ]
  },
  {
    id: 'sa',
    name: 'Saudi Arabia',
    region: 'Middle East',
    code: 'SA',
    flag: '🇸🇦',
    cvTerminology: 'Curriculum Vitae (CV)',
    standardLength: '2 to 3 pages',
    paperSize: 'a4',
    photoRule: 'recommended',
    photoNotice: 'A professional photograph in business attire is customary in Saudi Arabia. Including Iqama/residence status and nationality is standard practice.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '03/2021 – Present',
    addressConvention: 'District, City, KSA (e.g., Al Olaya, Riyadh, Saudi Arabia)',
    phonePrefix: '+966',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Date of Birth',
      nationalityAllowed: true,
      maritalStatusAllowed: true,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Iqama Status (e.g. Saudi National / Transferable Iqama / Need Visa)',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Comprehensive career history, major project scales ($ budgets), transferable Iqama status, notice period.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'certifications', 'languages'],
    keyHiringNuances: [
      'Transferable Iqama is a critical hiring filter for expatriate candidates already in KSA',
      'Vision 2030 megaproject experience (e.g. NEOM, Red Sea, Diriyah) is highly prized',
      'State Arabic and English language proficiency'
    ],
    sources: [
      { title: 'Labor Guidelines', institution: 'Ministry of Human Resources and Social Development (HRSD)', notes: 'Kingdom of Saudi Arabia Labour Regulations' }
    ]
  },
  {
    id: 'qa',
    name: 'Qatar',
    region: 'Middle East',
    code: 'QA',
    flag: '🇶🇦',
    cvTerminology: 'Curriculum Vitae (CV)',
    standardLength: '2 to 3 pages',
    paperSize: 'a4',
    photoRule: 'recommended',
    photoNotice: 'A professional headshot is standard and expected in Qatar corporate hiring.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '02/2021 – Present',
    addressConvention: 'Area, Doha, Qatar (e.g., West Bay, Doha, Qatar)',
    phonePrefix: '+974',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Date of Birth',
      nationalityAllowed: true,
      maritalStatusAllowed: true,
      workAuthStatusRecommended: true,
      workAuthLabel: 'QID / NOC Status (e.g. QID with transferable NOC / Outside Qatar)',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: '2-3 pages, detailed project scope, Qatar ID and transferable NOC (No Objection Certificate) clearly stated.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'certifications', 'languages'],
    keyHiringNuances: [
      'State NOC (No Objection Certificate) availability upfront if transferring jobs in Qatar',
      'Detail engineering/governmental clearances and certifications (e.g. UPDA / MMUP)'
    ],
    sources: [
      { title: 'Employment Regulations', institution: 'Ministry of Labour Qatar', notes: 'State of Qatar Labour Law' }
    ]
  },
  {
    id: 'za',
    name: 'South Africa',
    region: 'Africa',
    code: 'ZA',
    flag: '🇿🇦',
    cvTerminology: 'Curriculum Vitae (CV)',
    standardLength: '2 to 3 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photos are optional and common. Resumes are typically detailed and include driver license and notice period.',
    dateConvention: 'DD/MM/YYYY or MM/YYYY',
    dateFormatExample: '06/2021 – Present',
    addressConvention: 'Suburb, City, Postal Code (e.g., Sandton, Johannesburg, 2196)',
    phonePrefix: '+27',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'ID Number / Date of Birth',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Work Permit Status (e.g. SA Citizen / Permanent Resident / Critical Skills Visa)',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: '2-3 pages, valid driver license (Code 08/EB), South African ID or Critical Skills work visa, contactable references.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'certifications', 'references'],
    keyHiringNuances: [
      'Valid Driver’s License (Code B/08) is mandatory for many corporate positions due to public transit limitations',
      'Notice period and current city should be prominent',
      'Provide at least two verifiable references with direct phone numbers'
    ],
    sources: [
      { title: 'CV Drafting Standards', institution: 'Department of Employment and Labour (South Africa)', notes: 'Republic of South Africa Labour Guidelines' }
    ]
  },
  {
    id: 'in',
    name: 'India',
    region: 'Asia-Pacific',
    code: 'IN',
    flag: '🇮🇳',
    cvTerminology: 'Resume / Curriculum Vitae',
    standardLength: '2 to 3 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photographs are optional and common. In IT and tech services, clean modern resumes without photos are standard, while executive and client-facing roles frequently use photos.',
    dateConvention: 'MM/YYYY or Month Year',
    dateFormatExample: 'June 2021 – Present',
    addressConvention: 'Area, City, State, PIN (e.g., Koramangala, Bengaluru, Karnataka 560034)',
    phonePrefix: '+91',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Date of Birth (Optional)',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Passport / Visa Status (e.g. Indian Citizen / Valid US B1/B2 or H1B)',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: '2-page clean format, detailed list of frameworks and technologies, Notice Period (e.g., 30 Days / 90 Days / Immediate) and current location.',
    recommendedStructure: ['summary', 'skills', 'experience', 'projects', 'education', 'certifications'],
    keyHiringNuances: [
      'Notice Period is a crucial factor in Indian hiring (standard is 30 to 90 days; immediate joiners get priority)',
      'Tech candidates should detail project architecture, team size, and tools used',
      'Passport validity is useful to mention for offshore / onsite deployment eligibility'
    ],
    sources: [
      { title: 'National Career Service Portal', institution: 'Ministry of Labour and Employment (Government of India)', notes: 'Indian Government employment guidelines' }
    ]
  },
  {
    id: 'pk',
    name: 'Pakistan',
    region: 'Asia-Pacific',
    code: 'PK',
    flag: '🇵🇰',
    cvTerminology: 'Curriculum Vitae (CV) / Resume',
    standardLength: '2 pages standard',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photos are common and accepted in local corporate sectors, while multinational companies and tech firms in Karachi, Lahore, and Islamabad prefer clean, no-photo ATS-friendly resumes.',
    dateConvention: 'DD/MM/YYYY or Month Year',
    dateFormatExample: '15/06/2021 – Present',
    addressConvention: 'Area/Sector, City, Province (e.g., Gulberg III, Lahore, Punjab)',
    phonePrefix: '+92',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Date of Birth (Optional)',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Work Authorization / CNIC Verified',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: '2-page reverse-chronological layout with dedicated technical competencies, academic degrees (with university name and graduation year), and quantified professional outcomes.',
    recommendedStructure: ['summary', 'skills', 'experience', 'projects', 'education', 'certifications'],
    keyHiringNuances: [
      'Two-page standard is preferred by mid-size and enterprise Pakistani employers',
      'Mention notice period availability (e.g. immediate joiner, 30 days) to expedite recruiter outreach',
      'For software and digital roles, link GitHub, LinkedIn, and live project demos',
      'Keep CNIC number private until formal job offer stage'
    ],
    sources: [
      { title: 'Pakistan National Job Portal (NJP)', institution: 'Ministry of Federal Education and Professional Training', notes: 'National employment conventions' }
    ]
  },
  {
    id: 'bd',
    name: 'Bangladesh',
    region: 'Asia-Pacific',
    code: 'BD',
    flag: '🇧🇩',
    cvTerminology: 'Curriculum Vitae (CV)',
    standardLength: '2 pages standard',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional passport-size photograph with a clean white or light blue background is customary on Bangladeshi CVs, especially in corporate, banking, and government organizations.',
    dateConvention: 'DD/MM/YYYY',
    dateFormatExample: '01/08/2020 – Present',
    addressConvention: 'Area/Road, City, Postal Code (e.g., Dhanmondi, Dhaka 1205)',
    phonePrefix: '+880',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Date of Birth',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Bangladeshi National / Work Permit',
      requiresGDPRClause: false,
      drivingLicenseCommon: false
    },
    atsRecommendations: 'Organized sections with reverse chronological work history, clear educational details (HSC/SSC and Bachelor degree GPA/CGPA), and corporate training credentials.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'projects', 'certifications', 'references'],
    keyHiringNuances: [
      'Educational qualifications (degree, university, passing year, CGPA) carry substantial weight in Bangladeshi recruitment',
      'Two professional references with workplace designations and official contact numbers are typically expected',
      'Banking and corporate conglomerates place high emphasis on formal presentation and verified milestones'
    ],
    sources: [
      { title: 'Bureau of Manpower, Employment and Training (BMET)', institution: 'Government of the People\'s Republic of Bangladesh', notes: 'National manpower guidelines' }
    ]
  },
  {
    id: 'br',
    name: 'Brazil',
    nativeName: 'Brasil',
    region: 'Latin America',
    code: 'BR',
    flag: '🇧🇷',
    cvTerminology: 'Currículo (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'discouraged',
    photoNotice: 'Photos are discouraged on corporate currículos under Brazilian fair-hiring practices and LGPD (Lei Geral de Proteção de Dados), unless specifically mandated for broadcast or modeling roles.',
    dateConvention: 'MM/YYYY',
    dateFormatExample: '03/2021 – Presente',
    addressConvention: 'Bairro, Cidade - Estado, CEP (e.g., Pinheiros, São Paulo - SP, 05422-000)',
    phonePrefix: '+55',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: false,
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Autorização de Trabalho (Brasileiro / Visto de Trabalho / RNE)',
      requiresGDPRClause: true,
      gdprClauseText: 'Autorizo o tratamento dos meus dados pessoais para fins de recrutamento conforme a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).',
      drivingLicenseCommon: false
    },
    atsRecommendations: 'Clean single-column layout, clear objective (Objetivo Profissional), Portuguese and English language proficiencies, and measurable achievements.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'languages', 'certifications'],
    keyHiringNuances: [
      'State your professional objective (Objetivo) concisely right under personal details',
      'Do not include sensitive personal documents like CPF or RG numbers on initial CV submissions',
      'Differentiate between academic Currículo Lattes (used for university research) and professional Currículo Vitae (corporate hiring)',
      'Highlight English proficiency level (Básico, Intermediário, Avançado, Fluente) as bilingual skills offer high compensation advantages in Brazil'
    ],
    sources: [
      { title: 'Guia do Trabalhador e Emprego', institution: 'Ministério do Trabalho e Emprego (Brasil)', notes: 'Normas gerais de empregabilidade' }
    ]
  },
  {
    id: 'tr',
    name: 'Turkey',
    nativeName: 'Türkiye',
    region: 'Europe',
    code: 'TR',
    flag: '🇹🇷',
    cvTerminology: 'Özgeçmiş (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional headshot is customary on Turkish özgeçmiş documents. Applications through corporate portals (such as Kariyer.net) and direct HR submissions standardly feature a professional photo.',
    dateConvention: 'DD.MM.YYYY or MM/YYYY',
    dateFormatExample: '15.09.2021 – Halen',
    addressConvention: 'İlçe, İl (e.g., Kadıköy, İstanbul)',
    phonePrefix: '+90',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Doğum Tarihi',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Çalışma İzni / T.C. Vatandaşı / Askerlik Durumu',
      requiresGDPRClause: true,
      gdprClauseText: '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında özgeçmişimde yer alan bilgilerimin iş başvurusu sürecinde işlenmesine rıza gösteriyorum.',
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Clear reverse-chronological order, dedicated languages and computer competencies section, and military service status (Askerlik durumu) for male candidates.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'languages', 'certifications'],
    keyHiringNuances: [
      'Military service status (Yapıldı / Muaf / Tecilli) is standardly requested by Turkish corporate employers for male candidates',
      'Foreign language proficiencies (especially English, German, or Russian) evaluated via YDS/TOEFL scores are highly prized',
      'A KVKK data processing consent clause should be included at the bottom of the CV'
    ],
    sources: [
      { title: 'Türkiye İş Kurumu (İŞKUR) Kariyer Rehberi', institution: 'Çalışma ve Sosyal Güvenlik Bakanlığı', notes: 'Ulusal istihdam standartları' }
    ]
  },
  {
    id: 'my',
    name: 'Malaysia',
    region: 'Asia-Pacific',
    code: 'MY',
    flag: '🇲🇾',
    cvTerminology: 'Resume / Curriculum Vitae',
    standardLength: '2 pages',
    paperSize: 'a4',
    photoRule: 'optional',
    photoNotice: 'Photographs are common in local small-to-medium businesses, whereas international Shared Services Centres (SSCs) and tech multinationals in Greater Kuala Lumpur and Cyberjaya adhere to no-photo ATS standards.',
    dateConvention: 'DD/MM/YYYY or Month Year',
    dateFormatExample: 'July 2021 – Present',
    addressConvention: 'Area, Postcode City, State (e.g., Bangsar, 59100 Kuala Lumpur, Wilayah Persekutuan)',
    phonePrefix: '+60',
    spellingVariant: 'UK English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Date of Birth (Optional)',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Work Authorization (Malaysian Citizen / Employment Pass / PR)',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: '2-page clean format, detailed multilingual fluency (English, Bahasa Malaysia, Mandarin/Tamil), and notice period expectations.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'languages', 'certifications'],
    keyHiringNuances: [
      'State multilingual abilities explicitly (e.g., Fluent in English and Bahasa Malaysia; conversational Mandarin)',
      'State your availability / notice period (e.g. 1 month notice / immediate) and expected salary range where customary',
      'Keep national registration identity card (NRIC) numbers masked until formal interview verification'
    ],
    sources: [
      { title: 'MYFutureJobs National Employment Portal', institution: 'Social Security Organisation (PERKESO), Malaysia', notes: 'National employment guidelines' }
    ]
  },
  {
    id: 'id',
    name: 'Indonesia',
    region: 'Asia-Pacific',
    code: 'ID',
    flag: '🇮🇩',
    cvTerminology: 'Curriculum Vitae (CV)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A formal studio photograph (pas foto) in formal business attire is customary in Indonesian corporate, state-owned enterprise (BUMN), and banking recruitment.',
    dateConvention: 'DD/MM/YYYY',
    dateFormatExample: '01/04/2021 – Sekarang',
    addressConvention: 'Kecamatan, Kota, Provinsi, Kode Pos (e.g., Tebet, Jakarta Selatan, DKI Jakarta 12810)',
    phonePrefix: '+62',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Tanggal Lahir',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'WNI (Warga Negara Indonesia) / KITAS / Izin Kerja',
      requiresGDPRClause: false,
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Chronological work experience, clear division between educational credentials (IPK / GPA if above 3.0), professional skills, and organizational / committee involvement.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'organizational', 'certifications'],
    keyHiringNuances: [
      'Bilingual CVs (in English or Bahasa Indonesia) are common; tech startups and foreign investment firms prefer English',
      'Grade Point Average (IPK) is frequently stated for candidates with less than 5 years experience',
      'Organizational leadership experience (Kepengurusan / volunteer projects) is highly respected in early-career vetting'
    ],
    sources: [
      { title: 'Sistem Informasi Ketenagakerjaan (SIAPkerja)', institution: 'Kementerian Ketenagakerjaan Republik Indonesia', notes: 'Pedoman penyusunan CV tenaga kerja' }
    ]
  },
  {
    id: 'ru',
    name: 'Russia',
    nativeName: 'Россия',
    region: 'Europe',
    code: 'RU',
    flag: '🇷🇺',
    cvTerminology: 'Резюме (Resume)',
    standardLength: '1 to 2 pages',
    paperSize: 'a4',
    photoRule: 'standard',
    photoNotice: 'A professional business portrait is standard and highly expected on Russian резюме, aligning with formats on major employment portals like HeadHunter (hh.ru) and SuperJob.',
    dateConvention: 'MM.YYYY or Month Year',
    dateFormatExample: '05.2021 – Настоящее время',
    addressConvention: 'Город, Метро / Район (e.g., Москва, м. Белорусская)',
    phonePrefix: '+7',
    spellingVariant: 'Local / International English',
    personalDataRules: {
      dobAllowed: true,
      dobLabel: 'Дата рождения',
      nationalityAllowed: true,
      maritalStatusAllowed: false,
      workAuthStatusRecommended: true,
      workAuthLabel: 'Гражданство РФ / Разрешение на работу',
      requiresGDPRClause: true,
      gdprClauseText: 'В соответствии с Федеральным законом № 152-ФЗ «О персональных данных» даю согласие на обработку моих персональных данных.',
      drivingLicenseCommon: true
    },
    atsRecommendations: 'Reverse chronological employment history with concrete responsibilities, quantified achievements (достижения), technology stacks, and language fluencies.',
    recommendedStructure: ['summary', 'skills', 'experience', 'education', 'languages', 'certifications'],
    keyHiringNuances: [
      'Structuring experience into distinct "Обязанности" (Duties) and "Достижения" (Achievements with metrics) is standard',
      'Nearest metro station in Moscow/Saint Petersburg is customarily stated for commute planning',
      'Foreign language proficiencies (English B1/B2/C1) and technical certifications are key differentiators'
    ],
    sources: [
      { title: 'Портал «Работа в России»', institution: 'Федеральная служба по труду и занятости (Роструд)', notes: 'Официальные стандарты резюме и трудоустройства' }
    ]
  }
];

// Helper functions for country lookup & filtering
export function getCountryById(id: string): CountryConfig {
  const found = COUNTRIES.find(c => c.id.toLowerCase() === id.toLowerCase());
  return found || COUNTRIES[0]; // fallback to US
}

export function getCountriesByRegion(region: string): CountryConfig[] {
  if (region === 'All') return COUNTRIES;
  return COUNTRIES.filter(c => c.region === region);
}

export function searchCountries(query: string): CountryConfig[] {
  const q = query.toLowerCase().trim();
  if (!q) return COUNTRIES;
  return COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.code.toLowerCase().includes(q) ||
    c.region.toLowerCase().includes(q) ||
    (c.nativeName && c.nativeName.toLowerCase().includes(q))
  );
}
