import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, FolderOpen, Trophy, Zap } from "lucide-react";

const stats = [
  { key: "projects", label: "Projects Built", icon: FolderOpen },
  { key: "builders", label: "Builders", icon: Users },
  { key: "hackathons", label: "Hackathons", icon: Trophy },
  { key: "winners", label: "Winners", icon: Zap },
];

const useCountUp = (target: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, start, duration]);
  return count;
};

const StatsSection = () => {
  const [data, setData] = useState({ projects: 0, builders: 0, hackathons: 0, winners: 0 });
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const [p, b, h, w] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("hackathons").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }).eq("status", "winner"),
      ]);
      setData({
        projects: p.count || 0,
        builders: b.count || 0,
        hackathons: h.count || 0,
        winners: w.count || 0,
      });
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const projectCount = useCountUp(data.projects, 1500, visible);
  const builderCount = useCountUp(data.builders, 1500, visible);
  const hackathonCount = useCountUp(data.hackathons, 1200, visible);
  const winnerCount = useCountUp(data.winners, 1200, visible);

  const counts = { projects: projectCount, builders: builderCount, hackathons: hackathonCount, winners: winnerCount };

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                {counts[stat.key as keyof typeof counts]}+
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
