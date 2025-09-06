"use client";
import { MENU_LIST } from "@/features/navigation/lib/menuList";
import { useNavigation } from "@/features/navigation/model/useNavigation";
import Typography from "@/shared/components/atoms/Typography";
import cn from "@/shared/utils/cn";

const MobileMenu = () => {
  const { selectedMenu, setSelectedMenu } = useNavigation();
  const isSelected = selectedMenu === "카테고리";

  return (
    <div className="fixed border-t border-gray-200 bottom-0 w-full h-20 bg-white mobile:inline tablet:hidden laptop:hidden desktop:hidden">
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
              isSelected ? "text-black" : "text-gray-500"
            )}
          />
          <Typography.P1
            className={cn(
              isSelected ? "text-black" : "text-gray-500",
              "text-sm"
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
                  isSelected ? "text-black" : "text-gray-500"
                )}
              />
              <Typography.P1
                className={cn(
                  isSelected ? "text-black" : "text-gray-500",
                  "text-sm"
                )}
              >
                {menu.text}
              </Typography.P1>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
