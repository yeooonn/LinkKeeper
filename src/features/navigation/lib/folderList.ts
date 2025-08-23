import { FolderInterface } from "@/entites/folder/types";

export const FOLDER_LIST: FolderInterface[] = [
  {
    id: "1",
    name: "업무",
    children: [
      { id: "1-1", name: "개발 자료" },
      {
        id: "1-2",
        name: "디자인 참고",
      },
    ],
  },
  {
    id: "2",
    name: "개인",
    children: [{ id: "2-1", name: "학습", children: [{ id: "2-1-1", name: "타입스크립트" }, { id: "2-1-2", name: "자바스크립트" }] }],
  },
  { id: "3", name: "아카이브" },
];