import { UserPlus, Wallet, Send } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: '1. Create Account',
    description: 'Sign up in 2 minutes with simple identity variables.'
  },
  {
    icon: Wallet,
    title: '2. Deposit Assets',
    description: 'Link existing external nodes via protected gateways.'
  },
  {
    icon: Send,
    title: '3. Execute Operations',
    description: 'Deploy global liquidity parameters instantly.'
  }
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-zinc-950 text-zinc-50 border-t border-zinc-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">How it works</h2>
          <p className="text-zinc-400 text-sm">Simplifying your journey across digital finance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="flex flex-col items-center space-y-4">
                <div className="bg-zinc-900 border border-zinc-800 w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-400 shadow-inner">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-200">{step.title}</h3>
                <p className="text-zinc-400 text-xs max-w-xs leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
