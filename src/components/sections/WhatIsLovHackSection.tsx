import { Rocket, Users, GraduationCap } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { motion } from "framer-motion";

const WhatIsLovHackSection = () => {
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

  return (
    <section className="relative py-20 sm:py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 sm:mb-8">
            What is <span className="text-primary">LovHack</span>?
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 text-foreground/70 text-base sm:text-lg md:text-xl px-2">
            <p>
              <strong className="text-foreground/90">A hackathon</strong> is a building event where you create a working project
              in a short time — usually 48 hours. Think of it as a creative sprint with friends.
            </p>
            <p>
              <strong className="text-foreground/90">LovHack</strong> is beginner-friendly. You don't need coding experience
              to participate. You can use AI tools, low-code platforms, or learn as you go.
            </p>
            <p>
              You can join <strong className="text-foreground/90">solo</strong> or find teammates in our Discord. We'll help
              you connect with others who complement your skills.
            </p>
          </div>
        </ScrollAnimation>

        {/* Pillars */}
        <StaggerContainer className="grid gap-6 sm:gap-8 md:grid-cols-3" staggerDelay={0.15}>
          {pillars.map((pillar, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <GlassCard className="p-6 sm:p-8 md:p-10 text-center h-full backdrop-blur-2xl">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl bg-primary/10 mb-6 sm:mb-8">
                    <pillar.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-base sm:text-lg text-foreground/70">{pillar.description}</p>
                </GlassCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WhatIsLovHackSection;
