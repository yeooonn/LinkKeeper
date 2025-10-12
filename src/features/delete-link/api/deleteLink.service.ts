import { fetchAPI } from "@/shared/utils/fetchAPI";
import { DeleteLinkResponse } from "../model/deleteLink.type";

async function DeleteLink(linkId:number):Promise<DeleteLinkResponse> {
  const res = await fetchAPI(`/api/links/${linkId}/delete`, {
    method:'DELETE',
    revalidate: 0
  })

  return res ?? {}
}

export default DeleteLink