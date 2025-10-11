"use client";
import Icon from "@/shared/components/atoms/Icon";
import patchBookMark from "../api/toggleBookmark.service";
import { revalidateLink } from "@/shared/utils/actions";
import { stopEvent } from "@/shared/utils/stopEvent";

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
    stopEvent(e);
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
