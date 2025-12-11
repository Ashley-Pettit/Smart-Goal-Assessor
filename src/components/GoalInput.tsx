import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles } from "lucide-react";

interface GoalInputProps {
  onAnalyze: (goal: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const GoalInput = ({ onAnalyze, isLoading, disabled }: GoalInputProps) => {
  const [goal, setGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim() && !isLoading) {
      onAnalyze(goal.trim());
    }
  };

  const placeholders = [
    "I want to improve my grades this semester...",
    "I will read more books...",
    "I want to get better at math...",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="goal" className="text-sm font-medium text-foreground">
          Enter your goal
        </label>
        <Textarea
          id="goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder={placeholders[Math.floor(Math.random() * placeholders.length)]}
          className="min-h-32 resize-none text-base"
          disabled={isLoading || disabled}
        />
        <p className="text-xs text-muted-foreground">
          Be as detailed as possible for better feedback
        </p>
      </div>
      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full"
        disabled={!goal.trim() || isLoading || disabled}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing your goal...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Analyze My Goal
          </>
        )}
      </Button>
    </form>
  );
};

export default GoalInput;
