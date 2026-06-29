import { Link } from "react-router-dom";
import { ArrowLeft, Download as DownloadIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSectionAudio } from "@/hooks/useSectionAudio";
import { downloads } from "@/lib/archiveData";

const DownloadIndex = () => {
  useSectionAudio("archive");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Cataloghi e download — Massimo Di Stefano artista"
        description="Cataloghi, portfolio e materiali PDF scaricabili dell'artista visivo Massimo Di Stefano."
        canonicalPath="/archive/download"
      />
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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
              Download
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {downloads.map((d) => (
              <Card key={d.id} className="border-border/50 bg-card/55 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {d.title}
                  </CardTitle>
                  <CardDescription>
                    {d.type} · {d.size}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">{d.description}</p>
                  <Button asChild className="w-full">
                    <a href={d.file} download>
                      <DownloadIcon size={16} className="mr-2" />
                      Scarica
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadIndex;
