import Typography from "@/shared/components/atoms/Typography";
import { MenuItem } from "@/shared/components/molecules/MenuItem";
import { MENU_LIST } from "../lib/menuList";
import { useSidebar } from "../model/useSidebar";

const MenuSection = () => {
  const { selectedMenu, setSelectedMenu, selectedColor, unSelectedColor } =
    useSidebar();

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
