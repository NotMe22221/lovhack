import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import { ExternalLink, Gift, Sparkles, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import lovableLogo from "@/assets/lovable-logo.png";
import creaoLogo from "@/assets/creao-logo.png";
import hadoLogo from "@/assets/hado-logo-v3.png";
import flootLogo from "@/assets/floot-logo.png";
import qoderLogo from "@/assets/qoder-logo.png";
import dualiteLogo from "@/assets/dualite-logo.png";
import momentumLogo from "@/assets/momentum-logo.png";

const Sponsors = () => {
  const sponsors = [
    {
      name: "Lovable",
      logo: lovableLogo,
      description: "Build full-stack web apps with AI. Ship faster than ever before.",
      offer: "1 month free Pro",
      website: "https://lovable.dev",
      size: "large",
      color: "from-blue-500/20 to-indigo-500/5",
    },
    {
      name: "Momentum",
      logo: momentumLogo,
      description: "AI-powered development platform preventing burnout.",
      offer: "Extended trial",
      website: "https://momentum.sh",
      size: "medium",
      color: "from-purple-500/20 to-pink-500/5",
    },
    {
      name: "Creao",
      logo: creaoLogo,
      description: "Create beautiful designs & prototypes with AI.",
      offer: "Special access",
      website: "https://creao.ai",
      size: "small",
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
  ];

  return (
    <>
      <Helmet>
        <title>Sponsors | Powered by the Best</title>
        <meta name="description" content="LovHack is powered by amazing tools. See our sponsors and exclusive perks." />
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

        {/* BENTO GRID */}
        <section className="px-4 max-w-7xl mx-auto mb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
            {/* SPONSOR CARDS */}
            {sponsors.map((sponsor, index) => (
              <BentoCard key={index} sponsor={sponsor} index={index} />
            ))}

            {/* CTA CARD - Always fits in smoothly */}
            <div className="sm:col-span-2 lg:col-span-2 row-span-1 rounded-3xl bg-[#5865F2] relative overflow-hidden group flex flex-col items-center justify-center text-center p-8 transition-transform hover:-translate-y-1 duration-300">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="relative z-10">
                <Handshake className="w-12 h-12 text-white/90 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Partner with Us</h3>
                <p className="text-white/80 mb-6 max-w-md mx-auto">
                  Want to get your tool in front of hundreds of engaged builders?
                </p>
                <Button asChild variant="secondary" className="rounded-full shadow-lg">
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
  // Determine spans based on size
  const colSpan = sponsor.size === "large" ? "lg:col-span-2 sm:col-span-2" : sponsor.size === "medium" ? "lg:col-span-2" : "col-span-1";
  const rowSpan = "row-span-1";

  const bgGradient = sponsor.color || "from-white/10 to-transparent";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`${colSpan} ${rowSpan} group relative rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-br ${bgGradient} backdrop-blur-xl p-6 flex flex-col justify-between hover:border-primary/30 transition-colors duration-500`}
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

      <div className="flex items-start justify-between">
        <div className="w-12 h-12 bg-white/80 rounded-xl p-2 flex items-center justify-center shadow-sm">
          <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain" />
        </div>

        {sponsor.offer && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold border border-emerald-500/20">
            <Gift className="w-3 h-3" /> {sponsor.offer}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{sponsor.name}</h3>
        <p className="text-sm text-foreground/70 line-clamp-2 mb-4">
          {sponsor.description}
        </p>

        <a
          href={sponsor.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Details <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

export default Sponsors;
