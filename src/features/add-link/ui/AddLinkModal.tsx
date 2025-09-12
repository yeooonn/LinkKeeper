import Modal from "@/shared/components/atoms/Modal";

interface AddLinkModalProps {
  closeModal: () => void;
}

const AddLinkModal = ({ closeModal }: AddLinkModalProps) => {
  return (
    <Modal onClose={closeModal}>
      <Modal.Header onClose={closeModal}>링크 추가</Modal.Header>
      <Modal.Content>컨텐츠</Modal.Content>
      <Modal.Footer>푸터</Modal.Footer>
    </Modal>
  );
};

export default AddLinkModal;
