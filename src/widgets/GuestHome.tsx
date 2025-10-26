import SignInButton from "@/features/sign-in/ui/SignInButton";
import Card from "@/shared/components/atoms/Card";
import Typography from "@/shared/components/atoms/Typography";
import cn from "@/shared/utils/cn";

const guideCardData = [
  {
    icon: "bi bi-folder",
    color: { iconColor: "text-blue-500", bgColor: "bg-blue-100" },
    title: "폴더 관리",
    content:
      "링크를 폴더별로 체계적으로 정리하고 중첩 폴더로 더 세밀하게 분류하세요.",
  },
  {
    icon: "bi bi-star",
    color: { iconColor: "text-orange-500", bgColor: "bg-orange-100" },
    title: "즐겨찾기",
    content: "나중에 다시 보고 싶은 링크를 즐겨찾기에 저장해 쉽게 찾아보세요.",
  },
  {
    icon: "bi bi-bell",
    color: { iconColor: "text-red-500", bgColor: "bg-red-100" },
    title: "알림 시스템",
    content:
      "읽지 않은 링크를 잊지 않도록 설정한 시간에 맞춤 알림을 받아보세요.",
  },
  {
    icon: "bi bi-tag",
    color: { iconColor: "text-green-500", bgColor: "bg-green-100" },
    title: "태그 & 검색",
    content:
      "태그로 링크를 분류하고 강력한 검색 기능으로 원하는 링크를 빠르게 찾아보세요.",
  },
];

interface guideProps {
  icon: string;
  color: { iconColor: string; bgColor: string };
  title: string;
  content: string;
}

const renderGuideCard = (guide: guideProps) => {
  return (
    <Card key={guide.title} className="w-[100%] !cursor-default">
      <Card.Content>
        <div className="flex gap-3 items-center mb-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              guide.color.bgColor
            )}
          >
            <i
              className={cn(
                guide.icon,
                guide.color.iconColor,
                "flex justify-center text-xl"
              )}
            />
          </div>
          <Typography.P2 className="foreground-secondary">
            {guide.title}
          </Typography.P2>
        </div>
        <Typography.P1 className="foreground-secondary">
          {guide.content}
        </Typography.P1>
      </Card.Content>
    </Card>
  );
};

const GuestHome = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-1 rounded-4xl">
      <Typography.H1 className="font-bold mobile:text-xl text-center foreground-secondary">
        LinkKeeper에 오신 것을 환영합니다!
      </Typography.H1>
      <Typography.P1 className="text-center foreground-secondary">
        나중에 읽을 링크들을 체계적으로 관리하고, 알림을 통해 놓치지 말고
        읽어보세요.
      </Typography.P1>

      <SignInButton
        className="w-30 mb-5 mt-3 flex justify-center !py-2 whitespace-nowrap"
        text="시작하기"
      />

      <div className="flex flex-col laptop:grid laptop:grid-cols-2 gap-4 laptop:w-[60%] tablet:w-[80%] mobile:w-full max-w-6xl justify-items-center">
        {guideCardData.map((guide) => renderGuideCard(guide))}
      </div>
    </div>
  );
};

export default GuestHome;
