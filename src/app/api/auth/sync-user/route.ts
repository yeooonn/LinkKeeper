import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.id) return NextResponse.json("유저 데이터가 없습니다.");

    const existing = await db.user.findUnique({
      where: { id: body.id },
    });

    if (!existing) {
      await db.user.create({
        data: {
          id: body.id,
          email: body.email,
          name: body.name,
          profileImage: body.profileImage || null,
        },
      });
    }

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json({ error: "로그인 실패" }, { status: 500 });
  }
}
