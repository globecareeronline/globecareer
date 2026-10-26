import React, { useState } from 'react';
import { ResumeData, SkillItem } from '../../types/resume';
import { getJobCategoryById } from '../../data/jobCategories';
import { Plus, Trash2, Sparkles, Check } from 'lucide-react';

interface SkillsEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({ data, onChange }) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<SkillItem['category']>('Technical');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillItem['level']>('Advanced');
  const category = getJobCategoryById(data.targetJobCategory);

  const updateSkills = (skills: SkillItem[]) => {
    onChange({
      ...data,
      skills
    });
  };

  const handleAddSkill = (name?: string, cat?: SkillItem['category']) => {
    const skillNameToAdd = name || newSkillName;
    if (!skillNameToAdd.trim()) return;

    // Avoid duplicates
    if (data.skills?.some(s => s.name.toLowerCase() === skillNameToAdd.toLowerCase())) {
      setNewSkillName('');
      return;
    }

    const newItem: SkillItem = {
      id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: skillNameToAdd.trim(),
      category: cat || newSkillCategory,
      level: newSkillLevel
    };

    updateSkills([...(data.skills || []), newItem]);
    setNewSkillName('');
  };

  const removeSkill = (id: string) => {
    updateSkills(data.skills.filter(s => s.id !== id));
  };

  // Group current skills by category
  const technicalSkills = data.skills?.filter(s => s.category === 'Technical') || [];
  const toolSkills = data.skills?.filter(s => s.category === 'Tools & Frameworks') || [];
  const softSkills = data.skills?.filter(s => s.category === 'Soft Skills') || [];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          Key Skills & Competencies
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
          ATS parsers index hard skills, industry tools, and technical frameworks heavily.
        </p>
      </div>

      {/* Manual Input Bar */}
      <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
        <label className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
          Add Custom Skill
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="e.g. Kubernetes, React, Financial Analysis"
            className="flex-1 px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
          />
          <select
            value={newSkillCategory}
            onChange={(e) => setNewSkillCategory(e.target.value as any)}
            className="px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
          >
            <option value="Technical">Technical</option>
            <option value="Tools & Frameworks">Tools & Frameworks</option>
            <option value="Soft Skills">Soft Skills</option>
            <option value="Other">Other</option>
          </select>
          <button
            type="button"
            onClick={() => handleAddSkill()}
            className="px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      {/* Suggested Skills for Active Job Category */}
      <div className="p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-neutral-800 dark:text-neutral-200">
          <Sparkles className="w-4 h-4 text-blue-600" />
          Recommended Skills for {category.name}
        </div>
        <div className="space-y-2">
          <div className="text-[11px] font-medium text-neutral-500">Technical Skills:</div>
          <div className="flex flex-wrap gap-1.5">
            {category.suggestedSkills.technical.map((skill) => {
              const alreadyAdded = data.skills?.some(s => s.name.toLowerCase() === skill.toLowerCase());
              return (
                <button
                  key={skill}
                  type="button"
                  disabled={alreadyAdded}
                  onClick={() => handleAddSkill(skill, 'Technical')}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 ${
                    alreadyAdded 
                      ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-default' 
                      : 'bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-600 shadow-xs'
                  }`}
                >
                  {alreadyAdded ? <Check className="w-3 h-3 text-emerald-500" /> : <Plus className="w-3 h-3" />}
                  {skill}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-medium text-neutral-500 pt-1">Tools & Platforms:</div>
          <div className="flex flex-wrap gap-1.5">
            {category.suggestedSkills.tools.map((skill) => {
              const alreadyAdded = data.skills?.some(s => s.name.toLowerCase() === skill.toLowerCase());
              return (
                <button
                  key={skill}
                  type="button"
                  disabled={alreadyAdded}
                  onClick={() => handleAddSkill(skill, 'Tools & Frameworks')}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-colors flex items-center gap-1 ${
                    alreadyAdded 
                      ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 cursor-default' 
                      : 'bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-blue-500 hover:text-blue-600 shadow-xs'
                  }`}
                >
                  {alreadyAdded ? <Check className="w-3 h-3 text-emerald-500" /> : <Plus className="w-3 h-3" />}
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Currently Added Skills Grid */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-500">
          Currently Added ({data.skills?.length || 0})
        </h4>

        {(!data.skills || data.skills.length === 0) ? (
          <p className="text-xs text-neutral-400 italic">No skills listed yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.skills.map((skill) => (
              <div 
                key={skill.id}
                className="flex items-center justify-between px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs"
              >
                <div>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{skill.name}</span>
                  <span className="text-[10px] text-neutral-400 ml-2 font-mono">({skill.category})</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="p-1 text-neutral-400 hover:text-red-600 transition-colors"
                  title="Remove skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
