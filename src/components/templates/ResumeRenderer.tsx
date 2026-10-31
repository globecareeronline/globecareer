import React from 'react';
import { ResumeData } from '../../types/resume';
import { getCountryById } from '../../data/countries';
import { 
  Mail, Phone, MapPin, Linkedin, Github, Globe, 
  ExternalLink, Award, BookOpen, HeartHandshake, FileText, CheckCircle2 
} from 'lucide-react';

interface ResumeRendererProps {
  data: ResumeData;
  scale?: number; // Zoom level (e.g. 1, 0.85, 1.1)
  className?: string;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({
  data,
  scale = 1,
  className = ''
}) => {
  const country = getCountryById(data.targetCountryId);
  const design = data.design;
  const isLetter = design.paperSize === 'letter';

  // Fonts
  const fontClass = 
    design.fontFamily === 'serif' 
      ? 'font-serif' 
      : design.fontFamily === 'mono' 
        ? 'font-mono' 
        : 'font-sans';

  // Spacing & Font Size modifiers
  const spacingClass = 
    design.spacing === 'compact' ? 'space-y-3' : design.spacing === 'comfortable' ? 'space-y-6' : 'space-y-4';
  const itemSpacingClass = 
    design.spacing === 'compact' ? 'space-y-2' : design.spacing === 'comfortable' ? 'space-y-4' : 'space-y-3';
  const baseTextSize = 
    design.fontSize === 'compact' ? 'text-xs' : design.fontSize === 'relaxed' ? 'text-sm' : 'text-[13px]';
  const headingTextSize = 
    design.fontSize === 'compact' ? 'text-sm' : design.fontSize === 'relaxed' ? 'text-base' : 'text-sm';

  const accentColor = design.accentColor || '#1e3a8a';
  const isPhotoTemplate = ['european_modern', 'executive_photo', 'creative_showcase'].includes(design.templateId);
  const showPhoto = design.showPhoto && Boolean(data.personal.photoUrl) && isPhotoTemplate;

  // Photo shape styling
  const photoShapeClass = 
    design.photoShape === 'circle' 
      ? 'rounded-full' 
      : design.photoShape === 'rounded' 
        ? 'rounded-xl' 
        : 'rounded-none';

  // Order of sections according to user preference or default
  const enabledSections = (data.sectionsOrder || [])
    .filter(s => s.enabled)
    .map(s => s.id);

  // Helper: section titles
  const getSectionTitle = (id: string, defaultTitle: string) => {
    const meta = data.sectionsOrder?.find(s => s.id === id);
    return meta?.title || defaultTitle;
  };

  return (
    <div 
      className={`resume-paper-wrapper flex justify-center ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
    >
      <div 
        id="resume-document"
        className={`resume-paper bg-white text-neutral-900 shadow-2xl relative transition-all duration-200 overflow-hidden ${fontClass} ${baseTextSize}`}
        style={{
          width: isLetter ? '8.5in' : '210mm',
          minHeight: isLetter ? '11in' : '297mm',
          boxSizing: 'border-box',
          lineHeight: '1.45'
        }}
      >
        {/* TEMPLATE VARIANT A: SIDEBAR LAYOUT (Continental European / Creative Showcase) */}
        {design.templateId === 'european_modern' || design.templateId === 'creative_showcase' ? (
          <div className="flex h-full min-h-[inherit]">
            {/* Left Sidebar */}
            <div className="w-[34%] bg-neutral-100/80 border-r border-neutral-200 p-7 space-y-6 shrink-0 print:bg-neutral-50">
              {/* Photo */}
              {showPhoto && data.personal.photoUrl && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={data.personal.photoUrl} 
                    alt={data.personal.fullName}
                    className={`w-32 h-32 object-cover border-2 border-white shadow-md ${photoShapeClass}`}
                  />
                </div>
              )}

              {/* Contact Info in Sidebar */}
              <div data-resume-section="personal" className="space-y-3 transition-colors duration-300">
                <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500 border-b border-neutral-300 pb-1">
                  Contact
                </h4>
                <div className="space-y-2 text-xs text-neutral-700">
                  {data.personal.email && (
                    <div className="flex items-center gap-2 break-all">
                      <Mail className="w-3.5 h-3.5 shrink-0 text-neutral-500" />
                      <span>{data.personal.email}</span>
                    </div>
                  )}
                  {data.personal.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 shrink-0 text-neutral-500" />
                      <span>{data.personal.phone}</span>
                    </div>
                  )}
                  {(data.personal.city || data.personal.country) && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-500" />
                      <span>{[data.personal.city, data.personal.stateOrRegion, data.personal.country].filter(Boolean).join(', ')}</span>
                    </div>
                  )}
                  {data.personal.linkedIn && (
                    <div className="flex items-center gap-2 break-all">
                      <Linkedin className="w-3.5 h-3.5 shrink-0 text-neutral-500" />
                      <span>{data.personal.linkedIn}</span>
                    </div>
                  )}
                  {data.personal.github && (
                    <div className="flex items-center gap-2 break-all">
                      <Github className="w-3.5 h-3.5 shrink-0 text-neutral-500" />
                      <span>{data.personal.github}</span>
                    </div>
                  )}
                  {data.personal.portfolioUrl && (
                    <div className="flex items-center gap-2 break-all">
                      <Globe className="w-3.5 h-3.5 shrink-0 text-neutral-500" />
                      <span>{data.personal.portfolioUrl}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Details (European Lebenslauf: DOB, Nationality, Driving license) */}
              {(data.personal.dateOfBirth || data.personal.nationality || data.personal.drivingLicense || data.personal.workAuthorization) && (
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500 border-b border-neutral-300 pb-1">
                    Personal Details
                  </h4>
                  <div className="space-y-1.5 text-xs text-neutral-700">
                    {data.personal.dateOfBirth && (
                      <div>
                        <span className="text-neutral-500 block text-[11px]">Date of Birth</span>
                        <span className="font-medium">{data.personal.dateOfBirth}</span>
                      </div>
                    )}
                    {data.personal.nationality && (
                      <div>
                        <span className="text-neutral-500 block text-[11px]">Nationality</span>
                        <span className="font-medium">{data.personal.nationality}</span>
                      </div>
                    )}
                    {data.personal.drivingLicense && (
                      <div>
                        <span className="text-neutral-500 block text-[11px]">Driver's License</span>
                        <span className="font-medium">{data.personal.drivingLicense}</span>
                      </div>
                    )}
                    {data.personal.workAuthorization && (
                      <div>
                        <span className="text-neutral-500 block text-[11px]">Work Authorization</span>
                        <span className="font-medium">{data.personal.workAuthorization}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Sidebar Skills */}
              {enabledSections.includes('skills') && data.skills && data.skills.length > 0 && (
                <div data-resume-section="skills" className="space-y-2.5 transition-colors duration-300">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500 border-b border-neutral-300 pb-1">
                    {getSectionTitle('skills', 'Key Skills')}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.map((skill) => (
                      <span 
                        key={skill.id}
                        className="px-2 py-0.5 text-[11px] bg-white border border-neutral-200 rounded font-medium text-neutral-800"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sidebar Languages */}
              {enabledSections.includes('languages') && data.languages && data.languages.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500 border-b border-neutral-300 pb-1">
                    {getSectionTitle('languages', 'Languages')}
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {data.languages.map((lang) => (
                      <div key={lang.id} className="flex justify-between items-center text-neutral-800">
                        <span className="font-medium">{lang.language}</span>
                        <span className="text-[11px] text-neutral-500">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sidebar Certifications */}
              {enabledSections.includes('certifications') && data.certifications && data.certifications.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500 border-b border-neutral-300 pb-1">
                    {getSectionTitle('certifications', 'Certifications')}
                  </h4>
                  <div className="space-y-2 text-xs">
                    {data.certifications.map((cert) => (
                      <div key={cert.id} className="text-neutral-800">
                        <div className="font-semibold">{cert.name}</div>
                        <div className="text-[11px] text-neutral-500">{cert.issuer} ({cert.issueDate})</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content Area */}
            <div className="w-[66%] p-8 space-y-6">
              {/* Header Title */}
              <div data-resume-section="personal" className="border-b-2 pb-4 transition-colors duration-300" style={{ borderColor: accentColor }}>
                <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900 uppercase">
                  {data.personal.fullName || 'Your Name'}
                </h1>
                {data.personal.jobTitle && (
                  <h2 className="text-base font-semibold mt-1 tracking-wide" style={{ color: accentColor }}>
                    {data.personal.jobTitle}
                  </h2>
                )}
              </div>

              {/* Professional Summary */}
              {enabledSections.includes('summary') && data.summary && (
                <div data-resume-section="summary" className="space-y-2 transition-colors duration-300">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                    {getSectionTitle('summary', 'Professional Profile')}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed text-justify">
                    {data.summary}
                  </p>
                </div>
              )}

              {/* Work Experience */}
              {enabledSections.includes('experience') && data.experience && data.experience.length > 0 && (
                <div data-resume-section="experience" className="space-y-3 transition-colors duration-300">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2 border-b pb-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                    {getSectionTitle('experience', 'Professional Experience')}
                  </h3>
                  <div className={itemSpacingClass}>
                    {data.experience.map((exp) => (
                      <div key={exp.id} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-neutral-900">{exp.jobTitle}</h4>
                          <span className="text-xs font-medium text-neutral-500 font-mono">
                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-neutral-600 mb-1.5 font-medium">
                          <span style={{ color: accentColor }}>{exp.company}</span>
                          {exp.location && <span>{exp.location}</span>}
                        </div>
                        {exp.description && exp.description.length > 0 && (
                          <ul className="list-disc list-outside ml-4 space-y-1 text-neutral-700 text-xs">
                            {exp.description.map((bullet, idx) => (
                              <li key={idx} className="leading-relaxed">{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {enabledSections.includes('education') && data.education && data.education.length > 0 && (
                <div data-resume-section="education" className="space-y-3 transition-colors duration-300">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2 border-b pb-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                    {getSectionTitle('education', 'Education & Qualifications')}
                  </h3>
                  <div className={itemSpacingClass}>
                    {data.education.map((edu) => (
                      <div key={edu.id} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-neutral-900">{edu.degree} in {edu.fieldOfStudy}</h4>
                          <span className="text-xs font-medium text-neutral-500 font-mono">
                            {edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-neutral-600 font-medium">
                          <span>{edu.institution}</span>
                          {edu.gradeOrHonors && <span className="text-neutral-700 font-semibold">{edu.gradeOrHonors}</span>}
                        </div>
                        {edu.highlights && edu.highlights.length > 0 && (
                          <div className="text-xs text-neutral-600 mt-1">
                            {edu.highlights.join(' · ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {enabledSections.includes('projects') && data.projects && data.projects.length > 0 && (
                <div data-resume-section="more" className="space-y-3 transition-colors duration-300">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2 border-b pb-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                    {getSectionTitle('projects', 'Key Projects')}
                  </h3>
                  <div className={itemSpacingClass}>
                    {data.projects.map((proj) => (
                      <div key={proj.id} className="break-inside-avoid text-xs">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-neutral-900">{proj.name}</span>
                          {proj.role && <span className="text-neutral-500">{proj.role}</span>}
                        </div>
                        <p className="text-neutral-700 mt-0.5">{proj.description}</p>
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="text-[11px] text-neutral-500 mt-1">
                            Tech stack: {proj.technologies.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Awards */}
              {enabledSections.includes('awards') && data.awards && data.awards.length > 0 && (
                <div className="space-y-2 break-inside-avoid">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2 border-b pb-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                    {getSectionTitle('awards', 'Honors & Awards')}
                  </h3>
                  <div className="space-y-1 text-xs text-neutral-700">
                    {data.awards.map((a) => (
                      <div key={a.id} className="flex justify-between">
                        <span className="font-semibold text-neutral-900">{a.title} ({a.issuer})</span>
                        <span className="text-neutral-500 font-mono text-[11px]">{a.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Volunteer */}
              {enabledSections.includes('volunteer') && data.volunteer && data.volunteer.length > 0 && (
                <div className="space-y-2 break-inside-avoid">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2 border-b pb-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                    {getSectionTitle('volunteer', 'Volunteer & Community Leadership')}
                  </h3>
                  <div className="space-y-1.5 text-xs text-neutral-700">
                    {data.volunteer.map((v) => (
                      <div key={v.id}>
                        <div className="flex justify-between font-semibold text-neutral-900">
                          <span>{v.role}</span>
                          <span className="text-neutral-500 font-mono text-[11px]">{v.startDate} – {v.isCurrent ? 'Present' : v.endDate}</span>
                        </div>
                        <div className="text-[11px] text-neutral-600">{v.organization}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Publications */}
              {enabledSections.includes('publications') && data.publications && data.publications.length > 0 && (
                <div className="space-y-2 break-inside-avoid">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2 border-b pb-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                    {getSectionTitle('publications', 'Publications & Research')}
                  </h3>
                  <div className="space-y-1 text-xs text-neutral-700">
                    {data.publications.map((p) => (
                      <div key={p.id}>
                        <span className="font-semibold text-neutral-900">{p.title}</span>
                        <span className="text-neutral-500 text-[11px]"> — {p.publisher} ({p.date})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Sections */}
              {enabledSections.includes('custom') && data.customSections && data.customSections.length > 0 && (
                <div className="space-y-2 break-inside-avoid">
                  {data.customSections.map((c) => (
                    <div key={c.id} className="space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2 border-b pb-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                        {c.title}
                      </h3>
                      <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-line">{c.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* References */}
              {enabledSections.includes('references') && (
                <div className="space-y-1 pt-2 break-inside-avoid">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></span>
                    {getSectionTitle('references', 'References')}
                  </h3>
                  <p className="text-xs text-neutral-600 italic">
                    {data.referencesUponRequestOnly 
                      ? 'Professional references available upon request.' 
                      : data.references.map(r => `${r.name} (${r.role}, ${r.company})`).join(' · ')}
                  </p>
                </div>
              )}

              {/* Polish GDPR / RODO Clause or Legal Disclosures */}
              {data.personal.gdprConsentClause && (
                <div className="pt-4 border-t border-neutral-200 text-[10px] text-neutral-500 leading-tight italic break-inside-avoid">
                  {data.personal.gdprConsentClause}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* TEMPLATE VARIANT B: FULL-WIDTH HEADER / ATS-FRIENDLY SINGLE-COLUMN LAYOUT */
          <div className="p-8 sm:p-10 space-y-5">
            {/* Header: Photo (if executive), Name, Job Title, Contact Grid */}
            <div data-resume-section="personal" className="border-b-2 pb-5 transition-colors duration-300" style={{ borderColor: accentColor }}>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 uppercase">
                    {data.personal.fullName || 'Your Name'}
                  </h1>
                  {data.personal.jobTitle && (
                    <h2 className="text-base font-semibold mt-1 tracking-wide" style={{ color: accentColor }}>
                      {data.personal.jobTitle}
                    </h2>
                  )}

                  {/* Work authorization badge if specified */}
                  {data.personal.workAuthorization && (
                    <div className="mt-1.5 inline-block text-xs font-medium text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                      Status: {data.personal.workAuthorization}
                    </div>
                  )}
                </div>

                {/* Header Photo for Executive Photo Template */}
                {showPhoto && data.personal.photoUrl && (
                  <div className="shrink-0">
                    <img 
                      src={data.personal.photoUrl} 
                      alt={data.personal.fullName}
                      className={`w-24 h-24 sm:w-28 sm:h-28 object-cover border-2 shadow-sm ${photoShapeClass}`}
                      style={{ borderColor: accentColor }}
                    />
                  </div>
                )}
              </div>

              {/* Contact Bar */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-neutral-600 font-medium">
                {data.personal.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    {data.personal.email}
                  </span>
                )}
                {data.personal.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    {data.personal.phone}
                  </span>
                )}
                {(data.personal.city || data.personal.country) && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    {[data.personal.city, data.personal.stateOrRegion, data.personal.country].filter(Boolean).join(', ')}
                  </span>
                )}
                {data.personal.linkedIn && (
                  <span className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-neutral-400" />
                    {data.personal.linkedIn}
                  </span>
                )}
                {data.personal.github && (
                  <span className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-neutral-400" />
                    {data.personal.github}
                  </span>
                )}
                {data.personal.portfolioUrl && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-neutral-400" />
                    {data.personal.portfolioUrl}
                  </span>
                )}
              </div>
            </div>

            {/* Dynamic Sections Loop */}
            <div className={spacingClass}>
              {/* 1. Summary */}
              {enabledSections.includes('summary') && data.summary && (
                <div data-resume-section="summary" className="break-inside-avoid transition-colors duration-300">
                  <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-2 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                    {getSectionTitle('summary', 'Professional Summary')}
                  </h3>
                  <p className="text-neutral-700 leading-relaxed text-justify">
                    {data.summary}
                  </p>
                </div>
              )}

              {/* 2. Skills (Often placed before or after experience) */}
              {enabledSections.includes('skills') && data.skills && data.skills.length > 0 && (
                <div data-resume-section="skills" className="break-inside-avoid transition-colors duration-300">
                  <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-2 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                    {getSectionTitle('skills', 'Key Skills & Competencies')}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1.5 gap-x-4 text-xs">
                    {data.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }}></span>
                        <span className="font-semibold text-neutral-800">{skill.name}</span>
                        {skill.level && <span className="text-[11px] text-neutral-400">({skill.level})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Work Experience */}
              {enabledSections.includes('experience') && data.experience && data.experience.length > 0 && (
                <div data-resume-section="experience" className="transition-colors duration-300">
                  <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-3 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                    {getSectionTitle('experience', 'Professional Experience')}
                  </h3>
                  <div className={itemSpacingClass}>
                    {data.experience.map((exp) => (
                      <div key={exp.id} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-neutral-900 text-sm">{exp.jobTitle}</h4>
                          <span className="text-xs font-semibold text-neutral-600 font-mono">
                            {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-neutral-600 mb-1.5 font-medium">
                          <span className="font-semibold" style={{ color: accentColor }}>{exp.company}</span>
                          {exp.location && <span>{exp.location}</span>}
                        </div>
                        {exp.description && exp.description.length > 0 && (
                          <ul className="list-disc list-outside ml-4 space-y-1 text-neutral-700 text-xs">
                            {exp.description.map((bullet, idx) => (
                              <li key={idx} className="leading-relaxed">{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Education */}
              {enabledSections.includes('education') && data.education && data.education.length > 0 && (
                <div data-resume-section="education" className="transition-colors duration-300">
                  <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-3 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                    {getSectionTitle('education', 'Education')}
                  </h3>
                  <div className={itemSpacingClass}>
                    {data.education.map((edu) => (
                      <div key={edu.id} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                          <h4 className="font-bold text-neutral-900 text-sm">{edu.degree} in {edu.fieldOfStudy}</h4>
                          <span className="text-xs font-semibold text-neutral-600 font-mono">
                            {edu.startDate} – {edu.isCurrent ? 'Present' : edu.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-neutral-600 font-medium">
                          <span style={{ color: accentColor }}>{edu.institution}</span>
                          {edu.gradeOrHonors && <span className="font-semibold text-neutral-800">{edu.gradeOrHonors}</span>}
                        </div>
                        {edu.highlights && edu.highlights.length > 0 && (
                          <div className="text-xs text-neutral-600 mt-1">
                            {edu.highlights.join(' · ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Projects */}
              {enabledSections.includes('projects') && data.projects && data.projects.length > 0 && (
                <div data-resume-section="more" className="transition-colors duration-300">
                  <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-2.5 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                    {getSectionTitle('projects', 'Key Projects')}
                  </h3>
                  <div className={itemSpacingClass}>
                    {data.projects.map((proj) => (
                      <div key={proj.id} className="break-inside-avoid text-xs">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold text-neutral-900">{proj.name}</span>
                          {proj.role && <span className="text-neutral-500 italic">{proj.role}</span>}
                        </div>
                        <p className="text-neutral-700 mt-0.5 leading-relaxed">{proj.description}</p>
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="text-[11px] text-neutral-500 mt-0.5">
                            Technologies: {proj.technologies.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Certifications */}
              {enabledSections.includes('certifications') && data.certifications && data.certifications.length > 0 && (
                <div data-resume-section="more" className="break-inside-avoid transition-colors duration-300">
                  <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-2 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                    {getSectionTitle('certifications', 'Certifications & Accreditations')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {data.certifications.map((cert) => (
                      <div key={cert.id} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-500" />
                        <div>
                          <div className="font-bold text-neutral-800">{cert.name}</div>
                          <div className="text-[11px] text-neutral-500">{cert.issuer} ({cert.issueDate})</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Languages */}
              {enabledSections.includes('languages') && data.languages && data.languages.length > 0 && (
                <div className="break-inside-avoid">
                  <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-2 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                    {getSectionTitle('languages', 'Languages')}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-xs">
                    {data.languages.map((l) => (
                      <div key={l.id} className="flex items-center gap-1.5">
                        <span className="font-bold text-neutral-800">{l.language}:</span>
                        <span className="text-neutral-600">{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. Awards & Achievements */}
              {enabledSections.includes('awards') && data.awards && data.awards.length > 0 && (
                <div className="break-inside-avoid">
                  <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-2 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                    {getSectionTitle('awards', 'Honors & Awards')}
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    {data.awards.map((award) => (
                      <div key={award.id} className="flex justify-between">
                        <span className="font-semibold text-neutral-800">{award.title} ({award.issuer})</span>
                        <span className="text-neutral-500 font-mono">{award.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Volunteer */}
              {enabledSections.includes('volunteer') && data.volunteer && data.volunteer.length > 0 && (
                <div className="break-inside-avoid">
                  <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-2 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                    {getSectionTitle('volunteer', 'Volunteer & Community Leadership')}
                  </h3>
                  <div className="space-y-2 text-xs">
                    {data.volunteer.map((v) => (
                      <div key={v.id}>
                        <div className="flex justify-between font-bold text-neutral-800">
                          <span>{v.role} — {v.organization}</span>
                          <span className="text-neutral-500 font-mono text-[11px]">{v.startDate} – {v.isCurrent ? 'Present' : v.endDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Publications */}
              {enabledSections.includes('publications') && data.publications && data.publications.length > 0 && (
                <div className="break-inside-avoid">
                  <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-2 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                    {getSectionTitle('publications', 'Publications & Papers')}
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    {data.publications.map((p) => (
                      <div key={p.id} className="text-neutral-800">
                        <span className="font-bold">{p.title}</span>
                        <span className="text-neutral-500"> — {p.publisher} ({p.date})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Sections */}
              {enabledSections.includes('custom') && data.customSections && data.customSections.length > 0 && (
                <div className="space-y-2 break-inside-avoid">
                  {data.customSections.map((c) => (
                    <div key={c.id}>
                      <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-1.5 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                        {c.title}
                      </h3>
                      <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-line">{c.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* References */}
              {enabledSections.includes('references') && (
                <div className="break-inside-avoid pt-1">
                  <h3 className={`font-bold uppercase tracking-wider text-neutral-900 border-b pb-1 mb-1.5 ${headingTextSize}`} style={{ borderBottomColor: accentColor }}>
                    {getSectionTitle('references', 'References')}
                  </h3>
                  <p className="text-xs text-neutral-600 italic">
                    {data.referencesUponRequestOnly 
                      ? 'References available upon request.' 
                      : data.references.map(r => `${r.name} – ${r.role}, ${r.company} (${r.email || r.phone || ''})`).join('  |  ')}
                  </p>
                </div>
              )}

              {/* Polish GDPR / RODO Clause or Legal Disclosures */}
              {data.personal.gdprConsentClause && (
                <div className="pt-3 border-t border-neutral-200 text-[10px] text-neutral-500 leading-tight italic break-inside-avoid">
                  {data.personal.gdprConsentClause}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
