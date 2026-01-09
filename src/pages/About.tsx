import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import GlassCard from "@/components/GlassCard";
import FAQSection from "@/components/sections/FAQSection";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import { Heart, Rocket, Users, GraduationCap, Target, Clock, Trophy, Send, CheckCircle2 } from "lucide-react";
import aboutHeroImg from "@/assets/about-hero-abstract.png";
import { motion } from "framer-motion";

const About = () => {
  const values = [
    {
      icon: Rocket,
      title: "Ship Over Slides",
      description: "We believe in building real, working projects — not just talking about ideas.",
      size: "large", // spans 2 cols on mobile if needed
    },
    {
      icon: GraduationCap,
      title: "Learning by Doing",
      description: "The best way to learn is to build. Mistakes are part of the process.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "No one builds alone. We help each other succeed through mentorship.",
    },
    {
      icon: Heart,
      title: "Beginner-Friendly",
      description: "Everyone starts somewhere. We create space for first-time builders to thrive.",
      size: "large",
    },
  ];

  const timeline = [
    {
      step: "01",
      title: "Form or Join a Team",
      description: "Build solo or find teammates in our Discord. We have channels dedicated to team formation.",
    },
    {
      step: "02",
      title: "48-Hour Sprint",
      description: "Once the hackathon starts, you have 48 hours to build your project from scratch.",
    },
    {
      step: "03",
      title: "Ship It",
      description: "Record a demo video, write a description, and submit before the deadline.",
    },
    {
      step: "04",
      title: "Win & Celebrate",
      description: "Our judges review all submissions. Multiple categories mean more chances to win!",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About LovHack | We Build</title>
        <meta
          name="description"
          content="We are a community of builders. Learn about LovHack's mission to help you ship your first project."
        />
      </Helmet>

      <AnimatedBackground />
      <Navbar />

      <main className="pt-32 pb-20 overflow-hidden">
        {/* HERO SECTION - SPLIT LAYOUT */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20 lg:mb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Text */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 leading-[0.9] tracking-tighter">
                  We <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">
                    Build.
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-foreground/70 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                  We're an online community for developers, designers, and AI creators who want to <span className="text-foreground decoration-primary underline decoration-2 underline-offset-4">ship real projects</span> fast.
                </p>
              </motion.div>
            </div>

            {/* Right Image - Floating */}
            <div className="relative hidden lg:block">
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.img
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  src={aboutHeroImg}
                  alt="Abstract Building Blocks"
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </motion.div>

              {/* Decorative blobs behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full -z-10" />
            </div>
          </div>
        </section>

        {/* MISSION STATEMENT */}
        <section className="px-4 max-w-4xl mx-auto mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground/80">Our Mission</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground">
              "To help people ship their <span className="text-primary">first project</span>, and their next one, and the one after that."
            </p>
          </motion.div>
        </section>

        {/* MASONRY VALUES */}
        <section className="px-4 max-w-6xl mx-auto mb-24 lg:mb-32">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-6 pt-12">
              {values.filter((_, i) => i % 2 === 0).map((value, idx) => (
                <ValueCard key={idx} value={value} />
              ))}
            </div>
            {/* Column 2 - Offset */}
            <div className="flex flex-col gap-6">
              {values.filter((_, i) => i % 2 !== 0).map((value, idx) => (
                <ValueCard key={idx} value={value} />
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE PATH */}
        <section className="px-4 max-w-3xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-foreground mb-4">How it Works</h2>
            <p className="text-xl text-foreground/60">From zero to shipped in 48 hours.</p>
          </div>

          <div className="relative border-l-2 border-primary/20 pl-8 ml-4 md:ml-10 space-y-16">
            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} />
            ))}
          </div>
        </section>

        <FAQSection />
        <DiscordCTASection variant="compact" />
      </main>

      <Footer />
    </>
  );
};

// Sub-components for cleaner code
const ValueCard = ({ value }: { value: any }) => (
  <GlassCard className="p-8 hover:-translate-y-2 transition-transform duration-300">
    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
      <value.icon className="w-7 h-7 text-primary" />
    </div>
    <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
    <p className="text-foreground/70 text-lg leading-relaxed">{value.description}</p>
  </GlassCard>
);

const TimelineItem = ({ item }: { item: any }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="relative"
  >
    {/* Dot on line */}
    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-background border-4 border-primary" />

    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-baseline mb-2">
      <span className="text-5xl font-black text-primary/20">{item.step}</span>
      <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
    </div>
    <p className="text-lg text-foreground/70">{item.description}</p>
  </motion.div>
);

export default About;
