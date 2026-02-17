import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import { ExternalLink, Gift, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import lovableLogo from "@/assets/lovable-logo.png";
import creaoLogo from "@/assets/creao-logo.png";
import hadoLogo from "@/assets/hado-logo-v3.png";
import flootLogo from "@/assets/floot-logo.png";
import qoderLogo from "@/assets/qoder-logo.png";
import dualiteLogo from "@/assets/dualite-logo.png";
import momentumLogo from "@/assets/momentum-logo.png";
import medoLogo from "@/assets/medo-logo.png";

const Sponsors = () => {
  const sponsors = [
    {
      name: "Lovable",
      logo: lovableLogo,
      description: "Build full-stack web apps with AI. Ship faster than ever before.",
      offer: "1 month free Pro",
      website: "https://lovable.dev",
      size: "large",
      color: "from-pink-500/20 to-rose-500/5",
    },
    {
      name: "Momentum",
      logo: momentumLogo,
      description: "AI-powered development platform preventing burnout.",
      offer: "Extended trial",
      website: "https://momentum.sh",
      size: "medium",
      color: "from-rose-500/20 to-pink-500/5",
    },
    {
      name: "Creao",
      logo: creaoLogo,
      description: "Create beautiful designs & prototypes with AI.",
      offer: "Special access",
      website: "https://creao.ai",
      size: "small",
      color: "from-fuchsia-500/10 to-pink-500/5",
    },
    {
      name: "Hado",
      logo: hadoLogo,
      description: "Build and deploy backend services with ease.",
      offer: "Free credits",
      website: "https://hado.dev",
      size: "small",
    },
    {
      name: "Floot",
      logo: flootLogo,
      description: "Intelligent automation for your dev workflow.",
      offer: "Premium access",
      website: "https://floot.io",
      size: "medium",
      color: "from-pink-400/20 to-rose-400/5",
    },
    {
      name: "Qoder",
      logo: qoderLogo,
      description: "Your pair programming AI buddy.",
      offer: "Extended trial",
      website: "https://qoder.ai",
      size: "small",
    },
    {
      name: "Dualite",
      logo: dualiteLogo,
      description: "Figma to Code instantly.",
      offer: "Free conversions",
      website: "https://dualite.com",
      size: "small",
    },
    {
      name: "Medo",
      logo: medoLogo,
      description: "Build with AI-powered tools. 300 free credits for all LovHack participants.",
      offer: "300 free credits",
      website: "https://medo.ai",
      size: "small",
      color: "from-blue-500/20 to-blue-500/5",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sponsors | Powered by the Best | LovHack</title>
        <meta name="description" content="LovHack is powered by amazing tools. See our sponsors and exclusive perks." />
        <link rel="canonical" href="https://lovhack.dev/sponsors" />
        <meta property="og:title" content="Sponsors | Powered by the Best | LovHack" />
        <meta property="og:description" content="LovHack is powered by amazing tools. See our sponsors and exclusive perks." />
        <meta property="og:url" content="https://lovhack.dev/sponsors" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/0Zdn8PJ5cxRgu3hYnqh6K0Z3tOm1/social-images/social-1767829485654-Screenshot 2026-01-07 174428.png" />
        <meta name="twitter:title" content="Sponsors | Powered by the Best | LovHack" />
        <meta name="twitter:description" content="LovHack is powered by amazing tools. See our sponsors and exclusive perks." />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/0Zdn8PJ5cxRgu3hYnqh6K0Z3tOm1/social-images/social-1767829485654-Screenshot 2026-01-07 174428.png" />
      </Helmet>

      <AnimatedBackground />
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="px-4 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Powered by <span className="text-primary">Giants</span>
            </h1>
            <p className="text-lg text-foreground/60 max-w-xl mx-auto">
              We partner with the best tools in the industry to give you superpowers.
            </p>
          </motion.div>
        </section>

        {/* BENTO GRID - Adjusted for bigger logos (3 cols max instead of 4) */}
        <section className="px-4 max-w-6xl mx-auto mb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* SPONSOR CARDS */}
            {sponsors.map((sponsor, index) => (
              <BentoCard key={index} sponsor={sponsor} index={index} />
            ))}

            {/* CTA CARD */}
            <div className="sm:col-span-2 lg:col-span-1 row-span-1 rounded-3xl bg-primary/90 relative overflow-hidden group flex flex-col items-center justify-center text-center p-8 transition-transform hover:-translate-y-1 duration-300">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="relative z-10">
                <Handshake className="w-12 h-12 text-white/90 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Partner with Us</h3>
                <Button asChild variant="secondary" className="rounded-full shadow-lg mt-4">
                  <a href="https://t.co/qMNpoZoiQZ" target="_blank" rel="noreferrer">
                    Become a Sponsor
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <DiscordCTASection />
      </main>

      <Footer />
    </>
  );
};

const BentoCard = ({ sponsor, index }: { sponsor: any, index: number }) => {
  // Determine spans based on size - simpler logic for 3 cols
  const colSpan = sponsor.size === "large" ? "lg:col-span-2 sm:col-span-2" : "col-span-1";

  // Pink gradients fallback
  const bgGradient = sponsor.color || "from-pink-500/5 to-transparent";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`${colSpan} group relative rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-br ${bgGradient} backdrop-blur-xl p-8 flex flex-col justify-between hover:border-primary/40 transition-colors duration-500`}
    >
      {/* Hover Glow - Pinkier */}
      <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

      <div className="flex items-start justify-between mb-4">
        {/* BIGGER LOGO CONTAINER */}
        <div className="w-20 h-20 bg-white/90 rounded-2xl p-4 flex items-center justify-center shadow-sm">
          <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain" />
        </div>

        {sponsor.offer && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-600 text-xs font-bold border border-pink-500/20">
            <Gift className="w-3.5 h-3.5" /> {sponsor.offer}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-3xl font-bold text-foreground mb-2">{sponsor.name}</h3>
        <p className="text-base text-foreground/70 mb-6 line-clamp-2">
          {sponsor.description}
        </p>

        <a
          href={sponsor.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          View Website <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default Sponsors;
