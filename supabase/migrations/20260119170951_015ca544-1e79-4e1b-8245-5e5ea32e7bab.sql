-- Add image_url column to certificates table for certificate preview images
ALTER TABLE public.certificates ADD COLUMN image_url TEXT;