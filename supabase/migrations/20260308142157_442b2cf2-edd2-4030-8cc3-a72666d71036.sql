
-- Phase 2: Project comments table
CREATE TABLE public.project_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.project_comments ENABLE ROW LEVEL SECURITY;

-- Anyone can view comments on approved/winner projects
CREATE POLICY "Anyone can view comments on visible projects"
ON public.project_comments FOR SELECT
USING (project_id IN (
  SELECT id FROM public.projects WHERE status IN ('approved', 'winner')
));

-- Authenticated users can add comments
CREATE POLICY "Authenticated users can comment"
ON public.project_comments FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments"
ON public.project_comments FOR DELETE
USING (user_id = auth.uid());

-- Admins can manage all comments
CREATE POLICY "Admins manage comments"
ON public.project_comments FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Phase 4: Add featured column to projects
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;
