import lovableLogo from "@/assets/lovable-logo.png";
import { ExternalLink } from "lucide-react";
const LovablePromoSection = () => {
  return <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-foreground/5 via-foreground/10 to-foreground/5 backdrop-blur-xl border border-foreground/10 p-8 md:p-12 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#ff69b4]/30 to-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/20 to-[#ff69b4]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-50" />
          
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">🎁 Exclusive Offer</span>
            </div>
            
            {/* Logo and Title */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <img src={lovableLogo} alt="Lovable - Build software with AI" className="h-10 md:h-12 w-auto rounded-xl" />
              <div className="h-8 w-px bg-foreground/20 hidden sm:block" />
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                1 Month Free Pro Plan
              </h3>
            </div>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
              Every LovHack participant gets <span className="text-foreground font-semibold">1 month of Lovable Pro</span> absolutely free! 
              Build software with AI. The fastest way to turn your ideas into real, working products.
            </p>
            
            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>AI-Powered Development</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Full-Stack Apps</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>One-Click Deploy</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg" href="https://lovable.dev/invite/33034HX">
                Try Lovable
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <a target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/10 border border-foreground/20 text-foreground font-medium transition-all duration-300 hover:bg-foreground/20" href="https://x.com/Lovable">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @lovaborators
              </a>
              
              <a href="https://discord.gg/lovable-dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/10 border border-foreground/20 text-foreground font-medium transition-all duration-300 hover:bg-foreground/20">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
                </svg>
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default LovablePromoSection;