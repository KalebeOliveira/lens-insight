import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')
  const isLoginPage = request.nextUrl.pathname === '/login'
  const isLandingPage = request.nextUrl.pathname === '/landing'
  const isDashboardPage = request.nextUrl.pathname === '/dashboard'

  // Permitir acesso à landing page sempre
  if (isLandingPage) {
    return NextResponse.next()
  }

  // Se não tem token e está tentando acessar o dashboard, redirecionar para login
  if (!sessionToken && isDashboardPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se tem token e está na página de login, redirecionar para dashboard
  if (sessionToken && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*',
    '/landing'
  ],
} 