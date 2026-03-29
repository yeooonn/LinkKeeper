interface FetchOptions<T> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  next?: {
    revalidate?: number;
    tags?: string[];
  };
  body?: T;
  headers?: Record<string, string>;
}

/** NEXT_PUBLIC_BASE_URL 유무·슬래시와 무관하게 /api/... 절대·상대 URL을 만든다. */
function resolveApiUrl(endpoint: string): string {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const rawBase = process.env.NEXT_PUBLIC_BASE_URL?.trim() ?? "";
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
  options: FetchOptions<BodyType>
): Promise<ResponseType | null> {
  const { method = "GET", next, body, headers = {} } = options;
  const url = resolveApiUrl(endpoint);

  // 캐시 테스트용 콘솔
  console.log(`[apiClient] ${url} 호출:`, new Date().toString());

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      next: { revalidate: 10, ...next },
    });

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
