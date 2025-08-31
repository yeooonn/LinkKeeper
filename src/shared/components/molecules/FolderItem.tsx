import { FolderInterface } from "@/entites/folder/types";
import Typography from "@/shared/components/atoms/Typography";
import cn from "@/shared/utils/cn";
import { Dispatch, SetStateAction } from "react";

interface FolderItemProps {
  folder: FolderInterface;
  onClick: () => void;
  expandedFolders: string[];
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
  selectedColor?: string;
  unSelectedColor?: string;
}

export const FolderItem = ({
  folder,
  onClick,
  expandedFolders,
  selectedMenu,
  setSelectedMenu,
  selectedColor,
  unSelectedColor,
}: FolderItemProps) => {
  const isOpenFolder = expandedFolders.includes(folder.id);

  return (
    <div key={folder.id}>
      <div
        onClick={onClick}
        className="flex gap-3 px-3 py-2 mb-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#4d6080]"
      >
        {isOpenFolder ? (
          <div className="flex gap-2">
            <i className="bi bi-chevron-down" />
            <i className="bi bi-folder2-open" />
          </div>
        ) : (
          <div className="flex gap-2">
            <i className="bi bi-chevron-right" />
            <i className="bi bi-folder" />
          </div>
        )}
        <Typography.P1>{folder.name}</Typography.P1>
      </div>

      {isOpenFolder &&
        folder.children &&
        folder.children.map((childrenFolder) => {
          const isSelected = selectedMenu === childrenFolder.id;

          return (
            <div key={childrenFolder.id} className="pl-9">
              <button
                onClick={() => setSelectedMenu(childrenFolder.id)}
                className={cn(
                  isSelected ? selectedColor : unSelectedColor,
                  "w-full flex gap-3 px-3 py-2 mb-2 rounded-lg cursor-pointer transition-all"
                )}
              >
                <i className="bi bi-folder text-sm" />
                <Typography.P1
                  className={cn(isSelected ? "text-white" : "", "text-sm")}
                >
                  {childrenFolder.name}
                </Typography.P1>
              </button>
            </div>
          );
        })}
    </div>
  );
};
