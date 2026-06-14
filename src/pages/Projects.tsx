import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, Heart, Search, ChevronDown, Plus, MessageCircle, Star, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitProjectModal from "@/components/SubmitProjectModal";

const ITEMS_PER_PAGE = 12;

const Projects = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "trending" | "winners">("newest");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [commentCounts, setCommentCounts] = useState<Record<string, number>>({});
  const [teamAvatars, setTeamAvatars] = useState<Record<string, any[]>>({});
  const [allTechTags, setAllTechTags] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState(searchParams.get("tech") || "");

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
      const allProjects = data || [];
      setProjects(allProjects);
      setVisibleCount(ITEMS_PER_PAGE);

      // Extract all unique tech tags
      const tags = new Set<string>();
      allProjects.forEach((p) => {
        if (Array.isArray(p.tech_stack)) {
          p.tech_stack.forEach((t: string) => tags.add(t));
        }
      });
      setAllTechTags([...tags].sort());

      // Fetch comment counts
      if (allProjects.length > 0) {
        const projectIds = allProjects.map((p) => p.id);
        const { data: comments } = await supabase
          .from("project_comments" as any)
          .select("project_id")
          .in("project_id", projectIds);
        const counts: Record<string, number> = {};
        (comments || []).forEach((c: any) => {
          counts[c.project_id] = (counts[c.project_id] || 0) + 1;
        });
        setCommentCounts(counts);
      }

      // Fetch team avatars for projects that have teams
      const teamProjects = allProjects.filter((p) => p.team_id);
      if (teamProjects.length > 0) {
        const teamIds = [...new Set(teamProjects.map((p) => p.team_id))];
        const { data: members } = await supabase
          .from("team_members")
          .select("team_id, user_id")
          .in("team_id", teamIds);
        if (members?.length) {
          const userIds = [...new Set(members.map((m) => m.user_id))];
          const { data: profiles } = await supabase
            .from("profiles")
            .select("user_id, name, avatar_url")
            .in("user_id", userIds);
          const avatarMap: Record<string, any[]> = {};
          teamProjects.forEach((p) => {
            const teamMembers = members.filter((m) => m.team_id === p.team_id);
            avatarMap[p.id] = teamMembers
              .map((m) => profiles?.find((pr) => pr.user_id === m.user_id))
              .filter(Boolean)
              .slice(0, 3);
          });
          setTeamAvatars(avatarMap);
        }
      }

      setLoading(false);
    };
    fetchProjects();
  }, [selectedTrack, selectedSeason, sortBy]);

  // Filter by tech tag from URL params
  useEffect(() => {
    const tech = searchParams.get("tech");
    if (tech) setSelectedTech(tech);
  }, [searchParams]);

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline?.toLowerCase().includes(search.toLowerCase());
    const matchTech = !selectedTech || (Array.isArray(p.tech_stack) && p.tech_stack.includes(selectedTech));
    return matchSearch && matchTech;
  });

  const featuredProjects = filtered.filter((p) => p.featured);
  const regularProjects = filtered;
  const visible = regularProjects.slice(0, visibleCount);

  const clearTechFilter = () => {
    setSelectedTech("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Projects | LovHack</title>
        <meta name="description" content="Browse hackathon projects submitted by the LovHack community — explore AI tools, web apps, and creative builds from builders around the world." />
        <link rel="canonical" href="https://lovhack.dev/projects" />
        <meta property="og:title" content="Projects | LovHack" />
        <meta property="og:description" content="Explore amazing projects built by the LovHack community." />
        <meta property="og:url" content="https://lovhack.dev/projects" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "LovHack Projects",
          description: "Hackathon projects submitted by the LovHack community.",
          url: "https://lovhack.dev/projects",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: projects.length,
            itemListElement: projects.slice(0, 20).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://lovhack.dev/projects/${p.id}`,
              name: p.title,
            })),
          },
        })}</script>
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Explore amazing projects built by the LovHack community
          </p>
          {user && (
            <Button className="rounded-xl" onClick={() => setSubmitModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Submit Project
            </Button>
          )}
        </div>
        <SubmitProjectModal
          open={submitModalOpen}
          onOpenChange={setSubmitModalOpen}
          onSuccess={() => {
            const refetch = async () => {
              const { data } = await supabase.from("projects").select("*, tracks(name), hackathons(name, season)").in("status", ["approved", "winner"]).order("created_at", { ascending: false });
              setProjects(data || []);
            };
            refetch();
          }}
        />

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-4xl mx-auto mb-6">
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

        {/* Tech Stack Filter */}
        {(selectedTech || allTechTags.length > 0) && (
          <div className="max-w-4xl mx-auto mb-6">
            {selectedTech ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Built with:</span>
                <Badge variant="secondary" className="gap-1">
                  {selectedTech}
                  <button onClick={clearTechFilter}><X className="w-3 h-3" /></button>
                </Badge>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground py-1">Built with:</span>
                {allTechTags.slice(0, 15).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => { setSelectedTech(tag); setSearchParams({ tech: tag }); }}
                  >
                    {tag}
                  </Badge>
                ))}
                {allTechTags.length > 15 && (
                  <Badge variant="outline" className="text-muted-foreground">+{allTechTags.length - 15} more</Badge>
                )}
              </div>
            )}
          </div>
        )}

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
            {/* Featured / Staff Picks */}
            {featuredProjects.length > 0 && !selectedTech && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" /> Staff Picks
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProjects.slice(0, 3).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      commentCount={commentCounts[project.id] || 0}
                      teamAvatars={teamAvatars[project.id] || []}
                      featured
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  commentCount={commentCounts[project.id] || 0}
                  teamAvatars={teamAvatars[project.id] || []}
                />
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

const ProjectCard = ({
  project,
  commentCount,
  teamAvatars,
  featured,
}: {
  project: any;
  commentCount: number;
  teamAvatars: any[];
  featured?: boolean;
}) => (
  <Link
    to={`/projects/${project.id}`}
    className={`group bg-card/80 backdrop-blur-xl border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 ${featured ? "border-primary/30 ring-1 ring-primary/10" : "border-border/50"}`}
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
      {featured && (
        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border border-primary/30">
          <Star className="w-3 h-3 mr-1" /> Staff Pick
        </Badge>
      )}
    </div>
    <div className="p-5">
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.tagline}</p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {project.tracks?.name && (
            <Badge variant="secondary" className="text-xs">{project.tracks.name}</Badge>
          )}
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" /> {project.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" /> {project.likes}
          </span>
          {commentCount > 0 && (
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" /> {commentCount}
            </span>
          )}
        </div>
        {/* Team avatars */}
        {teamAvatars.length > 0 && (
          <div className="flex -space-x-2">
            {teamAvatars.map((member, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-card bg-primary/20 flex items-center justify-center text-[10px] font-medium text-primary overflow-hidden"
                title={member?.name}
              >
                {member?.avatar_url ? (
                  <img src={member.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  member?.name?.[0]?.toUpperCase() || "?"
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </Link>
);

const FolderIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

export default Projects;
