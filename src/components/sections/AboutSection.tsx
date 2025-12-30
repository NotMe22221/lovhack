import GlassCard from "../GlassCard";
import { Zap, Users, Sparkles } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="relative py-24 px-4" id="about" aria-labelledby="about-title">
      <div className="max-w-4xl mx-auto">
        <h2 id="about-title" className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground mb-12">
          What is <span className="text-primary">LovHack</span>?
        </h2>
        
        <GlassCard className="text-center">
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
              LovHack is a <strong className="text-foreground">48-hour build-first hackathon</strong> focused 
              on shipping real web applications. No fluff, no long talks — just building.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-primary/20">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">All skill levels welcome</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">AI-assisted workflows</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-primary/20">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">Modern web tech</span>
              </div>
            </div>
            
            <p className="text-base text-foreground/60 pt-2">
              Whether you're a seasoned developer or just starting out, LovHack is your chance to 
              create something real in a supportive, high-energy environment.
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default AboutSection;
