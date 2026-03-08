
-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  hackathon_id UUID REFERENCES public.hackathons(id) ON DELETE SET NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins manage announcements"
  ON public.announcements
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Authenticated users can read published announcements
CREATE POLICY "Authenticated can view published announcements"
  ON public.announcements
  FOR SELECT
  TO authenticated
  USING (published = true);
