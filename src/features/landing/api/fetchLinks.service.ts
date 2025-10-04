import { LinkResponse } from "@/features/landing/model/link.type";
import { apiClient } from "@/shared/utils/apiClient";

// 서버 컴포넌트에서 API 호출로 데이터 가져오기
async function fetchLinks(revalidateTime: number = 10): Promise<LinkResponse[]> {
  const res = await apiClient<LinkResponse[]>("/api/links", {
    method: "GET",
    revalidate: revalidateTime, // 10초마다 캐시 재검증
  });

  return res ?? [];
}

export default fetchLinks;
