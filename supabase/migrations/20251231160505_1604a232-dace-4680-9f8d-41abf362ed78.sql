-- Create enums for roles and certificate types
CREATE TYPE public.app_role AS ENUM ('admin', 'user');
CREATE TYPE public.certificate_type AS ENUM ('participant', 'winner_1', 'winner_2', 'winner_3', 'winner_4', 'winner_5', 'winner_6', 'winner_7', 'winner_8', 'winner_9', 'winner_10');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Create certificates table
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id TEXT UNIQUE NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  certificate_type certificate_type NOT NULL,
  hackathon_name TEXT DEFAULT 'LovHack 2026',
  issuer_name TEXT DEFAULT 'LovHack Team',
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (recipient_email, certificate_type)
);

-- Enable RLS on both tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for certificates table
-- Public can view certificates (for verification)
CREATE POLICY "Anyone can view certificates"
ON public.certificates
FOR SELECT
TO anon, authenticated
USING (true);

-- Only admins can insert certificates
CREATE POLICY "Admins can insert certificates"
ON public.certificates
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update certificates
CREATE POLICY "Admins can update certificates"
ON public.certificates
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete certificates
CREATE POLICY "Admins can delete certificates"
ON public.certificates
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for user_roles table
-- Users can view their own roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Only admins can manage all roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));