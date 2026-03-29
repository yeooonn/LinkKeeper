import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { getSupabase, isSupabaseConfigured } from "./supabase";

WebBrowser.maybeCompleteAuthSession();

/** Supabase Redirect URLs에 이 값과 동일한 문자열을 등록하세요. */
export function getOAuthRedirectUri(): string {
  return Linking.createURL("auth/callback");
}

/** Supabase에 켜 둔 공급자만 사용하세요. 네이버 등은 대시보드에서 custom OIDC로 붙입니다. */
export type OAuthProvider =
  | "github"
  | "google"
  | "apple"
  | "kakao";

export async function signInWithOAuthProvider(
  provider: OAuthProvider,
): Promise<{ error: Error | null }> {
  if (!isSupabaseConfigured) {
    return { error: new Error("Supabase가 설정되지 않았습니다.") };
  }

  const supabase = getSupabase();
  const redirectTo = getOAuthRedirectUri();

  if (Platform.OS === "web") {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
    return { error: error ? new Error(error.message) : null };
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) return { error: new Error(error.message) };
  if (!data?.url) {
    return { error: new Error("OAuth URL을 받지 못했습니다.") };
  }

  try {
    const u = new URL(data.url);
    if (u.hostname === "supabase.com") {
      return {
        error: new Error(
          "Supabase 프로젝트 URL이 잘못되었을 수 있습니다. EXPO_PUBLIC_SUPABASE_URL은 https://(프로젝트ref).supabase.co 형식이어야 합니다.",
        ),
      };
    }
  } catch {
    return { error: new Error("OAuth URL 형식이 올바르지 않습니다.") };
  }

  let result: Awaited<ReturnType<typeof WebBrowser.openAuthSessionAsync>>;
  try {
    result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "브라우저 인증 창을 열 수 없습니다.";
    return {
      error: new Error(
        `${message} 시뮬레이터에서는 Safari/외부 브라우저가 제한되는 경우가 있습니다.`,
      ),
    };
  }

  if (result.type !== "success" || !result.url) {
    if (result.type === "cancel" || result.type === "dismiss") {
      return { error: null };
    }
    return { error: new Error("브라우저 로그인에 실패했습니다.") };
  }

  const parsed = new URL(result.url);
  const code = parsed.searchParams.get("code");
  if (!code) {
    return { error: new Error("콜백 URL에 authorization code가 없습니다.") };
  }

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);
  return { error: exchangeError ? new Error(exchangeError.message) : null };
}
