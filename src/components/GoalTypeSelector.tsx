import { Target, TrendingUp, Sparkles } from "lucide-react";
import { GoalType } from "@/types/goal-ideas";
import { cn } from "@/lib/utils";

interface GoalTypeSelectorProps {
  onSelect: (type: GoalType | 'assistant') => void;
}

const GoalTypeSelector = ({ onSelect }: GoalTypeSelectorProps) => {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold text-primary">
          What type of goal are you working on?
        </h2>
        <p className="text-muted-foreground">
          Select the type of goal to get tailored suggestions and guidance.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => onSelect('performance')}
          className={cn(
            "group relative p-6 rounded-xl border-2 border-border bg-card",
            "hover:border-bce-purple hover:shadow-lg transition-all duration-200",
            "text-left"
          )}
        >
          <div className="flex flex-col items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-bce-purple/15 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-bce-purple" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-bce-purple transition-colors">
                Performance Goals
              </h3>
              <p className="text-sm text-muted-foreground">
                What success looks like in your role. These goals align with school plans, functional area priorities, and role-specific outcomes.
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('development')}
          className={cn(
            "group relative p-6 rounded-xl border-2 border-border bg-card",
            "hover:border-bce-green hover:shadow-lg transition-all duration-200",
            "text-left"
          )}
        >
          <div className="flex flex-col items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-bce-green/15 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-bce-green" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-bce-green transition-colors">
                Development Goals
              </h3>
              <p className="text-sm text-muted-foreground">
                Build skills and capabilities. These goals focus on professional growth, leadership behaviours, and preparing for future roles.
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('assistant')}
          className={cn(
            "group relative p-6 rounded-xl border-2 border-border bg-card",
            "hover:border-bce-cyan hover:shadow-lg transition-all duration-200",
            "text-left"
          )}
        >
          <div className="flex flex-col items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-bce-cyan/15 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-bce-cyan" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-bce-cyan transition-colors">
                Goal Assistant
              </h3>
              <p className="text-sm text-muted-foreground">
                Already have a goal? Check if it meets SMART criteria and get suggestions to improve it.
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default GoalTypeSelector;
