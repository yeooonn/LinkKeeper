import cn from "@/shared/utils/cn";
import Input from "../atoms/Input";
import Typography from "../atoms/Typography";

interface LabeledInputProps {
  title: string;
  placeholder: string;
  className?: string;
}

const LabeledInput = ({ title, placeholder, className }: LabeledInputProps) => {
  return (
    <div className={cn("mb-3", className)}>
      <Typography.P1 className="mb-1">{title}</Typography.P1>
      <Input className="!w-full" placeholder={placeholder} />
    </div>
  );
};

export default LabeledInput;
