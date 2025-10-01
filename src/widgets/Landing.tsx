import { LinkResponse } from "@/features/landing/model/link.type";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Icon from "@/shared/components/atoms/Icon";
import Input from "@/shared/components/atoms/Input";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";

const RenderCard = ({ data }: { data: LinkResponse }) => {
  return (
    <Card.ImageCard className="hover:border-blue-300">
      <Card.Header>
        <div className="flex gap-2 items-center">
          <Typography.P2 className="font-bold">{data.title}</Typography.P2>
          <Icon.BoxArrowUpRight />
        </div>

        <div className="flex tablet:gap-4 mobile:gap-2">
          <Icon.Bell isActive={data.isAlert} />
          <Icon.Star isActive={data.isBookmark} />
          <Icon.Eye isActive={data.isRead} />
        </div>
      </Card.Header>
      <Card.Content>
        <Typography.P1 className="mb-1 !text-foreground-secondary">
          {data.url}
        </Typography.P1>
      </Card.Content>
      <Card.Footer
        className="overflow-x-auto !justify-between"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-3">
          <Tag.Gray>{data.filename}</Tag.Gray>
          {data.linkTags.map((tag) => (
            <Tag.Blue key={tag.tag.id}>#{tag.tag.name}</Tag.Blue>
          ))}
        </div>
        <Typography.P3 className="text-nowrap">{data.createdAt}</Typography.P3>
      </Card.Footer>
    </Card.ImageCard>
  );
};

const Landing = ({ LandingData }: { LandingData: LinkResponse[] }) => {
  if (LandingData.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 rounded-4xl">
        <div className="w-16 h-16 flex justify-center items-center rounded-xl bg-blue-100">
          <i className="bi bi-link text-4xl text-blue-500" />
        </div>
        <Typography.H1 className="font-bold mobile:text-xl text-center">
          링크를 추가해 주세요.
        </Typography.H1>
        <Typography.P1 className="text-center">
          중요한 링크를 저장하고 체계적으로 관리하세요. <br />
          폴더와 태그로 쉽게 정리할 수 있습니다.
        </Typography.P1>
      </div>
    );
  }

  return (
    <div>
      <div className="tablet:flex justify-between items-center mb-5">
        <Typography.H1 className="font-bold mobile:mb-4 mb-0 mobile:text-xl">
          전체 링크
        </Typography.H1>
        <div className="flex tablet:items-center mobile:justify-between gap-3">
          <Input placeholder="링크 검색" icon="search" />
          <Button.Gray>
            <i className="bi bi-filter" />
          </Button.Gray>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {LandingData.map((list) => (
          <RenderCard key={list.url} data={list} />
        ))}
      </div>
    </div>
  );
};

export default Landing;
