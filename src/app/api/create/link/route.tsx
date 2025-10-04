// app/api/links/route.ts
import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      url,
      memo,
      foldername,
      userId,
      isAlert = false,
      isBookmark = false,
      isRead = false,
      tag = [], // 문자열로 태그 전달
    } = body;

    // userId 확인
    const userExists = await db.user.findUnique({ where: { userId } });
    if (!userExists) {
      return NextResponse.json(
        { error: "유효하지 않은 userId입니다." },
        { status: 400 }
      );
    }

    // 링크 생성
    const newLink = await db.link.create({
      data: {
        title,
        url,
        memo,
        isAlert,
        isBookmark,
        isRead,
        user: { connect: { userId } },
        folder: {
          connectOrCreate: {
            where: { name: foldername }, // 폴더가 있으면 기존 폴더와 연결
            create: { name: foldername }, // 폴더가 없으면 새로 생성
          },
        },
      },
    });

    // LinkTag 생성
    for (const tagName of tag) {
      // 태그 확인
      let tag = await db.tag.findUnique({ where: { name: tagName } });

      if (!tag) {
        tag = await db.tag.create({ data: { name: tagName } });
      }

      // LinkTag 연결
      await db.linkTag.create({
        data: {
          linkId: newLink.id,
          tagId: tag.id,
          userId,
        },
      });
    }

    return NextResponse.json("링크가 추가되었습니다.", { status: 201 });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json({ error: "링크 생성 실패" }, { status: 500 });
  }
}
