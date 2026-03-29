import Input from "@/shared/components/atoms/Input";
import { ChangeEvent } from "react";

interface SearchFolderInputProps {
  handleSearchValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchFolderInput = ({ handleSearchValue }: SearchFolderInputProps) => {
  return (
    <Input
      placeholder="폴더 검색"
      icon="search"
      className="!w-[95%]"
      onChange={(e) => handleSearchValue(e)}
    />
  );
};

export default SearchFolderInput;
