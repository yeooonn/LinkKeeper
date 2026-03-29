import db from "@/shared/lib/db";
import { NextResponse } from "next/server";

const buildWhereClause = (
  USER_ID: string,
  filename?: string | null,
  filter?: string | null,
  url?: string | null,
  editLinkId?: string | null
) => {
  const FILTER_CONDITIONS: Record<string, object> = {
    "읽지 않음": { linkReads: { none: { userId: USER_ID } } },
    즐겨찾기: { isBookmark: true },
    "알림 설정": {
      alertType: { not: "NONE" },
    },
  };

  if (filename) {
    return {
      userId: USER_ID,
      title: { equals: filename },
    };
  }

  if (filter) return { userId: USER_ID, ...(FILTER_CONDITIONS[filter] ?? {}) };

  if (url) return { userId: USER_ID, url: { equals: url } };

  if (editLinkId)
    return { userId: USER_ID, id: { equals: Number(editLinkId) } };

  return { userId: USER_ID };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const filter = searchParams.get("filter");
  const searchValue = searchParams.get("url");
  const editLinkId = searchParams.get("edit");
  const USER_ID = searchParams.get("userId");
  if (!USER_ID) {
    return NextResponse.json(
      { error: "인증되지 않은 사용자입니다." },
      { status: 401 }
    );
  }

  const where = buildWhereClause(
    USER_ID,
    filename,
    filter,
    searchValue,
    editLinkId
  );

  try {
    const links = await db.link.findMany({
      where,
      include: {
        linkTags: { include: { tag: true } },
        linkReads: true,
        folder: true,
      },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json({ error: "링크 조회 실패" }, { status: 500 });
  }
}
