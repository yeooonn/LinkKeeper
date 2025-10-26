import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";

interface AddLinkButtonProps {
  openModal: () => void;
}

const AddLinkButton = ({ openModal }: AddLinkButtonProps) => {
  const onClickAddLink = () => {
    openModal();
  };

  return (
    <Button.Blue onClick={onClickAddLink}>
      <i className="bi bi-plus text-xl p-0 m-0 tablet:inline mobile:hidden" />
      <Typography.P1 className="text-white">링크 추가</Typography.P1>
    </Button.Blue>
  );
};

export default AddLinkButton;
