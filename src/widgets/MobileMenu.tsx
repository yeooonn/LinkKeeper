"use client";
import Typography from "@/shared/components/atoms/Typography";
import cn from "@/shared/utils/cn";
import ProfileSection from "@/features/profile/ui/ProfileSection";
import FolderSection from "@/features/navigation/ui/FolderSection";
import { useState } from "react";
import { MENU_LIST } from "@/shared/constants/menuList";

interface RenderMobileMenuButtonType {
  icon: string;
  selectedIcon?: string;
  buttonText: string;
  isSelected: boolean;
  onclick: () => void;
}

const RenderMobileMenuButton = ({
  icon,
  selectedIcon,
  buttonText,
  isSelected,
  onclick,
}: RenderMobileMenuButtonType) => {
  return (
    <button className="w-15 h-15 flex-col items-center flex" onClick={onclick}>
      <i
        className={cn(
          "text-xl",
          isSelected ? selectedIcon || icon : icon,
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
        {buttonText}
      </Typography.P1>
    </button>
  );
};

const MobileMenu = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const isSelected = selectedItem === "카테고리";

  return (
    <>
      {selectedItem === "카테고리" && (
        <div className="dark:bg-[#121826] fixed top-15 left-0 w-full h-full z-99 px-4 pb-40 bg-white">
          <div className="px-4 border-b border-gray-200 dark:border-gray-600">
            <ProfileSection />
          </div>
          <div className="py-6">
            <FolderSection
              selectedMenu={selectedItem}
              setSelectedMenu={setSelectedItem}
            />
          </div>
        </div>
      )}

      <div className="dark:bg-[#121826] fixed border-t border-gray-200 dark:border-gray-500 bottom-0 w-full h-20 bg-white mobile:inline tablet:hidden laptop:hidden desktop:hidden z-999">
        <div className="flex py-2 px-6 justify-between">
          <RenderMobileMenuButton
            icon="bi bi-list"
            buttonText="카테고리"
            isSelected={isSelected}
            onclick={() => setSelectedItem("카테고리")}
          />

          {MENU_LIST.map((menu) => {
            const isSelected = selectedItem === menu.text;
            return (
              <RenderMobileMenuButton
                key={menu.text}
                icon={menu.icon}
                selectedIcon={menu.selectedIcon}
                buttonText={menu.text}
                isSelected={isSelected}
                onclick={() => setSelectedItem(menu.text)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
