import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  meaningUrl: string;
}

const MeaningDialog = ({ isOpen, onClose, artworkTitle, meaningUrl }: Props) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setLoading(true);
    fetch(meaningUrl)
      .then((r) => (r.ok ? r.text() : ""))
      .then((text) => {
        if (!cancelled) setContent(text);
      })
      .catch(() => {
        if (!cancelled) setContent("");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, meaningUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-md border-border/50">
        <DialogHeader>
          <DialogTitle
            className="text-2xl text-foreground font-light"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {artworkTitle}
          </DialogTitle>
        </DialogHeader>
        <div
          className="prose prose-invert max-w-none text-foreground/90 leading-relaxed text-sm md:text-base"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {loading ? (
            <p className="text-muted-foreground text-sm">Caricamento…</p>
          ) : content ? (
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
