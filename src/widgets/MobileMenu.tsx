"use client";
import { MENU_LIST } from "@/features/navigation/lib/menuList";
import { useNavigation } from "@/features/navigation/model/useNavigation";
import Typography from "@/shared/components/atoms/Typography";
import cn from "@/shared/utils/cn";
import ProfileSection from "@/features/profile/ui/ProfileSection";
import FolderSection from "@/features/navigation/ui/FolderSection";

const MobileMenu = () => {
  const { selectedMenu, setSelectedMenu } = useNavigation();
  const isSelected = selectedMenu === "카테고리";

  return (
    <>
      {selectedMenu === "카테고리" && (
        <div className="dark:bg-[#121826] fixed top-15 left-0 w-full h-full z-99 px-4 pb-40 bg-white">
          <div className="px-4 border-b border-gray-200 dark:border-gray-600">
            <ProfileSection />
          </div>
          <div className="py-6">
            <FolderSection
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </div>
        </div>
      )}

      <div className="dark:bg-[#121826] fixed border-t border-gray-200 dark:border-gray-500 bottom-0 w-full h-20 bg-white mobile:inline tablet:hidden laptop:hidden desktop:hidden z-999">
        <div className="flex py-2 px-6 justify-between">
          <button
            className="w-15 h-15 flex-col items-center flex"
            onClick={() => {
              setSelectedMenu("카테고리");
            }}
          >
            <i
              className={cn(
                "bi bi-list text-xl",
                isSelected
                  ? "text-black dark:text-white"
                  : "text-gray-500 dark:text-gray-300"
              )}
            />
            <Typography.P1
              className={cn(
                isSelected
                  ? "text-black dark:text-white"
                  : "text-gray-500 dark:text-gray-300",
                "text-sm!"
              )}
            >
              카테고리
            </Typography.P1>
          </button>

          {MENU_LIST.map((menu) => {
            const isSelected = selectedMenu === menu.text;
            return (
              <button
                className="w-15 h-15 flex-col items-center flex"
                key={menu.id}
                onClick={() => {
                  setSelectedMenu(menu.text);
                }}
              >
                <i
                  className={cn(
                    "text-xl",
                    isSelected ? menu.selectedIcon : menu.icon,
                    isSelected
                      ? "text-black dark:text-white"
                      : "text-gray-500 dark:text-gray-300"
                  )}
                />
                <Typography.P1
                  className={cn(
                    "text-sm!",
                    isSelected
                      ? "text-black dark:text-white"
                      : "text-gray-500 dark:text-gray-300"
                  )}
                >
                  {menu.text}
                </Typography.P1>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
