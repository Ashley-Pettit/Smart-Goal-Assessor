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

  const handleEditGoal = () => {
    // Keep the goal but clear analysis so they can edit
    setAnalysis(null);
  };

  const handleSubmit = () => {
    setSubmittedGoal(goal);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setGoal("");
    setAnalysis(null);
  };

  const criteriaKeys: CriterionKey[] = ['specific', 'measurable', 'achievable', 'relevant', 'timeBound'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden">
        {/* Colorful accent bar */}
        <div className="h-1.5 flex">
          <div className="flex-1 bg-bce-cyan" />
          <div className="flex-1 bg-bce-purple" />
          <div className="flex-1 bg-bce-green" />
          <div className="flex-1 bg-bce-coral" />
          <div className="flex-1 bg-bce-yellow" />
        </div>
        
        <div className="bg-white py-5 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-5">
              <img src={bceLogo} alt="Brisbane Catholic Education" className="h-14 w-auto" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-3 animate-fade-up">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              SMART Goal Assistant
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Helping you create better goals and set yourself up for success.
            </p>
          </div>

          {/* SMART Info Pills - using BCE colors */}
          <div className="flex flex-wrap justify-center gap-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {criteriaKeys.map((key, index) => {
              const colors = [
                'bg-bce-cyan/20 text-bce-navy border-bce-cyan/40',
                'bg-bce-purple/15 text-bce-purple border-bce-purple/30',
                'bg-bce-green/15 text-bce-green border-bce-green/30',
                'bg-bce-coral/15 text-bce-coral border-bce-coral/30',
                'bg-bce-yellow/20 text-bce-navy border-bce-yellow/40',
              ];
              const bgColors = [
                'bg-bce-cyan',
                'bg-bce-purple',
                'bg-bce-green',
                'bg-bce-coral',
                'bg-bce-yellow',
              ];
              return (
                <div
                  key={key}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${colors[index]}`}
                >
                  <span className={`w-6 h-6 ${bgColors[index]} rounded-full flex items-center justify-center text-xs font-bold text-white`}>
                    {CRITERIA_INFO[key].letter}
                  </span>
                  <span>{CRITERIA_INFO[key].label}</span>
                </div>
              );
            })}
          </div>

          {/* Main Card */}
          <div 
            className="bg-card rounded-2xl p-6 md:p-8 card-shadow border-t-4 border-t-bce-cyan animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {!analysis ? (
              <GoalInput
                onAnalyze={analyzeGoal}
                isLoading={isLoading}
                initialGoal={goal}
              />
            ) : (
              <AnalysisResults
                analysis={analysis}
                isLoading={isLoading}
                onReset={handleEditGoal}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          {/* Info Section */}
          {!analysis && (
            <div className="flex items-start gap-3 p-4 bg-bce-cyan/10 border border-bce-cyan/30 rounded-xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">What makes a SMART goal?</p>
                <p>
                  SMART goals are <strong className="text-bce-cyan">Specific</strong> (clear and defined), <strong className="text-bce-purple">Measurable</strong> (trackable), <strong className="text-bce-green">Achievable</strong> (realistic), <strong className="text-bce-coral">Relevant</strong> (meaningful), and <strong className="text-bce-yellow">Time-bound</strong> (has a deadline). 
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
