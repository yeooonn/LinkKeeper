// app/api/links/route.ts
import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const links = await db.link.findMany({
      include: {
        user: false, // 필요 시 User 모델 포함
        linkTags: {
          include: {
            tag: true, // LinkTag와 연결된 Tag 모델 포함
          },
        },
        folder: false, 
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json({ error: "링크 조회 실패" }, { status: 500 });
  }
}
