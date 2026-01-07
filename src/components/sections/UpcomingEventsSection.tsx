import { Calendar, Users, Zap, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/GlassCard";

const UpcomingEventsSection = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            What's <span className="text-primary">Coming Next</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 max-w-xl mx-auto px-2">
            Join our Discord to get early access and announcements for upcoming events.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
          {/* Mini-Hack Card */}
          <GlassCard className="p-5 sm:p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium">
              Coming Soon
            </div>
            
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4 mt-6 sm:mt-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">Mini-Hack</h3>
            </div>
            
            <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6">
              A smaller, focused hackathon perfect for your first build. 
              Lower pressure, same great community and prizes.
            </p>
            
            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              <li className="flex items-center gap-2 text-sm sm:text-base text-foreground/80">
                <Users className="w-4 h-4 text-primary flex-shrink-0" />
                Team formation help in Discord
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base text-foreground/80">
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                Beginner mentors available
              </li>
              <li className="flex items-center gap-2 text-sm sm:text-base text-foreground/80">
                <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                Smaller scope, same energy
              </li>
            </ul>
            
            <Button
              asChild
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl py-5 sm:py-4 active:scale-95"
            >
              <a
                href="https://t.co/qMNpoZoiQZ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Early Access on Discord
              </a>
            </Button>
          </GlassCard>

          {/* Season 2 Teaser */}
          <GlassCard className="p-5 sm:p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary/20 text-primary text-xs sm:text-sm font-medium">
              2026
            </div>
            
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4 mt-6 sm:mt-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/20 flex items-center justify-center">
                <span className="text-xl sm:text-2xl">🚀</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">Season 2</h3>
            </div>
            
            <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6">
              Something bigger is coming. After the mini-hack, we're planning our 
              largest event yet with bigger prizes, more sponsors, and global participation.
            </p>
            
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-6 sm:my-8">
              <div className="text-4xl sm:text-5xl md:text-6xl opacity-50">🎯</div>
              <div className="text-4xl sm:text-5xl md:text-6xl opacity-50">💰</div>
              <div className="text-4xl sm:text-5xl md:text-6xl opacity-50">🌍</div>
            </div>
            
            <p className="text-center text-foreground/60 mb-4 sm:mb-6 text-xs sm:text-sm">
              Bigger prizes • More sponsors • Global builders
            </p>
            
            <Button
              asChild
              variant="outline"
              className="w-full rounded-xl bg-white/60 border-white/50 hover:bg-white/80 py-5 sm:py-4 active:scale-95"
            >
              <Link to="/hackathons" className="flex items-center justify-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
