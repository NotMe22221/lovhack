import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import lovhackLogo from "@/assets/lovhack-logo.png";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/hackathons", label: "Hackathons" },
    { to: "/sponsors", label: "Sponsors" },
    { to: "/season-1", label: "Season 1" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Floating Island Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-full shadow-2xl px-2 py-2 pl-4 md:pl-6 md:pr-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={lovhackLogo}
                alt="LovHack"
                className="h-8 md:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation - Pill Design */}
            <div className="hidden md:flex items-center gap-1 bg-secondary/30 rounded-full p-1 border border-white/20">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 z-10"
                >
                  {isActive(link.to) && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-white shadow-sm rounded-full mix-blend-multiply"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ borderRadius: 9999 }}
                    />
                  )}
                  <span className={`relative z-20 ${isActive(link.to) ? "text-primary font-semibold" : "text-foreground/70 hover:text-foreground"}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Button
                asChild
                size="sm"
                className="hidden md:inline-flex bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-full px-5 shadow-lg shadow-[#5865F2]/20 hover:shadow-[#5865F2]/40 transition-all duration-300"
              >
                <a
                  href="https://t.co/qMNpoZoiQZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Discord</span>
                </a>
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-4 right-4 z-40 md:hidden"
          >
            <div className="bg-white/80 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-2xl p-4 overflow-hidden">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 flex items-center justify-between ${isActive(link.to)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-black/5 hover:text-foreground"
                      }`}
                  >
                    {link.label}
                    {isActive(link.to) && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </Link>
                ))}
                <div className="h-px bg-black/5 my-2" />
                <a
                  href="https://t.co/qMNpoZoiQZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-2xl bg-[#5865F2]/10 text-[#5865F2] font-semibold flex items-center justify-center gap-2 hover:bg-[#5865F2]/20 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  Join Discord Community
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
