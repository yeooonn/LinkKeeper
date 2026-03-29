import cn from "@/shared/utils/cn";

interface LineStepperProps {
  lineCount: number;
  step: number;
}

const LineStepper = ({ lineCount, step }: LineStepperProps) => {
  // length 길이만큼 배열 생성
  const LineNumber = Array.from({ length: lineCount }, (_, i) => i);
  return (
    <div className="w-full -500 flex pt-2 pb-5">
      {LineNumber.map((line, index) => (
        <span
          key={line}
          className={cn(
            "flex-1 h-[2px]  mr-1",
            step === index ? "bg-blue-500" : "bg-gray-300"
          )}
        ></span>
      ))}
    </div>
  );
};

export default LineStepper;
