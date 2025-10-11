import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { linkId: number } }
) {
  try {
    const linkId = Number(params.linkId);

    // DB에 해당 링크가 존재하는지 체크
    const link = await db.link.findUnique({
      where: { id: linkId },
      select: { isBookmark: true },
    });

    // 존재하지 않을 경우
    if (!link) {
      return NextResponse.json(
        { error: "링크를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 존재하면 업데이트
    const updated = await db.link.update({
      where: { id: linkId },
      data: { isBookmark: !link.isBookmark },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Bookmark toggle error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
