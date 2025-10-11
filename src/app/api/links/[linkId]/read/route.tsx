import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const linkId = Number(url.pathname.split("/").at(-2));
  const userId = "yeooonn";

  try {
    await db.linkRead.upsert({
      // userId_linkId: 복합 고유 제약(unique key)
      // => 한 사용자가(userId) 특정 링크(linkId)를 읽었는지 중복 체크하는 조건
      where: {
        userId_linkId: { userId, linkId },
      },
      update: { readAt: new Date() }, // 이미 읽은 경우 시간 업데이트
      create: { userId, linkId }, // 처음 읽은 경우 readAt 디폴트 값으로 생성
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("링크 읽음 처리 에러:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
