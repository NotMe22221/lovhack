import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import lovableLogo from "@/assets/lovable-logo.png";
import creaoLogo from "@/assets/creao-logo.png";
import hadoLogo from "@/assets/hado-logo-v3.png";
import flootLogo from "@/assets/floot-logo.png";
import qoderLogo from "@/assets/qoder-logo.png";
import dualiteLogo from "@/assets/dualite-logo.png";
import momentumLogo from "@/assets/momentum-logo.png";
import genxyzLogo from "@/assets/genxyz-logo.png";
import medoLogo from "@/assets/medo-logo.png";
import nodebaseLogo from "@/assets/nodebase-logo.webp";
import miroLogo from "@/assets/miro-logo.webp";
import n8nLogo from "@/assets/n8n-logo.webp";

gsap.registerPlugin(ScrollTrigger);

const SponsorsPreviewSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const sponsors = [
    { name: "Lovable", logo: lovableLogo, size: "large", invert: false },
    { name: "Creao", logo: creaoLogo, size: "medium", invert: false },
    { name: "Hado", logo: hadoLogo, size: "medium", invert: false },
    { name: "Floot", logo: flootLogo, size: "small", invert: false },
    { name: "Qoder", logo: qoderLogo, size: "small", invert: false },
    { name: "Dualite", logo: dualiteLogo, size: "small", invert: false },
    { name: "Momentum", logo: momentumLogo, size: "small", invert: false },
    { name: "gen.xyz", logo: genxyzLogo, size: "small", invert: true },
    { name: "Medo", logo: medoLogo, size: "small", invert: false },
    { name: "Nodebase", logo: nodebaseLogo, size: "small", invert: false },
    { name: "Miro", logo: miroLogo, size: "small", invert: false },
    { name: "n8n", logo: n8nLogo, size: "small", invert: false },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bento grid items staggered entrance
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".bento-item");
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // CTA
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-14 md:mb-16 opacity-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6 px-2">
            Backed by <span className="text-primary">Leading Tools</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 max-w-xl mx-auto px-4">
            LovHack participants get exclusive access to these amazing sponsor tools.
          </p>
        </div>

        {/* Bento Grid - Open floating logos */}
        <div ref={gridRef} className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 md:gap-5 mb-10 sm:mb-14 md:mb-16 auto-rows-fr">
          {/* Large item spanning 2x2 */}
          <div className="bento-item col-span-2 row-span-2 opacity-0 group">
            <div className="w-full h-full bg-white/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/30 flex items-center justify-center p-4 sm:p-6 shadow-glass transition-all duration-500 hover:scale-105 hover:bg-white/60 hover:shadow-xl">
              <img
                src={sponsors[0].logo}
                alt={`${sponsors[0].name} logo`}
                className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Medium items */}
          {sponsors.slice(1, 3).map((sponsor, index) => (
            <div key={index} className="bento-item col-span-2 row-span-1 opacity-0 group">
              <div className="w-full h-full min-h-[60px] sm:min-h-[80px] md:min-h-[100px] bg-white/40 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/30 flex items-center justify-center p-3 sm:p-4 shadow-glass transition-all duration-500 hover:scale-105 hover:bg-white/60 hover:shadow-xl">
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="max-w-[70%] max-h-[70%] object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          ))}

          {/* Small items */}
          {sponsors.slice(3).map((sponsor, index) => (
            <div key={index} className="bento-item col-span-2 sm:col-span-2 row-span-1 opacity-0 group">
              <div className="w-full h-full min-h-[60px] sm:min-h-[80px] md:min-h-[100px] bg-white/40 backdrop-blur-2xl rounded-xl sm:rounded-2xl border border-white/30 flex items-center justify-center p-3 sm:p-4 shadow-glass transition-all duration-500 hover:scale-105 hover:bg-white/60 hover:shadow-xl">
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className={`max-w-[70%] max-h-[70%] object-contain group-hover:scale-110 transition-transform duration-500 ${sponsor.invert ? 'invert' : ''}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center opacity-0 px-4">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-xl border-white/40 hover:bg-white/80 py-5 sm:py-6 px-6 sm:px-8 shadow-glass transition-all duration-300 hover:scale-105"
          >
            <Link to="/sponsors" className="flex items-center justify-center gap-2 sm:gap-3">
              View All Sponsors & Offers
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SponsorsPreviewSection;
