import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import Index from "./pages/Index";
const Bio = lazy(() => import("./pages/Bio"));
const Archive = lazy(() => import("./pages/Archive"));
const MiaSelezione = lazy(() => import("./pages/MiaSelezione"));
const MostreIndex = lazy(() => import("./pages/archive/MostreIndex"));
const PercorsoEspositivo = lazy(() => import("./pages/archive/PercorsoEspositivo"));
const VideoIndex = lazy(() => import("./pages/archive/VideoIndex"));
const DownloadIndex = lazy(() => import("./pages/archive/DownloadIndex"));
const CritichePagina = lazy(() => import("./pages/archive/CritichePagina"));
const ProgettiIndex = lazy(() => import("./pages/archive/ProgettiIndex"));
const Painting = lazy(() => import("./pages/Painting"));
const Photography = lazy(() => import("./pages/Photography"));
const DigitalArt = lazy(() => import("./pages/DigitalArt"));
const TShirt = lazy(() => import("./pages/TShirt"));
const ArtworkDetail = lazy(() => import("./pages/ArtworkDetail"));
import NotFound from "./pages/NotFound";
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminArtworksStatus = lazy(() => import("./pages/AdminArtworksStatus"));
const AdminGestioneArchivio = lazy(() => import("./pages/AdminGestioneArchivio"));
const Classifica = lazy(() => import("./pages/Classifica"));
import CookieBanner from "./components/CookieBanner";
import BackToTop from "./components/BackToTop";
import { AudioProvider } from "./components/AudioProvider";
import PageFade from "./components/PageFade";

const queryClient = new QueryClient();

const App = () => {
  // Block right-click on images globally
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.tagName === "IMG") {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AudioProvider>
        <BrowserRouter>
          <CookieBanner />
          <PageFade>
          <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/archive/mia-selezione" element={<MiaSelezione />} />
            <Route path="/archive/mostre" element={<MostreIndex />} />
            <Route path="/archive/mostre/percorso-espositivo" element={<PercorsoEspositivo />} />
            <Route path="/archive/video" element={<VideoIndex />} />
            <Route path="/archive/download" element={<DownloadIndex />} />
            <Route path="/archive/critiche" element={<CritichePagina />} />
            <Route path="/archive/critiche/:slug" element={<CritichePagina />} />
            <Route path="/archive/progetti" element={<ProgettiIndex />} />
            <Route path="/archive/progetti/:slug" element={<ProgettiIndex />} />
            <Route path="/painting" element={<Painting />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/digital-art" element={<DigitalArt />} />
            <Route path="/t-shirt" element={<TShirt />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/artworks-status" element={<AdminArtworksStatus />} />
            <Route path="/admin/gestione-archivio-md" element={<AdminGestioneArchivio />} />
            <Route path="/classifica" element={<Classifica />} />
            <Route path="/:discipline/:artworkId" element={<ArtworkDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
          </PageFade>
          <BackToTop />
        </BrowserRouter>
        </AudioProvider>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);
};

export default App;
