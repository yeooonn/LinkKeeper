import cn from "@/shared/utils/cn";
import { ReactNode } from "react";
import type { JSX } from "react";

type TypoType = "H1" | "P1" | "P2" | "P3";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

interface BaseTypographyProps extends TypographyProps {
  type: TypoType;
}

const typoTypeMap: Record<
  TypoType,
  { className: string; tag: keyof JSX.IntrinsicElements }
> = {
  H1: { className: "text-2xl", tag: "h1" },
  P1: { className: "text-base", tag: "p" },
  P2: { className: "text-lg", tag: "p" },
  P3: { className: "text-xs", tag: "p" },
};

const BaseTypography = ({ type, children, className }: BaseTypographyProps) => {
  const { className: style, tag: Tag } = typoTypeMap[type];
  return (
    <Tag className={cn(style, "text-gray-900 dark:text-white", className)}>
      {children}
    </Tag>
  );
};

const Typography = {
  H1: (props: TypographyProps) => <BaseTypography type="H1" {...props} />,
  P1: (props: TypographyProps) => <BaseTypography type="P1" {...props} />,
  P2: (props: TypographyProps) => <BaseTypography type="P2" {...props} />,
  P3: (props: TypographyProps) => <BaseTypography type="P3" {...props} />,
  Error: (props: TypographyProps) => (
    <BaseTypography
      type="P2"
      className="text-red-500 dark:text-red-400"
      {...props}
    />
  ),
};

export default Typography;
