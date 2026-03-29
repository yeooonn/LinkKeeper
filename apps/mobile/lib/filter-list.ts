import type { ComponentProps } from "react";
import type IoniconsType from "@expo/vector-icons/Ionicons";

type IonName = ComponentProps<typeof IoniconsType>["name"];

/** 웹 Bootstrap `bi-asterisk` / `bi-bookmark` 등과 탭 의미를 맞춤 */
export type FilterMenuItem =
  | {
      id: string;
      text: string;
      iconSource: "material-community";
      icon: "asterisk";
      iconSelected: "asterisk";
    }
  | {
      id: string;
      text: string;
      iconSource: "ionicons";
      icon: IonName;
      iconSelected: IonName;
    };

export const FILTER_LIST: FilterMenuItem[] = [
  {
    iconSource: "material-community",
    icon: "asterisk",
    iconSelected: "asterisk",
    text: "전체",
    id: "전체",
  },
  {
    iconSource: "ionicons",
    icon: "eye-off-outline",
    iconSelected: "eye-off",
    text: "읽지 않음",
    id: "읽지 않음",
  },
  {
    iconSource: "ionicons",
    icon: "bookmark-outline",
    iconSelected: "bookmark",
    text: "즐겨찾기",
    id: "즐겨찾기",
  },
  {
    iconSource: "ionicons",
    icon: "notifications-outline",
    iconSelected: "notifications",
    text: "알림 설정",
    id: "알림 설정",
  },
];
