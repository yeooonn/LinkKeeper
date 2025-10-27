import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
   const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId가 필요합니다." }, { status: 400 });
  }

  try {
    const folders = await db.folder.findMany({
      where: {
        links: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        children: true,
        links: true,
      },
    });

    return NextResponse.json(folders, { status: 200 });
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json({ error: "링크 조회 실패" }, { status: 500 });
  }
}
