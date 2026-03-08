
-- Create project_media table
CREATE TABLE public.project_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  file_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  media_role TEXT NOT NULL DEFAULT 'gallery',
  sort_order INTEGER NOT NULL DEFAULT 0,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;

-- Owners can CRUD their media
CREATE POLICY "Owners can manage their media"
ON public.project_media
FOR ALL
TO authenticated
USING (
  project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
)
WITH CHECK (
  project_id IN (SELECT id FROM public.projects WHERE user_id = auth.uid())
);

-- Anyone can view media for approved/winner projects
CREATE POLICY "Anyone can view approved project media"
ON public.project_media
FOR SELECT
TO anon, authenticated
USING (
  project_id IN (SELECT id FROM public.projects WHERE status IN ('approved', 'winner'))
);

-- Admins manage all media
CREATE POLICY "Admins manage all media"
ON public.project_media
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add video columns to projects
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS demo_video_url TEXT DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tech_video_url TEXT DEFAULT '';
