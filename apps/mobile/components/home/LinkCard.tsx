import type { LinkResponse } from "@linkkeeper/shared";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";

/** 카드 전체에만 아주 약한 깊이감 (iOS/Android 각각) */
const linkCardElevation = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 2.5,
  },
  android: { elevation: 1 },
  default: {},
});
import { formatTimeAgo, linkListTimestamp } from "../../lib/format-time-ago";
import { LinkActionsSheet } from "./LinkActionsSheet";

type Props = {
  item: LinkResponse;
  userId: string;
  onToggleBookmark: (linkId: number, next: boolean) => Promise<void>;
  onDelete: (linkId: number) => Promise<void>;
  onEdit: (item: LinkResponse) => void;
};

export function LinkCard({
  item,
  userId,
  onToggleBookmark,
  onDelete,
  onEdit,
}: Props) {
  const [actionsOpen, setActionsOpen] = useState(false);
  const isRead = item.linkReads?.some((r) => r.userId === userId) ?? false;

  async function openLink() {
    try {
      await Linking.openURL(item.url);
    } catch {
      Alert.alert(
        "링크를 열 수 없음",
        "시뮬레이터나 기기 설정 때문에 일부 URL은 열리지 않을 수 있습니다.",
      );
    }
  }

  function confirmDelete() {
    Alert.alert("링크 삭제", `"${item.title}" 삭제할까요?`, [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => void onDelete(item.id),
      },
    ]);
  }

  return (
    <View
      className="mx-4 mb-2 rounded-xl bg-background-secondary"
      style={linkCardElevation}
    >
      <View className="p-3">
        <View className="flex-row items-start justify-between gap-2">
          <Pressable
            onPress={() => void openLink()}
            className="min-w-0 flex-1 active:opacity-80"
          >
            <View className="flex-row flex-wrap items-center gap-2">
              <View className="rounded-full bg-background-hover px-2 py-0.5">
                <Text
                  className="text-xs font-medium text-foreground-secondary"
                  numberOfLines={1}
                >
                  {item.folder.name}
                </Text>
              </View>
            </View>
            <Text
              className="mt-1 text-base font-bold text-foreground-primary"
              numberOfLines={2}
            >
              {item.title}
            </Text>
          </Pressable>
          <View className="flex-row items-center gap-2.5">
            <Ionicons
              name={
                item.alertType !== "NONE"
                  ? "notifications-outline"
                  : "notifications-off-outline"
              }
              size={18}
              color={item.alertType !== "NONE" ? "#ea580c" : "#737373"}
            />
            <Ionicons
              name={isRead ? "eye-outline" : "eye-off-outline"}
              size={18}
              color={isRead ? "#16a34a" : "#737373"}
            />
            <Pressable
              hitSlop={6}
              onPress={() => void onToggleBookmark(item.id, !item.isBookmark)}
            >
              <Ionicons
                name={item.isBookmark ? "bookmark" : "bookmark-outline"}
                size={20}
                color={item.isBookmark ? "#eab308" : "#737373"}
              />
            </Pressable>
            <Pressable
              hitSlop={8}
              onPress={() => setActionsOpen(true)}
              accessibilityLabel="링크 메뉴"
            >
              <Ionicons name="ellipsis-vertical" size={20} color="#525252" />
            </Pressable>
          </View>
        </View>

        <Pressable onPress={() => void openLink()}>
          {item.memo ? (
            <Text
              className="mt-2 text-sm leading-5 text-foreground-secondary"
              numberOfLines={2}
            >
              {item.memo}
            </Text>
          ) : (
            <Text
              className="mt-2 text-sm text-foreground-trtiary"
              numberOfLines={2}
            >
              등록된 메모가 없습니다.
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => void openLink()}
          className="mt-3 flex-row flex-wrap items-center justify-between gap-2"
        >
          <View className="max-w-[70%] flex-row flex-wrap gap-x-3 gap-y-1">
            {item.linkTags.map((lt) => (
              <Text key={lt.tag.id} className="text-xs text-foreground-blueTag">
                {lt.tag.name}
              </Text>
            ))}
          </View>
          <Text className="text-xs text-foreground-trtiary">
            {formatTimeAgo(linkListTimestamp(item.createdAt, item.updatedAt))}
          </Text>
        </Pressable>
      </View>

      <LinkActionsSheet
        visible={actionsOpen}
        onClose={() => setActionsOpen(false)}
        linkTitle={item.title}
        onEdit={() => onEdit(item)}
        onDelete={confirmDelete}
      />
    </View>
  );
}
