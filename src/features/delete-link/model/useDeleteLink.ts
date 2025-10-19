"use client";

import { useState } from "react";
import DeleteLink from "@/features/delete-link/api/deleteLink.service";
import { revalidateLink } from "@/shared/utils/actions";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export function useDeleteLink(closeModal: () => void) {
  const queryClient = useQueryClient()
  // 삭제 버튼 중복 클릭 방지
  const [isDeleting, setIsDeleting] = useState(false);

  // 삭제 API 호출
  const handleDelete = async (linkId: number) => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const res = await DeleteLink(linkId);

      if (res.message === "success") {
        revalidateLink();
        closeModal();
        toast.success("링크가 삭제되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["folders"] }) // 폴더 목록 새로고침
      } else {
        toast.error("삭제에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error(error);
      toast.error("서버 오류가 발생했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting };
}
