
CREATE OR REPLACE VIEW public.sponsor_credits_public AS
SELECT id, sponsor_name, description, instructions, logo_url, hackathon_id, created_at
FROM public.sponsor_credits;

GRANT SELECT ON public.sponsor_credits_public TO authenticated;
GRANT SELECT ON public.sponsor_credits_public TO anon;
