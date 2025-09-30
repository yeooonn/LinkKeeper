interface FetchOptions<T> {
  body?: T;
  revalidate?: number;
  headers?: Record<string, string>;
}

export async function apiClient<ResponseType, BodyType = unknown>(
  endpoint: string,
  options: FetchOptions<BodyType>
): Promise<ResponseType | null> {
  const { body, revalidate = 10, headers = {} } = options;

  // 캐시 테스트용 콘솔
  console.log(`[apiClient] ${endpoint} 호출:`, new Date().toISOString());

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      next: { revalidate },
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
