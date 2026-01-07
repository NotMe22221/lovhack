import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import GlassCard from "@/components/GlassCard";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import { ExternalLink, Gift, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

import lovableLogo from "@/assets/lovable-logo.png";
import creaoLogo from "@/assets/creao-logo.png";
import hadoLogo from "@/assets/hado-logo-v3.png";
import flootLogo from "@/assets/floot-logo.png";
import qoderLogo from "@/assets/qoder-logo.png";
import dualiteLogo from "@/assets/dualite-logo.png";
import momentumLogo from "@/assets/momentum-logo.png";

const Sponsors = () => {
  const sponsors = [
    {
      name: "Lovable",
      logo: lovableLogo,
      description: "Build full-stack web apps with AI. Ship faster than ever before with natural language prompts.",
      offer: "1 month free Pro plan for all participants",
      website: "https://lovable.dev",
      featured: true,
    },
    {
      name: "Momentum",
      logo: momentumLogo,
      description: "AI-powered development platform that accelerates your workflow and helps you ship faster.",
      offer: "Extended trial access for participants",
      website: "https://momentum.sh",
      featured: true,
    },
    {
      name: "Creao",
      logo: creaoLogo,
      description: "Create beautiful designs and prototypes with AI assistance. Perfect for non-designers.",
      offer: "Special access for hackathon participants",
      website: "https://creao.ai",
    },
    {
      name: "Hado",
      logo: hadoLogo,
      description: "Build and deploy backend services with ease. Focus on your product, not infrastructure.",
      offer: "Free credits for hackathon projects",
      website: "https://hado.dev",
    },
    {
      name: "Floot",
      logo: flootLogo,
      description: "Streamline your development workflow with intelligent automation and tooling.",
      offer: "Premium access during the hackathon",
      website: "https://floot.io",
    },
    {
      name: "Qoder",
      logo: qoderLogo,
      description: "AI code assistant that helps you write better code faster. Your pair programming buddy.",
      offer: "Extended trial for all participants",
      website: "https://qoder.ai",
    },
    {
      name: "Dualite",
      logo: dualiteLogo,
      description: "Convert Figma designs to production-ready code automatically. Design to code in seconds.",
      offer: "Free conversions for hackathon projects",
      website: "https://dualite.com",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sponsors & Tools | LovHack Hackathon Partners</title>
        <meta
          name="description"
          content="Meet the amazing sponsors and tools that power LovHack hackathons. Participants get exclusive access to Lovable, Creao, Hado, and more."
        />
        <link rel="canonical" href="https://lovhack.dev/sponsors" />
      </Helmet>

      <AnimatedBackground />
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Sponsors & Tools</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              LovHack is powered by amazing companies that provide exclusive tools and perks 
              to help you build faster and better.
            </p>
          </div>
        </section>

        {/* Sponsors Grid */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {sponsors.map((sponsor, index) => (
                <GlassCard
                  key={index}
                  className={`p-6 ${sponsor.featured ? "md:col-span-2 bg-gradient-to-br from-primary/5 to-transparent" : ""}`}
                >
                  <div className={`flex flex-col ${sponsor.featured ? "md:flex-row md:items-center" : ""} gap-6`}>
                    {/* Logo */}
                    <div className={`flex-shrink-0 ${sponsor.featured ? "md:w-48" : ""}`}>
                      <div className="w-24 h-24 bg-white/60 rounded-2xl border border-white/50 flex items-center justify-center p-4">
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-2">{sponsor.name}</h3>
                      <p className="text-foreground/70 mb-4">{sponsor.description}</p>
                      
                      {/* Offer Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-100 text-green-700 text-sm font-medium mb-4">
                        <Gift className="w-4 h-4" />
                        {sponsor.offer}
                      </div>
                      
                      {/* CTA */}
                      <div>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="bg-white/60 border-white/50"
                        >
                          <a
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            Visit Website
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Become a Sponsor */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/10 to-transparent">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Become a Sponsor
              </h2>
              <p className="text-lg text-foreground/70 max-w-xl mx-auto mb-8">
                Want to get your tool in front of hundreds of builders? Partner with LovHack 
                to showcase your product to developers, designers, and makers who ship.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl px-8"
              >
                <a
                  href="https://t.co/qMNpoZoiQZ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reach Out on Discord
                </a>
              </Button>
            </GlassCard>
          </div>
        </section>

        <DiscordCTASection variant="compact" />
      </main>

      <Footer />
    </>
  );
};

export default Sponsors;
