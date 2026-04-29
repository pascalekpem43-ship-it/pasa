import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const hasEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  let user: any = null
  let loans: any[] = []
  let isAdmin = false

  if (hasEnv) {
    try {
      const supabase = await createClient()
      const { data: userData } = await supabase.auth.getUser()
      user = userData?.user

      if (user) {
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()

        isAdmin = profile?.role === 'admin'

        if (isAdmin) {
          const { data: loansData } = await supabase
            .from('loans')
            .select(`
              id,
              amount,
              status,
              created_at,
              interest_rate,
              user_id,
              users!user_id(name, email)
            `)
            .order('created_at', { ascending: false })

          if (loansData) {
            loans = loansData
          }
        }
      }
    } catch (err) {
      console.error('Admin data fetch error:', err)
    }
  }

  // Fallback/Mock for local dev if no env or not admin (for demo purposes)
  if (!isAdmin && !hasEnv) {
    isAdmin = true
    user = { id: 'admin-id', email: 'admin@apexbank.com', user_metadata: { name: 'System Admin' } }
    loans = [
      {
        id: 'loan-mock-1',
        amount: 25000.00,
        interest_rate: 5.00,
        status: 'pending',
        created_at: new Date().toISOString(),
        users: { name: 'John Doe', email: 'john@example.com' }
      },
      {
        id: 'loan-mock-2',
        amount: 5000.00,
        interest_rate: 5.00,
        status: 'approved',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        users: { name: 'Jane Smith', email: 'jane@example.com' }
      }
    ]
  } else if (!isAdmin && hasEnv) {
    // Redirect non-admins to dashboard
    redirect('/dashboard')
  }

  return <AdminDashboard loans={loans} isAdmin={isAdmin} />
}
