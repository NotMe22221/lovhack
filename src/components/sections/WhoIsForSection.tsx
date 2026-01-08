import { useEffect, useRef } from "react";
import { Heart, Code, Lightbulb, Trophy, HelpCircle, Handshake, Sprout, Zap, Sparkles } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhoIsForSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const beginnerPoints = [
    { icon: HelpCircle, text: "Never done a hackathon? Perfect." },
    { icon: Lightbulb, text: "Learn by building with real support" },
    { icon: Handshake, text: "Find teammates who can help" },
    { icon: Heart, text: "No judgment, just encouragement" },
  ];

  const experiencedPoints = [
    { icon: Code, text: "Ship fast with modern AI tools" },
    { icon: Handshake, text: "Network with other serious builders" },
    { icon: Heart, text: "Mentor newcomers while building" },
    { icon: Trophy, text: "Win prizes and recognition" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation with creative emphasis
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
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

      // Cards entrance
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".audience-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Bottom message
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: messageRef.current,
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
      <div className="max-w-6xl mx-auto">
        {/* Section Header - More Creative */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-14 md:mb-20 opacity-0">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-glass mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-primary">Everyone Belongs Here</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6 px-2">
            LovHack is for <span className="text-primary relative">
              Everyone
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-primary/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0,8 Q25,0 50,8 T100,8" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 max-w-xl mx-auto px-4">
            Whether you're writing your first line of code or you've shipped dozens of products,
            there's a place for you here.
          </p>
        </div>

        {/* Two Columns */}
        <div ref={cardsRef} className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
          {/* First-Time Builders */}
          <div className="audience-card opacity-0">
            <GlassCard className="p-5 sm:p-6 md:p-8 lg:p-10 h-full backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center shadow-lg">
                  <Sprout className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">First-Time Builders</h3>
              </div>
              <ul className="space-y-3 sm:space-y-4 md:space-y-5">
                {beginnerPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl bg-green-100 flex items-center justify-center">
                      <point.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base md:text-lg text-foreground/80">{point.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 sm:mt-6 md:mt-8 text-xs sm:text-sm md:text-base text-foreground/60 italic border-l-2 border-primary/30 pl-3 sm:pl-4">
                "I had never coded before LovHack. Now I have a live app!" — Past Participant
              </p>
            </GlassCard>
          </div>

          {/* Experienced Developers */}
          <div className="audience-card opacity-0">
            <GlassCard className="p-5 sm:p-6 md:p-8 lg:p-10 h-full backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Experienced Developers</h3>
              </div>
              <ul className="space-y-3 sm:space-y-4 md:space-y-5">
                {experiencedPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center">
                      <point.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base md:text-lg text-foreground/80">{point.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 sm:mt-6 md:mt-8 text-xs sm:text-sm md:text-base text-foreground/60 italic border-l-2 border-primary/30 pl-3 sm:pl-4">
                "Best hackathon I've done. Great tools, great people." — Past Winner
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Unifying Message */}
        <div ref={messageRef} className="text-center mt-10 sm:mt-12 md:mt-16 opacity-0">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground px-4">
            Everyone builds. Everyone learns. <span className="text-primary font-bold">Everyone ships.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoIsForSection;
