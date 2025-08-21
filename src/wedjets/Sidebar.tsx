"use client";
import MenuSection from "@/features/navigation/ui/MenuSection";
import FolderSection from "@/features/navigation/ui/FolderSection";
import ProfileSection from "@/features/profile/ui/ProfileSection";

const Sidebar = () => {
  return (
    <aside className="w-80 dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300 border-r h-screen overflow-y-auto">
      <div className="px-4 py-10 mt-30 mb-10 border-b border-gray-200 dark:border-gray-600">
        <ProfileSection />
      </div>
      <div className="border-b border-gray-200 dark:border-gray-600">
        <MenuSection />
      </div>
      <div className="py-6">
        <FolderSection />
      </div>
    </aside>
  );
};

export default Sidebar;
