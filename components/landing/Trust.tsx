export default function Trust() {
  return (
    <section className="py-12 bg-zinc-950 border-y border-zinc-900 text-center select-none">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Trusted by leading companies worldwide</p>
        
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 mt-8 opacity-40 grayscale contrast-150">
          <span className="text-2xl font-extrabold text-white tracking-tighter">STRIPE</span>
          <span className="text-2xl font-black text-white tracking-tight">amazon</span>
          <span className="text-xl font-bold text-white tracking-wide">REVOLUT</span>
          <span className="text-2xl font-semibold text-white font-serif">Mastercard</span>
        </div>
      </div>
    </section>
  )
}
