import cn from "@/shared/utils/cn";
import Typography from "../atoms/Typography";
import Textarea from "../atoms/Textarea";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface LabeledInputProps {
  title: string;
  placeholder: string;
  className?: string;
  error?: FieldError | string; // 에러 메시지 또는 객체
  register?: UseFormRegisterReturn; // react-hook-form의 register 반환값
}

const LabeledTextarea = ({
  title,
  placeholder,
  className,
  error,
  register,
}: LabeledInputProps) => {
  return (
    <div className={cn("mb-3", className)}>
      <Typography.P1 className="mb-1">{title}</Typography.P1>
      <Textarea className="!w-full" placeholder={placeholder} {...register} />
      {error && (
        <Typography.P2 className="text-[tomato] mt-1">
          {typeof error === "string" ? error : error.message}
        </Typography.P2>
      )}
    </div>
  );
};

export default LabeledTextarea;
