import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, Heart, Search, ChevronDown, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitProjectModal from "@/components/SubmitProjectModal";

const ITEMS_PER_PAGE = 12;

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "trending" | "winners">("newest");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchFilters = async () => {
      const [t, h] = await Promise.all([
        supabase.from("tracks").select("id, name"),
        supabase.from("hackathons").select("id, name, season"),
      ]);
      setTracks(t.data || []);
      setHackathons(h.data || []);
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      let query = supabase
        .from("projects")
        .select("*, tracks(name), hackathons(name, season)")
        .in("status", ["approved", "winner"]);

      if (selectedTrack) query = query.eq("track_id", selectedTrack);
      if (selectedSeason) query = query.eq("hackathon_id", selectedSeason);
      if (sortBy === "winners") query = query.eq("status", "winner");

      const orderCol = sortBy === "trending" ? "likes" : "created_at";
      query = query.order(orderCol, { ascending: false });

      const { data } = await query;
      setProjects(data || []);
      setVisibleCount(ITEMS_PER_PAGE);
      setLoading(false);
    };
    fetchProjects();
  }, [selectedTrack, selectedSeason, sortBy]);

  const filtered = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline?.toLowerCase().includes(search.toLowerCase())
  );

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Projects | LovHack</title>
        <meta name="description" content="Browse hackathon projects submitted by the LovHack community." />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore amazing projects built by the LovHack community
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-3xl mx-auto mb-10">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <select value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value)} className="rounded-xl border border-input bg-background px-3 py-2 text-sm min-w-[130px]">
            <option value="">All Tracks</option>
            {tracks.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)} className="rounded-xl border border-input bg-background px-3 py-2 text-sm min-w-[130px]">
            <option value="">All Seasons</option>
            {hackathons.map((h) => <option key={h.id} value={h.id}>S{h.season} – {h.name}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="rounded-xl border border-input bg-background px-3 py-2 text-sm min-w-[120px]">
            <option value="newest">Newest</option>
            <option value="trending">Trending</option>
            <option value="winners">Winners</option>
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border/50 overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-5 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-4 mt-4">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-muted-foreground text-lg">No projects found.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or be the first to submit!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="group bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {project.thumbnail_url ? (
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <FolderIcon className="w-12 h-12 opacity-30" />
                      </div>
                    )}
                    {project.status === "winner" && (
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">🏆 Winner</Badge>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.tagline}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                      {project.tracks?.name && (
                        <Badge variant="secondary" className="text-xs">{project.tracks.name}</Badge>
                      )}
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {project.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" /> {project.likes}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-10">
                <Button variant="outline" className="rounded-xl" onClick={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}>
                  <ChevronDown className="w-4 h-4 mr-2" /> Load More
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

const FolderIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

export default Projects;
