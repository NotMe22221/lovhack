import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import GlassCard from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Globe, Sparkles, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import creaoLogoV2 from "@/assets/creao-logo-v2.png";
import genxyzLogo from "@/assets/genxyz-logo.png";

const MiniHack = () => {
  return (
    <>
      <Helmet>
        <title>Mini-Hack | Your First Build Starts Here | LovHack</title>
        <meta name="description" content="Mini-Hack is a beginner-friendly 48-hour hackathon. Feb 14-15, 2025. Perfect for your first build with lower pressure and amazing prizes from CREAO and gen.xyz." />
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-green-500/20 text-green-600 border-green-500/30 hover:bg-green-500/30">
              Coming Soon
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-4">
              Mini-Hack
            </h1>
            <p className="text-xl sm:text-2xl text-foreground/70 mb-6 max-w-2xl mx-auto">
              Your First Build Starts Here
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-foreground/60 font-medium">
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40">
                <Calendar className="w-5 h-5 text-green-500" />
                February 14-15, 2025
              </div>
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/40">
                <Globe className="w-5 h-5 text-green-500" />
                Online
              </div>
            </div>
          </motion.div>
        </section>

        {/* What is Mini-Hack */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlassCard>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                What is <span className="text-green-500">Mini-Hack</span>?
              </h2>
              <div className="space-y-4 text-foreground/80">
                <p className="text-lg">
                  Mini-Hack is a <strong>beginner-friendly 48-hour hackathon</strong> designed for builders who want to experience their first hackathon without the overwhelming pressure of larger events.
                </p>
                <p>
                  Whether you're a student, a career switcher, or just curious about building with AI tools — this is the perfect place to start. No experience required, just bring your ideas and enthusiasm!
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-green-500/10 rounded-2xl p-5 border border-green-500/20">
                  <Users className="w-8 h-8 text-green-500 mb-3" />
                  <h3 className="font-bold text-foreground mb-1">Solo or Team</h3>
                  <p className="text-sm text-foreground/70">Build alone or with up to 3 friends</p>
                </div>
                <div className="bg-green-500/10 rounded-2xl p-5 border border-green-500/20">
                  <Sparkles className="w-8 h-8 text-green-500 mb-3" />
                  <h3 className="font-bold text-foreground mb-1">Beginner Friendly</h3>
                  <p className="text-sm text-foreground/70">Lower pressure, supportive community</p>
                </div>
                <div className="bg-green-500/10 rounded-2xl p-5 border border-green-500/20">
                  <Globe className="w-8 h-8 text-green-500 mb-3" />
                  <h3 className="font-bold text-foreground mb-1">Fully Online</h3>
                  <p className="text-sm text-foreground/70">Join from anywhere in the world</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Sponsors Section */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground">
              Powered By
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* gen.xyz */}
              <GlassCard className="text-center">
                <div className="h-20 flex items-center justify-center mb-4">
                  <img 
                    src={genxyzLogo} 
                    alt="gen.xyz" 
                    className="max-h-full max-w-[180px] object-contain invert"
                  />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-2">gen.xyz</h3>
                <p className="text-foreground/70 text-sm">
                  Providing free .xyz domains for all winners!
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4 rounded-xl">
                  <a href="https://gen.xyz" target="_blank" rel="noreferrer">
                    Learn More <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </GlassCard>

              {/* CREAO */}
              <GlassCard className="text-center">
                <div className="h-20 flex items-center justify-center mb-4">
                  <img 
                    src={creaoLogoV2} 
                    alt="CREAO" 
                    className="max-h-full max-w-[180px] object-contain"
                  />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-2">CREAO</h3>
                <p className="text-foreground/70 text-sm">
                  Main event partner providing tools and resources for builders.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4 rounded-xl">
                  <a href="https://creao.ai" target="_blank" rel="noreferrer">
                    Learn More <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </GlassCard>
            </div>
          </motion.div>
        </section>

        {/* Prizes Section */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <GlassCard className="text-center bg-gradient-to-br from-green-500/10 to-green-500/5">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">
                🏆 Prizes
              </h2>
              <div className="space-y-4 text-foreground/80 max-w-xl mx-auto">
                <div className="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-white/40">
                  <Globe className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-foreground mb-2">Free .xyz Domains</h3>
                  <p className="text-sm">Winners receive free .xyz domain names courtesy of gen.xyz to launch their projects!</p>
                </div>
                <div className="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-white/40">
                  <Sparkles className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-lg text-foreground mb-2">CREAO Perks</h3>
                  <p className="text-sm">Exclusive access and perks from CREAO for participants and winners.</p>
                </div>
              </div>
              <p className="text-foreground/60 text-sm mt-6">More prizes to be announced soon!</p>
            </GlassCard>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="px-4 max-w-4xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <GlassCard className="!p-8 sm:!p-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-foreground">
                Ready to Build?
              </h2>
              <p className="text-foreground/70 mb-8 max-w-md mx-auto">
                Join Mini-Hack on February 14-15, 2025 and start your builder journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold"
                >
                  <a href="https://t.co/qMNpoZoiQZ" target="_blank" rel="noreferrer">
                    Get Your Ticket
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="rounded-xl"
                >
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

export default MiniHack;
