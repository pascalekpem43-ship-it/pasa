'use client'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { TrendingUp, BarChart3 } from 'lucide-react'

interface Transaction {
  id: string
  sender_id: string
  receiver_id: string
  amount: number
  status: string
  created_at: string
}

interface ChartProps {
  transactions?: Transaction[]
  currentUserId?: string
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function Chart({ transactions = [], currentUserId = '' }: ChartProps) {
  // Get last 6 months
  const chartData: { monthIndex: number; year: number; name: string; amount: number }[] = []
  const now = new Date()
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    chartData.push({
      monthIndex: d.getMonth(),
      year: d.getFullYear(),
      name: monthNames[d.getMonth()],
      amount: 0
    })
  }

  // Aggregate spending (outgoing transactions only)
  transactions.forEach(tx => {
    if (tx.sender_id === currentUserId && tx.status === 'completed') {
      const date = new Date(tx.created_at)
      const m = date.getMonth()
      const y = date.getFullYear()
      
      const monthObj = chartData.find(item => item.monthIndex === m && item.year === y)
      if (monthObj) {
        monthObj.amount += Number(tx.amount)
      }
    }
  })

  const totalSpending = chartData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-2xl p-5 md:p-6 h-full min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wide">Spending Overview</h3>
        <span className="text-[11px] text-zinc-500 font-medium">Last 6 months</span>
      </div>

      {totalSpending === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <BarChart3 className="h-10 w-10 text-zinc-700 mb-3" />
          <p className="text-zinc-500 text-sm font-medium">No spending data yet</p>
          <p className="text-zinc-600 text-xs mt-1 max-w-[200px]">Your chart will appear once you make transactions.</p>
        </div>
      ) : (
        <div className="flex-1 w-full text-zinc-400 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  borderColor: '#27272a',
                  borderRadius: '12px',
                  color: '#fff',
                  borderWidth: '1px',
                  fontSize: '12px',
                  padding: '8px 12px'
                }}
                itemStyle={{ color: '#10b981' }}
                cursor={{ stroke: '#27272a' }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorAmount)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
