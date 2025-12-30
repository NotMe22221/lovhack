import qoderLogo from "@/assets/qoder-logo.png";
import { ExternalLink } from "lucide-react";
const QoderPromoSection = () => {
  return <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-foreground/5 via-foreground/10 to-foreground/5 backdrop-blur-xl border border-foreground/10 p-8 md:p-12 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#6366f1]/30 to-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/20 to-[#6366f1]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />
          
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">🎁 Exclusive Offer</span>
            </div>
            
            {/* Logo and Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <img src={qoderLogo} alt="Qoder - AI-powered coding platform" className="h-10 md:h-12 w-auto rounded-xl" />
              <div className="h-8 w-px bg-foreground/20 hidden sm:block" />
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                1 Month Free Pro Plan
              </h3>
            </div>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">Top 3 winners will get 1 month of Qoder Pro absolutely free! The AI-powered coding platform that helps you build faster and smarter.<span className="text-foreground font-semibold">1 month of Qoder Pro</span> absolutely free! 
              The AI-powered coding platform that helps you build faster and smarter.
            </p>
            
            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>AI Code Generation</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Smart Debugging</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Code Optimization</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg" href="https://qoder.com/referral?referral_code=Yc4LeTxf67HsC3FWxqWlhyhdsUNwgnMO">
                Try Qoder
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <a href="https://x.com/qoderdev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/10 border border-foreground/20 text-foreground font-medium transition-all duration-300 hover:bg-foreground/20">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @qoderdev
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default QoderPromoSection;