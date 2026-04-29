'use client'

import { useState } from 'react'
import { approveLoan, rejectLoan, fundAdminWallet } from '@/app/actions/loans'
import { Shield, Check, X, Banknote, Landmark, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function AdminDashboard({ loans: initialLoans, isAdmin }: { loans: any[]; isAdmin: boolean }) {
  const [loans, setLoans] = useState(initialLoans)
  const [state, setState] = useState<{ error?: string; success?: boolean; message?: string }>({})
  const [loading, setLoading] = useState<string | null>(null)

  async function handleApprove(loanId: string) {
    setLoading(`approve-${loanId}`)
    setState({})
    const res = await approveLoan(loanId)
    if (res?.error) {
      setState({ error: res.error })
    } else {
      setState({ success: true, message: res.message })
      setLoans(loans.map(l => l.id === loanId ? { ...l, status: 'approved' } : l))
    }
    setLoading(null)
  }

  async function handleReject(loanId: string) {
    setLoading(`reject-${loanId}`)
    setState({})
    const res = await rejectLoan(loanId)
    if (res?.error) {
      setState({ error: res.error })
    } else {
      setState({ success: true, message: res.message })
      setLoans(loans.map(l => l.id === loanId ? { ...l, status: 'rejected' } : l))
    }
    setLoading(null)
  }

  async function handleFund(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading('fund')
    setState({})

    const formData = new FormData(e.currentTarget)
    const amountStr = formData.get('amount') as string
    const amount = parseFloat(amountStr)

    if (isNaN(amount) || amount <= 0) {
      setState({ error: 'Invalid amount' })
      setLoading(null)
      return
    }

    const res = await fundAdminWallet(amount)
    if (res?.error) {
      setState({ error: res.error })
    } else {
      setState({ success: true, message: res.message })
      e.currentTarget.reset()
    }
    setLoading(null)
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-3xl">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white">Access Denied</h2>
        <p className="text-zinc-400 mt-2">You do not have administrative privileges.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {state.error && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center gap-3 text-rose-400 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {state.success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3 text-emerald-400 text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fund Wallet Card */}
        <div className="bg-zinc-950/40 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl md:col-span-1 h-fit">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Banknote className="h-5 w-5 text-emerald-400" />
            Fund Admin Wallet
          </h2>
          <form onSubmit={handleFund} className="space-y-4">
            <div>
              <input
                type="number"
                name="amount"
                className="block w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-center text-xl font-bold"
                placeholder="$10,000"
                defaultValue="10000"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading === 'fund'}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-emerald-500/25 text-center flex items-center justify-center gap-2"
            >
              {loading === 'fund' ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Deposit Funds'}
            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="bg-zinc-950/40 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl md:col-span-2 flex items-center justify-center text-center">
          <div className="space-y-2">
            <Landmark className="h-12 w-12 text-zinc-600 mx-auto mb-2" />
            <p className="text-zinc-300 font-medium">Administrative Liquidity Pool</p>
            <p className="text-zinc-500 text-sm max-w-md">
              As an administrator, you have permission to approve standard financing applications and execute liquidity injections.
            </p>
          </div>
        </div>
      </div>

      {/* Loans Management */}
      <div className="bg-zinc-950/40 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Pending Loan Applications</h2>
        
        {loans.filter(l => l.status === 'pending').length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            No pending loan requests at this time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                  <th className="py-4 px-4">Applicant</th>
                  <th className="py-4 px-4">Amount</th>
                  <th className="py-4 px-4">Interest</th>
                  <th className="py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 text-sm text-zinc-300">
                {loans
                  .filter(l => l.status === 'pending')
                  .map((loan) => (
                    <tr key={loan.id} className="hover:bg-zinc-900/20 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-semibold text-white">{loan.users?.name || 'Unknown User'}</p>
                        <p className="text-zinc-500 text-xs">{loan.users?.email}</p>
                      </td>
                      <td className="py-4 px-4 font-semibold text-white text-base">
                        ${Number(loan.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-zinc-400">
                        {loan.interest_rate}%
                      </td>
                      <td className="py-4 px-4 flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(loan.id)}
                          disabled={loading !== null}
                          className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 transition-all flex items-center gap-1 text-xs font-semibold disabled:opacity-50"
                        >
                          {loading === `approve-${loan.id}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(loan.id)}
                          disabled={loading !== null}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-all flex items-center gap-1 text-xs font-semibold disabled:opacity-50"
                        >
                          {loading === `reject-${loan.id}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* All Loans History */}
      <div className="bg-zinc-950/40 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">System Loan History</h2>
        
        {loans.filter(l => l.status !== 'pending').length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            No past loan allocations.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-medium uppercase tracking-wider">
                  <th className="py-4 px-4">Applicant</th>
                  <th className="py-4 px-4">Amount</th>
                  <th className="py-4 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 text-sm text-zinc-300">
                {loans
                  .filter(l => l.status !== 'pending')
                  .map((loan) => (
                    <tr key={loan.id} className="hover:bg-zinc-900/20 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-semibold text-white">{loan.users?.name || 'Unknown User'}</p>
                        <p className="text-zinc-500 text-xs">{loan.users?.email}</p>
                      </td>
                      <td className="py-4 px-4 font-semibold text-white">
                        ${Number(loan.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            loan.status === 'approved'
                              ? 'bg-emerald-500/10 text-emerald-400'
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
  )
}
