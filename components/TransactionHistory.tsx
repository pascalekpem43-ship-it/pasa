'use client'

import { useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, Search, Filter } from 'lucide-react'

interface Transaction {
  id: string
  sender_id: string
  receiver_id: string
  amount: number
  status: string
  created_at: string
  sender?: { name: string; email: string }
  receiver?: { name: string; email: string }
}

interface TransactionHistoryProps {
  initialTransactions: Transaction[]
  currentUserId: string
}

export default function TransactionHistory({ initialTransactions, currentUserId }: TransactionHistoryProps) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')

  const filteredTransactions = initialTransactions
    .filter((tx) => {
      const isSender = tx.sender_id === currentUserId
      const displayUser = isSender ? tx.receiver : tx.sender
      const nameMatch = displayUser?.name?.toLowerCase().includes(search.toLowerCase()) || 
                        displayUser?.email?.toLowerCase().includes(search.toLowerCase())
      
      if (typeFilter === 'income') return !isSender && nameMatch
      if (typeFilter === 'expense') return isSender && nameMatch
      return nameMatch
    })
    .sort((a, b) => {
      if (sortBy === 'amount') {
        return b.amount - a.amount
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Transaction History</h1>
          <p className="text-zinc-400 mt-1">View and filter all your digital transfers.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTypeFilter('all')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              typeFilter === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setTypeFilter('income')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              typeFilter === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-400 hover:text-emerald-400/80 hover:bg-zinc-900'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setTypeFilter('expense')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              typeFilter === 'expense' ? 'bg-rose-500/10 text-rose-400' : 'text-zinc-400 hover:text-rose-400/80 hover:bg-zinc-900'
            }`}
          >
            Expense
          </button>
        </div>

        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-sm font-medium">No matching transactions found</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/50">
            {filteredTransactions.map((tx) => {
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
                        {displayUser?.email || 'No email provided'}
                      </p>
                      <span className="block text-zinc-500 text-[10px] mt-1">
                        {new Date(tx.created_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-base ${amountClass}`}>
                      {amountSign}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <span className="inline-flex items-center mt-1 text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-zinc-800 text-zinc-400 capitalize">
                      {tx.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
