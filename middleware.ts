import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')
  const isLoginPage = request.nextUrl.pathname === '/login'

  // Se não tem token e não está na página de login, redirecionar para login
  if (!sessionToken && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Se tem token e está na página de login, redirecionar para home
  if (sessionToken && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 