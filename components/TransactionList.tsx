import { ArrowUpRight, ArrowDownLeft, Inbox } from 'lucide-react'

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

function formatAmount(value: number): string {
  if (value % 1 === 0) {
    return value.toLocaleString('en-US')
  }
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function TransactionList({ transactions, currentUserId }: TransactionListProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-2xl p-5 md:p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-6">Recent Transactions</h3>
        <div className="flex flex-col items-center justify-center py-8 md:py-10 text-center">
          <Inbox className="h-9 w-9 text-zinc-700 mb-3" />
          <p className="text-zinc-500 text-sm font-medium">No transactions yet</p>
          <p className="text-zinc-600 text-xs mt-1">Your recent transfers will appear here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-2xl p-5 md:p-6">
      <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4">Recent Transactions</h3>
      <div className="space-y-1">
        {transactions.map((tx) => {
          const isSender = tx.sender_id === currentUserId
          const displayUser = isSender ? tx.receiver : tx.sender
          const amountSign = isSender ? '-' : '+'
          const amountClass = isSender ? 'text-rose-400' : 'text-emerald-400'
          const Icon = isSender ? ArrowUpRight : ArrowDownLeft
          const iconBg = isSender ? 'bg-rose-500/10' : 'bg-emerald-500/10'
          const iconColor = isSender ? 'text-rose-400' : 'text-emerald-400'

          return (
            <div key={tx.id} className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-zinc-800/30 transition-colors gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`${iconBg} p-2.5 rounded-xl shrink-0`}>
                  <Icon className={`h-4 w-4 ${iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {displayUser?.name || 'Unknown User'}
                  </p>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    {new Date(tx.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={`font-bold text-sm ${amountClass}`}>
                  {amountSign}${formatAmount(tx.amount)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
