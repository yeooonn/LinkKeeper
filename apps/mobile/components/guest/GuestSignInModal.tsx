import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { signInWithOAuthProvider, type OAuthProvider } from "../../lib/oauth";
import { isSupabaseConfigured } from "../../lib/supabase";
import { BottomSheetModal } from "../ui/BottomSheetModal";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const SOCIAL: {
  label: string;
  provider: Extract<OAuthProvider, "kakao" | "google">;
  bgClass?: string;
  bgStyle?: { backgroundColor: string };
}[] = [
  {
    label: "Kakao",
    provider: "kakao",
    bgClass: "bg-[#F8D303]",
  },
  {
    label: "Google",
    provider: "google",
    bgStyle: { backgroundColor: "rgba(237, 237, 237, 0.64)" },
  },
];

export function GuestSignInModal({ visible, onClose }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [busy, setBusy] = useState<OAuthProvider | null>(null);

  async function onPressProvider(
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
    onClose();
    router.replace("/");
  }

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
      <View
        className="rounded-t-3xl bg-background-primary px-6 pt-7"
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="mb-2 flex-row items-center justify-end">
          <Pressable
            onPress={onClose}
            hitSlop={12}
            className="rounded-full p-1 active:opacity-70"
            accessibilityRole="button"
            accessibilityLabel="모달 닫기"
          >
            <Text className="text-2xl leading-none text-foreground-trtiary">
              ×
            </Text>
          </Pressable>
        </View>

        <Text className="text-center text-xl font-bold text-foreground-primary">
          간편하게 로그인하세요.
        </Text>
        <Text className="mb-10 mt-2 text-center text-base leading-6 text-foreground-secondary">
          링크관리의 모든 것, LinkKeeper
        </Text>

        <View className="gap-2.5">
          {SOCIAL.map(({ label, provider, bgClass, bgStyle }) => {
            const loading = busy === provider;
            const disabled = busy !== null && !loading;
            return (
              <Pressable
                key={provider}
                disabled={disabled || !isSupabaseConfigured}
                onPress={() => void onPressProvider(provider)}
                className={`w-full flex-row items-center justify-center gap-2 rounded-xl p-2.5 active:opacity-90 ${bgClass ?? ""} ${disabled ? "opacity-50" : ""}`}
                style={bgStyle}
              >
                {loading ? (
                  <ActivityIndicator color="#000" />
                ) : (
                  <>
                    {provider === "kakao" ? (
                      <Ionicons
                        name="chatbubble-ellipses"
                        size={20}
                        color="#000"
                      />
                    ) : (
                      <FontAwesome name="google" size={20} color="#000" />
                    )}
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
    </BottomSheetModal>
  );
}
