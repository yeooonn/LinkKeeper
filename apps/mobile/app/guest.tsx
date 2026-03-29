import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleIcon } from "../components/assets/svg/Google";
import { KakaoIcon } from "../components/assets/svg/Kakao";
import { signInWithOAuthProvider, type OAuthProvider } from "../lib/oauth";
import { isSupabaseConfigured } from "../lib/supabase";

const SOCIAL = [
  {
    label: "Kakao",
    provider: "kakao" as const,
    className: "bg-[#F8D303]",
    icon: <KakaoIcon />,
  },
  {
    label: "Google",
    provider: "google" as const,
    style: { backgroundColor: "rgba(237, 237, 237, 0.64)" } as const,
    icon: <GoogleIcon />,
  },
];

export default function GuestScreen() {
  const router = useRouter();
  const [busy, setBusy] = useState<OAuthProvider | null>(null);

  async function handleSignIn(
    provider: Extract<OAuthProvider, "kakao" | "google">,
  ) {
    if (!isSupabaseConfigured) {
      Alert.alert("설정 필요", "Supabase 환경 변수를 확인해 주세요.");
      return;
    }
    setBusy(provider);
    const { error } = await signInWithOAuthProvider(provider);
    setBusy(null);
    if (error) {
      Alert.alert("로그인 실패", error.message);
      return;
    }
    router.replace("/");
  }

  const disabled = busy !== null;

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <View className="flex-1 items-center justify-center px-8">
        <View className="mb-4 h-20 w-20 items-center justify-center rounded-3xl bg-blue-100">
          <Ionicons name="link" size={44} color="#2563eb" />
        </View>

        <Text className="text-3xl font-bold tracking-tight text-foreground-primary">
          LinkKeeper
        </Text>

        <Text className="mt-3 text-center text-base leading-6 text-foreground-secondary">
          소중한 링크를 한곳에 모아 관리하세요
        </Text>

        <View className="mt-12 w-full gap-2">
          {SOCIAL.map(({ label, provider, className, style, icon }) => {
            const loading = busy === provider;
            const btnDisabled = disabled && !loading;
            return (
              <Pressable
                key={provider}
                disabled={btnDisabled}
                onPress={() => void handleSignIn(provider)}
                className={`w-full flex-row items-center justify-center gap-2 rounded-xl p-2 active:opacity-90 ${className ?? ""} ${btnDisabled ? "opacity-50" : ""}`}
                style={style}
              >
                {loading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <>
                    {icon}
                    <Text className="text-base font-bold text-black">
                      {label}
                    </Text>
                  </>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
