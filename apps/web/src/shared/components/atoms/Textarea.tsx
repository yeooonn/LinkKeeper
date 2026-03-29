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
          "px-4 py-2 w-60 laptop:w-80 mobile:w-full rounded-lg border bg-background-secondary border-border-primary text-foreground-primary placeholder:text-foreground-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-30 transition-all",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Textarea;
