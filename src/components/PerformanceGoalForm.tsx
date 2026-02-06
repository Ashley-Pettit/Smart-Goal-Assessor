import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PerformanceContext, UploadedDocument } from "@/types/goal-ideas";
import { Upload, FileText, X, Sparkles, Loader2, ArrowLeft } from "lucide-react";

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

      {/* Goal Count */}
      <div className="space-y-2">
        <Label htmlFor="goalCount">How many goals has your leader asked you to work on?</Label>
        <Input
          id="goalCount"
          type="number"
          min={1}
          max={10}
          value={context.leaderGoalCount || ""}
          onChange={(e) => onContextChange({ ...context, leaderGoalCount: parseInt(e.target.value) || undefined })}
          placeholder="e.g., 3"
          className="max-w-[120px]"
        />
      </div>

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
          <Label htmlFor="schoolPlans">School or organisational plans alignment</Label>
          <Textarea
            id="schoolPlans"
            value={context.schoolPlans || ""}
            onChange={(e) => onContextChange({ ...context, schoolPlans: e.target.value })}
            placeholder="What school priorities or plans should your goals align with?"
            className="min-h-20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priorities">What priorities has your leader given?</Label>
          <Textarea
            id="priorities"
            value={context.leaderPriorities || ""}
            onChange={(e) => onContextChange({ ...context, leaderPriorities: e.target.value })}
            placeholder="Any specific direction or focus areas from your principal/leader?"
            className="min-h-20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thingsToWorkOn">Things you want to work on</Label>
          <Textarea
            id="thingsToWorkOn"
            value={context.priorities || ""}
            onChange={(e) => onContextChange({ ...context, priorities: e.target.value })}
            placeholder="What areas are you personally interested in improving?"
            className="min-h-20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeframes">Timeframes</Label>
          <Input
            id="timeframes"
            value={context.timeframes || ""}
            onChange={(e) => onContextChange({ ...context, timeframes: e.target.value })}
            placeholder="e.g., End of Term 2, December 2024"
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
