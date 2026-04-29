-- Migration: Add roles to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- Update existing users with admin emails
UPDATE public.users 
SET role = 'admin' 
WHERE email IN ('kariakistephen809@gmail.com', 'kariakistephen94@gmail.com');

-- Update the handle_new_user trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.email,
    CASE 
      WHEN NEW.email IN ('kariakistephen809@gmail.com', 'kariakistephen94@gmail.com') THEN 'admin'
      ELSE 'user'
    END
  );

  INSERT INTO public.accounts (user_id, balance)
  VALUES (NEW.id, 1000.00);

  RETURN NEW;
END;
$$;
