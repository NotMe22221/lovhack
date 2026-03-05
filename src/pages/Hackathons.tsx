import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/sections/Footer";
import DiscordCTASection from "@/components/sections/DiscordCTASection";
import { Calendar, Users, Trophy, ArrowRight, MapPin, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hackathons = () => {
  const upcomingEvents = [
    {
      name: "LovHack Mini x Medo",
      status: "Free Event",
      statusColor: "text-blue-500",
      description: "A free 48-hour hackathon powered by Medo. 300 free credits for all participants.",
      date: "Feb 28 — Mar 1",
      type: "Beginner Friendly",
      color: "from-blue-500/20 to-blue-500/5",
      link: "/medo-hack",
    },
    {
      name: "Mini-Hack",
      status: "Coming Soon",
      statusColor: "text-green-500",
      description: "A smaller, focused hackathon perfect for your first build. Lower pressure.",
      date: "Feb 14-15, 2025",
      type: "Beginner Friendly",
      color: "from-green-500/20 to-green-500/5",
      link: "/mini-hack",
    },
    {
      name: "Season 2",
      status: "Registrations Open",
      statusColor: "text-primary",
      description: "Our largest event yet. Bigger prizes, more sponsors, global participation.",
      date: "March 21, 2026",
      type: "Global Event",
      color: "from-primary/20 to-primary/5",
      link: "/season-2",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Hackathons | Get Your Ticket | LovHack</title>
        <meta name="description" content="Join our upcoming LovHack hackathons. From beginner sprints to global championships — get your ticket to build." />
        <link rel="canonical" href="https://lovhack.dev/hackathons" />
        <meta property="og:title" content="Hackathons | Get Your Ticket | LovHack" />
        <meta property="og:description" content="Join our upcoming LovHack hackathons. From beginner sprints to global championships — get your ticket to build." />
        <meta property="og:url" content="https://lovhack.dev/hackathons" />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/0Zdn8PJ5cxRgu3hYnqh6K0Z3tOm1/social-images/social-1767829485654-Screenshot 2026-01-07 174428.png" />
        <meta name="twitter:title" content="Hackathons | Get Your Ticket | LovHack" />
        <meta name="twitter:description" content="Join our upcoming LovHack hackathons. From beginner sprints to global championships — get your ticket to build." />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/0Zdn8PJ5cxRgu3hYnqh6K0Z3tOm1/social-images/social-1767829485654-Screenshot 2026-01-07 174428.png" />
      </Helmet>

      <AnimatedBackground />
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Header */}
        <section className="px-4 text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-4"
          >
            Choose Your <span className="text-primary">Challenge</span>
          </motion.h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            From beginner sprints to global championships.
          </p>
        </section>

        {/* Ticket Grid */}
        <section className="px-4 max-w-5xl mx-auto mb-32">
          <div className="grid md:grid-cols-1 gap-8">
            {upcomingEvents.map((event, index) => (
              <TicketCard key={index} event={event} index={index} />
            ))}
          </div>
        </section>

        {/* Past Events - Minimal List */}
        <section className="px-4 max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">Past Archive</h2>
          <div className="space-y-4">
            <div className="group relative overflow-hidden bg-white/40 backdrop-blur-md border border-white/50 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:bg-white/60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-gray-400">S1</div>
                <div>
                  <h3 className="text-xl font-bold">Season 1</h3>
                  <p className="text-sm text-foreground/60">January 2026 • 100+ Builders</p>
                </div>
              </div>
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/season-1">View Recap <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
          </div>
        </section>

        <DiscordCTASection />
      </main>

      <Footer />
    </>
  );
};

const TicketCard = ({ event, index }: { event: any, index: number }) => {
  const content = (
    <>
      {/* Background with Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${event.color} backdrop-blur-xl border border-white/30`} />

      {/* LEFT SIDE: Info */}
      <div className="flex-1 p-8 md:p-10 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm font-bold tracking-wider uppercase ${event.statusColor} bg-white/50 px-3 py-1 rounded-full backdrop-blur-md`}>
              {event.status}
            </span>
            <span className="text-sm text-foreground/50 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Online
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-foreground mb-2">{event.name}</h3>
          <p className="text-lg text-foreground/70 max-w-md">{event.description}</p>
        </div>

        <div className="flex items-center gap-6 mt-6 md:mt-0 text-foreground/60 font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 opacity-70" /> {event.date}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 opacity-70" /> {event.type}
          </div>
        </div>
      </div>

      {/* DASHED LINE SEPARATOR (Vertical for desktop, Horizontal for mobile) */}
      <div className="relative md:w-[2px] w-full h-[2px] md:h-full">
        <div className="absolute inset-0 bg-transparent flex md:flex-col items-center justify-center">
          {/* The dashed line */}
          <div className="w-full md:w-[2px] h-[2px] md:h-full border-t-2 md:border-l-2 border-dashed border-foreground/20"></div>
        </div>
        {/* Notches */}
        <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 w-8 h-8 bg-background rounded-full md:block hidden" />
        <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-8 h-8 bg-background rounded-full md:block hidden" />

        {/* Mobile Notches */}
        <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full md:hidden block" />
        <div className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full md:hidden block" />
      </div>

      {/* RIGHT SIDE: Action */}
      <div className="w-full md:w-64 bg-white/10 backdrop-blur-sm p-6 md:p-8 flex flex-col items-center justify-center relative z-10 border-l border-white/10">
        <QrCode className="w-24 h-24 text-foreground/20 mb-4 mix-blend-overlay" />

        {event.link ? (
          <div className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl font-bold py-2 px-4 text-center">
            Learn More
          </div>
        ) : (
          <Button
            asChild
            className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl font-bold"
          >
            <a href="https://t.co/qMNpoZoiQZ" target="_blank" rel="noreferrer">
              Get Ticket
            </a>
          </Button>
        )}
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {event.link ? (
        <Link
          to={event.link}
          className="relative flex flex-col md:flex-row w-full h-auto md:h-64 rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300 block"
        >
          {content}
        </Link>
      ) : (
        <div className="relative flex flex-col md:flex-row w-full h-auto md:h-64 rounded-3xl overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          {content}
        </div>
      )}
    </motion.div>
  );
};

export default Hackathons;
