import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DevelopmentContext, UploadedDocument } from "@/types/goal-ideas";
import { Upload, FileText, X, Sparkles, Loader2, ArrowLeft, Info } from "lucide-react";

interface DevelopmentGoalFormProps {
  context: DevelopmentContext;
  onContextChange: (context: DevelopmentContext) => void;
  documents: UploadedDocument[];
  onDocumentUpload: (doc: UploadedDocument) => void;
  onDocumentRemove: (id: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onBack: () => void;
}

const DevelopmentGoalForm = ({
  context,
  onContextChange,
  documents,
  onDocumentUpload,
  onDocumentRemove,
  onGenerate,
  isGenerating,
  onBack,
}: DevelopmentGoalFormProps) => {
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
            <span className="w-8 h-8 rounded-full bg-bce-green/15 flex items-center justify-center">
              <span className="text-bce-green text-sm font-bold">D</span>
            </span>
            Development Goal Ideas
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            We'll help you build skills and capabilities for growth.
          </p>
        </div>
      </div>

      {/* 70:20:10 Model Info */}
      <div className="flex items-start gap-3 p-4 bg-bce-green/10 border border-bce-green/30 rounded-xl">
        <Info className="w-5 h-5 text-bce-green flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">The 70:20:10 Learning Model</p>
          <p>
            Development is most effective when it combines <strong className="text-bce-green">70%</strong> on-the-job experiences (projects, challenges, shadowing), 
            <strong className="text-bce-purple"> 20%</strong> learning from others (mentoring, coaching, feedback), and 
            <strong className="text-bce-cyan"> 10%</strong> formal learning (courses, reading). 
            We'll suggest goals that incorporate these approaches.
          </p>
        </div>
      </div>

      {/* Purpose Type */}
      <div className="space-y-3">
        <Label>Is this development for your current role or a future aspiration?</Label>
        <RadioGroup
          value={context.purposeType || ""}
          onValueChange={(value) => onContextChange({ ...context, purposeType: value as 'current' | 'aspirational' })}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="current" id="current" />
            <Label htmlFor="current" className="font-normal cursor-pointer">Support current role</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="aspirational" id="aspirational" />
            <Label htmlFor="aspirational" className="font-normal cursor-pointer">Build for the future</Label>
          </div>
        </RadioGroup>
      </div>

      {context.purposeType === 'aspirational' && (
        <div className="space-y-2">
          <Label htmlFor="aspirationalRole">What role or position are you working towards?</Label>
          <Input
            id="aspirationalRole"
            value={context.aspirationalRole || ""}
            onChange={(e) => onContextChange({ ...context, aspirationalRole: e.target.value })}
            placeholder="e.g., Team Leader, Department Head, Principal"
          />
        </div>
      )}

      {/* Document Upload */}
      <div className="space-y-2">
        <Label>Upload supporting documents (optional)</Label>
        <p className="text-xs text-muted-foreground">
          Prior feedback, development notes, 1-1 manager notes, capability frameworks.
        </p>
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
            dragActive ? "border-bce-green bg-bce-green/5" : "border-border"
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
            <span className="text-sm font-medium text-bce-green hover:underline">
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
          <Label htmlFor="skillFocus">What skill, capability or leadership behaviour do you want to develop?</Label>
          <Textarea
            id="skillFocus"
            value={context.skillFocus || ""}
            onChange={(e) => onContextChange({ ...context, skillFocus: e.target.value })}
            placeholder="e.g., Coaching conversations, Data literacy, Strategic thinking"
            className="min-h-20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentLevel">Current skill level</Label>
          <Select
            value={context.currentSkillLevel || ""}
            onValueChange={(value) => onContextChange({ ...context, currentSkillLevel: value as 'beginner' | 'intermediate' | 'advanced' })}
          >
            <SelectTrigger id="currentLevel">
              <SelectValue placeholder="Select your current level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner - Just starting out</SelectItem>
              <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
              <SelectItem value="advanced">Advanced - Building confidence & mastery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priorFeedback">Prior feedback you've received</Label>
          <Textarea
            id="priorFeedback"
            value={context.priorFeedback || ""}
            onChange={(e) => onContextChange({ ...context, priorFeedback: e.target.value })}
            placeholder="What feedback have you received that informs this development area?"
            className="min-h-20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="managerNotes">1-1 manager/leader notes</Label>
          <Textarea
            id="managerNotes"
            value={context.managerNotes || ""}
            onChange={(e) => onContextChange({ ...context, managerNotes: e.target.value })}
            placeholder="Any relevant notes from conversations with your leader?"
            className="min-h-20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thingsToWorkOn">Things you want to work on</Label>
          <Textarea
            id="thingsToWorkOn"
            value={context.thingsToWorkOn || ""}
            onChange={(e) => onContextChange({ ...context, thingsToWorkOn: e.target.value })}
            placeholder="What areas are you personally motivated to develop?"
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
            placeholder="What does success look like for this development?"
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

export default DevelopmentGoalForm;
