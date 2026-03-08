import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Medal, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const rankStyles: Record<number, { badge: string; icon: string; label: string }> = {
  1: { badge: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30", icon: "🥇", label: "1st Place" },
  2: { badge: "bg-gray-300/20 text-gray-500 border-gray-400/30", icon: "🥈", label: "2nd Place" },
  3: { badge: "bg-amber-700/20 text-amber-700 border-amber-700/30", icon: "🥉", label: "3rd Place" },
};

const Winners = () => {
  const [winners, setWinners] = useState<any[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"cards" | "table">("cards");

  useEffect(() => {
    const fetchWinners = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*, tracks(name), hackathons(name, season)")
        .eq("status", "winner")
        .order("created_at", { ascending: false });

      const winnerData = data || [];
      setWinners(winnerData);

      // Fetch scores for each winner
      const scoreMap: Record<string, number> = {};
      await Promise.all(
        winnerData.map(async (w) => {
          const { data: score } = await supabase.rpc("calculate_project_score", { p_project_id: w.id });
          if (score !== null) scoreMap[w.id] = Number(score);
        })
      );
      setScores(scoreMap);
      setLoading(false);
    };
    fetchWinners();
  }, []);

  // Group by hackathon season
  const grouped = winners.reduce<Record<string, any[]>>((acc, w) => {
    const key = w.hackathons ? `Season ${w.hackathons.season} — ${w.hackathons.name}` : "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(w);
    return acc;
  }, {});

  // Sort within each group by score descending
  Object.values(grouped).forEach((group) => {
    group.sort((a: any, b: any) => (scores[b.id] || 0) - (scores[a.id] || 0));
  });

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

        {/* View Toggle */}
        <div className="flex justify-end mb-6">
          <div className="inline-flex rounded-xl border border-border overflow-hidden">
            <button
              onClick={() => setView("cards")}
              className={`px-3 py-2 text-sm flex items-center gap-1.5 transition-colors ${view === "cards" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              <LayoutGrid className="w-4 h-4" /> Cards
            </button>
            <button
              onClick={() => setView("table")}
              className={`px-3 py-2 text-sm flex items-center gap-1.5 transition-colors ${view === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              <TableIcon className="w-4 h-4" /> Leaderboard
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border/50 overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-5 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : winners.length === 0 ? (
          <div className="text-center py-20">
            <Trophy className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No winners announced yet.</p>
            <p className="text-sm text-muted-foreground mt-2">Stay tuned for upcoming hackathons!</p>
          </div>
        ) : view === "cards" ? (
          <div className="space-y-12">
            {Object.entries(grouped).map(([season, projects]) => (
              <div key={season}>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Medal className="w-5 h-5 text-primary" />
                  {season}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project: any, index: number) => {
                    const rank = index + 1;
                    const style = rankStyles[rank];
                    return (
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
                          <div className="absolute top-3 right-3 flex gap-1.5">
                            {style && (
                              <Badge className={`${style.badge} border`}>{style.icon} {style.label}</Badge>
                            )}
                            <Badge className="bg-primary text-primary-foreground">🏆 Winner</Badge>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.tagline}</p>
                          <div className="flex items-center justify-between mt-3">
                            {project.tracks?.name && (
                              <Badge variant="secondary" className="text-xs">{project.tracks.name}</Badge>
                            )}
                            {scores[project.id] > 0 && (
                              <span className="text-xs font-medium text-primary">
                                Score: {scores[project.id].toFixed(1)}/30
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([season, projects]) => (
              <div key={season}>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Medal className="w-5 h-5 text-primary" />
                  {season}
                </h2>
                <div className="rounded-2xl border border-border/50 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Track</TableHead>
                        <TableHead className="text-right">Avg Score</TableHead>
                        <TableHead className="text-right">Likes</TableHead>
                        <TableHead className="text-right">Views</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project: any, index: number) => {
                        const rank = index + 1;
                        const style = rankStyles[rank];
                        return (
                          <TableRow key={project.id} className="hover:bg-muted/50">
                            <TableCell className="font-bold text-lg">
                              {style ? style.icon : rank}
                            </TableCell>
                            <TableCell>
                              <Link to={`/projects/${project.id}`} className="font-medium hover:text-primary transition-colors">
                                {project.title}
                              </Link>
                              <p className="text-xs text-muted-foreground line-clamp-1">{project.tagline}</p>
                            </TableCell>
                            <TableCell>
                              {project.tracks?.name && <Badge variant="secondary" className="text-xs">{project.tracks.name}</Badge>}
                            </TableCell>
                            <TableCell className="text-right font-semibold text-primary">
                              {scores[project.id] ? scores[project.id].toFixed(1) : "—"}
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">{project.likes}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{project.views}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floot Leaderboard Embed for Season 1 */}
        {!loading && winners.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Season 1 Community Leaderboard</h2>
            <div className="rounded-2xl border border-border/50 overflow-hidden">
              <iframe
                src="https://lovhack.floot.app/"
                className="w-full h-[600px] border-0"
                title="LovHack Season 1 Leaderboard"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Winners;
