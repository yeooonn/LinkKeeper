import Button from "@/shared/components/atoms/Button";
import useModal from "@/shared/hooks/useModal";
import LoginModal from "./SignInModal";

const SignInButton = () => {
  const { showModal, openModal, closeModal } = useModal();
  return (
    <>
      {showModal && <LoginModal onClose={closeModal} />}
      <Button.Blue
        className="w-full flex justify-center !py-2"
        onClick={openModal}
      >
        로그인
      </Button.Blue>
    </>
  );
};

export default SignInButton;
