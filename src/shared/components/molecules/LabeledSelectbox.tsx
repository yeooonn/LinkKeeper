import cn from "@/shared/utils/cn";
import Typography from "../atoms/Typography";
import { FolderInterface } from "@/entites/folder/types";
import { SelectHTMLAttributes } from "react";
import Selectbox from "@/shared/components/atoms/Selectbox";

interface LabeledSelectboxProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  className?: string;
  options: FolderInterface[];
}

const LabeledSelectbox = ({
  title,
  className,
  options,
}: LabeledSelectboxProps) => {
  return (
    <div className={cn("mb-3", className)}>
      <Typography.P1 className="mb-1">{title}</Typography.P1>
      <Selectbox options={options} />
    </div>
  );
};

export default LabeledSelectbox;
