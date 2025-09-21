import cn from "@/shared/utils/cn";
import { ReactNode } from "react";

type ButtonColor = "Gray" | "Blue" | "OutlineBlue";

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
    OutlineBlue: cn(
      "text-button-outline-blue-text border border-button-outline-blue-border",
      !isDisabled &&
        "hover:text-button-outline-blue-hover-text hover:border-button-outline-blue-hover-border"
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
  OutlineBlue: (props: ButtonProps) => (
    <ButtonComponent {...props} color="OutlineBlue" />
  ),
};

export default Button;
