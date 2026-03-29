import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  onSubmitSearch: () => void;
  placeholder?: string;
};

export function LinkSearchBar({
  value,
  onChangeText,
  onSubmitSearch,
  placeholder = "URL로 검색 후 확인(엔터)",
}: Props) {
  return (
    <View className="flex-row items-center gap-2 px-4 pb-2">
      <View className="min-h-11 flex-1 flex-row items-center rounded-xl border border-border-primary bg-background-secondary px-3">
        <Ionicons name="search" size={18} color="#737373" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={() => onSubmitSearch()}
          returnKeyType="search"
          placeholder={placeholder}
          placeholderTextColor="#a3a3a3"
          autoCapitalize="none"
          autoCorrect={false}
          className="ml-2 flex-1 py-2.5 text-base text-foreground-primary"
        />
      </View>
      <Pressable className="h-11 w-11 items-center justify-center rounded-xl border border-border-primary bg-background-secondary active:bg-background-hover">
        <Ionicons name="options-outline" size={20} color="#525252" />
      </Pressable>
    </View>
  );
}
