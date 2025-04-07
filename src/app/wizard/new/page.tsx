"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function NewProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)
      
      // Aqui criaríamos o projeto no Supabase
      // Como ainda não temos essa implementação, apenas simulamos
      console.log("Criando projeto:", data)
      
      // Simular um atraso
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirecionar para a primeira etapa do wizard
      // Normalmente passaríamos o ID do projeto criado
      router.push("/wizard/step-1")
    } catch (error) {
      console.error("Erro ao criar projeto:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Criar Novo Produto</h1>
      
      <div className="max-w-xl mx-auto">
        <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Detalhes Básicos</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome do Produto
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                placeholder="Ex: Guia Completo de Marketing Digital"
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Descrição (opcional)
              </label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Descreva brevemente seu produto..."
                className="w-full rounded-md border border-input px-3 py-2 text-sm min-h-[100px]"
                disabled={isLoading}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Criando..." : "Continuar para o Wizard"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 