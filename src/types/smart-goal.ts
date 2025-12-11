export interface CriterionResult {
  passed: boolean;
  feedback: string;
  suggestion: string;
}

export interface SmartAnalysis {
  specific: CriterionResult;
  measurable: CriterionResult;
  achievable: CriterionResult;
  relevant: CriterionResult;
  timeBound: CriterionResult;
  overallFeedback: string;
  improvedGoal: string;
}

export type CriterionKey = 'specific' | 'measurable' | 'achievable' | 'relevant' | 'timeBound';

export const CRITERIA_INFO: Record<CriterionKey, { letter: string; label: string; description: string }> = {
  specific: {
    letter: 'S',
    label: 'Specific',
    description: 'Clear and well-defined goal'
  },
  measurable: {
    letter: 'M',
    label: 'Measurable',
    description: 'Trackable progress with metrics'
  },
  achievable: {
    letter: 'A',
    label: 'Achievable',
    description: 'Realistic and attainable'
  },
  relevant: {
    letter: 'R',
    label: 'Relevant',
    description: 'Aligned with broader objectives'
  },
  timeBound: {
    letter: 'T',
    label: 'Time-bound',
    description: 'Has a clear deadline'
  }
};
