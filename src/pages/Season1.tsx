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

  const projects = [
    {
      title: "MindFlow",
      desc: "AI-powered meditation companion that adapts to your biometrics.",
      category: "Health & Wellness",
      winner: true,
    },
    {
      title: "DevSprint",
      desc: "Gamified project management for solo developers.",
      category: "Productivity",
      winner: true,
    },
    {
      title: "Echo",
      desc: "Real-time voice translation for Discord voice channels.",
      category: "Communication",
      winner: false,
    },
    {
      title: "PixelCraft",
      desc: "Browser-based generative pixel art studio.",
      category: "Creative Tool",
      winner: false,
    },
    {
      title: "GreenThumb",
      desc: "IoT plant monitoring dashboard.",
      category: "IoT",
      winner: false,
    },
    {
      title: "StudyBuddy",
      desc: "Collaborative flashcards with spaced repetition.",
      category: "Education",
      winner: false,
    },
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

        {/* PROJECT GALLERY */}
        <section className="px-4 max-w-7xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8">Shipped Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <GlassCard key={index} className="p-6 group hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-black/5 uppercase tracking-wide">
                    {project.category}
                  </span>
                  {project.winner && (
                    <span className="text-xs font-bold px-2 py-1 rounded bg-yellow-400/20 text-yellow-700 flex items-center gap-1">
                      <Trophy className="w-3 h-3" /> Winner
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-foreground/70 mb-6">{project.desc}</p>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="w-full gap-2 bg-white/50">
                    <Play className="w-3 h-3" /> Demo
                  </Button>
                  <Button size="sm" variant="outline" className="w-full gap-2 bg-white/50">
                    <Github className="w-3 h-3" /> Code
                  </Button>
                </div>
              </GlassCard>
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
