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
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            What is <span className="text-primary">LovHack</span>?
          </h2>
          <div className="max-w-2xl mx-auto space-y-4 text-foreground/70 text-lg">
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
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <GlassCard key={index} className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <pillar.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-foreground/70">{pillar.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIsLovHackSection;
