import { useEffect, useRef } from "react";
import { Rocket, GraduationCap, Users } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import cardShip from "@/assets/card-ship.png";
import cardLearn from "@/assets/card-learn.png";
import cardSkills from "@/assets/card-skills.png";

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
      image: cardShip,
    },
    {
      icon: GraduationCap,
      title: "Learn by Doing",
      description: "Whether you're coding for the first time or leveling up. There is no better teacher than building something specific in 48 hours.",
      image: cardLearn,
    },
    {
      icon: Users,
      title: "All Skill Levels",
      description: "From complete beginners to senior developers. Everyone builds, everyone learns, everyone ships.",
      image: cardSkills,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Centered Text Reveal
      if (textContainerRef.current) {
        // Title Entrance
        const title = textContainerRef.current.querySelector("h2");
        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: title,
                start: "top 85%", // Start when top of title hits 85% of viewport
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Text Paragraphs Scrub
        textRefs.current.forEach((el) => {
          if (el) {
            gsap.fromTo(
              el,
              {
                opacity: 0.1,
                color: "rgba(0, 0, 0, 0.1)", // Explicitly start gray/transparent
                y: 30
              },
              {
                opacity: 1,
                color: "rgba(0, 0, 0, 0.9)", // End dark
                y: 0,
                duration: 1.5,
                ease: "none", // Scrub controls ease
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%", // Start entering viewport
                  end: "top 40%",   // Finish near center/top
                  scrub: 1.5,       // Smooth catch-up
                },
              }
            );
          }
        });
      }

      // 2. Sticky Left + Cards Right
      if (cardsSectionRef.current) {
        // Sticky Title Entrance
        const stickyContent = cardsSectionRef.current.querySelector(".sticky-content");
        if (stickyContent) {
          gsap.fromTo(
            stickyContent,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsSectionRef.current,
                start: "top 70%", // Triggers later
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Cards Entrance
        const cards = cardsSectionRef.current.querySelectorAll(".pillar-card");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              opacity: 0,
              y: 100,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              stagger: 0.2, // 0.2s delay between each card
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsSectionRef.current, // Trigger when section starts
                start: "top 60%", // When top of section hits 60% of viewport (cards are visible)
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setTextRef = (index: number) => (el: HTMLParagraphElement | null) => {
    textRefs.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 lg:py-32 bg-background">
      {/* Background blobs wrapper with overflow hidden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Add any background decorations here if needed */}
      </div>

      {/* PART 1: Centered Text Reveal (Massive) */}
      <div
        ref={textContainerRef}
        className="min-h-[60vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center mb-20 sm:mb-28 md:mb-36"
      >
        {/* Initial opacity-0 is crucial for hydration/FOUC prevention */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-16 sm:mb-20 tracking-tight opacity-0">
          What is <span className="text-primary">LovHack?</span>
        </h2>

        <div className="space-y-16 sm:space-y-24 max-w-4xl">
          <p
            ref={setTextRef(0)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight opacity-0"
          >
            A <span className="text-primary font-semibold">hackathon</span> is a building event where you create a working project in a short time — usually 48 hours.
          </p>

          <p
            ref={setTextRef(1)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight opacity-0"
          >
            LovHack is <span className="text-primary font-semibold">beginner-friendly</span>. You don't need coding experience. Use AI tools, low-code platforms, or learn as you go.
          </p>

          <p
            ref={setTextRef(2)}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight opacity-0"
          >
            Join <span className="text-primary font-semibold">solo</span> or find teammates in our Discord.
          </p>
        </div>
      </div>

      {/* PART 2: Sticky Content + Big Cards */}
      <div ref={cardsSectionRef} className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[100vh]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 relative">

          {/* LEFT: Sticky Title */}
          <div className="hidden lg:block relative"> {/* Removed sticky from here, put it on inner child */}
            <div className="sticky top-32 sticky-content opacity-0"> {/* Adjusted top value */}
              <h3 className="text-6xl xl:text-8xl font-black text-foreground leading-[0.9] tracking-tighter">
                Why
                <br />
                <span className="text-primary">Lov</span>Hack<span className="text-primary">.</span>
              </h3>
              <p className="mt-8 text-2xl text-foreground/60 max-w-sm font-medium">
                The perfect environment to ship your first (or fiftieth) product.
              </p>
            </div>
          </div>

          {/* RIGHT: Big Cards */}
          <div className="flex flex-col gap-16 pb-20">
            {/* Mobile Title (visible only on small screens) */}
            <div className="lg:hidden text-center mb-8">
              <h3 className="text-4xl font-black text-foreground">Why LovHack?</h3>
            </div>

            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-card opacity-0">
                <GlassCard className="overflow-hidden backdrop-blur-3xl shadow-2xl border-white/20 group hover:-translate-y-2 transition-transform duration-500">
                  {/* Image Area */}
                  <div className="w-full h-56 sm:h-64 md:h-72 overflow-hidden bg-primary/5 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10" />
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  </div>

                  {/* Content Area */}
                  <div className="p-8 sm:p-10">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                        <pillar.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight pt-2">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed">
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
