import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { ShieldCheck, Star, CheckCircle } from "lucide-react";

const JudgeDashboard = () => {
  const { user } = useAuth();
  const [isJudge, setIsJudge] = useState<boolean | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [selectedHackathon, setSelectedHackathon] = useState<string>("");
  const [scoringProject, setScoringProject] = useState<string | null>(null);

  // Score form
  const [ideaScore, setIdeaScore] = useState(5);
  const [executionScore, setExecutionScore] = useState(5);
  const [presentationScore, setPresentationScore] = useState(5);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase.rpc("has_role", { _user_id: user.id, _role: "judge" }).then(({ data }) => {
      setIsJudge(data === true);
      if (data === true) loadAssignments();
    });
  }, [user]);

  const loadAssignments = async () => {
    const { data: judgeRows } = await supabase.from("judges").select("*, hackathons(id, name, status)").eq("user_id", user!.id);
    if (judgeRows) {
      setAssignments(judgeRows);
      if (judgeRows.length > 0 && !selectedHackathon) {
        setSelectedHackathon(judgeRows[0].hackathon_id);
      }
    }
    const { data: scoreData } = await supabase.from("scores").select("*");
    if (scoreData) setScores(scoreData);
  };

  useEffect(() => {
    if (!selectedHackathon) return;
    supabase.from("projects").select("*").eq("hackathon_id", selectedHackathon).in("status", ["approved", "winner"]).order("title").then(({ data }) => {
      if (data) setProjects(data);
    });
  }, [selectedHackathon]);

  const getJudgeId = () => {
    const a = assignments.find((a) => a.hackathon_id === selectedHackathon);
    return a?.id;
  };

  const getExistingScore = (projectId: string) => {
    const judgeId = getJudgeId();
    return scores.find((s) => s.project_id === projectId && s.judge_id === judgeId);
  };

  const openScoring = (projectId: string) => {
    const existing = getExistingScore(projectId);
    if (existing) {
      setIdeaScore(existing.idea_score);
      setExecutionScore(existing.execution_score);
      setPresentationScore(existing.presentation_score);
      setFeedback(existing.feedback || "");
    } else {
      setIdeaScore(5);
      setExecutionScore(5);
      setPresentationScore(5);
      setFeedback("");
    }
    setScoringProject(projectId);
  };

  const submitScore = async () => {
    if (!scoringProject) return;
    const judgeId = getJudgeId();
    if (!judgeId) return;

    const total = ideaScore + executionScore + presentationScore;
    const existing = getExistingScore(scoringProject);

    if (existing) {
      await supabase.from("scores").update({
        idea_score: ideaScore,
        execution_score: executionScore,
        presentation_score: presentationScore,
        total_score: total,
        feedback,
      }).eq("id", existing.id);
    } else {
      await supabase.from("scores").insert({
        project_id: scoringProject,
        judge_id: judgeId,
        idea_score: ideaScore,
        execution_score: executionScore,
        presentation_score: presentationScore,
        total_score: total,
        feedback,
      });
    }

    setScoringProject(null);
    loadAssignments();
    toast({ title: existing ? "Score updated" : "Score submitted" });
  };

  if (isJudge === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isJudge) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-32">
          <div className="text-center">
            <ShieldCheck className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground">You are not assigned as a judge.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet><title>Judge Dashboard | LovHack</title></Helmet>
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Judge Dashboard</h1>

          <Tabs value={selectedHackathon} onValueChange={setSelectedHackathon}>
            <TabsList className="mb-6">
              {assignments.map((a) => (
                <TabsTrigger key={a.hackathon_id} value={a.hackathon_id}>
                  {(a.hackathons as any)?.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {assignments.map((a) => (
              <TabsContent key={a.hackathon_id} value={a.hackathon_id}>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{projects.length} projects to review</p>

                  {projects.map((p) => {
                    const existing = getExistingScore(p.id);
                    const isScoring = scoringProject === p.id;

                    return (
                      <div key={p.id} className="border border-border rounded-xl p-4 bg-card space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{p.title}</p>
                              {existing && <CheckCircle className="w-4 h-4 text-green-600" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{p.tagline}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {existing && <Badge variant="outline">Score: {existing.total_score}/30</Badge>}
                            <Button size="sm" variant={isScoring ? "secondary" : "default"} onClick={() => isScoring ? setScoringProject(null) : openScoring(p.id)}>
                              <Star className="w-4 h-4 mr-1" />
                              {existing ? "Update" : "Score"}
                            </Button>
                          </div>
                        </div>

                        {isScoring && (
                          <div className="bg-muted/50 rounded-xl p-4 space-y-5">
                            <div>
                              <div className="flex justify-between mb-2"><Label>Idea</Label><span className="text-sm font-semibold">{ideaScore}/10</span></div>
                              <Slider value={[ideaScore]} min={1} max={10} step={1} onValueChange={([v]) => setIdeaScore(v)} />
                            </div>
                            <div>
                              <div className="flex justify-between mb-2"><Label>Execution</Label><span className="text-sm font-semibold">{executionScore}/10</span></div>
                              <Slider value={[executionScore]} min={1} max={10} step={1} onValueChange={([v]) => setExecutionScore(v)} />
                            </div>
                            <div>
                              <div className="flex justify-between mb-2"><Label>Presentation</Label><span className="text-sm font-semibold">{presentationScore}/10</span></div>
                              <Slider value={[presentationScore]} min={1} max={10} step={1} onValueChange={([v]) => setPresentationScore(v)} />
                            </div>
                            <div className="text-center font-bold text-lg">Total: {ideaScore + executionScore + presentationScore}/30</div>
                            <div>
                              <Label>Feedback</Label>
                              <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Optional feedback..." rows={3} className="mt-1" />
                            </div>
                            <Button onClick={submitScore} className="w-full">{existing ? "Update Score" : "Submit Score"}</Button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {projects.length === 0 && <p className="text-muted-foreground text-center py-8">No projects to review yet.</p>}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JudgeDashboard;
