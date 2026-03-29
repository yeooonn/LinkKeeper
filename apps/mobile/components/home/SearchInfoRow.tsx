import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type Props = {
  searchValue: string | null;
  onClear: () => void;
};

export function SearchInfoRow({ searchValue, onClear }: Props) {
  if (!searchValue) return null;

  return (
    <View className="flex-row items-center gap-1 px-4 py-1">
      <Text className="text-sm text-foreground-blueTag">&apos;{searchValue}&apos;</Text>
      <Text className="text-sm text-foreground-primary">검색결과</Text>
      <Pressable hitSlop={8} onPress={onClear} accessibilityLabel="검색 초기화">
        <Ionicons name="close-circle-outline" size={20} color="#737373" />
      </Pressable>
    </View>
  );
}
