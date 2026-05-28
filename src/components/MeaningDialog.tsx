import ReactMarkdown from "react-markdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  content: string;
}

const MeaningDialog = ({ isOpen, onClose, artworkTitle, content }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-4xl w-[95vw] min-h-[450px] max-h-[85vh] overflow-y-auto bg-[#FDFCF0] border border-[#D4BE96]/40 p-0 gap-0 shadow-2xl rounded-xl"
      >
        {/* Tasto chiusura in alto a destra */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors text-[#1A1A1A]/40 hover:text-[#1A1A1A] z-20"
        >
          <X size={24} />
        </button>

        {/* Header con Titolo - Font Elegante */}
        <div className="px-8 md:px-16 pt-12 pb-6">
          <DialogTitle
            className="text-3xl md:text-5xl text-[#1A1A1A] font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {artworkTitle}
          </DialogTitle>
          <hr className="mt-6 border-[#D4BE96]/30" />
        </div>

        {/* Contenuto con Pass-partout (Padding generoso) */}
        <div
          className="px-8 md:px-16 pb-16 text-[#1A1A1A] leading-relaxed"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {content ? (
            <ReactMarkdown
              components={{
                // Trasformiamo la tabella Markdown nelle schede grafiche
                table: ({ children }) => <div className="flex flex-col gap-4 my-8">{children}</div>,
                thead: () => null,
                tbody: ({ children }) => <>{children}</>,
                tr: ({ children }) => (
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] border border-[#D4BE96]/40 rounded-xl overflow-hidden bg-white/60 shadow-sm hover:shadow-md transition-all">
                    {children}
                  </div>
                ),
                td: ({ children, index }) => {
                  if (index === 0) {
                    return (
                      <div className="p-6 border-b md:border-b-0 md:border-r border-[#D4BE96]/20 text-base md:text-lg">
                        {children}
                      </div>
                    );
                  }
                  return (
                    <div className="p-6 bg-[#1A1A1A]/5 flex items-center justify-center md:justify-start font-medium text-lg text-[#1A1A1A]">
                      {children}
                    </div>
                  );
                },
                // Stile per i testi fuori dalla tabella (Significato)
                p: ({ children }) => <p className="my-4 text-lg md:text-xl opacity-90 font-light">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-[#1A1A1A]">{children}</strong>,
                em: ({ children }) => <em className="italic opacity-70">{children}</em>,
              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            <p className="text-[#1A1A1A]/40 text-sm italic">Caricamento contenuti...</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeaningDialog;
