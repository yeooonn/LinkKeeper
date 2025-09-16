"use client";
import Typography from "@/shared/components/atoms/Typography";
import { MenuItem } from "@/shared/components/molecules/MenuItem";
import { MENU_LIST } from "@/features/navigation/lib/menuList";
import { Dispatch, SetStateAction, useState } from "react";
import { SELECTED_COLOR, UNSELECTED_COLOR } from "@/shared/constants/colors";

interface MenuSectionProps {
  selectedMenu: string;
  setSelectedMenu: Dispatch<SetStateAction<string>>;
}

const MenuSection = ({ selectedMenu, setSelectedMenu }: MenuSectionProps) => {
  return (
    <>
      <div className="px-4">
        <Typography.P2 className="font-semibold">빠른 필터</Typography.P2>
      </div>
      <div className="p-3">
        {MENU_LIST.map((menu) => (
          <MenuItem
            key={menu.id}
            menu={menu}
            onClick={() => setSelectedMenu(menu.text)}
            isSelected={selectedMenu === menu.text}
            selectedColor={SELECTED_COLOR}
            unSelectedColor={UNSELECTED_COLOR}
          />
        ))}
      </div>
    </>
  );
};

export default MenuSection;
