import type { ComponentProps } from "react";
import type IoniconsType from "@expo/vector-icons/Ionicons";

type IonName = ComponentProps<typeof IoniconsType>["name"];

export type FilterMenuItem = {
  id: string;
  text: string;
  icon: IonName;
  iconSelected: IonName;
};

export const FILTER_LIST: FilterMenuItem[] = [
  {
    icon: "apps-outline",
    iconSelected: "apps",
    text: "전체",
    id: "전체",
  },
  {
    icon: "eye-off-outline",
    iconSelected: "eye-off",
    text: "읽지 않음",
    id: "읽지 않음",
  },
  {
    icon: "star-outline",
    iconSelected: "star",
    text: "즐겨찾기",
    id: "즐겨찾기",
  },
  {
    icon: "notifications-outline",
    iconSelected: "notifications",
    text: "알림 설정",
    id: "알림 설정",
  },
];
