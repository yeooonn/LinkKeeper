"use server";
import { revalidateTag } from "next/cache";

export async function revalidateLink() {
  // Next.js 16+: 두 번째 인자(profile) 필수. lock이 15일 때도 타입만 넓혀서 동일 호출
  (revalidateTag as (tag: string, profile?: string) => void)("link", "max");
}
