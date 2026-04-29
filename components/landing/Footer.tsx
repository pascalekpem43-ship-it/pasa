import Link from 'next/link'
import { Building2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-500 text-xs">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex items-center gap-2 font-bold text-base tracking-tight text-zinc-300 select-none">
          <Building2 className="h-5 w-5 text-emerald-400" />
          <span>ApexBank</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-zinc-300 transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-zinc-300 transition">Terms of Use</Link>
          <Link href="/docs" className="hover:text-zinc-300 transition">API Docs</Link>
        </div>

        <div>
          &copy; {new Date().getFullYear()} ApexBank Global Inc.
        </div>

      </div>
    </footer>
  )
}
