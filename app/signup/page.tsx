'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/actions/auth'
import { Building2, AlertCircle, Loader2, ArrowRight } from 'lucide-react'

export default function SignupPage() {
  const [state, setState] = useState<{ error?: string }>({})
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setState({})

    const formData = new FormData(e.currentTarget)
    const res = await signup({}, formData)

    if (res?.error) {
      setState({ error: res.error })
      setLoading(false)
    } else if (res?.success) {
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-zinc-950/50">
        
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-emerald-400">
            <Building2 className="h-8 w-8" />
            <span>ApexBank</span>
          </div>
          <p className="text-zinc-400 text-sm">Open your digital account in minutes.</p>
        </div>

        {state.error && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-center gap-3 text-rose-400 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
                Creating Account...
              </>
            ) : (
              <>
                Get Started
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-zinc-500 text-sm mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-400 hover:underline font-semibold">
            Sign in instead
          </Link>
        </div>

      </div>
    </div>
  )
}
