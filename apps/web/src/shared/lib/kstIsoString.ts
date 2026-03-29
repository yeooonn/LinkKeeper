const KST = "Asia/Seoul";

/**
 * UTC instant → DB에 넣을 한국 시각 ISO 문자열 (오프셋 +09:00 포함).
 * Supabase 등에서 값 그대로 보면 한국 벽시계와 동일한 숫자가 보인다.
 */
export function toKstOffsetIsoString(d: Date): string {
  if (Number.isNaN(d.getTime())) {
    throw new Error("Invalid Date for toKstOffsetIsoString");
  }

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: KST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(d);

  const pick = (type: Intl.DateTimeFormatPart["type"]) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const y = pick("year");
  const m = pick("month");
  const day = pick("day");
  const h = pick("hour").padStart(2, "0");
  const min = pick("minute").padStart(2, "0");
  const s = pick("second").padStart(2, "0");

  return `${y}-${m}-${day}T${h}:${min}:${s}+09:00`;
}

export function parseInstantFromStored(
  value: string | null | undefined,
): Date | null {
  if (value == null || !String(value).trim()) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}
