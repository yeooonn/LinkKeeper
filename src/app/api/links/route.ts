// app/api/links/route.ts
import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

const USER_ID = "yeooonn";

// 필터 매핑 객체
const FILTER_CONDITIONS: Record<string, object> = {
  "읽지 않음": { linkReads: { none: { userId: USER_ID } } },
  즐겨찾기: { isBookmark: true },
  "알림 설정": { isAlert: true },
};

// where 절 생성 함수
const buildWhereClause = (
  filename?: string | null,
  filter?: string | null,
  url?: string | null,
  editLinkId?: string | null
) => {
  if (filename) {
    return { userId: USER_ID, title: { equals: filename } };
  }

  if (filter) {
    const condition = FILTER_CONDITIONS[filter];
    return { userId: USER_ID, ...(condition ?? {}) };
  }

  if (url) {
    return { userId: USER_ID, url: { equals: url } };
  }

  if (editLinkId) {
    return { userId: USER_ID, id: { equals: Number(editLinkId) } };
  }

  // 기본 전체 조회
  return { userId: USER_ID };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const filter = searchParams.get("filter");
  const searchValue = searchParams.get("url");
  const editLinkId = searchParams.get("edit");

  const where = buildWhereClause(filename, filter, searchValue, editLinkId);

  try {
    const links = await db.link.findMany({
      where: where,
      include: {
        user: false, // 필요 시 User 모델 포함
        linkTags: {
          include: {
            tag: true, // LinkTag와 연결된 Tag 모델 포함
          },
        },
        folder: false,
        linkReads: true,
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
