import cn from "@/shared/utils/cn";
import Image, { StaticImageData } from "next/image";

interface ProfileProps {
  width: number;
  height: number;
  src: string | StaticImageData;
  className?: string;
  children?: React.ReactNode;
}

const Profile = ({ width, height, src, className, children }: ProfileProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-full border border-gray-400 flex-shrink-0",
        className
      )}
      style={{ width, height }}
    >
      <Image src={src} alt="프로필 이미지" width={width} height={height} />
      {children}
    </div>
  );
};

export default Profile;
