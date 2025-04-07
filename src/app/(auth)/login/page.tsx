"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

const formSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})

type FormValues = z.infer<typeof formSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log("Iniciando tentativa de login...")
      
      // Criar cliente Supabase
      const supabase = createClient()
      
      // Tentar fazer login
      const authResponse = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      console.log("Resposta de autenticação:", authResponse)

      if (authResponse.error) {
        throw authResponse.error
      }

      // Verificar se o login foi bem-sucedido e redirecionar
      if (authResponse.data?.session) {
        console.log("Login bem-sucedido! Sessão criada, redirecionando...")
        
        // Aguardar um momento para garantir que os cookies sejam definidos
        setTimeout(() => {
          console.log("Redirecionando para o dashboard...")
          window.location.href = "/dashboard"
        }, 1000)
      } else {
        setError("Falha ao iniciar sessão. Sem resposta de sessão.")
      }
    } catch (error: any) {
      console.error("Erro detalhado de login:", error)
      
      // Mostrar mensagem mais específica baseada no erro
      if (error.message) {
        setError(`Erro: ${error.message}`)
      } else {
        setError("Falha ao fazer login. Verifique suas credenciais e tente novamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            KVN Produtos
          </h1>
          <p className="text-sm text-muted-foreground">
            Digite seu e-mail e senha para entrar
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="seu@email.com"
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full rounded-md border border-input px-3 py-2 text-sm"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="text-center text-sm">
          Não tem uma conta?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Registre-se
          </Link>
        </div>
      </div>
    </div>
  )
} 