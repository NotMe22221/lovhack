import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import SubmitProject from "./pages/SubmitProject";
import Winners from "./pages/Winners";
import Mentoring from "./pages/Mentoring";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/winners" element={<Winners />} />
              <Route path="/mentoring" element={<Mentoring />} />
              <Route path="/support" element={<Support />} />
              <Route path="/submit" element={<ProtectedRoute><SubmitProject /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/certificates" element={<AdminCertificates />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
