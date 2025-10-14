import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import LineStepper from "@/shared/components/atoms/LineStepper";
import Modal from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import useLineStepper from "@/shared/hooks/useLineStepper";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { revalidateLink } from "@/shared/utils/actions";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { linkFormSchema } from "@/features/form-link/model/linkForm.schema";
import useLinkForm from "@/features/form-link/model/useLinkForm";
import { AddLink } from "@/features/add-link/api/addLink.service";
import { LinkFormButton, LinkFormUI } from "@/features/form-link/ui/LinkFormUI";

interface AddLinkModalProps {
  closeModal: () => void;
}

type FormData = z.infer<typeof linkFormSchema>;

export const LinkPreview = ({ title }: { title: string }) => {
  return (
    <Card className="!py-1 mb-3">
      <Card.Content>
        <Typography.P1>{title}</Typography.P1>
      </Card.Content>
    </Card>
  );
};

const LinkModal = ({ closeModal }: AddLinkModalProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const lineCount = 3;
  const {
    step,
    showNextButton,
    showPrevButton,
    showAddButton,
    handleClickNextButton,
    handleClickPrevButton,
  } = useLineStepper({ lineCount: lineCount });
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [newFolderName, setNewFolderName] = useState<string>("");

  const { methods } = useLinkForm();

  // tags 문자열 분리
  const formatTags = (tags: string | undefined) => {
    tags
      ? tags
          .split(" ")
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];
  };

  const onSubmit = async (data: FormData) => {
    const requestData = {
      ...data,
      tag: formatTags(data.tags),
      foldername: selectedItem || newFolderName,
      isAlert: data.alert !== "미등록",
      isBookmark: false,
      linkReads: [],
      userId: "yeooonn",
    };

    // 링크 추가 API 호출
    const response = await AddLink(requestData);

    if (!response) {
      toast.error("링크 생성에 실패했습니다.");
      return;
    }

    methods.reset(); // 폼 초기화
    closeModal();
    toast.success("링크가 추가되었습니다.");
    router.push("/links/전체");

    queryClient.invalidateQueries({ queryKey: ["folders"] }); // 폴더 목록 새로고침

    await revalidateLink(); // 페이지 새로고침
  };

  const buttonProps = {
    closeModal: closeModal,
    handleClickPrevButton: handleClickPrevButton,
    handleClickNextButton: handleClickNextButton,
    onSubmit: onSubmit,
    step: step,
    selectedItem: selectedItem,
    newFolderName: newFolderName,
    showPrevButton: showPrevButton,
    showNextButton: showNextButton,
    showAddButton: showAddButton,
    methods: methods,
  };

  return (
    <Modal onClose={closeModal}>
      <Modal.Header onClose={closeModal}>
        <Typography.P2 className="font-bold">새 링크 추가</Typography.P2>
      </Modal.Header>
      <Modal.Content>
        <LineStepper lineCount={lineCount} step={step} />
        <FormProvider {...methods}>
          <LinkFormUI
            step={step}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            newFolderName={newFolderName}
            setNewFolderName={setNewFolderName}
          ></LinkFormUI>
        </FormProvider>
      </Modal.Content>
      <Modal.Footer>
        <LinkFormButton buttonProps={buttonProps} />
      </Modal.Footer>
    </Modal>
  );
};

export default LinkModal;
