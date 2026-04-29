const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vtacutnducppsozisoiz.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0YWN1dG5kdWNwcHNvemlzb2l6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM2OTUzOCwiZXhwIjoyMDkyOTQ1NTM4fQ.nlUyAI-tAOAWgztszwHuv10LSfzwhbd75dJKg-F25rk';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function main() {
  const { data, error } = await supabase.from('loans').select('*');
  if (error) {
    console.log('Error querying loans:', error.message);
  } else {
    console.log('Loans table exists! Data:', data);
  }
}

main();
