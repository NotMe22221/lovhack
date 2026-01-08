import { Heart, Code, Lightbulb, Trophy, HelpCircle, Handshake, Sprout, Zap } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { motion } from "framer-motion";

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
    <section className="relative py-20 sm:py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            LovHack is for <span className="text-primary">Everyone</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-xl mx-auto px-2">
            Whether you're writing your first line of code or you've shipped dozens of products,
            there's a place for you here.
          </p>
        </ScrollAnimation>

        {/* Two Columns */}
        <StaggerContainer className="grid gap-6 sm:gap-8 md:grid-cols-2" staggerDelay={0.2}>
          {/* First-Time Builders */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <GlassCard className="p-6 sm:p-8 md:p-10 h-full backdrop-blur-2xl">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center shadow-lg">
                    <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">First-Time Builders</h3>
                </div>
                <ul className="space-y-4 sm:space-y-5">
                  {beginnerPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-green-100 flex items-center justify-center">
                        <point.icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                      <span className="text-base sm:text-lg text-foreground/80">{point.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 sm:mt-8 text-sm sm:text-base text-foreground/60 italic border-l-2 border-primary/30 pl-4">
                  "I had never coded before LovHack. Now I have a live app!" — Past Participant
                </p>
              </GlassCard>
            </motion.div>
          </StaggerItem>

          {/* Experienced Developers */}
          <StaggerItem>
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <GlassCard className="p-6 sm:p-8 md:p-10 h-full backdrop-blur-2xl">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Experienced Developers</h3>
                </div>
                <ul className="space-y-4 sm:space-y-5">
                  {experiencedPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center">
                        <point.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <span className="text-base sm:text-lg text-foreground/80">{point.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 sm:mt-8 text-sm sm:text-base text-foreground/60 italic border-l-2 border-primary/30 pl-4">
                  "Best hackathon I've done. Great tools, great people." — Past Winner
                </p>
              </GlassCard>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>

        {/* Unifying Message */}
        <ScrollAnimation className="text-center mt-12 sm:mt-16" delay={0.4}>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground">
            Everyone builds. Everyone learns. <span className="text-primary font-bold">Everyone ships.</span>
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default WhoIsForSection;
