import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ScrollAnimation";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { motion } from "framer-motion";

import lovableLogo from "@/assets/lovable-logo.png";
import creaoLogo from "@/assets/creao-logo.png";
import hadoLogo from "@/assets/hado-logo-v3.png";
import flootLogo from "@/assets/floot-logo.png";
import qoderLogo from "@/assets/qoder-logo.png";
import dualiteLogo from "@/assets/dualite-logo.png";
import momentumLogo from "@/assets/momentum-logo.png";

const SponsorsPreviewSection = () => {
  const sponsors = [
    { name: "Lovable", logo: lovableLogo },
    { name: "Creao", logo: creaoLogo },
    { name: "Hado", logo: hadoLogo },
    { name: "Floot", logo: flootLogo },
    { name: "Qoder", logo: qoderLogo },
    { name: "Dualite", logo: dualiteLogo },
    { name: "Momentum", logo: momentumLogo },
  ];

  return (
    <section className="relative py-20 sm:py-24 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollAnimation className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Backed by <span className="text-primary">Leading Tools</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-xl mx-auto px-2">
            LovHack participants get exclusive access to these amazing sponsor tools.
          </p>
        </ScrollAnimation>

        {/* Sponsor Logos */}
        <StaggerContainer className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-10 lg:gap-14 mb-12 sm:mb-16" staggerDelay={0.08}>
          {sponsors.map((sponsor) => (
            <StaggerItem key={sponsor.name}>
              <motion.div
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-white/50 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/40 flex items-center justify-center p-3 sm:p-4 md:p-5 shadow-glass"
                whileHover={{ scale: 1.1, y: -8, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollAnimation className="text-center" delay={0.3}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-2xl bg-white/50 backdrop-blur-xl border-white/40 hover:bg-white/80 py-6 shadow-glass"
            >
              <Link to="/sponsors" className="flex items-center justify-center gap-3">
                View All Sponsors & Offers
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default SponsorsPreviewSection;
