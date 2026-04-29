-- Supabase Database Schema for Digital Banking App

-- 1. Users Table (Links to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users RLS Policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow public read access for transfers" ON public.users
    FOR SELECT USING (true);

-- 2. Accounts Table
CREATE TABLE IF NOT EXISTS public.accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    balance NUMERIC(15, 2) DEFAULT 1000.00 NOT NULL CHECK (balance >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on accounts
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

-- Accounts RLS Policies
CREATE POLICY "Users can view their own accounts" ON public.accounts
    FOR SELECT USING (auth.uid() = user_id);

-- 3. Transactions Table
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    receiver_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    amount NUMERIC(15, 2) NOT NULL CHECK (amount > 0),
    status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Transactions RLS Policies
CREATE POLICY "Users can view transactions they are involved in" ON public.transactions
    FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- 4. Transfer Money Function (Atomic)
CREATE OR REPLACE FUNCTION public.transfer_money(
  receiver_email TEXT,
  amount_to_send NUMERIC
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sender_uuid UUID;
  receiver_uuid UUID;
  new_transaction_id UUID;
  sender_balance NUMERIC;
BEGIN
  -- Get the sender from auth context
  sender_uuid := auth.uid();
  
  IF sender_uuid IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  -- 1. Get receiver ID
  SELECT id INTO receiver_uuid FROM public.users WHERE email = receiver_email;
  
  IF receiver_uuid IS NULL THEN
    RAISE EXCEPTION 'Receiver not found with email %', receiver_email;
  END IF;

  IF sender_uuid = receiver_uuid THEN
    RAISE EXCEPTION 'You cannot transfer money to yourself';
  END IF;

  IF amount_to_send <= 0 THEN
    RAISE EXCEPTION 'Amount must be greater than zero';
  END IF;

  -- 2. Lock accounts for update to prevent race conditions
  SELECT balance INTO sender_balance FROM public.accounts WHERE user_id = sender_uuid FOR UPDATE;
  
  IF sender_balance IS NULL THEN
    RAISE EXCEPTION 'Sender account not found';
  END IF;

  IF sender_balance < amount_to_send THEN
    RAISE EXCEPTION 'Insufficient funds. Current balance: $%', sender_balance;
  END IF;

  -- 3. Update balances
  UPDATE public.accounts 
  SET balance = balance - amount_to_send 
  WHERE user_id = sender_uuid;

  UPDATE public.accounts 
  SET balance = balance + amount_to_send 
  WHERE user_id = receiver_uuid;

  -- 4. Insert Transaction Record
  INSERT INTO public.transactions (sender_id, receiver_id, amount, status)
  VALUES (sender_uuid, receiver_uuid, amount_to_send, 'completed')
  RETURNING id INTO new_transaction_id;

  RETURN new_transaction_id;
END;
$$;

-- 5. Trigger to create user and account on Auth Signup
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
  VALUES (NEW.id, 1000.00); -- Start with $1000

  RETURN NEW;
END;
$$;

-- Trigger for new user
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


