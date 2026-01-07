import { ArrowRight, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NewHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Beginner Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            First hackathon? You're in the right place.
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
          Build Something Real.
          <br />
          <span className="text-primary">No Experience Required.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 animate-fade-in">
          LovHack is an online hackathon where developers, designers, and complete beginners 
          ship real projects together in 48 hours. Join our welcoming community of 500+ builders.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in">
          <Button
            asChild
            size="lg"
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <a
              href="https://t.co/qMNpoZoiQZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              Join Discord for Early Access
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-2xl px-8 py-6 text-lg bg-white/60 backdrop-blur-sm border-white/50 hover:bg-white/80"
          >
            <Link to="/season-1" className="flex items-center gap-2">
              See Season 1 Recap
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-foreground/50 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span className="text-sm">20+ Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="text-sm">40+ Projects Shipped</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💪</span>
            <span className="text-sm">100+ Builders</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
