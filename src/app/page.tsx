import { LandingDummyData } from "@/shared/mock/LandingDummyData";
import Landing from "@/widgets/Landing";

export default function Home() {
  const LandingData = LandingDummyData;
  return (
    <div className="font-sans grid grid-rows-[10px_1fr_10px] min-h-screen sm:py-25 sm:px-9 bg-[#F9FAFB] dark:bg-[#121826]">
      <main className="flex flex-col row-start-2">
        <Landing LandingData={LandingData} />
      </main>
    </div>
  );
}
