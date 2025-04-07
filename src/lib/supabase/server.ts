import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseUrl, supabaseAnonKey } from '@/lib/config'

// Função principal para criar cliente do servidor
export async function createServerClient() {
  const cookieStore = await cookies()
  
  return createSupabaseServerClient(
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