export function linkListTimestamp(
  createdAt: string,
  updatedAt?: string | null,
): string {
  if (updatedAt == null || updatedAt === "") return createdAt;
  const c = new Date(createdAt).getTime();
  const u = new Date(updatedAt).getTime();
  if (Number.isNaN(c) || Number.isNaN(u)) return createdAt;
  return u > c ? updatedAt : createdAt;
}

export function formatTimeAgo(iso: string): string {
  const createdDate = new Date(iso);
  const diff = Date.now() - createdDate.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return "방금 전";
  if (diff < hour) return `${Math.floor(diff / minute)}분 전`;
  if (diff < day) return `${Math.floor(diff / hour)}시간 전`;
  const y = createdDate.getFullYear();
  const m = String(createdDate.getMonth() + 1).padStart(2, "0");
  const d = String(createdDate.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}
