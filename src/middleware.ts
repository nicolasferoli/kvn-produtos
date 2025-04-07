import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { supabaseUrl, supabaseAnonKey } from '@/lib/config'

// Lista de rotas que não requerem autenticação
const publicRoutes = ['/', '/login', '/signup', '/auth']

export async function middleware(request: NextRequest) {
  // Criar resposta NextResponse para modificar
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  // Criar cliente Supabase
  const supabase = createSupabaseServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // IMPORTANTE: Verificar se o usuário está autenticado
  const { data: { user } } = await supabase.auth.getUser()
  
  // A rota atual é pública?
  const isPublicPage = publicRoutes.some(route => 
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith(`${route}/`)
  )
  
  console.log(`[Middleware] Rota: ${request.nextUrl.pathname}, Autenticado: ${!!user}`)
  
  // Regra 1: Redirecionar raiz para login
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Regra 2: Usuário autenticado não precisa ver login ou signup
  if (user && ['/login', '/signup'].includes(request.nextUrl.pathname)) {
    const dashboardUrl = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }
  
  // Regra 3: Usuário não autenticado não pode acessar rotas protegidas
  if (!user && !isPublicPage) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
  
  // Para todos os outros casos, permitir a requisição
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 