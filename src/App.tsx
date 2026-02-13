import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Bio from "./pages/Bio";
import Criticism from "./pages/Criticism";
import Painting from "./pages/Painting";
import Photography from "./pages/Photography";
import DigitalArt from "./pages/DigitalArt";
import TShirt from "./pages/TShirt";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/criticism" element={<Criticism />} />
          <Route path="/painting" element={<Painting />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/digital-art" element={<DigitalArt />} />
          <Route path="/t-shirt" element={<TShirt />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
