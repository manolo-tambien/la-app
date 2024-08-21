import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { debug } from 'console';

export async function middleware(request) {
  const token = request.cookies.get('userToken')?.value || null;

  try {
    if (token) {
      // Convertir el secreto de JWT a Uint8Array
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);

      // Verificar el token especificando el algoritmo de firma (por ejemplo, 'HS256')
      const { payload } = await jwtVerify(token, secret, {
        algorithms: ['HS256'],
      });

      // Si el token es válido, permitir el acceso a la aplicación
      if(request.nextUrl.pathname.startsWith('/login')){
        return NextResponse.redirect(new URL('/', request.url));
      }else{
        return NextResponse.next();
      }
    }
  } catch (error) {
    console.error('JWT verification failed:', error);
  }

  // Si no hay token válido, redirigir al usuario a la página de inicio de sesión
  if (!request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si la ruta es '/login', permitir el acceso
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};