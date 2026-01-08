import { useEffect, useRef } from "react";
import { Rocket, Users, GraduationCap } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatIsLovHackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

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
      // Sticky left side with text reveal
      if (leftRef.current) {
        // Title animation
        const title = leftRef.current.querySelector("h2");
        gsap.fromTo(
          title,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Strong scroll-to-reveal text (very gray → full color)
        textRefs.current.forEach((el, index) => {
          if (el) {
            gsap.fromTo(
              el,
              {
                opacity: 0.15,
                color: "rgba(0, 0, 0, 0.15)",
              },
              {
                opacity: 1,
                color: "rgba(0, 0, 0, 0.8)",
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 80%",
                  end: "top 50%",
                  scrub: 1.5,
                },
              }
            );
          }
        });
      }

      // Cards scrolling from bottom
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll(".pillar-card");
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 60%",
                toggleActions: "play none none reverse",
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
    <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Two column layout: Sticky left + Scrolling cards right */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">

          {/* Left side - Sticky on desktop */}
          <div ref={leftRef} className="md:sticky md:top-32 md:self-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 sm:mb-8 md:mb-10 opacity-0">
              What is <span className="text-primary">LovHack</span>?
            </h2>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <p
                ref={setTextRef(0)}
                className="text-lg sm:text-xl md:text-2xl leading-relaxed"
                style={{ color: "rgba(0, 0, 0, 0.15)" }}
              >
                <strong className="font-semibold">A hackathon</strong> is a building event where you create a working project
                in a short time — usually 48 hours.
              </p>
              <p
                ref={setTextRef(1)}
                className="text-lg sm:text-xl md:text-2xl leading-relaxed"
                style={{ color: "rgba(0, 0, 0, 0.15)" }}
              >
                <strong className="font-semibold">LovHack</strong> is beginner-friendly. You don't need coding experience.
                Use AI tools, low-code platforms, or learn as you go.
              </p>
              <p
                ref={setTextRef(2)}
                className="text-lg sm:text-xl md:text-2xl leading-relaxed"
                style={{ color: "rgba(0, 0, 0, 0.15)" }}
              >
                Join <strong className="font-semibold">solo</strong> or find teammates in our Discord.
              </p>
            </div>
          </div>

          {/* Right side - Cards scroll from bottom */}
          <div ref={cardsContainerRef} className="flex flex-col gap-4 sm:gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="pillar-card opacity-0"
              >
                <GlassCard className="p-5 sm:p-6 md:p-8 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center">
                      <pillar.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-foreground/70">{pillar.description}</p>
                    </div>
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
