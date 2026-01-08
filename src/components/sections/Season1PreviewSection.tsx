import { ArrowRight, Trophy, Users, Globe, Rocket, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";

const Season1PreviewSection = () => {
  const stats = [
    { icon: Users, value: "100+", label: "Builders" },
    { icon: Rocket, value: "40+", label: "Projects Shipped" },
    { icon: Globe, value: "20+", label: "Countries" },
    { icon: Trophy, value: "$5K+", label: "In Prizes" },
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <ScrollAnimation>
          <GlassCard className="p-8 md:p-12 overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Completed</span>
              </div>

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                    Season 1: <span className="text-primary">January 2026</span>
                  </h2>
                  <p className="text-lg text-foreground/70">
                    Our first hackathon brought together builders from around the world
                    to ship amazing projects in 48 hours.
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-6 py-5 shrink-0"
                >
                  <Link to="/season-1" className="flex items-center gap-2">
                    View Full Recap
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>

              {/* Stats Grid */}
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.1}>
                {stats.map((stat, index) => (
                  <StaggerItem key={index}>
                    <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30">
                      <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-foreground/60">{stat.label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Highlight */}
              <p className="mt-8 text-center text-foreground/70">
                Projects ranged from <strong>AI assistants</strong> to <strong>productivity tools</strong> to <strong>games</strong> —
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
