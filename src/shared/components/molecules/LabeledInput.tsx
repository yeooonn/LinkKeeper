import cn from "@/shared/utils/cn";
import Input from "../atoms/Input";
import Typography from "../atoms/Typography";

interface LabeledInputProps {
  title?: string;
  placeholder: string;
  className?: string;
  inputClassName?: string; // input(자식)용
}

const LabeledInput = ({
  title,
  placeholder,
  className,
  inputClassName,
}: LabeledInputProps) => {
  return (
    <div className={cn("mb-3", className)}>
      {title && <Typography.P1 className="mb-1">{title}</Typography.P1>}
      <Input
        className={cn("!w-full", inputClassName)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LabeledInput;
