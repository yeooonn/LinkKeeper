"use client";

import { revalidateLink } from "@/shared/utils/actions";
import postReadLink from "@/features/read-link/api/readLink.service";

const useReadLink = (linkId: number) => {
  const handleReadLink = async () => {
    const res = await postReadLink(linkId);

    if (res.message === "success") {
      await revalidateLink();
    }
  };

  return { handleReadLink };
};

export default useReadLink;
