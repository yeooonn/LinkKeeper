import { LandingDummyData } from "@/shared/mock/LandingDummyData";
import Landing from "@/widgets/Landing";
// import "@/shared/lib/db";

export default function Home() {
  const LandingData = LandingDummyData;
  return <Landing LandingData={LandingData} />;
}
