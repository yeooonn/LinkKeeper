import cn from "@/shared/utils/cn";
import { ReactNode } from "react";

type ButtonColor = "Gray" | "Blue";

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
    Gray: "bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-500",
    Blue: "bg-blue-500 hover:bg-blue-600 text-white border-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600 dark:text-white",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer transition-all",
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
};

export default Button;
