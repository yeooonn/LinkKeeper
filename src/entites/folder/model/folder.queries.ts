import { useQuery } from "@tanstack/react-query";
import fetchFolderList from "@/entites/folder/api/fetchFolderList.service";

export const useGetFolderList = (userId: string) => {
  return useQuery({
    queryKey: ["folders"],
    queryFn: () => fetchFolderList(10, userId),
    enabled: !!userId,
    staleTime: 10 * 1000, // 10초
  });
};
