import lovableLogo from "@/assets/lovable-logo.png";
import creaoLogo from "@/assets/creao-logo.png";

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
