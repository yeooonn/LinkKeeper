"use client";

import Button from "@/shared/components/atoms/Button";
import Modal from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import useModal from "@/shared/hooks/useModal";
import { stopEvent } from "@/shared/utils/stopEvent";

const DeleteLinkButton = () => {
  const { showModal, openModal, closeModal } = useModal();

  const handleOpenDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopEvent(e);

    openModal();
  };

  const handleCancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopEvent(e);

    closeModal();
  };

  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopEvent(e);

    console.log("삭제 버튼 클릭");
    // 삭제 로직 구현 예정
  };
  return (
    <>
      {showModal && (
        <Modal className="!min-w-[400px]" onClose={closeModal}>
          <Modal.Header onClose={closeModal}>
            <Typography.H1>삭제 확인</Typography.H1>
          </Modal.Header>
          <Modal.Content>
            <Typography.P1>정말 삭제하시겠습니까?</Typography.P1>
          </Modal.Content>
          <Modal.Footer>
            <Button.OutlineGray onClick={handleCancelButton}>
              취소
            </Button.OutlineGray>
            <Button.Red onClick={handleDeleteButton}>삭제</Button.Red>
          </Modal.Footer>
        </Modal>
      )}
      <button className="cursor-pointer" onClick={handleOpenDeleteModal}>
        <i className="bi bi-trash3 text-red-500" />
      </button>
    </>
  );
};

export default DeleteLinkButton;
