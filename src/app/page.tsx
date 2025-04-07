import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">KVN Produtos</div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/signup">
              <Button>Criar Conta</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Crie produtos digitais lucrativos sem experiência prévia
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground mb-8">
              Plataforma que combina inteligência artificial com conhecimento de marketing digital
              para guiar você na criação de funis de vendas completos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg">Começar Agora</Button>
              </Link>
              <Link href="#como-funciona">
                <Button variant="outline" size="lg">
                  Como Funciona
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Como Funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
                <div className="mb-4 text-primary font-bold text-2xl">1</div>
                <h3 className="text-xl font-bold mb-2">Defina seu nicho</h3>
                <p>
                  Escolha um nicho lucrativo com base em análises de tendências e
                  dados de mercado fornecidos pela nossa IA.
                </p>
              </div>
              <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
                <div className="mb-4 text-primary font-bold text-2xl">2</div>
                <h3 className="text-xl font-bold mb-2">Crie seu produto</h3>
                <p>
                  Nosso assistente guiará você na criação do produto principal,
                  order bumps, upsells e downsells de forma estruturada.
                </p>
              </div>
              <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
                <div className="mb-4 text-primary font-bold text-2xl">3</div>
                <h3 className="text-xl font-bold mb-2">Lance e venda</h3>
                <p>
                  Receba um calendário de lançamento detalhado e estratégias de
                  tráfego para maximizar suas vendas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-8">
              Pronto para criar seu produto digital?
            </h2>
            <Link href="/signup">
              <Button size="lg">Criar Minha Conta Grátis</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-background">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          <div className="font-semibold">KVN Produtos &copy; {new Date().getFullYear()}</div>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Termos
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Privacidade
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Contato
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
