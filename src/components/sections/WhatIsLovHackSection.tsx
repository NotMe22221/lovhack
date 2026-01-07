import { Rocket, Users, GraduationCap } from "lucide-react";
import GlassCard from "@/components/GlassCard";

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
    <section className="relative py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            What is <span className="text-primary">LovHack</span>?
          </h2>
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4 text-foreground/70 text-base sm:text-lg px-2">
            <p>
              <strong>A hackathon</strong> is a building event where you create a working project 
              in a short time — usually 48 hours. Think of it as a creative sprint with friends.
            </p>
            <p>
              <strong>LovHack</strong> is beginner-friendly. You don't need coding experience 
              to participate. You can use AI tools, low-code platforms, or learn as you go.
            </p>
            <p>
              You can join <strong>solo</strong> or find teammates in our Discord. We'll help 
              you connect with others who complement your skills.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <GlassCard key={index} className="p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary/10 mb-4 sm:mb-6">
                <pillar.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm sm:text-base text-foreground/70">{pillar.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsLovHackSection;
