import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import GoalInput from "@/components/GoalInput";
import AnalysisResults from "@/components/AnalysisResults";
import SuccessModal from "@/components/SuccessModal";
import { SmartAnalysis, CriterionKey, CRITERIA_INFO } from "@/types/smart-goal";
import { Info } from "lucide-react";
import bceLogo from "@/assets/bce-logo.png";

const Index = () => {
  const [goal, setGoal] = useState("");
  const [analysis, setAnalysis] = useState<SmartAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedGoal, setSubmittedGoal] = useState("");

  const analyzeGoal = async (goalText: string) => {
    setGoal(goalText);
    setIsLoading(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-goal", {
        body: { goal: goalText },
      });

      if (error) {
        console.error("Function error:", error);
        throw new Error(error.message || "Failed to analyze goal");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysis(data);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGoal("");
    setAnalysis(null);
  };

  const handleSubmit = () => {
    setSubmittedGoal(goal);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    handleReset();
  };

  const criteriaKeys: CriterionKey[] = ['specific', 'measurable', 'achievable', 'relevant', 'timeBound'];

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="py-4 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            <img src={bceLogo} alt="BCE Logo" className="h-12 w-auto" />
            <div className="h-8 w-px bg-border" />
            <h1 className="text-xl font-serif font-semibold text-foreground">
              SMART Goal Grader
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground text-balance">
              Transform Your Goals into{" "}
              <span className="text-primary">Achievable Plans</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Get instant AI feedback on whether your goals meet the SMART framework. 
              Write better goals and set yourself up for success.
            </p>
          </div>

          {/* SMART Info Pills */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {criteriaKeys.map((key) => (
              <div
                key={key}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-card rounded-full card-shadow text-sm"
              >
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                  {CRITERIA_INFO[key].letter}
                </span>
                <span className="text-foreground font-medium">{CRITERIA_INFO[key].label}</span>
              </div>
            ))}
          </div>

          {/* Main Card */}
          <div 
            className="bg-card rounded-2xl p-6 md:p-8 card-shadow animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {!analysis ? (
              <GoalInput
                onAnalyze={analyzeGoal}
                isLoading={isLoading}
              />
            ) : (
              <AnalysisResults
                analysis={analysis}
                isLoading={isLoading}
                onReset={handleReset}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          {/* Info Section */}
          {!analysis && (
            <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">What makes a SMART goal?</p>
                <p>
                  SMART goals are <strong>Specific</strong> (clear and defined), <strong>Measurable</strong> (trackable), <strong>Achievable</strong> (realistic), <strong>Relevant</strong> (meaningful), and <strong>Time-bound</strong> (has a deadline). 
                  This framework helps you create goals you can actually accomplish.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Success Modal */}
      <SuccessModal
        open={showSuccess}
        onClose={handleCloseSuccess}
        goal={submittedGoal}
      />
    </div>
  );
};

export default Index;
