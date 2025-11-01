// app/api/links/route.ts
import db from "@/shared/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {  
  try {
    const body = await request.json();
    const {
      title,
      url,
      tag = [], // 문자열로 태그 전달
      memo,
      foldername,
      alertType = "NONE",
      customAlertDate,
      id,
      isBookmark = false,
    } = body;

    // id 확인
    const userExists = await db.user.findUnique({ where: { id } });
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
        alertType,
        customAlertDate,
        isBookmark,
        user: { connect: { id } },
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
          userId: id,
        },
      });
    }

    return NextResponse.json("링크가 추가되었습니다.", { status: 201 });
  } catch (error) {
    const prisma = Prisma;

    if (error instanceof prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json({ message: "같은 폴더에 이미 존재하는 파일명 입니다. 파일명을 수정해 주세요.", status: 400 });
      }
    }

    return NextResponse.json({ error: "링크 생성 실패" }, { status: 500 });
  }
}
