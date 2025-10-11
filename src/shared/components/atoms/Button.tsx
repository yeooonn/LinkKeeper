import cn from "@/shared/utils/cn";
import { ReactNode } from "react";

type ButtonColor = "Gray" | "Blue" | "Red" | "OutlineBlue" | "OutlineGray";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  color?: ButtonColor;
  isDisabled?: boolean;
}

const ButtonComponent = ({
  className,
  children,
  color = "Gray",
  isDisabled = false,
  ...props
}: ButtonProps) => {
  const ButtonColor: Record<ButtonColor, string> = {
    Gray: cn(
      "bg-button-gray-bg text-button-gray-text border-button-gray-border",
      !isDisabled && "hover:bg-button-gray-hover-bg"
    ),
    Blue: cn(
      "bg-button-blue-bg text-button-blue-text border-button-blue-border",
      !isDisabled && "hover:button-blue-hover-bg"
    ),
    Red: cn(
      "bg-[tomato] text-white",
      !isDisabled && "hover:button-blue-hover-bg"
    ),
    OutlineBlue: cn(
      "text-button-outline-blue-text border border-button-outline-blue-border",
      !isDisabled &&
        "hover:text-button-outline-blue-hover-text hover:border-button-outline-blue-hover-border"
    ),
    OutlineGray: cn(
      "text-gray-400 border border-gray-400",
      !isDisabled &&
        "hover:text-button-gray-text border hover:border-button-gray-text"
    ),
  };

  return (
    <button
      className={cn(
        "desktop:px-4 desktop:py-2 laptop:px-3 laptop:py-1 px-3 py-1 tablet:rounded-lg mobile:rounded-sm flex items-center space-x-1 transition-all",
        ButtonColor[color],
        isDisabled ? "cursor-default" : "cursor-pointer",
        className
      )}
      {...props}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

const Button = {
  Gray: (props: ButtonProps) => <ButtonComponent {...props} color="Gray" />,
  Blue: (props: ButtonProps) => <ButtonComponent {...props} color="Blue" />,
  Red: (props: ButtonProps) => <ButtonComponent {...props} color="Red" />,
  OutlineBlue: (props: ButtonProps) => (
    <ButtonComponent {...props} color="OutlineBlue" />
  ),
  OutlineGray: (props: ButtonProps) => (
    <ButtonComponent {...props} color="OutlineGray" />
  ),
};

export default Button;
