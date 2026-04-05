import { useState } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Image, Video, FileText, Palette } from "lucide-react";
import {
  getExhibitions,
  getVideos,
  getDownloads,
  getCriticisms,
  getOtherProjects,
  type OtherProject,
} from "@/lib/archiveData";
import ProjectContentModal from "@/components/archive/ProjectContentModal";

const cardClass =
  "group border-border/50 bg-card/55 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10";

const Archive = () => {
  const { t } = useI18n();
  const [selectedProject, setSelectedProject] = useState<OtherProject | null>(null);

  // Importa dati dinamici da archiveData.ts
  const exhibitions = getExhibitions();
  const videos = getVideos();
  const downloads = getDownloads();
  const criticisms = getCriticisms();
  const otherProjects = getOtherProjects();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Archive | Media & Projects - Massimo Di Stefano"
        description="Video, mostre e critiche d'arte. Discover my professional journey, exhibitions, and critical reviews."
        canonicalPath="/archive"
      />
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-light tracking-wider text-foreground md:text-6xl">ARCHIVE</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("archive.description")}</p>
          </div>

          {/* Tabs Navigation */}
          <Tabs defaultValue="exhibitions" className="w-full">
            <TabsList className="mb-8 flex w-full flex-wrap gap-2 border border-border/40 bg-card/45 p-2 md:grid md:grid-cols-5">
              <TabsTrigger value="exhibitions" className="flex items-center gap-2">
                <Image size={16} />
                Mostre
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video size={16} />
                Video
              </TabsTrigger>
              <TabsTrigger value="downloads" className="flex items-center gap-2">
                <Download size={16} />
                Materiali
              </TabsTrigger>
              <TabsTrigger value="criticism" className="flex items-center gap-2">
                <FileText size={16} />
                Critiche
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Palette size={16} />
                Altri Progetti
              </TabsTrigger>
            </TabsList>

            {/* Exhibitions */}
            <TabsContent value="exhibitions" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {exhibitions.map((exhibition) => (
                  <Card key={exhibition.id} className={cardClass}>
                    <CardHeader>
                      <CardTitle className="text-xl">{exhibition.title}</CardTitle>
                      <CardDescription>
                        {exhibition.year} - {exhibition.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground">{exhibition.description}</p>
                      {exhibition.images.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {exhibition.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`${exhibition.title} - ${index + 1}`}
                              className="h-24 w-full rounded object-cover"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex h-24 w-full items-center justify-center rounded bg-gradient-to-br from-primary/20 to-secondary/20 text-sm text-muted-foreground">
                          Immagini in arrivo
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Videos */}
            <TabsContent value="videos" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {videos.map((video) => (
                  <Card key={video.id} className={cardClass}>
                    <CardContent className="p-6">
                      <div className="mb-4 aspect-video w-full overflow-hidden rounded">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="h-full w-full"
                          loading="lazy"
                        />
                      </div>
                      <CardTitle className="mb-2 text-xl">{video.title}</CardTitle>
                      <CardDescription className="mb-3">{video.category}</CardDescription>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Downloads */}
            <TabsContent value="downloads" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {downloads.map((download) => (
                  <Card key={download.id} className={cardClass}>
                    <CardHeader>
                      <CardTitle className="text-xl">{download.title}</CardTitle>
                      <CardDescription>
                        {download.type} - {download.size}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground">{download.description}</p>
                      <Button asChild className="w-full">
                        <a href={download.file} download>
                          <Download size={16} className="mr-2" />
                          Scarica
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Criticism */}
            <TabsContent value="criticism" className="space-y-6">
              <div className="space-y-6">
                {criticisms.map((criticism) => (
                  <Card key={criticism.id} className={cardClass}>
                    <CardHeader>
                      <CardTitle className="text-xl">{criticism.title}</CardTitle>
                      <CardDescription>
                        {criticism.author} - {criticism.year}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm text-muted-foreground">{criticism.excerpt}</p>
                      <Button variant="outline">
                        <FileText size={16} className="mr-2" />
                        Leggi Completo
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Other Projects */}
            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((project) => (
                  <Card key={project.id} className={cardClass}>
                    <CardHeader>
                      {/* Trova la prima immagine nei media per preview */}
                      {project.media.find((item) => item.type === "image") ? (
                        <img
                          src={project.media.find((item) => item.type === "image")?.src}
                          alt={project.title}
                          className="mb-4 h-32 w-full rounded object-cover"
                          loading="lazy"
                        />
                      ) : project.media.find((item) => item.type === "youtube") ? (
                        <div className="mb-4 flex h-32 w-full items-center justify-center rounded bg-gradient-to-br from-destructive/20 to-destructive/30 text-sm text-foreground">
                          📹 Video disponibile
                        </div>
                      ) : project.media.find((item) => item.type === "pdf") ? (
                        <div className="mb-4 flex h-32 w-full items-center justify-center rounded bg-gradient-to-br from-primary/20 to-primary/30 text-sm text-foreground">
                          📄 Documenti disponibili
                        </div>
                      ) : (
                        <div className="mb-4 flex h-32 w-full items-center justify-center rounded bg-gradient-to-br from-accent/20 to-secondary/20 text-sm text-muted-foreground">
                          Contenuti in arrivo
                        </div>
                      )}
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>{project.category}</span>
                        {project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 2 && (
                              <span className="text-xs text-muted-foreground">+{project.tags.length - 2}</span>
                            )}
                          </div>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3 text-sm text-muted-foreground">{project.description}</p>
                      {/* Mostra conteggio contenuti */}
                      <div className="mb-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {project.media.filter((m) => m.type === "image").length > 0 && (
                          <span>📸 {project.media.filter((m) => m.type === "image").length} foto</span>
                        )}
                        {project.media.filter((m) => m.type === "youtube").length > 0 && (
                          <span>🎥 {project.media.filter((m) => m.type === "youtube").length} video</span>
                        )}
                        {project.media.filter((m) => m.type === "pdf").length > 0 && (
                          <span>📄 {project.media.filter((m) => m.type === "pdf").length} PDF</span>
                        )}
                        {project.media.filter((m) => m.type === "doc").length > 0 && (
                          <span>📝 {project.media.filter((m) => m.type === "doc").length} DOC</span>
                        )}
                        {project.media.filter((m) => m.type === "link").length > 0 && (
                          <span>🔗 {project.media.filter((m) => m.type === "link").length} link</span>
                        )}
                        {project.media.filter((m) => m.type === "text").length > 0 && (
                          <span>✍️ {project.media.filter((m) => m.type === "text").length} testi</span>
                        )}
                      </div>
                      <Button variant="outline" className="w-full" onClick={() => setSelectedProject(project)}>
                        <ExternalLink size={16} className="mr-2" />
                        Esplora contenuti
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <ProjectContentModal
            project={selectedProject}
            open={Boolean(selectedProject)}
            onOpenChange={(open) => {
              if (!open) {
                setSelectedProject(null);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Archive;
