import ReactMarkdown from "react-markdown";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  content: string;
}

const MeaningDialog = ({ isOpen, onClose, artworkTitle, content }: Props) => {
  
  const renderContent = (rawContent: string) => {
    // Pulizia: trasformiamo i <br> in veri a capo prima di processare
    const cleanContent = rawContent.replace(/<br\s*\/?>/gi, '\n');
    const lines = cleanContent.split('\n');
    const processedElements: React.ReactNode[] = [];
    let currentTable: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('|') && !trimmedLine.includes(':---') && !trimmedLine.toLowerCase().includes('| opzione |')) {
        const cells = trimmedLine.split('|').filter(cell => cell.trim() !== '');
        if (cells.length >= 2) {
          currentTable.push(
            <div key={`row-${index}`} className="grid grid-cols-1 md:grid-cols-[1fr_160px] border border-[#D4BE96]/30 rounded-xl overflow-hidden bg-white/60 shadow-sm mb-4 hover:border-[#D4BE96]/60 transition-colors">
              <div className="p-5 border-b md:border-b-0 md:border-r border-[#D4BE96]/15 text-[#1A1A1A] text-sm md:text-base leading-relaxed">
                <ReactMarkdown>{cells[0].trim()}</ReactMarkdown>
              </div>
              <div className="p-5 bg-[#1A1A1A]/5 flex items-center justify-center md:justify-start font-medium text-[#1A1A1A] text-base whitespace-nowrap">
                <ReactMarkdown>{cells[1].trim()}</ReactMarkdown>
              </div>
            </div>
          );
        }
      } else {
        if (currentTable.length > 0) {
          processedElements.push(<div key={`table-${index}`} className="my-4">{currentTable}</div>);
          currentTable = [];
        }
        
        if (trimmedLine !== '' && !trimmedLine.includes(':---') && !trimmedLine.toLowerCase().includes('| opzione |')) {
          processedElements.push(
            <div key={`text-${index}`} className="text-[#1A1A1A] opacity-80 leading-relaxed my-3 text-base md:text-lg">
              <ReactMarkdown>{line}</ReactMarkdown>
            </div>
          );
        } else if (trimmedLine === '---') {
          processedElements.push(<hr key={`hr-${index}`} className="my-6 border-[#D4BE96]/20" />);
        }
      }
    });

    if (currentTable.length > 0) {
      processedElements.push(<div key="last-table" className="my-4">{currentTable}</div>);
    }

    return processedElements;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-4xl w-[95vw] min-h-[400px] max-h-[85vh] overflow-y-auto bg-[#FDFCF0] border border-[#D4BE96]/40 p-0 gap-0 shadow-2xl rounded-xl"
      >
        <div className="sticky top-0 bg-[#FDFCF0] z-10 px-8 md:px-16 pt-10 pb-4 flex justify-between items-start">
          <DialogTitle
            className="text-3xl md:text-5xl text-[#1A1A1A] font-light leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {artworkTitle}
          </DialogTitle>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors text-[#1A1A1A]/40 hover:text-[#1A1A1A]">
            <X size={28} />
          </button>
        </div>

        <div className="px-8 md:px-16 pb-16" style={{ fontFamily: "'Raleway', sans-serif" }}>
          {content ? renderContent(content) : (
            <p className="text-[#1A1A1A]/40 text-sm italic">Caricamento contenuti...</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeaningDialog;
