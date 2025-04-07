import { createBrowserClient } from '@supabase/ssr'

// Cliente para uso no navegador (client components)
export function createClient() {
  // Usar valores constantes para evitar problemas com variáveis de ambiente
  const url = 'https://rllaoorbdvibtoqiqlvg.supabase.co'
  const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsbGFvb3JiZHZpYnRvcWlxbHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDI2MTYsImV4cCI6MjA1OTYxODYxNn0.ZpFXPjr9ecBvCI6PEZWfZHG61bmdKpebwZpe4Rtm8R8'
  
  try {
    // Verificar se a URL é válida antes de criar o cliente
    new URL(url)
    
    return createBrowserClient(url, anonKey)
  } catch (error) {
    console.error('Erro ao criar cliente Supabase:', error)
    throw new Error('Não foi possível criar o cliente Supabase. URL inválida.')
  }
} 