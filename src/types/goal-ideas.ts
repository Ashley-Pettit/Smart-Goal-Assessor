export type GoalType = 'performance' | 'development';

export interface PerformanceContext {
  roleDescription?: string;
  schoolPlans?: string;
  functionalAreaPlan?: string;
  aipContext?: string;
  competencies?: string;
  priorities?: string;
  timeframes?: string;
  specificOutcomes?: string;
  leaderGoalCount?: number;
  leaderPriorities?: string;
}

export interface DevelopmentContext {
  skillFocus?: string;
  purposeType?: 'current' | 'aspirational';
  aspirationalRole?: string;
  priorFeedback?: string;
  developmentNotes?: string;
  currentSkillLevel?: 'beginner' | 'intermediate' | 'advanced';
  managerNotes?: string;
  thingsToWorkOn?: string;
  timeframes?: string;
  specificOutcomes?: string;
}

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  content: string;
  uploadedAt: Date;
}

export interface GeneratedGoal {
  id: string;
  goal: string;
  rationale: string;
  alignedWithDirection: boolean;
  type: GoalType;
}

export interface GoalIdeasState {
  goalType: GoalType | null;
  goalCount: number;
  performanceContext: PerformanceContext;
  developmentContext: DevelopmentContext;
  uploadedDocuments: UploadedDocument[];
  generatedGoals: GeneratedGoal[];
  isGenerating: boolean;
}
