import db from "@/shared/lib/db";
import { createClient } from "@/shared/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const linkId = Number(url.pathname.split("/").at(-2));
  const supabase = await createClient(); // 서버 클라이언트 생성 (쿠키 자동 로드)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  const userId = user!.id;

  try {
    const link = await db.link.findUnique({
      where: { id: linkId },
      include: {
        linkTags: true,
      },
    });

    if (!link) throw new Error("존재하지 않는 링크입니다.");
    if (link.userId !== userId) throw new Error("삭제 권한이 없습니다.");

    const folderId = link.folderId;

    // 트랜잭션으로 링크 + LinkTag 삭제
    await db.$transaction(async (tx) => {
      // 1️. LinkTag 삭제
      await tx.linkTag.deleteMany({ where: { linkId } });

      // 2️. 링크 삭제
      await tx.link.delete({ where: { id: linkId } });

      // 3️. 폴더에 남은 링크가 없으면 삭제
      if (folderId) {
        const remaining = await tx.link.count({ where: { folderId: folderId } });
        if (remaining === 0) await tx.folder.delete({ where: { id: folderId } });
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
