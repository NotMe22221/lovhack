import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Eye, Heart, ArrowLeft, Trophy, FolderOpen } from "lucide-react";

const PublicProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      const [profileRes, projectsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", userId).single(),
        supabase
          .from("projects")
          .select("*, tracks(name), hackathons(name, season)")
          .eq("user_id", userId)
          .in("status", ["approved", "winner"])
          .order("created_at", { ascending: false }),
      ]);

      setProfile(profileRes.data);
      setProjects(projectsRes.data || []);

      // Fetch certificates by email if profile has one
      if (profileRes.data?.email) {
        const { data: certs } = await supabase
          .from("certificates")
          .select("*")
          .eq("recipient_email", profileRes.data.email);
        setCertificates(certs || []);
      }

      setLoading(false);
    };
    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 text-center">
          <h1 className="text-2xl font-bold text-foreground">User not found</h1>
          <Link to="/projects" className="text-primary mt-4 inline-block">← Back to projects</Link>
        </div>
      </div>
    );
  }

  const hackathonsParticipated = [...new Set(projects.map((p) => p.hackathons?.name).filter(Boolean))];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{profile.name || "User"} | LovHack</title>
        <meta name="description" content={`${profile.name}'s profile on LovHack — view their projects and achievements.`} />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>

        {/* Profile Header */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary shrink-0 overflow-hidden">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                profile.name?.[0]?.toUpperCase() || "?"
              )}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{profile.name}</h1>
              {profile.bio && <p className="text-muted-foreground mt-2">{profile.bio}</p>}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                {profile.github && (
                  <Button variant="outline" size="sm" asChild className="rounded-xl">
                    <a href={profile.github.startsWith("http") ? profile.github : `https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" /> GitHub
                    </a>
                  </Button>
                )}
                {profile.linkedin && (
                  <Button variant="outline" size="sm" asChild className="rounded-xl">
                    <a href={profile.linkedin.startsWith("http") ? profile.linkedin : `https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-muted/50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{projects.length}</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{hackathonsParticipated.length}</p>
              <p className="text-xs text-muted-foreground">Hackathons</p>
            </div>
            <div className="bg-muted/50 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{projects.filter((p) => p.status === "winner").length}</p>
              <p className="text-xs text-muted-foreground">Wins</p>
            </div>
          </div>
        </div>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Projects</h2>
          {projects.length === 0 ? (
            <div className="text-center py-12 bg-card/80 border border-border/50 rounded-2xl">
              <FolderOpen className="w-10 h-10 mx-auto text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground">No projects yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="group bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300"
                >
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {project.thumbnail_url ? (
                      <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <FolderOpen className="w-12 h-12 opacity-30" />
                      </div>
                    )}
                    {project.status === "winner" && (
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">🏆 Winner</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.tagline}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                      {project.tracks?.name && <Badge variant="secondary" className="text-xs">{project.tracks.name}</Badge>}
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {project.views}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {project.likes}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Certificates */}
        {certificates.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Certificates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-card/80 border border-border/50 rounded-2xl p-4 flex items-center gap-4">
                  <Trophy className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{cert.hackathon_name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{cert.certificate_type?.replace("_", " ")}</p>
                    {cert.issued_at && <p className="text-xs text-muted-foreground">{new Date(cert.issued_at).toLocaleDateString()}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PublicProfile;
