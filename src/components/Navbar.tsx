import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageSquare, LogIn, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import lovhackLogo from "@/assets/lovhack-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/winners", label: "Winners" },
    { to: "/mentoring", label: "Mentoring" },
    { to: "/support", label: "Support" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
        <div className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-full shadow-2xl px-2 py-2 pl-4 md:pl-6 md:pr-2">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={lovhackLogo}
                alt="LovHack"
                className="h-8 md:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <div className="hidden md:flex items-center gap-1 bg-secondary/30 rounded-full p-1 border border-white/20">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 z-10"
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

            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="hidden md:inline-flex rounded-full px-4"
                  >
                    <Link to="/submit">Submit Project</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4"
                  >
                    <Link to="/dashboard" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  size="sm"
                  className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5"
                >
                  <Link to="/login" className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                </Button>
              )}

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
                    className={`px-4 py-3 rounded-2xl text-base font-medium transition-all duration-300 flex items-center justify-between ${
                      isActive(link.to)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-black/5 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {isActive(link.to) && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </Link>
                ))}
                <div className="h-px bg-black/5 my-2" />
                {user ? (
                  <>
                    <Link
                      to="/submit"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 rounded-2xl text-base font-medium text-foreground/70 hover:bg-black/5"
                    >
                      Submit Project
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 rounded-2xl bg-primary/10 text-primary font-semibold flex items-center justify-center gap-2"
                    >
                      <User className="w-5 h-5" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { signOut(); setIsOpen(false); }}
                      className="px-4 py-3 rounded-2xl text-sm text-muted-foreground hover:bg-black/5 flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-2xl bg-primary/10 text-primary font-semibold flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
