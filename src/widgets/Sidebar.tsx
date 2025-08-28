"use client";
import MenuSection from "@/features/navigation/ui/MenuSection";
import FolderSection from "@/features/navigation/ui/FolderSection";
import ProfileSection from "@/features/profile/ui/ProfileSection";
import { useNavigation } from "@/features/navigation/model/useNavigation";

const Sidebar = () => {
  const { selectedMenu, setSelectedMenu } = useNavigation();

  return (
    <aside
      style={{ scrollbarWidth: "none" }}
      className="w-80 h-auto overflow-y-auto dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300 border-r"
    >
      <div className="px-4 pt-25 pb-5 border-b border-gray-200 dark:border-gray-600">
        <ProfileSection />
      </div>
      <div className="pt-7 border-b border-gray-200 dark:border-gray-600">
        <MenuSection
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
      <div className="py-6">
        <FolderSection
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
