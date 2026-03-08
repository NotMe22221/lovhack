import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ExternalLink, Github, Heart, Eye, MessageCircle, Send, Trash2 } from "lucide-react";
import VideoEmbed from "@/components/VideoEmbed";

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likePending, setLikePending] = useState(false);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [projectMedia, setProjectMedia] = useState<any[]>([]);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try { await (supabase.rpc as any)("increment_views", { p_project_id: id }); } catch {}

      const { data } = await supabase
        .from("projects")
        .select("*, tracks(name), hackathons(name, season)")
        .eq("id", id)
        .single();
      setProject(data);
      setLikeCount(data?.likes || 0);

      if (data && user) {
        const { data: likeData } = await supabase
          .from("project_likes" as any)
          .select("id")
          .eq("project_id", id)
          .eq("user_id", user.id)
          .maybeSingle();
        setLiked(!!likeData);
      }

      if (data?.team_id) {
        const { data: members } = await supabase
          .from("team_members")
          .select("role, user_id")
          .eq("team_id", data.team_id);
        if (members?.length) {
          const userIds = members.map((m) => m.user_id);
          const { data: profiles } = await supabase
            .from("profiles")
            .select("user_id, name, avatar_url")
            .in("user_id", userIds);
          setTeamMembers(
            members.map((m) => ({
              ...m,
              profile: profiles?.find((p) => p.user_id === m.user_id),
            }))
          );
        }
      }

      const { data: media } = await supabase.from("project_media" as any).select("*").eq("project_id", id).order("sort_order", { ascending: true });
      setProjectMedia(media || []);

      // Fetch comments
      await fetchComments();

      setLoading(false);
    };
    fetchProject();
  }, [id, user]);

  const fetchComments = async () => {
    if (!id) return;
    const { data } = await supabase
      .from("project_comments" as any)
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: true });
    
    if (data?.length) {
      const userIds = [...new Set(data.map((c: any) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, name, avatar_url")
        .in("user_id", userIds);
      setComments(
        data.map((c: any) => ({
          ...c,
          profile: profiles?.find((p) => p.user_id === c.user_id),
        }))
      );
    } else {
      setComments([]);
    }
  };

  const handleSubmitComment = async () => {
    if (!user || !newComment.trim() || submittingComment) return;
    setSubmittingComment(true);
    await (supabase.from("project_comments" as any) as any).insert({
      project_id: id,
      user_id: user.id,
      content: newComment.trim(),
    });
    setNewComment("");
    await fetchComments();
    setSubmittingComment(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    await (supabase.from("project_comments" as any) as any).delete().eq("id", commentId);
    await fetchComments();
  };

  const handleLike = async () => {
    if (!user || likePending) return;
    setLikePending(true);
    try {
      const { data: isLiked } = await (supabase.rpc as any)("toggle_like", { p_project_id: id });
      setLiked(isLiked);
      setLikeCount((c) => (isLiked ? c + 1 : Math.max(c - 1, 0)));
    } catch {}
    setLikePending(false);
  };

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
            {project.tracks?.name && <Badge variant="secondary">{project.tracks.name}</Badge>}
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-3 h-3" /> {project.views} views
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{project.title}</h1>
          {project.tagline && <p className="text-lg text-muted-foreground mb-6">{project.tagline}</p>}

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
            <Button
              variant={liked ? "default" : "outline"}
              className="rounded-xl ml-auto"
              onClick={handleLike}
              disabled={!user || likePending}
            >
              <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
              {likeCount}
            </Button>
          </div>

          {/* Demo Video */}
          {(project.demo_video_url || project.demo_video_link) && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">Demo Video</h2>
              {project.demo_video_url && project.demo_video_url.match(/\.(mp4|webm)$/i) ? (
                <video src={project.demo_video_url} controls className="w-full rounded-2xl border border-border/50" />
              ) : (
                <VideoEmbed url={project.demo_video_url || project.demo_video_link} />
              )}
            </section>
          )}

          {/* Tech Video */}
          {project.tech_video_url && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">Tech Video</h2>
              {project.tech_video_url.match(/\.(mp4|webm)$/i) ? (
                <video src={project.tech_video_url} controls className="w-full rounded-2xl border border-border/50" />
              ) : (
                <VideoEmbed url={project.tech_video_url} />
              )}
            </section>
          )}

          {project.description && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">Description</h2>
              <p className="text-muted-foreground whitespace-pre-line">{project.description}</p>
            </section>
          )}

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

          {techStack.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech: string, i: number) => (
                  <Link key={i} to={`/projects?tech=${encodeURIComponent(tech)}`}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20 transition-colors">{tech}</Badge>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Team Members — clickable to profile */}
          {teamMembers.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">Team</h2>
              <div className="flex flex-wrap gap-3">
                {teamMembers.map((m, i) => (
                  <Link
                    key={i}
                    to={`/profile/${m.user_id}`}
                    className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2 hover:bg-muted transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary overflow-hidden">
                      {m.profile?.avatar_url ? (
                        <img src={m.profile.avatar_url} alt={m.profile.name} className="w-full h-full object-cover" />
                      ) : (
                        m.profile?.name?.[0]?.toUpperCase() || "?"
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.profile?.name || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground capitalize">{m.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {screenshots.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">Screenshots</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {screenshots.map((url: string, i: number) => (
                  <img key={i} src={url} alt={`Screenshot ${i + 1}`} className="rounded-xl border border-border/50 w-full cursor-pointer hover:opacity-90 transition-opacity" loading="lazy" onClick={() => setFullscreenImage(url)} />
                ))}
              </div>
            </section>
          )}

          {/* Media Gallery */}
          {projectMedia.filter((m: any) => m.media_role === "gallery").length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-3">Media Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectMedia.filter((m: any) => m.media_role === "gallery").map((m: any) => (
                  <div key={m.id} className="rounded-xl border border-border/50 overflow-hidden bg-muted/30">
                    {m.file_type === "image" ? (
                      <img src={m.file_url} alt={m.file_name} className="w-full aspect-video object-cover cursor-pointer hover:opacity-90 transition-opacity" onClick={() => setFullscreenImage(m.file_url)} />
                    ) : m.file_type === "video" ? (
                      <video src={m.file_url} controls className="w-full aspect-video" />
                    ) : (
                      <a href={m.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
                        <Badge variant="secondary" className="text-xs uppercase">{m.file_type}</Badge>
                        <span className="text-sm text-foreground truncate">{m.file_name}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Comments Section */}
          <section className="border-t border-border/50 pt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Comments ({comments.length})
            </h2>

            {/* Comment Input */}
            {user ? (
              <div className="flex gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary shrink-0">
                  {user.email?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={2}
                    className="rounded-xl mb-2"
                  />
                  <Button
                    size="sm"
                    className="rounded-xl"
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() || submittingComment}
                  >
                    <Send className="w-4 h-4 mr-2" /> Post
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mb-6">
                <Link to="/login" className="text-primary hover:underline">Sign in</Link> to leave a comment.
              </p>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Link to={`/profile/${comment.user_id}`} className="shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary overflow-hidden">
                      {comment.profile?.avatar_url ? (
                        <img src={comment.profile.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        comment.profile?.name?.[0]?.toUpperCase() || "?"
                      )}
                    </div>
                  </Link>
                  <div className="flex-1 bg-muted/50 rounded-xl px-4 py-3">
                    <div className="flex items-center justify-between mb-1">
                      <Link to={`/profile/${comment.user_id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                        {comment.profile?.name || "Unknown"}
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                        {user?.id === comment.user_id && (
                          <button onClick={() => handleDeleteComment(comment.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{comment.content}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first!</p>
              )}
            </div>
          </section>

          {/* Fullscreen image viewer */}
          {fullscreenImage && (
            <div className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setFullscreenImage(null)}>
              <img src={fullscreenImage} alt="Fullscreen" className="max-w-full max-h-full rounded-2xl" />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
