"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import MenuSection from "@/entites/menu/ui/MenuSection";
import FolderSection from "@/entites/folder/ui/FolderSection";
import ProfileSection from "@/features/profile/ui/ProfileSection";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState<string>("전체");
  const pathName = usePathname();
  const item = decodeURIComponent(pathName).split("/")[2];

  useEffect(() => {
    setSelectedItem(item);
  }, [item]);

  return (
    <aside
      style={{ scrollbarWidth: "none" }}
      className="desktop:w-80 laptop:w-70 tablet:inline tablet:w-50 mobile:hidden h-auto overflow-y-auto bg-background-secondary border-border-primary border-r transition-all"
    >
      <div className="px-4 desktop:py-5.5 tablet:py-4 border-b border-border-primary">
        <ProfileSection />
      </div>
      <div className="pt-7 border-b border-border-primary">
        <MenuSection
          selectedMenu={selectedItem}
          setSelectedMenu={setSelectedItem}
        />
      </div>
      <div className="py-6">
        <FolderSection
          selectedMenu={selectedItem}
          setSelectedMenu={setSelectedItem}
        />
      </div>
      {/* <div className="mobile:bg-red-500 tablet:bg-orange-500 laptop:bg-blue-500 desktop:bg-green-500">
        반응형 테스트
      </div> */}
    </aside>
  );
};

export default Sidebar;
