import { useState } from "react";

type ModalModeType = "create" | "edit";

const useModal = (mode?: ModalModeType) => {
  // 모달 상태
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalMode = mode || "";

  // 모달 열기
  const openModal = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
  };

  return {
    showModal,
    modalMode,
    openModal,
    closeModal,
  };
};

export default useModal;
