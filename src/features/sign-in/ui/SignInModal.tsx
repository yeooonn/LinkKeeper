import { Kakao } from "@/shared/assets/svg/kakao";
import { Naver } from "@/shared/assets/svg/naver";
import Modal from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import cn from "@/shared/utils/cn";

interface LoginModalProps {
  onClose: () => void;
}

const socialButtons = [
  {
    label: "KAKAO",
    bg: "bg-[#F8D303]",
    hover: "hover:bg-[#FEE503]",
    text: "text-black",
    icon: <Kakao />,
  },
  {
    label: "NAVER",
    bg: "bg-[#04B253]",
    hover: "hover:bg-[#02C75B]",
    text: "text-white",
    icon: <Naver />,
  },
  {
    label: "GITHUB",
    bg: "bg-black",
    hover: "hover:bg-[#333333]",
    text: "text-white",
    icon: <i className="bi bi-github text-white" />,
  },
];

const SignInModal = ({ onClose }: LoginModalProps) => {
  return (
    <Modal onClose={onClose} className="!min-w-[30%]">
      <Modal.Header onClose={onClose}>
        <Typography.H1> </Typography.H1>
      </Modal.Header>
      <Modal.Content>
        <Typography.H1 className="font-bold text-center mb-1">
          간편하게 로그인하세요.
        </Typography.H1>
        <Typography.P2 className="text-center mb-10">
          링크관리의 모든 것, LinkKeeper
        </Typography.P2>
        <div className="flex flex-col gap-2 mb-7">
          {socialButtons.map(({ label, bg, hover, text, icon }) => (
            <button
              key={label}
              className={cn(
                "w-full font-bold p-2 rounded-xl flex justify-center items-center gap-2 transition-colors duration-200 cursor-pointer",
                bg,
                hover,
                text
              )}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default SignInModal;
