-- Create app_role enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'super_admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

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

-- Create function to check if user is any admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
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
      AND role IN ('admin', 'super_admin')
  )
$$;

-- RLS policies for user_roles (only admins can view/manage)
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Super admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'super_admin'));

-- Create course_registrations table to track subscriptions
CREATE TABLE public.course_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    surname TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    place_of_birth TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    wilaya TEXT NOT NULL,
    course_slug TEXT NOT NULL,
    package_type TEXT NOT NULL CHECK (package_type IN ('single', 'double', 'triple')),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cod', 'card')),
    total_price INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on course_registrations
ALTER TABLE public.course_registrations ENABLE ROW LEVEL SECURITY;

-- Only admins can view registrations
CREATE POLICY "Admins can view all registrations"
ON public.course_registrations
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Anyone can insert registrations (public form)
CREATE POLICY "Anyone can create registrations"
ON public.course_registrations
FOR INSERT
WITH CHECK (true);

-- Admins can update registrations
CREATE POLICY "Admins can update registrations"
ON public.course_registrations
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Create admin_users view for easier management
CREATE VIEW public.admin_users AS
SELECT 
    u.id,
    u.email,
    ur.role,
    ur.created_at as role_assigned_at
FROM auth.users u
INNER JOIN public.user_roles ur ON u.id = ur.user_id;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_course_registrations_updated_at
BEFORE UPDATE ON public.course_registrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();