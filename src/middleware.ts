import { NextResponse, type NextRequest } from 'next/server'

// Lista de rotas que não requerem autenticação
const publicRoutes = ['/', '/login', '/signup', '/auth']

export function middleware(request: NextRequest) {
  // A rota atual é pública?
  const isPublicPage = publicRoutes.some(route => 
    request.nextUrl.pathname === route || 
    request.nextUrl.pathname.startsWith(`${route}/`)
  )
  
  // Verificar tokens de autenticação nos cookies (simplificado)
  const hasAuthCookie = request.cookies.has('sb-access-token') || 
                        request.cookies.has('sb-refresh-token')
  
  console.log(`[Middleware] Rota: ${request.nextUrl.pathname}, Autenticado: ${hasAuthCookie}`)
  
  // Regra 1: Redirecionar raiz para login
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Regra 2: Usuário autenticado não precisa ver login ou signup
  if (hasAuthCookie && ['/login', '/signup'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Regra 3: Usuário não autenticado não pode acessar rotas protegidas
  if (!hasAuthCookie && !isPublicPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Para todos os outros casos, permitir a requisição
  return NextResponse.next()
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