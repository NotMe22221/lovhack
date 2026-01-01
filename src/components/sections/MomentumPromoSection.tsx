import momentumLogo from "@/assets/momentum-logo.png";
import { ExternalLink } from "lucide-react";

const MomentumPromoSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-foreground/5 via-foreground/10 to-foreground/5 backdrop-blur-xl border border-foreground/10 p-8 md:p-12 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/30 to-yellow-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-500/20 to-orange-500/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />
          
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
              <span className="text-sm font-medium text-orange-400">🚀 Exclusive Offer</span>
            </div>
            
            {/* Logo and Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <img 
                src={momentumLogo} 
                alt="MOMENTUM - AI Accelerator" 
                className="h-10 md:h-12 w-auto rounded-xl" 
              />
              <div className="h-8 w-px bg-foreground/20 hidden sm:block" />
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                $50 Off First Sprint
              </h3>
            </div>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              Every LovHack participant gets <span className="text-foreground font-semibold">$50 off their first MOMENTUM sprint</span>! 
              A 5-week AI accelerator for vibe-coders and creators to turn one of their business ideas into paying users. Close the gap between prototype and revenue.
            </p>
            
            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span>5-Week Program</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span>AI-Powered Growth</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Prototype to Revenue</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="https://www.yourmomentum.co/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Learn More
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MomentumPromoSection;
