import { fetchAPI } from "@/shared/utils/fetchAPI";
import { SignInRequest, SignInResponse } from "./signIn.type";

export async function SignIn(requestData: SignInRequest) {
  const res = await fetchAPI<SignInResponse>("/api/auth/sync-user", {
    method: "POST",
    body: requestData,
    next: { revalidate: 0 },
  });

  return res;
}
