import fetchLinks from "@/entites/link/api/fetchLinks.service";
import { createClient } from "@/shared/utils/supabase/server";
import GuestHome from "@/widgets/GuestHome";
import Landing from "@/widgets/Landing";

export default async function Home() {
  const supabase = await createClient(); // 서버 클라이언트 생성 (쿠키 자동 로드)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <GuestHome />;

  const landingData = await fetchLinks(10, `?filter=전체&userId=${user.id}`);
  return <Landing LandingData={landingData} userId={user.id} />;
}
