import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import GoalTypeSelector from "@/components/GoalTypeSelector";
import PerformanceGoalForm from "@/components/PerformanceGoalForm";
import DevelopmentGoalForm from "@/components/DevelopmentGoalForm";
import GeneratedGoalsList from "@/components/GeneratedGoalsList";
import {
  GoalType,
  GoalIdeasState,
  PerformanceContext,
  DevelopmentContext,
  UploadedDocument,
  GeneratedGoal,
} from "@/types/goal-ideas";

const initialState: GoalIdeasState = {
  goalType: null,
  goalCount: 3,
  performanceContext: {},
  developmentContext: {},
  uploadedDocuments: [],
  generatedGoals: [],
  isGenerating: false,
};

interface GoalIdeasTabProps {
  onOpenAssistant?: () => void;
}

const GoalIdeasTab = ({ onOpenAssistant }: GoalIdeasTabProps) => {
  const [state, setState] = useState<GoalIdeasState>(initialState);

  const handleSelectType = (type: GoalType | 'assistant') => {
    if (type === 'assistant') {
      onOpenAssistant?.();
      return;
    }
    setState((prev) => ({ ...prev, goalType: type }));
  };

  const handleBack = () => {
    setState((prev) => ({ ...prev, goalType: null, generatedGoals: [] }));
  };

  const handlePerformanceContextChange = (context: PerformanceContext) => {
    setState((prev) => ({ ...prev, performanceContext: context }));
  };

  const handleDevelopmentContextChange = (context: DevelopmentContext) => {
    setState((prev) => ({ ...prev, developmentContext: context }));
  };

  const handleDocumentUpload = (doc: UploadedDocument) => {
    setState((prev) => ({
      ...prev,
      uploadedDocuments: [...prev.uploadedDocuments, doc],
    }));
  };

  const handleDocumentRemove = (id: string) => {
    setState((prev) => ({
      ...prev,
      uploadedDocuments: prev.uploadedDocuments.filter((d) => d.id !== id),
    }));
  };

  const handleGenerate = async () => {
    setState((prev) => ({ ...prev, isGenerating: true }));

    try {
      const { data, error } = await supabase.functions.invoke("generate-goals", {
        body: {
          goalType: state.goalType,
          performanceContext: state.goalType === "performance" ? state.performanceContext : undefined,
          developmentContext: state.goalType === "development" ? state.developmentContext : undefined,
          documents: state.uploadedDocuments.map((d) => ({
            name: d.name,
            content: d.content,
          })),
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to generate goals");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setState((prev) => ({
        ...prev,
        generatedGoals: data.goals || [],
        isGenerating: false,
      }));
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
      setState((prev) => ({ ...prev, isGenerating: false }));
    }
  };

  const handleReset = () => {
    setState(initialState);
  };

  const handleRegenerate = () => {
    setState((prev) => ({ ...prev, generatedGoals: [] }));
    // Trigger generation again
    handleGenerate();
  };

  const handleSwitchType = (newType: GoalType) => {
    setState((prev) => ({
      ...prev,
      goalType: newType,
      generatedGoals: [],
    }));
  };

  // Show generated goals if we have them
  if (state.generatedGoals.length > 0 && state.goalType) {
    return (
      <GeneratedGoalsList
        goals={state.generatedGoals}
        goalType={state.goalType}
        onReset={handleReset}
        onRegenerate={handleRegenerate}
        onSwitchType={handleSwitchType}
      />
    );
  }

  // Show type selector if no type selected
  if (!state.goalType) {
    return <GoalTypeSelector onSelect={handleSelectType} />;
  }

  // Show form based on type
  if (state.goalType === "performance") {
    return (
      <PerformanceGoalForm
        context={state.performanceContext}
        onContextChange={handlePerformanceContextChange}
        documents={state.uploadedDocuments}
        onDocumentUpload={handleDocumentUpload}
        onDocumentRemove={handleDocumentRemove}
        onGenerate={handleGenerate}
        isGenerating={state.isGenerating}
        onBack={handleBack}
      />
    );
  }

  return (
    <DevelopmentGoalForm
      context={state.developmentContext}
      onContextChange={handleDevelopmentContextChange}
      documents={state.uploadedDocuments}
      onDocumentUpload={handleDocumentUpload}
      onDocumentRemove={handleDocumentRemove}
      onGenerate={handleGenerate}
      isGenerating={state.isGenerating}
      onBack={handleBack}
    />
  );
};

export default GoalIdeasTab;
