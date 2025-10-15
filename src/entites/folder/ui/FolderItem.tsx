import { FolderResponse } from "@/entites/folder/model/folder.type";
import Typography from "@/shared/components/atoms/Typography";
import cn from "@/shared/utils/cn";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface FolderItemProps {
  folder: FolderResponse;
  onClick: () => void;
  expandedFolders: string[];
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
  selectedColor?: string;
  unSelectedColor?: string;
  showFolderSelectionHighlight?: boolean;
  showChildFolderSelectionHighlight?: boolean;
}

export const FolderItem = ({
  folder,
  onClick,
  expandedFolders,
  selectedMenu,
  setSelectedMenu,
  selectedColor,
  unSelectedColor,
  showFolderSelectionHighlight = false,
  showChildFolderSelectionHighlight = true,
}: FolderItemProps) => {
  const router = useRouter();
  const isOpenFolder = expandedFolders.includes(folder.id);
  const isSelected =
    showFolderSelectionHighlight && selectedMenu === folder.name;

  return (
    <div key={folder.id}>
      <div
        onClick={() => {
          if (!showFolderSelectionHighlight) onClick();
          setSelectedMenu(folder.name);
        }}
        className={cn(
          isSelected ? selectedColor : unSelectedColor,
          !isSelected && "hover:bg-background-hover",
          "flex gap-3 px-3 py-2 mb-2 rounded-lg cursor-pointer items-center"
        )}
      >
        {isOpenFolder ? (
          <div
            className="flex gap-2"
            onClick={showFolderSelectionHighlight ? onClick : () => {}}
          >
            <i className="bi bi-chevron-down desktop:text-base text-xs" />
            <i className="bi bi-folder2-open desktop:text-base text-xs" />
          </div>
        ) : (
          <div
            className="flex gap-2"
            onClick={showFolderSelectionHighlight ? onClick : () => {}}
          >
            <i className="bi bi-chevron-right desktop:text-base text-xs" />
            <i className="bi bi-folder desktop:text-base text-xs" />
          </div>
        )}
        <Typography.P1
          className={cn(isSelected ? "text-white" : "text-foreground-primary")}
        >
          {folder.name}
        </Typography.P1>
      </div>

      {isOpenFolder &&
        folder.links &&
        folder.links.map((childrenFolder) => {
          const isSelected =
            showChildFolderSelectionHighlight &&
            selectedMenu === childrenFolder.title;

          return (
            <div key={childrenFolder.id} className="pl-9">
              <button
                onClick={() => {
                  setSelectedMenu(childrenFolder.title);
                  router.push(`/links/${childrenFolder.title}`);
                  localStorage.removeItem("searchValue");
                }}
                className={cn(
                  isSelected ? selectedColor : unSelectedColor,
                  "w-full flex gap-3 desktop:px-3 desktop:py-2 px-2.5 py-1.5 mb-2 rounded-lg cursor-pointer transition-all items-center"
                )}
              >
                {isSelected ? (
                  <i className="bi bi-folder2-open desktop:text-base text-xs" />
                ) : (
                  <i className="bi bi-folder desktop:text-base text-xs" />
                )}

                <Typography.P1
                  className={cn(isSelected ? "text-white" : "", "text-sm")}
                >
                  {childrenFolder.title}
                </Typography.P1>
              </button>
            </div>
          );
        })}
    </div>
  );
};
