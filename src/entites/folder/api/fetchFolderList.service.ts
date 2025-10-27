import { fetchAPI } from "@/shared/utils/fetchAPI";
import { FolderResponse } from "@/entites/folder/model/folder.type";

async function fetchFolderList(
  revalidateTime: number = 10,
  userId: string
): Promise<FolderResponse[]> {
  const res = await fetchAPI<FolderResponse[]>(`/api/folders?userId=${userId}`, {
    method: "GET",
    next: { revalidate: revalidateTime }, // 10초마다 캐시 재검증
  });

  return res ?? [];
}

export default fetchFolderList;
