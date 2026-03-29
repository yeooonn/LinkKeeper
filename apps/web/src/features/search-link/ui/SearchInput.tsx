"use client";
import Input from "@/shared/components/atoms/Input";
import useSearchInput from "@/features/search-link/model/useSearchInput";

const SearchInput = () => {
  const { handleSearchValue, handleKeyDown } = useSearchInput();

  return (
    <Input
      placeholder="검색어를 입력 후 엔터를 눌러주세요."
      icon="search"
      onChange={(e) => handleSearchValue(e)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchInput;
