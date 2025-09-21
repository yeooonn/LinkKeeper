import cn from "@/shared/utils/cn";
import { ReactNode } from "react";

type ButtonColor = "Gray" | "Blue" | "OutlineBlue";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  color?: ButtonColor;
}

const ButtonComponent = ({
  className,
  children,
  color = "Gray",
  ...props
}: ButtonProps) => {
  const ButtonColor: Record<ButtonColor, string> = {
    Gray: "bg-button-gray-bg hover:bg-button-gray-hover-bg text-button-gray-text border-button-gray-border",
    Blue: "bg-button-blue-bg hover:button-blue-hover-bg text-button-blue-text border-button-blue-border",
    OutlineBlue:
      "text-button-outline-blue-text hover:text-button-outline-blue-hover-text border border-button-outline-blue-border hover:border-button-outline-blue-hover-border",
  };

  return (
    <button
      className={cn(
        "desktop:px-4 desktop:py-2 laptop:px-3 laptop:py-1 px-3 py-1 tablet:rounded-lg mobile:rounded-sm flex items-center space-x-1 cursor-pointer transition-all",
        ButtonColor[color],
        className
      )}
      {...props}
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
