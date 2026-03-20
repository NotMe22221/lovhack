
DROP VIEW IF EXISTS public.sponsor_credits_public;
CREATE VIEW public.sponsor_credits_public
WITH (security_invoker = true) AS
SELECT id, sponsor_name, description, instructions, logo_url, hackathon_id, created_at
FROM public.sponsor_credits;

GRANT SELECT ON public.sponsor_credits_public TO authenticated;
GRANT SELECT ON public.sponsor_credits_public TO anon;
