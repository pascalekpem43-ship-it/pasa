'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Send, History, User, LogOut, Building2, Landmark, Shield } from 'lucide-react'
import { signOut } from '@/app/actions/auth'
import { createClient } from '@/lib/supabase/client'

const baseRoutes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
  },
  {
    label: 'Send Money',
    icon: Send,
    href: '/dashboard/send',
  },
  {
    label: 'Loans',
    icon: Landmark,
    href: '/dashboard/loans',
  },
  {
    label: 'Transactions',
    icon: History,
    href: '/dashboard/transactions',
  },
  {
    label: 'Profile',
    icon: User,
    href: '/dashboard/profile',
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [routes, setRoutes] = useState(baseRoutes)

  useEffect(() => {
    async function checkAdmin() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single()

          if (profile?.role === 'admin') {
            setRoutes(prev => {
              if (prev.some(r => r.href === '/dashboard/admin')) return prev
              const newRoutes = [...prev]
              newRoutes.splice(3, 0, {
                label: 'Admin Panel',
                icon: Shield,
                href: '/dashboard/admin',
              })
              return newRoutes
            })
          }
        } else {
          const hasEnv = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          if (!hasEnv) {
            setRoutes(prev => {
              if (prev.some(r => r.href === '/dashboard/admin')) return prev
              const newRoutes = [...prev]
              newRoutes.splice(3, 0, {
                label: 'Admin Panel',
                icon: Shield,
                href: '/dashboard/admin',
              })
              return newRoutes
            })
          }
        }
      } catch (err) {
        console.error('Sidebar admin check error:', err)
      }
    }

    checkAdmin()
  }, [])


  return (
    <div className="flex h-full flex-col bg-zinc-950 text-white w-64 border-r border-zinc-800">
      <div className="p-6 flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-400">
        <Building2 className="h-6 w-6" />
        <span>ApexBank</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 mt-6">
        {routes.map((route) => {
          const Icon = route.icon
          const isActive = pathname === route.href
          
          return (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
              {route.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-zinc-900">
        <button
          onClick={async () => {
            await signOut()
            window.location.href = '/login'
          }}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all duration-200"
        >
          <LogOut className="h-5 w-5 text-zinc-400" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
