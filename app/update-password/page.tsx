'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Building2, AlertCircle, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function UpdatePasswordPage() {
  const [state, setState] = useState<{ error?: string, success?: boolean }>({})
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // The Supabase client automatically handles reading the session from the URL hash
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setState({})

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setState({ error: 'Passwords do not match' })
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setState({ error: error.message })
    } else {
      setState({ success: true })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-zinc-950/50">
        
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-emerald-400">
            <Building2 className="h-8 w-8" />
            <span>ApexBank</span>
          </div>
          <p className="text-zinc-400 text-sm">Update your password.</p>
        </div>

        {state.error && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-center gap-3 text-rose-400 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

        {state.success ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 flex flex-col items-center text-center gap-3 text-emerald-400 text-sm">
            <CheckCircle2 className="h-8 w-8 mb-2" />
            <p>Your password has been successfully updated.</p>
            <Link href="/login" className="mt-4 bg-emerald-500 text-zinc-950 font-bold px-6 py-2 rounded-xl transition-all hover:bg-emerald-600">
              Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
                New Password
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-300">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
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
                  Updating...
                </>
              ) : (
                <>
                  Update Password
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  )
}
