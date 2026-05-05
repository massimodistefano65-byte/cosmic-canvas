import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/lib/i18n";
import Index from "./pages/Index";
import Bio from "./pages/Bio";
import Archive from "./pages/Archive";
import Painting from "./pages/Painting";
import Photography from "./pages/Photography";
import DigitalArt from "./pages/DigitalArt";
import TShirt from "./pages/TShirt";
import ArtworkDetail from "./pages/ArtworkDetail";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import Contact from "./pages/Contact";
import AdminArtworksStatus from "./pages/AdminArtworksStatus";
import CookieBanner from "./components/CookieBanner";
import { AudioProvider } from "./components/AudioProvider";

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
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/painting" element={<Painting />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/digital-art" element={<DigitalArt />} />
            <Route path="/t-shirt" element={<TShirt />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/artworks-status" element={<AdminArtworksStatus />} />
            <Route path="/:discipline/:artworkId" element={<ArtworkDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AudioProvider>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);
};

export default App;
