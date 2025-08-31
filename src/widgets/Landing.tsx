import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Icon from "@/shared/components/atoms/Icon";
import Input from "@/shared/components/atoms/Input";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import { LandingArticle } from "@/shared/mock/LandingDummyData";

const RenderCard = ({ data }: { data: LandingArticle }) => {
  return (
    <Card.ImageCard>
      <Card.Header>
        <div className="flex gap-2 items-center">
          <Typography.P2 className="font-bold">{data.title}</Typography.P2>
          <Icon.BoxArrowUpRight />
        </div>

        <div className="flex gap-4">
          <Icon.Bell isActive={data.alert} />
          <Icon.Star isActive={data.bookmark} />
          <Icon.Eye isActive={data.hasRead} />
        </div>
      </Card.Header>
      <Card.Content className="text-gray-700 dark:text-gray-300">
        <Typography.P1 className="mb-1">{data.link}</Typography.P1>
      </Card.Content>
      <Card.Footer>
        <Tag.Gray>{data.filename}</Tag.Gray>
        <Typography.P3>{data.time}</Typography.P3>
        {data.tag.map((tag) => (
          <Tag.Blue key={tag}>#{tag}</Tag.Blue>
        ))}
      </Card.Footer>
    </Card.ImageCard>
  );
};

const Landing = ({ LandingData }: { LandingData: LandingArticle[] }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <Typography.H1 className="font-bold">전체 링크</Typography.H1>
        <div className="flex items-center gap-3">
          <Input placeholder="링크 검색" icon="search" />
          <Button.Gray className="py-0.5 px-2">
            <i className="bi bi-filter text-[20px]" />
          </Button.Gray>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {LandingData.map((list) => (
          <RenderCard key={list.link} data={list} />
        ))}
      </div>
    </div>
  );
};

export default Landing;
