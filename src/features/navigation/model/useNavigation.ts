import { useState } from "react";

export const useNavigation = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("전체");
  const selectedColor = "bg-blue-500 text-white";
  const unSelectedColor =
    "bg-white hover:bg-gray-100 dark:bg-[#212936] dark:hover:bg-[#4d6080]";

  return {
    selectedMenu,
    setSelectedMenu,
    selectedColor,
    unSelectedColor,
  };
};
