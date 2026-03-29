import { ChangeEvent, useEffect, useState } from "react";

const useSearchFolderInput = () => {
  const [searchFolderValue, setSearchFolderValue] = useState("");

  useEffect(() => {
    const storedValue = localStorage.getItem("searchValue");
    if (storedValue) setSearchFolderValue(storedValue);
  }, []);

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchFolderValue(e.target.value);
  };

  return {
    searchFolderValue,
    setSearchFolderValue,
    handleSearchValue,
  };
};

export default useSearchFolderInput;
