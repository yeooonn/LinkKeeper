// app/api/links/route.ts
import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const linkId = Number(url.pathname.split("/").at(-2));

  try {
    const body = await req.json();
    const {
      title,
      url,
      memo,
      foldername,
      id,
      alertType,
      customAlertDate,
      isBookmark = false,
      tag = [],
    } = body;

    if (!linkId) {
      return NextResponse.json(
        { error: "link ID가 없습니다.." },
        { status: 400 }
      );
    }

    // 유저 존재 여부 확인
    const userExists = await db.user.findUnique({ where: { id } });
    if (!userExists) {
      return NextResponse.json(
        { error: "유효하지 않은 userId입니다." },
        { status: 400 }
      );
    }

    // 링크 존재 확인
    const existingLink = await db.link.findUnique({ where: { id: linkId } });
    if (!existingLink) {
      return NextResponse.json(
        { error: "수정할 링크가 존재하지 않습니다." },
        { status: 404 }
      );
    }

    // 기존 태그 연결 삭제
    await db.linkTag.deleteMany({ where: { linkId: linkId } });

    // 링크 업데이트
    await db.link.update({
      where: { id: linkId },
      data: {
        title,
        url,
        memo,
        alertType,
        customAlertDate,
        isBookmark,
        folder: {
          connectOrCreate: {
            where: { name: foldername },
            create: { name: foldername },
          },
        },
      },
    });

    // 태그 다시 생성 및 연결
    for (const tagName of tag) {
      // 태그 확인
      let tag = await db.tag.findUnique({ where: { name: tagName } });

      if (!tag) {
        tag = await db.tag.create({ data: { name: tagName } });
      }

      // LinkTag 연결
      await db.linkTag.create({
        data: {
          linkId: linkId,
          tagId: tag.id,
          userId: id,
        },
      });
    }

    return NextResponse.json("링크가 업데이트되었습니다.", { status: 200 });
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json({ error: "링크 업데이트 실패" }, { status: 500 });
  }
}
