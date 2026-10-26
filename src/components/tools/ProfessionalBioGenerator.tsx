import React, { useState } from 'react';
import {
  User,
  Copy,
  Check,
  Download,
  Sparkles,
  RotateCcw,
  Briefcase,
  Share2,
  ArrowRight,
  FileText,
  Building,
  GraduationCap,
  Layers,
  Globe,
  Search,
  BookOpen,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { BIO_TEMPLATES, BIO_CATEGORIES, BioTemplate } from '../../data/bioTemplates';

export type BioTone = 'professional' | 'executive' | 'creative' | 'friendly' | 'academic';
export type BioPerspective = 'first' | 'third';
export type BioLength = 'short' | 'medium' | 'extended';

interface BioFormData {
  fullName: string;
  currentRole: string;
  companyOrBrand: string;
  yearsOfExperience: string;
  coreSkills: string;
  keyAchievements: string;
  educationOrCert: string;
  personalTouch: string;
  tone: BioTone;
  perspective: BioPerspective;
}

const INITIAL_FORM: BioFormData = {
  fullName: '',
  currentRole: '',
  companyOrBrand: '',
  yearsOfExperience: '7',
  coreSkills: '',
  keyAchievements: '',
  educationOrCert: '',
  personalTouch: '',
  tone: 'professional',
  perspective: 'third',
};

export const ProfessionalBioGenerator: React.FC<{
  initialView?: 'generator' | 'templates';
  initialTab?: 'generator' | 'templates';
  onNavigate?: (page: string) => void;
}> = ({ initialView, initialTab, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'generator' | 'templates'>(initialTab || initialView || 'generator');
  const [formData, setFormData] = useState<BioFormData>(INITIAL_FORM);
  const [generatedBio, setGeneratedBio] = useState<{
    short: string;
    medium: string;
    extended: string;
  } | null>(null);

  const [activeLength, setActiveLength] = useState<BioLength>('medium');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Template Library Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [templatePerspective, setTemplatePerspective] = useState<BioPerspective>('third');
  const [templateLength, setTemplateLength] = useState<BioLength>('medium');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setValidationError(null);
  };

  const loadPreset = (presetData: Partial<BioFormData>) => {
    setFormData(prev => ({ ...prev, ...presetData }));
    setValidationError(null);
  };

  const useTemplate = (tpl: BioTemplate) => {
    const newFormData: BioFormData = {
      fullName: tpl.defaultData.fullName,
      currentRole: tpl.defaultData.currentRole,
      companyOrBrand: tpl.defaultData.companyOrBrand,
      yearsOfExperience: tpl.defaultData.yearsOfExperience,
      coreSkills: tpl.defaultData.coreSkills,
      keyAchievements: tpl.defaultData.keyAchievements,
      educationOrCert: tpl.defaultData.educationOrCert,
      personalTouch: tpl.defaultData.personalTouch,
      tone: tpl.defaultData.tone,
      perspective: tpl.defaultData.perspective,
    };

    setFormData(newFormData);
    setValidationError(null);

    // Auto-generate bios using template's sample outputs
    const sample = tpl.defaultData.perspective === 'first' ? tpl.sampleOutputs.firstPerson : tpl.sampleOutputs.thirdPerson;
    setGeneratedBio({
      short: sample.short,
      medium: sample.medium,
      extended: sample.extended,
    });

    setActiveTab('generator');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const generateBios = () => {
    if (!formData.fullName.trim()) {
      setValidationError('Please provide your full name.');
      return;
    }
    if (!formData.currentRole.trim()) {
      setValidationError('Please provide your current or target professional role.');
      return;
    }

    const name = formData.fullName.trim();
    const role = formData.currentRole.trim();
    const org = formData.companyOrBrand.trim();
    const orgPhrase = org ? ` at ${org}` : '';
    const years = formData.yearsOfExperience.trim();
    const expPhrase = years ? `over ${years} years of experience` : 'extensive industry experience';
    const skills = formData.coreSkills.trim() || 'strategic leadership and technical innovation';
    const achievements = formData.keyAchievements.trim();
    const edu = formData.educationOrCert.trim();
    const personal = formData.personalTouch.trim();

    const isFirst = formData.perspective === 'first';

    let shortText = '';
    let mediumText = '';
    let extendedText = '';

    if (formData.tone === 'executive') {
      shortText = isFirst
        ? `I am a ${role}${orgPhrase} specializing in ${skills}. With ${expPhrase}, I drive high-impact organizational transformation and operational scale.`
        : `${name} is a ${role}${orgPhrase} specializing in ${skills}. With ${expPhrase}, ${name.split(' ')[0]} drives high-impact organizational transformation and operational scale.`;

      mediumText = isFirst
        ? `I am a ${role}${orgPhrase} with ${expPhrase} leading strategic initiatives in ${skills}. Throughout my career, I have focused on building resilient systems and sustainable business value${achievements ? `, having recently ${achievements}` : ''}. ${edu ? `I hold credentials including ${edu}.` : ''}`
        : `${name} is a ${role}${orgPhrase} with ${expPhrase} leading strategic initiatives in ${skills}. Recognized for executive stewardship and cross-functional alignment, ${name.split(' ')[0]} has focused on building resilient systems and sustainable business value${achievements ? `, having recently ${achievements}` : ''}. ${edu ? `${name.split(' ')[0]} holds credentials including ${edu}.` : ''}`;

      extendedText = `${mediumText} ${personal ? (isFirst ? `Beyond executive leadership, ${personal}.` : `Outside of professional commitments, ${personal}.`) : ''}`;

    } else if (formData.tone === 'creative') {
      shortText = isFirst
        ? `I'm a ${role}${orgPhrase} dedicated to crafting meaningful work at the intersection of ${skills}.`
        : `${name} is a ${role}${orgPhrase} dedicated to crafting meaningful work at the intersection of ${skills}.`;

      mediumText = isFirst
        ? `I'm a ${role}${orgPhrase} with ${expPhrase} shaping modern solutions in ${skills}. My approach pairs creative rigor with purposeful execution${achievements ? `, including ${achievements}` : ''}. ${personal ? `When I'm not creating, ${personal}.` : ''}`
        : `${name} is a ${role}${orgPhrase} with ${expPhrase} shaping modern solutions in ${skills}. Pairing creative rigor with purposeful execution, ${name.split(' ')[0]} delivers human-centered impact${achievements ? `, including ${achievements}` : ''}. ${personal ? `Outside of studio work, ${personal}.` : ''}`;

      extendedText = `${mediumText} ${edu ? (isFirst ? `I earned credentials in ${edu}.` : `${name.split(' ')[0]} holds credentials including ${edu}.`) : ''}`;

    } else {
      // Professional default
      shortText = isFirst
        ? `I am a ${role}${orgPhrase} specializing in ${skills} with ${expPhrase} delivering measurable career results.`
        : `${name} is a ${role}${orgPhrase} specializing in ${skills} with ${expPhrase} delivering measurable industry results.`;

      mediumText = isFirst
        ? `I am a ${role}${orgPhrase} with ${expPhrase} driving impactful outcomes in ${skills}. I bring a disciplined commitment to excellence and collaborative problem-solving${achievements ? `, having ${achievements}` : ''}. ${edu ? `My background includes ${edu}.` : ''}`
        : `${name} is a ${role}${orgPhrase} with ${expPhrase} driving impactful outcomes in ${skills}. Bringing a disciplined commitment to excellence and collaborative problem-solving, ${name.split(' ')[0]} has demonstrated consistent performance${achievements ? `, having ${achievements}` : ''}. ${edu ? `${name.split(' ')[0]} holds credentials including ${edu}.` : ''}`;

      extendedText = `${mediumText} ${personal ? (isFirst ? `Outside of work, ${personal}.` : `In their personal time, ${personal}.`) : ''}`;
    }

    setGeneratedBio({
      short: shortText.trim(),
      medium: mediumText.trim(),
      extended: extendedText.trim(),
    });
  };

  const currentDisplayBio = generatedBio ? generatedBio[activeLength] : '';

  const handleCopy = async () => {
    if (!currentDisplayBio) return;
    try {
      await navigator.clipboard.writeText(currentDisplayBio);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback
    }
  };

  const handleCopyTemplateText = async (text: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedTemplateId(templateId);
      setTimeout(() => setCopiedTemplateId(null), 2000);
    } catch (e) {
      // fallback
    }
  };

  const handleDownloadTxt = (textToDownload?: string, nameFallback?: string) => {
    const text = textToDownload || currentDisplayBio;
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const filename = nameFallback || formData.fullName || 'Professional';
    a.download = `${filename.replace(/\s+/g, '_')}_Bio.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter templates
  const filteredTemplates = BIO_TEMPLATES.filter(tpl => {
    const matchesCat = selectedCategory === 'all' || tpl.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      tpl.title.toLowerCase().includes(query) ||
      tpl.targetAudience.toLowerCase().includes(query) ||
      tpl.defaultData.currentRole.toLowerCase().includes(query) ||
      tpl.defaultData.coreSkills.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <User className="w-3.5 h-3.5" />
          <span>Professional Identity &amp; Branding</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Professional Bio Generator &amp; Templates
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed mt-1">
              Create executive biographies, LinkedIn "About" profiles, conference speaker bios, and portfolio introductions. 100% free with 15+ industry templates, multiple length variations, and one-click export.
            </p>
          </div>

          {/* Primary View Toggle: Generator vs Templates */}
          <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-1 rounded-2xl shrink-0 border border-neutral-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setActiveTab('generator')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'generator'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Generator</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'templates'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Bio Templates ({BIO_TEMPLATES.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: INTERACTIVE GENERATOR VIEW
          ========================================================================= */}
      {activeTab === 'generator' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* Preset Bar */}
          <div className="p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Quick-Load Template Presets
              </span>
              <button
                type="button"
                onClick={() => {
                  setFormData(INITIAL_FORM);
                  setGeneratedBio(null);
                }}
                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Form
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {BIO_TEMPLATES.slice(0, 3).map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => useTemplate(tpl)}
                  className="p-3 text-left bg-neutral-50 dark:bg-neutral-800/60 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 border border-neutral-200 dark:border-neutral-700 hover:border-blue-400 rounded-xl transition-all cursor-pointer group"
                >
                  <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 flex items-center justify-between">
                    <span>{tpl.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                    {tpl.targetAudience}
                  </div>
                </button>
              ))}
            </div>
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => setActiveTab('templates')}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                View all 15+ role templates in the library →
              </button>
            </div>
          </div>

          {/* Generator Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Input Form (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-6 shadow-xs">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>Your Professional Details</span>
              </h2>

              {validationError && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 font-semibold flex items-center gap-2">
                  <span>⚠</span>
                  <span>{validationError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Current / Target Role <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleInputChange}
                    placeholder="e.g. Principal Cloud Architect"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Company, Brand, or Independent
                  </label>
                  <input
                    type="text"
                    name="companyOrBrand"
                    value={formData.companyOrBrand}
                    onChange={handleInputChange}
                    placeholder="e.g. Nexis Enterprise Systems"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    min="0"
                    max="50"
                    placeholder="e.g. 8"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Core Skills &amp; Focus Areas
                </label>
                <input
                  type="text"
                  name="coreSkills"
                  value={formData.coreSkills}
                  onChange={handleInputChange}
                  placeholder="e.g. AWS architectures, Kubernetes, Terraform automation, zero-trust security"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Key Achievement or Milestone
                </label>
                <textarea
                  name="keyAchievements"
                  value={formData.keyAchievements}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="e.g. directed high-throughput cloud migration trimming latency by 42% and saving $1.2M annually"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Education or Certifications
                  </label>
                  <input
                    type="text"
                    name="educationOrCert"
                    value={formData.educationOrCert}
                    onChange={handleInputChange}
                    placeholder="e.g. M.S. in Computer Science, AWS Certified"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Personal Touch or Passion
                  </label>
                  <input
                    type="text"
                    name="personalTouch"
                    value={formData.personalTouch}
                    onChange={handleInputChange}
                    placeholder="e.g. mentors early-career engineers and contributes to open-source"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Tone & Perspective Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Voice &amp; Tone
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="professional">Professional (Balanced &amp; Credible)</option>
                    <option value="executive">Executive (Authoritative &amp; Strategic)</option>
                    <option value="creative">Creative (Warm &amp; Visionary)</option>
                    <option value="friendly">Friendly (Approachable &amp; Modern)</option>
                    <option value="academic">Academic (Rigor &amp; Scholarly)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                    Perspective (POV)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, perspective: 'first' }))}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        formData.perspective === 'first'
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300'
                          : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      1st Person ("I am")
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, perspective: 'third' }))}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        formData.perspective === 'third'
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300'
                          : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      3rd Person ("Alex is")
                    </button>
                  </div>
                </div>
              </div>

              {/* Generate Action Button */}
              <button
                type="button"
                onClick={generateBios}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Professional Bios</span>
              </button>
            </div>

            {/* Right: Output Card with Length Tiers (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-6 shadow-xs sticky top-20">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-4">
                <div>
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                    Generated Bio Output
                  </h3>
                  <span className="text-[11px] text-neutral-500">
                    {formData.perspective === 'first' ? 'First Person POV' : 'Third Person POV'} · {formData.tone}
                  </span>
                </div>

                {generatedBio && (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadTxt()}
                      className="p-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 text-xs transition-colors cursor-pointer"
                      title="Download as TXT"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Length Tier Tabs */}
              {generatedBio && (
                <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setActiveLength('short')}
                    className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                      activeLength === 'short'
                        ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    Short (~50w)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLength('medium')}
                    className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                      activeLength === 'medium'
                        ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    Medium (~120w)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLength('extended')}
                    className={`flex-1 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                      activeLength === 'extended'
                        ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    Long (~200w)
                  </button>
                </div>
              )}

              {/* Bio Display Container */}
              {generatedBio ? (
                <div className="space-y-4">
                  <div className="p-6 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed font-sans min-h-[160px]">
                    {currentDisplayBio}
                  </div>

                  <div className="p-4 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <span className="text-blue-900 dark:text-blue-200">
                      Need this in your resume profile or outreach email?
                    </span>
                    <div className="flex items-center gap-3 font-semibold text-blue-700 dark:text-blue-300">
                      <button
                        type="button"
                        onClick={() => onNavigate?.('builder')}
                        className="hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Resume Builder</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <span>·</span>
                      <button
                        type="button"
                        onClick={() => onNavigate?.('email-generator')}
                        className="hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Email Generator</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl space-y-3">
                  <User className="w-8 h-8 text-neutral-400 mx-auto" />
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                    No Biography Generated Yet
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                    Fill in your professional details on the left, or browse our 15+ curated templates to generate your personalized bio in seconds.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('templates')}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Browse 15+ Bio Templates</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: TEMPLATE LIBRARY BROWSE VIEW (15+ ROLES)
          ========================================================================= */}
      {activeTab === 'templates' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Search & Category Filter Controls */}
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-5 shadow-xs">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search input */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bio templates by role, skill, or industry..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* View options: 1st vs 3rd person & Length */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setTemplatePerspective('first')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      templatePerspective === 'first' ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-2xs font-bold' : 'text-neutral-500'
                    }`}
                  >
                    1st Person ("I am")
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemplatePerspective('third')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      templatePerspective === 'third' ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-2xs font-bold' : 'text-neutral-500'
                    }`}
                  >
                    3rd Person ("[Name] is")
                  </button>
                </div>

                <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setTemplateLength('short')}
                    className={`px-2.5 py-1.5 rounded-lg transition-all ${
                      templateLength === 'short' ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-2xs font-bold' : 'text-neutral-500'
                    }`}
                  >
                    Short
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemplateLength('medium')}
                    className={`px-2.5 py-1.5 rounded-lg transition-all ${
                      templateLength === 'medium' ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-2xs font-bold' : 'text-neutral-500'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemplateLength('extended')}
                    className={`px-2.5 py-1.5 rounded-lg transition-all ${
                      templateLength === 'extended' ? 'bg-white dark:bg-neutral-900 text-blue-600 shadow-2xs font-bold' : 'text-neutral-500'
                    }`}
                  >
                    Long
                  </button>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {BIO_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(tpl => {
              const sampleSet = templatePerspective === 'first' ? tpl.sampleOutputs.firstPerson : tpl.sampleOutputs.thirdPerson;
              const displayText = sampleSet[templateLength];
              const isCopied = copiedTemplateId === tpl.id;

              return (
                <div
                  key={tpl.id}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-md transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900">
                        {tpl.badge}
                      </span>
                      <span className="text-[11px] text-neutral-400 capitalize">
                        {tpl.defaultData.tone} tone
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors">
                        {tpl.title}
                      </h3>
                      <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                        Target: {tpl.targetAudience}
                      </p>
                    </div>

                    {/* Pre-rendered bio snippet */}
                    <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans min-h-[110px]">
                      {displayText}
                    </div>
                  </div>

                  {/* Template Actions */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => useTemplate(tpl)}
                      className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Use Template</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyTemplateText(displayText, tpl.id)}
                      className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 text-xs transition-colors cursor-pointer"
                      title="Copy this bio"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadTxt(displayText, tpl.defaultData.fullName)}
                      className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 text-xs transition-colors cursor-pointer"
                      title="Download as TXT"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="p-12 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-3">
              <Search className="w-8 h-8 text-neutral-400 mx-auto" />
              <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                No Bio Templates Found
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                No templates matched "{searchQuery}". Try selecting "All Templates" or search for a broader industry term.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
