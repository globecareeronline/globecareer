import React, { useState } from 'react';
import { ResumeData, WorkExperienceItem, EmploymentType } from '../../types/resume';
import { getJobCategoryById } from '../../data/jobCategories';
import { 
  Plus, Trash2, ArrowUp, ArrowDown, Briefcase, 
  ChevronDown, ChevronUp, Sparkles, Check 
} from 'lucide-react';

interface ExperienceEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const EMPLOYMENT_TYPES: EmploymentType[] = [
  'Full-time',
  'Part-time',
  'Contract',
  'Temporary',
  'Internship',
  'Graduate / Entry-level',
  'Remote',
  'Freelance',
  'Federal / Government'
];

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ data, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(data.experience?.[0]?.id || null);
  const category = getJobCategoryById(data.targetJobCategory);

  const updateExperiences = (newExperiences: WorkExperienceItem[]) => {
    onChange({
      ...data,
      experience: newExperiences
    });
  };

  const addExperience = () => {
    const newItem: WorkExperienceItem = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: true,
      employmentType: 'Full-time',
      description: ['']
    };
    const updated = [newItem, ...(data.experience || [])];
    updateExperiences(updated);
    setExpandedId(newItem.id);
  };

  const removeExperience = (id: string) => {
    const updated = data.experience.filter(e => e.id !== id);
    updateExperiences(updated);
    if (expandedId === id) {
      setExpandedId(updated[0]?.id || null);
    }
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.experience.length) return;
    const items = [...data.experience];
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    updateExperiences(items);
  };

  const updateField = (id: string, field: keyof WorkExperienceItem, value: any) => {
    const updated = data.experience.map(e => {
      if (e.id === id) {
        return { ...e, [field]: value };
      }
      return e;
    });
    updateExperiences(updated);
  };

  // Bullet points handlers
  const updateBullet = (expId: string, bulletIndex: number, text: string) => {
    const exp = data.experience.find(e => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.description];
    newBullets[bulletIndex] = text;
    updateField(expId, 'description', newBullets);
  };

  const addBullet = (expId: string, initialText: string = '') => {
    const exp = data.experience.find(e => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.description, initialText];
    updateField(expId, 'description', newBullets);
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
    const exp = data.experience.find(e => e.id === expId);
    if (!exp) return;
    const newBullets = exp.description.filter((_, idx) => idx !== bulletIndex);
    updateField(expId, 'description', newBullets);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Work Experience
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Document your professional career in reverse-chronological order with measurable accomplishments.
          </p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="px-3 py-1.5 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Role
        </button>
      </div>

      {(!data.experience || data.experience.length === 0) ? (
        <div className="p-8 text-center border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl space-y-3">
          <Briefcase className="w-8 h-8 mx-auto text-neutral-400" />
          <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            No work experience added yet
          </div>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Add your previous or current employment history, key responsibilities, and quantified achievements.
          </p>
          <button
            type="button"
            onClick={addExperience}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Role
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.experience.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div 
                key={exp.id}
                className="border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900 shadow-sm overflow-hidden"
              >
                {/* Collapsible Header */}
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {exp.jobTitle || 'New Position'} {exp.company && <span className="text-neutral-500 font-normal">at {exp.company}</span>}
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono">
                        {exp.startDate || 'Start Date'} – {exp.isCurrent ? 'Present' : (exp.endDate || 'End Date')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveExperience(index, 'up')}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === data.experience.length - 1}
                      onClick={() => moveExperience(index, 'down')}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="p-1.5 text-red-500 hover:text-red-700"
                      title="Remove Role"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                      className="p-1.5 text-neutral-500"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Form Fields */}
                {isExpanded && (
                  <div className="p-4 pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Job Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => updateField(exp.id, 'jobTitle', e.target.value)}
                          placeholder="e.g. Lead Frontend Developer"
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Company / Employer <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateField(exp.id, 'company', e.target.value)}
                          placeholder="e.g. Acme Corp"
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Location (City, Country)
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateField(exp.id, 'location', e.target.value)}
                          placeholder="e.g. London, UK (or Remote)"
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Employment Type
                        </label>
                        <select
                          value={exp.employmentType || 'Full-time'}
                          onChange={(e) => updateField(exp.id, 'employmentType', e.target.value as EmploymentType)}
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                        >
                          {EMPLOYMENT_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Start Date (YYYY-MM)
                        </label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateField(exp.id, 'startDate', e.target.value)}
                          placeholder="e.g. 2021-03"
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none font-mono"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                            End Date
                          </label>
                          <label className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={exp.isCurrent}
                              onChange={(e) => updateField(exp.id, 'isCurrent', e.target.checked)}
                              className="rounded text-neutral-900"
                            />
                            Currently work here
                          </label>
                        </div>
                        <input
                          type="text"
                          disabled={exp.isCurrent}
                          value={exp.isCurrent ? 'Present' : exp.endDate}
                          onChange={(e) => updateField(exp.id, 'endDate', e.target.value)}
                          placeholder="e.g. 2023-10"
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none font-mono disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Bullet Points Manager */}
                    <div className="space-y-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                          Accomplishments & Key Responsibilities
                        </label>
                        <button
                          type="button"
                          onClick={() => addBullet(exp.id)}
                          className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Add Bullet
                        </button>
                      </div>

                      {exp.description.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <span className="text-neutral-400 text-xs mt-2">•</span>
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                            placeholder="Accomplished [X] as measured by [Y] by doing [Z]..."
                            className="flex-1 p-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none leading-relaxed"
                          />
                          <button
                            type="button"
                            onClick={() => removeBullet(exp.id, bIdx)}
                            className="p-1.5 text-neutral-400 hover:text-red-600 mt-1"
                            title="Remove bullet point"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      {/* Power Bullets from Active Job Category */}
                      {category.sampleBulletPoints.length > 0 && (
                        <div className="mt-3 p-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            Suggested Power Bullets for {category.name}
                          </div>
                          <div className="space-y-1.5">
                            {category.sampleBulletPoints.map((sampleBullet, idx) => (
                              <div key={idx} className="flex items-start justify-between gap-2 text-[11px] text-neutral-600 dark:text-neutral-400">
                                <span className="leading-relaxed">"{sampleBullet}"</span>
                                <button
                                  type="button"
                                  onClick={() => addBullet(exp.id, sampleBullet)}
                                  className="text-blue-600 hover:text-blue-700 font-semibold shrink-0"
                                >
                                  + Insert
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
