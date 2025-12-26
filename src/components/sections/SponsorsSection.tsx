import GlassCard from "../GlassCard";

const SponsorsSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground mb-16">
          Sponsors
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {/* Lovable Sponsor Card */}
          <GlassCard className="px-10 py-8 flex items-center justify-center min-w-[180px]">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center border border-primary/10">
                <span className="text-3xl">💖</span>
              </div>
              <span className="text-xl font-bold text-foreground">Lovable</span>
            </div>
          </GlassCard>
          
          {/* Creao Sponsor Card */}
          <GlassCard className="px-10 py-8 flex items-center justify-center min-w-[180px]">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 flex items-center justify-center border border-foreground/10">
                <span className="text-3xl">🎨</span>
              </div>
              <span className="text-xl font-bold text-foreground">Creao</span>
            </div>
          </GlassCard>
        </div>
        
        <p className="text-center text-muted-foreground mt-12 text-sm">
          Want to sponsor LovHack? Reach out to us on Discord.
        </p>
      </div>
    </section>
  );
};

export default SponsorsSection;
