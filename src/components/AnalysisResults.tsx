import { Button } from "@/components/ui/button";
import { SmartAnalysis, CriterionKey, CRITERIA_INFO } from "@/types/smart-goal";
import CriterionCard from "./CriterionCard";
import { CheckCircle2, RotateCcw, Send, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResultsProps {
  analysis: SmartAnalysis | null;
  isLoading: boolean;
  onReset: () => void;
  onSubmit: () => void;
}

const AnalysisResults = ({ analysis, isLoading, onReset, onSubmit }: AnalysisResultsProps) => {
  const criteriaKeys: CriterionKey[] = ['specific', 'measurable', 'achievable', 'relevant', 'timeBound'];
  
  const passedCount = analysis
    ? criteriaKeys.filter((key) => analysis[key]?.passed).length
    : 0;
  
  const allPassed = passedCount === 5;

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-serif font-semibold text-foreground">
          SMART Analysis
        </h2>
        {analysis && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full card-shadow">
            <div className="flex gap-1">
              {criteriaKeys.map((key) => (
                <div
                  key={key}
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors",
                    analysis[key]?.passed ? "bg-success" : "bg-warning"
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              {passedCount}/5 criteria met
            </span>
          </div>
        )}
      </div>

      {/* Criteria Cards */}
      <div className="space-y-4">
        {criteriaKeys.map((key) => (
          <CriterionCard
            key={key}
            criterionKey={key}
            result={analysis ? analysis[key] : null}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Overall Feedback */}
      {analysis && (
        <div className="space-y-4 pt-4">
          {/* Overall feedback card */}
          <div className="bg-card rounded-xl p-6 card-shadow">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Overall Assessment
            </h3>
            <p className="text-foreground/90">{analysis.overallFeedback}</p>
          </div>

          {/* Improved goal suggestion */}
          {!allPassed && analysis.improvedGoal && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                ✨ Suggested Improved Goal
              </h3>
              <p className="text-foreground/90 italic">"{analysis.improvedGoal}"</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="outline"
              size="lg"
              onClick={onReset}
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4" />
              Try Another Goal
            </Button>
            
            {allPassed ? (
              <Button
                variant="hero"
                size="lg"
                onClick={onSubmit}
                className="flex-1 animate-pulse-success"
              >
                <Send className="w-4 h-4" />
                Submit Goal
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                disabled
                className="flex-1"
              >
                <CheckCircle2 className="w-4 h-4" />
                Meet All Criteria to Submit
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
