import { LinkResponse } from "@/entites/link/model/types";
import { linkFormSchema } from "@/shared/lib/linkForm.schema";
import { fetchAPI } from "@/shared/utils/fetchAPI";
import z from "zod";

type FormData = z.infer<typeof linkFormSchema>;

export async function AddLink(requestData: FormData) {
  const res = await fetchAPI<LinkResponse, FormData>("api/create/link", {
    method: "POST",
    body: requestData,
    next: { revalidate: 0 }, 
  });

  return res;
}
