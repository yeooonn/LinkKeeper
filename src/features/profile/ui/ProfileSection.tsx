import Profile from "@/shared/components/atoms/Profile";
import Typography from "@/shared/components/atoms/Typography";
import { userDummyData } from "../lib/userData";

const ProfileSection = () => {
  const { profileImg, nickname } = userDummyData;

  return (
    <div className="flex gap-4 items-center">
      <Profile width={60} height={60} src={profileImg} />
      <div className="w-full">
        <Typography.P1 className="text-xl">{nickname}</Typography.P1>
        <div className="flex justify-between cursor-pointer">
          <Typography.P1>계정관리</Typography.P1>
          <i className="bi bi-chevron-right" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
