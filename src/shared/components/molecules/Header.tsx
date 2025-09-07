import Button from "@/shared/components/atoms/Button";
import Typography from "@/shared/components/atoms/Typography";

export const Header = () => {
  return (
    <div className="w-full desktop:h-19 laptop:h-15 h-15 border-b border-gray-300 px-4 fixed dark:bg-gray-800 dark:border-gray-600 bg-white z-999">
      <div className="w-full h-full flex justify-between">
        <div className="flex h-full gap-2 items-center">
          <i className="bi bi-link text-4xl text-blue-500" />
          <Typography.H1 className="font-bold tablet:mr-15 mobile:mr-10 mobile:text-xl">
            LinkKeeper
          </Typography.H1>
        </div>
        <div className="flex h-full items-center gap-3">
          <Button.Blue>
            <i className="bi bi-plus text-xl p-0 m-0 tablet:inline mobile:hidden" />
            <Typography.P1 className="text-white">링크 추가</Typography.P1>
          </Button.Blue>
          <Button.Gray>
            <i className="bi bi-moon dark:bi-brightness-high tablet:text-xl dark:text-yellow-500 mobile:text-sm" />
          </Button.Gray>
        </div>
      </div>
    </div>
  );
};
