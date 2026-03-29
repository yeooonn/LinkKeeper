import { useState } from "react";

interface UseLineStepperProps {
  lineCount: number;
}
const useLineStepper = ({ lineCount }: UseLineStepperProps) => {
  const [step, setStep] = useState<number>(0);

  const showNextButton = step !== lineCount - 1;
  const showPrevButton = step !== 0 && step !== lineCount;
  const showAddButton = step === lineCount - 1;

  // 이전 버튼 클릭
  const handleClickNextButton = () => {
    setStep((prev) => prev + 1);
  };

  // 다음 버튼 클릭
  const handleClickPrevButton = () => {
    setStep((prev) => prev - 1);
  };

  return {
    step,
    showNextButton,
    showPrevButton,
    showAddButton,
    handleClickNextButton,
    handleClickPrevButton,
  };
};

export default useLineStepper;
