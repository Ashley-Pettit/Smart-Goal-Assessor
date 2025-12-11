import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, PartyPopper } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  goal: string;
}

const SuccessModal = ({ open, onClose, goal }: SuccessModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <DialogTitle className="text-2xl font-serif flex items-center justify-center gap-2">
            Goal Submitted! <PartyPopper className="w-6 h-6 text-accent" />
          </DialogTitle>
          <DialogDescription className="text-base">
            Congratulations! Your SMART goal has been successfully submitted.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-muted/50 rounded-lg p-4 my-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Your goal:</p>
          <p className="text-foreground italic">"{goal}"</p>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            Your goal meets all SMART criteria and is ready for action!
          </p>
          <Button variant="hero" className="w-full" onClick={onClose}>
            Create Another Goal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
