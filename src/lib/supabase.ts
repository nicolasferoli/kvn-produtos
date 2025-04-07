import { createServerClient } from '@supabase/ssr'
import { createBrowserClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseUrl, supabaseAnonKey } from './config'

// Cliente para uso no navegador (client components)
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Cliente para uso no servidor (server components, server actions, etc)
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  
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
            // A função setAll foi chamada de um Server Component.
            // Isso pode ser ignorado se você tiver middleware atualizando
            // as sessões do usuário.
            console.error('Erro ao definir cookies:', error)
          }
        },
      },
    }
  )
} 