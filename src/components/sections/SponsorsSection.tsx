import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import lovableLogo from "@/assets/lovable-logo.png";
import creaoLogo from "@/assets/creao-logo.png";
import hadoLogo from "@/assets/hado-logo-v3.png";
import flootLogo from "@/assets/floot-logo.png";
import qoderLogo from "@/assets/qoder-logo.png";
import dualiteLogo from "@/assets/dualite-logo.png";
import momentumLogo from "@/assets/momentum-logo.png";
import medoLogo from "@/assets/medo-logo.png";
import nodebaseLogo from "@/assets/nodebase-logo.webp";
import miroLogo from "@/assets/miro-logo.webp";
import n8nLogo from "@/assets/n8n-logo.webp";
import brandoyeLogo from "@/assets/brandoye-logo.png";

const SponsorsSection = () => {
  const [brandOyeModalOpen, setBrandOyeModalOpen] = useState(false);

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-medium text-muted-foreground text-center mb-4 tracking-widest uppercase">
          Backed by
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground mb-16">Our Sponsors</h2>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
          {/* Lovable Sponsor */}
          <a
            href="https://lovable.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={lovableLogo}
              alt="Lovable - AI-powered web development"
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>

          {/* Creao Sponsor */}
          <a
            href="https://creao.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img src={creaoLogo} alt="Creao - Creative AI platform" className="h-12 md:h-16 w-auto relative z-10" />
          </a>

          {/* Hado Sponsor */}
          <a
            href="https://hadoseo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4f9df3]/10 to-[#4f9df3]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img src={hadoLogo} alt="Hado - Developer tools" className="h-12 md:h-16 w-auto relative z-10" />
          </a>

          {/* Floot Sponsor */}
          <a
            href="https://floot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f5e6d3]/10 to-[#f5e6d3]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={flootLogo}
              alt="Floot - Build real websites and apps with AI"
              className="h-12 md:h-16 w-auto relative z-10 rounded-xl"
            />
          </a>

          {/* Qoder Sponsor */}
          <a
            href="https://qoder.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2dd4bf]/10 to-[#2dd4bf]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={qoderLogo}
              alt="Qoder - AI-powered coding platform"
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>

          {/* Dualite Sponsor */}
          <a
            href="https://alpha.dualite.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={dualiteLogo}
              alt="Dualite - Design to code platform"
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>

          {/* Momentum Sponsor */}
          <a
            href="https://niklasmey.com/momentum-builders"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={momentumLogo}
              alt="MOMENTUM - AI Accelerator for Vibe-Coders"
              className="h-12 md:h-16 w-auto relative z-10 rounded-xl"
            />
          </a>

          {/* Medo Sponsor */}
          <a
            href="https://medo.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={medoLogo}
              alt="Medo - AI-powered building platform"
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>

          {/* Nodebase Sponsor */}
          <a
            href="https://nodebase.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={nodebaseLogo}
              alt="Nodebase - Backend infrastructure"
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>

          {/* Miro Sponsor */}
          <a
            href="https://miro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={miroLogo}
              alt="Miro - Visual collaboration platform"
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>

          {/* n8n Sponsor */}
          <a
            href="https://n8n.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/10 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={n8nLogo}
              alt="n8n - Workflow automation"
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </a>
          {/* BrandOye Sponsor */}
          <button
            onClick={() => setBrandOyeModalOpen(true)}
            className="group relative flex items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={brandoyeLogo}
              alt="BrandOye - AI-powered marketing platform"
              className="h-12 md:h-16 w-auto relative z-10"
            />
          </button>
        </div>

        {/* BrandOye Modal */}
        <AnimatePresence>
          {brandOyeModalOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setBrandOyeModalOpen(false)} />
              <motion.div
                className="relative z-10 w-full max-w-md rounded-3xl bg-card border border-border p-8 text-center shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.4 }}
              >
                <button
                  onClick={() => setBrandOyeModalOpen(false)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-bold text-foreground mb-3">🚀 Coming Soon</h3>
                <p className="text-foreground/70 text-base mb-6">
                  BrandOye will launch on 9 March. Stay tuned.
                </p>
                <Button onClick={() => setBrandOyeModalOpen(false)} className="rounded-full px-8">
                  Got it
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-muted-foreground mt-16 text-sm">
          Interested in sponsoring LovHack?{" "}
          <a
            href="https://t.co/qMNpoZoiQZ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
          >
            Reach out on Discord
          </a>
        </p>
      </div>
    </section>
  );
};

export default SponsorsSection;
