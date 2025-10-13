import { linkFormSchema } from "@/features/form-link/model/linkForm.schema";
import { LinkResponse } from "@/features/landing/model/link.type";
import { fetchAPI } from "@/shared/utils/fetchAPI";
import z from "zod";

type FormData = z.infer<typeof linkFormSchema>;

export async function AddLink(requestData: FormData) {
  const res = await fetchAPI<LinkResponse, FormData>("/api/create/link", {
    method: "POST",
    body: requestData,
    revalidate: 0, // 즉시 캐시 무효화
  });

  return res;
}
