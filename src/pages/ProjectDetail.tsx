import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Heart, Eye, Play } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      // Increment views
      await supabase.rpc("increment_views" as any, { p_project_id: id }).catch(() => {});
      
      const { data } = await supabase
        .from("projects")
        .select("*, tracks(name), hackathons(name, season)")
        .eq("id", id)
        .single();
      setProject(data);
      setLoading(false);
    };
    fetchProject();
  }, [id]);

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

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 text-center">
          <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
          <Link to="/projects" className="text-primary mt-4 inline-block">← Back to projects</Link>
        </div>
      </div>
    );
  }

  const techStack = Array.isArray(project.tech_stack) ? project.tech_stack : [];
  const screenshots = Array.isArray(project.screenshots) ? project.screenshots : [];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{project.title} | LovHack</title>
        <meta name="description" content={project.tagline || project.description?.slice(0, 160)} />
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
        <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>

        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {project.status === "winner" && (
              <Badge className="bg-primary text-primary-foreground">🏆 Winner</Badge>
            )}
            {project.tracks?.name && (
              <Badge variant="secondary">{project.tracks.name}</Badge>
            )}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-3 h-3" /> {project.views} views
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Heart className="w-3 h-3" /> {project.likes} likes
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{project.title}</h1>
          {project.tagline && (
            <p className="text-lg text-muted-foreground mb-6">{project.tagline}</p>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.live_demo_link && (
              <Button asChild className="rounded-xl">
                <a href={project.live_demo_link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                </a>
              </Button>
            )}
            {project.github_link && (
              <Button variant="outline" asChild className="rounded-xl">
                <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" /> GitHub
                </a>
              </Button>
            )}
            {project.demo_video_link && (
              <Button variant="outline" asChild className="rounded-xl">
                <a href={project.demo_video_link} target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2" /> Demo Video
                </a>
              </Button>
            )}
          </div>

          {/* Description */}
          {project.description && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
            </section>
          )}

          {/* Problem & Solution */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {project.problem && (
              <section className="bg-muted/50 rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-2">Problem</h3>
                <p className="text-sm text-muted-foreground">{project.problem}</p>
              </section>
            )}
            {project.solution && (
              <section className="bg-muted/50 rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-2">Solution</h3>
                <p className="text-sm text-muted-foreground">{project.solution}</p>
              </section>
            )}
          </div>

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech: string, i: number) => (
                  <Badge key={i} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </section>
          )}

          {/* Screenshots */}
          {screenshots.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Screenshots</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {screenshots.map((url: string, i: number) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Screenshot ${i + 1}`}
                    className="rounded-xl border border-border/50 w-full"
                    loading="lazy"
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
