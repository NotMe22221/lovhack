-- Make recipient_name and recipient_email nullable for empty placeholder records
ALTER TABLE public.certificates ALTER COLUMN recipient_name DROP NOT NULL;
ALTER TABLE public.certificates ALTER COLUMN recipient_email DROP NOT NULL;

-- Drop and recreate verify_certificate function with pdf_url and image_url
DROP FUNCTION IF EXISTS public.verify_certificate(text);

CREATE FUNCTION public.verify_certificate(p_certificate_id text)
 RETURNS TABLE(certificate_id text, recipient_name text, certificate_type text, hackathon_name text, issuer_name text, issued_at timestamp with time zone, pdf_url text, image_url text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT 
    c.certificate_id,
    c.recipient_name,
    c.certificate_type::TEXT,
    c.hackathon_name,
    c.issuer_name,
    c.issued_at,
    c.pdf_url,
    c.image_url
  FROM public.certificates c
  WHERE c.certificate_id = p_certificate_id
  LIMIT 1;
$function$;

-- Insert 50 placeholder certificate records
INSERT INTO public.certificates (certificate_id, recipient_name, recipient_email, certificate_type, hackathon_name, issuer_name)
VALUES
  ('c001-8a2b-4c3d-9e5f-a1b2c3d4e501', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c002-8a2b-4c3d-9e5f-a1b2c3d4e502', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c003-8a2b-4c3d-9e5f-a1b2c3d4e503', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c004-8a2b-4c3d-9e5f-a1b2c3d4e504', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c005-8a2b-4c3d-9e5f-a1b2c3d4e505', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c006-8a2b-4c3d-9e5f-a1b2c3d4e506', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c007-8a2b-4c3d-9e5f-a1b2c3d4e507', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c008-8a2b-4c3d-9e5f-a1b2c3d4e508', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c009-8a2b-4c3d-9e5f-a1b2c3d4e509', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c010-8a2b-4c3d-9e5f-a1b2c3d4e510', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c011-8a2b-4c3d-9e5f-a1b2c3d4e511', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c012-8a2b-4c3d-9e5f-a1b2c3d4e512', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c013-8a2b-4c3d-9e5f-a1b2c3d4e513', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c014-8a2b-4c3d-9e5f-a1b2c3d4e514', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c015-8a2b-4c3d-9e5f-a1b2c3d4e515', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c016-8a2b-4c3d-9e5f-a1b2c3d4e516', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c017-8a2b-4c3d-9e5f-a1b2c3d4e517', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c018-8a2b-4c3d-9e5f-a1b2c3d4e518', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c019-8a2b-4c3d-9e5f-a1b2c3d4e519', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c020-8a2b-4c3d-9e5f-a1b2c3d4e520', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c021-8a2b-4c3d-9e5f-a1b2c3d4e521', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c022-8a2b-4c3d-9e5f-a1b2c3d4e522', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c023-8a2b-4c3d-9e5f-a1b2c3d4e523', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c024-8a2b-4c3d-9e5f-a1b2c3d4e524', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c025-8a2b-4c3d-9e5f-a1b2c3d4e525', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c026-8a2b-4c3d-9e5f-a1b2c3d4e526', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c027-8a2b-4c3d-9e5f-a1b2c3d4e527', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c028-8a2b-4c3d-9e5f-a1b2c3d4e528', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c029-8a2b-4c3d-9e5f-a1b2c3d4e529', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c030-8a2b-4c3d-9e5f-a1b2c3d4e530', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c031-8a2b-4c3d-9e5f-a1b2c3d4e531', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c032-8a2b-4c3d-9e5f-a1b2c3d4e532', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c033-8a2b-4c3d-9e5f-a1b2c3d4e533', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c034-8a2b-4c3d-9e5f-a1b2c3d4e534', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c035-8a2b-4c3d-9e5f-a1b2c3d4e535', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c036-8a2b-4c3d-9e5f-a1b2c3d4e536', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c037-8a2b-4c3d-9e5f-a1b2c3d4e537', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c038-8a2b-4c3d-9e5f-a1b2c3d4e538', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c039-8a2b-4c3d-9e5f-a1b2c3d4e539', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c040-8a2b-4c3d-9e5f-a1b2c3d4e540', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c041-8a2b-4c3d-9e5f-a1b2c3d4e541', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c042-8a2b-4c3d-9e5f-a1b2c3d4e542', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c043-8a2b-4c3d-9e5f-a1b2c3d4e543', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c044-8a2b-4c3d-9e5f-a1b2c3d4e544', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c045-8a2b-4c3d-9e5f-a1b2c3d4e545', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c046-8a2b-4c3d-9e5f-a1b2c3d4e546', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c047-8a2b-4c3d-9e5f-a1b2c3d4e547', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c048-8a2b-4c3d-9e5f-a1b2c3d4e548', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c049-8a2b-4c3d-9e5f-a1b2c3d4e549', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team'),
  ('c050-8a2b-4c3d-9e5f-a1b2c3d4e550', NULL, NULL, 'participant', 'LovHack 2026 Season 1', 'LovHack Team');