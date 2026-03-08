import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ShieldCheck, Plus, Search, Trash2, UserPlus, Megaphone, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  active: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  winner: "bg-purple-100 text-purple-800",
  open: "bg-yellow-100 text-yellow-800",
  in_progress: "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-muted text-muted-foreground",
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  // Hackathons
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [hackForm, setHackForm] = useState({ name: "", season: 1, status: "draft" as string, start_date: "", end_date: "" });
  const [editingHackId, setEditingHackId] = useState<string | null>(null);
  const [hackDialogOpen, setHackDialogOpen] = useState(false);

  // Tracks
  const [tracks, setTracks] = useState<any[]>([]);
  const [selectedHackForTracks, setSelectedHackForTracks] = useState<string>("");
  const [trackForm, setTrackForm] = useState({ name: "", description: "" });

  // Projects
  const [projects, setProjects] = useState<any[]>([]);
  const [projectSearch, setProjectSearch] = useState("");
  const [projectStatusFilter, setProjectStatusFilter] = useState("all");
  const [projectHackFilter, setProjectHackFilter] = useState("all");

  // Judges
  const [judges, setJudges] = useState<any[]>([]);
  const [judgeEmail, setJudgeEmail] = useState("");
  const [judgeHackathon, setJudgeHackathon] = useState("");

  // Support Tickets
  const [tickets, setTickets] = useState<any[]>([]);
  const [ticketResponse, setTicketResponse] = useState<Record<string, string>>({});

  // Users & Roles
  const [profiles, setProfiles] = useState<any[]>([]);
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const [roleEmail, setRoleEmail] = useState("");
  const [roleToAssign, setRoleToAssign] = useState("admin");

  // Announcements
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [annForm, setAnnForm] = useState({ title: "", message: "", published: false });
  const [annDialogOpen, setAnnDialogOpen] = useState(false);
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }).then(({ data }) => {
      setIsAdmin(data === true);
      if (data === true) loadAll();
    });
  }, [user]);

  const loadAll = async () => {
    const [h, p, t, j, tk, pr, ur, ann] = await Promise.all([
      supabase.from("hackathons").select("*").order("season", { ascending: false }),
      supabase.from("projects").select("*, hackathons(name), tracks(name)").order("created_at", { ascending: false }),
      supabase.from("support_tickets").select("*").order("created_at", { ascending: false }),
      supabase.from("judges").select("*, hackathons(name)").order("hackathon_id"),
      supabase.from("tracks").select("*, hackathons(name)").order("name"),
      supabase.from("profiles").select("*").order("name"),
      supabase.from("user_roles").select("*"),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
    ]);
    if (h.data) setHackathons(h.data);
    if (p.data) setProjects(p.data);
    if (t.data) setTickets(t.data);
    if (j.data) setJudges(j.data);
    if (tk.data) setTracks(tk.data);
    if (pr.data) setProfiles(pr.data);
    if (ur.data) setUserRoles(ur.data);
    if (ann.data) setAnnouncements(ann.data);
  };

  // ---- Hackathon CRUD ----
  const saveHackathon = async () => {
    const payload = {
      name: hackForm.name,
      season: hackForm.season,
      status: hackForm.status as any,
      start_date: hackForm.start_date || null,
      end_date: hackForm.end_date || null,
    };
    if (editingHackId) {
      await supabase.from("hackathons").update(payload).eq("id", editingHackId);
    } else {
      await supabase.from("hackathons").insert(payload);
    }
    setHackDialogOpen(false);
    setEditingHackId(null);
    setHackForm({ name: "", season: 1, status: "draft", start_date: "", end_date: "" });
    loadAll();
    toast({ title: editingHackId ? "Hackathon updated" : "Hackathon created" });
  };

  const deleteHackathon = async (id: string) => {
    await supabase.from("hackathons").delete().eq("id", id);
    loadAll();
    toast({ title: "Hackathon deleted" });
  };

  // ---- Track CRUD ----
  const addTrack = async () => {
    if (!selectedHackForTracks || !trackForm.name) return;
    await supabase.from("tracks").insert({ hackathon_id: selectedHackForTracks, name: trackForm.name, description: trackForm.description });
    setTrackForm({ name: "", description: "" });
    loadAll();
    toast({ title: "Track added" });
  };

  const deleteTrack = async (id: string) => {
    await supabase.from("tracks").delete().eq("id", id);
    loadAll();
  };

  // ---- Project management ----
  const updateProjectStatus = async (id: string, status: string) => {
    await supabase.from("projects").update({ status: status as any }).eq("id", id);
    loadAll();
    toast({ title: `Project marked as ${status}` });
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    await supabase.from("projects").update({ featured: !current } as any).eq("id", id);
    loadAll();
    toast({ title: current ? "Removed from Staff Picks" : "Added to Staff Picks" });
  };

  const filteredProjects = projects.filter((p) => {
    const matchSearch = !projectSearch || p.title.toLowerCase().includes(projectSearch.toLowerCase());
    const matchStatus = projectStatusFilter === "all" || p.status === projectStatusFilter;
    const matchHack = projectHackFilter === "all" || p.hackathon_id === projectHackFilter;
    return matchSearch && matchStatus && matchHack;
  });

  // ---- Judge management ----
  const addJudge = async () => {
    if (!judgeEmail || !judgeHackathon) return;
    const profile = profiles.find((p) => p.email === judgeEmail);
    if (!profile) { toast({ title: "User not found", variant: "destructive" }); return; }
    const { error } = await supabase.from("judges").insert({ user_id: profile.user_id, hackathon_id: judgeHackathon });
    if (error) { toast({ title: "Error adding judge", description: error.message, variant: "destructive" }); return; }
    // Also ensure they have judge role
    await supabase.from("user_roles").upsert({ user_id: profile.user_id, role: "judge" as any }, { onConflict: "user_id,role" });
    setJudgeEmail("");
    loadAll();
    toast({ title: "Judge assigned" });
  };

  const removeJudge = async (id: string) => {
    await supabase.from("judges").delete().eq("id", id);
    loadAll();
    toast({ title: "Judge removed" });
  };

  // ---- Support tickets ----
  const updateTicket = async (id: string, status: string, response?: string) => {
    const update: any = { status: status as any, updated_at: new Date().toISOString() };
    if (response) update.admin_response = response;
    await supabase.from("support_tickets").update(update).eq("id", id);
    loadAll();
    toast({ title: "Ticket updated" });
  };

  // ---- Roles ----
  const assignRole = async () => {
    if (!roleEmail) return;
    const profile = profiles.find((p) => p.email === roleEmail);
    if (!profile) { toast({ title: "User not found", variant: "destructive" }); return; }
    const { error } = await supabase.from("user_roles").upsert({ user_id: profile.user_id, role: roleToAssign as any }, { onConflict: "user_id,role" });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setRoleEmail("");
    loadAll();
    toast({ title: `Role "${roleToAssign}" assigned` });
  };

  const removeRole = async (id: string) => {
    await supabase.from("user_roles").delete().eq("id", id);
    loadAll();
    toast({ title: "Role removed" });
  };

  // ---- Announcements ----
  const saveAnnouncement = async () => {
    const payload = { title: annForm.title, message: annForm.message, published: annForm.published };
    if (editingAnnId) {
      await supabase.from("announcements").update(payload).eq("id", editingAnnId);
    } else {
      await supabase.from("announcements").insert(payload);
    }
    setAnnDialogOpen(false);
    setEditingAnnId(null);
    setAnnForm({ title: "", message: "", published: false });
    loadAll();
    toast({ title: editingAnnId ? "Announcement updated" : "Announcement created" });
  };

  const deleteAnnouncement = async (id: string) => {
    await supabase.from("announcements").delete().eq("id", id);
    loadAll();
    toast({ title: "Announcement deleted" });
  };

  // Analytics data
  const statusCounts = ["pending", "approved", "rejected", "winner"].map((s) => ({
    status: s.charAt(0).toUpperCase() + s.slice(1),
    count: projects.filter((p) => p.status === s).length,
  }));
  const PIE_COLORS = ["hsl(var(--primary))", "hsl(120, 60%, 50%)", "hsl(0, 70%, 55%)", "hsl(270, 60%, 55%)"];

  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <ShieldCheck className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You don't have admin privileges.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet><title>Admin Dashboard | LovHack</title></Helmet>
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          <Tabs defaultValue="hackathons">
            <TabsList className="mb-6 flex flex-wrap gap-1 overflow-x-auto">
              <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="judges">Judges</TabsTrigger>
              <TabsTrigger value="tickets">Support</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* ===== HACKATHONS ===== */}
            <TabsContent value="hackathons" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Hackathons</h2>
                <Dialog open={hackDialogOpen} onOpenChange={setHackDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => { setEditingHackId(null); setHackForm({ name: "", season: 1, status: "draft", start_date: "", end_date: "" }); }}>
                      <Plus className="w-4 h-4 mr-1" /> New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>{editingHackId ? "Edit" : "Create"} Hackathon</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                      <div><Label>Name</Label><Input value={hackForm.name} onChange={(e) => setHackForm({ ...hackForm, name: e.target.value })} /></div>
                      <div><Label>Season</Label><Input type="number" value={hackForm.season} onChange={(e) => setHackForm({ ...hackForm, season: +e.target.value })} /></div>
                      <div><Label>Status</Label>
                        <Select value={hackForm.status} onValueChange={(v) => setHackForm({ ...hackForm, status: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><Label>Start Date</Label><Input type="datetime-local" value={hackForm.start_date} onChange={(e) => setHackForm({ ...hackForm, start_date: e.target.value })} /></div>
                        <div><Label>End Date</Label><Input type="datetime-local" value={hackForm.end_date} onChange={(e) => setHackForm({ ...hackForm, end_date: e.target.value })} /></div>
                      </div>
                      <Button onClick={saveHackathon} className="w-full">{editingHackId ? "Update" : "Create"}</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-3">
                {hackathons.map((h) => (
                  <div key={h.id} className="border border-border rounded-xl p-4 flex items-center justify-between bg-card">
                    <div>
                      <p className="font-semibold">{h.name}</p>
                      <p className="text-sm text-muted-foreground">Season {h.season}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[h.status]}>{h.status}</Badge>
                      <Button size="sm" variant="outline" onClick={() => { setEditingHackId(h.id); setHackForm({ name: h.name, season: h.season, status: h.status, start_date: h.start_date?.slice(0, 16) || "", end_date: h.end_date?.slice(0, 16) || "" }); setHackDialogOpen(true); }}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteHackathon(h.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tracks section */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">Tracks</h3>
                <div className="flex gap-2 mb-4 flex-wrap">
                  <Select value={selectedHackForTracks} onValueChange={setSelectedHackForTracks}>
                    <SelectTrigger className="w-48"><SelectValue placeholder="Select hackathon" /></SelectTrigger>
                    <SelectContent>{hackathons.map((h) => <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input placeholder="Track name" value={trackForm.name} onChange={(e) => setTrackForm({ ...trackForm, name: e.target.value })} className="w-48" />
                  <Input placeholder="Description" value={trackForm.description} onChange={(e) => setTrackForm({ ...trackForm, description: e.target.value })} className="w-48" />
                  <Button size="sm" onClick={addTrack}><Plus className="w-4 h-4 mr-1" /> Add</Button>
                </div>
                <div className="space-y-2">
                  {tracks.filter((t) => !selectedHackForTracks || t.hackathon_id === selectedHackForTracks).map((t) => (
                    <div key={t.id} className="flex items-center justify-between border border-border rounded-lg p-3 bg-card">
                      <div>
                        <p className="font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{(t.hackathons as any)?.name} · {t.description}</p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => deleteTrack(t.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* ===== PROJECTS ===== */}
            <TabsContent value="projects" className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search projects..." value={projectSearch} onChange={(e) => setProjectSearch(e.target.value)} className="pl-9" />
                </div>
                <Select value={projectStatusFilter} onValueChange={setProjectStatusFilter}>
                  <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="winner">Winner</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={projectHackFilter} onValueChange={setProjectHackFilter}>
                  <SelectTrigger className="w-44"><SelectValue placeholder="All Hackathons" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Hackathons</SelectItem>
                    {hackathons.map((h) => <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <p className="text-sm text-muted-foreground">{filteredProjects.length} projects</p>

              <div className="space-y-3">
                {filteredProjects.map((p) => (
                  <div key={p.id} className="border border-border rounded-xl p-4 bg-card flex items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold truncate">{p.title}</p>
                        {(p as any).featured && <Badge className="bg-accent text-accent-foreground text-xs">⭐ Featured</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{p.tagline}</p>
                      <p className="text-xs text-muted-foreground">{(p.hackathons as any)?.name} · {(p.tracks as any)?.name || "No track"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant={(p as any).featured ? "default" : "outline"} onClick={() => toggleFeatured(p.id, !!(p as any).featured)}>
                        ⭐
                      </Button>
                      <Select value={p.status} onValueChange={(v) => updateProjectStatus(p.id, v)}>
                        <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                          <SelectItem value="winner">Winner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* ===== JUDGES ===== */}
            <TabsContent value="judges" className="space-y-6">
              <h2 className="text-xl font-semibold">Assign Judges</h2>
              <div className="flex gap-2 flex-wrap">
                <Input placeholder="User email" value={judgeEmail} onChange={(e) => setJudgeEmail(e.target.value)} className="w-64" />
                <Select value={judgeHackathon} onValueChange={setJudgeHackathon}>
                  <SelectTrigger className="w-48"><SelectValue placeholder="Select hackathon" /></SelectTrigger>
                  <SelectContent>{hackathons.map((h) => <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>)}</SelectContent>
                </Select>
                <Button onClick={addJudge}><UserPlus className="w-4 h-4 mr-1" /> Assign</Button>
              </div>

              <div className="space-y-2">
                {judges.map((j) => {
                  const profile = profiles.find((p) => p.user_id === j.user_id);
                  return (
                    <div key={j.id} className="flex items-center justify-between border border-border rounded-lg p-3 bg-card">
                      <div>
                        <p className="font-medium">{profile?.name || "Unknown"} <span className="text-muted-foreground text-sm">({profile?.email})</span></p>
                        <p className="text-xs text-muted-foreground">{(j.hackathons as any)?.name}</p>
                      </div>
                      <Button size="sm" variant="destructive" onClick={() => removeJudge(j.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* ===== SUPPORT ===== */}
            <TabsContent value="tickets" className="space-y-4">
              <h2 className="text-xl font-semibold">Support Tickets</h2>
              {tickets.map((t) => (
                <div key={t.id} className="border border-border rounded-xl p-4 bg-card space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{t.subject}</p>
                      <p className="text-sm text-muted-foreground mt-1">{t.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={t.status} onValueChange={(v) => updateTicket(t.id, v)}>
                        <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {t.admin_response && (
                    <div className="bg-muted rounded-lg p-3 text-sm">
                      <p className="font-medium text-xs mb-1">Admin Response:</p>
                      {t.admin_response}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Write a response..."
                      value={ticketResponse[t.id] || ""}
                      onChange={(e) => setTicketResponse({ ...ticketResponse, [t.id]: e.target.value })}
                      rows={2}
                    />
                    <Button size="sm" onClick={() => { updateTicket(t.id, t.status, ticketResponse[t.id]); setTicketResponse({ ...ticketResponse, [t.id]: "" }); }}>Send</Button>
                  </div>
                </div>
              ))}
              {tickets.length === 0 && <p className="text-muted-foreground text-center py-8">No support tickets.</p>}
            </TabsContent>

            {/* ===== USERS ===== */}
            <TabsContent value="users" className="space-y-6">
              <h2 className="text-xl font-semibold">User Roles</h2>
              <div className="flex gap-2 flex-wrap">
                <Input placeholder="User email" value={roleEmail} onChange={(e) => setRoleEmail(e.target.value)} className="w-64" />
                <Select value={roleToAssign} onValueChange={setRoleToAssign}>
                  <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="judge">Judge</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={assignRole}><UserPlus className="w-4 h-4 mr-1" /> Assign Role</Button>
              </div>

              <div className="space-y-2">
                {userRoles.map((r) => {
                  const profile = profiles.find((p) => p.user_id === r.user_id);
                  return (
                    <div key={r.id} className="flex items-center justify-between border border-border rounded-lg p-3 bg-card">
                      <div>
                        <p className="font-medium">{profile?.name || "Unknown"} <span className="text-muted-foreground text-sm">({profile?.email})</span></p>
                        <Badge className="mt-1">{r.role}</Badge>
                      </div>
                      <Button size="sm" variant="destructive" onClick={() => removeRole(r.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">All Users ({profiles.length})</h3>
                <div className="space-y-2">
                  {profiles.map((p) => {
                    const roles = userRoles.filter((r) => r.user_id === p.user_id).map((r) => r.role);
                    return (
                      <div key={p.id} className="flex items-center justify-between border border-border rounded-lg p-3 bg-card">
                        <div>
                          <p className="font-medium">{p.name || "—"}</p>
                          <p className="text-sm text-muted-foreground">{p.email}</p>
                        </div>
                        <div className="flex gap-1">
                          {roles.map((r: string) => <Badge key={r} variant="outline">{r}</Badge>)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* ===== ANNOUNCEMENTS ===== */}
            <TabsContent value="announcements" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Announcements</h2>
                <Dialog open={annDialogOpen} onOpenChange={setAnnDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => { setEditingAnnId(null); setAnnForm({ title: "", message: "", published: false }); }}>
                      <Plus className="w-4 h-4 mr-1" /> New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>{editingAnnId ? "Edit" : "Create"} Announcement</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                      <div><Label>Title</Label><Input value={annForm.title} onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })} /></div>
                      <div><Label>Message</Label><Textarea value={annForm.message} onChange={(e) => setAnnForm({ ...annForm, message: e.target.value })} rows={4} /></div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="ann-published" checked={annForm.published} onChange={(e) => setAnnForm({ ...annForm, published: e.target.checked })} className="rounded border-input" />
                        <Label htmlFor="ann-published">Published</Label>
                      </div>
                      <Button onClick={saveAnnouncement} className="w-full">{editingAnnId ? "Update" : "Create"}</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-3">
                {announcements.map((a: any) => (
                  <div key={a.id} className="border border-border rounded-xl p-4 bg-card flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-primary shrink-0" />
                        <p className="font-semibold truncate">{a.title}</p>
                        <Badge variant={a.published ? "default" : "secondary"} className="text-xs">
                          {a.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(a.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" onClick={() => {
                        setEditingAnnId(a.id);
                        setAnnForm({ title: a.title, message: a.message, published: a.published });
                        setAnnDialogOpen(true);
                      }}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteAnnouncement(a.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
                {announcements.length === 0 && <p className="text-muted-foreground text-center py-8">No announcements yet.</p>}
              </div>
            </TabsContent>

            {/* ===== ANALYTICS ===== */}
            <TabsContent value="analytics" className="space-y-8">
              <h2 className="text-xl font-semibold">Analytics Overview</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border border-border rounded-xl p-4 bg-card text-center">
                  <p className="text-3xl font-bold text-foreground">{projects.length}</p>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                </div>
                <div className="border border-border rounded-xl p-4 bg-card text-center">
                  <p className="text-3xl font-bold text-foreground">{profiles.length}</p>
                  <p className="text-sm text-muted-foreground">Registered Users</p>
                </div>
                <div className="border border-border rounded-xl p-4 bg-card text-center">
                  <p className="text-3xl font-bold text-foreground">{hackathons.length}</p>
                  <p className="text-sm text-muted-foreground">Hackathons</p>
                </div>
                <div className="border border-border rounded-xl p-4 bg-card text-center">
                  <p className="text-3xl font-bold text-foreground">{projects.filter((p) => p.status === "winner").length}</p>
                  <p className="text-sm text-muted-foreground">Winners</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Bar Chart: Projects by Status */}
                <div className="border border-border rounded-xl p-6 bg-card">
                  <h3 className="font-semibold mb-4">Projects by Status</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={statusCounts}>
                      <XAxis dataKey="status" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie Chart: Status Distribution */}
                <div className="border border-border rounded-xl p-6 bg-card">
                  <h3 className="font-semibold mb-4">Status Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={statusCounts.filter((s) => s.count > 0)} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
                        {statusCounts.filter((s) => s.count > 0).map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Projects by Likes */}
              <div className="border border-border rounded-xl p-6 bg-card">
                <h3 className="font-semibold mb-4">Top Projects by Likes</h3>
                <div className="space-y-2">
                  {[...projects].sort((a, b) => b.likes - a.likes).slice(0, 5).map((p, i) => (
                    <div key={p.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-muted-foreground w-6">{i + 1}</span>
                        <div>
                          <p className="font-medium text-sm">{p.title}</p>
                          <p className="text-xs text-muted-foreground">{(p.hackathons as any)?.name}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>❤️ {p.likes}</span>
                        <span>👁 {p.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
