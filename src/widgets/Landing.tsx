import SearchInfoText from "@/features/search-link/ui/SearchInfoText";
import SearchInput from "@/features/search-link/ui/SearchInput";
import ToggleBookmarkButton from "@/features/toggle-bookmark/ui/ToggleBookmarkButton";
import Button from "@/shared/components/atoms/Button";
import Card from "@/shared/components/atoms/Card";
import Icon from "@/shared/components/atoms/Icon";
import Tag from "@/shared/components/atoms/Tag";
import Typography from "@/shared/components/atoms/Typography";
import { formatTimeAgo } from "@/shared/utils/formatTimeAgo";
import LinkWrapper from "@/features/read-link/ui/LinkWrapper";
import DeleteLinkButton from "@/features/delete-link/ui/DeleteLinkButton";
import UpdateLinkButton from "@/features/update-link/ui/UpdateLinkButton";
import { LinkResponse } from "@/entites/link/model/types";

const RenderCard = ({ data }: { data: LinkResponse }) => {
  const isRead =
    data.linkReads.length > 0 &&
    data.linkReads.map((item) => item.userId === "yeooonn")
      ? true
      : false;

  return (
    <LinkWrapper url={data.url} linkId={data.id}>
      <Card.ImageCard
        className="hover:border-blue-300"
        imgColor="#3B82F6"
        imgBgColor="#EFF6FF"
      >
        <Card.Header>
          <div className="flex gap-2 items-center">
            <Tag.Gray>{data.foldername}</Tag.Gray>
            <Typography.P2 className="font-bold line-clamp-1">
              {data.title}
            </Typography.P2>
          </div>

          <div className="flex items-center tablet:gap-4 mobile:gap-2">
            <Icon.Bell isActive={data.isAlert} />
            <ToggleBookmarkButton isActive={data.isBookmark} linkId={data.id} />
            <Icon.Eye isActive={isRead} />

            <div className="h-6 w-px bg-gray-300"></div>

            <UpdateLinkButton linkId={data.id} />
            <DeleteLinkButton linkId={data.id} />
          </div>
        </Card.Header>
        <Card.Content className="pb-2" title={data.memo}>
          {data.memo ? (
            <Typography.P1 className="!text-foreground-secondary line-clamp-2">
              {data.memo}
            </Typography.P1>
          ) : (
            <Typography.P1 className="!text-foreground-trtiary line-clamp-2">
              등록된 메모가 없습니다.
            </Typography.P1>
          )}
        </Card.Content>
        <Card.Footer
          className="overflow-x-auto !justify-between"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-3">
            {data.linkTags.map((tag) => (
              <Typography.P3 key={tag.tag.id} className="text-blue-400">
                {tag.tag.name}
              </Typography.P3>
            ))}
          </div>
          <div className="flex gap-1 items-center">
            <Typography.P3 className="text-nowrap">
              {formatTimeAgo(data.createdAt)}
            </Typography.P3>
          </div>
        </Card.Footer>
      </Card.ImageCard>
    </LinkWrapper>
  );
};

const Landing = ({ LandingData }: { LandingData: LinkResponse[] }) => {
  console.log(LandingData);
  if (LandingData.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-4">
        <div className="tablet:flex justify-between items-center mb-1">
          <Typography.H1 className="font-bold mobile:mb-4 mb-0 mobile:text-xl">
            전체 링크
          </Typography.H1>
          <div className="flex tablet:items-center mobile:justify-between gap-3">
            <SearchInput />
            <Button.Gray>
              <i className="bi bi-filter" />
            </Button.Gray>
          </div>
        </div>
        <SearchInfoText />
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
          <SearchInput />
          <Button.Gray>
            <i className="bi bi-filter" />
          </Button.Gray>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <SearchInfoText />
        {LandingData.map((list) => (
          <RenderCard key={list.id} data={list} />
        ))}
      </div>
    </div>
  );
};

export default Landing;
