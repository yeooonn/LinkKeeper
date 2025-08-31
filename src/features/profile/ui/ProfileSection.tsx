import Profile from "@/shared/components/atoms/Profile";
import Typography from "@/shared/components/atoms/Typography";
import { userDummyData } from "@/features/profile/lib/userData";

const ProfileSection = () => {
  const { profileImg, nickname } = userDummyData;

  return (
    <div className="flex gap-4 items-center">
      <Profile
        src={profileImg}
        className="desktop:w-14 desktop:h-14 laptop:w-13 laptop:h-13"
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

export default ProfileSection;
