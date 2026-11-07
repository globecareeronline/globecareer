import React, { useState } from 'react';
import { 
  ResumeData, CertificationItem, ProjectItem, LanguageItem, 
  AwardItem, VolunteerItem, PublicationItem, ReferenceItem, 
  CustomSectionItem, SectionMeta 
} from '../../types/resume';
import { 
  Plus, Trash2, Globe, Award, Shield, FolderGit2, 
  Users, CheckCircle2, Eye, EyeOff, ArrowUp, ArrowDown, 
  HeartHandshake, BookOpen, Layers 
} from 'lucide-react';

interface AdditionalSectionsEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

type TabKey = 
  | 'languages' 
  | 'certifications' 
  | 'projects' 
  | 'awards' 
  | 'volunteer' 
  | 'publications' 
  | 'references' 
  | 'custom' 
  | 'reorder';

export const AdditionalSectionsEditor: React.FC<AdditionalSectionsEditorProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('languages');

  // --- Languages handlers ---
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Fluent (C2)'
    };
    onChange({
      ...data,
      languages: [...(data.languages || []), newLang]
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter(l => l.id !== id)
    });
  };

  const updateLanguage = (id: string, field: keyof LanguageItem, value: any) => {
    onChange({
      ...data,
      languages: data.languages.map(l => l.id === id ? { ...l, [field]: value } : l)
    });
  };

  // --- Certifications handlers ---
  const addCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: ''
    };
    onChange({
      ...data,
      certifications: [...(data.certifications || []), newCert]
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter(c => c.id !== id)
    });
  };

  const updateCertification = (id: string, field: keyof CertificationItem, value: any) => {
    onChange({
      ...data,
      certifications: data.certifications.map(c => c.id === id ? { ...c, [field]: value } : c)
    });
  };

  // --- Projects handlers ---
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      url: '',
      description: '',
      technologies: []
    };
    onChange({
      ...data,
      projects: [...(data.projects || []), newProj]
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  const updateProject = (id: string, field: keyof ProjectItem, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  // --- Awards handlers ---
  const addAward = () => {
    const newAward: AwardItem = {
      id: `award-${Date.now()}`,
      title: '',
      issuer: '',
      date: '',
      description: ''
    };
    onChange({
      ...data,
      awards: [...(data.awards || []), newAward]
    });
  };

  const removeAward = (id: string) => {
    onChange({
      ...data,
      awards: data.awards.filter(a => a.id !== id)
    });
  };

  const updateAward = (id: string, field: keyof AwardItem, value: any) => {
    onChange({
      ...data,
      awards: data.awards.map(a => a.id === id ? { ...a, [field]: value } : a)
    });
  };

  // --- Volunteer handlers ---
  const addVolunteer = () => {
    const newVol: VolunteerItem = {
      id: `vol-${Date.now()}`,
      role: '',
      organization: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: ['']
    };
    onChange({
      ...data,
      volunteer: [...(data.volunteer || []), newVol]
    });
  };

  const removeVolunteer = (id: string) => {
    onChange({
      ...data,
      volunteer: data.volunteer.filter(v => v.id !== id)
    });
  };

  const updateVolunteer = (id: string, field: keyof VolunteerItem, value: any) => {
    onChange({
      ...data,
      volunteer: data.volunteer.map(v => v.id === id ? { ...v, [field]: value } : v)
    });
  };

  // --- Publications handlers ---
  const addPublication = () => {
    const newPub: PublicationItem = {
      id: `pub-${Date.now()}`,
      title: '',
      publisher: '',
      date: '',
      url: '',
      description: ''
    };
    onChange({
      ...data,
      publications: [...(data.publications || []), newPub]
    });
  };

  const removePublication = (id: string) => {
    onChange({
      ...data,
      publications: data.publications.filter(p => p.id !== id)
    });
  };

  const updatePublication = (id: string, field: keyof PublicationItem, value: any) => {
    onChange({
      ...data,
      publications: data.publications.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  // --- Custom sections handlers ---
  const addCustomSection = () => {
    const newCustom: CustomSectionItem = {
      id: `custom-${Date.now()}`,
      title: 'Additional Information',
      content: ''
    };
    onChange({
      ...data,
      customSections: [...(data.customSections || []), newCustom]
    });
  };

  const removeCustomSection = (id: string) => {
    onChange({
      ...data,
      customSections: data.customSections.filter(c => c.id !== id)
    });
  };

  const updateCustomSection = (id: string, field: keyof CustomSectionItem, value: any) => {
    onChange({
      ...data,
      customSections: data.customSections.map(c => c.id === id ? { ...c, [field]: value } : c)
    });
  };

  // --- References handlers ---
  const toggleReferencesUponRequest = (val: boolean) => {
    onChange({
      ...data,
      referencesUponRequestOnly: val
    });
  };

  const addReference = () => {
    const newRef: ReferenceItem = {
      id: `ref-${Date.now()}`,
      name: '',
      role: '',
      company: '',
      email: '',
      phone: '',
      isAvailableUponRequest: false
    };
    onChange({
      ...data,
      references: [...(data.references || []), newRef]
    });
  };

  const removeReference = (id: string) => {
    onChange({
      ...data,
      references: data.references.filter(r => r.id !== id)
    });
  };

  const updateReference = (id: string, field: keyof ReferenceItem, value: any) => {
    onChange({
      ...data,
      references: data.references.map(r => r.id === id ? { ...r, [field]: value } : r)
    });
  };

  // --- Section visibility & ordering ---
  const toggleSectionEnabled = (sectionId: string) => {
    const updated = data.sectionsOrder.map(s => {
      if (s.id === sectionId) {
        return { ...s, enabled: !s.enabled };
      }
      return s;
    });
    onChange({
      ...data,
      sectionsOrder: updated
    });
  };

  const moveSectionOrder = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= data.sectionsOrder.length) return;
    const items = [...data.sectionsOrder];
    const [moved] = items.splice(index, 1);
    items.splice(target, 0, moved);
    onChange({
      ...data,
      sectionsOrder: items
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          Additional Sections & Layout
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          Customize languages, certifications, projects, awards, publications, volunteer work, and manage section visibility.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('languages')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'languages' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Languages ({data.languages?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('certifications')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'certifications' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Certifications ({data.certifications?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'projects' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Projects ({data.projects?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('awards')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'awards' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Awards ({data.awards?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('volunteer')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'volunteer' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Volunteer ({data.volunteer?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('publications')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'publications' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Publications ({data.publications?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('references')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'references' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          References
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('custom')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'custom' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Custom
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reorder')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
            activeTab === 'reorder' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
          }`}
        >
          Order & Visibility
        </button>
      </div>

      {/* TAB 1: LANGUAGES */}
      {activeTab === 'languages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Languages & Fluency
            </h4>
            <button
              type="button"
              onClick={addLanguage}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Language
            </button>
          </div>

          {(!data.languages || data.languages.length === 0) ? (
            <p className="text-xs text-neutral-400 italic">No languages added yet.</p>
          ) : (
            <div className="space-y-2.5">
              {data.languages.map((l) => (
                <div key={l.id} className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={l.language}
                      onChange={(e) => updateLanguage(l.id, 'language', e.target.value)}
                      placeholder="e.g. English, French, German"
                      className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="w-48">
                    <select
                      value={l.proficiency}
                      onChange={(e) => updateLanguage(l.id, 'proficiency', e.target.value as any)}
                      className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    >
                      <option value="Native / Bilingual">Native / Bilingual</option>
                      <option value="Fluent (C2)">Fluent (CEFR C2)</option>
                      <option value="Advanced (C1)">Advanced (CEFR C1)</option>
                      <option value="Upper-Intermediate (B2)">Upper-Intermediate (CEFR B2)</option>
                      <option value="Intermediate (B1)">Intermediate (CEFR B1)</option>
                      <option value="Elementary (A2)">Elementary (CEFR A2)</option>
                      <option value="Basic (A1)">Basic (CEFR A1)</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLanguage(l.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                    title="Remove language"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CERTIFICATIONS */}
      {activeTab === 'certifications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Certifications & Accreditations
            </h4>
            <button
              type="button"
              onClick={addCertification}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Certification
            </button>
          </div>

          {(!data.certifications || data.certifications.length === 0) ? (
            <p className="text-xs text-neutral-400 italic">No certifications listed.</p>
          ) : (
            <div className="space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="p-3.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                      placeholder="Certification Name (e.g. AWS Certified Solutions Architect)"
                      className="w-full mr-3 px-2.5 py-1.5 text-xs font-bold bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeCertification(cert.id)}
                      className="p-1 text-neutral-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                      placeholder="Issuing Organization (e.g. Amazon Web Services, PMI)"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <input
                      type="text"
                      value={cert.issueDate}
                      onChange={(e) => updateCertification(cert.id, 'issueDate', e.target.value)}
                      placeholder="Issue Date (e.g. 2022-04)"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Key Projects & Portfolio Work
            </h4>
            <button
              type="button"
              onClick={addProject}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Project
            </button>
          </div>

          {(!data.projects || data.projects.length === 0) ? (
            <p className="text-xs text-neutral-400 italic">No projects added yet.</p>
          ) : (
            <div className="space-y-3">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-3.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      placeholder="Project Name"
                      className="w-full mr-3 px-2.5 py-1.5 text-xs font-bold bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeProject(proj.id)}
                      className="p-1 text-neutral-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={proj.role || ''}
                      onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                      placeholder="Your Role (e.g. Lead Engineer)"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <input
                      type="text"
                      value={proj.url || ''}
                      onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                      placeholder="Project URL / GitHub link"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    placeholder="Brief description of impact, architecture, and users..."
                    className="w-full p-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: AWARDS */}
      {activeTab === 'awards' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Honors & Awards
            </h4>
            <button
              type="button"
              onClick={addAward}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Award
            </button>
          </div>

          {(!data.awards || data.awards.length === 0) ? (
            <p className="text-xs text-neutral-400 italic">No awards listed.</p>
          ) : (
            <div className="space-y-3">
              {data.awards.map((award) => (
                <div key={award.id} className="p-3.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={award.title}
                      onChange={(e) => updateAward(award.id, 'title', e.target.value)}
                      placeholder="Award Title"
                      className="w-full mr-3 px-2.5 py-1.5 text-xs font-bold bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeAward(award.id)}
                      className="p-1 text-neutral-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={award.issuer}
                      onChange={(e) => updateAward(award.id, 'issuer', e.target.value)}
                      placeholder="Issuer (e.g. Acme Corp)"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <input
                      type="text"
                      value={award.date}
                      onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                      placeholder="Date (e.g. 2023-11)"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none font-mono"
                    />
                  </div>
                  <input
                    type="text"
                    value={award.description || ''}
                    onChange={(e) => updateAward(award.id, 'description', e.target.value)}
                    placeholder="Short description of why it was awarded..."
                    className="w-full px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: VOLUNTEER */}
      {activeTab === 'volunteer' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Volunteer & Community Engagement
            </h4>
            <button
              type="button"
              onClick={addVolunteer}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Volunteer Role
            </button>
          </div>

          {(!data.volunteer || data.volunteer.length === 0) ? (
            <p className="text-xs text-neutral-400 italic">No volunteer experience added yet.</p>
          ) : (
            <div className="space-y-3">
              {data.volunteer.map((vol) => (
                <div key={vol.id} className="p-3.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={vol.role}
                      onChange={(e) => updateVolunteer(vol.id, 'role', e.target.value)}
                      placeholder="Volunteer Role (e.g. Community Tech Mentor)"
                      className="w-full mr-3 px-2.5 py-1.5 text-xs font-bold bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeVolunteer(vol.id)}
                      className="p-1 text-neutral-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={vol.organization}
                      onChange={(e) => updateVolunteer(vol.id, 'organization', e.target.value)}
                      placeholder="Organization"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <input
                      type="text"
                      value={vol.startDate}
                      onChange={(e) => updateVolunteer(vol.id, 'startDate', e.target.value)}
                      placeholder="Dates (e.g. 2021 – Present)"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: PUBLICATIONS */}
      {activeTab === 'publications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Publications & Papers
            </h4>
            <button
              type="button"
              onClick={addPublication}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Publication
            </button>
          </div>

          {(!data.publications || data.publications.length === 0) ? (
            <p className="text-xs text-neutral-400 italic">No publications listed.</p>
          ) : (
            <div className="space-y-3">
              {data.publications.map((pub) => (
                <div key={pub.id} className="p-3.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={pub.title}
                      onChange={(e) => updatePublication(pub.id, 'title', e.target.value)}
                      placeholder="Publication Title / Paper Name"
                      className="w-full mr-3 px-2.5 py-1.5 text-xs font-bold bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removePublication(pub.id)}
                      className="p-1 text-neutral-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={pub.publisher}
                      onChange={(e) => updatePublication(pub.id, 'publisher', e.target.value)}
                      placeholder="Publisher / Journal / Conference"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <input
                      type="text"
                      value={pub.date}
                      onChange={(e) => updatePublication(pub.id, 'date', e.target.value)}
                      placeholder="Publication Date"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 7: REFERENCES */}
      {activeTab === 'references' && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Reference Mode
                </h4>
                <p className="text-xs text-neutral-500">
                  In UK, US, and Australia, "References available upon request" is standard to conserve resume space.
                </p>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={data.referencesUponRequestOnly}
                  onChange={(e) => toggleReferencesUponRequest(e.target.checked)}
                  className="rounded text-neutral-900"
                />
                Available upon request only
              </label>
            </div>
          </div>

          {!data.referencesUponRequestOnly && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Explicit Professional Referees
                </h4>
                <button
                  type="button"
                  onClick={addReference}
                  className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add Referee
                </button>
              </div>

              {data.references.map((ref) => (
                <div key={ref.id} className="p-3.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={ref.name}
                      onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                      placeholder="Referee Full Name"
                      className="w-full mr-3 px-2.5 py-1.5 text-xs font-bold bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeReference(ref.id)}
                      className="p-1 text-neutral-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={ref.role}
                      onChange={(e) => updateReference(ref.id, 'role', e.target.value)}
                      placeholder="Job Title (e.g. VP of Engineering)"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <input
                      type="text"
                      value={ref.company}
                      onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                      placeholder="Company / Organization"
                      className="px-2.5 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 8: CUSTOM SECTIONS */}
      {activeTab === 'custom' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Custom & Additional Information
            </h4>
            <button
              type="button"
              onClick={addCustomSection}
              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Custom Section
            </button>
          </div>

          {(!data.customSections || data.customSections.length === 0) ? (
            <p className="text-xs text-neutral-400 italic">No custom sections added yet (e.g. Patents, Military Service, Interests).</p>
          ) : (
            <div className="space-y-3">
              {data.customSections.map((custom) => (
                <div key={custom.id} className="p-3.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={custom.title}
                      onChange={(e) => updateCustomSection(custom.id, 'title', e.target.value)}
                      placeholder="Section Title (e.g. Security Clearances, Patents)"
                      className="w-full mr-3 px-2.5 py-1.5 text-xs font-bold bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeCustomSection(custom.id)}
                      className="p-1 text-neutral-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={custom.content}
                    onChange={(e) => updateCustomSection(custom.id, 'content', e.target.value)}
                    placeholder="Enter details, accomplishments, or descriptive items..."
                    className="w-full p-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 9: SECTION ORDER & VISIBILITY */}
      {activeTab === 'reorder' && (
        <div className="space-y-4">
          <p className="text-xs text-neutral-500">
            Reorder sections or toggle their visibility in the exported document.
          </p>

          <div className="space-y-2">
            {data.sectionsOrder.map((section, idx) => (
              <div 
                key={section.id}
                className="flex items-center justify-between p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs"
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleSectionEnabled(section.id)}
                    className={`p-1.5 rounded-md transition-colors ${section.enabled ? 'text-blue-600 bg-blue-50 dark:bg-blue-950' : 'text-neutral-400 bg-neutral-100 dark:bg-neutral-800'}`}
                    title={section.enabled ? 'Hide Section' : 'Show Section'}
                  >
                    {section.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <div>
                    <span className={`font-semibold ${section.enabled ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400 line-through'}`}>
                      {section.title}
                    </span>
                    <span className="text-[10px] text-neutral-400 ml-2 font-mono">({section.id})</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveSectionOrder(idx, 'up')}
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === data.sectionsOrder.length - 1}
                    onClick={() => moveSectionOrder(idx, 'down')}
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
