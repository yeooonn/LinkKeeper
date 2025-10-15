import { fetchAPI } from "@/shared/utils/fetchAPI";
import { ReadLinkResponse } from "@/features/read-link/model/readLink.type";

async function postReadLink(linkId: number): Promise<ReadLinkResponse> {
  const res = await fetchAPI(`/api/links/${linkId}/read`, {
    method: "POST",
    revalidate: 0,
  });

  return res ?? "";
}

export default postReadLink;
