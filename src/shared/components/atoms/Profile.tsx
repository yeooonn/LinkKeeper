import cn from "@/shared/utils/cn";
import Image, { StaticImageData } from "next/image";

interface ProfileProps {
  src: string | StaticImageData;
  className?: string;
  children?: React.ReactNode;
}

const Profile = ({ src, className, children }: ProfileProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full border border-gray-400 flex-shrink-0",
        className
      )}
    >
      <Image
        src={src}
        alt="프로필 이미지"
        fill
        className="object-cover rounded-full"
      />
      {children}
    </div>
  );
};

export default Profile;
