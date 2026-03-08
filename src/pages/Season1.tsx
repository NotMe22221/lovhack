import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import WinnersSection from "@/components/sections/WinnersSection";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Users, Globe, Rocket, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

import lovableLogo from "@/assets/lovable-logo.png";
import creaoLogo from "@/assets/creao-logo.png";
import hadoLogo from "@/assets/hado-logo-v3.png";
import flootLogo from "@/assets/floot-logo.png";
import qoderLogo from "@/assets/qoder-logo.png";

import momentumLogo from "@/assets/momentum-logo.png";

const Season1 = () => {
  const stats = [
    { icon: Users, value: "100+", label: "Builders" },
    { icon: Rocket, value: "43", label: "Shipped" },
    { icon: Globe, value: "20+", label: "Countries" },
    { icon: Trophy, value: "$10K+", label: "In Prizes" },
  ];

  const sponsors = [
    { name: "Lovable", logo: lovableLogo, url: "https://lovable.dev" },
    { name: "Momentum", logo: momentumLogo, url: "https://momentum.sh" },
    { name: "Creao", logo: creaoLogo, url: "https://creao.ai" },
    { name: "Hado", logo: hadoLogo, url: "https://hado.dev" },
    { name: "Floot", logo: flootLogo, url: "https://floot.io" },
    { name: "Qoder", logo: qoderLogo, url: "https://qoder.ai" },
    
  ];

  return (
    <>
      <Helmet>
        <title>Season 1 Recap | LovHack Time Capsule</title>
        <meta name="description" content="The archive of LovHack Season 1. See the winners and projects from our first 48-hour hackathon." />
        <link rel="canonical" href="https://lovhack.dev/season-1" />
        <meta property="og:title" content="Season 1 Recap | LovHack Time Capsule" />
        <meta property="og:description" content="The archive of LovHack Season 1. See the winners and projects from our first 48-hour hackathon." />
        <meta property="og:url" content="https://lovhack.dev/season-1" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/0Zdn8PJ5cxRgu3hYnqh6K0Z3tOm1/social-images/social-1767829485654-Screenshot 2026-01-07 174428.png" />
        <meta name="twitter:title" content="Season 1 Recap | LovHack Time Capsule" />
        <meta name="twitter:description" content="The archive of LovHack Season 1. See the winners and projects from our first 48-hour hackathon." />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/0Zdn8PJ5cxRgu3hYnqh6K0Z3tOm1/social-images/social-1767829485654-Screenshot 2026-01-07 174428.png" />
      </Helmet>

      <AnimatedBackground />
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Navigation & Header */}
        <section className="px-4 max-w-7xl mx-auto mb-12">
          <Link to="/hackathons" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Archive
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-foreground/10 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-sm font-bold tracking-wider uppercase mb-4 border border-amber-500/20">
                Time Capsule
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground mb-2 tracking-tighter">Season 1</h1>
              <p className="text-xl text-foreground/60">January 2nd - 4th, 2025</p>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/40 backdrop-blur-md rounded-2xl p-3 sm:p-4 min-w-[80px] sm:min-w-[100px] border border-white/40 text-center">
                  <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-foreground/60 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WINNERS PODIUM */}
        <WinnersSection />

        {/* SPONSORS SECTION */}
        <section className="px-4 max-w-5xl mx-auto py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Powered By
            </h2>
            <p className="text-foreground/60 max-w-lg mx-auto">
              These incredible sponsors made Season 1 possible.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {sponsors.map((sponsor, index) => (
              <motion.a
                key={index}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group aspect-square bg-white/60 backdrop-blur-md rounded-2xl p-4 flex items-center justify-center border border-white/40 hover:border-primary/30 hover:bg-white/80 transition-all duration-300"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </motion.a>
            ))}
          </div>
        </section>

        <DiscordCTASection />
      </main>

      <Footer />
    </>
  );
};

export default Season1;
