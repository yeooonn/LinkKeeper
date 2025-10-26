import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Supabase 세션(로그인 토큰)을 자동으로 갱신하는 함수
// Next.js middleware.ts에서 호출되어 브라우저 쿠키를 최신 상태로 유지
export async function updateSession(request: NextRequest) {
  // Next.js 응답 객체 생성
  // 요청(request) 객체를 그대로 포함시켜, 수정된 쿠키를 다시 반영할 수 있도록 함
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Supabase 서버 클라이언트 생성
  // @supabase/ssr 패키지를 사용해 서버 환경에서 쿠키를 직접 관리할 수 있도록 설정
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,  
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, 
    {
      cookies: {
        // 현재 요청(request)에 포함된 모든 쿠키를 가져옴
        getAll() {
          return request.cookies.getAll()
        },
        // Supabase에서 새로 발급하거나 갱신한 쿠키를 설정
        setAll(cookiesToSet) {
          // 1️. 요청 객체의 쿠키를 갱신 (middleware 실행 중 쿠키 반영용)
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )

          // 2️. NextResponse 객체를 새로 생성
          // (쿠키를 변경한 후, 새로운 응답 객체에 반영하기 위함)
          supabaseResponse = NextResponse.next({
            request,
          })

          // 3️. 응답(response)에도 갱신된 쿠키를 다시 설정
          // → 이렇게 해야 브라우저(클라이언트) 쿠키도 최신 토큰으로 업데이트됨
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Supabase 인증 토큰 갱신
  // supabase.auth.getUser()는 항상 Supabase Auth 서버에 요청을 보내,
  // 현재 쿠키에 담긴 access token / refresh token이 유효한지 확인하고,
  // 필요시 새로운 access token을 자동으로 발급받음.
  await supabase.auth.getUser()

  // 갱신된 쿠키가 반영된 응답 객체 반환
  // middleware.ts에서 이를 return하면 브라우저 쿠키와 서버 세션이 모두 최신 상태로 유지됨
  return supabaseResponse
}
