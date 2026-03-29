/**
 * `parseLinkSlug` / 웹 `/links/[slug]`와 동일한 slug 규칙으로 Expo Router 경로를 만듭니다.
 */
export type BuildLinksPathnameInput = {
  menuFilterText: string;
  folderSlug: string | null;
  appliedUrlSearch: string | null;
};

export function buildLinksPathname(
  input: BuildLinksPathnameInput,
): `/links/${string}` {
  const { menuFilterText, folderSlug, appliedUrlSearch } = input;

  if (appliedUrlSearch && /^https?:\/\//i.test(appliedUrlSearch.trim())) {
    return `/links/${encodeURIComponent(appliedUrlSearch.trim())}`;
  }

  if (folderSlug) {
    return `/links/${encodeURIComponent(folderSlug)}`;
  }

  return `/links/${encodeURIComponent(menuFilterText)}`;
}
