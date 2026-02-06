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

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-${typeColor}/15 flex items-center justify-center`}>
            <TypeIcon className={`w-5 h-5 text-${typeColor}`} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Your Goal Ideas
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
                <p className="text-foreground font-medium mb-2">"{goal.goal}"</p>
                <p className="text-sm text-muted-foreground">{goal.rationale}</p>
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
                  <p className="text-foreground font-medium">"{goal.goal}"</p>
                </div>
                <p className="text-sm text-muted-foreground ml-6">{goal.rationale}</p>
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
