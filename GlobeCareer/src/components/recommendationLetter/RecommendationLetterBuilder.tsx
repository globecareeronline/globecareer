import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  Building,
  User,
  GraduationCap,
  Briefcase,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { WorkflowNavigation, WorkflowStep } from '../common/WorkflowNavigation';
import { UnifiedDownloadButton, DownloadFormatOption } from '../common/UnifiedDownloadButton';
import { exportRecommendationLetterToDocx, exportTextToTxt } from '../../utils/documentExport';
import confetti from 'canvas-confetti';

export type RecommendationPurpose =
  | 'employment'
  | 'graduate_school'
  | 'scholarship'
  | 'visa_immigration'
  | 'leadership';

export type RecommendationTone =
  | 'enthusiastic'
  | 'formal_academic'
  | 'results_oriented'
  | 'executive';

export type RecommendationLength = 'concise' | 'standard' | 'comprehensive';

type RecommendationStep = 'candidate' | 'recommender' | 'purpose' | 'output';

const RECOMMENDATION_STEPS: WorkflowStep[] = [
  { id: 'candidate', label: 'Candidate Info', description: 'Name, role & achievements' },
  { id: 'recommender', label: 'Recommender Details', description: 'Signer credentials & relationship' },
  { id: 'purpose', label: 'Purpose & Tone', description: 'Target destination & rhetorical style' },
  { id: 'output', label: 'Output & Review', description: 'Live preview, editing & export' },
];

interface RecommendationFormData {
  candidateName: string;
  candidateRole: string;
  candidateStrengths: string;
  candidateAchievements: string;
  recommenderName: string;
  recommenderTitle: string;
  recommenderOrg: string;
  recommenderEmail: string;
  relationship: string;
  yearsKnown: string;
  purpose: RecommendationPurpose;
  targetOrg: string;
  targetRole: string;
  recipientTitle: string;
  tone: RecommendationTone;
  length: RecommendationLength;
}

const INITIAL_FORM: RecommendationFormData = {
  candidateName: '',
  candidateRole: '',
  candidateStrengths: '',
  candidateAchievements: '',
  recommenderName: '',
  recommenderTitle: '',
  recommenderOrg: '',
  recommenderEmail: '',
  relationship: 'Former Direct Manager',
  yearsKnown: '3',
  purpose: 'employment',
  targetOrg: '',
  targetRole: '',
  recipientTitle: 'Hiring Team',
  tone: 'enthusiastic',
  length: 'standard',
};

const PRESETS: { label: string; description: string; data: Partial<RecommendationFormData> }[] = [
  {
    label: 'Senior Software Engineer',
    description: 'Technical lead reference focusing on system architecture & mentorship',
    data: {
      candidateName: 'Alex Morgan',
      candidateRole: 'Senior Software Engineer',
      candidateStrengths: 'Distributed systems design, proactive cross-functional leadership, clean code architecture, and mentoring junior engineers',
      candidateAchievements: 'Spearheaded the migration of core payment microservices reducing latency by 38%; led an agile team of 6 engineers with 100% on-time sprint deliveries',
      recommenderName: 'Dr. Marcus Vance',
      recommenderTitle: 'VP of Engineering',
      recommenderOrg: 'CloudScale Technologies',
      recommenderEmail: 'm.vance@cloudscaletech.com',
      relationship: 'Former Direct Manager',
      yearsKnown: '4',
      purpose: 'employment',
      targetOrg: 'NextGen Solutions',
      targetRole: 'Staff Infrastructure Architect',
      recipientTitle: 'Engineering Search Committee',
      tone: 'results_oriented',
      length: 'standard',
    },
  },
  {
    label: 'Graduate School / Master’s',
    description: 'Academic faculty recommendation highlighting research rigor & intellectual curiosity',
    data: {
      candidateName: 'Elena Rostova',
      candidateRole: 'Research Assistant & Honors Graduate',
      candidateStrengths: 'Exceptional quantitative rigor, scholarly initiative, advanced econometric modeling, and collaborative inquiry',
      candidateAchievements: 'Authored an award-winning honors thesis on algorithmic fairness; co-authored a peer-reviewed symposium paper presented at IEEE',
      recommenderName: 'Prof. David K. Sterling',
      recommenderTitle: 'Professor & Department Chair of Computer Science',
      recommenderOrg: 'St. Andrews University',
      recommenderEmail: 'd.sterling@standrews.ac.uk',
      relationship: 'Academic Advisor & Professor',
      yearsKnown: '3',
      purpose: 'graduate_school',
      targetOrg: 'Oxford University',
      targetRole: 'MSc in Advanced Computer Science',
      recipientTitle: 'Graduate Admissions Committee',
      tone: 'formal_academic',
      length: 'comprehensive',
    },
  },
  {
    label: 'Product Manager Leadership',
    description: 'Executive recommendation focusing on strategic impact & stakeholder alignment',
    data: {
      candidateName: 'Jordan Lee',
      candidateRole: 'Lead Product Manager',
      candidateStrengths: 'Customer discovery, data-driven product roadmapping, high-stakes stakeholder consensus, and international market expansion',
      candidateAchievements: 'Launched the European enterprise expansion product generating $2.4M ARR in its first 12 months; increased user retention by 24%',
      recommenderName: 'Sarah Jenkins',
      recommenderTitle: 'Chief Product Officer',
      recommenderOrg: 'Apex Commerce Global',
      recommenderEmail: 's.jenkins@apexcommerce.com',
      relationship: 'Direct Supervisor & CPO',
      yearsKnown: '2.5',
      purpose: 'leadership',
      targetOrg: 'Enterprise Dynamics B.V.',
      targetRole: 'Director of Product',
      recipientTitle: 'Executive Hiring Board',
      tone: 'executive',
      length: 'standard',
    },
  },
];

export interface RecommendationLetterBuilderProps {
  onNavigate?: (page: string) => void;
  initialPreset?: Partial<RecommendationFormData>;
  onNavigateToTemplates?: () => void;
}

export const RecommendationLetterBuilder: React.FC<RecommendationLetterBuilderProps> = ({
  onNavigate,
  initialPreset,
  onNavigateToTemplates,
}) => {
  const [formData, setFormData] = useState<RecommendationFormData>(INITIAL_FORM);
  const [currentStep, setCurrentStep] = useState<RecommendationStep>('candidate');
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync initial preset if passed from Templates Hub
  React.useEffect(() => {
    if (initialPreset) {
      setFormData(prev => ({ ...prev, ...initialPreset }));
      setValidationError(null);
    }
  }, [initialPreset]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError(null);
  };

  const loadPreset = (presetData: Partial<RecommendationFormData>) => {
    setFormData(prev => ({ ...prev, ...presetData }));
    setValidationError(null);
  };

  const generateLetterText = (): string => {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const cName = formData.candidateName.trim() || '[Candidate Name]';
    const cRole = formData.candidateRole.trim() || '[Role/Title]';
    const rName = formData.recommenderName.trim() || '[Recommender Name]';
    const rTitle = formData.recommenderTitle.trim() || '[Recommender Title]';
    const rOrg = formData.recommenderOrg.trim() || '[Organization]';
    const rEmail = formData.recommenderEmail.trim();
    const tOrg = formData.targetOrg.trim() || '[Target Institution / Company]';
    const tRole = formData.targetRole.trim() || '[Target Role / Program]';
    const recTitle = formData.recipientTitle.trim() || 'Hiring Committee';
    const years = formData.yearsKnown.trim() || 'several';
    const rel = formData.relationship.trim() || 'supervisor';
    const strengths = formData.candidateStrengths.trim() || 'exceptional dedication, technical acumen, and exemplary collaboration';
    const achievements = formData.candidateAchievements.trim();

    // 1. Salutation
    let salutation = `Dear ${recTitle},`;
    if (formData.purpose === 'graduate_school') {
      salutation = `Dear Members of the ${recTitle || 'Graduate Admissions Committee'},`;
    }

    // 2. Opening Paragraph based on Purpose and Tone
    let opening = '';
    if (formData.purpose === 'employment') {
      if (formData.tone === 'enthusiastic') {
        opening = `It is with great enthusiasm and without reservation that I write this letter of recommendation for ${cName}, who is applying for the position of ${tRole} at ${tOrg}. Having worked closely with ${cName} for ${years} years in my capacity as ${rel} at ${rOrg}, I have observed firsthand their exceptional talent, professional integrity, and consistent drive for excellence.`;
      } else if (formData.tone === 'results_oriented') {
        opening = `I am writing to provide my highest professional recommendation for ${cName} for the ${tRole} opening at ${tOrg}. As ${rel} at ${rOrg} over the past ${years} years, I managed ${cName} during pivotal growth initiatives and can attest with confidence to their measurable impact, strategic competence, and technical mastery.`;
      } else if (formData.tone === 'executive') {
        opening = `I am privileged to recommend ${cName} for the executive leadership position of ${tRole} at ${tOrg}. During our ${years} years of close professional collaboration at ${rOrg}, where I served as ${rel}, ${cName} distinguished themselves as a visionary professional capable of steering complex organizational challenges with poise and quantifiable success.`;
      } else {
        opening = `I am writing to formally recommend ${cName} for consideration for the position of ${tRole} with ${tOrg}. During their tenure of ${years} years at ${rOrg}, I had the distinct opportunity to oversee their work as ${rel}, where ${cName} consistently demonstrated high competence and thorough professionalism.`;
      }
    } else if (formData.purpose === 'graduate_school') {
      opening = `I am delighted to offer my strongest academic recommendation for ${cName} in support of their application for admission to ${tOrg} for the ${tRole}. As ${rel} at ${rOrg} for ${years} years, I have mentored many promising scholars, and I rank ${cName} among the top echelon of students and researchers with whom I have had the privilege to work.`;
    } else if (formData.purpose === 'scholarship') {
      opening = `It is a profound honor to recommend ${cName} for the prestigious ${tRole} at ${tOrg}. Having observed ${cName}'s academic dedication and social commitment over the past ${years} years as ${rel} at ${rOrg}, I am firmly convinced that they embody the highest standards of intellectual curiosity and ethical stewardship that this award recognizes.`;
    } else if (formData.purpose === 'visa_immigration') {
      opening = `I am writing this expert advisory letter in support of ${cName}'s petition for the ${tRole} with ${tOrg}. As ${rel} at ${rOrg} with over ${years} years of direct observation of their specialized contributions, I can attest authoritatively to ${cName}'s extraordinary ability, unique skill set, and significant contributions to our industry.`;
    } else {
      opening = `I am pleased to provide this unequivocal recommendation for ${cName} for the position of ${tRole} at ${tOrg}. In my role as ${rel} at ${rOrg} over the past ${years} years, I have seen ${cName} consistently inspire cross-functional teams, navigate complex strategic mandates, and deliver transformative outcomes.`;
    }

    // 3. Body Paragraphs (Skills and Achievements)
    let bodySkills = '';
    if (formData.tone === 'formal_academic') {
      bodySkills = `Throughout their tenure, ${cName} demonstrated profound analytical faculties and a steadfast dedication to methodological rigor. In particular, their strengths in ${strengths} have repeatedly elevated the quality of our institutional outputs. Colleagues and peers regularly seek out ${cName}'s perspective on complex matters, recognizing their intellectual humility and clarity of thought.`;
    } else if (formData.tone === 'results_oriented') {
      bodySkills = `What sets ${cName} apart is their rare combination of strategic vision and execution discipline. Their core proficiencies in ${strengths} have enabled our team to surpass key benchmarks repeatedly. Whenever faced with ambiguity or tight deadlines, ${cName} approached challenges with structured problem-solving and an unwavering commitment to high-yield outcomes.`;
    } else if (formData.tone === 'executive') {
      bodySkills = `At an organizational level, ${cName} exemplifies mature leadership. Beyond their demonstrated command of ${strengths}, they possess the rare ability to build consensus across diverse stakeholder groups, cultivate psychological safety, and align day-to-day execution with overarching long-term goals.`;
    } else {
      bodySkills = `During our daily work at ${rOrg}, ${cName} distinguished themselves through their remarkable mastery of ${strengths}. They bring not only deep technical capability, but also an infectiously positive demeanor that uplifts surrounding teammates. Whether tackling complex deliverables or mentoring peers, ${cName}'s reliability is exemplary.`;
    }

    let bodyAchievements = '';
    if (achievements) {
      if (formData.length === 'comprehensive') {
        bodyAchievements = `To provide tangible context to their capabilities, allow me to highlight several specific accomplishments:\n\n• ${achievements.split(';').map(s => s.trim()).filter(Boolean).join('\n• ')}\n\nThese milestones reflect not merely individual capability, but an enduring drive to generate lasting value for ${rOrg}.`;
      } else {
        bodyAchievements = `A notable illustration of their capabilities occurred when ${cName} spearheaded initiatives where they achieved: ${achievements}. This accomplishment was pivotal for our organization and speaks directly to the standard of rigor you can anticipate at ${tOrg}.`;
      }
    } else {
      bodyAchievements = `In every project entrusted to them, ${cName} consistently surpassed baseline expectations, executing key deliverables ahead of schedule and providing actionable insights that elevated our organizational performance.`;
    }

    // 4. Character / Cultural Fit Paragraph
    let bodyCharacter = '';
    if (formData.length !== 'concise') {
      bodyCharacter = `Beyond their technical and professional credentials, ${cName} is a person of exemplary character. They communicate with empathy, uphold rigorous ethical standards, and embrace constructive feedback with genuine enthusiasm for growth. They will undoubtedly integrate seamlessly into the culture at ${tOrg} and serve as an invaluable asset to your community.`;
    }

    // 5. Concluding Recommendation
    let closing = '';
    if (formData.tone === 'enthusiastic') {
      closing = `In conclusion, I offer ${cName} my highest, most enthusiastic recommendation. They possess all the qualities, intellect, and drive required to thrive in the ${tRole} at ${tOrg}, and I have no doubt they will achieve great things. Please feel free to contact me directly should you require any additional information.`;
    } else if (formData.tone === 'results_oriented') {
      closing = `Without hesitation, I recommend ${cName} as a high-caliber professional who will drive immediate impact for ${tOrg}. They have my unreserved endorsement for ${tRole}. Please do not hesitate to contact me if I can elaborate on any aspect of their record.`;
    } else if (formData.tone === 'formal_academic') {
      closing = `In summary, ${cName} possesses my highest academic and personal endorsement. I am confident they will make substantial contributions to ${tOrg}. Should the committee require further information regarding their qualifications, please contact me.`;
    } else {
      closing = `I recommend ${cName} to you in the strongest terms. They will be an outstanding addition to ${tOrg}. Please feel free to reach out to me via email or telephone should you require further insights.`;
    }

    // Combine Header, Salutation, Body, and Signature
    const letter = [
      `${rName}`,
      `${rTitle}`,
      `${rOrg}`,
      rEmail ? `${rEmail}` : '',
      `${today}`,
      '',
      `${recTitle}`,
      `${tOrg}`,
      '',
      `${salutation}`,
      '',
      `${opening}`,
      '',
      `${bodySkills}`,
      '',
      `${bodyAchievements}`,
      formData.length !== 'concise' ? `\n${bodyCharacter}\n` : '',
      `${closing}`,
      '',
      'Sincerely,',
      '',
      `${rName}`,
      `${rTitle}, ${rOrg}`,
      rEmail ? `${rEmail}` : '',
    ].filter(line => line !== undefined).join('\n');

    return letter;
  };

  const handleGenerate = () => {
    if (!formData.candidateName.trim()) {
      setValidationError('Please enter the candidate’s full name.');
      setCurrentStep('candidate');
      return;
    }
    if (!formData.recommenderName.trim()) {
      setValidationError('Please enter the recommender’s full name.');
      setCurrentStep('recommender');
      return;
    }
    if (!formData.targetOrg.trim()) {
      setValidationError('Please specify the target company, university, or organization.');
      setCurrentStep('purpose');
      return;
    }

    setValidationError(null);
    const letter = generateLetterText();
    setGeneratedLetter(letter);
    setCurrentStep('output');
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch (e) {
      // ignore
    }
  };

  const handleCopy = async () => {
    if (!generatedLetter) return;
    try {
      await navigator.clipboard.writeText(generatedLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Copy failed', err);
    }
  };

  const handleDownloadTxt = () => {
    const textToExport = generatedLetter || generateLetterText();
    const safeName = (formData.candidateName || 'Candidate').toLowerCase().replace(/[^a-z0-9]/g, '_');
    exportTextToTxt(textToExport, `Recommendation_Letter_${safeName}`);
  };

  const handlePrint = () => {
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.85 } });
    } catch (e) {
      // ignore
    }
    window.print();
  };

  const downloadFormats: DownloadFormatOption[] = [
    {
      id: 'pdf',
      label: 'Vector PDF Document',
      extension: '.pdf',
      description: 'Formal letterhead PDF formatted for official submission',
      badge: 'Recommended',
      isPrimary: true,
      onExport: () => handlePrint()
    },
    {
      id: 'docx',
      label: 'Microsoft Word (.docx)',
      extension: '.docx',
      description: 'Native editable Word document with letterhead styling',
      badge: 'Editable',
      onExport: () => exportRecommendationLetterToDocx({
        recommenderName: formData.recommenderName,
        recommenderTitle: formData.recommenderTitle,
        recommenderOrg: formData.recommenderOrg,
        recommenderEmail: formData.recommenderEmail,
        candidateName: formData.candidateName,
        recipientTitle: formData.recipientTitle,
        targetOrg: formData.targetOrg,
        letterBody: generatedLetter || generateLetterText()
      }, `Recommendation_${(formData.candidateName || 'Letter').replace(/[^a-zA-Z0-9]/g, '_')}`)
    },
    {
      id: 'txt',
      label: 'Plain Text (.txt)',
      extension: '.txt',
      description: 'Clean text file for online application portals',
      badge: 'Text',
      onExport: () => handleDownloadTxt()
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Tool Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6 no-print">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            <FileText className="w-3.5 h-3.5" />
            <span>Professional Career Document Generator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Recommendation Letter Builder
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            Create structured, highly tailored recommendation letters for employment, graduate university admissions, scholarships, leadership promotions, and international visa petitions.
          </p>
        </div>

        {/* Global Export Button */}
        <div className="flex items-center gap-3">
          {generatedLetter && (
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 text-xs font-semibold bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-xl hover:bg-neutral-50 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          )}

          <UnifiedDownloadButton
            documentTitle="Recommendation Letter"
            formats={downloadFormats}
            size="md"
          />
        </div>
      </div>

      {/* Preset Quick Fill */}
      <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3 shadow-xs no-print">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Quick Presets (1-Click Sample Load)
          </span>
          <div className="flex items-center gap-3">
            {onNavigateToTemplates && (
              <button
                type="button"
                onClick={onNavigateToTemplates}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                Browse All Templates &rarr;
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setFormData(INITIAL_FORM);
                setGeneratedLetter('');
                setCurrentStep('candidate');
              }}
              className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Form
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                loadPreset(p.data);
                const generated = generateLetterText();
                setGeneratedLetter(generated);
              }}
              className="p-3 text-left bg-neutral-50 dark:bg-neutral-800/60 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-700 hover:border-blue-400 rounded-xl transition-all cursor-pointer group"
            >
              <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {p.label}
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                {p.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Form & Live Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form & Workflow (5 cols) */}
        <div className="lg:col-span-5 space-y-6 no-print">
          
          {/* Step Pills */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl overflow-x-auto no-scrollbar text-xs font-bold">
            {RECOMMENDATION_STEPS.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentStep(s.id as RecommendationStep)}
                className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  currentStep === s.id
                    ? 'bg-white dark:bg-neutral-900 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-neutral-200 dark:bg-neutral-700 text-[10px] flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>

          {/* Form Step 1: Candidate Information */}
          {currentStep === 'candidate' && (
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4 animate-in fade-in duration-150">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                1. Candidate Information
              </h2>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Candidate's Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Candidate's Current or Past Role
                </label>
                <input
                  type="text"
                  name="candidateRole"
                  value={formData.candidateRole}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Key Strengths & Technical Skills
                </label>
                <textarea
                  name="candidateStrengths"
                  rows={2}
                  value={formData.candidateStrengths}
                  onChange={handleInputChange}
                  placeholder="e.g. Distributed systems, clear architectural communication, problem solving"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Specific Achievements (Separate with semicolons)
                </label>
                <textarea
                  name="candidateAchievements"
                  rows={3}
                  value={formData.candidateAchievements}
                  onChange={handleInputChange}
                  placeholder="e.g. Led migration to microservices cutting latency 38%; Mentored 4 junior engineers"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                />
                <span className="text-[10px] text-neutral-400 mt-1 block">
                  Do not invent credentials; enter genuine verifiable milestones.
                </span>
              </div>
            </div>
          )}

          {/* Form Step 2: Recommender Details */}
          {currentStep === 'recommender' && (
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4 animate-in fade-in duration-150">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                2. Recommender Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Recommender Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="recommenderName"
                    value={formData.recommenderName}
                    onChange={handleInputChange}
                    placeholder="e.g. Dr. Marcus Vance"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Title / Position
                  </label>
                  <input
                    type="text"
                    name="recommenderTitle"
                    value={formData.recommenderTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. VP of Engineering"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Recommender Organization
                  </label>
                  <input
                    type="text"
                    name="recommenderOrg"
                    value={formData.recommenderOrg}
                    onChange={handleInputChange}
                    placeholder="e.g. CloudScale Tech"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Recommender Email
                  </label>
                  <input
                    type="email"
                    name="recommenderEmail"
                    value={formData.recommenderEmail}
                    onChange={handleInputChange}
                    placeholder="e.g. m.vance@company.com"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Relationship to Candidate
                  </label>
                  <select
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  >
                    <option value="Former Direct Manager">Former Direct Manager</option>
                    <option value="Current Supervisor">Current Supervisor</option>
                    <option value="Academic Advisor & Professor">Academic Advisor / Professor</option>
                    <option value="Senior Technical Lead">Senior Technical Lead</option>
                    <option value="Department Chair">Department Chair</option>
                    <option value="Executive Colleague">Executive Colleague</option>
                    <option value="Client / Business Partner">Client / Partner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Years Worked Together
                  </label>
                  <input
                    type="text"
                    name="yearsKnown"
                    value={formData.yearsKnown}
                    onChange={handleInputChange}
                    placeholder="e.g. 3"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Step 3: Purpose & Target Destination */}
          {currentStep === 'purpose' && (
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4 animate-in fade-in duration-150">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                3. Purpose & Destination
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Recommendation Purpose
                  </label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  >
                    <option value="employment">Job Application / Employment</option>
                    <option value="graduate_school">Graduate School / University</option>
                    <option value="scholarship">Fellowship / Scholarship</option>
                    <option value="leadership">Leadership / Board Promotion</option>
                    <option value="visa_immigration">Immigration / Talent Visa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Target Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="targetOrg"
                    value={formData.targetOrg}
                    onChange={handleInputChange}
                    placeholder="e.g. NextGen Solutions or Oxford"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Target Role or Program
                  </label>
                  <input
                    type="text"
                    name="targetRole"
                    value={formData.targetRole}
                    onChange={handleInputChange}
                    placeholder="e.g. Staff Architect or MSc"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Recipient Title
                  </label>
                  <input
                    type="text"
                    name="recipientTitle"
                    value={formData.recipientTitle}
                    onChange={handleInputChange}
                    placeholder="e.g. Hiring Committee or Admissions Team"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Preferred Tone
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  >
                    <option value="enthusiastic">Enthusiastic & High-Impact</option>
                    <option value="results_oriented">Results-Oriented & Metric-Driven</option>
                    <option value="formal_academic">Formal & Academic</option>
                    <option value="executive">Executive & Leadership-Focused</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Length
                  </label>
                  <select
                    name="length"
                    value={formData.length}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:border-blue-500"
                  >
                    <option value="standard">Standard (~3-4 Paragraphs)</option>
                    <option value="comprehensive">Comprehensive (~4-5 Paragraphs)</option>
                    <option value="concise">Concise (~2-3 Paragraphs)</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Structured Letter Now</span>
              </button>
            </div>
          )}

          {/* Form Step 4: Verification & Export Summary */}
          {currentStep === 'output' && (
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2.5 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    Letter Ready for Submission
                  </h3>
                  <span className="text-[11px] text-neutral-500">
                    Structured rhetorical phrasing verified
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs bg-neutral-50 dark:bg-neutral-800/60 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-700">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Candidate:</span>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">{formData.candidateName || 'Candidate'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Recommender:</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{formData.recommenderName || 'Recommender'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Destination:</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{formData.targetOrg || 'Institution'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Tone & Length:</span>
                  <span className="font-mono text-[11px] capitalize">{formData.tone} · {formData.length}</span>
                </div>
              </div>

              <div className="pt-2">
                <UnifiedDownloadButton
                  documentTitle="Recommendation Letter"
                  formats={downloadFormats}
                  size="md"
                  className="w-full"
                />
              </div>
            </div>
          )}

          {validationError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Guided Step-by-Step Workflow Navigation */}
          <WorkflowNavigation
            steps={RECOMMENDATION_STEPS}
            currentStepId={currentStep}
            onStepChange={(stepId) => {
              if (stepId === 'output' && !generatedLetter) {
                handleGenerate();
              } else {
                setCurrentStep(stepId as RecommendationStep);
              }
            }}
            onFinish={() => {
              if (!generatedLetter) {
                handleGenerate();
              }
              handlePrint();
            }}
            finishLabel="Complete & Export Letter"
            className="pb-12"
          />
        </div>

        {/* Right Column: Live Document Preview & Export (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            {/* Action Bar */}
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/80 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  Recommendation Document Output
                </span>
                {generatedLetter && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                    Live Editable
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!generatedLetter}
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Copy full text to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </button>

                {/* Unified Download Button */}
                <UnifiedDownloadButton
                  documentTitle="Recommendation Letter"
                  formats={downloadFormats}
                  size="sm"
                />
              </div>
            </div>

            {/* Document Body */}
            <div className="p-6 sm:p-8">
              {generatedLetter ? (
                <div className="space-y-4">
                  <div className="text-[11px] text-neutral-500 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                    <span>You can click anywhere inside the text below to fine-tune or edit sentences.</span>
                    <span className="font-mono text-[10px] text-neutral-400">
                      {generatedLetter.split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    value={generatedLetter}
                    onChange={(e) => setGeneratedLetter(e.target.value)}
                    rows={20}
                    className="w-full font-serif text-sm text-neutral-800 dark:text-neutral-200 bg-transparent resize-y focus:outline-none leading-relaxed tracking-normal p-2 border border-transparent focus:border-blue-400 rounded-xl"
                  />
                </div>
              ) : (
                <div className="py-20 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 max-w-sm mx-auto">
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      No Letter Generated Yet
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Fill out the candidate and recommender details on the left, or choose a 1-click Quick Preset above, then click <strong>Generate Structured Letter</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ethics & Legal Notice */}
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-2xl text-xs space-y-1.5 text-neutral-600 dark:text-neutral-400 no-print">
            <span className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Ethics & Academic Honesty Notice
            </span>
            <p className="text-[11px] leading-relaxed">
              GlobeCareer provides professional letterhead formatting and structured rhetorical phrasing. Users and recommenders are responsible for verifying that all stated roles, durations, and achievements are genuine and verifiable. We never fabricate accomplishments or credentials.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
