-- Create RPC function for public certificate verification (no email exposure)
CREATE OR REPLACE FUNCTION public.verify_certificate(p_certificate_id TEXT)
RETURNS TABLE (
  certificate_id TEXT,
  recipient_name TEXT,
  certificate_type TEXT,
  hackathon_name TEXT,
  issuer_name TEXT,
  issued_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    c.certificate_id,
    c.recipient_name,
    c.certificate_type::TEXT,
    c.hackathon_name,
    c.issuer_name,
    c.issued_at
  FROM public.certificates c
  WHERE c.certificate_id = p_certificate_id
  LIMIT 1;
$$;

-- Drop old permissive policy
DROP POLICY IF EXISTS "Anyone can view certificates" ON public.certificates;

-- Create restrictive policy - only admins can SELECT from certificates table directly
CREATE POLICY "Only admins can view certificates directly"
ON public.certificates
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));