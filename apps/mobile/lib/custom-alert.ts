const KST = "Asia/Seoul";

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

export function parseCustomAlertFromInput(
  date: string | undefined,
  time: string | undefined,
): Date | null {
  if (!date?.trim() || !time?.trim()) return null;
  const d = new Date(`${date}T${time}:00+09:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** 폼 문자열(YYYY-MM-DD, HH:MM)을 기기 로컬 기준 Date로 변환 (피커 초기값용) */
export function localDateFromFormStrings(
  dateStr: string | undefined,
  timeStr: string | undefined,
): Date {
  const now = new Date();
  if (!dateStr?.trim()) {
    return now;
  }
  const parts = dateStr.split("-").map((s) => parseInt(s, 10));
  const year = parts[0] ?? now.getFullYear();
  const month = (parts[1] ?? now.getMonth() + 1) - 1;
  const day = parts[2] ?? now.getDate();
  let hh = 0;
  let mm = 0;
  if (timeStr?.trim()) {
    const tp = timeStr.split(":").map((s) => parseInt(s, 10));
    hh = Number.isFinite(tp[0]) ? tp[0]! : 0;
    mm = Number.isFinite(tp[1]) ? tp[1]! : 0;
  }
  return new Date(year, month, day, hh, mm, 0, 0);
}

export function formatDateYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatTimeHM(d: Date): string {
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${h}:${min}`;
}
