const { Client } = require('pg');

const sql = `
CREATE TABLE IF NOT EXISTS public.loans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(15, 2) NOT NULL CHECK (amount > 0),
    interest_rate NUMERIC(5, 2) DEFAULT 5.00 NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'paid')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Users can view their own loans" ON public.loans;
CREATE POLICY "Users can view their own loans" ON public.loans
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own loans" ON public.loans;
CREATE POLICY "Users can insert their own loans" ON public.loans
    FOR INSERT WITH CHECK (auth.uid() = user_id);
`;

async function tryDirect() {
  const client = new Client({
    user: 'postgres',
    password: 'n9dwW1VSJoYIynQF',
    host: 'db.vtacutnducppsozisoiz.supabase.co',
    port: 5432,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Trying direct connection (db.vtacutnducppsozisoiz.supabase.co)...');
    await client.connect();
    console.log('Connected directly!');
    await client.query(sql);
    console.log('Table created successfully');
    await client.end();
    return true;
  } catch (err) {
    console.error('Direct connection failed:', err.message);
    return false;
  }
}

const regions = [
  'ca-central-1', 'eu-central-1', 'us-east-1', 'us-east-2', 'us-west-1', 'us-west-2',
  'eu-west-1', 'eu-west-2', 'eu-west-3', 'eu-north-1', 'eu-south-1',
  'ap-northeast-1', 'ap-northeast-2', 'ap-northeast-3', 'ap-southeast-1', 'ap-southeast-2', 'ap-south-1',
  'sa-east-1', 'me-south-1', 'af-south-1'
];

async function tryRegion(region) {
  const host = `aws-0-${region}.pooler.supabase.com`;
  const client = new Client({
    user: 'postgres.vtacutnducppsozisoiz',
    password: 'n9dwW1VSJoYIynQF',
    host: host,
    port: 6543,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log(`Trying ${region} (${host})...`);
    await client.connect();
    console.log(`Connected to ${region}!`);
    await client.query(sql);
    console.log('Table created successfully');
    await client.end();
    return true;
  } catch (err) {
    console.error(`Failed ${region}:`, err.message);
    return false;
  }
}

async function main() {
  const success = await tryDirect();
  if (success) return;

  for (const region of regions) {
    const success = await tryRegion(region);
    if (success) break;
  }
}

main();

