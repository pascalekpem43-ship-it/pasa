import { ArrowUpRight, ArrowDownLeft } from 'lucide-react'

interface Transaction {
  id: string
  sender_id: string
  receiver_id: string
  amount: number
  status: string
  created_at: string
  sender?: { name: string; email: string } | any
  receiver?: { name: string; email: string } | any
}

interface TransactionListProps {
  transactions: Transaction[]
  currentUserId: string
}

export default function TransactionList({ transactions, currentUserId }: TransactionListProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
        <p className="text-zinc-400 text-sm">No transactions found.</p>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
      <h3 className="text-lg font-bold text-white px-2 mb-4">Recent Transactions</h3>
      <div className="divide-y divide-zinc-800/50">
        {transactions.map((tx) => {
          const isSender = tx.sender_id === currentUserId
          const displayUser = isSender ? tx.receiver : tx.sender
          const amountSign = isSender ? '-' : '+'
          const amountClass = isSender ? 'text-rose-400' : 'text-emerald-400'
          const Icon = isSender ? ArrowUpRight : ArrowDownLeft
          const iconBg = isSender ? 'bg-rose-500/10' : 'bg-emerald-500/10'
          const iconColor = isSender ? 'text-rose-400' : 'text-emerald-400'

          return (
            <div key={tx.id} className="flex items-center justify-between py-4 px-2 first:pt-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className={`${iconBg} p-3 rounded-2xl`}>
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-zinc-200 font-semibold text-sm">
                    {displayUser?.name || 'Unknown User'}
                  </p>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    {new Date(tx.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${amountClass}`}>
                  {amountSign}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <span className="inline-flex items-center mt-1 text-[10px] px-2 py-0.5 rounded-full font-semibold bg-zinc-800 text-zinc-400 capitalize">
                  {tx.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
