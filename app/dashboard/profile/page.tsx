import { createClient } from '@/lib/supabase/server'
import { AlertCircle, Mail, ShieldCheck } from 'lucide-react'

export default async function ProfilePage() {
  const hasEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  let user: any = null

  if (hasEnv) {
    try {
      const supabase = await createClient()
      const { data } = await supabase.auth.getUser()
      user = data?.user
    } catch (err) {
      console.error('Profile fetch error:', err)
    }
  }

  if (!user) {
    user = { id: 'no-user', email: '', user_metadata: { name: 'User' } }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 mt-0 md:mt-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Profile & Settings</h1>
        <p className="text-zinc-400 mt-1 text-sm md:text-base">Manage your identity and account security.</p>
      </div>

      {!hasEnv && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center gap-3 text-amber-400 text-sm">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>Please configure Supabase keys to view your profile.</span>
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 md:p-8 space-y-5 md:space-y-6 shadow-2xl shadow-zinc-950/50">
        <div className="flex items-center gap-3 md:gap-4 pb-5 md:pb-6 border-b border-zinc-800">
          <div className="h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg md:text-xl shadow-inner shrink-0">
            {user?.user_metadata?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-white truncate">{user?.user_metadata?.name || 'User'}</h3>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-zinc-950 border border-zinc-800/50 rounded-2xl">
            <div className="bg-zinc-900 p-2.5 md:p-3 rounded-xl text-zinc-400 shrink-0">
              <Mail className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Email Address</p>
              <p className="text-zinc-200 text-sm font-medium mt-0.5 truncate">{user.email || 'Not configured'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-zinc-950 border border-zinc-800/50 rounded-2xl">
            <div className="bg-zinc-900 p-2.5 md:p-3 rounded-xl text-zinc-400 shrink-0">
              <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Account Security</p>
              <p className="text-emerald-400 text-sm font-medium mt-0.5 flex items-center gap-1">
                Verified & Active
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 text-center text-zinc-600 text-xs">
          Security token refreshed dynamically on session access.
        </div>
      </div>
    </div>
  )
}
