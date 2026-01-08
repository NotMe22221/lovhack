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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          <span className="text-xs sm:text-sm font-medium text-primary">
            First hackathon? You're in the right place.
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight"
        >
          Build Something Real.
          <br />
          <span className="text-primary">No Experience Required.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 sm:mb-10 px-2"
        >
          LovHack is an online hackathon where developers, designers, and complete beginners
          ship real projects together in 48 hours. Join our welcoming community of 500+ builders.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 mb-12 sm:mb-16"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-2xl px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 sm:hover:scale-105"
          >
            <a
              href="https://t.co/qMNpoZoiQZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Join Discord for Early Access
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto rounded-2xl px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg bg-white/60 backdrop-blur-sm border-white/50 hover:bg-white/80"
          >
            <Link to="/season-1" className="flex items-center justify-center gap-2">
              See Season 1 Recap
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-foreground/60"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 sm:gap-2.5"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <span className="text-xs sm:text-sm font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NewHeroSection;
