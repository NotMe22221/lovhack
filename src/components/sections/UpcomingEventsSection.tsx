import { Calendar, Users, Zap, Sparkles, ArrowRight, Rocket, Target, DollarSign, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { motion } from "framer-motion";

const UpcomingEventsSection = () => {
  return (
    <section className="relative py-20 sm:py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            What's <span className="text-primary">Coming Next</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-xl mx-auto px-2">
            Join our Discord to get early access and announcements for upcoming events.
          </p>
        </ScrollAnimation>

        <StaggerContainer className="grid gap-6 sm:gap-8 md:grid-cols-2" staggerDelay={0.2}>
          {/* Season 2 - Main Card */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <GlassCard className="p-6 sm:p-8 md:p-10 relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 h-full backdrop-blur-2xl">
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium">
                  March 21, 2026
                </div>

                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 mt-8 sm:mt-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/20 flex items-center justify-center shadow-lg">
                    <Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Season 2</h3>
                </div>

                <p className="text-base sm:text-lg text-foreground/70 mb-6 sm:mb-8">
                  Our biggest event yet. Bigger prizes, more sponsors, and global participation.
                  48 hours to build something real — no experience required.
                </p>

                <div className="flex items-center justify-center gap-5 sm:gap-8 my-8 sm:my-10">
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white/50 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-glass">
                      <Target className="w-8 h-8 sm:w-10 sm:h-10 text-primary/70" />
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white/50 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-glass">
                      <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-primary/70" />
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex flex-col items-center gap-2"
                    whileHover={{ y: -4, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-white/50 backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-glass">
                      <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-primary/70" />
                    </div>
                  </motion.div>
                </div>

                <p className="text-center text-foreground/60 mb-6 sm:mb-8 text-sm sm:text-base">
                  Bigger prizes • More sponsors • Global builders
                </p>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl py-6 shadow-xl shadow-primary/20"
                  >
                    <Link to="/season-2" className="flex items-center justify-center gap-2">
                      Learn More & Register
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
              </GlassCard>
            </motion.div>
          </StaggerItem>

          {/* Discord CTA Card */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <GlassCard className="p-6 sm:p-8 md:p-10 relative overflow-hidden h-full backdrop-blur-2xl">
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                  500+ Members
                </div>

                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 mt-8 sm:mt-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center shadow-lg">
                    <Users className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-500" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Join the Community</h3>
                </div>

                <p className="text-base sm:text-lg text-foreground/70 mb-6 sm:mb-8">
                  Our Discord is where the magic happens. Find teammates, get mentored,
                  and stay updated on everything Season 2.
                </p>

                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                  <li className="flex items-center gap-3 text-base sm:text-lg text-foreground/80">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-indigo-500" />
                    </div>
                    Find teammates before March 21st
                  </li>
                  <li className="flex items-center gap-3 text-base sm:text-lg text-foreground/80">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-indigo-500" />
                    </div>
                    Get mentored by experienced builders
                  </li>
                  <li className="flex items-center gap-3 text-base sm:text-lg text-foreground/80">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-indigo-500" />
                    </div>
                    Early announcements & exclusive perks
                  </li>
                </ul>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl py-6 shadow-xl shadow-indigo-500/20"
                  >
                    <a
                      href="https://t.co/qMNpoZoiQZ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Join Discord Server
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </motion.div>
              </GlassCard>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
