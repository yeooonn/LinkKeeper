import { type NextRequest } from 'next/server'
import { updateSession } from './shared/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // 세션(로그인 토큰)을 자동 갱신하는 함수
  const session = await updateSession(request)

  // const hasToken = session.headers.get('x-middleware-request-cookie')
  // const { pathname } = request.nextUrl

  //  // 토큰 없으면 /guest로 이동
  // if (!hasToken && pathname !== '/guest') {
  //   return NextResponse.redirect(new URL('/guest', request.url))
  // }

  //  // 토큰 있으면 /guest 차단, /로 이동
  // if (hasToken && pathname === '/guest') {
  // return NextResponse.redirect(new URL('/', request.url))
  // }

  // 나머지는 그대로
  return session
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}