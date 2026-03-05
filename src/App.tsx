import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Season1 from "./pages/Season1";
import About from "./pages/About";
import Sponsors from "./pages/Sponsors";
import Hackathons from "./pages/Hackathons";
import MiniHack from "./pages/MiniHack";
import MedoHack from "./pages/MedoHack";
import Season2 from "./pages/Season2";
import NotFound from "./pages/NotFound";

import AdminCertificates from "./pages/AdminCertificates";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/season-1" element={<Season1 />} />
            <Route path="/about" element={<About />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/mini-hack" element={<MiniHack />} />
            <Route path="/medo-hack" element={<MedoHack />} />
            <Route path="/season-2" element={<Season2 />} />
            
            <Route path="/admin/certificates" element={<AdminCertificates />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
