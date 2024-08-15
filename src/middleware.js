import { NextResponse } from 'next/server'
import PersistenceManager from "./persistence/persistence"

export function middleware(request) {
  //const token = request.cookies.get('auth_token')?.value
  //onst userToken = PersistenceManager.getItem("userToken");
   const token = true;
   

  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
}