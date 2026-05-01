import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 pt-16 md:p-8 md:pt-8 lg:p-12 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
