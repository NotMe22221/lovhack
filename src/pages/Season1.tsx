import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import DetailsSection from "@/components/sections/DetailsSection";
import LovablePromoSection from "@/components/sections/LovablePromoSection";
import MomentumPromoSection from "@/components/sections/MomentumPromoSection";
import CreaoPromoSection from "@/components/sections/CreaoPromoSection";
import HadoPromoSection from "@/components/sections/HadoPromoSection";
import FlootPromoSection from "@/components/sections/FlootPromoSection";
import QoderPromoSection from "@/components/sections/QoderPromoSection";
import SponsorsSection from "@/components/sections/SponsorsSection";
import Footer from "@/components/sections/Footer";
import GlassCard from "@/components/GlassCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Users, Globe, Rocket } from "lucide-react";

const Season1 = () => {
  const stats = [
    { icon: Users, value: "100+", label: "Builders" },
    { icon: Rocket, value: "40+", label: "Projects Shipped" },
    { icon: Globe, value: "20+", label: "Countries" },
    { icon: Trophy, value: "$5K+", label: "In Prizes" },
  ];

  return (
    <>
      <Helmet>
        <title>Season 1 Recap | LovHack 2026 Hackathon</title>
        <meta
          name="description"
          content="Relive LovHack Season 1 - our first hackathon with 100+ builders, 40+ projects, and $5K+ in prizes. See the tools, sponsors, and highlights."
        />
        <meta
          name="keywords"
          content="LovHack Season 1, hackathon recap, LovHack 2026, hackathon results, AI hackathon, vibe coding"
        />
        <link rel="canonical" href="https://lovhack.dev/season-1" />
      </Helmet>

      <AnimatedBackground />
      <Navbar />

      <main className="pt-24">
        {/* Archive Notice */}
        <section className="px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <GlassCard className="p-6 bg-amber-50/50 border-amber-200/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <span className="text-3xl">📁</span>
                <div>
                  <h2 className="font-bold text-foreground">This Hackathon Has Concluded</h2>
                  <p className="text-foreground/70 text-sm">
                    Season 1 ran from January 3-5, 2026. Check out what our builders created!
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="sm:ml-auto bg-white/60"
                >
                  <a
                    href="https://t.co/qMNpoZoiQZ"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Discord for Next Event
                  </a>
                </Button>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <span className="text-sm font-medium text-primary">Season 1 • January 2026</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                LovHack <span className="text-primary">2026</span>
              </h1>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Our inaugural hackathon brought together builders from around the world 
                to ship amazing projects using the latest AI and dev tools.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <GlassCard key={index} className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Original Content */}
        <HeroSection />
        <AboutSection />
        <DetailsSection />

        {/* Sponsor Tools */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Tools That Powered Season 1
            </h2>
            <p className="text-foreground/70">
              Our sponsors provided exclusive access to these amazing tools.
            </p>
          </div>
        </section>
        
        <LovablePromoSection />
        <MomentumPromoSection />
        <CreaoPromoSection />
        <HadoPromoSection />
        <FlootPromoSection />
        <QoderPromoSection />
        
        <SponsorsSection />
      </main>

      <Footer />
    </>
  );
};

export default Season1;
