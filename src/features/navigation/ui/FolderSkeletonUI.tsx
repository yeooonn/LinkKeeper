import Typography from "@/shared/components/atoms/Typography";
import { Folder, ChevronRight } from "lucide-react";

const FolderSkeletonItem = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-2 mb-3 rounded-lg animate-pulse">
      <ChevronRight className="w-5 h-5 text-gray-300" />
      <Folder className="w-5 h-5 text-gray-300" />
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
  );
};

const FolderSkeletonUI = () => {
  return (
    <div className="w-full">
      <div className="px-4">
        <Typography.P2 className="font-semibold">폴더</Typography.P2>
      </div>
      <div className="p-3 space-y-1">
        <FolderSkeletonItem />
        <FolderSkeletonItem />
        <FolderSkeletonItem />
        <FolderSkeletonItem />
        <FolderSkeletonItem />
        <FolderSkeletonItem />
      </div>
    </div>
  );
};

export default FolderSkeletonUI;
