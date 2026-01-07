import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import NewHeroSection from "@/components/sections/NewHeroSection";
import WhatIsLovHackSection from "@/components/sections/WhatIsLovHackSection";
import WhoIsForSection from "@/components/sections/WhoIsForSection";
import Season1PreviewSection from "@/components/sections/Season1PreviewSection";
import WinnersSection from "@/components/sections/WinnersSection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import SponsorsPreviewSection from "@/components/sections/SponsorsPreviewSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LovHack | Build Something Real. No Experience Required.</title>
        <meta
          name="description"
          content="LovHack is a beginner-friendly online hackathon where developers, designers, and first-time builders ship real projects together in 48 hours. Join 500+ builders today."
        />
        <meta
          name="keywords"
          content="LovHack, hackathon, beginner hackathon, online hackathon, AI hackathon, vibe coding, build projects, learn to code, coding competition, web development"
        />
        <link rel="canonical" href="https://lovhack.dev" />
        
        {/* Open Graph */}
        <meta property="og:title" content="LovHack | Build Something Real. No Experience Required." />
        <meta property="og:description" content="Join the beginner-friendly online hackathon where 500+ builders ship real projects in 48 hours." />
        <meta property="og:url" content="https://lovhack.dev" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LovHack | Build Something Real. No Experience Required." />
        <meta name="twitter:description" content="Join the beginner-friendly online hackathon where 500+ builders ship real projects in 48 hours." />
      </Helmet>

      <AnimatedBackground />
      <Navbar />
      
      <main>
        <NewHeroSection />
        <WhatIsLovHackSection />
        <WhoIsForSection />
        <Season1PreviewSection />
        <WinnersSection />
        <UpcomingEventsSection />
        <SponsorsPreviewSection />
        <FAQSection />
        <DiscordCTASection />
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
