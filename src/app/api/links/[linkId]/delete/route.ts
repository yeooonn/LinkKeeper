import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const linkId = Number(url.pathname.split("/").at(-2));
  const userId = "yeooonn";

  try {
    const link = await db.link.findUnique({
      where: { id: linkId },
      include: {
        linkTags: true,
      },
    });

    if (!link) throw new Error("존재하지 않는 링크입니다.");
    if (link.userId !== userId) throw new Error("삭제 권한이 없습니다.");

    const folderName = link.foldername;

    // 트랜잭션으로 링크 + LinkTag 삭제
    await db.$transaction(async (tx) => {
      // 1️. LinkTag 삭제
      await tx.linkTag.deleteMany({ where: { linkId } });

      // 2️. 링크 삭제
      await tx.link.delete({ where: { id: linkId } });

      // 3️. 폴더에 남은 링크가 없으면 삭제
      if (folderName) {
        const remaining = await tx.link.count({ where: { foldername: folderName } });
        if (remaining === 0) await tx.folder.delete({ where: { name: folderName } });
      }

      // 4️. 사용되지 않는 태그 삭제
      const unusedTags = await tx.tag.findMany({
        where: { linkTags: { none: {} } },
      });
      if (unusedTags.length > 0) {
        await tx.tag.deleteMany({ where: { id: { in: unusedTags.map(t => t.id) } } });
      }
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("링크 삭제 에러:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
