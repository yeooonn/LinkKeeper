import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const linkId = Number(url.pathname.split("/").at(-2));
  const userId = "yeooonn";

  try {
    const link = await db.link.findUnique({
      where: { id: linkId },
      include: { user: true },
    });

    if (!link) {
      throw new Error("존재하지 않는 링크입니다.");
    }

    if (link.userId !== userId) {
      throw new Error("삭제 권한이 없습니다.");
    }

    // 링크 삭제
    await db.link.delete({
      where: { id: linkId },
    });

    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.error("링크 삭제 에러:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
