"use client";
import Typography from "@/shared/components/atoms/Typography";
import { useSidebar } from "@/features/navigation/model/useSidebar";
import { MenuItem } from "@/features/navigation/ui/MenuItem";
import { FolderItem } from "@/features/navigation/ui/FolderItem";
import { MENU_LIST } from "@/features/navigation/lib/menuList";
import { FOLDER_LIST } from "@/features/navigation/lib/folderList";

const Sidebar = () => {
  const {
    selectedMenu,
    setSelectedMenu,
    selectedChildrenFolder,
    setSelectedChildrenFolder,
    expandedFolders,
    selectedColor,
    unSelectedColor,
    onClickFolder,
  } = useSidebar();

  return (
    <aside className="w-80 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300 border-r h-screen overflow-y-auto">
      <div className="px-4 mt-30 mb-10">유저 정보 들어갈 예정</div>

      <div className="border-b border-gray-200">
        <div className="px-4">
          <Typography.P1 className="font-semibold">빠른 필터</Typography.P1>
        </div>
        <div className="p-3">
          {MENU_LIST.map((menu) => (
            <MenuItem
              key={menu.id}
              menu={menu}
              onClick={() => setSelectedMenu(menu.text)}
              isSelected={selectedMenu === menu.text}
              selectedColor={selectedColor}
              unSelectedColor={unSelectedColor}
            />
          ))}
        </div>
      </div>

      <div className="py-6">
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
      </div>
    </aside>
  );
};

export default Sidebar;
