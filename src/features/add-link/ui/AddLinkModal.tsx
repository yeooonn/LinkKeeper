import { useNavigation } from "@/features/navigation/model/useNavigation";
import FolderSection from "@/features/navigation/ui/FolderSection";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Input from "@/shared/components/atoms/Input";
import LineStepper from "@/shared/components/atoms/LineStepper";
import Modal from "@/shared/components/atoms/Modal";
import Typography from "@/shared/components/atoms/Typography";
import LabeledInput from "@/shared/components/molecules/LabeledInput";
import LabeledTextarea from "@/shared/components/molecules/LabeledTextarea";
import useLineStepper from "@/shared/hooks/useLineStepper";
import cn from "@/shared/utils/cn";
import { useState } from "react";

interface AddLinkModalProps {
  closeModal: () => void;
}

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
  const { selectedMenu, setSelectedMenu, selectedColor, unSelectedColor } =
    useNavigation();
  const [showAddFolderInput, setShowAddFolderInput] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>("");
  // 새로 추가한 폴더 선택(하이라이트 표시) 여부
  const isSelectedNewFolder =
    selectedMenu !== "" && selectedMenu === newFolderName;

  const handleClickAddFolderButton = () => {
    setShowAddFolderInput((prev) => !prev);
    setSelectedMenu("");
  };

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
              <LabeledInput title="제목" placeholder="제목" isRequired={true} />
              <LabeledInput
                title="URL"
                placeholder="http://example.com"
                isRequired={true}
              />
              <LabeledInput title="태그" placeholder="#태그1  #태그2" />
              <LabeledTextarea title="메모" placeholder="메모" />
            </>
          )}
          {step === 1 && (
            <div>
              <Card className="!py-1 mb-3">
                <Card.Content className="flex justify-between !pb-2">
                  <Typography.P1>링크 이름</Typography.P1>
                  <Typography.P1>http://example.com</Typography.P1>
                </Card.Content>
              </Card>

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
                  <span className="border-b border-gray-300 w-[95%] mt-3 block"></span>
                </div>
                {showAddFolderInput && (
                  <div
                    onClick={() => {
                      setSelectedMenu(newFolderName);
                    }}
                    className={cn(
                      isSelectedNewFolder ? selectedColor : unSelectedColor,
                      selectedMenu !== newFolderName &&
                        "dark:hover:bg-[#4d6080] hover:bg-gray-100",
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
                  selectedMenu={selectedMenu}
                  setSelectedMenu={setSelectedMenu}
                />
              </div>
            </div>
          )}
          {step === 2 && <p>알림설정</p>}
        </Modal.Content>
        <Modal.Footer>
          <Button.Gray onClick={closeModal}>취소</Button.Gray>
          {showPrevButton && (
            <Button.Gray onClick={handleClickPrevButton}>이전</Button.Gray>
          )}
          {showNextButton && (
            <Button.Gray onClick={handleClickNextButton}>다음</Button.Gray>
          )}
          {showAddButton && <Button.Blue>추가</Button.Blue>}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddLinkModal;
