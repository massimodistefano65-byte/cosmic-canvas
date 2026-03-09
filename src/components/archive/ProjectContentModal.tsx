import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MediaItem, OtherProject } from "@/lib/archiveData";
import { Download, ExternalLink, FileText, Image as ImageIcon, Link2, Video } from "lucide-react";

interface ProjectContentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: OtherProject | null;
}

const getMediaTitle = (item: MediaItem, index: number) => {
  if (item.title) return item.title;
  switch (item.type) {
    case "image":
      return `Immagine ${index + 1}`;
    case "youtube":
      return `Video YouTube ${index + 1}`;
    case "video":
      return `Video ${index + 1}`;
    case "pdf":
      return `PDF ${index + 1}`;
    case "doc":
      return `Documento ${index + 1}`;
    case "link":
      return `Link ${index + 1}`;
    default:
      return `Contenuto ${index + 1}`;
  }
};

const ProjectContentModal = ({ open, onOpenChange, project }: ProjectContentModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[96vw] max-w-6xl border-border/60 bg-background/95 p-0 shadow-2xl backdrop-blur-md">
        <div className="max-h-[88vh] overflow-y-auto">
          {!project ? null : (
            <div className="p-6 md:p-8">
              <DialogHeader className="space-y-4 pb-6 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{project.category}</Badge>
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-border/60 bg-background/40">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <DialogTitle className="text-2xl font-light tracking-wide md:text-4xl">{project.title}</DialogTitle>
                <DialogDescription className="max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {project.description}
                </DialogDescription>
                {project.longDescription ? (
                  <p className="max-w-4xl whitespace-pre-line text-sm leading-relaxed text-foreground/90 md:text-base">
                    {project.longDescription}
                  </p>
                ) : null}
              </DialogHeader>

              {project.media.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border/70 bg-card/40 p-10 text-center text-muted-foreground">
                  Nessun contenuto disponibile per questo progetto.
                </div>
              ) : (
                <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
                  {project.media.map((item, index) => {
                    const title = getMediaTitle(item, index);

                    if (item.type === "image" && item.src) {
                      return (
                        <article
                          key={`${project.id}-media-${index}`}
                          className="mb-4 break-inside-avoid rounded-lg border border-border/50 bg-card/50 p-3"
                        >
                          <img
                            src={item.src}
                            alt={title}
                            className="h-auto w-full rounded-md object-cover"
                            loading="lazy"
                          />
                          <p className="mt-2 text-sm text-foreground">{title}</p>
                          {item.description ? (
                            <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                          ) : null}
                        </article>
                      );
                    }

                    if (item.type === "youtube" && item.youtubeId) {
                      return (
                        <article
                          key={`${project.id}-media-${index}`}
                          className="mb-4 break-inside-avoid rounded-lg border border-border/50 bg-card/50 p-3"
                        >
                          <div className="aspect-video overflow-hidden rounded-md">
                            <iframe
                              src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
                              title={title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="h-full w-full"
                              loading="lazy"
                            />
                          </div>
                          <p className="mt-2 text-sm text-foreground">{title}</p>
                          {item.description ? (
                            <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                          ) : null}
                        </article>
                      );
                    }

                    if (item.type === "video" && item.src) {
                      return (
                        <article
                          key={`${project.id}-media-${index}`}
                          className="mb-4 break-inside-avoid rounded-lg border border-border/50 bg-card/50 p-3"
                        >
                          <video controls className="h-auto w-full rounded-md" preload="metadata">
                            <source src={item.src} />
                            Il tuo browser non supporta il tag video.
                          </video>
                          <p className="mt-2 flex items-center gap-2 text-sm text-foreground">
                            <Video size={14} />
                            {title}
                          </p>
                          {item.description ? (
                            <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                          ) : null}
                        </article>
                      );
                    }

                    if ((item.type === "pdf" || item.type === "doc") && item.src) {
                      return (
                        <article
                          key={`${project.id}-media-${index}`}
                          className="mb-4 break-inside-avoid rounded-lg border border-border/50 bg-card/50 p-4"
                        >
                          <p className="flex items-center gap-2 text-sm text-foreground">
                            <FileText size={14} />
                            {title}
                          </p>
                          {item.description ? (
                            <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
                          ) : null}
                          <div className="mt-3 flex gap-2">
                            <Button asChild variant="outline" size="sm">
                              <a href={item.src} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={14} /> Apri
                              </a>
                            </Button>
                            <Button asChild size="sm">
                              <a href={item.src} download>
                                <Download size={14} /> Scarica
                              </a>
                            </Button>
                          </div>
                        </article>
                      );
                    }

                    if (item.type === "link" && item.src) {
                      return (
                        <article
                          key={`${project.id}-media-${index}`}
                          className="mb-4 break-inside-avoid rounded-lg border border-border/50 bg-card/50 p-4"
                        >
                          <p className="flex items-center gap-2 text-sm text-foreground">
                            <Link2 size={14} /> {title}
                          </p>
                          {item.description ? (
                            <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
                          ) : null}
                          <Button asChild variant="link" className="mt-2 h-auto p-0 text-left">
                            <a href={item.src} target="_blank" rel="noopener noreferrer">
                              Vai al contenuto <ExternalLink size={14} />
                            </a>
                          </Button>
                        </article>
                      );
                    }

                    if (item.type === "text" && item.content) {
                      return (
                        <article
                          key={`${project.id}-media-${index}`}
                          className="mb-4 break-inside-avoid rounded-lg border border-border/50 bg-card/50 p-4"
                        >
                          <p className="mb-2 flex items-center gap-2 text-sm text-foreground">
                            <ImageIcon size={14} />
                            {title}
                          </p>
                          <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                            {item.content}
                          </p>
                        </article>
                      );
                    }

                    return null;
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectContentModal;
