import { useEffect, useRef } from "react";
import { Rocket, Users, GraduationCap, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatIsLovHackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const cardsSectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const pillars = [
    {
      icon: Rocket,
      title: "Ship Real Projects",
      description: "Not just ideas on slides. You'll build actual working apps, websites, or tools that you can show off instantly.",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: GraduationCap,
      title: "Learn by Doing",
      description: "Whether you're coding for the first time or leveling up. There is no better teacher than building something specific in 48 hours.",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      icon: Users,
      title: "All Skill Levels",
      description: "From complete beginners to senior developers. Everyone builds, everyone learns, everyone ships. No gatekeeping.",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Centered Text Reveal (Scroll dependent)
      if (textContainerRef.current) {
        // Title fade in
        gsap.fromTo(
          textContainerRef.current.querySelector("h2"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textContainerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Text paragraphs - reveal from gray to black/color
        textRefs.current.forEach((el) => {
          if (el) {
            gsap.fromTo(
              el,
              {
                opacity: 0.1,
                color: "rgba(0,0,0,0.1)",
                y: 30
              },
              {
                opacity: 1,
                color: "rgba(0,0,0,0.9)", // slightly off-black for better read
                y: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%", // animation starts when top of text hits 85% of viewport height
                  end: "top 45%",   // finishes when top of text hits 45% of viewport height
                  scrub: 1,         // ties animation process to scrollbar
                },
              }
            );
          }
        });
      }

      // 2. Cards Section - Sticky Left + Scrolling Right with "Crazy" animations
      if (cardsSectionRef.current) {
        // Sticky Text Animation (Optional: maybe it changes color or scales)
        const stickyText = cardsSectionRef.current.querySelector(".sticky-content");
        if (stickyText) {
          gsap.fromTo(stickyText,
            { opacity: 0, x: -50 },
            {
              opacity: 1, x: 0, duration: 1, scrollTrigger: {
                trigger: cardsSectionRef.current,
                start: "top 60%",
                toggleActions: "play none none reverse"
              }
            }
          ); // Enter
        }

        // Cards Animation
        const cards = cardsSectionRef.current.querySelectorAll(".pillar-card");
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            {
              opacity: 0,
              y: 150,
              scale: 0.8,
              rotateX: 45, // 3D rotation entrance
              z: -100
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              z: 0,
              duration: 1,
              ease: "back.out(1.2)", // Bouncy entrance
              scrollTrigger: {
                trigger: card,
                start: "top 90%", // Starts entering just before bottom of screen
                end: "top 60%",   // Fully visible quickly
                toggleActions: "play none none reverse",
                scrub: 0.5 // Little bit of scrubbing for smoothness, but mostly triggered
              }
            }
          );
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setTextRef = (index: number) => (el: HTMLParagraphElement | null) => {
    textRefs.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="relative pb-20 sm:pb-24 lg:pb-32 overflow-hidden">

      {/* PART 1: Centered Text Reveal */}
      <div
        ref={textContainerRef}
        className="min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center py-20"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-12 sm:mb-16 tracking-tight">
          What is <span className="text-primary">LovHack?</span>
        </h2>

        <div className="space-y-12 sm:space-y-16 md:space-y-20 max-w-4xl">
          <p
            ref={setTextRef(0)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight"
          >
            A hackathon is a <span className="text-primary/90">building event</span> where you create a working project in a short time — usually 48 hours.
          </p>

          <p
            ref={setTextRef(1)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight"
          >
            LovHack is <span className="text-primary/90">beginner-friendly</span>. You don't need coding experience. Use AI tools, low-code platforms, or learn as you go.
          </p>

          <p
            ref={setTextRef(2)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight"
          >
            Join <span className="text-primary/90">solo</span> or find teammates in our Discord.
          </p>
        </div>
      </div>

      {/* PART 2: Sticky Left + Scrolling Cards Right */}
      <div ref={cardsSectionRef} className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10 md:mt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: Sticky "LovHack" Branding */}
          <div className="hidden lg:block lg:sticky lg:top-1/3 lg:self-start h-fit sticky-content">
            <div className="relative">
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <h3 className="text-6xl xl:text-8xl font-black text-foreground tracking-tighter leading-[0.9]">
                WHY<br />
                <span className="text-primary">LOV</span><br />
                HACK<span className="text-primary">.</span>
              </h3>
              <p className="mt-8 text-xl text-foreground/60 max-w-xs font-medium">
                The perfect environment to ship your first (or fiftieth) product.
              </p>
            </div>
          </div>

          {/* Right: Scrolling Cards */}
          <div className="flex flex-col gap-16 lg:gap-24 lg:pt-20 pb-20">
            {/* Small mobile header since sticky is hidden on mobile */}
            <div className="lg:hidden mb-4">
              <h3 className="text-4xl font-black text-foreground mb-4">Why LovHack?</h3>
            </div>

            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-card perspective-1000">
                <GlassCard className="p-8 md:p-12 backdrop-blur-3xl border-white/20 hover:border-white/40 transition-colors duration-500 shadow-2xl relative overflow-hidden group">
                  {/* Background Gradient Blob */}
                  <div className={`absolute top-0 right-0 w-64 h-64 ${pillar.bg} rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700`} />

                  <div className="relative z-10">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${pillar.bg} flex items-center justify-center mb-6 md:mb-8 group-hover:rotate-12 transition-transform duration-500`}>
                      <pillar.icon className={`w-8 h-8 md:w-10 md:h-10 ${pillar.color}`} />
                    </div>

                    <h4 className="text-3xl md:text-4xl font-bold text-foreground mb-4 md:mb-6">
                      {pillar.title}
                    </h4>

                    <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};

export default WhatIsLovHackSection;
