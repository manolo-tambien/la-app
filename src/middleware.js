import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { debug } from 'console';

export async function middleware(request) {
  const token = request.cookies.get('userToken')?.value || null;

  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    if (token) {
      // Convertir el secreto de JWT a Uint8Array
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      // Verificar el token especificando el algoritmo de firma (por ejemplo, 'HS256')
      const { payload } = await jwtVerify(token, secret, {
        algorithms: ['HS256'],
      });
      // Si el token es válido y la ruta es login, redirige al home
      if (request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};