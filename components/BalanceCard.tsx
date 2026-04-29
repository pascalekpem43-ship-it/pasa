import { ArrowUpRight, ArrowDownLeft, CreditCard, ShieldCheck } from 'lucide-react'

interface BalanceCardProps {
  balance: number
  userName: string
  income?: number
  expenses?: number
}

export default function BalanceCard({ balance, userName, income = 1200.00, expenses = 450.00 }: BalanceCardProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-emerald-950/40 border border-zinc-800/50 rounded-3xl p-8 shadow-2xl shadow-zinc-950/50 backdrop-blur-xl group transition-all duration-500 hover:border-emerald-500/30">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest">Available Liquidity</p>
          <h2 className="text-4xl font-black text-white tracking-tight mt-1 select-all">
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
        <div className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/50 text-emerald-400 shadow-inner group-hover:scale-110 transition-all duration-300">
          <CreditCard className="h-6 w-6" />
        </div>
      </div>

      {/* Virtual Card Display */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800/80 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <ShieldCheck className="h-5 w-5 text-emerald-400/50" />
        </div>
        
        <div className="space-y-4">
          <p className="text-zinc-200 font-semibold text-sm tracking-wide">{userName}</p>
          
          <div className="flex items-center justify-between">
            <p className="text-zinc-400 text-sm font-mono tracking-[0.2em]">•••• •••• •••• 4890</p>
            <span className="text-[10px] font-bold bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md border border-zinc-700/50">
              VISA
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Footer */}
      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
            <ArrowDownLeft className="h-4 w-4" />
          </div>
          <div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Income</p>
            <p className="text-emerald-400 text-sm font-bold mt-0.5">
              +${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-rose-400">
            <ArrowUpRight className="h-4 w-4" />
          </div>
          <div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Expenses</p>
            <p className="text-rose-400 text-sm font-bold mt-0.5">
              -${expenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
