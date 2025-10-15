import { MenuInterface } from "@/entites/menu/model/types";

// menu 데이터
export const FILTER_LIST: MenuInterface[] = [
  {
    icon: "bi bi-asterisk",
    selectedIcon: "bi bi-asterisk",
    text: "전체",
    id: "전체",
  },
  {
    icon: "bi bi-eye-slash",
    selectedIcon: "bi bi-eye-slash-fill",
    text: "읽지 않음",
    id: "읽지 않음",
  },
  {
    icon: "bi bi-star",
    selectedIcon: "bi bi-star-fill",
    text: "즐겨찾기",
    id: "즐겨찾기",
  },
  {
    icon: "bi bi-bell",
    selectedIcon: "bi bi-bell-fill",
    text: "알림 설정",
    id: "알림 설정",
  },
];
