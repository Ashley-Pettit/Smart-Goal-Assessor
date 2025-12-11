import { Check, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CriterionResult, CriterionKey, CRITERIA_INFO } from "@/types/smart-goal";

interface CriterionCardProps {
  criterionKey: CriterionKey;
  result: CriterionResult | null;
  isLoading?: boolean;
}

const CriterionCard = ({ criterionKey, result, isLoading }: CriterionCardProps) => {
  const info = CRITERIA_INFO[criterionKey];
  
  return (
    <div
      className={cn(
        "bg-card rounded-xl p-5 card-shadow transition-all duration-300",
        result?.passed && "ring-2 ring-success/50 bg-success/5",
        result && !result.passed && "ring-2 ring-warning/50 bg-warning/5",
        isLoading && "animate-pulse"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Letter Badge */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-serif text-xl font-bold transition-colors",
            !result && "bg-muted text-muted-foreground",
            result?.passed && "bg-success text-success-foreground",
            result && !result.passed && "bg-warning text-warning-foreground"
          )}
        >
          {info.letter}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{info.label}</h3>
            {result && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                  result.passed
                    ? "bg-success/20 text-success"
                    : "bg-warning/20 text-warning"
                )}
              >
                {result.passed ? (
                  <>
                    <Check className="w-3 h-3" /> Met
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3" /> Needs work
                  </>
                )}
              </span>
            )}
          </div>
          
          {!result ? (
            <p className="text-sm text-muted-foreground">{info.description}</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-foreground/90">{result.feedback}</p>
              {!result.passed && result.suggestion && (
                <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                  <span className="text-xs font-medium text-primary">💡 Tip:</span>
                  <p className="text-xs text-muted-foreground">{result.suggestion}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CriterionCard;
