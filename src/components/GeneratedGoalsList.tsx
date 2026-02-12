import { GeneratedGoal, GoalType } from "@/types/goal-ideas";
import { CheckCircle2, AlertCircle, Target, TrendingUp, Lightbulb, RefreshCw, ArrowRightLeft } from "lucide-react";
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
  const alignedGoals = goals.filter(g => g.alignedWithDirection);
  const exploratoryGoals = goals.filter(g => !g.alignedWithDirection);
  const typeColor = goalType === 'performance' ? 'bce-purple' : 'bce-green';
  const TypeIcon = goalType === 'performance' ? Target : TrendingUp;
  const alternateType = goalType === 'performance' ? 'development' : 'performance';
  const alternateLabel = goalType === 'performance' ? 'Development' : 'Performance';

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
        currentSection = trimmed.includes(':') ? trimmed : trimmed;
        // If the section header includes items after colon, check
        const colonIdx = trimmed.indexOf(':');
        if (colonIdx > -1) {
          const afterColon = trimmed.substring(colonIdx + 1).trim();
          currentSection = trimmed.substring(0, colonIdx + 1);
          if (afterColon && !afterColon.match(/^\d/)) {
            // It's a description, keep as section header
            currentSection = trimmed;
          }
        }
        continue;
      }

      if (trimmed.match(/^20%/i)) {
        flushSection();
        currentSection = trimmed.includes(':') ? trimmed : trimmed;
        const colonIdx = trimmed.indexOf(':');
        if (colonIdx > -1) {
          currentSection = trimmed.substring(0, colonIdx + 1);
        }
        continue;
      }

      if (trimmed.match(/^10%/i)) {
        flushSection();
        currentSection = trimmed.includes(':') ? trimmed : trimmed;
        const colonIdx = trimmed.indexOf(':');
        if (colonIdx > -1) {
          const afterColon = trimmed.substring(colonIdx + 1).trim();
          currentSection = trimmed.substring(0, colonIdx + 1);
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

      {/* Aligned Goals */}
      {alignedGoals.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <CheckCircle2 className="w-4 h-4 text-bce-green" />
            <span>Aligned with your direction ({alignedGoals.length})</span>
          </div>
          <div className="space-y-3">
            {alignedGoals.map((goal) => (
              <div
                key={goal.id}
                className={cn(
                  "p-4 rounded-xl border-2 border-bce-green/30 bg-bce-green/5",
                  "hover:border-bce-green/50 transition-colors"
                )}
              >
                <p className="text-foreground font-medium mb-2">{goal.goal}</p>
                <div className="text-sm text-muted-foreground">{renderRationale(goal.rationale)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exploratory Goals */}
      {exploratoryGoals.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Lightbulb className="w-4 h-4 text-bce-yellow" />
            <span>Worth considering ({exploratoryGoals.length})</span>
          </div>
          <div className="space-y-3">
            {exploratoryGoals.map((goal) => (
              <div
                key={goal.id}
                className={cn(
                  "p-4 rounded-xl border-2 border-bce-yellow/30 bg-bce-yellow/5",
                  "hover:border-bce-yellow/50 transition-colors"
                )}
              >
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-bce-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-foreground font-medium">{goal.goal}</p>
                </div>
                <div className="text-sm text-muted-foreground ml-6">{renderRationale(goal.rationale)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      <div className="flex items-start gap-3 p-4 bg-muted/50 border border-border rounded-xl">
        <Lightbulb className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Next steps</p>
          <p>
            Copy any goals you like and head to the <strong>Goal Assistant</strong> tab to refine them into SMART goals.
            The assistant will help ensure your goals are Specific, Measurable, Achievable, Relevant, and Time-bound.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneratedGoalsList;
