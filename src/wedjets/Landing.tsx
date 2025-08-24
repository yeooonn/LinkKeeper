import Card from "@/shared/components/atoms/Card";
import Icon from "@/shared/components/atoms/Icon";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import { LandingArticle } from "@/shared/mock/LandingDummyData";

const RenderCard = ({ data }: { data: LandingArticle }) => {
  return (
    <Card.ImageCard>
      <Card.Header>
        <div className="flex gap-2">
          <Icon.BoxArrowUpRight />
          <Typography.P2 className="font-bold">{data.title}</Typography.P2>
        </div>

        <div className="flex gap-4">
          <Icon.Bell isActive={data.alert} />
          <Icon.Star isActive={data.bookmark} />
          <Icon.Eye isActive={data.hasRead} />
        </div>
      </Card.Header>
      <Card.Content className="text-gray-700 dark:text-gray-300">
        {data.link}
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
      <Typography.H1 className="font-bold mb-6">최근 링크</Typography.H1>
      <div className="flex flex-col gap-2">
        {LandingData.map((list) => (
          <RenderCard key={list.link} data={list} />
        ))}
      </div>
    </div>
  );
};

export default Landing;
