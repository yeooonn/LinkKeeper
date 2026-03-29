import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FILTER_LIST } from "../../lib/filter-list";

type Props = {
  categoryOpen: boolean;
  onOpenCategory: () => void;
  activeFilterText: string;
  onSelectFilter: (text: string) => void;
};

export function MobileTabBar({
  categoryOpen,
  onOpenCategory,
  activeFilterText,
  onSelectFilter,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="border-t border-border-primary bg-background-secondary"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
    >
      <View className="flex-row items-center justify-between px-4 pt-2">
        <Pressable
          onPress={onOpenCategory}
          className="min-w-[56px] items-center py-1 active:opacity-70"
        >
          <Ionicons
            name="folder-outline"
            size={22}
            color={categoryOpen ? "#171717" : "#737373"}
          />
          <Text
            className={`mt-0.5 text-xs ${categoryOpen ? "font-semibold text-foreground-primary" : "text-foreground-trtiary"}`}
          >
            폴더
          </Text>
        </Pressable>

        {FILTER_LIST.map((menu) => {
          const selected = !categoryOpen && activeFilterText === menu.text;
          const color = selected ? "#171717" : "#737373";
          return (
            <Pressable
              key={menu.text}
              onPress={() => onSelectFilter(menu.text)}
              className="min-w-[52px] items-center py-1 active:opacity-70"
            >
              {menu.iconSource === "material-community" ? (
                <MaterialCommunityIcons
                  name={menu.icon}
                  size={22}
                  color={color}
                />
              ) : (
                <Ionicons
                  name={selected ? menu.iconSelected : menu.icon}
                  size={22}
                  color={color}
                />
              )}
              <Text
                className={`mt-0.5 text-xs ${selected ? "font-semibold text-foreground-primary" : "text-foreground-trtiary"}`}
                numberOfLines={1}
              >
                {menu.text}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
