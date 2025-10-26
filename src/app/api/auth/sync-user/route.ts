import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email, name, profileImage } = body;

    if (!id) return NextResponse.json("유저 데이터가 없습니다.");

    const user = await db.user.upsert({
      where: { id: id },
      update: {
        email: email,
        name: name,
        profileImage: profileImage,
      },
      create: {
        id: id,
        email: email,
        name: name,
        profileImage: profileImage,
      },
    });

    return NextResponse.json({ message: "success", data: user });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json({ error: "로그인 실패" }, { status: 500 });
  }
}
