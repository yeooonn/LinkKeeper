import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Typography from "../atoms/Typography";

export const Header = () => {
  return (
    <div className="w-full h-19 border-b border-gray-200 px-8 fixed dark:bg-gray-800 dark:border-b-gray-600 bg-white">
      <div className="w-full h-full flex justify-between">
        <div className="flex h-full gap-2 items-center">
          <i className="bi bi-link text-5xl text-blue-500" />
          <Typography.H1 className="font-bold">LinkKeeper</Typography.H1>
          <Input placeholder="링크 검색" icon="search" />
        </div>
        <div className="flex h-full items-center gap-3">
          <Button.Blue>
            <i className="bi bi-plus text-xl p-o m-0" />
            <Typography.P1 className="text-white">링크 추가</Typography.P1>
          </Button.Blue>
          <Button.Gray>
            <i className="bi bi-moon dark:bi-brightness-high text-xl dark:text-yellow-500" />
          </Button.Gray>
        </div>
      </div>
    </div>
  );
};
