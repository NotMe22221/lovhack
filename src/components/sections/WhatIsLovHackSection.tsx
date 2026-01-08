import { useEffect, useRef } from "react";
import { Rocket, Users, GraduationCap } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatIsLovHackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const cardsRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      icon: Rocket,
      title: "Ship Real Projects",
      description:
        "Not just ideas on slides — you'll build actual working apps, websites, or tools that you can show off and use.",
    },
    {
      icon: GraduationCap,
      title: "Learn by Doing",
      description:
        "Whether you're coding for the first time or leveling up your skills, there's no better teacher than building something real.",
    },
    {
      icon: Users,
      title: "All Skill Levels",
      description:
        "From complete beginners to senior developers — everyone builds, everyone learns, everyone ships.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade in
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
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Scroll-to-reveal text (gray to color)
      textRefs.current.forEach((el) => {
        if (el) {
          gsap.fromTo(
            el,
            {
              opacity: 0.3,
              color: "rgba(0, 0, 0, 0.3)",
              y: 20
            },
            {
              opacity: 1,
              color: "rgba(0, 0, 0, 0.7)",
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 60%",
                scrub: 1,
              },
            }
          );
        }
      });

      // Cards staggered entrance
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".pillar-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setTextRef = (index: number) => (el: HTMLParagraphElement | null) => {
    textRefs.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-14 md:mb-20 opacity-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 sm:mb-8 px-2">
            What is <span className="text-primary">LovHack</span>?
          </h2>
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4 md:space-y-5 text-foreground/70 text-sm sm:text-base md:text-lg lg:text-xl px-4">
            <p ref={setTextRef(0)} className="transition-colors duration-500">
              <strong className="text-foreground/90">A hackathon</strong> is a building event where you create a working project
              in a short time — usually 48 hours. Think of it as a creative sprint with friends.
            </p>
            <p ref={setTextRef(1)} className="transition-colors duration-500">
              <strong className="text-foreground/90">LovHack</strong> is beginner-friendly. You don't need coding experience
              to participate. You can use AI tools, low-code platforms, or learn as you go.
            </p>
            <p ref={setTextRef(2)} className="transition-colors duration-500">
              You can join <strong className="text-foreground/90">solo</strong> or find teammates in our Discord. We'll help
              you connect with others who complement your skills.
            </p>
          </div>
        </div>

        {/* Pillars Cards */}
        <div ref={cardsRef} className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="pillar-card opacity-0 group"
            >
              <GlassCard className="p-5 sm:p-6 md:p-8 lg:p-10 text-center h-full backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl md:rounded-3xl bg-primary/10 mb-4 sm:mb-6 md:mb-8 group-hover:bg-primary/20 transition-colors duration-300">
                  <pillar.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-foreground/70">{pillar.description}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsLovHackSection;
