import { useState } from "react";

const useModal = () => {
  // 모달 상태
  const [showModal, setShowModal] = useState<boolean>(false);

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
    openModal,
    closeModal,
  };
};

export default useModal;
