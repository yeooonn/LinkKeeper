"use client";
import Typography from "@/shared/components/atoms/Typography";
import { MenuItem } from "@/entites/menu/ui/MenuItem";
import { Dispatch, SetStateAction } from "react";
import { SELECTED_COLOR, UNSELECTED_COLOR } from "@/shared/constants/colors";
import { FILTER_LIST } from "@/entites/menu/model/fiterList";

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
        {FILTER_LIST.map((menu) => (
          <MenuItem
            key={menu.id}
            menu={menu}
            onClick={() => {
              setSelectedMenu(menu.text);
              localStorage.removeItem("searchValue");
            }}
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
