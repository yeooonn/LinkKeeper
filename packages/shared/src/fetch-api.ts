type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type FetchAPIOptions<BodyType = unknown> = {
  method: HttpMethod;
  body?: BodyType;
  headers?: Record<string, string>;
  credentials?: RequestCredentials;
  /**
   * Next.js `fetch` 확장 옵션 (웹 전용). RN에서는 전달하지 않음.
   */
  nextFetchOptions?: {
    revalidate?: number;
    tags?: string[];
  };
};

export type ResolveApiUrlOptions = {
  /** 예: https://link-keeper-mocha.vercel.app 또는 EXPO_PUBLIC_API_URL */
  baseUrl?: string;
};

/** baseUrl 유무·슬래시와 무관하게 /api/... 절대·상대 URL을 만든다. */
export function resolveApiUrl(
  endpoint: string,
  options: ResolveApiUrlOptions = {}
): string {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const rawBase = (options.baseUrl ?? "").trim();
  if (!rawBase) {
    return path;
  }
  const base = rawBase.replace(/\/+$/, "");
  return `${base}${path}`;
}

function isLikelyJsonResponse(res: Response, textPreview: string): boolean {
  const type = res.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    return true;
  }
  const t = textPreview.trimStart();
  return t.startsWith("{") || t.startsWith("[") || t.startsWith('"');
}

export async function fetchAPI<ResponseType, BodyType = unknown>(
  endpoint: string,
  options: FetchAPIOptions<BodyType> & ResolveApiUrlOptions
): Promise<ResponseType | null> {
  const {
    method = "GET",
    body,
    headers = {},
    credentials = "include",
    nextFetchOptions,
    baseUrl,
  } = options;

  const url = resolveApiUrl(endpoint, { baseUrl });

  try {
    const init: RequestInit & { next?: { revalidate?: number; tags?: string[] } } =
      {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        credentials,
      };

    if (nextFetchOptions) {
      (init as { next?: { revalidate?: number; tags?: string[] } }).next = {
        revalidate: 10,
        ...nextFetchOptions,
      };
    }

    const res = await fetch(url, init);

    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status} ${res.statusText}`);
    }

    const text = await res.text();
    if (!text.trim()) {
      return null as ResponseType | null;
    }

    if (!isLikelyJsonResponse(res, text)) {
      console.error(
        `[apiClient] JSON이 아닌 응답 (${res.status}): ${url}`,
        text.slice(0, 200)
      );
      return null;
    }

    return JSON.parse(text) as ResponseType;
  } catch (error) {
    console.error(`[apiClient] ${endpoint} 호출 실패:`, error);
    return null;
  }
}
