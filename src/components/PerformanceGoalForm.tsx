import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PerformanceContext, PerformanceGoalMode, UploadedDocument } from "@/types/goal-ideas";
import { Upload, FileText, X, Sparkles, Loader2, ArrowLeft, Play, Target, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface PerformanceGoalFormProps {
  context: PerformanceContext;
  onContextChange: (context: PerformanceContext) => void;
  documents: UploadedDocument[];
  onDocumentUpload: (doc: UploadedDocument) => void;
  onDocumentRemove: (id: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onBack: () => void;
}

const PerformanceGoalForm = ({
  context,
  onContextChange,
  documents,
  onDocumentUpload,
  onDocumentRemove,
  onGenerate,
  isGenerating,
  onBack,
}: PerformanceGoalFormProps) => {
  const [dragActive, setDragActive] = useState(false);

  const fillDemoData = () => {
    onContextChange({
      goalMode: 'broad',
      roleDescription: 'Year 5/6 classroom teacher and Maths Learning Specialist. Responsible for leading the Numeracy improvement strategy across the school, mentoring early career teachers in maths pedagogy, and coordinating professional learning communities.',
      leaderPriorities: 'The principal has identified improving student outcomes in numeracy (particularly in problem-solving and reasoning) as a key school priority, aligned with the AIP. There is also a focus on building teacher capacity through peer observation and coaching cycles.',
      specificOutcomes: 'Increase the percentage of Year 5/6 students meeting expected growth in NAPLAN numeracy by 10%. Establish a structured peer observation program for maths teaching across the school.',
    });
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    
    for (const file of Array.from(files)) {
      const content = await file.text();
      const doc: UploadedDocument = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        content,
        uploadedAt: new Date(),
      };
      onDocumentUpload(doc);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleModeSelect = (mode: PerformanceGoalMode) => {
    onContextChange({ ...context, goalMode: mode });
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-bce-purple/15 flex items-center justify-center">
              <span className="text-bce-purple text-sm font-bold">P</span>
            </span>
            Performance Goal Ideas
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            We'll help you create goals aligned with your role and school priorities.
          </p>
        </div>
      </div>

      {/* Goal Mode Selector */}
      <div className="space-y-2">
        <Label>What kind of help do you need?</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleModeSelect('specific')}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all",
              context.goalMode === 'specific'
                ? "border-bce-purple bg-bce-purple/5 shadow-sm"
                : "border-border hover:border-bce-purple/40"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-5 h-5 text-bce-purple" />
              <span className="font-semibold text-foreground">Specific Goal</span>
            </div>
            <p className="text-xs text-muted-foreground">
              I have a specific area in mind and want focused goal ideas
            </p>
          </button>
          <button
            onClick={() => handleModeSelect('broad')}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all",
              context.goalMode === 'broad'
                ? "border-bce-purple bg-bce-purple/5 shadow-sm"
                : "border-border hover:border-bce-purple/40"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="w-5 h-5 text-bce-purple" />
              <span className="font-semibold text-foreground">Lots of Ideas</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Give me a broad range of goal ideas to choose from
            </p>
          </button>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={fillDemoData}
        className="flex items-center gap-2 self-start"
      >
        <Play className="w-4 h-4" />
        Demo Mode
      </Button>

      {/* Document Upload */}
      <div className="space-y-2">
        <Label>Upload supporting documents (optional)</Label>
        <p className="text-xs text-muted-foreground">
          PD documents, school plans, AIP, 1-1 notes, feedback - anything that helps us understand your context.
        </p>
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
            dragActive ? "border-bce-purple bg-bce-purple/5" : "border-border"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop files here, or
          </p>
          <label className="cursor-pointer">
            <span className="text-sm font-medium text-bce-purple hover:underline">
              browse files
            </span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
              accept=".txt,.pdf,.doc,.docx,.md"
            />
          </label>
        </div>

        {documents.length > 0 && (
          <ul className="space-y-2 mt-3">
            {documents.map((doc) => (
              <li key={doc.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm flex-1 truncate">{doc.name}</span>
                <button
                  onClick={() => onDocumentRemove(doc.id)}
                  className="p-1 hover:bg-destructive/10 rounded"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Context Questions */}
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="role">Tell us about your role</Label>
          <Textarea
            id="role"
            value={context.roleDescription || ""}
            onChange={(e) => onContextChange({ ...context, roleDescription: e.target.value })}
            placeholder="What is your current role and responsibilities?"
            className="min-h-20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priorities">What priorities has your leader given?</Label>
          <p className="text-xs text-muted-foreground">
            Alternatively, what school or organisational plans are you seeking to align with?
          </p>
          <Textarea
            id="priorities"
            value={context.leaderPriorities || ""}
            onChange={(e) => onContextChange({ ...context, leaderPriorities: e.target.value })}
            placeholder="Any specific direction or focus areas from your principal/leader?"
            className="min-h-20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="outcomes">Specific outcomes you're working towards</Label>
          <Textarea
            id="outcomes"
            value={context.specificOutcomes || ""}
            onChange={(e) => onContextChange({ ...context, specificOutcomes: e.target.value })}
            placeholder="Any specific targets or results you need to achieve?"
            className="min-h-20"
          />
        </div>
      </div>

      <Button
        onClick={onGenerate}
        variant="hero"
        size="lg"
        className="w-full"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating goal ideas...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate Goal Ideas
          </>
        )}
      </Button>
    </div>
  );
};

export default PerformanceGoalForm;