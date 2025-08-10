import cn from "@/shared/utils/cn";
import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  darkMode?: boolean;
}

const Card = ({ className, children, darkMode, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        className,
        "p-4 rounded-xl border",
        "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700",
        "hover:shadow-md transition-shadow"
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Header = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn("flex justify-between", className)} {...props}>
      {children}
    </div>
  );
};

const Content = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

const Footer = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn("flex", className)} {...props}>
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Content = Content;
Card.Footer = Footer;

export default Card;
