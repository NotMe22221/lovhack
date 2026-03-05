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
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import n8nLogo from "@/assets/n8n-logo.webp";
import miroLogo from "@/assets/miro-logo.webp";
import genxyzLogo from "@/assets/genxyz-logo.png";
import nodebaseLogo from "@/assets/nodebase-logo.webp";
import featherlessLogo from "@/assets/featherless-logo.png";
import relayLogo from "@/assets/relay-logo.png";
import codecraftersLogo from "@/assets/codecrafters-logo.png";
import mobbinLogo from "@/assets/mobbin-logo.svg";
import ideavoLogo from "@/assets/ideavo-logo.png";

const sponsors = [
  { name: "n8n", logo: n8nLogo, url: "https://n8n.io", hasLogo: true },
  { name: "Miro", logo: miroLogo, url: "https://miro.com", hasLogo: true },
  { name: "Gen.xyz", logo: genxyzLogo, url: "https://gen.xyz", hasLogo: true, invert: true },
  { name: "Nodebase", logo: nodebaseLogo, url: "https://nodebase.dev", hasLogo: true },
  { name: "Featherless", logo: featherlessLogo, url: "https://featherless.ai", hasLogo: true },
  { name: "Ideavo", logo: ideavoLogo, url: "https://ideavo.ai", hasLogo: true },
  { name: "Relay", logo: relayLogo, url: "https://relay.app", hasLogo: true },
  { name: "Mobbin", logo: mobbinLogo, url: "https://mobbin.com", hasLogo: true },
  { name: "CodeCrafters", logo: codecraftersLogo, url: "https://codecrafters.io", hasLogo: true },
];

const Season2 = () => {
  return (
    <>
      <Helmet>
        <title>LovHack Season 2 | Our Biggest Event Yet | LovHack</title>
        <meta
          name="description"
          content="LovHack Season 2 — our biggest hackathon yet. 8 sponsors, global participation, amazing prizes. March 21, 2026. Register now!"
        />
        <link rel="canonical" href="https://lovhack.dev/season-2" />
        <meta property="og:title" content="LovHack Season 2 | Our Biggest Event Yet" />
        <meta property="og:description" content="Our biggest hackathon yet. 8 sponsors, global participation, amazing prizes. March 21, 2026." />
        <meta property="og:url" content="https://lovhack.dev/season-2" />
        <meta name="twitter:title" content="LovHack Season 2 | Our Biggest Event Yet" />
        <meta name="twitter:description" content="Our biggest hackathon yet. 8 sponsors, global participation, amazing prizes. March 21, 2026." />
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
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
              Registrations Open
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-4">
              LovHack
              <br />
              Season <span className="text-primary">2</span>
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/70 mb-2 max-w-2xl mx-auto">
              Our Biggest Event Yet
            </p>
            <p className="text-lg text-foreground/50 mb-6 max-w-xl mx-auto">
              8 sponsors. Global participation. Amazing prizes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-foreground/60 font-medium mb-8">
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40">
                <Calendar className="w-5 h-5 text-primary" />
                March 21, 2026
              </div>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40">
                <Globe className="w-5 h-5 text-primary" />
                Online
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold">
                <a href="https://luma.com/95fwomd5" target="_blank" rel="noreferrer">
                  Register Now
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl">
                <a href="https://t.co/qMNpoZoiQZ" target="_blank" rel="noreferrer">
                  Join the Discord
                </a>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* What is it */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <GlassCard>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                What is <span className="text-primary">LovHack Season 2</span>?
              </h2>
              <div className="space-y-4 text-foreground/80">
                <p className="text-lg">
                  After months of hosting LovHack Minis, it's time for the <strong>big stuff</strong>. Season 2 is our largest event yet — backed by <strong>8 sponsors</strong>, with builders from around the world competing to ship real projects.
                </p>
                <p>
                  Whether you're a first-time builder or a seasoned developer, this is your chance to build something incredible, learn new tools, and compete for amazing prizes.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20">
                  <Users className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-foreground mb-1">Solo or Team</h3>
                  <p className="text-sm text-foreground/70">Build alone or with up to 3 friends</p>
                </div>
                <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20">
                  <Sparkles className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-foreground mb-1">Beginner Friendly</h3>
                  <p className="text-sm text-foreground/70">No experience required, just ideas</p>
                </div>
                <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20">
                  <Globe className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-foreground mb-1">Fully Online</h3>
                  <p className="text-sm text-foreground/70">Join from anywhere in the world</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* What You Get */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <GlassCard>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                What You Get as a <span className="text-primary">Participant</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-primary/5 rounded-2xl p-5 border border-primary/10">
                  <CheckCircle className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Certificate of Completion</h3>
                    <p className="text-sm text-foreground/70">Every participant who submits a project receives an official LovHack certificate</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-primary/5 rounded-2xl p-5 border border-primary/10">
                  <Trophy className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Amazing Prizes</h3>
                    <p className="text-sm text-foreground/70">Prize details will be announced soon — stay tuned on Discord!</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-primary/5 rounded-2xl p-5 border border-primary/10">
                  <Zap className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Sponsor Perks</h3>
                    <p className="text-sm text-foreground/70">Free credits and tools from our 8 amazing sponsors</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-primary/5 rounded-2xl p-5 border border-primary/10">
                  <Users className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Global Community</h3>
                    <p className="text-sm text-foreground/70">Connect with builders from 20+ countries and grow your network</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Tracks */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <GlassCard>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                Suggested <span className="text-primary">Tracks</span>
              </h2>
              <p className="text-foreground/70 mb-6">Build anything you want, or explore one of these focus areas:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-primary/5 rounded-2xl p-5 border border-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Education & Student Life</h3>
                    <p className="text-sm text-foreground/70">Apps that solve real problems for students, educators, and learners</p>
                  </div>
                </div>
                <div className="relative flex items-start gap-3 bg-primary/10 rounded-2xl p-5 border-2 border-primary/30">
                  <Rocket className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground">Productivity & Workflows</h3>
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-1.5 py-0">⚡ n8n</Badge>
                    </div>
                    <p className="text-sm text-foreground/70">Tools that help people get more done with less effort — powered by n8n</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-primary/5 rounded-2xl p-5 border border-primary/10">
                  <Lightbulb className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Creators & Digital Communities</h3>
                    <p className="text-sm text-foreground/70">Platforms and tools for content creators, artists, and community builders</p>
                  </div>
                </div>
                <div className="relative flex items-start gap-3 bg-primary/10 rounded-2xl p-5 border-2 border-primary/30">
                  <Bot className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground">AI Frontier</h3>
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-1.5 py-0">🔥 HOT</Badge>
                    </div>
                    <p className="text-sm text-foreground/70">
                      AI agents that automate workflows and solve complex tasks
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Sponsors */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground">Powered By</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {sponsors.map((sponsor) => (
                <GlassCard key={sponsor.name} className="text-center !p-5">
                  <div className="h-14 flex items-center justify-center mb-3">
                    {sponsor.hasLogo && sponsor.logo ? (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className={`max-h-full max-w-[120px] object-contain ${sponsor.invert ? "invert brightness-200" : ""}`}
                      />
                    ) : (
                      <span className="text-2xl font-black text-foreground/70">{sponsor.name}</span>
                    )}
                  </div>
                  {sponsor.hasLogo && (
                    <p className="text-sm font-semibold text-foreground/60">{sponsor.name}</p>
                  )}
                  {sponsor.url && (
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                    >
                      Visit <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground">
              How It <span className="text-primary">Works</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Join Discord", desc: "Sign up and join our community server", icon: Users },
                { step: "2", title: "Build for 48 Hours", desc: "Design, code, and ship your project", icon: Zap },
                { step: "3", title: "Submit Your Project", desc: "Share your creation with the community", icon: Rocket },
                { step: "4", title: "Get Judged", desc: "Receive feedback and compete for prizes", icon: Trophy },
              ].map((item) => (
                <GlassCard key={item.step} className="text-center !p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-2">Step {item.step}</div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.desc}</p>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Important Note */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
            <GlassCard className="border-amber-500/30 bg-amber-500/5">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Important Note</h3>
                  <p className="text-foreground/70">
                    Agents built before March 21st won't be accepted for the hackathon. Make sure to start fresh when the event begins!
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <GlassCard className="text-center bg-gradient-to-br from-primary/10 to-primary/5">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Ready to Build?</h2>
              <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                Register now and join hundreds of builders from around the world for our biggest event yet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold">
                  <a href="https://luma.com/95fwomd5" target="_blank" rel="noreferrer">
                    Register on Luma <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl">
                  <a href="https://t.co/qMNpoZoiQZ" target="_blank" rel="noreferrer">
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

export default Season2;
