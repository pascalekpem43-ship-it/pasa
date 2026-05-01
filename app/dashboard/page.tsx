import { createClient } from '@/lib/supabase/server'
import BalanceCard from '@/components/BalanceCard'
import TransactionList from '@/components/TransactionList'
import Chart from '@/components/Chart'
import Link from 'next/link'
import { ArrowRight, AlertCircle } from 'lucide-react'

export default async function DashboardPage() {
  const hasEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  let user: any = null
  let account = { balance: 0 }
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

  // Set fallback user info only (no fake transactions or balances)
  if (!user) {
    user = { id: 'no-user', email: '', user_metadata: { name: 'User' } }
  }

  const income = transactions
    .filter(tx => tx.receiver_id === user.id && tx.status === 'completed')
    .reduce((sum, tx) => sum + Number(tx.amount), 0)

  const expenses = transactions
    .filter(tx => tx.sender_id === user.id && tx.status === 'completed')
    .reduce((sum, tx) => sum + Number(tx.amount), 0)

  const firstName = (user?.user_metadata?.name || 'User').split(' ')[0]

  return (
    <div className="space-y-6 md:space-y-8">
      {!hasEnv && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3 text-amber-400 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>
            Supabase environment variables are missing. Please configure <code>.env.local</code> with your credentials.
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-zinc-500 mt-1 text-sm">Here&apos;s your financial overview.</p>
        </div>
        <Link 
          href="/dashboard/send"
          className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 shrink-0 text-sm w-full sm:w-auto"
        >
          Send Money <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BalanceCard 
            balance={account.balance} 
            userName={user?.user_metadata?.name || 'Apex Member'} 
            income={income}
            expenses={expenses}
          />
        </div>
        <div className="lg:col-span-2">
          <Chart transactions={transactions} currentUserId={user?.id || ''} />
        </div>
      </div>

      {/* Transactions */}
      <TransactionList transactions={transactions.slice(0, 5)} currentUserId={user?.id || ''} />
    </div>
  )
}
