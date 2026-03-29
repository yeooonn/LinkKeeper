/**
 * Expo Router 등에서 전달되는 `?url=` 쿼리 값을 URL 검색용 문자열로 파싱합니다.
 * `parseLinkSlug`·`buildLinksEndpoint`와 동일하게 http(s)만 허용합니다.
 */
export function parseUrlSearchQueryParam(
  raw: string | undefined,
): string | null {
  if (raw === undefined || raw === "") return null;

  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    /* keep raw */
  }

  const trimmed = decoded.trim();
  if (!trimmed || !/^https?:\/\//i.test(trimmed)) return null;
  return trimmed;
}
