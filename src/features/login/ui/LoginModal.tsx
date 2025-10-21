import Modal from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";

interface LoginModalProps {
  onClose: () => void;
}
const LoginModal = ({ onClose }: LoginModalProps) => {
  return (
    <Modal onClose={onClose} className="!min-w-[30%]">
      <Modal.Header onClose={onClose}>
        <Typography.H1> </Typography.H1>
      </Modal.Header>
      <Modal.Content>
        <Typography.P2 className="font-bold text-center">
          간편하게 로그인하세요.
        </Typography.P2>
        <Typography.P1 className="text-center mb-10">
          링크관리의 모든 것, LinkKeeper
        </Typography.P1>
        <div className="flex flex-col gap-2">
          <button className="w-full bg-amber-400 font-bold p-2 rounded-xl">
            KAKAO
          </button>
          <button className="w-full bg-green-600 text-white font-bold p-2 rounded-xl">
            NAVER
          </button>
          <button className="w-full bg-black text-white font-bold p-2 rounded-xl">
            GITHUB
          </button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default LoginModal;
