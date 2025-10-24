import Profile from "@/shared/components/atoms/Profile";
import Typography from "@/shared/components/atoms/Typography";
// import { userDummyData } from "@/entites/user/model/userData";
import SignInButton from "@/features/sign-in/ui/SignInButton";
import { useAuthStore } from "@/shared/stores/useUserStore";
import { UserInterface } from "../model/types";

const ProfileContent = ({ userData }: { userData: UserInterface }) => {
  const { profileImage, name } = userData;
  return (
    <div className="flex gap-4 items-center mobile:my-3 tablet:m-0 desktop:mt-0">
      <Profile
        src={profileImage}
        className="desktop:w-14 desktop:h-14 laptop:w-13 laptop:h-13 tablet:w-10 tablet:h-10 mobile:w-14 mobile:h-14"
      />
      <div className="w-full">
        <Typography.P1 className="desktop:text-xl text-base font-bold">
          {name}
        </Typography.P1>
        <div className="flex justify-between cursor-pointer">
          <Typography.P1>계정관리</Typography.P1>
          <i className="bi bi-chevron-right" />
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
  const userData = useAuthStore((state) => state.user);

  if (userData) return <ProfileContent userData={userData} />;
  else return <SignInContent />;
};

export default ProfileSection;
