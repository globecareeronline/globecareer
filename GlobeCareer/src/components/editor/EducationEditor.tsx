import React, { useState } from 'react';
import { ResumeData, EducationItem } from '../../types/resume';
import { Plus, Trash2, ArrowUp, ArrowDown, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';

interface EducationEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({ data, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(data.education?.[0]?.id || null);

  const updateEducation = (newEdu: EducationItem[]) => {
    onChange({
      ...data,
      education: newEdu
    });
  };

  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      gradeOrHonors: '',
      highlights: []
    };
    const updated = [newItem, ...(data.education || [])];
    updateEducation(updated);
    setExpandedId(newItem.id);
  };

  const removeEducation = (id: string) => {
    const updated = data.education.filter(e => e.id !== id);
    updateEducation(updated);
    if (expandedId === id) {
      setExpandedId(updated[0]?.id || null);
    }
  };

  const moveEducation = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= data.education.length) return;
    const items = [...data.education];
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    updateEducation(items);
  };

  const updateField = (id: string, field: keyof EducationItem, value: any) => {
    const updated = data.education.map(e => {
      if (e.id === id) {
        return { ...e, [field]: value };
      }
      return e;
    });
    updateEducation(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Education & Qualifications
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Degrees, academic institutions, graduation dates, and relevant honors.
          </p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="px-3 py-1.5 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Degree
        </button>
      </div>

      {(!data.education || data.education.length === 0) ? (
        <div className="p-8 text-center border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl space-y-3">
          <GraduationCap className="w-8 h-8 mx-auto text-neutral-400" />
          <div className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            No education entries added
          </div>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            List your university degree, high school, or vocational certification.
          </p>
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Degree
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {data.education.map((edu, index) => {
            const isExpanded = expandedId === edu.id;
            return (
              <div
                key={edu.id}
                className="border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900 shadow-sm overflow-hidden"
              >
                <div
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {edu.degree || 'New Degree'} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                      </h4>
                      <p className="text-xs text-neutral-400">
                        {edu.institution || 'Institution'} {edu.endDate && `· ${edu.endDate}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveEducation(index, 'up')}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 disabled:opacity-30 transition-colors cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === data.education.length - 1}
                      onClick={() => moveEducation(index, 'down')}
                      className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 disabled:opacity-30 transition-colors cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="p-1.5 text-red-500 hover:text-red-700"
                      title="Remove Degree"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                      className="p-1.5 text-neutral-500"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-4 pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Degree / Diploma <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateField(edu.id, 'degree', e.target.value)}
                          placeholder="e.g. Bachelor of Science (B.Sc.)"
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Field of Study <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) => updateField(edu.id, 'fieldOfStudy', e.target.value)}
                          placeholder="e.g. Computer Science"
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Institution / University <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateField(edu.id, 'institution', e.target.value)}
                          placeholder="e.g. University of Manchester"
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Grade, GPA or Honors
                        </label>
                        <input
                          type="text"
                          value={edu.gradeOrHonors || ''}
                          onChange={(e) => updateField(edu.id, 'gradeOrHonors', e.target.value)}
                          placeholder="e.g. First Class Honours or 3.8 / 4.0"
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Start Date (YYYY-MM)
                        </label>
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => updateField(edu.id, 'startDate', e.target.value)}
                          placeholder="e.g. 2018-09"
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          End Date / Graduation Year
                        </label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => updateField(edu.id, 'endDate', e.target.value)}
                          placeholder="e.g. 2022-06"
                          className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-none font-mono"
                        />
                      </div>
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
