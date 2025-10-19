import { useState } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LineStepper from "@/shared/components/atoms/LineStepper";
import Modal from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import useLineStepper from "@/shared/hooks/useLineStepper";
import { revalidateLink } from "@/shared/utils/actions";
import { useQueryClient } from "@tanstack/react-query";
import { linkFormSchema } from "@/shared/lib/linkForm.schema";
import useLinkForm from "@/features/form-link/model/useLinkForm";
import { AddLink } from "@/features/add-link/api/addLink.service";
import { LinkFormButton, LinkFormUI } from "@/features/form-link/ui/LinkFormUI";
import { LinkResponse } from "@/entites/link/model/types";
import { UpdateLink } from "@/features/update-link/model/updateLink.service";

interface LinkModalProps {
  closeModal: () => void;
  mode: string;
  initData?: LinkResponse[];
}

type FormData = z.infer<typeof linkFormSchema>;

const LinkModal = ({ closeModal, mode, initData }: LinkModalProps) => {
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
  const { methods, initialFolder } = useLinkForm(mode, initData ?? []);
  const [selectedItem, setSelectedItem] = useState<string>(initialFolder);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const isCreate = mode === "create";
  const isEdit = mode === "edit";

  const onSubmit = async (data: FormData) => {
    const requestData = {
      ...data,
      tag: data.tags?.split(" "),
      foldername: selectedItem || newFolderName,
      alertType: data.alert,
      customAlertDate: new Date(`${data.date}T${data.time}:00`),
      isBookmark: false,
      linkReads: [],
      userId: "yeooonn",
    };

    let response;
    if (isCreate) response = await AddLink(requestData);
    if (isEdit && initData)
      response = await UpdateLink(requestData, initData[0].id);

    if (!response) {
      toast.error(
        isCreate ? "링크 생성 실패했습니다." : "링크 수정 실패했습니다."
      );
      return;
    }

    methods.reset(); // 폼 초기화
    closeModal();
    toast.success(isCreate ? "추가되었습니다." : "수정되었습니다.");
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
    mode: mode,
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
