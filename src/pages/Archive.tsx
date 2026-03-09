import { useState } from "react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, Image, Video, FileText, Palette } from "lucide-react";

const Archive = () => {
  const { t } = useI18n();

  const exhibitions = [
    {
      id: 1,
      title: "Pensieri in Evoluzione",
      year: "2024",
      location: "Galleria Moderna, Roma",
      description: "Mostra personale dedicata alla ricerca cosmica attraverso la pittura.",
      images: ["/images/placeholder.svg", "/images/placeholder.svg"],
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Massimo Di Stefano, Viaggio nell'inconscio 1",
      category: "Arte",
      description: "Esplorazione artistica del subconscio attraverso la pittura",
      youtubeId: "x9ZMeR7e4MU",
    },
    {
      id: 2,
      title: "Massimo Di Stefano, Viaggio nell'inconscio 2",
      category: "Arte", 
      description: "Seconda parte del viaggio nell'arte interiore",
      youtubeId: "_T-mymcG4sw",
    },
  ];

  const downloads = [
    {
      id: 1,
      title: "Catalogo Opere HD",
      description: "Catalogo completo in alta risoluzione",
      file: "/downloads/catalogo-massimo-di-stefano-hd.pdf",
      size: "11 MB",
      type: "PDF",
    },
    {
      id: 2,
      title: "Catalogo Opere Light",
      description: "Versione leggera per navigazione veloce",
      file: "/downloads/catalogo-massimo-di-stefano-light.pdf",
      size: "2 MB",
      type: "PDF",
    },
  ];

  const criticisms = [
    {
      id: 1,
      title: "La Dimensione Cosmica nell'Arte Contemporanea",
      author: "Dr. Maria Rossi",
      excerpt: "Un'analisi approfondita della ricerca artistica di Massimo Di Stefano...",
      year: "2024",
    },
  ];

  const otherProjects = [
    {
      id: 1,
      title: "Micro-Ecosistemi in Bottiglia",
      category: "Installazioni",
      description: "Creazione di ecosistemi autosufficienti in contenitori di vetro",
      images: ["/images/placeholder.svg"],
    },
    {
      id: 2,
      title: "Sculture in Legno",
      category: "Scultura",
      description: "Lavori artigianali che esplorano forme organiche e geometrie naturali",
      images: ["/images/placeholder.svg"],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Archive"
        description="Archivio completo delle attività creative di Massimo Di Stefano: mostre, video, materiali scaricabili, critiche e progetti speciali."
        canonicalPath="/archive"
      />
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-light tracking-wider text-foreground mb-4">
              ARCHIVE
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("archive.description")}
            </p>
          </div>

          {/* Tabs Navigation */}
          <Tabs defaultValue="exhibitions" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exhibitions.map((exhibition) => (
                  <Card key={exhibition.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{exhibition.title}</CardTitle>
                      <CardDescription>
                        {exhibition.year} - {exhibition.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {exhibition.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {exhibition.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${exhibition.title} - ${index + 1}`}
                            className="w-full h-24 object-cover rounded"
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Videos */}
            <TabsContent value="videos" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="aspect-video w-full rounded mb-4 overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0&modestbranding=1`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                          loading="lazy"
                        />
                      </div>
                      <CardTitle className="text-xl mb-2">{video.title}</CardTitle>
                      <CardDescription className="mb-3">{video.category}</CardDescription>
                      <p className="text-sm text-muted-foreground">
                        {video.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Downloads */}
            <TabsContent value="downloads" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {downloads.map((download) => (
                  <Card key={download.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{download.title}</CardTitle>
                      <CardDescription>
                        {download.type} - {download.size}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {download.description}
                      </p>
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
                  <Card key={criticism.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{criticism.title}</CardTitle>
                      <CardDescription>
                        {criticism.author} - {criticism.year}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {criticism.excerpt}
                      </p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project) => (
                  <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-32 object-cover rounded mb-4"
                      />
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Archive;
