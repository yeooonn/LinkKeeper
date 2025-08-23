"use client";
import Typography from "@/shared/components/atoms/Typography";
import { useSidebar } from "../model/useSidebar";
import { FOLDER_LIST } from "../lib/folderList";
import { FolderItem } from "@/shared/components/molecules/FolderItem";

const FolderSection = () => {
  const {
    selectedChildrenFolder,
    setSelectedChildrenFolder,
    expandedFolders,
    selectedColor,
    unSelectedColor,
    onClickFolder,
  } = useSidebar();

  return (
    <>
      <div className="px-4">
        <Typography.P1 className="font-semibold">폴더</Typography.P1>
      </div>
      <div className="p-3">
        {FOLDER_LIST.map((folder) => {
          return (
            <FolderItem
              key={folder.id}
              folder={folder}
              onClick={() => onClickFolder(folder.id)}
              expandedFolders={expandedFolders}
              selectedChildrenFolder={selectedChildrenFolder}
              setSelectedChildrenFolder={setSelectedChildrenFolder}
              selectedColor={selectedColor}
              unSelectedColor={unSelectedColor}
            />
          );
        })}
      </div>
    </>
  );
};

export default FolderSection;
