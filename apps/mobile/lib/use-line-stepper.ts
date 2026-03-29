import { useState } from "react";

export function useLineStepper(lineCount: number) {
  const [step, setStep] = useState(0);

  const showNextButton = step !== lineCount - 1;
  const showPrevButton = step !== 0 && step !== lineCount;
  const showAddButton = step === lineCount - 1;

  return {
    step,
    setStep,
    showNextButton,
    showPrevButton,
    showAddButton,
    handleClickNextButton: () => setStep((p) => p + 1),
    handleClickPrevButton: () => setStep((p) => p - 1),
  };
}
