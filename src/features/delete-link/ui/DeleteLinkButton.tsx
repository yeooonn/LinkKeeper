"use client";

import Button from "@/shared/components/atoms/Button";
import Modal from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import useModal from "@/shared/hooks/useModal";
import { stopEvent } from "@/shared/utils/stopEvent";
import { useDeleteLink } from "../model/useDeleteLink";

const DeleteLinkButton = ({ linkId }: { linkId: number }) => {
  const { showModal, openModal, closeModal } = useModal();
  const { handleDelete, isDeleting } = useDeleteLink(closeModal);

  const handleOpenDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopEvent(e);
    openModal();
  };

  const handleCancelButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    stopEvent(e);
    closeModal();
  };

  const handleDeleteButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    stopEvent(e);

    handleDelete(linkId);
  };

  return (
    <>
      {showModal && (
        <Modal className="!min-w-[400px]" onClose={closeModal}>
          <Modal.Header onClose={closeModal}>
            <Typography.H1>링크를 삭제하시겠습니까?</Typography.H1>
          </Modal.Header>
          <Modal.Content>
            <Typography.P1>
              삭제 버튼을 누르시면 해당 링크가 삭제됩니다.
            </Typography.P1>
          </Modal.Content>
          <Modal.Footer>
            <Button.OutlineGray onClick={handleCancelButton}>
              취소
            </Button.OutlineGray>
            {isDeleting ? (
              <Button.Gray isDisabled={true}>삭제</Button.Gray>
            ) : (
              <Button.Red onClick={handleDeleteButton} disabled={isDeleting}>
                삭제
              </Button.Red>
            )}
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
