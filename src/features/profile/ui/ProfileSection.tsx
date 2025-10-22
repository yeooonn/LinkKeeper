import Profile from "@/shared/components/atoms/Profile";
import Typography from "@/shared/components/atoms/Typography";
import { userDummyData } from "@/features/profile/lib/userData";
import SignInButton from "@/features/sign-in/ui/SignInButton";

const ProfileContent = () => {
  const { profileImg, nickname } = userDummyData;
  return (
    <div className="flex gap-4 items-center mobile:my-3 tablet:m-0 desktop:mt-0">
      <Profile
        src={profileImg}
        className="desktop:w-14 desktop:h-14 laptop:w-13 laptop:h-13 tablet:w-10 tablet:h-10 mobile:w-14 mobile:h-14"
      />
      <div className="w-full">
        <Typography.P1 className="desktop:text-xl text-base font-bold">
          {nickname}
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
      <Typography.P1 className="mb-2 laptop:block tablet:hidden">
        링크를 저장하고 관리해보세요.
      </Typography.P1>
      <SignInButton />
    </div>
  );
};

const ProfileSection = () => {
  const isLogedIn = false;
  if (isLogedIn) return <ProfileContent />;
  else return <SignInContent />;
};

export default ProfileSection;
