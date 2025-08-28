"use client";
import Typography from "@/shared/components/atoms/Typography";
import { MenuItem } from "@/shared/components/molecules/MenuItem";
import { MENU_LIST } from "@/features/navigation/lib/menuList";
import { useNavigation } from "@/features/navigation/model/useNavigation";
import { Dispatch, SetStateAction } from "react";

interface MenuSectionProps {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
}

const MenuSection = ({ selectedMenu, setSelectedMenu }: MenuSectionProps) => {
  const { selectedColor, unSelectedColor } = useNavigation();

  return (
    <>
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
    </>
  );
};

export default MenuSection;
