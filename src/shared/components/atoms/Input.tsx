import cn from "@/shared/utils/cn";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  icon?: string;
}

const Input = ({ className, icon, ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      {icon && (
        <i
          className={cn(
            `bi bi-${icon}`,
            "absolute left-3 top-4 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          )}
        />
      )}
      <input
        className={cn(
          icon ? "pl-9 pr-4" : "px-4",
          "py-2 w-60 laptop:w-80 mobile:w-full rounded-lg border bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
