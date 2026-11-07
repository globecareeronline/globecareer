import React, { useState, useEffect, useRef } from 'react';
import { ResumeData, SeniorityLevel, EmploymentType, TemplateId } from '../../types/resume';
import { COUNTRIES, getCountryById } from '../../data/countries';
import { JOB_CATEGORIES } from '../../data/jobCategories';
import { generateSampleResume, SamplePersonaType } from '../../data/sampleResumes';
import { analyzeResumeATS } from '../../utils/atsScorer';
import { getCountryTemplateRecommendation } from '../../utils/countryTemplates';

import { PersonalEditor } from '../editor/PersonalEditor';
import { SummaryEditor } from '../editor/SummaryEditor';
import { ExperienceEditor } from '../editor/ExperienceEditor';
import { EducationEditor } from '../editor/EducationEditor';
import { SkillsEditor } from '../editor/SkillsEditor';
import { AdditionalSectionsEditor } from '../editor/AdditionalSectionsEditor';
import { DesignCustomizer } from '../editor/DesignCustomizer';
import { ResumeRenderer } from '../templates/ResumeRenderer';
import { ATSJobMatcherModal } from '../ats/ATSJobMatcherModal';
import { WorkflowNavigation, WorkflowStep } from '../common/WorkflowNavigation';
import { UnifiedDownloadButton, DownloadFormatOption } from '../common/UnifiedDownloadButton';
import { exportResumeToDocx, exportResumeToTxt, exportResumeToHtml } from '../../utils/documentExport';
import { useTranslation } from '../../context/LanguageContext';

import confetti from 'canvas-confetti';
import { 
  Download, Printer, Undo2, Redo2, Sparkles, FileText, 
  Settings, ZoomIn, ZoomOut, RotateCcw, Save, Upload, 
  Check, AlertTriangle, Layers, User, Briefcase, GraduationCap, 
  Wrench, Globe, ArrowRight, Cloud, CheckCircle2, X
} from 'lucide-react';

interface ResumeBuilderViewProps {
  initialResumeData?: ResumeData;
  onDataChange?: (data: ResumeData) => void;
  onOpenCloudResumes?: () => void;
}

type EditorTab = 
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'more'
  | 'design';

export const ResumeBuilderView: React.FC<ResumeBuilderViewProps> = ({
  initialResumeData,
  onDataChange,
  onOpenCloudResumes
}) => {
  const { t } = useTranslation();

  // Current active resume data state
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    if (initialResumeData) return initialResumeData;
    const saved = localStorage.getItem('globecareer_resume_data') || localStorage.getItem('globecv_resume_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return generateSampleResume('us', 'experienced');
  });

  // Undo / Redo history stack
  const [history, setHistory] = useState<ResumeData[]>([resumeData]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isUndoRedoAction = useRef(false);

  // Active section tab
  const [activeTab, setActiveTab] = useState<EditorTab>('personal');

  // Preview zoom level
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);

  // Preview container ref for section-aware scrolling
  const previewScrollRef = useRef<HTMLDivElement>(null);

  // Modals & indicators
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('Auto-saved locally');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  const country = getCountryById(resumeData.targetCountryId);
  const atsResult = analyzeResumeATS(resumeData);

  // Workflow steps definition
  const WORKFLOW_STEPS: WorkflowStep[] = [
    { id: 'personal', label: t('builder.stepPersonal', 'Personal'), description: 'Contact & personal details' },
    { id: 'summary', label: t('builder.stepSummary', 'Summary'), description: 'Professional objective' },
    { id: 'experience', label: t('builder.stepExperience', 'Experience'), description: 'Work history' },
    { id: 'education', label: t('builder.stepEducation', 'Education'), description: 'Degrees & schools' },
    { id: 'skills', label: t('builder.stepSkills', 'Skills'), description: 'Technical & soft competencies' },
    { id: 'more', label: t('builder.stepMore', 'More'), description: 'Certifications & languages' },
    { id: 'design', label: t('builder.stepDesign', 'Design'), description: 'Template & typography' },
  ];

  // Auto-scroll preview to the section currently being edited
  useEffect(() => {
    if (!previewScrollRef.current) return;
    const targetSection = activeTab === 'design' ? 'personal' : activeTab;
    const sectionEl = previewScrollRef.current.querySelector<HTMLElement>(`[data-resume-section="${targetSection}"]`);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      sectionEl.classList.add('ring-2', 'ring-blue-500/50', 'rounded-lg', 'transition-all');
      const timer = setTimeout(() => {
        sectionEl.classList.remove('ring-2', 'ring-blue-500/50');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  // Sync to local storage & parent
  useEffect(() => {
    localStorage.setItem('globecareer_resume_data', JSON.stringify(resumeData));
    localStorage.setItem('globecv_resume_data', JSON.stringify(resumeData));
    onDataChange?.(resumeData);

    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }

    // Push to undo stack
    setHistory(prev => {
      const newHist = prev.slice(0, historyIndex + 1);
      newHist.push(resumeData);
      return newHist.slice(-25); // retain last 25 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 24));
    setSaveStatus('Saved');
    const timer = setTimeout(() => setSaveStatus('All changes saved'), 2000);
    return () => clearTimeout(timer);
  }, [resumeData]);

  // Undo / Redo Handlers
  const handleUndo = () => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const targetIndex = historyIndex - 1;
      setHistoryIndex(targetIndex);
      setResumeData(history[targetIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const targetIndex = historyIndex + 1;
      setHistoryIndex(targetIndex);
      setResumeData(history[targetIndex]);
    }
  };

  // Change Country handler: adapts paper size, photo defaults, phone code, and legal notices
  const handleCountryChange = (newCountryId: string) => {
    const newCountry = getCountryById(newCountryId);
    const rec = getCountryTemplateRecommendation(newCountryId);
    const shouldShowPhoto = rec.formattingNotes.photoIsStandard;

    const updated: ResumeData = {
      ...resumeData,
      targetCountryId: newCountryId,
      design: {
        ...resumeData.design,
        paperSize: newCountry.paperSize,
        showPhoto: shouldShowPhoto,
        templateId: rec.templateId
      },
      personal: {
        ...resumeData.personal,
        country: newCountry.name,
        hasPhoto: shouldShowPhoto,
        phone: resumeData.personal.phone?.startsWith('+') 
          ? `${newCountry.phonePrefix} ${resumeData.personal.phone.split(' ').slice(1).join(' ')}` 
          : `${newCountry.phonePrefix} 555-0149`,
        gdprConsentClause: newCountry.personalDataRules.requiresGDPRClause ? newCountry.personalDataRules.gdprClauseText : undefined
      }
    };
    setResumeData(updated);
  };

  // Reset to blank or sample
  const handleLoadSample = (persona: SamplePersonaType = 'experienced') => {
    const sample = generateSampleResume(resumeData.targetCountryId, persona, resumeData.targetJobCategory);
    setResumeData(sample);
  };

  const handleResetBlank = () => {
    if (window.confirm('Reset resume to a blank canvas? Entered information will be cleared.')) {
      const blank: ResumeData = {
        id: `resume-${Date.now()}`,
        targetCountryId: resumeData.targetCountryId,
        targetJobCategory: resumeData.targetJobCategory,
        seniority: 'Mid-Level (3-6 yrs)',
        employmentType: 'Full-time',
        lastModified: Date.now(),
        personal: {
          fullName: '',
          jobTitle: '',
          email: '',
          phone: `${country.phonePrefix} `,
          city: '',
          stateOrRegion: '',
          country: country.name,
          hasPhoto: false
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        certifications: [],
        projects: [],
        languages: [],
        awards: [],
        volunteer: [],
        publications: [],
        references: [],
        referencesUponRequestOnly: true,
        customSections: [],
        sectionsOrder: [
          { id: 'summary', title: 'Professional Summary', enabled: true },
          { id: 'experience', title: 'Work Experience', enabled: true },
          { id: 'education', title: 'Education', enabled: true },
          { id: 'skills', title: 'Skills & Competencies', enabled: true },
          { id: 'certifications', title: 'Certifications', enabled: true },
          { id: 'projects', title: 'Projects', enabled: true },
          { id: 'languages', title: 'Languages', enabled: true },
          { id: 'references', title: 'References', enabled: true }
        ],
        design: {
          templateId: 'ats_classic',
          fontFamily: 'sans',
          fontSize: 'normal',
          spacing: 'normal',
          accentColor: '#1e3a8a',
          paperSize: country.paperSize,
          showPhoto: false,
          photoShape: 'circle',
          photoPosition: 'top-right'
        }
      };
      setResumeData(blank);
    }
  };

  // Export Handlers
  const handlePrintPDF = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.85 }
      });
    } catch (e) {
      // ignore
    }
    const originalTitle = document.title;
    document.title = `${resumeData.personal.fullName || 'Resume'}_${country.name}_CV`;
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const handleDownloadDocx = () => {
    const filename = `${resumeData.personal.fullName || 'Resume'}_${country.name}_${resumeData.design.templateId}`;
    exportResumeToDocx(resumeData, filename);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.85 }
      });
    } catch (e) {
      // ignore
    }
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GlobeCareer_${resumeData.personal.fullName || 'Draft'}_Backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFinishResume = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
    setShowCompletionModal(true);
  };

  const downloadFormats: DownloadFormatOption[] = [
    {
      id: 'pdf',
      label: 'Vector PDF Document',
      extension: '.pdf',
      description: 'Print-ready vector PDF formatted for direct applications',
      badge: 'Recommended',
      isPrimary: true,
      onExport: () => handlePrintPDF()
    },
    {
      id: 'docx',
      label: 'Microsoft Word (.docx)',
      extension: '.docx',
      description: 'Native editable Word document with structured headers and tables',
      badge: 'Editable',
      onExport: () => handleDownloadDocx()
    },
    {
      id: 'txt',
      label: 'Clean ATS Plain Text',
      extension: '.txt',
      description: 'Standard text layout optimized for corporate applicant tracking systems',
      badge: 'ATS-Friendly',
      onExport: () => {
        const filename = `${resumeData.personal.fullName || 'Resume'}_${country.name}_ATS`;
        exportResumeToTxt(resumeData, filename);
      }
    },
    {
      id: 'html',
      label: 'Standalone Web Resume',
      extension: '.html',
      description: 'Self-contained HTML file viewable in any web browser without software',
      badge: 'Web',
      onExport: () => {
        const filename = `${resumeData.personal.fullName || 'Resume'}_${country.name}_Web`;
        exportResumeToHtml(resumeData, filename);
      }
    },
    {
      id: 'json',
      label: 'GlobeCareer JSON Backup',
      extension: '.json',
      description: 'Full data backup to restore or transfer to other devices',
      badge: 'Backup',
      onExport: () => handleDownloadJSON()
    }
  ];

  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (!parsed.personal || !parsed.targetCountryId) {
        throw new Error('Invalid GlobeCareer resume JSON schema.');
      }
      setResumeData(parsed);
      setShowImportModal(false);
      setImportJsonText('');
      setImportError('');
    } catch (err: any) {
      setImportError(err.message || 'Invalid JSON format. Please verify and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex flex-col">
      {/* Top Application Ribbon */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 py-2.5 sticky top-0 z-30 shadow-xs no-print">
        <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left Controls: Country & Job Repertoire */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Country Selector */}
            <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2.5 py-1.5 rounded-xl shadow-xs">
              <span className="text-base">{country.flag}</span>
              <select
                value={resumeData.targetCountryId}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="bg-transparent text-xs font-bold text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer pr-1"
              >
                {COUNTRIES.map(c => (
                  <option key={c.id} value={c.id} className="dark:bg-neutral-900">
                    {c.name} ({c.cvTerminology})
                  </option>
                ))}
              </select>
            </div>

            {/* Job Category Selector */}
            <select
              value={resumeData.targetJobCategory}
              onChange={(e) => setResumeData({ ...resumeData, targetJobCategory: e.target.value })}
              className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold px-2.5 py-1.5 rounded-xl text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer shadow-xs max-w-[190px] truncate"
            >
              {JOB_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id} className="dark:bg-neutral-900">
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Undo / Redo */}
            <div className="flex items-center gap-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-0.5">
              <button
                type="button"
                disabled={historyIndex <= 0}
                onClick={handleUndo}
                className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 disabled:opacity-30 rounded transition-colors"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={historyIndex >= history.length - 1}
                onClick={handleRedo}
                className="p-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 disabled:opacity-30 rounded transition-colors"
                title="Redo (Ctrl+Y)"
              >
                <Redo2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-[11px] text-neutral-400 font-medium hidden xl:inline">
              {saveStatus}
            </span>
          </div>

          {/* Right Action Tools: ATS Score, Samples, Export DOCX, Print PDF */}
          <div className="flex items-center gap-2">
            {/* ATS Score Button */}
            <button
              type="button"
              onClick={() => setIsATSModalOpen(true)}
              className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-xl hover:bg-blue-100 flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('ats.badge', 'ATS Score')}: {atsResult.score}/100</span>
            </button>

            {/* Load Sample Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="px-2.5 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 flex items-center gap-1 transition-colors"
              >
                <Sparkles className="w-3 h-3 text-neutral-400" />
                Fill Sample
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl py-1 hidden group-hover:block z-40 text-xs">
                <button
                  type="button"
                  onClick={() => handleLoadSample('experienced')}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  Senior Professional
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('graduate')}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  Recent Graduate
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('career_changer')}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  Career Transition
                </button>
                <div className="border-t border-neutral-100 dark:border-neutral-800 my-1"></div>
                <button
                  type="button"
                  onClick={handleResetBlank}
                  className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600"
                >
                  Reset to Blank Canvas
                </button>
              </div>
            </div>

            {/* Cloud Resumes */}
            <button
              type="button"
              onClick={onOpenCloudResumes}
              className="px-2.5 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title={t('nav.cloudResumes', 'Cloud Resumes')}
            >
              <Cloud className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden md:inline">{t('nav.cloudResumes', 'Cloud Resumes')}</span>
            </button>

            {/* Backup JSON dropdown */}
            <div className="relative group hidden sm:block">
              <button
                type="button"
                className="p-1.5 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                title="Backup / Import"
              >
                <Upload className="w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl py-1 hidden group-hover:block z-40 text-xs">
                <button
                  type="button"
                  onClick={handleDownloadJSON}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  Download JSON Backup
                </button>
                <button
                  type="button"
                  onClick={() => setShowImportModal(true)}
                  className="w-full text-left px-3 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  Import JSON Draft
                </button>
              </div>
            </div>

            {/* Unified Download Button */}
            <UnifiedDownloadButton
              documentTitle="Resume"
              formats={downloadFormats}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Main Workspace Split View */}
      <div className="max-w-[1700px] mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:divide-x divide-neutral-200 dark:divide-neutral-800 print:block print:w-full print:m-0 print:p-0">
        {/* LEFT COLUMN: EDITOR SECTIONS */}
        <div className="lg:col-span-5 xl:col-span-5 bg-white dark:bg-neutral-900 flex flex-col h-[calc(100vh-55px)] overflow-hidden no-print">
          {/* Sub-navigation tabs */}
          <div className="flex items-center gap-1 p-2 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto no-scrollbar shrink-0 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'personal' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              {t('builder.stepPersonal', 'Personal')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('summary')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'summary' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              {t('builder.stepSummary', 'Summary')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'experience' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              {t('builder.stepExperience', 'Experience')} ({resumeData.experience?.length || 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'education' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              {t('builder.stepEducation', 'Education')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'skills' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              {t('builder.stepSkills', 'Skills')} ({resumeData.skills?.length || 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('more')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'more' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {t('builder.stepMore', 'More')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('design')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'design' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              {t('builder.stepDesign', 'Design')}
            </button>
          </div>

          {/* Tab content area */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {activeTab === 'personal' && (
              <PersonalEditor data={resumeData} onChange={setResumeData} />
            )}
            {activeTab === 'summary' && (
              <SummaryEditor data={resumeData} onChange={setResumeData} />
            )}
            {activeTab === 'experience' && (
              <ExperienceEditor data={resumeData} onChange={setResumeData} />
            )}
            {activeTab === 'education' && (
              <EducationEditor data={resumeData} onChange={setResumeData} />
            )}
            {activeTab === 'skills' && (
              <SkillsEditor data={resumeData} onChange={setResumeData} />
            )}
            {activeTab === 'more' && (
              <AdditionalSectionsEditor data={resumeData} onChange={setResumeData} />
            )}
            {activeTab === 'design' && (
              <DesignCustomizer data={resumeData} onChange={setResumeData} />
            )}

            {/* Guided Step-by-Step Workflow Navigation */}
            <WorkflowNavigation
              steps={WORKFLOW_STEPS}
              currentStepId={activeTab}
              onStepChange={(stepId) => setActiveTab(stepId as EditorTab)}
              onFinish={handleFinishResume}
              finishLabel="Complete & Preview Resume"
              className="mt-8 pb-24"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE RESUME PREVIEW */}
        <div className="lg:col-span-7 xl:col-span-7 bg-neutral-200/70 dark:bg-neutral-950 flex flex-col h-[calc(100vh-55px)] overflow-hidden print:h-auto print:overflow-visible print:bg-white print:p-0 print:m-0 print:block print:w-full">
          {/* Preview Toolbar */}
          <div className="p-3 bg-neutral-100/90 dark:bg-neutral-900/90 border-b border-neutral-300 dark:border-neutral-800 flex items-center justify-between gap-4 shrink-0 no-print">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Live Document Preview
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">
                [{country.paperSize.toUpperCase()}] · {country.cvTerminology}
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-2 py-1 rounded-xl shadow-xs">
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.max(0.5, prev - 0.1))}
                className="p-1 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.min(1.3, prev + 0.1))}
                className="p-1 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(0.85)}
                className="text-[10px] text-neutral-400 hover:text-neutral-600 pl-1 border-l"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Scaled Render Container with Section Auto-Scroll Ref */}
          <div 
            ref={previewScrollRef}
            className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center items-start print:overflow-visible print:p-0 print:m-0 print:block print:w-full scroll-smooth"
          >
            <ResumeRenderer data={resumeData} scale={zoomLevel} />
          </div>
        </div>
      </div>

      {/* ATS Job Matcher & Scanner Modal */}
      <ATSJobMatcherModal
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
        data={resumeData}
      />

      {/* Import JSON Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl p-6 space-y-4 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Import GlobeCareer JSON Draft
            </h3>
            <p className="text-xs text-neutral-500">
              Paste your previously exported GlobeCareer JSON payload below to restore your work:
            </p>
            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='Paste JSON here (e.g. { "personal": { ... } })'
              className="w-full p-3 font-mono text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none"
            />
            {importError && (
              <p className="text-xs text-red-600 font-medium">{importError}</p>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportJSON}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Import Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion & Preview Celebration Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 space-y-6 border border-neutral-200 dark:border-neutral-800 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowCompletionModal(false)}
              className="absolute top-5 right-5 p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Workflow Completed
                </span>
                <h3 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100">
                  Your Resume is Ready!
                </h3>
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Congratulations! Your CV is formatted for <strong>{country.name}</strong> standards, calibrated for applicant tracking systems, and ready for job applications.
            </p>

            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Applicant:</span>
                <span className="font-bold text-neutral-800 dark:text-neutral-200">{resumeData.personal.fullName || 'Alex Rivera'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Target Country:</span>
                <span className="font-semibold">{country.flag} {country.name} ({country.paperSize.toUpperCase()})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">ATS Score:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{atsResult.score} / 100 ({atsResult.score >= 80 ? 'ATS High Match' : atsResult.score >= 60 ? 'Good' : 'Needs Optimization'})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Selected Template:</span>
                <span className="font-mono text-[11px] font-semibold">{resumeData.design.templateId}</span>
              </div>
            </div>

            {/* Quick Export Choices */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Quick Download Options
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    handlePrintPDF();
                    setShowCompletionModal(false);
                  }}
                  className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span>Download PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDownloadDocx();
                    setShowCompletionModal(false);
                  }}
                  className="p-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Download DOCX</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setShowCompletionModal(false);
                  setIsATSModalOpen(true);
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Review Full ATS Report</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCompletionModal(false)}
                className="px-4 py-2 text-xs font-bold bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl transition-colors cursor-pointer"
              >
                Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
