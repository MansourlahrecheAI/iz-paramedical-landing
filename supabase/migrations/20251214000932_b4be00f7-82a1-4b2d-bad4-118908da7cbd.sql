-- Drop the insecure view that exposes auth.users
DROP VIEW IF EXISTS public.admin_users;

-- Create a secure function to get admin users (only callable by admins)
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS TABLE (
    user_id UUID,
    email TEXT,
    role app_role,
    role_assigned_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if the calling user is an admin
    IF NOT public.is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied: Admin role required';
    END IF;
    
    RETURN QUERY
    SELECT 
        ur.user_id,
        u.email::TEXT,
        ur.role,
        ur.created_at as role_assigned_at
    FROM public.user_roles ur
    INNER JOIN auth.users u ON u.id = ur.user_id;
END;
$$;