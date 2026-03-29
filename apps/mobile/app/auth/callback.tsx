import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { getSupabase, isSupabaseConfigured } from "../../lib/supabase";

function pickCode(params: Record<string, string | string[] | undefined>) {
  const raw = params.code;
  if (Array.isArray(raw)) return raw[0];
  return raw;
}

export default function AuthCallbackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const code = useMemo(
    () => pickCode(params as Record<string, string | string[]>),
    [params],
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      if (!isSupabaseConfigured) {
        if (active) setError("Supabase가 설정되지 않았습니다.");
        return;
      }

      if (!code) {
        if (active) setError("URL에 authorization code가 없습니다.");
        return;
      }
      const supabase = getSupabase();
      const {
        data: { session: existing },
      } = await supabase.auth.getSession();
      if (existing) {
        router.replace("/");
        return;
      }

      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (!active) return;

      if (exchangeError) {
        const {
          data: { session: retry },
        } = await supabase.auth.getSession();
        if (retry) {
          router.replace("/");
          return;
        }
        setError(exchangeError.message);
        return;
      }

      router.replace("/");
    })();

    return () => {
      active = false;
    };
  }, [code, router]);

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-background-secondary px-6">
        <Text className="text-center text-base text-red-600">{error}</Text>
        <Pressable
          className="mt-6 rounded-lg bg-neutral-900 px-6 py-3"
          onPress={() => router.replace("/auth/login")}
        >
          <Text className="font-medium text-white">로그인 화면으로</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-background-secondary">
      <ActivityIndicator />
      <Text className="mt-4 text-sm text-foreground-trtiary">로그인 처리 중…</Text>
    </View>
  );
}
