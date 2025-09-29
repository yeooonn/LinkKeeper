import fetchLinks from "@/features/landing/api/fetchLinks.service";
import Landing from "@/widgets/Landing";

export default async function Home() {
  const landingData = await fetchLinks();

  return <Landing LandingData={landingData} />;
}
