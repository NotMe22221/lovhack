-- Create storage bucket for certificates (public so PDFs can be downloaded)
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to certificate files
CREATE POLICY "Public can view certificate files"
ON storage.objects FOR SELECT
USING (bucket_id = 'certificates');

-- Add pdf_url column to certificates table to store the file path
ALTER TABLE public.certificates ADD COLUMN IF NOT EXISTS pdf_url TEXT;