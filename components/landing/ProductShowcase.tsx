import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ProductShowcase() {
  return (
    <section className="py-20 bg-zinc-950 border-t border-zinc-900/50 text-zinc-50">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Clean dashboards giving <span className="text-emerald-400">real insights.</span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              ApexBank integrates real-time asset updates with multi-layer categorization algorithms so auditing becomes instantaneous.
            </p>

            <ul className="space-y-3 pt-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Filter spending distributions rapidly
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Audit active authorizations
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Export encrypted compliance datasets
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Apply for instant micro-financing options
              </li>
            </ul>

            <div className="pt-4">
              <Link 
                href="/signup" 
                className="inline-flex bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white text-sm font-semibold px-6 py-3 rounded-xl items-center gap-2 transition-all"
              >
                Open Free Account <ArrowRight className="h-4 w-4 text-zinc-400" />
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-4 shadow-2xl">
              {/* Mock of transaction interface */}
              <div className="bg-zinc-950 border border-zinc-800/50 rounded-2xl p-4 space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-500 pb-2 border-b border-zinc-900">
                  <span>Recent Transactions</span>
                  <span className="hover:underline cursor-pointer">View All</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-xs">
                      S
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">Spotify Premium</p>
                      <p className="text-zinc-500 text-[10px] mt-0.5">Subscription</p>
                    </div>
                  </div>
                  <span className="text-rose-400 text-xs font-bold">-$14.99</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                      H
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">Hustle Inc.</p>
                      <p className="text-zinc-500 text-[10px] mt-0.5">Invoice Settlement</p>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-xs font-bold">+$4,200.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
