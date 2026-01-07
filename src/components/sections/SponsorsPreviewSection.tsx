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
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Backed by <span className="text-primary">Leading Tools</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-xl mx-auto">
            LovHack participants get exclusive access to these amazing sponsor tools.
          </p>
        </div>

        {/* Sponsor Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-10">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="w-24 h-24 md:w-32 md:h-32 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 flex items-center justify-center p-4 hover:bg-white/80 transition-all duration-300"
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
            className="rounded-2xl bg-white/60 border-white/50 hover:bg-white/80"
          >
            <Link to="/sponsors" className="flex items-center gap-2">
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
