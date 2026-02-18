import { useEffect, useRef } from "react";
import { Trophy, ExternalLink, Star, Medal, Award } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WinnersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const podiumRef = useRef<HTMLDivElement>(null);
  const runnersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Ordered as: 2nd, 1st, 3rd for podium display
  // Ordered as: 2nd, 1st, 3rd for podium display
  const topWinners = [
    {
      place: "2nd",
      icon: Medal,
      iconBgColor: "bg-gradient-to-br from-slate-200 to-slate-300",
      iconColor: "text-slate-600",
      podiumHeight: "h-28 sm:h-32 md:h-40",
      podiumColor: "bg-gradient-to-b from-slate-100/90 to-slate-200/80 backdrop-blur-md border-t border-white/60",
      project: "Learn2Vibecode",
      description: "A learning platform that makes education engaging and accessible.",
      link: "https://www.learn2vibecode.dev/",
    },
    {
      place: "1st",
      icon: Trophy,
      iconBgColor: "bg-gradient-to-br from-amber-100 to-amber-200",
      iconColor: "text-amber-600",
      podiumHeight: "h-36 sm:h-44 md:h-52",
      podiumColor: "bg-gradient-to-b from-amber-100/90 to-amber-200/80 backdrop-blur-md border-t border-white/60 shadow-[0_0_30px_rgba(251,191,36,0.2)]",
      project: "Molyn",
      description: "An innovative project that impressed judges with its creativity and execution.",
      link: "http://molyn.lovable.app/",
    },
    {
      place: "3rd",
      icon: Award,
      iconBgColor: "bg-gradient-to-br from-orange-100 to-orange-200",
      iconColor: "text-orange-700",
      podiumHeight: "h-20 sm:h-24 md:h-32",
      podiumColor: "bg-gradient-to-b from-orange-100/90 to-orange-200/80 backdrop-blur-md border-t border-white/60",
      project: "InternHub",
      description: "Connecting interns with opportunities in a seamless way.",
      link: "https://internershiphub.lovable.app/",
    },
  ];

  const runnersUp = [
    {
      place: "4th",
      project: "Your Inner Forms",
      link: "https://yourinnerforms.lovable.app/",
    },
    {
      place: "5th",
      project: "Reserve and Ready",
      link: "http://reserve-and-dash.lovable.app/",
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
            toggleActions: "play none none reverse",
          },
        }
      );

      // Podium build-up animation
      if (podiumRef.current) {
        const podiums = podiumRef.current.querySelectorAll(".podium-block");
        const cards = podiumRef.current.querySelectorAll(".winner-card");

        // Build up podiums sequentially: 2nd, then 1st (taller), then 3rd
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: podiumRef.current,
            start: "top 75%",
            end: "top 40%",
            toggleActions: "play none none reverse",
          },
        });

        // First hide all
        gsap.set(podiums, { scaleY: 0, transformOrigin: "bottom" });
        gsap.set(cards, { opacity: 0, y: 30 });

        // Build up sequence: 2nd place (index 0), 1st place (index 1), 3rd place (index 2)
        tl.to(podiums[0], { scaleY: 1, duration: 0.6, ease: "power2.out" })
          .to(cards[0], { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }, "-=0.1")
          .to(podiums[1], { scaleY: 1, duration: 0.8, ease: "power2.out" }, "-=0.2")
          .to(cards[1], { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }, "-=0.1")
          .to(podiums[2], { scaleY: 1, duration: 0.5, ease: "power2.out" }, "-=0.2")
          .to(cards[2], { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" }, "-=0.1");
      }

      // Runners up
      if (runnersRef.current) {
        const items = runnersRef.current.querySelectorAll(".runner-card");
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: runnersRef.current,
              start: "top 85%",
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
    <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-14 md:mb-20 opacity-0">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-glass mb-4 sm:mb-6 md:mb-8">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            <span className="text-xs sm:text-sm md:text-base font-medium text-yellow-700">Season 1 Winners</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6 px-2">
            Celebrating Our <span className="text-primary">Champions</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 max-w-xl mx-auto px-4">
            These incredible builders shipped real projects in just 48 hours.
            Here's what they created.
          </p>
        </div>

        {/* Podium Display */}
        <div ref={podiumRef} className="flex items-end justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-12 sm:mb-16 md:mb-20 px-2">
          {topWinners.map((winner, index) => (
            <div key={index} className="flex flex-col items-center flex-1 max-w-[200px] sm:max-w-[240px] md:max-w-[280px]">
              {/* Winner Card */}
              <div className="winner-card w-full mb-3 sm:mb-4 opacity-0">
                <GlassCard className="p-3 sm:p-4 md:p-5 text-center backdrop-blur-2xl">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl ${winner.iconBgColor} flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg`}>
                    <winner.icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${winner.iconColor}`} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {winner.place} Place
                  </span>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-foreground mt-2 mb-1 line-clamp-1">
                    {winner.project}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground/70 mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
                    {winner.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-lg sm:rounded-xl bg-white/50 backdrop-blur-md border-white/40 hover:bg-white/80 text-xs sm:text-sm w-full"
                  >
                    <a
                      href={winner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 sm:gap-2"
                    >
                      View
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </Button>
                </GlassCard>
              </div>

              {/* Podium Block */}
              <div className={`podium-block w-full ${winner.podiumHeight} ${winner.podiumColor} rounded-t-xl sm:rounded-t-2xl shadow-lg flex items-center justify-center`}>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 drop-shadow-lg">
                  {winner.place.charAt(0)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Runners Up (4th & 5th) */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Runners Up</h3>
            <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
          </div>
        </div>

        <div ref={runnersRef} className="grid gap-3 sm:gap-4 md:gap-6 sm:grid-cols-2 max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16 px-4">
          {runnersUp.map((runner, index) => (
            <div key={index} className="runner-card opacity-0">
              <GlassCard className="p-4 sm:p-5 md:p-6 text-center backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                  {runner.place} Place
                </span>
                <h4 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-3 sm:mb-4">
                  {runner.project}
                </h4>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-lg sm:rounded-xl bg-white/50 backdrop-blur-md border-white/40 hover:bg-white/80 text-xs sm:text-sm"
                >
                  <a
                    href={runner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 sm:gap-2"
                  >
                    View Project
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </Button>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Full Leaderboard */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Full Leaderboard</h3>
            <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/40 shadow-lg bg-white/60 backdrop-blur-md">
            <iframe
              src="https://lovhack.floot.app/"
              title="LovHack Season 1 Leaderboard"
              className="w-full h-[500px] sm:h-[600px]"
              loading="lazy"
            />
          </div>
          <a
            href="https://lovhack.floot.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Open leaderboard in new tab
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center opacity-0 px-4">
          <p className="text-sm sm:text-base md:text-lg text-foreground/60 mb-4 sm:mb-6">
            Want to see your project here?
          </p>
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-10 py-5 sm:py-6 text-base sm:text-lg shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-105"
          >
            <a
              href="https://t.co/qMNpoZoiQZ"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Next Hackathon
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WinnersSection;
