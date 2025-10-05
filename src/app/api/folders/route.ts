import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const folders = await db.folder.findMany({
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
