import {
  fetchAPI as sharedFetch,
  type FetchAPIOptions,
} from "@linkkeeper/shared";

interface FetchOptions<BodyType> extends FetchAPIOptions<BodyType> {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

export async function fetchAPI<ResponseType, BodyType = unknown>(
  endpoint: string,
  options: FetchOptions<BodyType>
): Promise<ResponseType | null> {
  const { next, ...rest } = options;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim() ?? "";

  console.log(
    `[apiClient] ${endpoint} 호출:`,
    new Date().toString(),
    baseUrl || "(relative)"
  );

  return sharedFetch<ResponseType, BodyType>(endpoint, {
    ...rest,
    baseUrl,
    nextFetchOptions: next,
  });
}
