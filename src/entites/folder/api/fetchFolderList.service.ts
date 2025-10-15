import { fetchAPI } from "@/shared/utils/fetchAPI";
import { FolderResponse } from "@/entites/folder/model/folder.type";

async function fetchFolderList(
  revalidateTime: number = 10
): Promise<FolderResponse[]> {
  const res = await fetchAPI<FolderResponse[]>("/api/folders", {
    method: "GET",
    revalidate: revalidateTime, // 10초마다 캐시 재검증
  });

  return res ?? [];
}

export default fetchFolderList;
