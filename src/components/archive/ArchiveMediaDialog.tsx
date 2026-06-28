import ReactMarkdown from "react-markdown";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { MediaItem } from "@/lib/archiveData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  /** Body markdown opzionale renderizzato prima dei materiali. */
  body?: string;
  /** Array di materiali extra (immagini, video, PDF, link, testi). */
  materials?: MediaItem[];
}

/**
 * Popup editoriale archivistico — ampio, tipo PDF/A4 adattato allo schermo.
 * Usato per critiche, voci timeline con materiali extra, progetti.
 */
const ArchiveMediaDialog = ({ isOpen, onClose, title, subtitle, body, materials }: Props) => {
  const hasMaterials = !!materials && materials.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto bg-[#FDFCF0] border border-[#D4BE96]/40 p-0 gap-0 shadow-2xl rounded-xl">
        <div className="sticky top-0 z-10 flex items-start justify-between bg-[#FDFCF0] px-6 pt-8 pb-3 md:px-12 md:pt-10">
          <div className="pr-4">
            <DialogTitle
              className="text-2xl md:text-4xl text-[#1A1A1A] font-light leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {title}
            </DialogTitle>
            {subtitle && (
              <p
                className="mt-2 text-sm md:text-base text-[#1A1A1A]/60 italic"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="rounded-full p-2 text-[#1A1A1A]/40 transition-colors hover:bg-black/5 hover:text-[#1A1A1A]"
          >
            <X size={26} />
          </button>
        </div>

        <div
          className="px-6 pb-12 md:px-12 md:pb-16"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          {body && (
            <div className="archive-prose text-[#1A1A1A]/90 text-base md:text-[17px] leading-[1.85] break-words">
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          )}

          {hasMaterials && body && <hr className="my-10 border-[#D4BE96]/30" />}

          {hasMaterials && (
            <div className="space-y-8">
              {materials!.map((m, i) => (
                <MaterialBlock key={i} item={m} />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MaterialBlock = ({ item }: { item: MediaItem }) => {
  switch (item.type) {
    case "image":
      return (
        <figure className="space-y-2">
          <img
            src={item.src}
            alt={item.title || ""}
            className="w-full rounded-md"
            loading="lazy"
          />
          {(item.title || item.description) && (
            <figcaption className="text-sm text-[#1A1A1A]/60 italic">
              {item.title} {item.description && `— ${item.description}`}
            </figcaption>
          )}
        </figure>
      );
    case "youtube":
      return (
        <div>
          {item.title && <h4 className="mb-2 text-lg text-[#1A1A1A]">{item.title}</h4>}
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
              title={item.title || "video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
            />
          </div>
          {item.description && (
            <p className="mt-2 text-sm text-[#1A1A1A]/70">{item.description}</p>
          )}
        </div>
      );
    case "video":
      return (
        <video src={item.src} controls className="w-full rounded-md">
          {item.description}
        </video>
      );
    case "pdf":
    case "doc":
      return (
        <a
          href={item.src}
          download
          className="flex items-center justify-between rounded-md border border-[#D4BE96]/40 bg-white/60 p-4 transition-colors hover:border-[#D4BE96]/80"
        >
          <span className="text-[#1A1A1A]">
            📄 {item.title || item.src}
            {item.fileSize && <span className="ml-2 text-sm text-[#1A1A1A]/50">({item.fileSize})</span>}
          </span>
          <span className="text-sm text-[#1A1A1A]/60">Scarica</span>
        </a>
      );
    case "link":
      return (
        <a
          href={item.src}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-md border border-[#D4BE96]/40 bg-white/60 p-4 text-[#1A1A1A] transition-colors hover:border-[#D4BE96]/80"
        >
          🔗 {item.title || item.src}
          {item.description && <span className="block text-sm text-[#1A1A1A]/60">{item.description}</span>}
        </a>
      );
    case "text":
      return (
        <div className="archive-prose text-[#1A1A1A]/90 text-base leading-[1.8] break-words">
          {item.title && <h4 className="mb-2 text-xl text-[#1A1A1A]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</h4>}
          <ReactMarkdown>{item.content || ""}</ReactMarkdown>
        </div>
      );
    default:
      return null;
  }
};

export default ArchiveMediaDialog;
