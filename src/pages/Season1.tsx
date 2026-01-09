import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import WinnersSection from "@/components/sections/WinnersSection";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import GlassCard from "@/components/GlassCard";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Users, Globe, Rocket, Play, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Season1 = () => {
  const stats = [
    { icon: Users, value: "100+", label: "Builders" },
    { icon: Rocket, value: "43", label: "Shipped Projects" },
    { icon: Globe, value: "20+", label: "Countries" },
    { icon: Trophy, value: "$5K+", label: "In Prizes" },
  ];


  return (
    <>
      <Helmet>
        <title>Season 1 Recap | Time Capsule</title>
        <meta name="description" content="The archive of LovHack Season 1. See the winners and projects." />
      </Helmet>

      <AnimatedBackground />
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Navigation & Header */}
        <section className="px-4 max-w-7xl mx-auto mb-12">
          <Link to="/hackathons" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Archive
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-foreground/10 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-sm font-bold tracking-wider uppercase mb-4 border border-amber-500/20">
                Time Capsule
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground mb-2 tracking-tighter">Season 1</h1>
              <p className="text-xl text-foreground/60">January 3rd - 5th, 2026</p>
            </div>
            <div className="flex gap-4 text-right">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/40 backdrop-blur-md rounded-2xl p-4 min-w-[100px] border border-white/40">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-foreground/60 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WINNERS PODIUM */}
        <WinnersSection />

        <DiscordCTASection />
      </main>

      <Footer />
    </>
  );
};

export default Season1;
