import { ArrowRight, Sparkles, Users, Globe, Rocket, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NewHeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  const stats = [
    { icon: Globe, label: "20+ Countries" },
    { icon: Rocket, label: "40+ Projects Shipped" },
    { icon: Zap, label: "100+ Builders" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-12 sm:pt-24 sm:pb-16">
      <motion.div
        className="w-full max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Beginner Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-glass mb-8 sm:mb-10"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <span className="text-sm sm:text-base font-medium text-primary">
            First hackathon? You're in the right place.
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-6 sm:mb-8 leading-[1.1]"
        >
          Build Something Real.
          <br />
          <span className="text-primary">No Experience Required.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto mb-10 sm:mb-12 px-2"
        >
          LovHack is an online hackathon where developers, designers, and complete beginners
          ship real projects together in 48 hours. Join our welcoming community of 500+ builders.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-5 mb-16 sm:mb-20"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 py-6 sm:px-10 sm:py-7 text-lg sm:text-xl shadow-xl shadow-primary/25 transition-all duration-300"
            >
              <a
                href="https://t.co/qMNpoZoiQZ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3"
              >
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                Join Discord for Early Access
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-2xl px-8 py-6 sm:px-10 sm:py-7 text-lg sm:text-xl bg-white/50 backdrop-blur-xl border-white/40 hover:bg-white/80 shadow-glass"
            >
              <Link to="/season-1" className="flex items-center justify-center gap-3">
                See Season 1 Recap
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-glass flex items-center justify-center">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <span className="text-sm sm:text-base font-medium text-foreground/80">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NewHeroSection;
