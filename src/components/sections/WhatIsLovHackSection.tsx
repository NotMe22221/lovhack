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
      // Title
      if (textContainerRef.current) {
        const title = textContainerRef.current.querySelector("h2");
        if (title) {
          gsap.set(title, { opacity: 1 });
          gsap.fromTo(
            title,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: title,
                start: "top 85%",
              },
            }
          );
        }

        // Text paragraphs
        textRefs.current.forEach((el) => {
          if (el) {
            gsap.fromTo(
              el,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                },
              }
            );
          }
        });
      }

      // Sticky left title
      if (cardsSectionRef.current) {
        const stickyContent = cardsSectionRef.current.querySelector(".sticky-content");
        if (stickyContent) {
          gsap.fromTo(
            stickyContent,
            { x: -40, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsSectionRef.current,
                start: "top 75%",
              },
            }
          );
        }

        // Cards
        const cards = cardsSectionRef.current.querySelectorAll(".pillar-card");
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
              },
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
    <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* PART 1: Centered Text */}
      <div
        ref={textContainerRef}
        className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center mb-20 sm:mb-28 md:mb-36"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10 sm:mb-14 md:mb-16 tracking-tight">
          What is <span className="text-primary">LovHack?</span>
        </h2>

        <div className="space-y-8 sm:space-y-10 md:space-y-14">
          <p
            ref={setTextRef(0)}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-foreground/80"
          >
            A <span className="text-primary font-semibold">hackathon</span> is a building event where you create a working project in a short time — usually 48 hours.
          </p>

          <p
            ref={setTextRef(1)}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-foreground/80"
          >
            LovHack is <span className="text-primary font-semibold">beginner-friendly</span>. You don't need coding experience. Use AI tools, low-code platforms, or learn as you go.
          </p>

          <p
            ref={setTextRef(2)}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-foreground/80"
          >
            Join <span className="text-primary font-semibold">solo</span> or find teammates in our Discord.
          </p>
        </div>
      </div>

      {/* PART 2: Sticky Left + Big Cards Right */}
      <div ref={cardsSectionRef} className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT: Sticky Title */}
          <div className="lg:sticky lg:top-28 sticky-content">
            <div className="text-center lg:text-left mb-10 lg:mb-0">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground leading-[0.95] tracking-tight">
                Why
                <br />
                <span className="text-primary">Lov</span>Hack<span className="text-primary">?</span>
              </h3>
              <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-foreground/60 max-w-md mx-auto lg:mx-0">
                The perfect environment to ship your first (or fiftieth) project.
              </p>
            </div>
          </div>

          {/* RIGHT: Big Cards with Images */}
          <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-card">
                <GlassCard className="overflow-hidden backdrop-blur-2xl shadow-2xl group hover:-translate-y-2 transition-transform duration-500">
                  {/* Image */}
                  <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 md:p-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <pillar.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                      </div>
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed">
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
