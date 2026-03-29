import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type Props = {
  title?: string;
};

export function EmptyLinksState({ title = "링크를 추가해 주세요." }: Props) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-16">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-xl bg-background-blueTag">
        <Ionicons name="link" size={36} color="#3b82f6" />
      </View>
      <Text className="text-center text-lg font-bold text-foreground-primary">
        {title}
      </Text>
      <Text className="mt-3 text-center text-sm leading-5 text-foreground-trtiary">
        중요한 링크를 저장하고 체계적으로 관리하세요.{"\n"}
        폴더와 태그로 쉽게 정리할 수 있습니다.
      </Text>
    </View>
  );
}
