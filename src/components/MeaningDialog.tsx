import ReactMarkdown from "react-markdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  content: string;
}

const MeaningDialog = ({ isOpen, onClose, artworkTitle, content }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-md border-border/50">
        <DialogHeader>
          <DialogTitle
            className="text-2xl text-foreground font-light pr-8"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {artworkTitle}
          </DialogTitle>
        </DialogHeader>
        <div
          className="prose prose-invert max-w-none text-foreground/90 leading-relaxed text-sm md:text-base break-words [overflow-wrap:anywhere] [&_*]:max-w-full [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_code]:break-words [&_p]:my-3"
          style={{ fontFamily: "'Raleway', sans-serif", whiteSpace: "normal" }}
        >
          {content ? (
            <ReactMarkdown>{content}</ReactMarkdown>
          ) : (
            <p className="text-muted-foreground text-sm">Nessun contenuto disponibile.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeaningDialog;
