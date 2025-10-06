import { LinkResponse } from "@/features/landing/model/link.type";
import { fetchAPI } from "@/shared/utils/fetchAPI";

// 서버 컴포넌트에서 API 호출로 데이터 가져오기
async function fetchLinks(revalidateTime: number = 10, query?: string): Promise<LinkResponse[]> {
  const res = await fetchAPI<LinkResponse[]>(`/api/links${query}`, {
    method: "GET",
    revalidate: revalidateTime, // 10초마다 캐시 재검증
  });

  return res ?? [];
}

export default fetchLinks;
