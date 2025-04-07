// Arquivo de configuração para garantir valores corretos

// Verifica se está em desenvolvimento ou produção
export const isDevelopment = process.env.NODE_ENV === 'development'

// Verifica se uma string é válida (não vazia)
export function isValidString(value: string | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 0
}

// URL base do Supabase
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? process.env.NEXT_PUBLIC_SUPABASE_URL.trim()
  : 'https://rllaoorbdvibtoqiqlvg.supabase.co'

// Chave anônima do Supabase
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim()
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsbGFvb3JiZHZpYnRvcWlxbHZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNDI2MTYsImV4cCI6MjA1OTYxODYxNn0.ZpFXPjr9ecBvCI6PEZWfZHG61bmdKpebwZpe4Rtm8R8'

// Rotas públicas que não requerem autenticação
export const publicRoutes = ['/', '/signup', '/auth'];

// Rotas protegidas que requerem autenticação
export const protectedRoutes = ['/dashboard', '/profile', '/projects'];

// Rota padrão após login
export const defaultAuthenticatedRoute = '/dashboard';

// Rota padrão para usuários não autenticados
export const defaultUnauthenticatedRoute = '/'; 