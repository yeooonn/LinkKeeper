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
      className="desktop:w-80 laptop:w-70 tablet:inline tablet:w-50 mobile:hidden h-auto overflow-y-auto dark:bg-gray-800 dark:border-gray-700 bg-white border-gray-300 border-r"
    >
      <div className="px-4 desktop:py-5.5 tablet:py-4 border-b border-gray-200 dark:border-gray-600">
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
      {/* <div className="mobile:bg-red-500 tablet:bg-orange-500 laptop:bg-blue-500 desktop:bg-green-500">
        반응형 테스트
      </div> */}
    </aside>
  );
};

export default Sidebar;
