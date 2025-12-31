import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-16 px-4" role="contentinfo">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-md border border-white/50 shadow-glass mb-6" aria-hidden="true">
            <span className="text-2xl">💖</span>
          </div>
          <p className="text-lg font-medium text-foreground/60">
            LovHack 2026. Build something real.
          </p>
          <nav className="mt-6 flex justify-center gap-6" aria-label="Footer navigation">
            <a 
              href="https://t.co/tciohUF17q" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-foreground/50 hover:text-primary transition-colors"
            >
              Register
            </a>
            <a 
              href="https://t.co/qMNpoZoiQZ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-foreground/50 hover:text-primary transition-colors"
            >
              Discord
            </a>
            <Link 
              to="/auth"
              className="text-sm text-foreground/50 hover:text-primary transition-colors"
            >
              Admin
            </Link>
          </nav>
          <p className="mt-6 text-xs text-foreground/40">
            © {currentYear} LovHack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
