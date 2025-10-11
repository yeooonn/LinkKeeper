"use client";
import Icon from "@/shared/components/atoms/Icon";
import patchBookMark from "../api/toggleBookmark.service";
import { revalidateLink } from "@/shared/utils/actions";

interface toogleBookmarkProps {
  isActive: boolean;
  linkId: number;
}

export const ToggleBookmarkButton = ({
  isActive,
  linkId,
}: toogleBookmarkProps) => {
  const handleClickBookMark = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault(); // 링크 이동 방지
    e.stopPropagation(); // 상위 요소의 클릭 이벤트 차단
    // 북마크 토글 로직 추가 예정

    await patchBookMark(0, linkId);
    await revalidateLink();
  };
  return (
    <button onClick={handleClickBookMark} className="cursor-pointer">
      <Icon.Star isActive={isActive} />
    </button>
  );
};

export default ToggleBookmarkButton;
