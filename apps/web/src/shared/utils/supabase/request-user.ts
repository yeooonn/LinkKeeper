import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./server";

/**
 * API Route에서 쿠키(웹) 또는 Authorization: Bearer(JWT, 모바일 등)로 사용자 ID를 구합니다.
 */
export async function getUserIdFromApiRequest(
  req: Request,
): Promise<string | null> {
  const auth = req.headers.get("Authorization");
  if (auth?.startsWith("Bearer ")) {
    const token = auth.slice(7).trim();
    if (!token) return null;
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      },
    );
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}
