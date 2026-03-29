/**
 * 링크 카드에 쓸 기준 시각: 한 번이라도 수정됐으면 수정 시각, 아니면 생성 시각
 */
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

/**
 * 특정 생성 시간과 현재 시간을 비교하여, 사람이 읽기 좋은 상대 시간 문자열 반환 유틸함수
 * @param createdAt
 */
export const formatTimeAgo = (createdAt: string) => {
  const nowUtc = new Date(); // UTC 기준 현재 시간
  const createdDate = new Date(createdAt); // 생성 시간
  const utcTime = new Date(nowUtc.getTime());

  const diff = utcTime.getTime() - createdDate.getTime(); // 밀리초 단위 차이

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return "방금 전";
  } else if (diff < hour) {
    const minutesAgo = Math.floor(diff / minute);
    return `${minutesAgo}분 전`;
  } else if (diff < day) {
    const hoursAgo = Math.floor(diff / hour);
    return `${hoursAgo}시간 전`;
  } else {
    const year = createdDate.getFullYear();
    const month = String(createdDate.getMonth() + 1).padStart(2, "0");
    const date = String(createdDate.getDate()).padStart(2, "0");
    return `${year}.${month}.${date}`;
  }
};
