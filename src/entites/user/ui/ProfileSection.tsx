import Profile from "@/shared/components/atoms/Profile";
import Typography from "@/shared/components/atoms/Typography";
import SignInButton from "@/features/sign-in/ui/SignInButton";
import { UserInterface } from "@/entites/user/model/types";
import { useUser } from "@/shared/hooks/useUser";
import { useState } from "react";
import { createClient } from "@/shared/utils/supabase/client";

const ProfileContent = ({ userData }: { userData: UserInterface }) => {
  const supabase = createClient();
  const { profileImage, name } = userData;
  const [isOpenArrow, setIsOpenArrow] = useState<boolean>(false);

  // 로그아웃
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="flex gap-4 items-center mobile:my-3 tablet:m-0 desktop:mt-0">
      <Profile
        src={profileImage!}
        className="desktop:w-14 desktop:h-14 laptop:w-13 laptop:h-13 tablet:w-10 tablet:h-10 mobile:w-14 mobile:h-14"
      />
      <div className="w-full">
        <Typography.P1 className="desktop:text-xl text-base font-bold">
          {name}
        </Typography.P1>
        <div className="w-full flex justify-between cursor-pointer relative">
          <div
            onClick={() => setIsOpenArrow((prev) => !prev)}
            className="w-full flex justify-between"
          >
            <Typography.P1>계정관리</Typography.P1>
            {!isOpenArrow && <i className="bi bi-chevron-right" />}
          </div>
          {isOpenArrow && (
            <>
              <i
                className="bi bi-chevron-down"
                onClick={() => setIsOpenArrow(false)}
              />
              <button
                className="px-4 py-2 mt-7 bg-background-secondary  border border-border-secondary absolute rounded-xl right-0 shadow whitespace-nowrap cursor-pointer hover:bg-background-hover transition-all"
                onClick={() => handleLogout()}
              >
                <i className="bi bi-door-closed mr-2" />
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const SignInContent = () => {
  return (
    <div className="mobile:my-3 tablet:m-0 desktop:mt-0">
      <Typography.P1 className="mb-2 laptop:block tablet:hidden text-foreground-secondary">
        링크를 저장하고 관리해보세요.
      </Typography.P1>
      <SignInButton variant="OutlineBlue" />
    </div>
  );
};

const ProfileSection = () => {
  const { user } = useUser();

  if (user) return <ProfileContent userData={user} />;
  else return <SignInContent />;
};

export default ProfileSection;
