import { useEffect, useRef } from "react";
import { ArrowRight, Trophy, Users, Globe, Rocket, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Season1PreviewSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Users, value: "100+", label: "Builders" },
    { icon: Rocket, value: "40+", label: "Projects Shipped" },
    { icon: Globe, value: "20+", label: "Countries" },
    { icon: Trophy, value: "$5K+", label: "In Prizes" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats counter animation
      if (statsRef.current) {
        const statItems = statsRef.current.querySelectorAll(".stat-item");
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div ref={cardRef} className="opacity-0">
          <GlassCard className="p-6 sm:p-8 md:p-10 lg:p-14 overflow-hidden relative backdrop-blur-2xl">
            {/* Background Decoration */}
            <div className="absolute -top-24 -right-24 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-glass mb-6 sm:mb-8">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-xs sm:text-sm md:text-base font-medium text-foreground/80">Completed</span>
              </div>

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3">
                    Season 1: <span className="text-primary">January 2026</span>
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70">
                    Our first hackathon brought together builders from around the world
                    to ship amazing projects in 48 hours.
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl sm:rounded-2xl px-6 sm:px-8 py-5 sm:py-6 shrink-0 shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-105"
                >
                  <Link to="/season-1" className="flex items-center justify-center gap-2 sm:gap-3">
                    View Full Recap
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </Button>
              </div>

              {/* Stats Grid */}
              <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="stat-item bg-white/40 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 text-center border border-white/40 shadow-glass transition-all duration-300 hover:-translate-y-2 hover:shadow-lg opacity-0"
                  >
                    <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary mx-auto mb-2 sm:mb-3 md:mb-4" />
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base text-foreground/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Highlight */}
              <p className="mt-8 sm:mt-10 md:mt-12 text-center text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 px-2">
                Projects ranged from <strong className="text-foreground/90">AI assistants</strong> to <strong className="text-foreground/90">productivity tools</strong> to <strong className="text-foreground/90">games</strong>,
                all built in just 48 hours.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default Season1PreviewSection;
