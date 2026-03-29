/** 웹과 동일: `#태그1 #태그2` → API용 이름 배열 */
export function parseTagString(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/\s+/)
    .map((t) => t.replace(/^#+/, "").trim())
    .filter(Boolean);
}
