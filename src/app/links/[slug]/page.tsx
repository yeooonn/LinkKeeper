import fetchLinks from "@/entites/link/api/fetchLinks.service";
import { FILTER_LIST } from "@/entites/menu/model/fiterList";
import { createClient } from "@/shared/utils/supabase/server";
import GuestHome from "@/widgets/GuestHome";
import Landing from "@/widgets/Landing";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const supabase = await createClient(); // 서버 클라이언트 생성 (쿠키 자동 로드)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { slug } = await params;
  // 1. slug가 필터인지 확인
  const isFilter = FILTER_LIST.find(
    (item) => encodeURIComponent(item.text) === slug
  );

  // 2. slug가 URL 형식인지 확인 (링크 검색용)
  const isURL = /^https?:\/\//.test(decodeURIComponent(slug));

  let query = "";

  if (isFilter) {
    query = `?filter=${slug}&userId=${user?.id}`;
  } else if (isURL) {
    query = `?url=${encodeURIComponent(decodeURIComponent(slug))}&userId=${
      user?.id
    }`;
  } else {
    query = `?filename=${slug}&userId=${user?.id}`;
  }

  if (!user) return <GuestHome />;

  const landingData = await fetchLinks(10, query);
  return <Landing LandingData={landingData} userId={user.id} />;
};

export default page;
