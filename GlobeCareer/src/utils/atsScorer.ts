import { ResumeData } from '../types/resume';
import { runGenuineATSAnalysis, RealATSAnalysis } from './realAtsEngine';

export interface ATSCheckItem {
  id: string;
  category: 'critical' | 'recommended' | 'bonus';
  title: string;
  passed: boolean;
  message: string;
  suggestion?: string;
}

export interface ATSAnalysisResult {
  score: number; // 0 to 100
  items: ATSCheckItem[];
  matchedKeywords: string[];
  missingKeywords: string[];
  actionVerbsFound: string[];
  metricsCount: number;
  wordCount: number;
  realAnalysis?: RealATSAnalysis;
}

export function analyzeResumeATS(resume: ResumeData | string, jobDescriptionText: string = ''): ATSAnalysisResult {
  const targetCountry = typeof resume !== 'string' ? resume.targetCountryId : 'us';
  const realAnalysis = runGenuineATSAnalysis(resume, jobDescriptionText, targetCountry);

  const items: ATSCheckItem[] = realAnalysis.feedbackItems.map(f => ({
    id: f.id,
    category: f.severity === 'critical' ? 'critical' : f.severity === 'warning' ? 'recommended' : 'bonus',
    title: f.title,
    passed: f.severity === 'positive',
    message: f.description,
    suggestion: f.suggestion
  }));

  // Ensure standard section checkpoints exist in items
  if (realAnalysis.detectedSections.length > 0) {
    items.unshift({
      id: 'sections-detected',
      category: 'critical',
      title: 'Standard ATS Sections Verified',
      passed: realAnalysis.missingSections.length === 0,
      message: `Detected ${realAnalysis.detectedSections.length} core sections: ${realAnalysis.detectedSections.join(', ')}.`,
      suggestion: realAnalysis.missingSections.length > 0 ? `Add missing sections: ${realAnalysis.missingSections.join(', ')}` : undefined
    });
  }

  return {
    score: realAnalysis.overallScore,
    items,
    matchedKeywords: [...realAnalysis.matchedHardSkills, ...realAnalysis.matchedJdKeywords],
    missingKeywords: [...realAnalysis.missingHardSkills, ...realAnalysis.missingJdKeywords],
    actionVerbsFound: realAnalysis.actionVerbsFound,
    metricsCount: realAnalysis.metricsFound.length,
    wordCount: realAnalysis.wordCount,
    realAnalysis
  };
}
