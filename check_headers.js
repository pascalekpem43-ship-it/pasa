async function main() {
  const res = await fetch('https://vtacutnducppsozisoiz.supabase.co/rest/v1/', {
    headers: {
      'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0YWN1dG5kdWNwcHNvemlzb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNjk1MzgsImV4cCI6MjA5Mjk0NTUzOH0.e951EcQzKcdHMcDwrUlZYP19JH9JrKvdZaUgBKpUrrI'
    }
  });
  console.log('Status:', res.status);
  console.log('Headers:', [...res.headers.entries()]);
}

main();
