import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, FolderOpen, Key, FileText, Upload, ExternalLink, Trash2, Users, MessageSquare, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "My Projects", icon: FolderOpen },
  { id: "contributions", label: "Contributions", icon: Users },
  { id: "credits", label: "API Credits", icon: Key },
  { id: "certificates", label: "Certificates", icon: FileText },
  { id: "messages", label: "Messages", icon: MessageSquare },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  // Profile state
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", bio: "", github: "", linkedin: "" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Projects state
  const [myProjects, setMyProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Credits state
  const [credits, setCredits] = useState<any[]>([]);
  const [creditsLoading, setCreditsLoading] = useState(true);

  // Certificates state
  const [certificates, setCertificates] = useState<any[]>([]);
  const [certsLoading, setCertsLoading] = useState(true);

  // Contributions state
  const [contributions, setContributions] = useState<any[]>([]);
  const [contribLoading, setContribLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    // Load profile
    supabase.from("profiles").select("*").eq("user_id", user.id).single().then(({ data }) => {
      setProfile(data);
      if (data) {
        setProfileForm({ name: data.name || "", bio: data.bio || "", github: data.github || "", linkedin: data.linkedin || "" });
        setAvatarPreview(data.avatar_url);
      }
      setProfileLoading(false);
    });
    // Load projects
    supabase.from("projects").select("*, tracks(name)").eq("user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => {
      setMyProjects(data || []);
      setProjectsLoading(false);
    });
    // Load credits
    supabase.from("sponsor_credits").select("*").then(({ data }) => {
      setCredits(data || []);
      setCreditsLoading(false);
    });
    // Load certificates by email
    supabase.from("certificates" as any).select("*").eq("recipient_email", user.email).then(({ data }: any) => {
      setCertificates(data || []);
      setCertsLoading(false);
    });
    // Load contributions (teams the user belongs to)
    supabase.from("team_members").select("*, teams(name, id)").eq("user_id", user.id).then(async ({ data }) => {
      if (data && data.length > 0) {
        const teamIds = data.map((tm: any) => tm.team_id);
        const { data: projects } = await supabase.from("projects").select("id, title, status, thumbnail_url, team_id").in("team_id", teamIds);
        const enriched = data.map((tm: any) => ({
          ...tm,
          projects: (projects || []).filter((p: any) => p.team_id === tm.team_id),
        }));
        setContributions(enriched);
      }
      setContribLoading(false);
    });
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      let avatarUrl = profile?.avatar_url || null;
      if (avatarFile) {
        const path = `${user.id}/avatar-${Date.now()}-${avatarFile.name}`;
        const { error: upErr } = await supabase.storage.from("project-assets").upload(path, avatarFile, { upsert: true });
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from("project-assets").getPublicUrl(path);
        avatarUrl = urlData.publicUrl;
      }
      const { error } = await supabase.from("profiles").update({
        name: profileForm.name.trim(),
        bio: profileForm.bio.trim(),
        github: profileForm.github.trim(),
        linkedin: profileForm.linkedin.trim(),
        avatar_url: avatarUrl,
      }).eq("user_id", user.id);
      if (error) throw error;
      toast({ title: "Profile updated!" });
      setAvatarFile(null);
    } catch (err: any) {
      toast({ title: "Failed to update", description: err.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", projectId);
    if (!error) {
      setMyProjects((prev) => prev.filter((p) => p.id !== projectId));
      toast({ title: "Project deleted" });
    }
  };

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-700",
    approved: "bg-green-500/10 text-green-700",
    rejected: "bg-destructive/10 text-destructive",
    winner: "bg-primary/10 text-primary",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 shrink-0">
            <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile</h2>
                {profileLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                ) : (
                  <div className="space-y-5 max-w-md">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted overflow-hidden border border-border/50">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xl font-bold">
                            {profileForm.name?.[0]?.toUpperCase() || "?"}
                          </div>
                        )}
                      </div>
                      <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                        <Upload className="w-4 h-4" /> Change avatar
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) { setAvatarFile(f); setAvatarPreview(URL.createObjectURL(f)); }
                        }} />
                      </label>
                    </div>
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input value={profileForm.name} onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))} className="rounded-xl" maxLength={100} />
                    </div>
                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <Textarea value={profileForm.bio} onChange={(e) => setProfileForm((f) => ({ ...f, bio: e.target.value }))} className="rounded-xl" rows={3} maxLength={500} />
                    </div>
                    <div className="space-y-2">
                      <Label>GitHub</Label>
                      <Input value={profileForm.github} onChange={(e) => setProfileForm((f) => ({ ...f, github: e.target.value }))} placeholder="https://github.com/..." className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label>LinkedIn</Label>
                      <Input value={profileForm.linkedin} onChange={(e) => setProfileForm((f) => ({ ...f, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/..." className="rounded-xl" />
                    </div>
                    <p className="text-xs text-muted-foreground">Email: {user?.email}</p>
                    <Button onClick={handleSaveProfile} disabled={saving} className="rounded-xl">
                      {saving ? "Saving..." : "Save Profile"}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === "projects" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">My Projects</h2>
                  <Button asChild className="rounded-xl" size="sm">
                    <Link to="/submit">Submit New</Link>
                  </Button>
                </div>
                {projectsLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                ) : myProjects.length === 0 ? (
                  <p className="text-muted-foreground">You haven't submitted any projects yet.</p>
                ) : (
                  <div className="space-y-3">
                    {myProjects.map((p) => (
                      <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-muted/30">
                        <div className="w-16 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                          {p.thumbnail_url ? (
                            <img src={p.thumbnail_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link to={`/projects/${p.id}`} className="font-medium text-foreground hover:text-primary text-sm truncate block">{p.title}</Link>
                          <p className="text-xs text-muted-foreground truncate">{p.tagline}</p>
                        </div>
                        <Badge className={`text-xs ${statusColor[p.status] || ""}`}>{p.status}</Badge>
                        <button onClick={() => handleDeleteProject(p.id)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CREDITS TAB */}
            {activeTab === "credits" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">API Credits</h2>
                {creditsLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                ) : credits.length === 0 ? (
                  <p className="text-muted-foreground">No sponsor credits available right now.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {credits.map((c) => (
                      <div key={c.id} className="rounded-xl border border-border/50 p-4 bg-muted/30">
                        {c.logo_url && <img src={c.logo_url} alt={c.sponsor_name} className="h-8 mb-2 object-contain" />}
                        <h3 className="font-semibold text-foreground">{c.sponsor_name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
                        {c.claim_code && (
                          <code className="block mt-2 bg-background px-2 py-1 rounded text-xs font-mono text-primary">{c.claim_code}</code>
                        )}
                        {c.instructions && <p className="text-xs text-muted-foreground mt-2">{c.instructions}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CERTIFICATES TAB */}
            {activeTab === "certificates" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Certificates</h2>
                {certsLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                ) : certificates.length === 0 ? (
                  <p className="text-muted-foreground">Your certificates will appear here after a hackathon ends.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {certificates.map((c: any) => (
                      <div key={c.id} className="rounded-xl border border-border/50 p-4 bg-muted/30">
                        <h3 className="font-semibold text-foreground">{c.hackathon_name}</h3>
                        <p className="text-sm text-muted-foreground capitalize mt-1">{c.certificate_type?.replace("_", " ")}</p>
                        <div className="flex gap-2 mt-3">
                          {c.pdf_url && (
                            <Button size="sm" variant="outline" asChild className="rounded-lg text-xs">
                              <a href={c.pdf_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" /> PDF
                              </a>
                            </Button>
                          )}
                          {c.image_url && (
                            <Button size="sm" variant="outline" asChild className="rounded-lg text-xs">
                              <a href={c.image_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" /> Image
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
