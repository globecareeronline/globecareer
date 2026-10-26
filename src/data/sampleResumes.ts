import { ResumeData, SeniorityLevel, EmploymentType, TemplateId } from '../types/resume';
import { getCountryById } from './countries';
import { getJobCategoryById } from './jobCategories';
import { getCountryTemplateRecommendation } from '../utils/countryTemplates';

export type SamplePersonaType = 'experienced' | 'graduate' | 'career_changer';

export function generateSampleResume(countryId: string, persona: SamplePersonaType = 'experienced', categoryId: string = 'it-software'): ResumeData {
  const country = getCountryById(countryId);
  const category = getJobCategoryById(categoryId);
  const rec = getCountryTemplateRecommendation(countryId);

  const shouldHavePhoto = rec.formattingNotes.photoIsStandard;
  const defaultTemplate: TemplateId = rec.templateId;

  // Sample data adapted to persona
  let fullName = 'Alex Rivera';
  let targetJobTitle = category.name.includes('IT') ? 'Senior Software Engineer' : `${category.name} Specialist`;
  let seniority: SeniorityLevel = 'Senior (6-10 yrs)';
  let employmentType: EmploymentType = 'Full-time';

  if (persona === 'graduate') {
    fullName = 'Elena Vance';
    targetJobTitle = `Junior ${category.name} Associate`;
    seniority = 'Entry-Level / Graduate';
    employmentType = 'Full-time';
  } else if (persona === 'career_changer') {
    fullName = 'Marcus Sterling';
    targetJobTitle = `Associate ${category.name} Analyst`;
    seniority = 'Career Changer';
    employmentType = 'Full-time';
  }

  // Country specific location tailoring
  let city = 'Metropolis';
  let stateOrRegion = 'Central District';
  let postalCode = '10001';

  if (country.id === 'us') {
    city = 'Austin';
    stateOrRegion = 'TX';
    postalCode = '78701';
  } else if (country.id === 'ca') {
    city = 'Toronto';
    stateOrRegion = 'ON';
    postalCode = 'M5V 2T6';
  } else if (country.id === 'uk') {
    city = 'London';
    stateOrRegion = 'Greater London';
    postalCode = 'EC1A 1BB';
  } else if (country.id === 'de') {
    city = 'Berlin';
    stateOrRegion = 'Berlin';
    postalCode = '10115';
  } else if (country.id === 'fr') {
    city = 'Paris';
    stateOrRegion = 'Île-de-France';
    postalCode = '75008';
  } else if (country.id === 'ch') {
    city = 'Zürich';
    stateOrRegion = 'Zürich';
    postalCode = '8001';
  } else if (country.id === 'jp') {
    city = 'Tokyo';
    stateOrRegion = 'Chiyoda-ku';
    postalCode = '100-0001';
  } else if (country.id === 'ae') {
    city = 'Dubai';
    stateOrRegion = 'Dubai';
    postalCode = 'PO Box 12345';
  } else if (country.id === 'in') {
    city = 'Bengaluru';
    stateOrRegion = 'Karnataka';
    postalCode = '560001';
  } else if (country.id === 'pl') {
    city = 'Warszawa';
    stateOrRegion = 'Mazowieckie';
    postalCode = '00-001';
  } else if (country.id === 'au') {
    city = 'Sydney';
    stateOrRegion = 'NSW';
    postalCode = '2000';
  }

  // Work Authorization note
  let workAuth = '';
  if (country.personalDataRules.workAuthStatusRecommended) {
    if (country.id === 'us') workAuth = 'US Citizen / Authorized to work for any employer';
    else if (country.id === 'uk') workAuth = 'UK Citizen / Right to work in the UK';
    else if (country.id === 'ca') workAuth = 'Canadian Permanent Resident';
    else if (country.id === 'de') workAuth = 'EU Citizen / Unrestricted German Work Permit';
    else if (country.id === 'ch') workAuth = 'Swiss Citizen / C Permit';
    else if (country.id === 'ae') workAuth = 'UAE Golden Visa Holder / Immediately Available';
    else if (country.id === 'sa') workAuth = 'Transferable Iqama';
    else if (country.id === 'sg') workAuth = 'Singapore Citizen';
    else if (country.id === 'au') workAuth = 'Australian Citizen';
    else workAuth = 'Authorized to work in ' + country.name;
  }

  // Sample avatar SVG data URL for demonstration photos
  const samplePhotoUrl = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%232563eb"/><circle cx="100" cy="75" r="40" fill="%23ffffff"/><path d="M40 180 c0 -40 30 -60 60 -60 s60 20 60 60 Z" fill="%23ffffff"/></svg>';

  return {
    id: `sample-${country.id}-${persona}`,
    targetCountryId: country.id,
    targetJobCategory: category.id,
    seniority,
    employmentType,
    lastModified: Date.now(),
    personal: {
      fullName,
      jobTitle: targetJobTitle,
      email: `${fullName.toLowerCase().replace(' ', '.')}@example.com`,
      phone: `${country.phonePrefix} 555-0149`,
      city,
      stateOrRegion,
      postalCode,
      country: country.name,
      photoUrl: shouldHavePhoto ? samplePhotoUrl : undefined,
      hasPhoto: shouldHavePhoto,
      dateOfBirth: country.personalDataRules.dobAllowed ? (persona === 'graduate' ? '2002-05-14' : '1990-08-22') : undefined,
      nationality: country.personalDataRules.nationalityAllowed ? country.name : undefined,
      workAuthorization: workAuth,
      maritalStatus: undefined,
      drivingLicense: country.personalDataRules.drivingLicenseCommon ? 'Class B / Clean Record' : undefined,
      gdprConsentClause: country.personalDataRules.requiresGDPRClause ? country.personalDataRules.gdprClauseText : undefined,
      linkedIn: `linkedin.com/in/${fullName.toLowerCase().replace(' ', '')}`,
      github: category.id.includes('it') || category.id.includes('web') ? `github.com/${fullName.toLowerCase().replace(' ', '')}` : undefined,
      portfolioUrl: `portfolio.${fullName.toLowerCase().replace(' ', '')}.dev`
    },
    summary: persona === 'graduate' 
      ? `High-achieving graduate in Computer Science and Engineering with foundational experience in modern full-stack development, algorithms, and agile methodologies. Seeking to contribute analytical rigor and collaborative enthusiasm to ${country.name} engineering initiatives.`
      : (persona === 'career_changer' 
        ? `Analytical professional with 6+ years of rigorous operational and project coordination expertise, transitioning into ${category.name}. Possesses proven track record translating complex stakeholder objectives into scalable technical executions.`
        : category.sampleSummary),
    experience: persona === 'graduate' ? [
      {
        id: 'exp-grad-1',
        jobTitle: 'Junior Software Engineering Intern',
        company: 'Vanguard Systems',
        location: `${city}, ${country.name}`,
        startDate: '2023-06',
        endDate: '2023-09',
        isCurrent: false,
        employmentType: 'Internship',
        description: [
          'Assisted development of customer portal features using React and TypeScript, delivering 6 tested sprint user stories.',
          'Wrote automated Jest unit tests covering 88% of edge-case error handlers across auth services.',
          'Collaborated with senior engineers during bi-weekly code reviews and daily standups.'
        ]
      }
    ] : [
      {
        id: 'exp-1',
        jobTitle: `Lead ${targetJobTitle}`,
        company: 'Apex Cloud Solutions',
        location: `${city}, ${country.name}`,
        startDate: '2021-03',
        endDate: 'Present',
        isCurrent: true,
        employmentType: 'Full-time',
        description: [
          category.sampleBulletPoints[0] || 'Architected and deployed high-performance distributed systems with 99.99% availability.',
          category.sampleBulletPoints[1] || 'Reduced system processing latency by 38% through architectural profiling and cache caching.',
          category.sampleBulletPoints[2] || 'Led team of 8 engineers across agile sprints, mentoring 4 junior team members.'
        ]
      },
      {
        id: 'exp-2',
        jobTitle: targetJobTitle.replace('Lead ', '').replace('Senior ', ''),
        company: 'Horizon Technologies',
        location: `${city}, ${country.name}`,
        startDate: '2018-05',
        endDate: '2021-02',
        isCurrent: false,
        employmentType: 'Full-time',
        description: [
          category.sampleBulletPoints[3] || 'Collaborated with product designers to launch enterprise SaaS dashboard used by 120,000+ users.',
          'Pioneered automated testing pipeline, cutting regression testing duration by 55%.'
        ]
      }
    ],
    education: [
      {
        id: 'edu-1',
        institution: country.id === 'us' ? 'University of Texas at Austin' : (country.id === 'uk' ? 'University of Manchester' : (country.id === 'de' ? 'Technische Universität Berlin' : 'National University')),
        degree: persona === 'graduate' ? 'Bachelor of Science (B.Sc.)' : 'Master of Science (M.Sc.)',
        fieldOfStudy: category.id.includes('data') ? 'Data Science & Applied Mathematics' : 'Computer Science & Software Engineering',
        location: city,
        startDate: persona === 'graduate' ? '2019-09' : '2012-09',
        endDate: persona === 'graduate' ? '2023-05' : '2016-06',
        isCurrent: false,
        gradeOrHonors: country.id === 'uk' ? 'First Class Honours' : (country.id === 'us' ? 'GPA: 3.85 / 4.0' : 'Grade: 1.3 (Sehr gut)'),
        highlights: [
          'Dean’s List Academic Honors',
          'Published thesis on Distributed Systems Resilience'
        ]
      }
    ],
    skills: [
      ...category.suggestedSkills.technical.slice(0, 5).map((s, idx) => ({
        id: `skill-tech-${idx}`,
        name: s,
        category: 'Technical' as const,
        level: 'Expert' as const
      })),
      ...category.suggestedSkills.tools.slice(0, 4).map((s, idx) => ({
        id: `skill-tool-${idx}`,
        name: s,
        category: 'Tools & Frameworks' as const,
        level: 'Advanced' as const
      })),
      ...category.suggestedSkills.soft.slice(0, 3).map((s, idx) => ({
        id: `skill-soft-${idx}`,
        name: s,
        category: 'Soft Skills' as const,
        level: 'Advanced' as const
      }))
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'AWS Certified Solutions Architect – Professional',
        issuer: 'Amazon Web Services',
        issueDate: '2022-04',
        expiryDate: '2025-04',
        credentialId: 'AWS-PSA-994827'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'OpenMetrics Observability Toolkit',
        role: 'Creator & Maintainer',
        url: 'https://github.com/example/openmetrics-tool',
        startDate: '2022-01',
        endDate: '2023-08',
        description: 'Open-source distributed tracing library benchmarked at 2.5x faster throughput than baseline tooling.',
        technologies: ['TypeScript', 'Go', 'Docker', 'Prometheus']
      }
    ],
    languages: [
      {
        id: 'lang-1',
        language: 'English',
        proficiency: 'Native / Bilingual'
      },
      {
        id: 'lang-2',
        language: country.id === 'de' ? 'German' : (country.id === 'fr' ? 'French' : (country.id === 'es' ? 'Spanish' : 'German')),
        proficiency: 'Upper-Intermediate (B2)'
      }
    ],
    awards: [
      {
        id: 'award-1',
        title: 'Excellence in Engineering Award',
        issuer: 'Apex Cloud Solutions',
        date: '2023-12',
        description: 'Recognized for delivering multi-tenant cloud security overhaul without customer downtime.'
      }
    ],
    volunteer: [],
    publications: [],
    references: [
      {
        id: 'ref-1',
        name: 'Dr. Sarah Jenkins',
        role: 'VP of Engineering',
        company: 'Apex Cloud Solutions',
        email: 's.jenkins@example.com',
        phone: `${country.phonePrefix} 555-0199`,
        isAvailableUponRequest: true
      }
    ],
    referencesUponRequestOnly: true,
    customSections: [],
    sectionsOrder: [
      { id: 'summary', title: 'Professional Summary', enabled: true },
      { id: 'experience', title: 'Work Experience', enabled: true },
      { id: 'education', title: 'Education', enabled: true },
      { id: 'skills', title: 'Key Competencies & Skills', enabled: true },
      { id: 'certifications', title: 'Certifications', enabled: true },
      { id: 'projects', title: 'Key Projects', enabled: true },
      { id: 'languages', title: 'Languages', enabled: true },
      { id: 'references', title: 'References', enabled: true }
    ],
    design: {
      templateId: defaultTemplate,
      fontFamily: 'sans',
      fontSize: 'normal',
      spacing: 'normal',
      accentColor: '#1e3a8a', // Deep corporate navy
      paperSize: country.paperSize,
      showPhoto: shouldHavePhoto,
      photoShape: 'circle',
      photoPosition: 'top-right'
    }
  };
}
