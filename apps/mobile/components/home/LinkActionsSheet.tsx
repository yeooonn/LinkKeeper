import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal } from "../ui/BottomSheetModal";

type Props = {
  visible: boolean;
  onClose: () => void;
  /** 시트 헤더에 표시할 링크 제목 */
  linkTitle: string;
  onEdit: () => void;
  /** 삭제 확인(Alert 등)은 호출부에서 처리 */
  onDelete: () => void;
};

export function LinkActionsSheet({
  visible,
  onClose,
  linkTitle,
  onEdit,
  onDelete,
}: Props) {
  const insets = useSafeAreaInsets();

  /** 액션 시트 Modal이 완전히 닫힌 뒤에 링크 수정 Modal을 열어야 충돌하지 않음 */
  function handleEdit() {
    onClose();
    setTimeout(() => {
      onEdit();
    }, 320);
  }

  function handleDelete() {
    onClose();
    setTimeout(() => {
      onDelete();
    }, 320);
  }

  return (
    <BottomSheetModal visible={visible} onClose={onClose}>
      <View
        className="rounded-t-3xl bg-background-secondary"
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="flex-row items-center justify-between border-b border-border-primary px-5 py-4">
          <Text
            className="flex-1 pr-2 text-lg font-bold text-foreground-primary"
            numberOfLines={1}
          >
            {linkTitle}
          </Text>
          <Pressable onPress={onClose} hitSlop={12} accessibilityLabel="닫기">
            <Ionicons name="close" size={24} color="#525252" />
          </Pressable>
        </View>

        <View className="px-3 pt-2 pb-4">
          <Pressable
            onPress={handleEdit}
            className="flex-row items-center gap-3 rounded-xl px-4 py-3.5 active:bg-background-hover"
            accessibilityRole="button"
            accessibilityLabel="수정"
          >
            <Ionicons name="create-outline" size={22} color="#404040" />
            <Text className="text-base font-medium text-foreground-primary">
              수정
            </Text>
          </Pressable>
          <Pressable
            onPress={handleDelete}
            className="mt-1 flex-row items-center gap-3 rounded-xl px-4 py-3.5 active:bg-red-50"
            accessibilityRole="button"
            accessibilityLabel="삭제"
          >
            <Ionicons name="trash-outline" size={22} color="#dc2626" />
            <Text className="text-base font-medium text-red-600">삭제</Text>
          </Pressable>
        </View>
      </View>
    </BottomSheetModal>
  );
}
