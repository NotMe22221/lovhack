
-- Extend app_role enum to include 'judge'
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'judge';

-- Create new enums
CREATE TYPE public.project_status AS ENUM ('pending', 'approved', 'rejected', 'winner');
CREATE TYPE public.hackathon_status AS ENUM ('draft', 'active', 'completed');
CREATE TYPE public.ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');

-- Profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name text NOT NULL DEFAULT '',
  email text,
  bio text DEFAULT '',
  avatar_url text,
  github text DEFAULT '',
  linkedin text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Hackathons table
CREATE TABLE public.hackathons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  season int NOT NULL DEFAULT 1,
  start_date timestamptz,
  end_date timestamptz,
  status public.hackathon_status NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.hackathons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view hackathons" ON public.hackathons FOR SELECT USING (true);
CREATE POLICY "Admins manage hackathons" ON public.hackathons FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Tracks table
CREATE TABLE public.tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  hackathon_id uuid REFERENCES public.hackathons(id) ON DELETE CASCADE NOT NULL,
  description text DEFAULT ''
);
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view tracks" ON public.tracks FOR SELECT USING (true);
CREATE POLICY "Admins manage tracks" ON public.tracks FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Teams table
CREATE TABLE public.teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view teams" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Authenticated can create teams" ON public.teams FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins manage teams" ON public.teams FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Team members table
CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL DEFAULT 'member',
  UNIQUE(team_id, user_id)
);
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Authenticated can join teams" ON public.team_members FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Members can leave teams" ON public.team_members FOR DELETE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins manage team members" ON public.team_members FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Projects table
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  tagline text DEFAULT '',
  description text DEFAULT '',
  problem text DEFAULT '',
  solution text DEFAULT '',
  demo_link text DEFAULT '',
  github_link text DEFAULT '',
  live_demo_link text DEFAULT '',
  demo_video_link text DEFAULT '',
  track_id uuid REFERENCES public.tracks(id) ON DELETE SET NULL,
  hackathon_id uuid REFERENCES public.hackathons(id) ON DELETE SET NULL,
  team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status public.project_status NOT NULL DEFAULT 'pending',
  likes int NOT NULL DEFAULT 0,
  views int NOT NULL DEFAULT 0,
  thumbnail_url text,
  tech_stack jsonb DEFAULT '[]'::jsonb,
  screenshots jsonb DEFAULT '[]'::jsonb,
  ai_summary text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view approved projects" ON public.projects FOR SELECT USING (status = 'approved' OR status = 'winner' OR user_id = auth.uid());
CREATE POLICY "Authenticated can submit projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Owners can update projects" ON public.projects FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Owners can delete projects" ON public.projects FOR DELETE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Judges table
CREATE TABLE public.judges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  hackathon_id uuid REFERENCES public.hackathons(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(user_id, hackathon_id)
);
ALTER TABLE public.judges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Judges can view own assignments" ON public.judges FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins manage judges" ON public.judges FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Scores table
CREATE TABLE public.scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  judge_id uuid REFERENCES public.judges(id) ON DELETE CASCADE NOT NULL,
  idea_score int NOT NULL DEFAULT 0 CHECK (idea_score >= 0 AND idea_score <= 30),
  execution_score int NOT NULL DEFAULT 0 CHECK (execution_score >= 0 AND execution_score <= 50),
  presentation_score int NOT NULL DEFAULT 0 CHECK (presentation_score >= 0 AND presentation_score <= 20),
  total_score int GENERATED ALWAYS AS (idea_score + execution_score + presentation_score) STORED,
  feedback text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(project_id, judge_id)
);
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Judges can view own scores" ON public.scores FOR SELECT TO authenticated USING (judge_id IN (SELECT id FROM public.judges WHERE user_id = auth.uid()));
CREATE POLICY "Judges can insert scores" ON public.scores FOR INSERT TO authenticated WITH CHECK (judge_id IN (SELECT id FROM public.judges WHERE user_id = auth.uid()));
CREATE POLICY "Judges can update own scores" ON public.scores FOR UPDATE TO authenticated USING (judge_id IN (SELECT id FROM public.judges WHERE user_id = auth.uid()));
CREATE POLICY "Admins manage scores" ON public.scores FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Support tickets table
CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status public.ticket_status NOT NULL DEFAULT 'open',
  admin_response text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own tickets" ON public.support_tickets FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can create tickets" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins manage tickets" ON public.support_tickets FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Mentor profiles table
CREATE TABLE public.mentor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  expertise text DEFAULT '',
  company text DEFAULT '',
  photo_url text,
  available boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view mentors" ON public.mentor_profiles FOR SELECT USING (true);
CREATE POLICY "Admins manage mentors" ON public.mentor_profiles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Sponsor credits table
CREATE TABLE public.sponsor_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_name text NOT NULL,
  description text DEFAULT '',
  claim_code text,
  instructions text DEFAULT '',
  logo_url text,
  hackathon_id uuid REFERENCES public.hackathons(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.sponsor_credits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can view credits" ON public.sponsor_credits FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage credits" ON public.sponsor_credits FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Calculate project final score function
CREATE OR REPLACE FUNCTION public.calculate_project_score(p_project_id uuid)
RETURNS numeric
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(AVG(total_score), 0)
  FROM public.scores
  WHERE project_id = p_project_id;
$$;

-- Storage bucket for project assets
INSERT INTO storage.buckets (id, name, public) VALUES ('project-assets', 'project-assets', true);

-- Storage RLS for project-assets
CREATE POLICY "Anyone can view project assets" ON storage.objects FOR SELECT USING (bucket_id = 'project-assets');
CREATE POLICY "Authenticated can upload project assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'project-assets');
CREATE POLICY "Users can update own project assets" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'project-assets' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can delete own project assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'project-assets' AND (storage.foldername(name))[1] = auth.uid()::text);
