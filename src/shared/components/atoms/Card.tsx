import cn from "@/shared/utils/cn";
import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

const Card = ({ className, children, ...props }: CardProps) => {
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

const ImageCard = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        className,
        "p-4 rounded-xl border",
        "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700",
        "hover:shadow-md transition-shadow flex gap-5"
      )}
      {...props}
    >
      <div className="w-25 h-25 bg-gray-500 rounded-sm"></div>
      <div>{children}</div>
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
    <div className={cn("pt-2 pb-3", className)} {...props}>
      {children}
    </div>
  );
};

const Footer = ({ className, children, ...props }: CardProps) => {
  return (
    <div className={cn("flex gap-3 items-center", className)} {...props}>
      {children}
    </div>
  );
};

Card.Header = Header;
Card.ImageCard = ImageCard;
Card.Content = Content;
Card.Footer = Footer;

export default Card;
