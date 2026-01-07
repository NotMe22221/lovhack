import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import GlassCard from "@/components/GlassCard";
import FAQSection from "@/components/sections/FAQSection";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import { Heart, Rocket, Users, GraduationCap, Target, Lightbulb, Clock, Trophy, MessageSquare, Send } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Rocket,
      title: "Ship Over Slide Decks",
      description: "We believe in building real, working projects — not just talking about ideas.",
    },
    {
      icon: GraduationCap,
      title: "Learning by Doing",
      description: "The best way to learn is to build. Mistakes are part of the process.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "No one builds alone. We help each other succeed through mentorship and collaboration.",
    },
    {
      icon: Heart,
      title: "Beginner-Friendly",
      description: "Everyone starts somewhere. We create space for first-time builders to thrive.",
    },
  ];

  const howItWorks = [
    {
      icon: Users,
      step: "1",
      title: "Form or Join a Team",
      description: "Build solo or find teammates in our Discord. We have channels dedicated to team formation.",
    },
    {
      icon: Clock,
      step: "2",
      title: "48-Hour Building Period",
      description: "Once the hackathon starts, you have 48 hours to build your project from scratch.",
    },
    {
      icon: Send,
      step: "3",
      title: "Submit Your Project",
      description: "Record a demo video, write a description, and submit before the deadline.",
    },
    {
      icon: Trophy,
      step: "4",
      title: "Judging & Prizes",
      description: "Our judges review all submissions and announce winners. Multiple categories mean more chances to win!",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About LovHack | Learn About Our Hackathon Community</title>
        <meta
          name="description"
          content="Learn about LovHack - a beginner-friendly hackathon community focused on shipping real projects. Discover our mission, values, and how hackathons work."
        />
        <link rel="canonical" href="https://lovhack.dev/about" />
      </Helmet>

      <AnimatedBackground />
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About <span className="text-primary">LovHack</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              We're an online hackathon organization for developers, designers, AI builders, 
              indie makers, and students who want to build real projects fast.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <GlassCard className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                  <p className="text-lg text-foreground/70">
                    LovHack exists to help people <strong>ship their first project</strong> — and their next one, 
                    and the one after that. We believe everyone can be a builder, regardless of their 
                    background or experience level. We create welcoming spaces where beginners can 
                    learn alongside experienced developers, where ideas become real products in 48 hours, 
                    and where community support makes the impossible feel possible.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* What is a Hackathon */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                What is a <span className="text-primary">Hackathon</span>?
              </h2>
            </div>
            
            <GlassCard className="p-8">
              <div className="space-y-6 text-lg text-foreground/80">
                <p>
                  <strong>A hackathon</strong> is a building event where you create a working project in a short 
                  time — usually 24 to 48 hours. Think of it as a creative sprint where you turn an idea 
                  into something real.
                </p>
                <p>
                  The word "hack" doesn't mean breaking into systems — it means <strong>building quickly 
                  and creatively</strong>. Hackathons are about experimentation, learning, and shipping.
                </p>
                <p>
                  At LovHack, you can build anything: web apps, mobile apps, AI tools, games, 
                  browser extensions, productivity tools — whatever you can imagine and create in 48 hours.
                </p>
                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <Lightbulb className="w-6 h-6 text-primary flex-shrink-0" />
                  <p className="text-foreground/70 text-base">
                    <strong>Pro tip:</strong> You don't need to be a programmer! Many participants use 
                    AI tools, low-code platforms, or team up with developers.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Our Values */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="text-lg text-foreground/70">What guides everything we do at LovHack.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <GlassCard key={index} className="p-6 flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-foreground/70">{value.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* How Hackathons Work */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                How <span className="text-primary">Hackathons</span> Work
              </h2>
              <p className="text-lg text-foreground/70">From start to finish, here's what to expect.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((item, index) => (
                <GlassCard key={index} className="p-6 text-center relative">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <FAQSection />
        <DiscordCTASection variant="compact" />
      </main>

      <Footer />
    </>
  );
};

export default About;
