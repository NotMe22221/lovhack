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
import StatsSection from "@/components/sections/StatsSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LovHack | Build Something Real. No Experience Required.</title>
        <meta name="description" content="LovHack is a beginner-friendly online hackathon where developers, designers, and first-time builders ship real projects together in 48 hours. Join 350+ builders today." />
        <meta name="keywords" content="LovHack, hackathon, beginner hackathon, online hackathon, AI hackathon, vibe coding, build projects, learn to code, coding competition, web development" />
        <link rel="canonical" href="https://lovhack.dev" />
        <meta property="og:title" content="LovHack | Build Something Real. No Experience Required." />
        <meta property="og:description" content="Join the beginner-friendly online hackathon where 350+ builders ship real projects in 48 hours." />
        <meta property="og:url" content="https://lovhack.dev" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/0Zdn8PJ5cxRgu3hYnqh6K0Z3tOm1/social-images/social-1767829485654-Screenshot 2026-01-07 174428.png" />
        <meta name="twitter:title" content="LovHack | Build Something Real. No Experience Required." />
        <meta name="twitter:description" content="Join the beginner-friendly online hackathon where 350+ builders ship real projects in 48 hours." />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/0Zdn8PJ5cxRgu3hYnqh6K0Z3tOm1/social-images/social-1767829485654-Screenshot 2026-01-07 174428.png" />
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
