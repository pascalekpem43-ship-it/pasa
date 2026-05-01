'use client'

import { useState } from 'react'
import { sendMoney } from '@/app/actions/transactions'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function SendMoneyPage() {
  const [state, setState] = useState<{ error?: string; success?: boolean }>({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setState({})

    const formData = new FormData(e.currentTarget)
    const res = await sendMoney({}, formData)

    if (res?.error) {
      setState({ error: res.error })
    } else if (res?.success) {
      setState({ success: true })
      e.currentTarget.reset()
    }
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 mt-0 md:mt-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Send Money</h1>
        <p className="text-zinc-400 mt-1 text-sm md:text-base">Transfer funds instantly to any ApexBank user.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 md:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          {state.error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 flex items-center gap-3 text-rose-400 text-sm">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          {state.success && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3 text-emerald-400 text-sm">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <span>Transaction completed successfully!</span>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
              Receiver Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm md:text-base"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-zinc-300">
              Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              min="0.01"
              step="0.01"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-lg font-semibold"
              placeholder="0.00"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-bold px-6 py-3.5 md:py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 mt-6 md:mt-8 text-sm md:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
                Processing...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send Funds
              </>
            )}
          </button>
        </form>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-4 text-center">
        <p className="text-zinc-500 text-xs">
          Funds are transferred instantly and securely under encrypted digital frameworks.
        </p>
      </div>
    </div>
  )
}
