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
        className="max-w-4xl w-[95vw] min-h-[400px] max-h-[85vh] overflow-y-auto bg-[#FDFCF0] border border-[#D4BE96]/30 p-0 gap-0 shadow-2xl"
      >
        {/* Header con Titolo e tasto chiusura personalizzato */}
        <div className="sticky top-0 bg-[#FDFCF0] z-10 px-8 md:px-12 pt-8 pb-4 flex justify-between items-start">
          <DialogTitle
            className="text-3xl md:text-4xl text-[#1A1A1A] font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {artworkTitle}
          </DialogTitle>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenuto con Pass-partout (Padding generoso) */}
        <div
          className="px-8 md:px-12 pb-12 text-[#1A1A1A] leading-relaxed"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {content ? (
            <ReactMarkdown
              components={{
                // Trasformiamo la tabella Markdown nelle tue schede grafiche v7
                table: ({ children }) => <div className="flex flex-col gap-4 my-6">{children}</div>,
                thead: () => null, // Nascondiamo l'intestazione tecnica della tabella
                tbody: ({ children }) => <>{children}</>,
                tr: ({ children }) => (
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] border border-[#D4BE96]/40 rounded-xl overflow-hidden bg-white/50 shadow-sm hover:border-[#D4BE96]/80 transition-colors">
                    {children}
                  </div>
                ),
                td: ({ children, index }) => {
                  // La prima colonna (Titolo/Descrizione)
                  if (index === 0) {
                    return (
                      <div className="p-5 border-b md:border-b-0 md:border-r border-[#D4BE96]/20">
                        {children}
                      </div>
                    );
                  }
                  // La seconda colonna (Prezzo)
                  return (
                    <div className="p-5 bg-[#1A1A1A]/5 flex items-center justify-center md:justify-start font-medium text-lg">
                      {children}
                    </div>
                  );
                },
                // Stile per i testi fuori dalla tabella
                p: ({ children }) => <p className="my-4 text-base md:text-lg opacity-80">{children}</p>,
                hr: () => <hr className="my-8 border-[#D4BE96]/30" />,
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
