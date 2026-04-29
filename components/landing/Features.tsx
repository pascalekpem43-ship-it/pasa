import { Zap, Shield, Smartphone, BarChart2, Landmark } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Instant Asset Routing',
    description: 'Execute secure peer transactions globally within milliseconds on an optimized pipeline.'
  },
  {
    icon: Shield,
    title: 'Bank-Grade Encryption',
    description: 'Leverage custom AES variables, automated logs, and protected database schemas.'
  },
  {
    icon: Landmark,
    title: 'Flexible Financing',
    description: 'Access digital liquidity instantly with fixed APR models and automated deployment.'
  },
  {
    icon: BarChart2,
    title: 'Smart Allocation Analytics',
    description: 'Evaluate recurring expenditures and deploy algorithmic summaries instantly.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-zinc-950 text-zinc-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            All your operations, <span className="text-emerald-400">centralized.</span>
          </h2>
          <p className="text-zinc-400 text-sm">
            Standardize standard workflows without paying exorbitant standard banking tariffs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div 
                key={idx} 
                className="bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 p-6 rounded-3xl hover:bg-zinc-900/60 transition-all duration-300 group"
              >
                <div className="bg-emerald-500/10 text-emerald-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
