import cn from "@/shared/utils/cn";
import Typography from "../atoms/Typography";
import { SelectHTMLAttributes } from "react";
import Selectbox from "@/shared/components/atoms/Selectbox";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface LabeledSelectboxProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  className?: string;
  options: { key: string; value: string }[];
  error?: FieldError | string; // 에러 메시지 또는 객체
  register?: UseFormRegisterReturn; // react-hook-form의 register 반환값
}

const LabeledSelectbox = ({
  title,
  className,
  options,
  error,
  register,
  ...props
}: LabeledSelectboxProps) => {
  return (
    <div className={cn("mb-3", className)}>
      <Typography.P1 className="mb-1">{title}</Typography.P1>
      <Selectbox options={options} {...register} {...props} />
      {error && (
        <Typography.P3 className="text-[tomato] mt-1">
          {typeof error === "string" ? error : error.message}
        </Typography.P3>
      )}
    </div>
  );
};

export default LabeledSelectbox;
