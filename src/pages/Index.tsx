import { Helmet } from "react-helmet-async";
import AnimatedBackground from "@/components/AnimatedBackground";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import DetailsSection from "@/components/sections/DetailsSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import CreaoPromoSection from "@/components/sections/CreaoPromoSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LovHack 2026 — 48 Hour Hackathon</title>
        <meta 
          name="description" 
          content="Join LovHack, a 48-hour build-first hackathon. Create real web apps, connect with builders, and ship something amazing. January 2-4, 2026. Online event." 
        />
        <meta name="keywords" content="hackathon, web development, coding, AI, LovHack, 48 hour hackathon, online hackathon" />
        <link rel="canonical" href="https://lovhack.dev" />
      </Helmet>
      
      <div className="relative min-h-screen overflow-x-hidden">
        <AnimatedBackground />
        
        <main>
          <HeroSection />
          <AboutSection />
          <DetailsSection />
          <CreaoPromoSection />
          <SponsorsSection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
