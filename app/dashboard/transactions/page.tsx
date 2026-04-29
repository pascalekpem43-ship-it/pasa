import { createClient } from '@/lib/supabase/server'
import TransactionHistory from '@/components/TransactionHistory'
import { AlertCircle } from 'lucide-react'

export default async function TransactionsPage() {
  const hasEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  let user: any = null
  let transactions: any[] = []

  if (hasEnv) {
    try {
      const supabase = await createClient()
      const { data: userData } = await supabase.auth.getUser()
      user = userData?.user

      if (user) {
        const { data: txData } = await supabase
          .from('transactions')
          .select(`
            id,
            sender_id,
            receiver_id,
            amount,
            status,
            created_at,
            sender:users!sender_id(name, email),
            receiver:users!receiver_id(name, email)
          `)
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false })

        if (txData) {
          transactions = txData
        }
      }
    } catch (err) {
      console.error('Transactions data fetch error:', err)
    }
  }

  if (!user) {
    // Mock data for preview if not logged in or no env
    user = { id: 'mock-id', email: 'demo@apexbank.com' }
    transactions = [
      { 
        id: '1', 
        sender_id: 'mock-id', 
        receiver_id: 'user2', 
        amount: 250.00, 
        status: 'completed', 
        created_at: new Date().toISOString(), 
        receiver: { name: 'Sarah Jenkins', email: 'sarah@example.com' } 
      },
      { 
        id: '2', 
        sender_id: 'user3', 
        receiver_id: 'mock-id', 
        amount: 1200.00, 
        status: 'completed', 
        created_at: new Date(Date.now() - 86400000).toISOString(), 
        sender: { name: 'Acme Corp', email: 'acme@example.com' } 
      },
      { 
        id: '3', 
        sender_id: 'mock-id', 
        receiver_id: 'user4', 
        amount: 45.99, 
        status: 'completed', 
        created_at: new Date(Date.now() - 172800000).toISOString(), 
        receiver: { name: 'Starbucks', email: 'billing@starbucks.com' } 
      },
    ]
  }

  return (
    <div className="space-y-8">
      {!hasEnv && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3 text-amber-400 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>
            Supabase environment variables are missing. Showing demo history.
          </span>
        </div>
      )}

      <TransactionHistory initialTransactions={transactions} currentUserId={user.id} />
    </div>
  )
}
