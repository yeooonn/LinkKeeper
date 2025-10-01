/**
 * 특정 생성 시간과 현재 시간을 비교하여, 사람이 읽기 좋은 상대 시간 문자열 반환 유틸함수
 * @param createdAt
 */
export const formatTimeAgo = (createdAt: string) => {
  // UTC 기준 현재 시간
  const nowUtc = new Date();
  const createdDate = new Date(createdAt); // ISO 문자열 -> Date 객체 (자동으로 로컬 시간 기준)
  // KST로 변환 (UTC+9)
  const nowKst = new Date(nowUtc.getTime() + 9 * 60 * 60 * 1000); // 9시간 추가

  const diff = nowKst.getTime() - createdDate.getTime(); // 밀리초 단위 차이

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
