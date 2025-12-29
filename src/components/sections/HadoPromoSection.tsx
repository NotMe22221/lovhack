import hadoLogo from "@/assets/hado-logo.svg";
import { ExternalLink } from "lucide-react";

const HadoPromoSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4f9df3]/5 via-background to-[#4f9df3]/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#4f9df3]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#4f9df3]/15 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#4f9df3]/10 to-[#4f9df3]/5 backdrop-blur-xl border border-[#4f9df3]/20 shadow-2xl p-8 md:p-12 overflow-hidden">
          {/* Inner glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-[#4f9df3]/50 to-transparent" />
          
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4f9df3]/20 border border-[#4f9df3]/30 text-[#4f9df3] text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#4f9df3] animate-pulse" />
              Exclusive Offer
            </span>
          </div>
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={hadoLogo} 
              alt="HadoSEO - AI-powered SEO platform" 
              className="h-16 md:h-20 w-auto"
            />
          </div>
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            Boost Your SEO with AI
          </h2>
          
          {/* Description */}
          <p className="text-center text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            HadoSEO is an AI-powered SEO platform that helps you optimize your content, 
            track rankings, and outrank your competition. Perfect for developers and marketers alike.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              "AI Content Optimization",
              "Keyword Research",
              "Rank Tracking",
              "Competitor Analysis",
              "Backlink Monitoring",
              "SEO Audits",
            ].map((feature) => (
              <div 
                key={feature}
                className="flex items-center gap-2 text-foreground/80"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#4f9df3]" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://hadoseo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#4f9df3] text-white font-semibold shadow-lg shadow-[#4f9df3]/25 hover:shadow-xl hover:shadow-[#4f9df3]/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Try HadoSEO
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            
            <a
              href="https://x.com/Hado_SEO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground font-medium hover:bg-foreground/10 transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow on X
            </a>
            
            <a
              href="https://discord.com/invite/wStW7rFvrF"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 text-foreground font-medium hover:bg-[#5865F2]/20 transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HadoPromoSection;
