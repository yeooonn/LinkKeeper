import { useState } from "react";

export const useSidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("전체");
  const [selectedChildrenFolder, setSelectedChildrenFolder] =
    useState<string>("");
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const selectedColor = "bg-blue-500 text-white";
  const unSelectedColor =
    "bg-white hover:bg-gray-100 dark:bg-[#212936] dark:hover:bg-[#4d6080]";

  // 열린 폴더 관리하는 함수
  const onClickFolder = (folderId: string) => {
    setExpandedFolders((prev: string[]) =>
      prev.includes(folderId)
        ? prev.filter((id: string) => id !== folderId)
        : [...prev, folderId]
    );
  };

  return {
    selectedMenu,
    setSelectedMenu,
    selectedChildrenFolder,
    setSelectedChildrenFolder,
    expandedFolders,
    setExpandedFolders,
    selectedColor,
    unSelectedColor,
    onClickFolder,
  };
};
