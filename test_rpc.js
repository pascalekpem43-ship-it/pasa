const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vtacutnducppsozisoiz.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0YWN1dG5kdWNwcHNvemlzb2l6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM2OTUzOCwiZXhwIjoyMDkyOTQ1NTM4fQ.nlUyAI-tAOAWgztszwHuv10LSfzwhbd75dJKg-F25rk';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const functions = ['exec', 'execute_sql', 'run_sql', 'query', 'sql'];

async function main() {
  for (const fn of functions) {
    console.log(`Trying RPC ${fn}...`);
    const { data, error } = await supabase.rpc(fn, { 
      query: 'SELECT 1', 
      sql: 'SELECT 1', 
      sql_string: 'SELECT 1' 
    });
    
    if (!error) {
      console.log(`Success with ${fn}! Data:`, data);
      return;
    } else {
      console.log(`Failed ${fn}:`, error.message);
    }
  }
}

main();
