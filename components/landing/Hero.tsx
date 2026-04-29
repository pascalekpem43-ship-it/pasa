import Link from 'next/link'
import { ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-zinc-950 text-zinc-50">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
          {/* Text Content */}
          <div className="flex-1 space-y-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-full px-4 py-1.5 text-zinc-300 text-xs font-medium shadow-sm select-none">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Secure & FDIC Insured up to $250k
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Banking built for <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                hyper-growth.
              </span>
            </h1>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Unlock instant asset routing, global integrations, and multi-node liquidity dashboards designed meticulously for scaling operations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link 
                href="/signup" 
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-98 text-base"
              >
                Open Account <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                href="#features" 
                className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 text-zinc-300 font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-1 transition-all duration-300 active:scale-98 text-base"
              >
                Explore Features <ChevronRight className="h-4 w-4 text-zinc-500" />
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-zinc-500 text-xs">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> 256-bit Security
              </span>
              <span>•</span>
              <span>No Annual Fees</span>
              <span>•</span>
              <span>24/7 Coverage</span>
            </div>
          </div>

          {/* Visual Mockup */}
          <div className="flex-1 relative w-full max-w-xl mx-auto lg:max-w-none lg:w-auto group">
            <div className="relative rounded-[2rem] bg-zinc-900/50 border border-zinc-800/50 p-4 shadow-2xl shadow-zinc-950/50 backdrop-blur-md transform transition-all duration-500 hover:scale-[1.01] hover:border-zinc-700/50">
              {/* Card design mock inside hero */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-zinc-500 text-xs font-medium tracking-wider uppercase">Available Balance</p>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">$84,254.00</h3>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1.5 rounded-full font-bold">
                    +12.5%
                  </span>
                </div>

                {/* Visual bar chart placeholder */}
                <div className="flex items-end gap-2 h-32 pt-4">
                  <div className="flex-1 bg-zinc-800/50 rounded-lg h-12 transition-all hover:bg-emerald-500/20" />
                  <div className="flex-1 bg-zinc-800/50 rounded-lg h-20 transition-all hover:bg-emerald-500/20" />
                  <div className="flex-1 bg-zinc-800/50 rounded-lg h-16 transition-all hover:bg-emerald-500/20" />
                  <div className="flex-1 bg-emerald-500/20 border-t border-emerald-400/30 rounded-lg h-28 transition-all hover:bg-emerald-500/30" />
                  <div className="flex-1 bg-zinc-800/50 rounded-lg h-24 transition-all hover:bg-emerald-500/20" />
                </div>
                
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-zinc-400 text-xs">
                  <span className="font-mono">**** **** **** 4890</span>
                  <span>Apex Card Platinum</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
