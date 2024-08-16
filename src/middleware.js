import { NextResponse } from 'next/server'

export function middleware(request) {
  //const token = request.cookies.get('auth_token')?.value
  const token = request.cookies.get('userToken')?.value || null;

  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}