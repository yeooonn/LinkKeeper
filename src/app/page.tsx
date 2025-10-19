import fetchLinks from "@/entites/link/api/fetchLinks.service";
import Landing from "@/widgets/Landing";

export default async function Home() {
  const landingData = await fetchLinks(10, "?filter=전체");

  return <Landing LandingData={landingData} />;
}
