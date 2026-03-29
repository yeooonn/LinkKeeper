import type { LinkResponse } from "@linkkeeper/shared";

/**
 * 웹 `apps/web/src/app/links/[slug]/page.tsx` 와 동일한 쿼리 규칙
 */
export function buildLinksEndpoint(options: {
  userId: string;
  /** FILTER_LIST 항목의 text (전체·읽지 않음·…) */
  filterText: string;
  /** `folderName_folderId` (폴더 선택 시) */
  folderSlug: string | null;
  /** URL 검색어 (https? 로 시작) */
  urlSearch: string | null;
}): string {
  const { userId, filterText, folderSlug, urlSearch } = options;

  if (urlSearch && /^https?:\/\//i.test(urlSearch.trim())) {
    const u = urlSearch.trim();
    return `api/links?url=${encodeURIComponent(u)}&userId=${userId}`;
  }

  if (folderSlug) {
    /** 서버 `filename` 쿼리는 링크 `title` 조건이라 폴더와 맞지 않음. 전체 링크를 받아 클라이언트에서 folderId로 필터 */
    return `api/links?filter=${encodeURIComponent("전체")}&userId=${userId}`;
  }

  return `api/links?filter=${encodeURIComponent(filterText)}&userId=${userId}`;
}

/** `폴더이름_folderId` — 이름에 `_`가 있어도 id는 마지막 세그먼트(웹과 동일) */
export function folderIdFromSlug(folderSlug: string): string | null {
  const parts = folderSlug.split("_");
  if (parts.length < 2) return null;
  return parts[parts.length - 1] ?? null;
}

export function filterLinksByFolderSlug(
  links: LinkResponse[],
  folderSlug: string | null,
): LinkResponse[] {
  if (!folderSlug) return links;
  const folderId = folderIdFromSlug(folderSlug);
  if (!folderId) return links;
  return links.filter((l) => String(l.folder.id) === folderId);
}
