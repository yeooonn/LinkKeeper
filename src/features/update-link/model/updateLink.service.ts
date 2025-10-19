import { LinkResponse } from "@/entites/link/model/types";
import { linkFormSchema } from "@/shared/lib/linkForm.schema";
import { fetchAPI } from "@/shared/utils/fetchAPI";
import z from "zod";

type FormData = z.infer<typeof linkFormSchema>;

export async function UpdateLink(requestData: FormData, LinkId: number) {
  const res = await fetchAPI<LinkResponse, FormData>(
    `/api/links/${LinkId}/update`,
    {
      method: "PUT",
      body: requestData,
      next: { revalidate: 0 }, // 10초마다 캐시 재검증
    }
  );

  return res;
}
