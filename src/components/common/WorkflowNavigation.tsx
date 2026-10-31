import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface WorkflowStep {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface WorkflowNavigationProps {
  steps: WorkflowStep[];
  currentStepId: string;
  onStepChange: (stepId: string) => void;
  onFinish?: () => void;
  finishLabel?: string;
  finishIcon?: React.ReactNode;
  canProceed?: boolean;
  className?: string;
}

export const WorkflowNavigation: React.FC<WorkflowNavigationProps> = ({
  steps,
  currentStepId,
  onStepChange,
  onFinish,
  finishLabel = 'Finish & Complete',
  finishIcon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
  canProceed = true,
  className = ''
}) => {
  const currentIndex = steps.findIndex(s => s.id === currentStepId);
  const isFirstStep = currentIndex <= 0;
  const isLastStep = currentIndex === steps.length - 1;

  const currentStep = steps[currentIndex] || steps[0];
  const nextStep = !isLastStep ? steps[currentIndex + 1] : null;
  const prevStep = !isFirstStep ? steps[currentIndex - 1] : null;

  const progressPercentage = Math.round(((currentIndex + 1) / steps.length) * 100);

  const handleNext = () => {
    if (isLastStep) {
      onFinish?.();
    } else if (nextStep && canProceed) {
      onStepChange(nextStep.id);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep && prevStep) {
      onStepChange(prevStep.id);
    }
  };

  return (
    <div className={`mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-4 ${className}`}>
      {/* Progress Summary */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <span className="font-semibold text-neutral-700 dark:text-neutral-300">
          Step {currentIndex + 1} of {steps.length}: <span className="text-neutral-900 dark:text-neutral-100 font-bold">{currentStep.label}</span>
        </span>
        <span className="font-mono text-[11px]">
          {progressPercentage}% Completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        {/* Back Button */}
        <div>
          {!isFirstStep ? (
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-500" />
              <span>Back: {prevStep?.label}</span>
            </button>
          ) : (
            <div className="text-xs text-neutral-400 italic pl-1">
              Initial Step
            </div>
          )}
        </div>

        {/* Next or Finish Button */}
        <div>
          {isLastStep ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
            >
              {finishIcon}
              <span>{finishLabel}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <span>Next: {nextStep?.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
