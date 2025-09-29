import { StaticImageData } from "next/image";

// 유저 타입
export interface UserInterface {
  profileImg: StaticImageData;
  nickname: string;
}

export interface User {
  userId: string;
  userName: string;
  userEmail?: string;
  password?: string;
  github_id?: string;
  avatar: string;
}