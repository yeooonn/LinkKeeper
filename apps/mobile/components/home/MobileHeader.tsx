import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
  onOpenMyPage: () => void;
  onAddLink?: () => void;
};

export function MobileHeader({ title, onOpenMyPage, onAddLink }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="border-b border-border-primary bg-background-primary"
      style={{ paddingTop: Math.max(insets.top, 12) }}
    >
      <View className="flex-row items-center justify-between px-4 pb-3">
        <View className="flex-row items-center gap-2">
          <Ionicons name="link" size={28} color="#3b82f6" />
          <Text className="text-xl font-bold text-foreground-primary">
            LinkKeeper
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          {onAddLink ? (
            <Pressable
              onPress={onAddLink}
              className="rounded-lg p-1 active:bg-gray-200"
              accessibilityLabel="링크 추가"
            >
              <Ionicons name="add-circle" size={30} color="#2563eb" />
            </Pressable>
          ) : null}
          <Pressable
            onPress={onOpenMyPage}
            className="rounded-lg p-1 active:bg-gray-200"
            accessibilityLabel="마이페이지"
          >
            <Ionicons name="person-circle-outline" size={30} color="#474747" />
          </Pressable>
        </View>
      </View>
      <View className="px-4 pb-3">
        <Text className="text-lg font-bold text-foreground-primary">
          {title}
        </Text>
      </View>
    </View>
  );
}
