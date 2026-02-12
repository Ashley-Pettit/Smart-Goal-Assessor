import { GeneratedGoal, GoalType } from "@/types/goal-ideas";
import { CheckCircle2, AlertCircle, Target, TrendingUp, Lightbulb, RefreshCw, ArrowRightLeft, Clock, Calendar, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface GeneratedGoalsListProps {
  goals: GeneratedGoal[];
  goalType: GoalType;
  onReset: () => void;
  onRegenerate: () => void;
  onSwitchType: (type: GoalType) => void;
}

const GeneratedGoalsList = ({ goals, goalType, onReset, onRegenerate, onSwitchType }: GeneratedGoalsListProps) => {
  const typeColor = goalType === 'performance' ? 'bce-purple' : 'bce-green';
  const TypeIcon = goalType === 'performance' ? Target : TrendingUp;
  const alternateType = goalType === 'performance' ? 'development' : 'performance';
  const alternateLabel = goalType === 'performance' ? 'Development' : 'Performance';
  const isPerformance = goalType === 'performance';

  // Helper to render rationale with structured formatting
  const renderRationale = (rationale: string) => {
    // Split into lines and process
    const lines = rationale.split('\n').filter(line => line.trim() !== '');
    
    const elements: JSX.Element[] = [];
    let whyLines: string[] = [];
    let foundActions = false;
    let currentSection: string | null = null;
    let currentItems: string[] = [];

    const flushSection = () => {
      if (currentSection && currentItems.length > 0) {
        elements.push(
          <div key={`section-${elements.length}`} className="mt-2">
            <p className="font-semibold underline text-foreground">{currentSection}</p>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
              {currentItems.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground">{item.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ul>
          </div>
        );
        currentItems = [];
        currentSection = null;
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.toLowerCase().includes('consider some of the potential actions')) {
        // Flush any "why" text collected before this
        if (whyLines.length > 0 && !foundActions) {
          // We'll add why text at the bottom
        }
        foundActions = true;
        elements.push(
          <p key={`actions-header-${elements.length}`} className="font-bold underline text-foreground mt-3 mb-1">
            {trimmed}
          </p>
        );
        continue;
      }

      if (trimmed.match(/^70%/i)) {
        flushSection();
        currentSection = "70% Experience (On-the-Job):";
        continue;
      }

      if (trimmed.match(/^20%/i)) {
        flushSection();
        currentSection = "20% Exposure (Learning from Others):";
        continue;
      }

      if (trimmed.match(/^10%/i)) {
        flushSection();
        currentSection = "10% Education (Internal or External Learning):";
        // Check if there's content after the colon on the same line
        const colonIdx = trimmed.indexOf(':');
        if (colonIdx > -1) {
          const afterColon = trimmed.substring(colonIdx + 1).trim();
          if (afterColon) {
            currentItems.push(afterColon);
          }
        }
        continue;
      }

      if (foundActions && trimmed.match(/^\d+\./)) {
        currentItems.push(trimmed);
        continue;
      }

      if (foundActions && currentSection) {
        currentItems.push(trimmed);
        continue;
      }

      if (!foundActions) {
        whyLines.push(trimmed);
      }
    }

    flushSection();

    // Add "Why this goal" section at the bottom from the initial explanation lines
    if (whyLines.length > 0) {
      elements.push(
        <div key="why-this-goal" className="mt-4 pt-3 border-t border-border">
          <p className="font-semibold text-foreground mb-1">Why this goal</p>
          <p className="text-sm text-muted-foreground">{whyLines.join(' ')}</p>
        </div>
      );
    }

    return <>{elements}</>;
  };

  const timeCategoryConfig = [
    { key: 'long-term' as const, label: 'Suggested Long Term Goals', icon: CalendarDays, color: 'bce-purple', description: 'Strategic goals spanning a full year or more' },
    { key: 'medium-term' as const, label: 'Suggested Medium Term Goals', icon: Calendar, color: 'bce-blue', description: 'Project-based goals spanning 1-2 terms' },
    { key: 'short-term' as const, label: 'Suggested Short Term Goals', icon: Clock, color: 'bce-green', description: 'Quick wins achievable within a term' },
  ];

  const alignedGoals = goals.filter(g => g.alignedWithDirection);
  const exploratoryGoals = goals.filter(g => !g.alignedWithDirection);

  const renderGoalCard = (goal: GeneratedGoal, borderColor: string, bgColor: string) => (
    <div
      key={goal.id}
      className={cn(
        "p-4 rounded-xl border-2 transition-colors",
        borderColor, bgColor
      )}
    >
      <p className="text-foreground font-medium mb-2">{goal.goal}</p>
      <div className="text-sm text-muted-foreground">{renderRationale(goal.rationale)}</div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-${typeColor}/15 flex items-center justify-center`}>
            <TypeIcon className={`w-5 h-5 text-${typeColor}`} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Potential Goals
            </h2>
            <p className="text-sm text-muted-foreground">
              Here are some suggested goals based on your context
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={onReset}>
          Start Over
        </Button>
      </div>

      {/* Group all goals by time category */}
      {timeCategoryConfig.map(({ key, label, icon: Icon, color, description }) => {
        const categoryGoals = goals.filter(g => g.timeCategory === key);
        if (categoryGoals.length === 0) return null;
        return (
          <div key={key} className="space-y-3">
            <div className="flex items-center gap-2">
              <Icon className={`w-5 h-5 text-${color}`} />
              <div>
                <span className="text-sm font-semibold text-foreground">{label} ({categoryGoals.length})</span>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
            </div>
            <div className="space-y-3">
              {categoryGoals.map((goal) =>
                renderGoalCard(
                  goal,
                  goal.alignedWithDirection ? `border-${color}/30` : "border-bce-yellow/30",
                  goal.alignedWithDirection ? `bg-${color}/5` : "bg-bce-yellow/5"
                )
              )}
            </div>
          </div>
        );
      })}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={onRegenerate} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Generate more ideas
        </Button>
        <Button variant="outline" onClick={() => onSwitchType(alternateType)} className="flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4" />
          Try {alternateLabel} goals instead
        </Button>
      </div>

    </div>
  );
};

export default GeneratedGoalsList;
