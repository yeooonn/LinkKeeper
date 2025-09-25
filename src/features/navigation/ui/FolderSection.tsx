"use client";
import Typography from "@/shared/components/atoms/Typography";
import { FolderItem } from "@/shared/components/molecules/FolderItem";
import { Dispatch, SetStateAction } from "react";
import { useFolder } from "@/features/navigation/model/useFolder";
import { SELECTED_COLOR, UNSELECTED_COLOR } from "@/shared/constants/colors";
import { FOLDER_LIST } from "@/shared/constants/folderList";

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
              selectedColor={SELECTED_COLOR}
              unSelectedColor={UNSELECTED_COLOR}
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
