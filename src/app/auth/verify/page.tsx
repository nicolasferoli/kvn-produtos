import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Verifique seu e-mail
          </h1>
          <p className="text-sm text-muted-foreground">
            Enviamos um link de confirmação para seu e-mail.
            Por favor, verifique sua caixa de entrada para completar o cadastro.
          </p>
        </div>
        
        <div className="text-center">
          <Link href="/login">
            <Button variant="link">
              Voltar para login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 