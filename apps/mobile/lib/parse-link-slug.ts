import { FILTER_LIST } from "./filter-list";

export type ParsedSlugState = {
  menuFilterText: string;
  folderSlug: string | null;
  appliedUrlSearch: string | null;
};

/**
 * 웹 `apps/web/src/app/links/[slug]/page.tsx` 와 동일 규칙
 */
export function parseLinkSlug(encodedSlug: string): ParsedSlugState {
  let slug = encodedSlug;
  try {
    slug = decodeURIComponent(encodedSlug);
  } catch {
    /* keep raw */
  }

  const isFilter = FILTER_LIST.find((item) => item.text === slug);
  const isURL = /^https?:\/\//.test(slug);

  if (isFilter) {
    return {
      menuFilterText: isFilter.text,
      folderSlug: null,
      appliedUrlSearch: null,
    };
  }
  if (isURL) {
    return {
      menuFilterText: "전체",
      folderSlug: null,
      appliedUrlSearch: slug,
    };
  }
  return {
    menuFilterText: "전체",
    folderSlug: slug,
    appliedUrlSearch: null,
  };
}
