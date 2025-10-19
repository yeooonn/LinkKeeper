"use client";
import cn from "@/shared/utils/cn";
import { useEffect, useState } from "react";
import Typography from "@/shared/components/atoms/Typography";
import ProfileSection from "@/features/profile/ui/ProfileSection";
import FolderSection from "@/entites/folder/ui/FolderSection";
import { FILTER_LIST } from "@/entites/menu/model/fiterList";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <button
      className="w-15 h-15 flex-col items-center flex"
      onClick={() => {
        onclick();
        router.push(`/links/${buttonText}`);
      }}
    >
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
  const [selectedFolderItem, setSelectedFolderItem] = useState<string>("");
  const pathName = usePathname();
  const item = decodeURIComponent(pathName).split("/")[2];
  const isSelected = selectedItem === "카테고리";

  useEffect(() => {
    if (item !== "카테고리") setSelectedItem(item);
    else setSelectedItem("카테고리");
  }, [item]);

  return (
    <>
      {selectedItem === "카테고리" && (
        <div className="bg-background-secondary border-border-primary border-r fixed top-15 left-0 w-full h-full z-99 px-4 pb-40">
          <div className="px-4 border-b border-border-primary">
            <ProfileSection />
          </div>
          <div className="py-6">
            <FolderSection
              selectedMenu={selectedFolderItem}
              setSelectedMenu={setSelectedFolderItem}
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

          {FILTER_LIST.map((menu) => {
            const isSelected = selectedItem === menu.text;
            return (
              <RenderMobileMenuButton
                key={menu.text}
                icon={menu.icon}
                selectedIcon={menu.selectedIcon}
                buttonText={menu.text}
                isSelected={isSelected}
                onclick={() => {
                  setSelectedItem(menu.text);
                  localStorage.removeItem("searchValue");
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
