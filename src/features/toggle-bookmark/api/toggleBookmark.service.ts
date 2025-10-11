import { fetchAPI } from "@/shared/utils/fetchAPI";

interface toggleBookmarkResponse {
  message?: string;
}
async function patchBookMark(
  revalidateTime: number = 10,
  linkId: number
): Promise<toggleBookmarkResponse> {
  const res = await fetchAPI(`/api/links/${linkId}/bookmark`, {
    method: "PATCH",
    revalidate: revalidateTime,
  });
  return res ?? "";
}

export default patchBookMark;
