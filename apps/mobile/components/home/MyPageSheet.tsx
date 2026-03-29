import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal } from "../ui/BottomSheetModal";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSignOut: () => Promise<void>;
};

export function MyPageSheet({ visible, onClose, onSignOut }: Props) {
  const insets = useSafeAreaInsets();

  function confirmSignOut() {
    Alert.alert("로그아웃", "정말 로그아웃할까요?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: () => {
          void onSignOut().then(() => onClose());
        },
      },
    ]);
  }

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
      <View
        className="rounded-t-3xl bg-background-secondary"
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="flex-row items-center justify-between border-b border-border-primary px-5 py-4">
          <Text className="text-lg font-bold text-foreground-primary">
            마이페이지
          </Text>
          <Pressable onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={26} color="#404040" />
          </Pressable>
        </View>

        <View className="px-5 py-6">
          <Pressable
            onPress={confirmSignOut}
            className="rounded-xl border border-red-200 bg-red-50 py-3.5 active:opacity-80"
          >
            <Text className="text-center font-semibold text-red-600">
              로그아웃
            </Text>
          </Pressable>
        </View>
      </View>
    </BottomSheetModal>
  );
}
