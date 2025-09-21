"use client";
import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";
import useModal from "@/shared/hooks/useModal";
import AddLinkModal from "@/features/add-link/ui/AddLinkModal";
import { useThemeStore } from "@/shared/stores/usethemeStore";
import cn from "@/shared/utils/cn";

export const Header = () => {
  const { showModal, openModal, closeModal } = useModal();
  const { isDark, toggleTheme } = useThemeStore();

  const onClickAddLink = () => {
    openModal();
  };

  return (
    <>
      {showModal && <AddLinkModal closeModal={closeModal} />}
      <div className="w-full desktop:h-19 laptop:h-15 h-15 border-b border-border-primary px-4 fixed bg-background-secondary z-999 transition-all">
        <div className="w-full h-full flex justify-between">
          <div className="flex h-full gap-2 items-center">
            <i className="bi bi-link text-4xl text-blue-500" />
            <Typography.H1 className="font-bold tablet:mr-15 mobile:mr-10 mobile:text-xl">
              LinkKeeper
            </Typography.H1>
          </div>
          <div className="flex h-full items-center gap-3">
            <Button.Blue onClick={onClickAddLink}>
              <i className="bi bi-plus text-xl p-0 m-0 tablet:inline mobile:hidden" />
              <Typography.P1 className="text-white">링크 추가</Typography.P1>
            </Button.Blue>
            <Button.Gray onClick={toggleTheme}>
              <i
                className={cn(
                  isDark
                    ? "bi bi-sun text-yellow-500"
                    : "bi bi-moon text-gray-500",
                  "dark:bi-brightness-high tablet:text-xl mobile:text-sm"
                )}
              />
            </Button.Gray>
          </div>
        </div>
      </div>
    </>
  );
};
