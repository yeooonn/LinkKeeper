// app/api/links/route.ts
import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const filter = searchParams.get("filter");
  const searchValue = searchParams.get("url");

  const returnWhereClause = () => {
    // 파일명 조회
    if (filename) {
      // filename이 있으면 완전 일치 검색
      return { title: { equals: filename } };
    }
    // 필터 조회
    else if (filter) {
      if (filter === "전체") {
        return {};
      }
      if (filter === "읽지 않음") {
        return { linkReads: { none: { userId: "yeooonn" } } };
      }
      if (filter === "즐겨찾기") {
        return { isBookmark: true };
      }
      if (filter === "알림 설정") {
        return { isAlert: true };
      }
    }

    // url 검색
    else if (searchValue) {
      return { url: { equals: searchValue } };
    }

    // 전체 조회
    return {};
  };

  try {
    const links = await db.link.findMany({
      where: returnWhereClause(),
      include: {
        user: false, // 필요 시 User 모델 포함
        linkTags: {
          include: {
            tag: true, // LinkTag와 연결된 Tag 모델 포함
          },
        },
        folder: false,
        linkReads: true
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
