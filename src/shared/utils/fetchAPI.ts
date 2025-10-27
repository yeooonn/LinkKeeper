interface FetchOptions<T> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  next?: {
    revalidate?: number;
    tags?: string[];
  };
  body?: T;
  headers?: Record<string, string>;
}

export async function fetchAPI<ResponseType, BodyType = unknown>(
  endpoint: string,
  options: FetchOptions<BodyType>
): Promise<ResponseType | null> {
  const { method = "GET", next, body, headers = {} } = options;

  // 캐시 테스트용 콘솔
  console.log(`[apiClient] ${endpoint} 호출:`, new Date().toString());

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
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

    return (await res.json()) as ResponseType;
  } catch (error) {
    console.error(`[apiClient] ${endpoint} 호출 실패:`, error);
    return null;
  }
}
