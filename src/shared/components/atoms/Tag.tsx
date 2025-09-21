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
    Gray: "bg-background-gray-tag text-foreground-gray-tag border-border-gray-tag",
    Blue: "bg-background-blue-tag text-foreground-blue-tag border-border-blue-tag",
  };

  return (
    <div
      className={cn(
        "box-border flex items-center rounded-[20px] text-[12px] px-3 py-1 text-nowrap",
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
