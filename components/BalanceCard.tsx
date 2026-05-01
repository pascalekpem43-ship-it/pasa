import { ArrowUpRight, ArrowDownLeft, Wifi, ShieldCheck } from 'lucide-react'

interface BalanceCardProps {
  balance: number
  userName: string
  income?: number
  expenses?: number
}

function formatCurrency(value: number): string {
  // Remove trailing .00 — only show decimals if they're meaningful
  if (value % 1 === 0) {
    return value.toLocaleString('en-US')
  }
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function BalanceCard({ balance, userName, income = 0, expenses = 0 }: BalanceCardProps) {
  return (
    <div className="space-y-5 md:space-y-6">
      {/* Balance Section */}
      <div className="relative overflow-hidden bg-zinc-900/80 border border-zinc-800/60 rounded-2xl p-5 md:p-6 backdrop-blur-xl">
        <p className="text-zinc-500 text-[11px] font-semibold uppercase tracking-widest">Total Balance</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
          ${formatCurrency(balance)}
        </h2>

        {/* Income / Expenses row */}
        <div className="flex items-center gap-5 mt-5 pt-4 border-t border-zinc-800/60">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-500/10 p-1.5 rounded-lg">
              <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] font-semibold uppercase tracking-wide">Income</p>
              <p className="text-white text-sm font-bold">${formatCurrency(income)}</p>
            </div>
          </div>

          <div className="w-px h-8 bg-zinc-800/60" />

          <div className="flex items-center gap-2.5">
            <div className="bg-rose-500/10 p-1.5 rounded-lg">
              <ArrowUpRight className="h-3.5 w-3.5 text-rose-400" />
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] font-semibold uppercase tracking-wide">Expenses</p>
              <p className="text-white text-sm font-bold">${formatCurrency(expenses)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Card */}
      <div className="relative overflow-hidden rounded-2xl p-5 md:p-6 aspect-[1.7/1] flex flex-col justify-between bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 border border-zinc-700/40 shadow-xl group transition-all duration-500 hover:border-zinc-600/50">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

        {/* Top row */}
        <div className="flex items-start justify-between relative z-10">
          <div>
            <p className="text-zinc-400 text-[10px] font-semibold uppercase tracking-widest">Apex Card</p>
            <p className="text-white font-bold text-sm mt-0.5 tracking-wide">{userName}</p>
          </div>
          <Wifi className="h-5 w-5 text-zinc-500 rotate-90" />
        </div>

        {/* Card number */}
        <div className="relative z-10 mt-auto">
          <p className="text-zinc-300 text-sm sm:text-base font-mono tracking-[0.2em]">
            •••• •••• •••• 4890
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex items-end justify-between relative z-10 mt-3">
          <div>
            <p className="text-zinc-500 text-[9px] font-semibold uppercase tracking-widest">Valid Thru</p>
            <p className="text-zinc-300 text-xs font-mono mt-0.5">12/28</p>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/60" />
            <span className="text-[10px] font-bold text-zinc-400 tracking-wider">VISA</span>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-zinc-700/20 rounded-full pointer-events-none" />
        <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-zinc-700/15 rounded-full pointer-events-none" />
      </div>
    </div>
  )
}
