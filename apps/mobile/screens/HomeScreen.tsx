import { fetchAPI } from "@linkkeeper/shared";
import type { LinkResponse } from "@linkkeeper/shared";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmptyLinksState } from "../components/home/EmptyLinksState";
import { FolderPickerSheet } from "../components/home/FolderPickerSheet";
import { LinkCard } from "../components/home/LinkCard";
import { LinkSearchBar } from "../components/home/LinkSearchBar";
import { MobileHeader } from "../components/home/MobileHeader";
import { MyPageSheet } from "../components/home/MyPageSheet";
import { MobileTabBar } from "../components/home/MobileTabBar";
import { SearchInfoRow } from "../components/home/SearchInfoRow";
import { LinkModal } from "../components/link-modal/LinkModal";
import { fetchAPIWithAuth } from "../lib/authed-api";
import type { FolderApiItem } from "../lib/folder-types";
import { buildLinksPathname } from "../lib/links-href";
import {
  buildLinksEndpoint,
  filterLinksByFolderSlug,
  folderIdFromSlug,
} from "../lib/link-query";
import { parseLinkSlug } from "../lib/parse-link-slug";
import { parseUrlSearchQueryParam } from "../lib/url-search-query";
import { useAuthStore } from "../lib/auth-store";

function apiBaseUrl(): string {
  return (process.env.EXPO_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");
}

function normalizeRouteParam(
  p: string | string[] | undefined,
): string | undefined {
  if (p === undefined) return undefined;
  const v = Array.isArray(p) ? p[0] : p;
  return typeof v === "string" ? v : undefined;
}

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const signOut = useAuthStore((s) => s.signOut);
  const queryClient = useQueryClient();
  const base = apiBaseUrl();

  const params = useLocalSearchParams<{
    slug?: string | string[];
    url?: string | string[];
  }>();
  const rawSlug = normalizeRouteParam(params.slug);
  const rawUrlQuery = normalizeRouteParam(params.url);

  const [folderSheetOpen, setFolderSheetOpen] = useState(false);
  const [myPageOpen, setMyPageOpen] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");

  const [linkModal, setLinkModal] = useState<
    { mode: "create" } | { mode: "edit"; link: LinkResponse } | null
  >(null);

  const effectiveSlug = rawSlug ?? "전체";
  const parsed = useMemo(() => parseLinkSlug(effectiveSlug), [effectiveSlug]);

  const appliedUrlSearch = useMemo(() => {
    const fromQuery = parseUrlSearchQueryParam(rawUrlQuery);
    if (fromQuery) return fromQuery;
    return parsed.appliedUrlSearch;
  }, [rawUrlQuery, parsed.appliedUrlSearch]);

  const menuFilterText = useMemo(() => {
    if (appliedUrlSearch) return "전체";
    return parsed.menuFilterText;
  }, [appliedUrlSearch, parsed.menuFilterText]);

  const folderSlug = useMemo(() => {
    if (appliedUrlSearch) return null;
    return parsed.folderSlug;
  }, [appliedUrlSearch, parsed.folderSlug]);

  useLayoutEffect(() => {
    setUrlDraft(appliedUrlSearch ?? "");
  }, [appliedUrlSearch]);

  const listQueryKey = useMemo(
    () =>
      [
        "links",
        user?.id,
        menuFilterText,
        folderSlug,
        appliedUrlSearch,
      ] as const,
    [user?.id, menuFilterText, folderSlug, appliedUrlSearch],
  );

  const { data: folders, isLoading: foldersLoading } = useQuery({
    queryKey: ["folders", user?.id],
    queryFn: async () => {
      if (!user?.id || !base) return [];
      const res = await fetchAPI<FolderApiItem[]>(
        `api/folders?userId=${user.id}`,
        {
          method: "GET",
          baseUrl: base,
          credentials: "omit",
        },
      );
      return res ?? [];
    },
    enabled: Boolean(user?.id && base),
  });

  const { data: rawLinks, isLoading: linksLoading } = useQuery({
    queryKey: listQueryKey,
    queryFn: async () => {
      if (!user?.id || !base) return [];
      const path = buildLinksEndpoint({
        userId: user.id,
        filterText: menuFilterText,
        folderSlug,
        urlSearch: appliedUrlSearch,
      });
      const res = await fetchAPI<LinkResponse[]>(path, {
        method: "GET",
        baseUrl: base,
        credentials: "omit",
      });
      return res ?? [];
    },
    enabled: Boolean(user?.id && base),
  });

  const links = useMemo(
    () => filterLinksByFolderSlug(rawLinks ?? [], folderSlug),
    [rawLinks, folderSlug],
  );

  const toggleBookmarkMut = useMutation({
    mutationFn: async (vars: { id: number }) => {
      if (!base) throw new Error("API base 없음");
      await fetchAPI(`api/links/${vars.id}/bookmark`, {
        method: "PATCH",
        baseUrl: base,
        credentials: "omit",
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (id: number) => {
      if (!base) throw new Error("API base 없음");
      const res = await fetchAPIWithAuth<{ message?: string; error?: string }>(
        `api/links/${id}/delete`,
        { method: "DELETE" },
      );
      if (res && "error" in res && res.error) throw new Error(res.error);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["links"] });
      void queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const onToggleBookmark = useCallback(
    async (_linkId: number, _next: boolean) => {
      try {
        await toggleBookmarkMut.mutateAsync({ id: _linkId });
      } catch {
        /* fetchAPI 이미 로깅 */
      }
    },
    [toggleBookmarkMut],
  );

  const onDelete = useCallback(
    async (id: number) => {
      try {
        await deleteMut.mutateAsync(id);
      } catch {
        /* handled */
      }
    },
    [deleteMut],
  );

  const screenTitle = useMemo(() => {
    if (appliedUrlSearch) return "URL 검색";
    if (folderSlug && folderIdFromSlug(folderSlug)) {
      const parts = folderSlug.split("_");
      const name =
        parts.length >= 2 ? parts.slice(0, -1).join("_") : (parts[0] ?? "");
      return name ? `${name} · 폴더` : "폴더";
    }
    return `${menuFilterText} 링크`;
  }, [appliedUrlSearch, folderSlug, menuFilterText]);

  function selectFilter(text: string) {
    router.replace(
      buildLinksPathname({
        menuFilterText: text,
        folderSlug: null,
        appliedUrlSearch: null,
      }),
    );
  }

  function openCategory() {
    setFolderSheetOpen(true);
  }

  function onPickFolder(slug: string) {
    router.replace(
      buildLinksPathname({
        menuFilterText: "전체",
        folderSlug: slug,
        appliedUrlSearch: null,
      }),
    );
  }

  function applyUrlSearch() {
    const t = urlDraft.trim();
    if (!t) return;
    if (!/^https?:\/\//i.test(t)) {
      router.replace(
        buildLinksPathname({
          menuFilterText,
          folderSlug,
          appliedUrlSearch: null,
        }),
      );
      return;
    }
    router.replace(
      buildLinksPathname({
        menuFilterText: "전체",
        folderSlug: null,
        appliedUrlSearch: t,
      }),
    );
  }

  function clearUrlSearch() {
    router.replace(
      buildLinksPathname({
        menuFilterText: "전체",
        folderSlug: null,
        appliedUrlSearch: null,
      }),
    );
  }

  const categoryHighlighted = folderSheetOpen || folderSlug !== null;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background-secondary">
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/guest" />;
  }

  return (
    <SafeAreaView
      edges={["left", "right"]}
      className="flex-1 bg-background-primary"
    >
      <View className="flex-1">
        <MobileHeader
          title={screenTitle}
          onOpenMyPage={() => setMyPageOpen(true)}
          onAddLink={base ? () => setLinkModal({ mode: "create" }) : undefined}
        />

        {!base ? (
          <Text className="mt-4 px-4 text-center text-sm text-red-600">
            EXPO_PUBLIC_API_BASE_URL이 없어 링크를 불러올 수 없습니다.
          </Text>
        ) : (
          <View className="my-3">
            <LinkSearchBar
              value={urlDraft}
              onChangeText={setUrlDraft}
              onSubmitSearch={applyUrlSearch}
            />
            <SearchInfoRow
              searchValue={appliedUrlSearch}
              onClear={clearUrlSearch}
            />
          </View>
        )}

        {base ? (
          linksLoading ? (
            <ActivityIndicator className="mt-8" />
          ) : !links.length ? (
            <EmptyLinksState />
          ) : (
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
              data={links}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <LinkCard
                  item={item}
                  userId={user.id}
                  onToggleBookmark={onToggleBookmark}
                  onDelete={onDelete}
                  onEdit={(link) => setLinkModal({ mode: "edit", link })}
                />
              )}
              keyboardShouldPersistTaps="handled"
            />
          )
        ) : null}
      </View>

      <MobileTabBar
        categoryOpen={categoryHighlighted}
        onOpenCategory={openCategory}
        activeFilterText={menuFilterText}
        onSelectFilter={selectFilter}
      />

      <FolderPickerSheet
        visible={folderSheetOpen}
        onClose={() => setFolderSheetOpen(false)}
        folders={folders}
        loading={foldersLoading}
        onPickFolder={onPickFolder}
      />

      <LinkModal
        visible={linkModal !== null}
        onClose={() => setLinkModal(null)}
        mode={linkModal?.mode ?? "create"}
        initLink={linkModal?.mode === "edit" ? linkModal.link : undefined}
        userId={user.id}
        folders={folders}
        foldersLoading={foldersLoading}
      />

      <MyPageSheet
        visible={myPageOpen}
        onClose={() => setMyPageOpen(false)}
        onSignOut={signOut}
      />
    </SafeAreaView>
  );
}
