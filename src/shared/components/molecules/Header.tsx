import Button from "../atoms/Button";
import Typography from "../atoms/Typography";

export const Header = () => {
  return (
    <div className="w-full h-19 border-b border-gray-400 px-4 fixed">
      <div className="w-full h-full flex justify-between">
        <div className="flex h-full gap-2 items-center">
          <i className="bi bi-link text-5xl text-blue-500" />
          <Typography.H1 className="font-bold">LinkKeeper</Typography.H1>
        </div>
        <div className="flex h-full items-center gap-3">
          <Button.Blue>
            <i className="bi bi-plus text-2xl" />
            <Typography.P1 className="text-white">링크 추가</Typography.P1>
          </Button.Blue>
          <Button.Gray>
            <i className="bi bi-moon text-2xl" />
          </Button.Gray>
        </div>
      </div>
    </div>
  );
};
