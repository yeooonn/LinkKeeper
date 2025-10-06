import fetchLinks from "@/features/landing/api/fetchLinks.service";
import { FILTER_LIST } from "@/shared/constants/fiterList";
import Landing from "@/widgets/Landing";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const isFilter = FILTER_LIST.find(
    (item) => encodeURIComponent(item.text) === slug
  );

  const query = isFilter ? `?filter=${slug}` : `?filename=${slug}`;

  const landingData = await fetchLinks(10, query);

  return <Landing LandingData={landingData} />;
};

export default page;
