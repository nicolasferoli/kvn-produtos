import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseUrl, supabaseAnonKey } from '@/lib/config'

// Interface para o cookiesToSet
interface CookieOptions {
  name: string
  value: string
  options?: {
    domain?: string
    path?: string
    expires?: Date
    httpOnly?: boolean
    secure?: boolean
    sameSite?: 'strict' | 'lax' | 'none'
    maxAge?: number
  }
}

// Função principal para criar cliente do servidor
export async function createServerClient() {
  const cookieStore = cookies()
  
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // Isso pode ser ignorado se você tiver middleware atualizando sessões
            console.error('Erro ao definir cookies no servidor:', error)
          }
        },
      },
    }
  )
}

// Alias para createServerClient para manter compatibilidade
export const createClient = createServerClient 