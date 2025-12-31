-- Create storage bucket for generated certificates
INSERT INTO storage.buckets (id, name, public) 
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to certificates
CREATE POLICY "Public can view certificates"
ON storage.objects FOR SELECT
USING (bucket_id = 'certificates');

-- Allow authenticated admins to upload certificates
CREATE POLICY "Admins can upload certificates"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'certificates' AND 
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Allow admins to delete certificates
CREATE POLICY "Admins can delete certificates"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'certificates' AND 
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);