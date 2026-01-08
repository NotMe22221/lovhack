import { ArrowRight, Trophy, Users, Globe, Rocket, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { motion } from "framer-motion";

const Season1PreviewSection = () => {
  const stats = [
    { icon: Users, value: "100+", label: "Builders" },
    { icon: Rocket, value: "40+", label: "Projects Shipped" },
    { icon: Globe, value: "20+", label: "Countries" },
    { icon: Trophy, value: "$5K+", label: "In Prizes" },
  ];

  return (
    <section className="relative py-20 sm:py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <GlassCard className="p-8 md:p-12 lg:p-16 overflow-hidden relative backdrop-blur-2xl">
            {/* Background Decoration */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-glass mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm sm:text-base font-medium text-foreground/80">Completed</span>
              </motion.div>

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
                    Season 1: <span className="text-primary">January 2026</span>
                  </h2>
                  <p className="text-lg sm:text-xl text-foreground/70">
                    Our first hackathon brought together builders from around the world
                    to ship amazing projects in 48 hours.
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 py-6 shrink-0 shadow-xl shadow-primary/20"
                  >
                    <Link to="/season-1" className="flex items-center gap-3">
                      View Full Recap
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6" staggerDelay={0.1}>
                {stats.map((stat, index) => (
                  <StaggerItem key={index}>
                    <motion.div
                      className="bg-white/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center border border-white/40 shadow-glass"
                      whileHover={{ y: -6, scale: 1.03 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto mb-4" />
                      <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm sm:text-base text-foreground/60">{stat.label}</div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Highlight */}
              <p className="mt-10 sm:mt-12 text-center text-lg sm:text-xl text-foreground/70">
                Projects ranged from <strong className="text-foreground/90">AI assistants</strong> to <strong className="text-foreground/90">productivity tools</strong> to <strong className="text-foreground/90">games</strong> —
                all built in just 48 hours.
              </p>
            </div>
          </GlassCard>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Season1PreviewSection;
