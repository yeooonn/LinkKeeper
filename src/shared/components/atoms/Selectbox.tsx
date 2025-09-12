import { FolderInterface } from "@/entites/folder/types";
import cn from "@/shared/utils/cn";
import { SelectHTMLAttributes } from "react";

interface SelectBoxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: FolderInterface[];
}

const Selectbox = ({ className, options, ...props }: SelectBoxProps) => {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          "px-2 py-2 w-full  rounded-lg border bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm",
          className
        )}
        {...props}
      >
        <option disabled>선택해 주세요.</option>
        {options.map((option) => (
          <option key={option.id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Selectbox;
