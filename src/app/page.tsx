"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirecionar para a página de login
    router.replace("/login")
  }, [router])
  
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Redirecionando para login...</p>
    </div>
  )
}
