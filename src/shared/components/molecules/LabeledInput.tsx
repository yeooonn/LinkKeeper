import cn from "@/shared/utils/cn";
import Input from "../atoms/Input";
import Typography from "../atoms/Typography";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface LabeledInputProps {
  isRequired?: boolean;
  title: string;
  placeholder: string;
  className?: string;
  inputClassName?: string; // input(자식)용
  error?: FieldError | string; // 에러 메시지 또는 객체
  register?: UseFormRegisterReturn; // react-hook-form의 register 반환값
}

const LabeledInput = ({
  isRequired = false,
  title,
  placeholder,
  className,
  inputClassName,
  error,
  register,
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
        {...register}
      />
      {error && (
        <Typography.P3 className="text-[tomato] mt-1">
          {typeof error === "string" ? error : error.message}
        </Typography.P3>
      )}
    </div>
  );
};

export default LabeledInput;
