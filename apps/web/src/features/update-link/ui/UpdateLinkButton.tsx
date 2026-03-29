"use client";

import fetchLinks from "@/entites/link/api/fetchLinks.service";
import { LinkResponse } from "@/entites/link/model/types";
import useModal from "@/shared/hooks/useModal";
import { useUser } from "@/shared/hooks/useUser";
import { stopEvent } from "@/shared/utils/stopEvent";
import LinkModal from "@/widgets/LinkModal";
import { useState } from "react";

const UpdateLinkButton = ({ linkId }: { linkId: number }) => {
  const { showModal, openModal, closeModal, modalMode } = useModal("edit");
  const [initData, setInitData] = useState<LinkResponse[]>([]);
  const { user } = useUser();

  const handleModifyButton = async (e: React.MouseEvent) => {
    stopEvent(e);

    if (!linkId) return;

    try {
      const data = await fetchLinks(10, `?edit=${linkId}&userId=${user?.id}`);
      setInitData(data);
      openModal();
    } catch (error) {
      console.error("링크 데이터 로드 실패:", error);
    }
  };

  return (
    <>
      {showModal && (
        <LinkModal
          closeModal={closeModal}
          mode={modalMode}
          initData={initData}
        />
      )}
      <button className="cursor-pointer" onClick={handleModifyButton}>
        <i className="bi bi-pencil text-blue-400" />
      </button>
    </>
  );
};

export default UpdateLinkButton;
