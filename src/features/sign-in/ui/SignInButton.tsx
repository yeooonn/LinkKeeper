"use client";

import Button from "@/shared/components/atoms/Button";
import useModal from "@/shared/hooks/useModal";
import SignInModal from "@/features/sign-in/ui/SignInModal";
import cn from "@/shared/utils/cn";

interface SignInButtonProps {
  className?: string;
  text?: string;
  variant?: string;
}
const SignInButton = ({
  className,
  text = "로그인",
  variant = "Blue",
}: SignInButtonProps) => {
  const { showModal, openModal, closeModal } = useModal();
  const ButtonComponent = variant === "Blue" ? Button.Blue : Button.OutlineBlue;

  return (
    <>
      {showModal && <SignInModal onClose={closeModal} />}
      <ButtonComponent
        className={cn("w-full flex justify-center", className)}
        onClick={openModal}
      >
        {text === "링크 추가" && (
          <i className="bi bi-plus text-xl p-0 m-0 tablet:inline mobile:hidden mr-1" />
        )}

        {text}
      </ButtonComponent>
    </>
  );
};

export default SignInButton;
