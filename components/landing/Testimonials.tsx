const testimonials = [
  {
    quote: "ApexBank completely optimized our daily liquidity aggregation routines. Asset transfers settle immediately without extraneous operational delays.",
    author: "Marcus Vance",
    role: "CFO at StripeNode"
  },
  {
    quote: "Observing distributed positions across complex global nodes is remarkably simplified. The user interface is flawlessly responsive.",
    author: "Ayla Chen",
    role: "VP of Operations"
  },
  {
    quote: "A crucial asset for standard venture governance protocols. Their transactional protection architecture is phenomenal.",
    author: "Sophia Patel",
    role: "Managing Director at Apex Ventures"
  },
  {
    quote: "Migrating external payroll routing rules directly via secure API frameworks saved us dozens of engineering hours.",
    author: "Jameson Ford",
    role: "Tech Lead at CyberMesh"
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-zinc-950 text-zinc-50 border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Endorsed by <span className="text-emerald-400">industry leaders.</span>
          </h2>
          <p className="text-zinc-400 text-sm">
            Standardized operational confidence executed autonomously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 flex flex-col justify-between hover:border-zinc-700/50 transition-all shadow-2xl shadow-zinc-950/50 relative group"
            >
              <div className="absolute top-4 right-6 text-zinc-800 text-6xl font-serif select-none pointer-events-none group-hover:text-emerald-500/10 transition-all">
                “
              </div>
              
              <p className="text-zinc-300 text-base font-medium leading-relaxed relative z-10">
                {t.quote}
              </p>
              
              <div className="mt-8 pt-4 border-t border-zinc-900/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-extrabold text-xs shadow-inner">
                  {t.author[0]}
                </div>
                <div>
                  <h4 className="text-zinc-100 text-sm font-bold tracking-tight">{t.author}</h4>
                  <p className="text-zinc-500 text-[11px] mt-0.5 font-medium uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

