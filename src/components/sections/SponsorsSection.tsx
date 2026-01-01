import lovableLogo from "@/assets/lovable-logo.png";
import creaoLogo from "@/assets/creao-logo.png";
import hadoLogo from "@/assets/hado-logo-v3.png";
import flootLogo from "@/assets/floot-logo.png";
import qoderLogo from "@/assets/qoder-logo.png";
import dualiteLogo from "@/assets/dualite-logo.png";
import momentumLogo from "@/assets/momentum-logo.png";

const SponsorsSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-medium text-muted-foreground text-center mb-4 tracking-widest uppercase">
          Backed by
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground mb-16">
          Our Sponsors
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {/* Lovable Sponsor */}
          <a 
            href="https://lovable.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={lovableLogo} 
              alt="Lovable - AI-powered web development" 
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>
          
          {/* Creao Sponsor */}
          <a 
            href="https://creao.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={creaoLogo} 
              alt="Creao - Creative AI platform" 
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>
          
          {/* Hado Sponsor */}
          <a 
            href="https://hadoseo.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4f9df3]/10 to-[#4f9df3]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={hadoLogo} 
              alt="Hado - Developer tools" 
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>
          
          {/* Floot Sponsor */}
          <a 
            href="https://floot.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f5e6d3]/10 to-[#f5e6d3]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={flootLogo} 
              alt="Floot - Build real websites and apps with AI" 
              className="h-12 md:h-16 w-auto relative z-10 rounded-xl"
            />
          </a>
          
          {/* Qoder Sponsor */}
          <a 
            href="https://qoder.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2dd4bf]/10 to-[#2dd4bf]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={qoderLogo} 
              alt="Qoder - AI-powered coding platform" 
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>
          
          {/* Dualite Sponsor */}
          <a 
            href="https://alpha.dualite.dev" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={dualiteLogo} 
              alt="Dualite - Design to code platform" 
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>
          
          {/* Momentum Sponsor */}
          <a 
            href="https://www.yourmomentum.co/" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={momentumLogo} 
              alt="MOMENTUM - AI Accelerator for Vibe-Coders" 
              className="h-12 md:h-16 w-auto relative z-10 rounded-xl"
            />
          </a>
        </div>
        
        <p className="text-center text-muted-foreground mt-16 text-sm">
          Interested in sponsoring LovHack?{" "}
          <a 
            href="https://t.co/qMNpoZoiQZ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
          >
            Reach out on Discord
          </a>
        </p>
      </div>
    </section>
  );
};

export default SponsorsSection;
