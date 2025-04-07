export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container">
          <h1 className="text-xl font-bold">KVN Gerador</h1>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 