import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
export async function middleware(request) {
  const token = request.cookies.get('userToken')?.value || null;
  try {
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret, {
        algorithms: ['HS256'],
      });
      if(request.nextUrl.pathname.startsWith('/login')){
        return NextResponse.redirect(new URL('/', request.url));
      }else{
        return NextResponse.next();
      }
    }
  } catch (error) {
    console.error('JWT verification failed:', error);
  }
  if (!request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};