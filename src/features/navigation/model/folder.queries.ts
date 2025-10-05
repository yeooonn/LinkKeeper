import { useQuery } from "@tanstack/react-query"
import fetchFolderList from "../api/fetchFolderList.service"

export const useGetFolderList = () => {
  return useQuery({
    queryKey: ['folders'],
    queryFn: () => fetchFolderList(),
    staleTime: 10 * 1000, // 10초
  })
}