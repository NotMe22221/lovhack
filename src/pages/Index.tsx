import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import NewHeroSection from "@/components/sections/NewHeroSection";
import WhatIsLovHackSection from "@/components/sections/WhatIsLovHackSection";
import WhoIsForSection from "@/components/sections/WhoIsForSection";
import Season1PreviewSection from "@/components/sections/Season1PreviewSection";
import WinnersSection from "@/components/sections/WinnersSection";
import UpcomingEventsSection from "@/components/sections/UpcomingEventsSection";

import SponsorsPreviewSection from "@/components/sections/SponsorsPreviewSection";
import FAQSection from "@/components/sections/FAQSection";
import StatsSection from "@/components/sections/StatsSection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LovHack | Build Something Real. No Experience Required.</title>
        <meta name="description" content="LovHack is a beginner-friendly online hackathon where 350+ developers and first-time builders ship real projects in 48 hours. Join free today." />
        <meta name="keywords" content="LovHack, hackathon, beginner hackathon, online hackathon, AI hackathon, vibe coding, build projects, learn to code, coding competition, web development" />
        <link rel="canonical" href="https://lovhack.dev" />
        <meta property="og:title" content="LovHack | Build Something Real. No Experience Required." />
        <meta property="og:description" content="Join the beginner-friendly online hackathon where 350+ builders ship real projects in 48 hours." />
        <meta property="og:url" content="https://lovhack.dev" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/0Zdn8PJ5cxRgu3hYnqh6K0Z3tOm1/social-images/social-1767829485654-Screenshot 2026-01-07 174428.png" />
        <meta name="twitter:title" content="LovHack | Build Something Real. No Experience Required." />
        <meta name="twitter:description" content="Join the beginner-friendly online hackathon where 350+ builders ship real projects in 48 hours." />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/0Zdn8PJ5cxRgu3hYnqh6K0Z3tOm1/social-images/social-1767829485654-Screenshot 2026-01-07 174428.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Do I need coding experience to participate?", acceptedAnswer: { "@type": "Answer", text: "Not at all! LovHack is beginner-friendly. You can use AI tools like Lovable, low-code platforms, or learn as you go. Many of our participants build their first project at LovHack." } },
            { "@type": "Question", name: "Can I join without a team?", acceptedAnswer: { "@type": "Answer", text: "Absolutely! You can participate solo, or join our Discord to find teammates before or during the hackathon. We have dedicated channels for team formation." } },
            { "@type": "Question", name: "What can I build?", acceptedAnswer: { "@type": "Answer", text: "Anything you want! Web apps, AI tools, games, productivity tools, browser extensions. If you can build it during the hackathon, it counts." } },
            { "@type": "Question", name: "Is it really free?", acceptedAnswer: { "@type": "Answer", text: "Yes! LovHack is completely free to participate. Our sponsors provide tools and prizes, so you can focus on building without any cost." } },
            { "@type": "Question", name: "What tools can I use?", acceptedAnswer: { "@type": "Answer", text: "You can use any tools you want. Many participants use AI-powered tools like Lovable, Creao, and others from our sponsors. Traditional coding is also welcome!" } },
            { "@type": "Question", name: "How does judging work?", acceptedAnswer: { "@type": "Answer", text: "Projects are judged on creativity, execution, impact, and presentation. We have categories for different types of projects, so there are multiple ways to win." } }
          ]
        })}</script>
      </Helmet>

      <AnimatedBackground />
      <Navbar />
      
      <main>
        <NewHeroSection />
        <WhatIsLovHackSection />
        <StatsSection />
        <WhoIsForSection />
        <Season1PreviewSection />
        <WinnersSection />
        <UpcomingEventsSection />
        <SponsorsPreviewSection />
        <FAQSection />
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
