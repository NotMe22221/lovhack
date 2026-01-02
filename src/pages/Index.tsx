import { Helmet } from "react-helmet-async";
import AnimatedBackground from "@/components/AnimatedBackground";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import DetailsSection from "@/components/sections/DetailsSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import CreaoPromoSection from "@/components/sections/CreaoPromoSection";
import HadoPromoSection from "@/components/sections/HadoPromoSection";
import FlootPromoSection from "@/components/sections/FlootPromoSection";
import LovablePromoSection from "@/components/sections/LovablePromoSection";
import QoderPromoSection from "@/components/sections/QoderPromoSection";
import MomentumPromoSection from "@/components/sections/MomentumPromoSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LovHack 2026 — 48 Hour Online Hackathon | Build Real Apps</title>
        <meta 
          name="description" 
          content="Join LovHack 2026, the ultimate 48-hour online hackathon for developers. LovHack brings together web app builders to create real apps with AI tools. January 2-4, 2026 at lovhack.dev" 
        />
        <meta name="keywords" content="LovHack, LovHack hackathon, LovHack 2026, LovHack 48-hour online hackathon, LovHack dev tools, LovHack developers, LovHack web apps, lovhack.dev, hackathon, web development, coding, AI, 48 hour hackathon, online hackathon, build apps, January 2026 hackathon, vibe coding hackathon" />
        <link rel="canonical" href="https://lovhack.dev" />
      </Helmet>
      
      <div className="relative min-h-screen overflow-x-hidden">
        <AnimatedBackground />
        
        <header>
          <HeroSection />
        </header>
        
        <main>
          <article>
            <AboutSection />
          </article>
          <section aria-label="Event Details">
            <DetailsSection />
          </section>
          <aside aria-label="Sponsor Offers">
            <LovablePromoSection />
            <MomentumPromoSection />
            <CreaoPromoSection />
            <HadoPromoSection />
            <FlootPromoSection />
            <QoderPromoSection />
          </aside>
          <section aria-label="Sponsors">
            <SponsorsSection />
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
