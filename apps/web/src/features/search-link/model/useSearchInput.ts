import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

const useSearchInput = () => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState("");

   useEffect(() => {
    const storedValue = localStorage.getItem("searchValue");
    if (storedValue) setSearchValue(storedValue);
  }, []);

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      localStorage.setItem('searchValue', searchValue)
      router.push(`/links/${encodeURIComponent(searchValue)}`);
    }
  };

  const onClickResetButton = () => {
    localStorage.removeItem('searchValue')
    router.push(`/links/전체`);
    setSearchValue("");
  }

  return { searchValue, setSearchValue, handleSearchValue, handleKeyDown, onClickResetButton };
};

export default useSearchInput;
