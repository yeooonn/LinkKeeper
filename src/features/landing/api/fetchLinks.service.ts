import { LinkResponse } from "@/features/landing/model/link.type";


// 서버 컴포넌트에서 API 호출로 데이터 가져오기
async function fetchLinks(): Promise<LinkResponse[]> {
  console.log("fetchLinks 호출:", new Date().toISOString()); // 호출 시각 로그

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/links`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      throw new Error("API 요청 실패");
    }
    const landingData: LinkResponse[] = await res.json();
    return landingData;
  } catch (error) {
    console.error("링크 조회 실패:", error);
    return [];
  }
}

export default fetchLinks;