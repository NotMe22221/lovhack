import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import GlassCard from "@/components/GlassCard";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import { Calendar, Users, Trophy, Zap, ArrowRight, Clock, Target, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hackathons = () => {
  const upcomingEvents = [
    {
      name: "Mini-Hack",
      status: "Coming Soon",
      statusColor: "bg-green-100 text-green-700",
      description: "A smaller, focused hackathon perfect for your first build. Lower pressure, same great community.",
      date: "TBA - Join Discord for Announcements",
      features: [
        "Beginner-friendly format",
        "Team formation support",
        "Mentors available",
        "Great prizes",
      ],
    },
    {
      name: "Season 2",
      status: "2026",
      statusColor: "bg-primary/20 text-primary",
      description: "Our largest event yet. Bigger prizes, more sponsors, global participation. Stay tuned for details.",
      date: "Coming Later in 2026",
      features: [
        "Larger prize pool",
        "More sponsor tools",
        "Global competition",
        "Multiple categories",
      ],
    },
  ];

  const pastEvents = [
    {
      name: "Season 1",
      date: "January 3-5, 2026",
      stats: {
        builders: "100+",
        projects: "40+",
        countries: "20+",
        prizes: "$5K+",
      },
      link: "/season-1",
    },
  ];

  const judgingCriteria = [
    {
      icon: Star,
      title: "Creativity",
      description: "How original and innovative is your idea?",
    },
    {
      icon: Target,
      title: "Execution",
      description: "How well did you implement your idea?",
    },
    {
      icon: Users,
      title: "Impact",
      description: "How useful or meaningful is your project?",
    },
    {
      icon: Zap,
      title: "Presentation",
      description: "How well do you explain and demo your project?",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Hackathons | LovHack Events & Competitions</title>
        <meta
          name="description"
          content="Discover upcoming and past LovHack hackathons. Join Mini-Hack for beginners or compete in Season 2 for bigger prizes. Find your next building challenge."
        />
        <link rel="canonical" href="https://lovhack.dev/hackathons" />
      </Helmet>

      <AnimatedBackground />
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              LovHack <span className="text-primary">Hackathons</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              From small practice runs to global competitions — find the right 
              hackathon for your experience level.
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Upcoming <span className="text-primary">Events</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <GlassCard key={index} className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-foreground">{event.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${event.statusColor}`}>
                      {event.status}
                    </span>
                  </div>
                  
                  <p className="text-foreground/70 mb-4">{event.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-foreground/60 mb-6">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {event.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    asChild
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl"
                  >
                    <a
                      href="https://t.co/qMNpoZoiQZ"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Notified on Discord
                    </a>
                  </Button>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Past <span className="text-primary">Events</span>
            </h2>

            {pastEvents.map((event, index) => (
              <GlassCard key={index} className="p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
                      <span className="text-sm font-medium text-primary">✅ Completed</span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{event.name}</h3>
                    <div className="flex items-center gap-2 text-foreground/60">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{event.stats.builders}</div>
                      <div className="text-xs text-foreground/60">Builders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{event.stats.projects}</div>
                      <div className="text-xs text-foreground/60">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{event.stats.countries}</div>
                      <div className="text-xs text-foreground/60">Countries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{event.stats.prizes}</div>
                      <div className="text-xs text-foreground/60">Prizes</div>
                    </div>
                  </div>
                  
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white/60 border-white/50 shrink-0"
                  >
                    <Link to={event.link} className="flex items-center gap-2">
                      View Recap
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* What to Expect */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              What to <span className="text-primary">Expect</span>
            </h2>
            <p className="text-lg text-foreground/70 text-center max-w-2xl mx-auto mb-12">
              Every LovHack hackathon follows a similar structure, designed to be 
              accessible to beginners while challenging for experienced builders.
            </p>

            {/* Timeline */}
            <GlassCard className="p-8 mb-12">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Typical 48-Hour Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 text-sm font-medium text-primary">Hour 0</div>
                  <div>
                    <div className="font-medium text-foreground">Kickoff</div>
                    <div className="text-sm text-foreground/60">Theme announced, teams finalize, building begins</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 text-sm font-medium text-primary">Hour 1-40</div>
                  <div>
                    <div className="font-medium text-foreground">Building Phase</div>
                    <div className="text-sm text-foreground/60">Code, design, iterate, get help in Discord</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 text-sm font-medium text-primary">Hour 40-48</div>
                  <div>
                    <div className="font-medium text-foreground">Polish & Submit</div>
                    <div className="text-sm text-foreground/60">Record demo video, write description, submit</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 text-sm font-medium text-primary">Post-Event</div>
                  <div>
                    <div className="font-medium text-foreground">Judging & Winners</div>
                    <div className="text-sm text-foreground/60">Judges review, winners announced, prizes distributed</div>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Judging Criteria */}
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">
              Judging Criteria
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              {judgingCriteria.map((criteria, index) => (
                <GlassCard key={index} className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <criteria.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{criteria.title}</h4>
                  <p className="text-sm text-foreground/60">{criteria.description}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <DiscordCTASection />
      </main>

      <Footer />
    </>
  );
};

export default Hackathons;
