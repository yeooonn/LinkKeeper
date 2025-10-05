import FolderSection from "@/features/navigation/ui/FolderSection";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Input from "@/shared/components/atoms/Input";
import LineStepper from "@/shared/components/atoms/LineStepper";
import Modal from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import LabeledInput from "@/shared/components/molecules/LabeledInput";
import LabeledSelectbox from "@/shared/components/molecules/LabeledSelectbox";
import LabeledTextarea from "@/shared/components/molecules/LabeledTextarea";
import { ALERT_OPTION } from "@/shared/constants/alertOption";
import { SELECTED_COLOR, UNSELECTED_COLOR } from "@/shared/constants/colors";
import useLineStepper from "@/shared/hooks/useLineStepper";
import cn from "@/shared/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addLinkFormSchema } from "../model/addLink.schema";
import z from "zod";
import { fetchAPI } from "@/shared/utils/fetchAPI";
import { LinkResponse } from "@/features/landing/model/link.type";
import { updateLinks } from "@/shared/utils/actions";
import { toast } from "react-toastify";

interface AddLinkModalProps {
  closeModal: () => void;
}

type FormData = z.infer<typeof addLinkFormSchema>;

const LinkPreview = ({ title }: { title: string }) => {
  return (
    <Card className="!py-1 mb-3">
      <Card.Content>
        <Typography.P1>{title}</Typography.P1>
      </Card.Content>
    </Card>
  );
};

const AddLinkModal = ({ closeModal }: AddLinkModalProps) => {
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
  const [showAddFolderInput, setShowAddFolderInput] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>("");
  // 새로 추가한 폴더 선택(하이라이트 표시) 여부
  const isSelectedNewFolder =
    selectedItem !== "" && selectedItem === newFolderName;

  const handleClickAddFolderButton = () => {
    setShowAddFolderInput((prev) => !prev);
    setSelectedItem("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(addLinkFormSchema),
    defaultValues: {
      title: "",
      url: "",
      tags: "",
      memo: "",
      alert: "미등록",
      date: "",
      time: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    console.log("??");
    // tags 문자열 분리
    const tagNames = data.tags
      ? data.tags
          .split(" ")
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];

    const requestData = {
      ...data,
      tag: tagNames,
      foldername: selectedItem || newFolderName,
      isAlert: data.alert !== "미등록",
      isBookmark: false,
      isRead: false,
      userId: "yeooonn",
    };

    const response = await fetchAPI<LinkResponse, FormData>(
      "/api/create/link",
      {
        method: "POST",
        body: requestData,
        revalidate: 0, // 즉시 캐시 무효화
      }
    );

    if (!response) {
      console.log("링크 생성에 실패했습니다.");
      return;
    }
    console.log("링크가 성공적으로 생성되었습니다!");
    reset(); // 폼 초기화
    closeModal();
    toast.success("링크가 추가되었습니다.");

    await updateLinks(); // 링크 목록 새로고침
  };

  const isFirstNextActive = watch("title") && watch("url") && step === 0;
  const isSecondNextActive = (selectedItem || newFolderName) && step === 1;
  const isAddButtonActive =
    watch("alert") === "사용자 정의" ? watch("date") && watch("time") : true;
  const showNextBtn =
    showNextButton && !isFirstNextActive && !isSecondNextActive;

  return (
    <>
      <Modal onClose={closeModal}>
        <Modal.Header onClose={closeModal}>
          <Typography.P2 className="font-bold">새 링크 추가</Typography.P2>
        </Modal.Header>
        <Modal.Content>
          <LineStepper lineCount={lineCount} step={step} />
          {step === 0 && (
            <>
              <LabeledInput
                title="제목"
                placeholder="제목"
                isRequired={true}
                register={register("title", { required: "제목은 필수입니다." })}
                error={errors.title?.message}
              />
              <LabeledInput
                title="URL"
                placeholder="http://example.com"
                isRequired={true}
                register={register("url", { required: "URL은 필수입니다." })}
                error={errors.url?.message}
              />
              <LabeledInput
                className="mb-1"
                title="태그"
                placeholder="#태그1  #태그2"
                register={register("tags")}
                error={errors.tags?.message}
              />
              <Typography.P3 className="text-gray-500 mb-2">
                태그는 반드시 #으로 시작해야 하며, 공백으로 구분됩니다.
              </Typography.P3>
              <LabeledTextarea
                title="메모"
                placeholder="메모"
                register={register("memo")}
                error={errors.memo?.message}
              />
            </>
          )}
          {step === 1 && (
            <>
              <LinkPreview title={watch("title")} />
              <div className="flex justify-between mb-3 items-center">
                <Typography.P1>
                  폴더 선택 <span className="text-[tomato]">*</span>
                </Typography.P1>
                <Button.OutlineBlue onClick={handleClickAddFolderButton}>
                  {showAddFolderInput ? "취소" : "폴더 추가"}
                </Button.OutlineBlue>
              </div>
              <div className="border border-gray-300 rounded-lg pt-2">
                <div className="w-full ml-3 mt-1">
                  <Input
                    placeholder="폴더 검색"
                    icon="search"
                    className="!w-[95%]"
                  />
                  <hr className="border-gray-300 w-[95%] mt-3" />
                </div>
                {showAddFolderInput && (
                  <div
                    onClick={() => {
                      setSelectedItem(newFolderName);
                    }}
                    className={cn(
                      isSelectedNewFolder ? SELECTED_COLOR : UNSELECTED_COLOR,
                      selectedItem !== newFolderName &&
                        "dark:hover:bg-background-hover",
                      "group pl-2.5 py-1 flex gap-3 ml-3 mt-4 mr-3 pr-2 rounded-lg cursor-pointer items-center "
                    )}
                  >
                    <div className="flex gap-2">
                      <i className="bi bi-chevron-right desktop:text-base text-xs" />
                      <i className="bi bi-folder desktop:text-base text-xs" />
                    </div>
                    <Input
                      onChange={(e) => setNewFolderName(e.target.value)}
                      placeholder="폴더명 입력"
                      className="h-8 border border-gray-300 bg-transparent !group-focus-within:border-transparent"
                    />
                  </div>
                )}
                <FolderSection
                  showTitle={false}
                  showFolderSelectionHighlight={true}
                  showChildFolderSelectionHighlight={false}
                  selectedMenu={selectedItem}
                  setSelectedMenu={setSelectedItem}
                />
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <LinkPreview title={watch("title")} />
              <LabeledSelectbox
                title="알림설정"
                options={ALERT_OPTION}
                register={register("alert")}
              />

              {watch("alert") === "사용자 정의" && (
                <div className="flex gap-2">
                  <LabeledInput
                    type="date"
                    title="날짜"
                    className="w-full"
                    register={register("date")}
                    error={errors.date?.message}
                  />
                  <LabeledInput
                    type="time"
                    title="시간"
                    className="w-full"
                    register={register("time")}
                    error={errors.time?.message}
                  />
                </div>
              )}
            </>
          )}
        </Modal.Content>
        <Modal.Footer>
          <Button.Gray onClick={closeModal}>취소</Button.Gray>
          {showPrevButton && (
            <Button.Gray onClick={handleClickPrevButton}>이전</Button.Gray>
          )}

          {isFirstNextActive || isSecondNextActive ? (
            <Button.Blue onClick={handleClickNextButton}>다음</Button.Blue>
          ) : showNextBtn ? (
            <Button.Gray isDisabled>다음</Button.Gray>
          ) : null}

          {showAddButton &&
            (isAddButtonActive ? (
              <Button.Blue onClick={handleSubmit(onSubmit)}>추가</Button.Blue>
            ) : (
              <Button.Gray isDisabled>추가</Button.Gray>
            ))}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddLinkModal;
