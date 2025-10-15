"use client";
import Typography from "@/shared/components/atoms/Typography";
import { FolderItem } from "@/entites/folder/ui/FolderItem";
import { Dispatch, SetStateAction } from "react";
import { useFolder } from "@/entites/folder/model/useFolder";
import { SELECTED_COLOR, UNSELECTED_COLOR } from "@/shared/constants/colors";
import { useGetFolderList } from "@/entites/folder/model/folder.queries";
import FolderSkeletonUI from "@/entites/folder/ui/FolderSkeletonUI";

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
  const { data: folderList, isLoading } = useGetFolderList();

  if (isLoading) {
    return <FolderSkeletonUI />;
  }

  if (folderList === undefined || folderList.length === 0) {
    return (
      <>
        <div className="px-4">
          <Typography.P2 className="font-semibold">폴더</Typography.P2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <i className="bi bi-folder text-2xl text-gray-400" />
          </div>
          <p className="text-gray-600 text-center mb-1 font-medium">
            생성된 폴더가 없습니다
          </p>
          <p className="text-gray-400 text-center text-sm">
            새로운 폴더를 만들어보세요
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {showTitle && (
        <div className="px-4">
          <Typography.P2 className="font-semibold">폴더</Typography.P2>
        </div>
      )}
      <div className="p-3">
        {folderList.map((folder) => {
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
