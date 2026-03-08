import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

const Winners = () => {
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinners = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*, tracks(name), hackathons(name, season)")
        .eq("status", "winner")
        .order("created_at", { ascending: false });
      setWinners(data || []);
      setLoading(false);
    };
    fetchWinners();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Winners | LovHack</title>
        <meta name="description" content="See the winning projects from LovHack hackathons." />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Hall of Fame
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Winners</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Celebrating the best projects from LovHack hackathons
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : winners.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No winners announced yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Stay tuned for upcoming hackathons!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {winners.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="aspect-video bg-muted relative">
                  {project.thumbnail_url ? (
                    <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Trophy className="w-12 h-12 text-primary/30" />
                    </div>
                  )}
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">🏆 Winner</Badge>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.tagline}</p>
                  {project.hackathons?.name && (
                    <p className="text-xs text-muted-foreground mt-3">{project.hackathons.name} — Season {project.hackathons.season}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Winners;
