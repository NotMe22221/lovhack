import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import GlassCard from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Globe,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  Zap,
  Trophy,
  CheckCircle,
  Lightbulb,
  Rocket,
  GraduationCap,
  Bot,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import medoLogo from "@/assets/medo-logo.png";
import genxyzLogo from "@/assets/genxyz-logo.png";

const MedoHack = () => {
  return (
    <>
      <Helmet>
        <title>LovHack Mini x Medo | End February by Building Something Real | LovHack</title>
        <meta
          name="description"
          content="LovHack Mini x Medo — a free 48-hour online hackathon for builders of all levels. Feb 28 – March 1. 300 free Medo credits, certificates, and prizes for top teams."
        />
        <link rel="canonical" href="https://lovhack.dev/medo-hack" />
        <meta property="og:title" content="LovHack Mini x Medo | End February by Building Something Real" />
        <meta
          property="og:description"
          content="A free 48-hour online hackathon for builders of all levels. Feb 28 – March 1. 300 free Medo credits for all participants."
        />
        <meta property="og:url" content="https://lovhack.dev/medo-hack" />
        <meta name="twitter:title" content="LovHack Mini x Medo | End February by Building Something Real" />
        <meta
          name="twitter:description"
          content="A free 48-hour online hackathon for builders of all levels. Feb 28 – March 1. 300 free Medo credits for all participants."
        />
      </Helmet>

      <AnimatedBackground />
      <Navbar />

      <main className="pt-28 sm:pt-32 pb-20">
        {/* Back Link */}
        <section className="px-4 max-w-5xl mx-auto mb-8">
          <Link
            to="/hackathons"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Hackathons
          </Link>
        </section>

        {/* Hero Section */}
        <section className="px-4 text-center mb-16 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-blue-500/20 text-blue-600 border-blue-500/30 hover:bg-blue-500/30">
              Free Event
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-4">
              End February by Building
              <br />
              Something <span className="text-blue-500">Real</span>
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/70 mb-6 max-w-2xl mx-auto">
              LovHack Mini x Medo — a free 48-hour online hackathon for builders of all levels
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-foreground/60 font-medium mb-8">
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40">
                <Calendar className="w-5 h-5 text-blue-500" />
                February 28 — March 1
              </div>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40">
                <Globe className="w-5 h-5 text-blue-500" />
                Online
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold">
                <a href="https://luma.com/q44qpofa" target="_blank" rel="noreferrer">
                  Register Now
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl">
                <a href="https://discord.gg/lovhack" target="_blank" rel="noreferrer">
                  Join the Discord
                </a>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* What the Hackathon Is */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                What is <span className="text-blue-500">LovHack Mini x Medo</span>?
              </h2>
              <div className="space-y-4 text-foreground/80">
                <p className="text-lg">
                  A <strong>free online hackathon powered by Medo</strong>, where builders design, prototype, and ship
                  working applications in 48 hours. Whether you're a first-timer or a seasoned developer, this is your
                  chance to build something real — fast.
                </p>
                <p>
                  Our mission is simple: lower the barrier to building. With free credits, a supportive community, and
                  beginner-friendly resources, there's nothing stopping you from shipping your next idea.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-blue-500/10 rounded-2xl p-5 border border-blue-500/20">
                  <Users className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="font-bold text-foreground mb-1">Solo or Team</h3>
                  <p className="text-sm text-foreground/70">Build alone or with up to 3 friends</p>
                </div>
                <div className="bg-blue-500/10 rounded-2xl p-5 border border-blue-500/20">
                  <Sparkles className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="font-bold text-foreground mb-1">Beginner Friendly</h3>
                  <p className="text-sm text-foreground/70">No experience required, just ideas</p>
                </div>
                <div className="bg-blue-500/10 rounded-2xl p-5 border border-blue-500/20">
                  <Globe className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="font-bold text-foreground mb-1">Fully Online</h3>
                  <p className="text-sm text-foreground/70">Join from anywhere in the world</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* What You Get */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <GlassCard>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                What You Get as a <span className="text-blue-500">Participant</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-blue-500/5 rounded-2xl p-5 border border-blue-500/10">
                  <Zap className="w-8 h-8 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">300 Free Medo Credits</h3>
                    <p className="text-sm text-foreground/70">
                      Build with AI-powered tools at no cost during the entire event
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-blue-500/5 rounded-2xl p-5 border border-blue-500/10">
                  <CheckCircle className="w-8 h-8 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Certificate of Completion</h3>
                    <p className="text-sm text-foreground/70">
                      Every participant who submits a project receives an official LovHack certificate
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-blue-500/5 rounded-2xl p-5 border border-blue-500/10">
                  <Trophy className="w-8 h-8 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Additional Prizes for Top Teams</h3>
                    <p className="text-sm text-foreground/70">
                      Top 5 teams win one month of Medo free, top 3 get a free .xyz domain for a year
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-blue-500/5 rounded-2xl p-5 border border-blue-500/10">
                  <Users className="w-8 h-8 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Referral Program</h3>
                    <p className="text-sm text-foreground/70">
                      Our referral program is live! Invite friends and we'll track it on Discord
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Tracks / Themes */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                Suggested <span className="text-blue-500">Tracks</span>
              </h2>
              <p className="text-foreground/70 mb-6">Build anything you want, or explore one of these focus areas:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-blue-500/5 rounded-2xl p-5 border border-blue-500/10">
                  <Rocket className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Productivity</h3>
                    <p className="text-sm text-foreground/70">Tools that help people get more done with less effort</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-blue-500/5 rounded-2xl p-5 border border-blue-500/10">
                  <GraduationCap className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Student Life</h3>
                    <p className="text-sm text-foreground/70">
                      Apps that solve real problems for students and learners
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-blue-500/5 rounded-2xl p-5 border border-blue-500/10">
                  <Lightbulb className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Creators</h3>
                    <p className="text-sm text-foreground/70">Platforms and tools for content creators and artists</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-blue-500/5 rounded-2xl p-5 border border-blue-500/10">
                  <Bot className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Agent Innovation</h3>
                    <p className="text-sm text-foreground/70">
                      AI agents that automate workflows and solve complex tasks
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Prizes Section */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <GlassCard className="text-center bg-gradient-to-br from-blue-500/10 to-blue-500/5">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">🏆 Prizes</h2>
              <div className="space-y-4 text-foreground/80 max-w-xl mx-auto">
                <div className="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-white/40">
                  <CheckCircle className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-foreground mb-2">All Participants</h3>
                  <p className="text-sm">Certificate of Completion + 300 free Medo credits to build with</p>
                </div>
                <div className="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-white/40">
                  <Trophy className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-foreground mb-2">Top 5 Teams</h3>
                  <p className="text-sm">One month of Medo free</p>
                </div>
                <div className="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-white/40">
                  <Globe className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-foreground mb-2">Top 3 Teams</h3>
                  <p className="text-sm">Free .xyz domain for a year from gen.xyz</p>
                </div>
              </div>
              <p className="text-foreground/60 text-sm mt-6">
                Judging criteria and additional prize details will be shared closer to when the hackathon starts!
              </p>
            </GlassCard>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground">
              How It <span className="text-blue-500">Works</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Join Discord", desc: "Sign up and join our community server", icon: Users },
                { step: "2", title: "Build for 48 Hours", desc: "Design, code, and ship your project", icon: Zap },
                {
                  step: "3",
                  title: "Submit Your Project",
                  desc: "Share your creation with the community",
                  icon: Rocket,
                },
                { step: "4", title: "Get Judged", desc: "Receive feedback and compete for prizes", icon: Trophy },
              ].map((item) => (
                <GlassCard key={item.step} className="text-center !p-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="text-xs font-bold text-blue-500 mb-2">Step {item.step}</div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.desc}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Sponsors Section */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground">Powered By</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Medo */}
              <GlassCard className="text-center">
                <div className="h-20 flex items-center justify-center mb-4">
                  <img src={medoLogo} alt="Medo" className="max-h-full max-w-[180px] object-contain" />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-2">Medo</h3>
                <p className="text-foreground/70 text-sm">
                  Build with AI-powered tools. 300 free credits for all participants!
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4 rounded-xl">
                  <a href="https://medo.dev" target="_blank" rel="noreferrer">
                    Learn More <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </GlassCard>

              {/* gen.xyz */}
              <GlassCard className="text-center">
                <div className="h-20 flex items-center justify-center mb-4">
                  <img src={genxyzLogo} alt="gen.xyz" className="max-h-full max-w-[180px] object-contain invert" />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-2">gen.xyz</h3>
                <p className="text-foreground/70 text-sm">Free .xyz domain for a year for top 3 teams!</p>
                <Button asChild variant="outline" size="sm" className="mt-4 rounded-xl">
                  <a href="https://gen.xyz" target="_blank" rel="noreferrer">
                    Learn More <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </GlassCard>
            </div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <GlassCard className="!p-8 sm:!p-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Ready to Build?</h2>
              <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                Join LovHack Mini x Medo on February 28 — March 1 and ship something real in 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold">
                  <a href="https://luma.com/q44qpofa" target="_blank" rel="noreferrer">
                    Register Now
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl">
                  <a href="https://discord.gg/lovhack" target="_blank" rel="noreferrer">
                    Join Discord
                  </a>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        <DiscordCTASection />
      </main>

      <Footer />
    </>
  );
};

export default MedoHack;
