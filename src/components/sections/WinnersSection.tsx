import { Trophy, ExternalLink, Star, Medal, Award } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { motion } from "framer-motion";

const WinnersSection = () => {
  const topWinners = [
    {
      place: "1st",
      icon: Trophy,
      iconBgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      project: "Molyn",
      description: "An innovative project that impressed judges with its creativity and execution.",
      link: "http://molyn.lovable.app/",
    },
    {
      place: "2nd",
      icon: Medal,
      iconBgColor: "bg-gray-100",
      iconColor: "text-gray-500",
      project: "Vibe2Learn",
      description: "A learning platform that makes education engaging and accessible.",
      link: "https://www.learn2vibecode.dev/",
    },
    {
      place: "3rd",
      icon: Award,
      iconBgColor: "bg-orange-100",
      iconColor: "text-orange-600",
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
    <section className="relative py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-yellow-100 border border-yellow-200 mb-4 sm:mb-6">
            <Trophy className="w-4 h-4 text-yellow-600" />
            <span className="text-xs sm:text-sm font-medium text-yellow-700">Season 1 Winners</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Celebrating Our <span className="text-primary">Champions</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 max-w-xl mx-auto px-2">
            These incredible builders shipped real projects in just 48 hours.
            Here&apos;s what they created.
          </p>
        </ScrollAnimation>

        {/* Top 3 Winners */}
        <StaggerContainer className="grid gap-4 sm:gap-6 md:grid-cols-3 mb-8 sm:mb-10" staggerDelay={0.15}>
          {topWinners.map((winner, index) => (
            <StaggerItem key={index}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <GlassCard
                  className={`p-5 sm:p-6 md:p-8 relative overflow-hidden h-full ${index === 0 ? "md:order-2 bg-gradient-to-br from-yellow-50/50 to-orange-50/50" : ""
                    } ${index === 1 ? "md:order-1" : ""} ${index === 2 ? "md:order-3" : ""}`}
                >
                  {/* Place Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${winner.iconBgColor} flex items-center justify-center`}>
                      <winner.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${winner.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pr-12 sm:pr-14">
                    <span className="text-xs sm:text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {winner.place} Place
                    </span>

                    <h3 className="text-lg sm:text-xl font-bold text-foreground mt-3 mb-2">
                      {winner.project}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/70 mb-4">
                      {winner.description}
                    </p>

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-xl bg-white/60 border-white/50 hover:bg-white/80 text-xs sm:text-sm"
                    >
                      <a
                        href={winner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5"
                      >
                        View Project
                        <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </a>
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Runners Up (4th & 5th) */}
        <ScrollAnimation className="text-center mb-4 sm:mb-6" delay={0.3}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-bold text-foreground">Runners Up</h3>
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid gap-3 sm:gap-4 sm:grid-cols-2 max-w-2xl mx-auto mb-10 sm:mb-12" staggerDelay={0.1}>
          {runnersUp.map((runner, index) => (
            <StaggerItem key={index}>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <GlassCard className="p-4 sm:p-5 text-center">
                  <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                    {runner.place} Place
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-foreground mb-3">
                    {runner.project}
                  </h4>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-xl bg-white/60 border-white/50 hover:bg-white/80 text-xs sm:text-sm"
                  >
                    <a
                      href={runner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      View Project
                      <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </a>
                  </Button>
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollAnimation className="text-center" delay={0.4}>
          <p className="text-sm sm:text-base text-foreground/60 mb-4">
            Want to see your project here?
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl px-6 sm:px-8 py-5 sm:py-4"
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
