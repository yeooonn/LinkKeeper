"use client";
import Typography from "@/shared/components/atoms/Typography";
import { FolderItem } from "@/entites/folder/ui/FolderItem";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFolder } from "@/entites/folder/model/useFolder";
import { SELECTED_COLOR, UNSELECTED_COLOR } from "@/shared/constants/colors";
import { useGetFolderList } from "@/entites/folder/model/folder.queries";
import FolderSkeletonUI from "@/entites/folder/ui/FolderSkeletonUI";
import { useUser } from "@/shared/hooks/useUser";
import { FolderResponse } from "../model/folder.type";

interface MenuSectionProps {
  searchFolderValue?: string;
  showTitle?: boolean;
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
  showFolderSelectionHighlight?: boolean;
  showChildFolderSelectionHighlight?: boolean;
  showAddFolderInput?: boolean;
}

const FolderSection = ({
  searchFolderValue,
  selectedMenu,
  setSelectedMenu,
  showTitle = true,
  showFolderSelectionHighlight = false,
  showChildFolderSelectionHighlight = true,
  showAddFolderInput = false,
}: MenuSectionProps) => {
  const { user } = useUser();

  const { expandedFolders, onClickFolder } = useFolder();
  const { data: folderList, isLoading } = useGetFolderList(user?.id || "");
  const [filteredFolderList, setFilteredFolderList] = useState<
    FolderResponse[]
  >([]);

  useEffect(() => {
    if (folderList) {
      const filtered = searchFolderValue
        ? folderList.filter((item) => item.name.includes(searchFolderValue))
        : folderList;

      setFilteredFolderList(filtered);
    }
  }, [searchFolderValue, folderList]);

  if (isLoading) {
    return <FolderSkeletonUI />;
  }

  if (
    filteredFolderList === undefined ||
    (filteredFolderList.length === 0 && !showAddFolderInput)
  ) {
    return (
      <>
        <div className="px-4">
          <Typography.P2 className="font-semibold">폴더</Typography.P2>
        </div>
        <div className="flex flex-col items-center justify-center pb-13 pt-6 px-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <i className="bi bi-folder text-2xl text-gray-400" />
          </div>
          {user && (
            <p className="text-gray-600 text-center font-medium">
              생성된 폴더가 없습니다
              <br />
              새로운 폴더를 만들어보세요
            </p>
          )}
          {!user && (
            <p className="text-gray-400 text-center text-sm">
              로그인하여 폴더와 링크를 <br />
              관리해보세요
            </p>
          )}
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
      <div className="p-3 min-h-57">
        {filteredFolderList.map((folder) => {
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
