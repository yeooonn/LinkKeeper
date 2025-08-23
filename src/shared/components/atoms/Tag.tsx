import cn from "@/shared/utils/cn";
import { HTMLAttributes, ReactNode } from "react";

type TagColor = "Gray" | "Blue";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  color?: TagColor;
  children?: ReactNode;
}

const TagComponent = ({
  className,
  children,
  color = "Gray",
  ...props
}: TagProps) => {
  const TagClass: Record<TagColor, string> = {
    Gray: "bg-gray-100 text-gray-500 border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600",
    Blue: "bg-blue-100 text-blue-500 border-blue-300 dark:bg-blue-100 dark:text-blue-700 dark:border-blue-600",
  };

  return (
    <div
      className={cn(
        "box-border flex items-center rounded-[20px] text-[12px] px-3 py-1",
        TagClass[color],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Tag = {
  Gray: (props: TagProps) => <TagComponent {...props} color="Gray" />,
  Blue: (props: TagProps) => <TagComponent {...props} color="Blue" />,
};

export default Tag;
