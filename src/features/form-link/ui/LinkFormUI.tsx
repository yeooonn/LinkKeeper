"use client";
import FolderSection from "@/features/navigation/ui/FolderSection";
import Button from "@/shared/components/atoms/Button";
import Input from "@/shared/components/atoms/Input";
import Typography from "@/shared/components/atoms/Typography";
import { LinkPreview } from "@/shared/components/modal/LinkModal";
import LabeledInput from "@/shared/components/molecules/LabeledInput";
import LabeledSelectbox from "@/shared/components/molecules/LabeledSelectbox";
import LabeledTextarea from "@/shared/components/molecules/LabeledTextarea";
import { ALERT_OPTION } from "@/shared/constants/alertOption";
import { SELECTED_COLOR, UNSELECTED_COLOR } from "@/shared/constants/colors";
import cn from "@/shared/utils/cn";
import { Dispatch, SetStateAction, useState } from "react";
import { FieldError, useFormContext, UseFormReturn } from "react-hook-form";
import z from "zod";
import { linkFormSchema } from "../model/linkForm.schema";

interface LinkFormUI {
  step: number;
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
  newFolderName: string;
  setNewFolderName: Dispatch<SetStateAction<string>>;
}

type FormData = z.infer<typeof linkFormSchema>;

interface ButtonPropsInterface {
  buttonProps: {
    closeModal: () => void;
    handleClickPrevButton: () => void;
    handleClickNextButton: () => void;
    onSubmit: (data: FormData) => Promise<void>;
    step: number;
    selectedItem: string;
    newFolderName: string;
    showPrevButton: boolean;
    showNextButton: boolean;
    showAddButton: boolean;
    methods: UseFormReturn<FormData>;
  };
}

export const LinkFormUI = ({
  step,
  selectedItem,
  setSelectedItem,
  newFolderName,
  setNewFolderName,
}: LinkFormUI) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const [showAddFolderInput, setShowAddFolderInput] = useState<boolean>(false);
  // 새로 추가한 폴더 선택(하이라이트 표시) 여부
  const isSelectedNewFolder =
    selectedItem !== "" && selectedItem === newFolderName;

  const handleClickAddFolderButton = () => {
    setShowAddFolderInput((prev) => !prev);
    setSelectedItem("");
  };

  if (step === 0) {
    return (
      <>
        <LabeledInput
          title="제목"
          placeholder="제목"
          isRequired={true}
          register={register("title", { required: "제목은 필수입니다." })}
          error={errors.title as FieldError}
        />
        <LabeledInput
          title="URL"
          placeholder="http://example.com"
          isRequired={true}
          register={register("url", { required: "URL은 필수입니다." })}
          error={errors.url as FieldError}
        />
        <LabeledInput
          className="mb-1"
          title="태그"
          placeholder="#태그1  #태그2"
          register={register("tags")}
          error={errors.tags as FieldError}
        />
        <Typography.P3 className="text-gray-500 mb-2">
          태그는 반드시 #으로 시작해야 하며, 공백으로 구분됩니다.
        </Typography.P3>
        <LabeledTextarea
          title="메모"
          placeholder="메모"
          register={register("memo")}
          error={errors.memo as FieldError}
        />
      </>
    );
  }

  if (step === 1) {
    return (
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
        <div className="border border-gray-300 rounded-lg max-h-100 overflow-y-scroll overflow-x-hidden">
          <div className="w-full ml-3 sticky top-0 bg-white z-10 pb-2  pt-3">
            <Input placeholder="폴더 검색" icon="search" className="!w-[95%]" />
            <hr className="border-gray-300 w-[95%] mt-3" />
          </div>

          <div className="overflow-y-scroll overflow-x-hidden max-h-[calc(100%-60px)]">
            {showAddFolderInput && (
              <div
                onClick={() => setSelectedItem(newFolderName)}
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
        </div>
      </>
    );
  }

  if (step === 2) {
    return (
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
              error={errors.date as FieldError}
            />
            <LabeledInput
              type="time"
              title="시간"
              className="w-full"
              register={register("time")}
              error={errors.time as FieldError}
            />
          </div>
        )}
      </>
    );
  }
};

export const LinkFormButton = ({ buttonProps }: ButtonPropsInterface) => {
  const {
    closeModal,
    handleClickPrevButton,
    handleClickNextButton,
    onSubmit,
    step,
    selectedItem,
    newFolderName,
    showPrevButton,
    showNextButton,
    showAddButton,
    methods,
  } = buttonProps;

  const isFirstNextActive =
    methods.watch("title") && methods.watch("url") && step === 0;
  const isSecondNextActive = (selectedItem || newFolderName) && step === 1;
  const isAddButtonActive =
    methods.watch("alert") === "사용자 정의"
      ? methods.watch("date") !== "" && methods.watch("time") !== ""
      : true;
  const showNextBtn =
    showNextButton && !isFirstNextActive && !isSecondNextActive;

  return (
    <>
      <Button.Gray onClick={closeModal}>취소</Button.Gray>

      {showPrevButton && (
        <Button.Gray onClick={handleClickPrevButton}>이전</Button.Gray>
      )}

      {showNextButton && (
        <Button.Blue onClick={handleClickNextButton} isDisabled={showNextBtn}>
          다음
        </Button.Blue>
      )}

      {showAddButton && (
        <Button.Blue
          onClick={methods.handleSubmit(onSubmit)}
          isDisabled={!isAddButtonActive}
        >
          추가
        </Button.Blue>
      )}
    </>
  );
};
