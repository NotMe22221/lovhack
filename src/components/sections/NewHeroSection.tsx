import { useEffect, useRef } from "react";
import { ArrowRight, Users, Globe, Rocket, Zap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { motion } from "framer-motion";

const NewHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 80, rotateX: -20 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2 }
      )
        .fromTo(
          subheadRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          "-=0.6"
        )
        .fromTo(
          statsRef.current?.children || [],
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Globe, label: "20+ Countries" },
    { icon: Rocket, label: "40+ Projects Shipped" },
    { icon: Zap, label: "100+ Builders" },
  ];

  return (
    <section className="relative h-screen min-h-[700px] max-h-[1000px] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* SPOTLIGHT EFFECT - Soft Pink/Rose */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full -z-10 pointer-events-none animate-pulse-slow" />
      <div className="absolute top-[20%] left-1/3 w-[500px] h-[500px] bg-rose-400/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className="w-full max-w-5xl mx-auto text-center relative z-10"
      >
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm mb-6 uppercase tracking-wider shadow-[0_0_15px_rgba(236,72,153,0.3)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Season 2 Coming Late 2026
        </motion.div>

        {/* Main Headline - Bigger & Bolder */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 leading-[0.9] -tracking-[0.04em] opacity-0 px-2 drop-shadow-sm"
        >
          Build Something <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">
            Real.
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          ref={subheadRef}
          className="text-lg sm:text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto mb-10 md:mb-14 px-4 opacity-0 leading-relaxed font-medium"
        >
          The <span className="text-foreground decoration-primary/50 underline underline-offset-4">online hackathon</span> where first-time builders ship projects in 48 hours. No experience required.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-center mb-16 md:mb-24 px-4"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 md:px-12 py-7 text-xl font-bold shadow-xl shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-primary/40"
          >
            <a
              href="https://t.co/qMNpoZoiQZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3"
            >
              <Users className="w-5 h-5 md:w-6 md:h-6" />
              Join Discord
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-2xl px-8 md:px-12 py-7 text-xl font-bold bg-white/40 backdrop-blur-xl border-white/50 hover:bg-white/60 shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Link to="/season-1" className="flex items-center justify-center gap-3">
              <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
              Watch Recap
            </Link>
          </Button>
        </div>

        {/* Floating Trust Indicators */}
        <div
          ref={statsRef}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-16 px-4 pb-8 border-t border-white/50 pt-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1 opacity-0 group cursor-default"
              >
                <span className="text-3xl font-black text-foreground">{stat.label.split(' ')[0]}</span>
                <span className="text-sm font-medium text-foreground/50 uppercase tracking-widest">{stat.label.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
