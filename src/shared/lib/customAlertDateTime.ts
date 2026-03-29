const KST = "Asia/Seoul";

/**
 * DB에 저장된 값(한국 시각 ISO 문자열 …+09:00)을 폼에 표시할 날짜·시간으로 변환.
 */
export function formatCustomAlertForInput(
  iso: string | undefined,
): { date: string; time: string } | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: KST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);

  const pick = (type: Intl.DateTimeFormatPart["type"]) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const year = pick("year");
  const month = pick("month");
  const day = pick("day");
  const hour = pick("hour").padStart(2, "0");
  const minute = pick("minute").padStart(2, "0");

  return { date: `${year}-${month}-${day}`, time: `${hour}:${minute}` };
}

/**
 * 폼의 date + time을 Date로 변환. 입력값은 한국 표준시(KST) 벽시계로 해석한다.
 */
export function parseCustomAlertFromInput(
  date: string | undefined,
  time: string | undefined,
): Date | null {
  if (!date?.trim() || !time?.trim()) return null;
  const d = new Date(`${date}T${time}:00+09:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}
