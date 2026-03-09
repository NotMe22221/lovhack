CREATE POLICY "Users can view own certificates"
ON public.certificates FOR SELECT
TO authenticated
USING (recipient_email = (
  SELECT email FROM auth.users WHERE id = auth.uid()
));