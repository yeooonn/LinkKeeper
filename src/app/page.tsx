import fetchLinks from "@/entites/link/api/fetchLinks.service";
import GuestHome from "@/widgets/GuestHome";
import Landing from "@/widgets/Landing";

export default async function Home() {
  const landingData = await fetchLinks(10, "?filter=전체");
  const isLogedIn = false;
  if (isLogedIn) return <Landing LandingData={landingData} />;
  else return <GuestHome />;
}
