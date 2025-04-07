import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <Suspense fallback={<div>Carregando projetos...</div>}>
        <ProjectList />
      </Suspense>
      
      <div className="mt-8">
        <Link href="/wizard/new">
          <Button size="lg">
            Criar Meu Primeiro Produto
          </Button>
        </Link>
      </div>
    </div>
  )
}

async function ProjectList() {
  // Simplificando para remover a dependência de autenticação
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Seus Projetos</h2>
      <div className="text-muted-foreground py-8 text-center">
        <p>Você ainda não tem projetos.</p>
        <p className="mt-2">Clique no botão abaixo para criar seu primeiro produto!</p>
      </div>
    </div>
  )
} 