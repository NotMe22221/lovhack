import { Trophy, ExternalLink, Star, Medal, Award } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { motion } from "framer-motion";

const WinnersSection = () => {
  // Ordered as: 2nd, 1st, 3rd for podium display
  const topWinners = [
    {
      place: "2nd",
      order: 1,
      icon: Medal,
      iconBgColor: "bg-gray-100",
      iconColor: "text-gray-500",
      cardClass: "",
      project: "Learn2Vibecode",
      description: "A learning platform that makes education engaging and accessible.",
      link: "https://www.learn2vibecode.dev/",
    },
    {
      place: "1st",
      order: 0,
      icon: Trophy,
      iconBgColor: "bg-gradient-to-br from-yellow-100 to-amber-100",
      iconColor: "text-yellow-600",
      cardClass: "bg-gradient-to-br from-yellow-50/60 to-orange-50/60 scale-105 z-10",
      project: "Molyn",
      description: "An innovative project that impressed judges with its creativity and execution.",
      link: "http://molyn.lovable.app/",
    },
    {
      place: "3rd",
      order: 2,
      icon: Award,
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      cardClass: "",
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

  return (
    <section className="relative py-20 sm:py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-glass mb-6 sm:mb-8">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            <span className="text-sm sm:text-base font-medium text-yellow-700">Season 1 Winners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Celebrating Our <span className="text-primary">Champions</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-xl mx-auto px-2">
            These incredible builders shipped real projects in just 48 hours.
            Here&apos;s what they created.
          </p>
        </ScrollAnimation>

        {/* Top 3 Winners - Podium Style (2nd, 1st, 3rd) */}
        <StaggerContainer className="grid gap-4 sm:gap-6 md:grid-cols-3 mb-12 sm:mb-16 items-end" staggerDelay={0.15}>
          {topWinners.map((winner, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                className={winner.place === "1st" ? "md:-mt-8" : ""}
              >
                <GlassCard
                  className={`p-6 sm:p-8 relative overflow-hidden h-full backdrop-blur-2xl ${winner.cardClass}`}
                >
                  {/* Place Badge */}
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${winner.iconBgColor} flex items-center justify-center shadow-lg`}>
                      <winner.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${winner.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pr-16 sm:pr-20">
                    <span className="text-sm sm:text-base font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {winner.place} Place
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-4 mb-3">
                      {winner.project}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/70 mb-5">
                      {winner.description}
                    </p>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-xl bg-white/50 backdrop-blur-md border-white/40 hover:bg-white/80 text-sm"
                    >
                      <a
                        href={winner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        View Project
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Runners Up (4th & 5th) */}
        <ScrollAnimation className="text-center mb-6 sm:mb-8" delay={0.3}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Runners Up</h3>
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid gap-4 sm:gap-6 sm:grid-cols-2 max-w-2xl mx-auto mb-12 sm:mb-16" staggerDelay={0.1}>
          {runnersUp.map((runner, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <GlassCard className="p-5 sm:p-6 text-center backdrop-blur-2xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                    {runner.place} Place
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                    {runner.project}
                  </h4>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-xl bg-white/50 backdrop-blur-md border-white/40 hover:bg-white/80 text-sm"
                  >
                    <a
                      href={runner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      View Project
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollAnimation className="text-center" delay={0.4}>
          <p className="text-base sm:text-lg text-foreground/60 mb-6">
            Want to see your project here?
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 sm:px-10 py-6 text-base sm:text-lg shadow-xl shadow-primary/20"
            >
              <a
                href="https://t.co/qMNpoZoiQZ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the Next Hackathon
              </a>
            </Button>
          </motion.div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default WinnersSection;
