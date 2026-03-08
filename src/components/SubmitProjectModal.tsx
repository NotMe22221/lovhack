import { useState, useEffect, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, X, Image as ImageIcon, Video, FileText, Archive,
  Link as LinkIcon, Send, AlertCircle, GripVertical, Play
} from "lucide-react";

interface SubmitProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface MediaFile {
  id: string;
  file: File;
  preview?: string;
  progress: number;
  url?: string;
  type: "image" | "video" | "pdf" | "zip";
}

const MAX_IMAGE_SIZE = 200 * 1024 * 1024;
const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
const MAX_FILE_SIZE = 50 * 1024 * 1024;

const getFileType = (file: File): "image" | "video" | "pdf" | "zip" => {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  if (file.type === "application/pdf") return "pdf";
  return "zip";
};

const getFileIcon = (type: string) => {
  switch (type) {
    case "image": return <ImageIcon className="w-4 h-4" />;
    case "video": return <Video className="w-4 h-4" />;
    case "pdf": return <FileText className="w-4 h-4" />;
    default: return <Archive className="w-4 h-4" />;
  }
};

const typeBadgeClass: Record<string, string> = {
  image: "bg-accent text-accent-foreground",
  video: "bg-primary/10 text-primary",
  pdf: "bg-secondary text-secondary-foreground",
  zip: "bg-muted text-muted-foreground",
};

const SubmitProjectModal = ({ open, onOpenChange, onSuccess }: SubmitProjectModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<any[]>([]);
  const [hackathons, setHackathons] = useState<any[]>([]);

  // Cover image
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverUrlMode, setCoverUrlMode] = useState(false);
  const [coverUrl, setCoverUrl] = useState("");
  const [coverDragOver, setCoverDragOver] = useState(false);

  // Videos
  const [demoVideoFile, setDemoVideoFile] = useState<File | null>(null);
  const [demoVideoUrl, setDemoVideoUrl] = useState("");
  const [demoVideoPreview, setDemoVideoPreview] = useState<string | null>(null);
  const [demoDragOver, setDemoDragOver] = useState(false);

  const [techVideoFile, setTechVideoFile] = useState<File | null>(null);
  const [techVideoUrl, setTechVideoUrl] = useState("");
  const [techVideoPreview, setTechVideoPreview] = useState<string | null>(null);
  const [techDragOver, setTechDragOver] = useState(false);

  // Gallery
  const [galleryFiles, setGalleryFiles] = useState<MediaFile[]>([]);
  const [galleryDragOver, setGalleryDragOver] = useState(false);

  // Upload progress
  const [uploadProgress, setUploadProgress] = useState(0);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form
  const [form, setForm] = useState({
    title: "", tagline: "", description: "", problem: "", solution: "",
    demo_video_link: "", github_link: "", live_demo_link: "",
    track_id: "", hackathon_id: "", tech_stack: "", team_name: "",
  });

  useEffect(() => {
    if (!open) return;
    const fetch = async () => {
      const [t, h] = await Promise.all([
        supabase.from("tracks").select("*"),
        supabase.from("hackathons").select("*").eq("status", "active"),
      ]);
      setTracks(t.data || []);
      setHackathons(h.data || []);
      if (h.data?.length) setForm(f => ({ ...f, hackathon_id: h.data![0].id }));
    };
    fetch();
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(e2 => ({ ...e2, [e.target.name]: "" }));
  };

  // Cover image handlers
  const handleCoverFile = (file: File) => {
    if (!file.type.match(/^image\/(png|jpe?g|webp)$/)) {
      toast({ title: "Only PNG, JPG, WEBP accepted", variant: "destructive" });
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast({ title: "Image must be under 200MB", variant: "destructive" });
      return;
    }
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
    setCoverUrlMode(false);
    setCoverUrl("");
    setErrors(e => ({ ...e, cover: "" }));
  };

  const handleCoverDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setCoverDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleCoverFile(file);
  }, []);

  // Video handlers
  const handleVideoFile = (file: File, role: "demo" | "tech") => {
    if (!file.type.startsWith("video/mp4") && file.type !== "video/mp4") {
      toast({ title: "Only MP4 format accepted", variant: "destructive" });
      return;
    }
    if (file.size > MAX_VIDEO_SIZE) {
      toast({ title: "Video must be under 500MB", variant: "destructive" });
      return;
    }
    const preview = URL.createObjectURL(file);
    if (role === "demo") {
      setDemoVideoFile(file);
      setDemoVideoPreview(preview);
      setDemoVideoUrl("");
      setErrors(e => ({ ...e, demo_video: "" }));
    } else {
      setTechVideoFile(file);
      setTechVideoPreview(preview);
      setTechVideoUrl("");
      setErrors(e => ({ ...e, tech_video: "" }));
    }
  };

  // Gallery handlers
  const handleGalleryFiles = (files: FileList) => {
    const newFiles: MediaFile[] = [];
    Array.from(files).forEach(file => {
      const type = getFileType(file);
      const maxSize = type === "video" ? MAX_VIDEO_SIZE : MAX_FILE_SIZE;
      if (file.size > maxSize) {
        toast({ title: `${file.name} exceeds size limit`, variant: "destructive" });
        return;
      }
      newFiles.push({
        id: crypto.randomUUID(),
        file,
        preview: type === "image" ? URL.createObjectURL(file) : undefined,
        progress: 0,
        type,
      });
    });
    setGalleryFiles(prev => [...prev, ...newFiles]);
  };

  const removeGalleryFile = (id: string) => {
    setGalleryFiles(prev => prev.filter(f => f.id !== id));
  };

  // Upload helper
  const uploadFile = async (file: File, path: string): Promise<string> => {
    const { data, error } = await supabase.storage.from("project-assets").upload(path, file, { upsert: true });
    if (error) throw error;
    const { data: urlData } = supabase.storage.from("project-assets").getPublicUrl(data.path);
    return urlData.publicUrl;
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!coverFile && !coverUrl.trim()) newErrors.cover = "Cover image is required";
    if (!demoVideoFile && !demoVideoUrl.trim()) newErrors.demo_video = "Demo video is required";
    if (!techVideoFile && !techVideoUrl.trim()) newErrors.tech_video = "Tech video is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!user || loading) return;
    if (!validate()) {
      toast({ title: "Please fix the errors before submitting", variant: "destructive" });
      return;
    }
    setLoading(true);
    setUploadProgress(0);

    try {
      const timestamp = Date.now();
      const totalSteps = 2 + (coverFile ? 1 : 0) + (demoVideoFile ? 1 : 0) + (techVideoFile ? 1 : 0) + galleryFiles.length;
      let completedSteps = 0;
      const advance = () => { completedSteps++; setUploadProgress(Math.round((completedSteps / totalSteps) * 100)); };

      // Upload cover
      let thumbnailUrl: string | null = null;
      if (coverFile) {
        thumbnailUrl = await uploadFile(coverFile, `${user.id}/${timestamp}/cover-${coverFile.name}`);
        advance();
      } else if (coverUrl.trim()) {
        thumbnailUrl = coverUrl.trim();
      }

      // Upload demo video
      let demoUrl = demoVideoUrl.trim();
      if (demoVideoFile) {
        demoUrl = await uploadFile(demoVideoFile, `${user.id}/${timestamp}/demo-video-${demoVideoFile.name}`);
        advance();
      }

      // Upload tech video
      let techUrl = techVideoUrl.trim();
      if (techVideoFile) {
        techUrl = await uploadFile(techVideoFile, `${user.id}/${timestamp}/tech-video-${techVideoFile.name}`);
        advance();
      }

      // Upload gallery files
      const galleryUrls: { url: string; name: string; type: string }[] = [];
      for (const gf of galleryFiles) {
        const url = await uploadFile(gf.file, `${user.id}/${timestamp}/gallery-${gf.file.name}`);
        galleryUrls.push({ url, name: gf.file.name, type: gf.type });
        advance();
      }

      // Create team if needed
      let teamId: string | null = null;
      if (form.team_name.trim()) {
        const { data: teamData, error: teamError } = await supabase
          .from("teams").insert({ name: form.team_name.trim() }).select("id").single();
        if (teamError) throw teamError;
        teamId = teamData.id;
        await supabase.from("team_members").insert({ team_id: teamId, user_id: user.id, role: "leader" });
      }
      advance();

      const techStackArray = form.tech_stack.split(",").map(s => s.trim()).filter(Boolean);
      const screenshotUrls = galleryUrls.filter(g => g.type === "image").map(g => g.url);

      // Insert project
      const { data: projectData, error: projectError } = await supabase.from("projects").insert({
        title: form.title.trim(),
        tagline: form.tagline.trim(),
        description: form.description.trim(),
        problem: form.problem.trim(),
        solution: form.solution.trim(),
        demo_video_link: form.demo_video_link.trim() || demoUrl,
        github_link: form.github_link.trim(),
        live_demo_link: form.live_demo_link.trim(),
        track_id: form.track_id || null,
        hackathon_id: form.hackathon_id || null,
        user_id: user.id,
        tech_stack: techStackArray,
        thumbnail_url: thumbnailUrl,
        screenshots: screenshotUrls,
        team_id: teamId,
        demo_video_url: demoUrl,
        tech_video_url: techUrl,
      } as any).select("id").single();

      if (projectError) throw projectError;
      advance();

      // Insert gallery media rows
      if (galleryUrls.length > 0 && projectData) {
        const mediaRows = galleryUrls.map((g, i) => ({
          project_id: projectData.id,
          file_type: g.type,
          file_url: g.url,
          file_name: g.name,
          media_role: "gallery",
          sort_order: i,
        }));
        await supabase.from("project_media" as any).insert(mediaRows);
      }

      // Insert cover as media
      if (thumbnailUrl && projectData) {
        await supabase.from("project_media" as any).insert({
          project_id: projectData.id,
          file_type: "image",
          file_url: thumbnailUrl,
          file_name: coverFile?.name || "cover",
          media_role: "cover",
          sort_order: 0,
        });
      }

      toast({ title: "Project submitted!", description: "Your project is pending review." });
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    } catch (error: any) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    setForm({ title: "", tagline: "", description: "", problem: "", solution: "", demo_video_link: "", github_link: "", live_demo_link: "", track_id: "", hackathon_id: "", tech_stack: "", team_name: "" });
    setCoverFile(null); setCoverPreview(null); setCoverUrl(""); setCoverUrlMode(false);
    setDemoVideoFile(null); setDemoVideoUrl(""); setDemoVideoPreview(null);
    setTechVideoFile(null); setTechVideoUrl(""); setTechVideoPreview(null);
    setGalleryFiles([]); setErrors({});
  };

  const DropZone = ({ 
    onDrop, dragOver, setDragOver, children, className = "", error 
  }: { 
    onDrop: (e: React.DragEvent) => void; dragOver: boolean; setDragOver: (v: boolean) => void; 
    children: React.ReactNode; className?: string; error?: string;
  }) => (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      className={`
        relative rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
        ${dragOver
          ? "border-primary bg-primary/5 ring-2 ring-primary/30 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]"
          : error
            ? "border-destructive/50 bg-destructive/5"
            : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-primary/5"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );

  // Guard: no active hackathons = submissions closed
  if (open && hackathons.length === 0 && tracks.length >= 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md bg-card border-border/50 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">Submissions Closed</DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Submissions are currently closed. Check back when the next hackathon begins!</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh] p-0 bg-card border-border/50 rounded-3xl overflow-hidden">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-8 pt-8 pb-4 border-b border-border/30">
            <DialogTitle className="text-2xl font-bold text-foreground">Submit New Project</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 px-8">
            <div className="py-6 space-y-10">

              {/* === SECTION 1: COVER IMAGE === */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-1">Project Cover Image</h3>
                <p className="text-sm text-muted-foreground mb-4">This image becomes the project card thumbnail.</p>

                {coverPreview || coverUrl.trim() ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative aspect-video rounded-2xl overflow-hidden border border-border/50">
                    <img src={coverPreview || coverUrl} alt="Cover" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => { setCoverFile(null); setCoverPreview(null); setCoverUrl(""); }}
                      className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5 hover:bg-background transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <DropZone onDrop={handleCoverDrop} dragOver={coverDragOver} setDragOver={setCoverDragOver} error={errors.cover}>
                    <label className="flex flex-col items-center justify-center py-12 cursor-pointer">
                      <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                      <p className="text-sm font-medium text-foreground">Click here or drag image to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">Images up to 200MB · Recommended aspect ratio: 16:9</p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="secondary" className="text-[10px]">PNG</Badge>
                        <Badge variant="secondary" className="text-[10px]">JPG</Badge>
                        <Badge variant="secondary" className="text-[10px]">WEBP</Badge>
                      </div>
                      <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCoverFile(f); }} />
                    </label>
                  </DropZone>
                )}

                <div className="flex gap-2 mt-3">
                  {!coverPreview && !coverUrl.trim() && (
                    <>
                      <label>
                        <Button type="button" variant="outline" size="sm" className="rounded-xl" asChild>
                          <span><Upload className="w-3 h-3 mr-1" /> Select File</span>
                        </Button>
                        <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCoverFile(f); }} />
                      </label>
                      <Button type="button" variant="outline" size="sm" className="rounded-xl" onClick={() => setCoverUrlMode(!coverUrlMode)}>
                        <LinkIcon className="w-3 h-3 mr-1" /> Add URL
                      </Button>
                    </>
                  )}
                </div>

                {coverUrlMode && (
                  <Input placeholder="https://example.com/image.png" value={coverUrl} onChange={(e) => { setCoverUrl(e.target.value); setErrors(er => ({ ...er, cover: "" })); }} className="mt-2 rounded-xl" />
                )}
                {errors.cover && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.cover}</p>}
              </section>

              {/* === SECTION 2: PROJECT DETAILS === */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="m-title">Project Name *</Label>
                    <Input id="m-title" name="title" value={form.title} onChange={handleChange} placeholder="My Awesome Project" className="rounded-xl mt-1" maxLength={100} />
                    {errors.title && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.title}</p>}
                  </div>
                  <div>
                    <Label htmlFor="m-tagline">Tagline</Label>
                    <Input id="m-tagline" name="tagline" value={form.tagline} onChange={handleChange} placeholder="A one-liner about your project" className="rounded-xl mt-1" maxLength={200} />
                  </div>
                  <div>
                    <Label htmlFor="m-description">Description *</Label>
                    <Textarea id="m-description" name="description" value={form.description} onChange={handleChange} placeholder="Describe your project in detail..." className="rounded-xl mt-1" rows={4} maxLength={5000} />
                    {errors.description && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.description}</p>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="m-problem">Problem</Label>
                      <Textarea id="m-problem" name="problem" value={form.problem} onChange={handleChange} rows={3} placeholder="What problem does it solve?" className="rounded-xl mt-1" maxLength={2000} />
                    </div>
                    <div>
                      <Label htmlFor="m-solution">Solution</Label>
                      <Textarea id="m-solution" name="solution" value={form.solution} onChange={handleChange} rows={3} placeholder="How does it solve it?" className="rounded-xl mt-1" maxLength={2000} />
                    </div>
                  </div>

                  {hackathons.length > 0 && (
                    <div>
                      <Label>Hackathon</Label>
                      <select name="hackathon_id" value={form.hackathon_id} onChange={handleChange} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm mt-1">
                        {hackathons.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                      </select>
                    </div>
                  )}
                  {tracks.length > 0 && (
                    <div>
                      <Label>Track</Label>
                      <select name="track_id" value={form.track_id} onChange={handleChange} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm mt-1">
                        <option value="">Select a track</option>
                        {tracks.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                      </select>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="m-team">Team Name (optional)</Label>
                    <Input id="m-team" name="team_name" value={form.team_name} onChange={handleChange} placeholder="Your team name" className="rounded-xl mt-1" maxLength={100} />
                  </div>
                  <div>
                    <Label htmlFor="m-tech">Tech Stack (comma-separated)</Label>
                    <Input id="m-tech" name="tech_stack" value={form.tech_stack} onChange={handleChange} placeholder="React, Supabase, Tailwind" className="rounded-xl mt-1" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="m-github">GitHub Repo</Label>
                      <Input id="m-github" name="github_link" value={form.github_link} onChange={handleChange} placeholder="https://github.com/..." className="rounded-xl mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="m-live">Live Demo</Label>
                      <Input id="m-live" name="live_demo_link" value={form.live_demo_link} onChange={handleChange} placeholder="https://..." className="rounded-xl mt-1" />
                    </div>
                  </div>
                </div>
              </section>

              {/* === SECTION 3: REQUIRED VIDEOS === */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-1">Required Videos</h3>
                <p className="text-sm text-muted-foreground mb-6">Two short videos to showcase your project.</p>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Demo Video */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Play className="w-4 h-4 text-primary" />
                      <h4 className="font-medium text-foreground">Demo Video</h4>
                      <Badge variant="secondary" className="text-[10px]">Max 60s</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Focus on how the product works from the user's perspective.</p>

                    {demoVideoPreview ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative rounded-xl overflow-hidden border border-border/50 aspect-video">
                        <video src={demoVideoPreview} className="w-full h-full object-cover" controls />
                        <button type="button" onClick={() => { setDemoVideoFile(null); setDemoVideoPreview(null); }}
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1">
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ) : (
                      <DropZone
                        onDrop={(e) => { e.preventDefault(); setDemoDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleVideoFile(f, "demo"); }}
                        dragOver={demoDragOver} setDragOver={setDemoDragOver} error={errors.demo_video}
                      >
                        <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
                          <Video className="w-8 h-8 text-muted-foreground mb-2" />
                          <p className="text-xs font-medium text-foreground">Upload MP4</p>
                          <p className="text-[10px] text-muted-foreground mt-1">Up to 500MB</p>
                          <input type="file" accept="video/mp4" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleVideoFile(f, "demo"); }} />
                        </label>
                      </DropZone>
                    )}

                    <p className="text-[10px] text-muted-foreground mt-2">Or paste a video URL:</p>
                    <Input placeholder="https://youtube.com/..." value={demoVideoUrl} onChange={(e) => { setDemoVideoUrl(e.target.value); setErrors(er => ({ ...er, demo_video: "" })); }}
                      className="rounded-xl mt-1 text-xs" disabled={!!demoVideoFile} />
                    {errors.demo_video && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.demo_video}</p>}
                  </div>

                  {/* Tech Video */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Play className="w-4 h-4 text-primary" />
                      <h4 className="font-medium text-foreground">Tech Video</h4>
                      <Badge variant="secondary" className="text-[10px]">Max 60s</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Explain the architecture, stack, and implementation.</p>

                    {techVideoPreview ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative rounded-xl overflow-hidden border border-border/50 aspect-video">
                        <video src={techVideoPreview} className="w-full h-full object-cover" controls />
                        <button type="button" onClick={() => { setTechVideoFile(null); setTechVideoPreview(null); }}
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1">
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ) : (
                      <DropZone
                        onDrop={(e) => { e.preventDefault(); setTechDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleVideoFile(f, "tech"); }}
                        dragOver={techDragOver} setDragOver={setTechDragOver} error={errors.tech_video}
                      >
                        <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
                          <Video className="w-8 h-8 text-muted-foreground mb-2" />
                          <p className="text-xs font-medium text-foreground">Upload MP4</p>
                          <p className="text-[10px] text-muted-foreground mt-1">Up to 500MB</p>
                          <input type="file" accept="video/mp4" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleVideoFile(f, "tech"); }} />
                        </label>
                      </DropZone>
                    )}

                    <p className="text-[10px] text-muted-foreground mt-2">Or paste a video URL:</p>
                    <Input placeholder="https://loom.com/..." value={techVideoUrl} onChange={(e) => { setTechVideoUrl(e.target.value); setErrors(er => ({ ...er, tech_video: "" })); }}
                      className="rounded-xl mt-1 text-xs" disabled={!!techVideoFile} />
                    {errors.tech_video && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.tech_video}</p>}
                  </div>
                </div>
              </section>

              {/* === SECTION 4: MEDIA GALLERY === */}
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-1">Media Gallery</h3>
                <p className="text-sm text-muted-foreground mb-4">Upload additional files to showcase your project.</p>

                <DropZone
                  onDrop={(e) => { e.preventDefault(); setGalleryDragOver(false); if (e.dataTransfer.files.length) handleGalleryFiles(e.dataTransfer.files); }}
                  dragOver={galleryDragOver} setDragOver={setGalleryDragOver}
                >
                  <label className="flex flex-col items-center justify-center py-10 cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium text-foreground">Click here or drag files to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">Images, PDFs, ZIP up to 50MB · Videos up to 500MB (MP4)</p>
                    <input type="file" multiple accept="image/*,video/mp4,application/pdf,.zip" className="hidden"
                      onChange={(e) => { if (e.target.files?.length) handleGalleryFiles(e.target.files); }} />
                  </label>
                </DropZone>

                <AnimatePresence>
                  {galleryFiles.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                      {galleryFiles.map(gf => (
                        <motion.div key={gf.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                          className="relative rounded-xl border border-border/50 bg-muted/30 overflow-hidden group">
                          {gf.preview ? (
                            <img src={gf.preview} alt={gf.file.name} className="aspect-video w-full object-cover" />
                          ) : (
                            <div className="aspect-video flex items-center justify-center">
                              {getFileIcon(gf.type)}
                            </div>
                          )}
                          <div className="p-2 flex items-center gap-1.5">
                            <Badge className={`text-[9px] ${typeBadgeClass[gf.type]}`}>{gf.type.toUpperCase()}</Badge>
                            <span className="text-[10px] text-muted-foreground truncate flex-1">{gf.file.name}</span>
                          </div>
                          <button type="button" onClick={() => removeGalleryFile(gf.id)}
                            className="absolute top-1.5 right-1.5 bg-background/80 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-border/30 bg-card/80 backdrop-blur-sm">
            {loading && (
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" className="rounded-xl" onClick={() => onOpenChange(false)} disabled={loading}>
                Cancel
              </Button>
              <Button className="rounded-xl" onClick={handleSubmit} disabled={loading}>
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Submitting..." : "Submit Project"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitProjectModal;
