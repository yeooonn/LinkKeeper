"use client";
import Typography from "@/shared/components/atoms/Typography";
import useSearchInput from "@/features/search-link/model/useSearchInput";

const SearchInfoText = () => {
  const { searchValue, onClickResetButton } = useSearchInput();

  return searchValue ? (
    <div className="flex gap-1">
      <Typography.P1 className="text-sx text-blue-400">
        {`'${searchValue}'`}
      </Typography.P1>
      <Typography.P1 className="text-sx text-black">검색결과</Typography.P1>

      <button
        className="cursor-pointer"
        title="초기화"
        onClick={onClickResetButton}
      >
        <i className="bi bi-x-square" />
      </button>
    </div>
  ) : null;
};

export default SearchInfoText;
