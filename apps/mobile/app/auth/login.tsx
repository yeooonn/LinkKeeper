import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import {
  getOAuthRedirectUri,
  signInWithOAuthProvider,
  type OAuthProvider,
} from "../../lib/oauth";
import { isSupabaseConfigured } from "../../lib/supabase";

const PROVIDERS: { id: OAuthProvider; label: string }[] = [
  { id: "github", label: "GitHub" },
  { id: "google", label: "Google" },
  { id: "kakao", label: "Kakao" },
  { id: "apple", label: "Apple" },
];

export default function LoginScreen() {
  const router = useRouter();
  const [busy, setBusy] = useState<OAuthProvider | null>(null);

  async function onPress(provider: OAuthProvider) {
    setBusy(provider);
    const { error } = await signInWithOAuthProvider(provider);
    setBusy(null);
    if (error) {
      Alert.alert("로그인 실패", error.message);
      return;
    }
    router.replace("/");
  }

  return (
    <ScrollView
      className="flex-1 bg-background-secondary px-6 pt-4"
      contentContainerClassName="pb-8"
    >
      <Text className="text-base leading-6 text-foreground-primary">
        Supabase 대시보드 → Authentication → URL Configuration에 아래 redirect
        URI를 추가한 뒤, 사용할 공급자(GitHub 등)를 켜 주세요.
      </Text>
      <View className="mt-3 rounded-lg bg-background-hover px-3 py-2">
        <Text selectable className="font-mono text-xs text-foreground-secondary">
          {isSupabaseConfigured ? getOAuthRedirectUri() : "(Supabase 미설정)"}
        </Text>
      </View>
      <Text className="mt-4 text-sm leading-5 text-foreground-trtiary">
        Expo Go로 테스트하면 scheme이 달라질 수 있어, 터미널에 출력된 redirect
        주소를 그대로 Supabase에 추가해야 할 수 있습니다.
      </Text>

      <View className="mt-8 gap-3">
        {PROVIDERS.map(({ id, label }) => (
          <Pressable
            key={id}
            disabled={!isSupabaseConfigured || busy !== null}
            onPress={() => void onPress(id)}
            className="flex-row items-center justify-center rounded-xl bg-neutral-900 py-3.5 active:opacity-80 disabled:opacity-40"
          >
            {busy === id ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-base font-semibold text-white">
                {label}로 계속하기
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
