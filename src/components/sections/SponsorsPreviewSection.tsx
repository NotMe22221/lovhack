import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    <section className="relative py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Backed by <span className="text-primary">Leading Tools</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 max-w-xl mx-auto px-2">
            LovHack participants get exclusive access to these amazing sponsor tools.
          </p>
        </div>

        {/* Sponsor Logos */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-8 sm:mb-10">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/50 flex items-center justify-center p-2 sm:p-3 md:p-4 hover:bg-white/80 transition-all duration-300 active:scale-95"
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-2xl bg-white/60 border-white/50 hover:bg-white/80 py-5 sm:py-4 active:scale-95"
          >
            <Link to="/sponsors" className="flex items-center justify-center gap-2">
              View All Sponsors & Offers
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SponsorsPreviewSection;
