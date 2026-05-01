import { createClient } from '@/lib/supabase/server'
import { AlertCircle, Banknote, Landmark, CheckCircle2, Inbox } from 'lucide-react'
import LoanApplyForm from '@/components/LoanApplyForm'

export default async function LoansPage() {
  const hasEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  let user: any = null
  let loans: any[] = []
  let account = { balance: 0 }

  if (hasEnv) {
    try {
      const supabase = await createClient()
      const { data: userData } = await supabase.auth.getUser()
      user = userData?.user

      if (user) {
        // Fetch account balance
        const { data: accountData } = await supabase
          .from('accounts')
          .select('balance')
          .eq('user_id', user.id)
          .single()
        
        if (accountData) {
          account = accountData
        }

        // Fetch loans
        const { data: loansData, error: loansError } = await supabase
          .from('loans')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (loansData) {
          loans = loansData
        }
      }
    } catch (err) {
      console.error('Loans data fetch error:', err)
    }
  }

  if (!user) {
    user = { id: 'no-user', email: '', user_metadata: { name: 'User' } }
  }

  const totalBorrowed = loans
    .filter(l => l.status === 'approved' || l.status === 'pending')
    .reduce((sum, l) => sum + Number(l.amount), 0)

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Landmark className="h-7 w-7 md:h-8 md:w-8 text-emerald-400" />
            Loans & Financing
          </h1>
          <p className="text-zinc-400 mt-1 text-sm md:text-base">Manage your active loans and apply for new financing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-zinc-950/40 border border-zinc-800/50 rounded-2xl p-5 md:p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 font-medium text-sm">Active Loans</span>
            <Banknote className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white mt-3">
            ${totalBorrowed.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-zinc-500 mt-1">Total outstanding financing</p>
        </div>

        <div className="bg-zinc-950/40 border border-zinc-800/50 rounded-2xl p-5 md:p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400 font-medium text-sm">Current APR</span>
            <span className="text-emerald-400 font-bold text-lg">5.00%</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white mt-3">Fixed Rate</p>
          <p className="text-xs text-zinc-500 mt-1">Standard interest rate applied</p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 md:p-6 backdrop-blur-xl sm:col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-semibold text-sm">Quick Apply</span>
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-lg md:text-xl font-bold text-white mt-3">Need more funds?</p>
          <p className="text-xs text-emerald-400/80 mt-1">Instant approval up to $50,000</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-1">
          <LoanApplyForm />
        </div>

        <div className="lg:col-span-2 bg-zinc-950/40 border border-zinc-800/50 rounded-2xl p-4 md:p-6 backdrop-blur-xl">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4">Your Loan History</h2>
          
          {loans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 md:py-12 text-center">
              <div className="bg-zinc-800/30 rounded-2xl p-4 mb-3">
                <Inbox className="h-8 w-8 text-zinc-600" />
              </div>
              <p className="text-zinc-500 text-sm font-medium">No loan history</p>
              <p className="text-zinc-600 text-xs mt-1">Apply for a loan to see your history here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full text-left border-collapse min-w-[400px]">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                    <th className="py-3 md:py-4 px-4">Date</th>
                    <th className="py-3 md:py-4 px-4">Amount</th>
                    <th className="py-3 md:py-4 px-4">Interest</th>
                    <th className="py-3 md:py-4 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 text-sm text-zinc-300">
                  {loans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-zinc-900/20 transition-colors">
                      <td className="py-3 md:py-4 px-4 text-zinc-400 text-xs md:text-sm">
                        {new Date(loan.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="py-3 md:py-4 px-4 font-semibold text-white text-sm">
                        ${Number(loan.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 md:py-4 px-4 text-zinc-400 text-sm">
                        {loan.interest_rate}%
                      </td>
                      <td className="py-3 md:py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            loan.status === 'approved'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : loan.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-400'
                              : loan.status === 'paid'
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
