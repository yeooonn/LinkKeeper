import { useState } from "react";

export const useFolder = () => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  // 열린 폴더 관리하는 함수
  const onClickFolder = (folderId: string) => {
    setExpandedFolders((prev: string[]) =>
      prev.includes(folderId)
        ? prev.filter((id: string) => id !== folderId)
        : [...prev, folderId]
    );
  };

  return {
    expandedFolders,
    setExpandedFolders,
    onClickFolder,
  };
};
