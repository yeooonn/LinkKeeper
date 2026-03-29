import { useLocalSearchParams } from "expo-router";
import HomeScreen from "../../screens/HomeScreen";

/**
 * 웹 `/links/[slug]` 와 동일한 딥링크용 라우트.
 * 예: `/links/전체`, `/links/https%3A%2F%2Fexample.com`, `/links/폴더명_folderId`
 */
export default function LinksSlugScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const raw = Array.isArray(slug) ? slug[0] : slug;
  return <HomeScreen initialSlug={raw} />;
}
