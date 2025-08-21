import { StaticImageData } from "next/image";

// 유저 타입
export interface UserInterface {
  profileImg: StaticImageData;
  nickname: string;
}