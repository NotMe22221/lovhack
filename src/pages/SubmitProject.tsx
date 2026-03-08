import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, Upload, X, Image as ImageIcon } from "lucide-react";

const SubmitProject = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([]);
  const [screenshotPreviews, setScreenshotPreviews] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: "",
    tagline: "",
    description: "",
    problem: "",
    solution: "",
    demo_video_link: "",
    github_link: "",
    live_demo_link: "",
    track_id: "",
    hackathon_id: "",
    tech_stack: "",
    team_name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const [tracksRes, hackathonsRes] = await Promise.all([
        supabase.from("tracks").select("*"),
        supabase.from("hackathons").select("*").eq("status", "active"),
      ]);
      setTracks(tracksRes.data || []);
      setHackathons(hackathonsRes.data || []);
      if (hackathonsRes.data?.length) {
        setForm((f) => ({ ...f, hackathon_id: hackathonsRes.data![0].id }));
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleScreenshots = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + screenshotFiles.length > 5) {
      toast({ title: "Max 5 screenshots", variant: "destructive" });
      return;
    }
    setScreenshotFiles((prev) => [...prev, ...files]);
    setScreenshotPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeScreenshot = (index: number) => {
    setScreenshotFiles((prev) => prev.filter((_, i) => i !== index));
    setScreenshotPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (file: File, path: string) => {
    const { data, error } = await supabase.storage.from("project-assets").upload(path, file, { upsert: true });
    if (error) throw error;
    const { data: urlData } = supabase.storage.from("project-assets").getPublicUrl(data.path);
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: "Title and description are required", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const timestamp = Date.now();

      // Upload thumbnail
      let thumbnailUrl: string | null = null;
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, `${user.id}/${timestamp}/thumbnail-${thumbnailFile.name}`);
      }

      // Upload screenshots
      const screenshotUrls: string[] = [];
      for (let i = 0; i < screenshotFiles.length; i++) {
        const url = await uploadFile(screenshotFiles[i], `${user.id}/${timestamp}/screenshot-${i}-${screenshotFiles[i].name}`);
        screenshotUrls.push(url);
      }

      // Create team if name provided
      let teamId: string | null = null;
      if (form.team_name.trim()) {
        const { data: teamData, error: teamError } = await supabase
          .from("teams")
          .insert({ name: form.team_name.trim() })
          .select("id")
          .single();
        if (teamError) throw teamError;
        teamId = teamData.id;
        // Add current user as team leader
        await supabase.from("team_members").insert({ team_id: teamId, user_id: user.id, role: "leader" });
      }

      const techStackArray = form.tech_stack.split(",").map((s) => s.trim()).filter(Boolean);

      const { error } = await supabase.from("projects").insert({
        title: form.title.trim(),
        tagline: form.tagline.trim(),
        description: form.description.trim(),
        problem: form.problem.trim(),
        solution: form.solution.trim(),
        demo_video_link: form.demo_video_link.trim(),
        github_link: form.github_link.trim(),
        live_demo_link: form.live_demo_link.trim(),
        track_id: form.track_id || null,
        hackathon_id: form.hackathon_id || null,
        user_id: user.id,
        tech_stack: techStackArray,
        thumbnail_url: thumbnailUrl,
        screenshots: screenshotUrls,
        team_id: teamId,
      });

      if (error) throw error;
      toast({ title: "Project submitted!", description: "Your project is pending review." });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Submit Project | LovHack</title>
      </Helmet>
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">Submit Your Project</h1>
        <p className="text-muted-foreground mb-8">Share what you've built with the community.</p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8">
          <div className="space-y-2">
            <Label htmlFor="title">Project Name *</Label>
            <Input id="title" name="title" value={form.title} onChange={handleChange} required placeholder="My Awesome Project" className="rounded-xl" maxLength={100} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" name="tagline" value={form.tagline} onChange={handleChange} placeholder="A one-liner about your project" className="rounded-xl" maxLength={200} />
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <div className="flex items-center gap-4">
              {thumbnailPreview ? (
                <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-border/50">
                  <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => { setThumbnailFile(null); setThumbnailPreview(null); }} className="absolute top-1 right-1 bg-background/80 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors text-sm text-muted-foreground">
                  <Upload className="w-4 h-4" /> Upload thumbnail
                  <input type="file" accept="image/*" onChange={handleThumbnail} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {hackathons.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="hackathon_id">Hackathon</Label>
              <select id="hackathon_id" name="hackathon_id" value={form.hackathon_id} onChange={handleChange} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
                {hackathons.map((h) => (
                  <option key={h.id} value={h.id}>{h.name}</option>
                ))}
              </select>
            </div>
          )}

          {tracks.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="track_id">Track</Label>
              <select id="track_id" name="track_id" value={form.track_id} onChange={handleChange} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm">
                <option value="">Select a track</option>
                {tracks.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="team_name">Team Name (optional)</Label>
            <Input id="team_name" name="team_name" value={form.team_name} onChange={handleChange} placeholder="Your team name" className="rounded-xl" maxLength={100} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" name="description" value={form.description} onChange={handleChange} required rows={5} placeholder="Describe your project in detail..." className="rounded-xl" maxLength={5000} />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="problem">Problem</Label>
              <Textarea id="problem" name="problem" value={form.problem} onChange={handleChange} rows={3} placeholder="What problem does it solve?" className="rounded-xl" maxLength={2000} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution">Solution</Label>
              <Textarea id="solution" name="solution" value={form.solution} onChange={handleChange} rows={3} placeholder="How does it solve it?" className="rounded-xl" maxLength={2000} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tech_stack">Tech Stack (comma-separated)</Label>
            <Input id="tech_stack" name="tech_stack" value={form.tech_stack} onChange={handleChange} placeholder="React, Supabase, Tailwind" className="rounded-xl" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github_link">GitHub Repo</Label>
              <Input id="github_link" name="github_link" value={form.github_link} onChange={handleChange} placeholder="https://github.com/..." className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="live_demo_link">Live Demo</Label>
              <Input id="live_demo_link" name="live_demo_link" value={form.live_demo_link} onChange={handleChange} placeholder="https://..." className="rounded-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo_video_link">Demo Video Link</Label>
            <Input id="demo_video_link" name="demo_video_link" value={form.demo_video_link} onChange={handleChange} placeholder="https://youtube.com/..." className="rounded-xl" />
          </div>

          {/* Screenshots Upload */}
          <div className="space-y-2">
            <Label>Screenshots (max 5)</Label>
            {screenshotPreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-2">
                {screenshotPreviews.map((url, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-border/50">
                    <img src={url} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeScreenshot(i)} className="absolute top-1 right-1 bg-background/80 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {screenshotFiles.length < 5 && (
              <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors text-sm text-muted-foreground">
                <ImageIcon className="w-4 h-4" /> Add screenshots
                <input type="file" accept="image/*" multiple onChange={handleScreenshots} className="hidden" />
              </label>
            )}
          </div>

          <Button type="submit" className="w-full rounded-xl" disabled={loading}>
            <Send className="w-4 h-4 mr-2" />
            {loading ? "Submitting..." : "Submit Project"}
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitProject;
