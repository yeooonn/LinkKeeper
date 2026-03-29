"use client";

import Icon from "@/shared/components/atoms/Icon";
import patchBookMark from "@/features/toggle-bookmark/api/toggleBookmark.service";
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
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    stopEvent(e);

    await patchBookMark(0, linkId);
    await revalidateLink();
  };
  return (
    <button onClick={handleClickBookMark} className="cursor-pointer">
      <Icon.Bookmark isActive={isActive} />
    </button>
  );
};

export default ToggleBookmarkButton;
