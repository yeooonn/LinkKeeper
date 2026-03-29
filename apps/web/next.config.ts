import { loadEnvConfig } from "@next/env";
import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/**
 * 모노레포에서 `.env`가 리포 루트에만 있을 때를 대비해 상위 디렉터리를 탐색합니다.
 * Turbopack 미들웨어는 `apps/web/.env*`를 우선 주입하므로 `.env.local` → 루트 `.env` 심볼릭 링크도 권장합니다.
 */
function loadEnvFromMonorepo(): string {
  const starts = new Set<string>();
  for (const s of [__dirname, process.cwd()]) {
    starts.add(path.resolve(s));
  }

  for (const start of starts) {
    let dir = start;
    for (let i = 0; i < 12; i++) {
      const envFile = path.join(dir, ".env");
      if (fs.existsSync(envFile)) {
        loadEnvConfig(dir);
        return dir;
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }

  const fallback = path.join(__dirname, "..", "..");
  loadEnvConfig(fallback);
  return fallback;
}

const repoRoot = loadEnvFromMonorepo();

const nextConfig: NextConfig = {
  transpilePackages: ["@linkkeeper/shared"],
  turbopack: {
    root: repoRoot,
  },
  images: {
    domains: [
      "img1.kakaocdn.net",
      "k.kakaocdn.net",
      "t1.kakaocdn.net", // 카카오 기본 프로필 이미지에서 자주 사용됨
      "lh3.googleusercontent.com", // 구글용 프로필 이미지
    ],
  },
};

export default nextConfig;
