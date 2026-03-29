import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from './shared/utils/supabase/middleware'

const corsApiHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

function withApiCors(res: NextResponse): NextResponse {
  for (const [k, v] of Object.entries(corsApiHeaders)) {
    res.headers.set(k, v)
  }
  return res
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api/')) {
    if (request.method === 'OPTIONS') {
      return withApiCors(new NextResponse(null, { status: 204 }))
    }
  }

  // Cron 등 서버 간 호출은 Supabase 세션 갱신 불필요 · 실패 시 500 방지
  if (pathname.startsWith('/api/cron')) {
    const res = NextResponse.next()
    return pathname.startsWith('/api/') ? withApiCors(res) : res
  }

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

  if (pathname.startsWith('/api/')) {
    return withApiCors(session)
  }

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
    '/((?!_next/static|_next/image|favicon.ico|sw\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}