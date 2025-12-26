import GlassCard from "../GlassCard";
import { Rocket, GraduationCap, Package } from "lucide-react";

const details = [
  {
    icon: Rocket,
    title: "Build",
    description: "Create a complete web app in 48 hours. From idea to deployment.",
  },
  {
    icon: GraduationCap,
    title: "Learn",
    description: "Get help from mentors and connect with other builders throughout the event.",
  },
  {
    icon: Package,
    title: "Ship",
    description: "Leave with something real you can show, share, or scale into a product.",
  },
];

const DetailsSection = () => {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-foreground mb-16">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {details.map((item, index) => (
            <GlassCard 
              key={item.title}
              className="text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.1}s` } as React.CSSProperties}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/60 border border-primary/20 mb-6">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{item.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
