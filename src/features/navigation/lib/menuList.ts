import { MenuInterface } from "@/entites/menu/types";

// menu 데이터
export const MENU_LIST: MenuInterface[] = [
  { icon: "bi bi-asterisk", text: "전체", id: "전체" },
  { icon: "bi bi-eye-slash", text: "읽지 않음", id: "읽지 않음" },
  { icon: "bi bi-star", text: "즐겨찾기", id: "즐겨찾기" },
  { icon: "bi bi-bell", text: "알림 설정", id: "알림 설정" },
];