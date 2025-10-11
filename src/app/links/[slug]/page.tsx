// app/links/[slug]
import fetchLinks from "@/features/landing/api/fetchLinks.service";
import { FILTER_LIST } from "@/shared/constants/fiterList";
import Landing from "@/widgets/Landing";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  // 1. slug가 필터인지 확인
  const isFilter = FILTER_LIST.find(
    (item) => encodeURIComponent(item.text) === slug
  );

  // 2. slug가 URL 형식인지 확인 (링크 검색용)
  const isURL = /^https?:\/\//.test(decodeURIComponent(slug));

  let query = "";

  if (isFilter) {
    query = `?filter=${slug}`;
  } else if (isURL) {
    query = `?url=${encodeURIComponent(decodeURIComponent(slug))}`;
  } else {
    query = `?filename=${slug}`;
  }

  const landingData = await fetchLinks(10, query);

  return <Landing LandingData={landingData} />;
};

export default page;
