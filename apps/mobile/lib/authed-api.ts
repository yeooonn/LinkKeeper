import { fetchAPI } from "@linkkeeper/shared";
import { getSupabase, isSupabaseConfigured } from "./supabase";

function apiBaseUrl(): string {
  return (process.env.EXPO_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");
}

export async function getAccessToken(): Promise<string | null> {
  if (!isSupabaseConfigured) return null;
  const {
    data: { session },
  } = await getSupabase().auth.getSession();
  return session?.access_token ?? null;
}

/** 쿠키 대신 Bearer 로 보호 API 호출 (삭제 등) */
export async function fetchAPIWithAuth<ResponseType>(
  endpoint: string,
  init: Omit<
    Parameters<typeof fetchAPI<ResponseType>>[1],
    "baseUrl" | "headers"
  > & { headers?: Record<string, string> },
): Promise<ResponseType | null> {
  const base = apiBaseUrl();
  const token = await getAccessToken();
  const headers = {
    ...init.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return fetchAPI<ResponseType>(endpoint, {
    ...init,
    baseUrl: base,
    credentials: "omit",
    headers,
  });
}
