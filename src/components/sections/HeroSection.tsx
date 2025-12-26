import { ExternalLink, MessageCircle } from "lucide-react";
import CountdownTimer from "../CountdownTimer";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 shadow-glass mb-8 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-foreground/80">January 2026</span>
        </div>
        
        {/* Main Title */}
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          LovHack
          <span className="block text-primary">Hackathon</span>
        </h1>
        
        {/* Subtitle */}
        <p 
          className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground/70 mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          48 Hour Hackathon
        </p>
        
        {/* Event Details */}
        <div 
          className="space-y-2 mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <p className="text-lg text-foreground/60">
            January 2nd, 8:00 AM — January 4th, 8:00 AM
          </p>
          <p className="text-lg font-medium text-foreground/70 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Online
          </p>
        </div>
        
        {/* Countdown Timer */}
        <div 
          className="mb-10 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.45s' }}
        >
          <CountdownTimer />
        </div>
        
        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <a
            href="https://t.co/tciohUF17q"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
          >
            Sign Up on Luma
            <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          
          <a
            href="https://t.co/qMNpoZoiQZ"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/70 backdrop-blur-md border border-white/50 text-foreground font-semibold text-lg shadow-glass hover:bg-white/90 hover:shadow-glass-hover hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Join Discord
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-foreground/30 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
