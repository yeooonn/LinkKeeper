"use client";
import Typography from "@/shared/components/atoms/Typography";
import { useNavigation } from "@/features/navigation/model/useNavigation";
import { FOLDER_LIST } from "@/features/navigation/lib/folderList";
import { FolderItem } from "@/shared/components/molecules/FolderItem";
import { Dispatch, SetStateAction } from "react";
import { useFolder } from "../model/useFolder";

interface MenuSectionProps {
  showTitle?: boolean;
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
  showFolderSelectionHighlight?: boolean;
  showChildFolderSelectionHighlight?: boolean;
}

const FolderSection = ({
  selectedMenu,
  setSelectedMenu,
  showTitle = true,
  showFolderSelectionHighlight = false,
  showChildFolderSelectionHighlight = true,
}: MenuSectionProps) => {
  const { selectedColor, unSelectedColor } = useNavigation();
  const { expandedFolders, onClickFolder } = useFolder();

  return (
    <>
      {showTitle && (
        <div className="px-4">
          <Typography.P2 className="font-semibold">폴더</Typography.P2>
        </div>
      )}
      <div className="p-3">
        {FOLDER_LIST.map((folder) => {
          return (
            <FolderItem
              key={folder.id}
              folder={folder}
              onClick={() => onClickFolder(folder.id)}
              expandedFolders={expandedFolders}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
              selectedColor={selectedColor}
              unSelectedColor={unSelectedColor}
              showFolderSelectionHighlight={showFolderSelectionHighlight}
              showChildFolderSelectionHighlight={
                showChildFolderSelectionHighlight
              }
            />
          );
        })}
      </div>
    </>
  );
};

export default FolderSection;
