-- Loans Table
CREATE TABLE IF NOT EXISTS public.loans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(15, 2) NOT NULL CHECK (amount > 0),
    interest_rate NUMERIC(5, 2) DEFAULT 5.00 NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'paid')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on loans
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

-- Loans RLS Policies
CREATE POLICY "Users can view their own loans" ON public.loans
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own loans" ON public.loans
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update loans" ON public.loans
    FOR UPDATE USING (
        (SELECT role FROM public.users WHERE id = auth.uid()) = 'admin'
    );
