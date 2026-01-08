import { useEffect, useRef } from "react";
import { Rocket, Users, GraduationCap } from "lucide-react";
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
      description: "From complete beginners to senior developers. Everyone builds, everyone learns, everyone ships.",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
  ];

  useEffect(() => {
    // Check if we're on mobile (disable complex animations)
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Title fade in (works on all devices)
      if (textContainerRef.current) {
        const title = textContainerRef.current.querySelector("h2");
        if (title) {
          gsap.fromTo(
            title,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Text reveal - simpler on mobile
        textRefs.current.forEach((el) => {
          if (el) {
            if (isMobile) {
              // Mobile: simple fade in
              gsap.fromTo(
                el,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            } else {
              // Desktop: scroll-reveal effect
              gsap.fromTo(
                el,
                { opacity: 0.15, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    end: "top 50%",
                    scrub: 1,
                  },
                }
              );
            }
          }
        });
      }

      // Cards Section
      if (cardsSectionRef.current) {
        // Sticky title animation (desktop only)
        if (!isMobile) {
          const stickyText = cardsSectionRef.current.querySelector(".sticky-content");
          if (stickyText) {
            gsap.fromTo(
              stickyText,
              { opacity: 0, x: -30 },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: cardsSectionRef.current,
                  start: "top 70%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }

        // Cards animation
        const cards = cardsSectionRef.current.querySelectorAll(".pillar-card");
        cards.forEach((card) => {
          if (isMobile) {
            // Mobile: simple fade up
            gsap.fromTo(
              card,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          } else {
            // Desktop: fancy entrance
            gsap.fromTo(
              card,
              { opacity: 0, y: 80, scale: 0.95 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
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
      {/* PART 1: Centered Text Reveal */}
      <div
        ref={textContainerRef}
        className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center mb-20 sm:mb-28 md:mb-36"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10 sm:mb-14 md:mb-16 tracking-tight opacity-0">
          What is <span className="text-primary">LovHack?</span>
        </h2>

        <div className="space-y-8 sm:space-y-10 md:space-y-14">
          <p
            ref={setTextRef(0)}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-foreground/80 opacity-0"
          >
            A <span className="text-primary font-semibold">hackathon</span> is a building event where you create a working project in a short time — usually 48 hours.
          </p>

          <p
            ref={setTextRef(1)}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-foreground/80 opacity-0"
          >
            LovHack is <span className="text-primary font-semibold">beginner-friendly</span>. You don't need coding experience. Use AI tools, low-code platforms, or learn as you go.
          </p>

          <p
            ref={setTextRef(2)}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-foreground/80 opacity-0"
          >
            Join <span className="text-primary font-semibold">solo</span> or find teammates in our Discord.
          </p>
        </div>
      </div>

      {/* PART 2: Why LovHack + Cards */}
      <div ref={cardsSectionRef} className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Why LovHack Title */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start sticky-content">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                Why
                <br className="hidden lg:block" />
                <span className="text-primary"> Lov</span>Hack
                <span className="text-primary">?</span>
              </h3>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-foreground/60 max-w-sm mx-auto lg:mx-0">
                The perfect environment to ship your first (or fiftieth) project.
              </p>
            </div>
          </div>

          {/* Right: Cards */}
          <div className="lg:col-span-3 flex flex-col gap-6 sm:gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-card opacity-0">
                <GlassCard className="p-6 sm:p-8 backdrop-blur-2xl shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  {/* Background Blob */}
                  <div
                    className={`absolute top-0 right-0 w-40 h-40 ${pillar.bg} rounded-full blur-3xl -mr-16 -mt-16 opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10 flex items-start gap-4 sm:gap-5">
                    <div
                      className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${pillar.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <pillar.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${pillar.color}`} />
                    </div>

                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                        {pillar.title}
                      </h4>
                      <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                        {pillar.description}
                      </p>
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
