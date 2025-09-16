import cn from "@/shared/utils/cn";
import Input from "../atoms/Input";
import Typography from "../atoms/Typography";

interface LabeledInputProps {
  isRequired?: boolean;
  title: string;
  placeholder: string;
  className?: string;
  inputClassName?: string; // input(자식)용
}

const LabeledInput = ({
  isRequired = false,
  title,
  placeholder,
  className,
  inputClassName,
}: LabeledInputProps) => {
  return (
    <div className={cn("mb-3", className)}>
      <Typography.P1 className="mb-1">
        {title}
        {isRequired && <span className="text-[tomato]">*</span>}
      </Typography.P1>
      <Input
        className={cn("!w-full", inputClassName)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default LabeledInput;
