import { useEffect, useRef } from "react";
import { ArrowRight, Users, Globe, Rocket, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";

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
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1 }
      )
        .fromTo(
          subheadRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
          "-=0.4"
        )
        .fromTo(
          statsRef.current?.children || [],
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3"
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
    <section className="relative h-screen min-h-[700px] max-h-[1000px] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div
        ref={containerRef}
        className="w-full max-w-5xl mx-auto text-center"
      >
        {/* Main Headline - Clean, no badge */}
        <h1
          ref={headlineRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 md:mb-8 leading-[1.1] opacity-0 px-2"
        >
          Build Something Real.
          <br />
          <span className="text-primary">No Experience Required.</span>
        </h1>

        {/* Sub-headline */}
        <p
          ref={subheadRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4 opacity-0"
        >
          LovHack is an online hackathon where developers, designers, and complete beginners
          ship real projects together in 48 hours. Join our welcoming community of 500+ builders.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-center mb-12 sm:mb-16 md:mb-20 px-4"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg md:text-xl shadow-xl shadow-primary/25 transition-all duration-300 hover:scale-105"
          >
            <a
              href="https://t.co/qMNpoZoiQZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 sm:gap-3"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              Join Discord for Early Access
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg md:text-xl bg-white/50 backdrop-blur-xl border-white/40 hover:bg-white/80 shadow-glass transition-all duration-300 hover:scale-105"
          >
            <Link to="/season-1" className="flex items-center justify-center gap-2 sm:gap-3">
              See Season 1 Recap
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div
          ref={statsRef}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12 px-4"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 opacity-0 group cursor-default"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-glass flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <span className="text-xs sm:text-sm md:text-base font-medium text-foreground/80">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
