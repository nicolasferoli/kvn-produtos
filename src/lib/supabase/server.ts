import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseUrl, supabaseAnonKey } from '@/lib/config'

// Função principal para criar cliente do servidor
export async function createServerClient() {
  // É importante aguardar a resolução da Promise do cookies()
  const cookieStore = await cookies()
  
  return createSupabaseServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          // O cookieStore já está resolvido, então podemos chamar getAll diretamente
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