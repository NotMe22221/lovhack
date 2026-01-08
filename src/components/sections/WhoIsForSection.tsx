import { Heart, Code, Lightbulb, Trophy, HelpCircle, Handshake, Sprout, Zap } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";

const WhoIsForSection = () => {
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

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            LovHack is for <span className="text-primary">Everyone</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 max-w-xl mx-auto px-2">
            Whether you're writing your first line of code or you've shipped dozens of products,
            there's a place for you here.
          </p>
        </ScrollAnimation>

        {/* Two Columns */}
        <StaggerContainer className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2" staggerDelay={0.2}>
          {/* First-Time Builders */}
          <StaggerItem>
            <GlassCard className="p-5 sm:p-6 md:p-8 h-full">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">First-Time Builders</h3>
              </div>
              <ul className="space-y-3 sm:space-y-4">
                {beginnerPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-2.5 sm:gap-3">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-green-100 flex items-center justify-center">
                      <point.icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground/80">{point.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-foreground/60 italic">
                "I had never coded before LovHack. Now I have a live app!" — Past Participant
              </p>
            </GlassCard>
          </StaggerItem>

          {/* Experienced Developers */}
          <StaggerItem>
            <GlassCard className="p-5 sm:p-6 md:p-8 h-full">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Experienced Developers</h3>
              </div>
              <ul className="space-y-3 sm:space-y-4">
                {experiencedPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-2.5 sm:gap-3">
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 flex items-center justify-center">
                      <point.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground/80">{point.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-foreground/60 italic">
                "Best hackathon I've done. Great tools, great people." — Past Winner
              </p>
            </GlassCard>
          </StaggerItem>
        </StaggerContainer>

        {/* Unifying Message */}
        <ScrollAnimation className="text-center mt-8 sm:mt-10 md:mt-12" delay={0.4}>
          <p className="text-lg sm:text-xl font-medium text-foreground">
            Everyone builds. Everyone learns. <span className="text-primary">Everyone ships.</span>
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default WhoIsForSection;
