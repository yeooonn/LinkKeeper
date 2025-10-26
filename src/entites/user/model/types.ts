import { StaticImageData } from "next/image";

// 유저 타입
export interface UserInterface1 {
  profileImg: StaticImageData;
  nickname: string;
}

export interface UserInterface {
  id: string;
  email?: string | undefined;
  name?: string;
  profileImage: string | undefined;
}
