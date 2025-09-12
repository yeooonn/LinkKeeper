import cn from "@/shared/utils/cn";
import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <div className="relative w-full">
      <textarea
        className={cn(
          "px-4 py-2 w-60 laptop:w-80 mobile:w-full rounded-lg border bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-30",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Textarea;
