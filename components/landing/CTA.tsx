import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative py-24 md:py-32 bg-zinc-950 text-zinc-50 overflow-hidden border-t border-zinc-900/50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Take absolute control over <br className="hidden sm:block" />
          <span className="text-emerald-400">your financial roadmap.</span>
        </h2>
        
        <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Join scaling founders leveraging optimal liquidity frameworks today.
        </p>

        <div className="flex items-center justify-center pt-2">
          <Link 
            href="/signup" 
            className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-10 py-4 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/25 text-base"
          >
            Start Banking Today <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
