import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import GlassCard from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import {
  Calendar, Users, Globe, Sparkles, ArrowLeft, Zap, Trophy,
  CheckCircle, Lightbulb, Rocket, GraduationCap, Bot, AlertTriangle,
  Eye, Heart, Megaphone, FolderOpen,
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
import ideavoLogo from "@/assets/ideavo-logo-v2.png";
import momentumLogo from "@/assets/momentum-logo.png";
import creaoLogo from "@/assets/creao-logo.png";
import momenLogo from "@/assets/momen-logo.png";
import devswarmLogo from "@/assets/devswarm-logo.png";

const communitySponsors = [
  { name: "Miro", logo: miroLogo, url: "https://miro.com", invert: false },
  { name: "n8n", logo: n8nLogo, url: "https://n8n.io", invert: false },
  { name: "Gen.xyz", logo: genxyzLogo, url: "https://gen.xyz", invert: true },
  { name: "Mobbin", logo: mobbinLogo, url: "https://mobbin.com", invert: false },
  { name: "Relay", logo: relayLogo, url: "https://relay.app", invert: false },
  { name: "Devswarm", logo: devswarmLogo, url: "https://devswarm.ai", invert: false },
  { name: "Featherless", logo: featherlessLogo, url: "https://featherless.ai", invert: false },
  { name: "Ideavo", logo: ideavoLogo, url: "https://ideavo.ai", invert: false },
  { name: "Nodebase", logo: nodebaseLogo, url: "https://nodebase.dev", invert: false },
  { name: "Momen", logo: momenLogo, url: "https://momen.app", invert: false },
  { name: "Momentum", logo: momentumLogo, url: "https://niklasmey.com/momentum-builders", invert: false },
  { name: "CodeCrafters", logo: codecraftersLogo, url: "https://codecrafters.io", invert: true },
];

const Season2 = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [participants, setParticipants] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Lazy-load tab data
  const loadProjects = async () => {
    if (projects.length > 0) return;
    setLoadingProjects(true);
    // Find the Season 2 hackathon
    const { data: hacks } = await supabase.from("hackathons").select("id").eq("season", 2).limit(1);
    if (hacks?.length) {
      const hackId = hacks[0].id;
      const { data } = await supabase
        .from("projects")
        .select("*, tracks(name)")
        .eq("hackathon_id", hackId)
        .in("status", ["approved", "winner"])
        .order("likes", { ascending: false });
      setProjects(data || []);
    }
    setLoadingProjects(false);
  };

  const loadParticipants = async () => {
    if (participants.length > 0) return;
    // Get unique users who submitted to S2
    const { data: hacks } = await supabase.from("hackathons").select("id").eq("season", 2).limit(1);
    if (hacks?.length) {
      const { data: projs } = await supabase
        .from("projects")
        .select("user_id")
        .eq("hackathon_id", hacks[0].id);
      if (projs?.length) {
        const userIds = [...new Set(projs.map((p) => p.user_id))];
        const { data: profiles } = await supabase
          .from("profiles")
          .select("user_id, name, avatar_url")
          .in("user_id", userIds);
        setParticipants(profiles || []);
      }
    }
  };

  const loadAnnouncements = async () => {
    if (announcements.length > 0) return;
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(10);
    setAnnouncements(data || []);
  };

  return (
    <>
      <Helmet>
        <title>LovHack Season 2 | Our Biggest Event Yet | LovHack</title>
        <meta name="description" content="LovHack Season 2 — our biggest hackathon yet. 8 sponsors, global participation, amazing prizes. March 21, 2026. Register now!" />
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
          <Link to="/hackathons" className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Hackathons
          </Link>
        </section>

        {/* Hero Section */}
        <section className="px-4 text-center mb-12 sm:mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
              Registrations Open
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-4">
              LovHack<br />Season <span className="text-primary">2</span>
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/70 mb-2 max-w-2xl mx-auto">Our Biggest Event Yet</p>
            <p className="text-lg text-foreground/50 mb-6 max-w-xl mx-auto">13 sponsors. Global participation. Amazing prizes.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-foreground/60 font-medium mb-8">
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40">
                <Calendar className="w-5 h-5 text-primary" />March 21, 2026
              </div>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40">
                <Globe className="w-5 h-5 text-primary" />Online
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold">
                <a href="https://luma.com/95fwomd5" target="_blank" rel="noreferrer">Register Now</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl">
                <a href="https://t.co/qMNpoZoiQZ" target="_blank" rel="noreferrer">Join the Discord</a>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Tabbed Content */}
        <section className="px-4 max-w-5xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8 flex flex-wrap gap-1 justify-center bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="gallery" onClick={loadProjects}>Project Gallery</TabsTrigger>
              <TabsTrigger value="participants" onClick={loadParticipants}>Participants</TabsTrigger>
              <TabsTrigger value="updates" onClick={loadAnnouncements}>Updates</TabsTrigger>
            </TabsList>

            {/* ===== OVERVIEW TAB ===== */}
            <TabsContent value="overview" className="space-y-16">
              {/* What is it */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <GlassCard>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                    What is <span className="text-primary">LovHack Season 2</span>?
                  </h2>
                  <div className="space-y-4 text-foreground/80">
                    <p className="text-lg">
                      After months of hosting LovHack Minis, it's time for the <strong>big stuff</strong>. Season 2 is our largest event yet — backed by <strong>8 sponsors</strong>, with builders from around the world competing to ship real projects.
                    </p>
                    <p>Whether you're a first-time builder or a seasoned developer, this is your chance to build something incredible, learn new tools, and compete for amazing prizes.</p>
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

              {/* What You Get */}
              <GlassCard>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                  What You Get as a <span className="text-primary">Participant</span>
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: CheckCircle, title: "Certificate of Completion", desc: "Every participant who submits a project receives an official LovHack certificate" },
                    { icon: Trophy, title: "Amazing Prizes", desc: "Prize details will be announced soon — stay tuned on Discord!" },
                    { icon: Zap, title: "Sponsor Perks", desc: "Free credits and tools from our 8 amazing sponsors" },
                    { icon: Users, title: "Global Community", desc: "Connect with builders from 20+ countries and grow your network" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 bg-primary/5 rounded-2xl p-5 border border-primary/10">
                      <item.icon className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-foreground/70">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Tracks */}
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
                      <p className="text-sm text-foreground/70">AI agents that automate workflows and solve complex tasks</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Sponsors */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-foreground">Our Sponsors</h2>
                <p className="text-sm text-muted-foreground text-center mb-10">Supported by tools used by thousands of builders</p>

                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-4">Cash Sponsor</p>
                <div className="flex justify-center mb-10">
                  <a href="https://creao.ai" target="_blank" rel="noreferrer" className="block w-48 sm:w-56 transition-all duration-300 hover:scale-105 hover:shadow-glow rounded-3xl">
                    <GlassCard className="!p-6 h-full flex items-center justify-center border-2 border-primary/30" hover={false}>
                      <div className="h-16 flex items-center justify-center">
                        <img src={creaoLogo} alt="Creao" className="max-h-full max-w-[140px] object-contain" />
                      </div>
                    </GlassCard>
                  </a>
                </div>

                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-4">Community Sponsors</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {communitySponsors.map((sponsor) => (
                    <a key={sponsor.name} href={sponsor.url} target="_blank" rel="noreferrer" className="block transition-all duration-300 hover:scale-105 hover:shadow-glow rounded-3xl">
                      <GlassCard className="!p-5 h-full flex items-center justify-center" hover={false}>
                        <div className="h-14 flex items-center justify-center">
                          <img src={sponsor.logo} alt={sponsor.name} className={`max-h-full max-w-[120px] object-contain ${sponsor.invert ? "invert brightness-200" : ""}`} />
                        </div>
                      </GlassCard>
                    </a>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground">
                  How It <span className="text-primary">Works</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { step: "1", title: "Join Discord", desc: "Sign up and join our community server", icon: Users },
                    { step: "2", title: "Build for 1 Week", desc: "Design, code, and ship your project", icon: Zap },
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
              </div>

              {/* Important Note */}
              <GlassCard className="border-amber-500/30 bg-amber-500/5">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Important Note</h3>
                    <p className="text-foreground/70">Agents built before March 21st won't be accepted for the hackathon. Make sure to start fresh when the event begins!</p>
                  </div>
                </div>
              </GlassCard>

              {/* Final CTA */}
              <GlassCard className="text-center bg-gradient-to-br from-primary/10 to-primary/5">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">Ready to Build?</h2>
                <p className="text-foreground/70 mb-8 max-w-md mx-auto">Register now and join hundreds of builders from around the world for our biggest event yet.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold">
                    <a href="https://luma.com/95fwomd5" target="_blank" rel="noreferrer">Register on Luma</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-xl">
                    <a href="https://t.co/qMNpoZoiQZ" target="_blank" rel="noreferrer">Join Discord</a>
                  </Button>
                </div>
              </GlassCard>
            </TabsContent>

            {/* ===== PROJECT GALLERY TAB ===== */}
            <TabsContent value="gallery">
              {loadingProjects ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-20">
                  <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground text-lg">No projects submitted yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">Check back after the hackathon starts!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.id}`}
                      className="group bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        {project.thumbnail_url ? (
                          <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <FolderOpen className="w-12 h-12 opacity-30" />
                          </div>
                        )}
                        {project.status === "winner" && (
                          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">🏆 Winner</Badge>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.tagline}</p>
                        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                          {project.tracks?.name && <Badge variant="secondary" className="text-xs">{project.tracks.name}</Badge>}
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {project.views}</span>
                          <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {project.likes}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* ===== PARTICIPANTS TAB ===== */}
            <TabsContent value="participants">
              {participants.length === 0 ? (
                <div className="text-center py-20">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground text-lg">No participants yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">Register and submit a project to appear here!</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-6 text-center">{participants.length} builders</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {participants.map((p) => (
                      <Link
                        key={p.user_id}
                        to={`/profile/${p.user_id}`}
                        className="flex flex-col items-center gap-2 bg-card/80 border border-border/50 rounded-2xl p-4 hover:shadow-lg hover:border-primary/20 transition-all"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary overflow-hidden">
                          {p.avatar_url ? (
                            <img src={p.avatar_url} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            p.name?.[0]?.toUpperCase() || "?"
                          )}
                        </div>
                        <p className="text-sm font-medium text-foreground text-center line-clamp-1">{p.name || "Anonymous"}</p>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </TabsContent>

            {/* ===== UPDATES TAB ===== */}
            <TabsContent value="updates">
              {announcements.length === 0 ? (
                <div className="text-center py-20">
                  <Megaphone className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                  <p className="text-muted-foreground text-lg">No updates yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">Stay tuned for announcements!</p>
                </div>
              ) : (
                <div className="space-y-4 max-w-3xl mx-auto">
                  {announcements.map((a) => (
                    <GlassCard key={a.id}>
                      <div className="flex items-start gap-3">
                        <Megaphone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-bold text-foreground">{a.title}</h3>
                          <p className="text-sm text-foreground/70 mt-1 whitespace-pre-line">{a.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{new Date(a.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        <div className="mt-16">
          <DiscordCTASection />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Season2;
