-- Fix overly permissive team creation policy (WITH CHECK (true) -> proper check)
DROP POLICY "Authenticated can create teams" ON public.teams;
CREATE POLICY "Authenticated can create teams"
  ON public.teams FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);