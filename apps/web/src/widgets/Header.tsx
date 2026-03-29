"use client";
import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";
import useModal from "@/shared/hooks/useModal";
import { useThemeStore } from "@/shared/stores/usethemeStore";
import cn from "@/shared/utils/cn";
import { useRouter } from "next/navigation";
import LinkModal from "@/widgets/LinkModal";
import AddLinkButton from "@/features/add-link/ui/AddLinkButton";
import SignInButton from "@/features/sign-in/ui/SignInButton";
import { useUser } from "@/shared/hooks/useUser";
import { useMounted } from "@/shared/hooks/useMounted";

export const Header = () => {
  const navigator = useRouter();
  const { showModal, openModal, closeModal, modalMode } = useModal("create");
  const mounted = useMounted();
  const { isDark, toggleTheme } = useThemeStore();
  /** persist 복원 전까지는 SSR과 동일한 기본(라이트)로 렌더해 하이드레이션 불일치 방지 */
  const showSunIcon = mounted && isDark;
  const { user } = useUser();

  const handleClickLogo = () => {
    navigator.push("/links/전체");
    localStorage.removeItem("searchValue");
  };

  return (
    <>
      {showModal && <LinkModal closeModal={closeModal} mode={modalMode} />}
      <div className="w-full desktop:h-19 laptop:h-15 h-15 border-b border-border-primary px-4 fixed bg-background-secondary z-999 transition-all">
        <div className="w-full h-full flex justify-between">
          <div
            className="flex h-full gap-2 items-center cursor-pointer"
            onClick={handleClickLogo}
          >
            <i className="bi bi-link text-4xl text-blue-500" />
            <Typography.H1 className="font-bold tablet:mr-15 mobile:mr-10 mobile:text-xl">
              LinkKeeper
            </Typography.H1>
          </div>
          <div className="flex h-full items-center gap-3">
            {user && <AddLinkButton openModal={openModal} />}
            {!user && <SignInButton text="링크 추가" />}
            <Button.Gray onClick={toggleTheme}>
              <i
                className={cn(
                  showSunIcon
                    ? "bi bi-sun text-yellow-500"
                    : "bi bi-moon text-gray-500",
                  "dark:bi-brightness-high tablet:text-xl mobile:text-sm",
                )}
              />
            </Button.Gray>
          </div>
        </div>
      </div>
    </>
  );
};
