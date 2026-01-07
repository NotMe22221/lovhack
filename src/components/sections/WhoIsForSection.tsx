import { Heart, Code, Lightbulb, Trophy, HelpCircle, Handshake } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const WhoIsForSection = () => {
  const beginnerPoints = [
    { icon: HelpCircle, text: "Never done a hackathon? Perfect." },
    { icon: Lightbulb, text: "Learn by building with real support" },
    { icon: Handshake, text: "Find teammates who can help" },
    { icon: Heart, text: "No judgment, just encouragement" },
  ];

  const experiencedPoints = [
    { icon: Code, text: "Ship fast with modern AI tools" },
    { icon: Handshake, text: "Network with other serious builders" },
    { icon: Heart, text: "Mentor newcomers while building" },
    { icon: Trophy, text: "Win prizes and recognition" },
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            LovHack is for <span className="text-primary">Everyone</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-xl mx-auto">
            Whether you're writing your first line of code or you've shipped dozens of products, 
            there's a place for you here.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* First-Time Builders */}
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🌱</span>
              <h3 className="text-2xl font-bold text-foreground">First-Time Builders</h3>
            </div>
            <ul className="space-y-4">
              {beginnerPoints.map((point, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <point.icon className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-foreground/80">{point.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-foreground/60 italic">
              "I had never coded before LovHack. Now I have a live app!" — Past Participant
            </p>
          </GlassCard>

          {/* Experienced Developers */}
          <GlassCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">⚡</span>
              <h3 className="text-2xl font-bold text-foreground">Experienced Developers</h3>
            </div>
            <ul className="space-y-4">
              {experiencedPoints.map((point, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <point.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-foreground/80">{point.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-foreground/60 italic">
              "Best hackathon I've done. Great tools, great people." — Past Winner
            </p>
          </GlassCard>
        </div>

        {/* Unifying Message */}
        <div className="text-center mt-12">
          <p className="text-xl font-medium text-foreground">
            Everyone builds. Everyone learns. <span className="text-primary">Everyone ships.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoIsForSection;
