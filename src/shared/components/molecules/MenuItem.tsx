import cn from "@/shared/utils/cn";
import Typography from "@/shared/components/atoms/Typography";
import { MenuInterface } from "@/entites/menu/types";

interface MenuItemProps {
  menu: MenuInterface;
  isSelected: boolean;
  onClick: () => void;
  selectedColor?: string;
  unSelectedColor?: string;
}

export const MenuItem = ({
  menu,
  onClick,
  isSelected,
  selectedColor,
  unSelectedColor,
}: MenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        isSelected ? selectedColor : unSelectedColor,
        "w-full flex gap-3 desktop:px-3 desktop:py-2 px-2.5 py-1.5 mb-2 rounded-lg cursor-pointer transition-all items-center"
      )}
    >
      <i className={cn(menu.icon, "desktop:text-base text-xs")} />
      <Typography.P1 className={cn(isSelected ? "text-white" : "")}>
        {menu.text}
      </Typography.P1>
    </button>
  );
};
