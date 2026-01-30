import { CheckCircle2, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmittedGoalsListProps {
  goals: string[];
}

const SubmittedGoalsList = ({ goals }: SubmittedGoalsListProps) => {
  if (goals.length === 0) return null;

  return (
    <div className="bg-card rounded-2xl p-6 card-shadow border-l-4 border-l-bce-green">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-bce-green" />
        <h2 className="text-lg font-semibold text-foreground">
          Submitted Goals ({goals.length})
        </h2>
      </div>
      <ul className="space-y-3">
        {goals.map((goal, index) => (
          <li
            key={index}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50",
              "animate-fade-in"
            )}
          >
            <CheckCircle2 className="w-5 h-5 text-bce-green flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/90 italic">"{goal}"</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmittedGoalsList;
