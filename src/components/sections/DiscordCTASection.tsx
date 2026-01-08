import { Users, Bell, Handshake, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { motion } from "framer-motion";

interface DiscordCTASectionProps {
  variant?: "default" | "compact";
}

const DiscordCTASection = ({ variant = "default" }: DiscordCTASectionProps) => {
  const benefits = [
    { icon: Bell, text: "Get early access to hackathons" },
    { icon: Handshake, text: "Find teammates and mentors" },
    { icon: HelpCircle, text: "Get beginner support" },
    { icon: Users, text: "Join 500+ builders" },
  ];

  if (variant === "compact") {
    return (
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation>
            <GlassCard className="p-6 sm:p-8 md:p-10 text-center bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                Ready to Join the Community?
              </h3>
              <p className="text-base sm:text-lg text-foreground/70 mb-6 sm:mb-8">
                Get early access, find teammates, and connect with other builders.
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 sm:px-10 py-6 shadow-xl shadow-primary/20"
                >
                  <a
                    href="https://t.co/qMNpoZoiQZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Join Discord
                  </a>
                </Button>
              </motion.div>
            </GlassCard>
          </ScrollAnimation>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 sm:py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <ScrollAnimation>
          <GlassCard className="p-8 sm:p-10 md:p-16 text-center bg-gradient-to-br from-primary/10 via-transparent to-primary/5 backdrop-blur-2xl">
            {/* Discord Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-3xl sm:rounded-[2rem] bg-[#5865F2] mb-8 sm:mb-10 shadow-2xl shadow-[#5865F2]/30"
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Ready to <span className="text-primary">Join</span>?
            </h2>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-xl mx-auto mb-10 sm:mb-12 px-2">
              Our Discord is where it all happens — early access, team formation,
              beginner support, and a community of 500+ builders ready to help.
            </p>

            {/* Benefits Grid */}
            <StaggerContainer className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 mb-10 sm:mb-12" staggerDelay={0.1}>
              {benefits.map((benefit, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="flex flex-col items-center gap-3 p-4 sm:p-5"
                    whileHover={{ y: -8, scale: 1.05 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground/70 text-center">
                      {benefit.text}
                    </span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-10 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl shadow-2xl shadow-primary/25 transition-all duration-300"
              >
                <a
                  href="https://t.co/qMNpoZoiQZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Join the LovHack Discord
                </a>
              </Button>
            </motion.div>
          </GlassCard>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default DiscordCTASection;
