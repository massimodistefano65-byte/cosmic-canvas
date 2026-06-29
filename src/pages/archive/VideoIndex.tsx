import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import { videos } from "@/lib/archiveData";

const VideoIndex = () => {
  useSectionAudio("archive");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Video e documentari — Massimo Di Stefano artista"
        description="Video, interviste e documentari dedicati al percorso artistico di Massimo Di Stefano."
        canonicalPath="/archive/video"
      />
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/archive"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-[#d4af7a]"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            <ArrowLeft size={16} /> Archive
          </Link>

          <div className="my-12 text-center">
            <h1
              className="text-4xl font-light tracking-wider text-foreground md:text-6xl"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Video
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {videos.map((v) => (
              <Card
                key={v.id}
                className="group border-border/50 bg-card/55 backdrop-blur-sm transition-all duration-300 hover:border-[#d4af7a]/60"
              >
                <CardContent className="p-6">
                  <div className="mb-4 aspect-video w-full overflow-hidden rounded">
                    <iframe
                      src={`https://www.youtube.com/embed/${v.youtubeId}?rel=0&modestbranding=1`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="h-full w-full"
                    />
                  </div>
                  <CardTitle className="mb-2 text-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {v.title}
                  </CardTitle>
                  <CardDescription className="mb-3">{v.category}</CardDescription>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoIndex;
