
-- Create project_likes table
CREATE TABLE public.project_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(project_id, user_id)
);

ALTER TABLE public.project_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view likes" ON public.project_likes FOR SELECT USING (true);
CREATE POLICY "Users can insert own likes" ON public.project_likes FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can delete own likes" ON public.project_likes FOR DELETE USING (user_id = auth.uid());

-- Create increment_views function
CREATE OR REPLACE FUNCTION public.increment_views(p_project_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.projects SET views = views + 1 WHERE id = p_project_id;
$$;

-- Create toggle_like function
CREATE OR REPLACE FUNCTION public.toggle_like(p_project_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _liked boolean;
BEGIN
  IF EXISTS (SELECT 1 FROM public.project_likes WHERE project_id = p_project_id AND user_id = auth.uid()) THEN
    DELETE FROM public.project_likes WHERE project_id = p_project_id AND user_id = auth.uid();
    UPDATE public.projects SET likes = GREATEST(likes - 1, 0) WHERE id = p_project_id;
    _liked := false;
  ELSE
    INSERT INTO public.project_likes (project_id, user_id) VALUES (p_project_id, auth.uid());
    UPDATE public.projects SET likes = likes + 1 WHERE id = p_project_id;
    _liked := true;
  END IF;
  RETURN _liked;
END;
$$;
