import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "img1.kakaocdn.net",
      "t1.kakaocdn.net", // 카카오 기본 프로필 이미지에서 자주 사용됨
    ],
  },
};

export default nextConfig;
