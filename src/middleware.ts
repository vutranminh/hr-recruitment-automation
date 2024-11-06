import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Redirect root to start page
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/start', request.url))
  }

  // Protect /start routes
  if (request.nextUrl.pathname.startsWith('/start')) {
    const authCookie = request.cookies.get('auth')
    
    if (!authCookie) {
      // Redirect to login if no auth cookie
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/start/:path*']
}
