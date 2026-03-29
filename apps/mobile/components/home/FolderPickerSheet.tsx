import type { FolderApiItem } from "../../lib/folder-types";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal } from "../ui/BottomSheetModal";

const WINDOW_H = Dimensions.get("window").height;

type Props = {
  visible: boolean;
  onClose: () => void;
  folders: FolderApiItem[] | undefined;
  loading: boolean;
  onPickFolder: (slug: string) => void;
};

export function FolderPickerSheet({
  visible,
  onClose,
  folders,
  loading,
  onPickFolder,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
      <View
        className="rounded-t-3xl bg-background-secondary"
        style={{
          paddingBottom: insets.bottom,
          maxHeight: WINDOW_H * 0.78,
        }}
      >
        <View className="flex-row items-center justify-between border-b border-border-primary px-5 py-4">
          <Text className="text-lg font-bold text-foreground-primary">
            폴더
          </Text>
          <Pressable onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={24} color="#525252" />
          </Pressable>
        </View>

        {loading ? (
          <View className="items-center py-20">
            <ActivityIndicator />
          </View>
        ) : !folders?.length ? (
          <View className="items-center px-6 py-20">
            <Ionicons name="folder-open-outline" size={48} color="#d4d4d4" />
            <Text className="mt-5 text-center text-foreground-trtiary">
              링크가 있는 폴더가 없습니다.
            </Text>
          </View>
        ) : (
          <ScrollView
            className="px-4 pt-3"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 12 }}
          >
            {folders.map((f) => (
              <Pressable
                key={f.id}
                onPress={() => {
                  onPickFolder(`${f.name}_${f.id}`);
                  onClose();
                }}
                className="mb-1.5 flex-row items-center gap-3 rounded-xl px-4 py-3.5 active:bg-background-hover"
              >
                <Ionicons name="folder" size={22} color="#3b82f6" />
                <Text className="flex-1 text-base text-foreground-primary">
                  {f.name}
                </Text>
                <Text className="text-xs text-foreground-trtiary">
                  {f.links.length}개
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>
    </BottomSheetModal>
  );
}
