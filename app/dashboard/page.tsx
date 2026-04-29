import { createClient } from '@/lib/supabase/server'
import BalanceCard from '@/components/BalanceCard'
import TransactionList from '@/components/TransactionList'
import Chart from '@/components/Chart'
import Link from 'next/link'
import { ArrowRight, AlertCircle } from 'lucide-react'

export default async function DashboardPage() {
  const hasEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  let user: any = null
  let account = { balance: 1000.00 }
  let transactions: any[] = []

  if (hasEnv) {
    try {
      const supabase = await createClient()
      const { data: userData } = await supabase.auth.getUser()
      user = userData?.user

      if (user) {
        // Get or create account balance safely
        const { data: accountData } = await supabase
          .from('accounts')
          .select('*')
          .eq('user_id', user.id)
          .single()
        
        if (accountData) {
          account = accountData
        }

        // Fetch recent transactions
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
          .limit(50)

        if (txData) {
          transactions = txData
        }
      }
    } catch (err) {
      console.error('Dashboard data fetch error:', err)
    }
  }

  // Fallback data spanning multiple months for the chart
  if (!user || transactions.length === 0) {
    if (!user) {
      user = { id: 'mock-id', email: 'demo@apexbank.com', user_metadata: { name: 'Demo User' } }
    }
    transactions = [
      { 
        id: '1', 
        sender_id: 'mock-id', 
        receiver_id: 'other', 
        amount: 250.00, 
        status: 'completed', 
        created_at: new Date().toISOString(), 
        receiver: { name: 'Sarah Jenkins', email: 'sarah@example.com' } 
      },
      { 
        id: '2', 
        sender_id: 'other', 
        receiver_id: 'mock-id', 
        amount: 1200.00, 
        status: 'completed', 
        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), 
        sender: { name: 'Acme Corp', email: 'acme@example.com' } 
      },
      { 
        id: '3', 
        sender_id: 'mock-id', 
        receiver_id: 'other', 
        amount: 450.00, 
        status: 'completed', 
        created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), 
        receiver: { name: 'Netflix', email: 'billing@netflix.com' } 
      },
      { 
        id: '4', 
        sender_id: 'mock-id', 
        receiver_id: 'other', 
        amount: 800.00, 
        status: 'completed', 
        created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), 
        receiver: { name: 'Apple Store', email: 'apple@example.com' } 
      },
      { 
        id: '5', 
        sender_id: 'other', 
        receiver_id: 'mock-id', 
        amount: 2000.00, 
        status: 'completed', 
        created_at: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), 
        sender: { name: 'Hustle Inc.', email: 'hustle@example.com' } 
      }
    ]
  }

  const income = transactions
    .filter(tx => tx.receiver_id === (user?.id || 'mock-id') && tx.status === 'completed')
    .reduce((sum, tx) => sum + Number(tx.amount), 0)

  const expenses = transactions
    .filter(tx => tx.sender_id === (user?.id || 'mock-id') && tx.status === 'completed')
    .reduce((sum, tx) => sum + Number(tx.amount), 0)

  return (
    <div className="space-y-8">
      {!hasEnv && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3 text-amber-400 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>
            Supabase environment variables are missing. Please configure <code>.env.local</code> with your credentials.
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Welcome back, {user?.user_metadata?.name || 'User'}
          </h1>
          <p className="text-zinc-400 mt-1">Here's a summary of your digital wallet today.</p>
        </div>
        <Link 
          href="/dashboard/send"
          className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 shrink-0"
        >
          Send Money <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <BalanceCard 
            balance={account.balance} 
            userName={user?.user_metadata?.name || 'Apex Member'} 
            income={income}
            expenses={expenses}
          />
        </div>
        <div className="lg:col-span-2">
          <Chart transactions={transactions} currentUserId={user?.id || 'mock-id'} />
        </div>
      </div>

      <div className="mt-8">
        <TransactionList transactions={transactions.slice(0, 5)} currentUserId={user?.id || ''} />
      </div>
    </div>
  )
}
