import type { CSSProperties, ReactNode } from "react";

interface IconProps {
  childeren: ReactNode;
  className?: string;
}

const Icon = ({ childeren, className }: IconProps) => {
  return <div className={className}>{childeren}</div>;
};

const bellStrokeIconStyle = (stroke: string): CSSProperties => ({
  color: "transparent",
  WebkitTextStroke: `0.75px ${stroke}`,
});

const Bell = ({ isActive }: { isActive: boolean }) => {
  if (isActive) {
    return (
      <i
        className="bi bi-bell"
        style={bellStrokeIconStyle("rgb(234 88 12)")}
        aria-hidden
      />
    );
  }
  return <i className="bi bi-bell-slash text-[#737373]" aria-hidden />;
};

const Bookmark = ({ isActive }: { isActive: boolean }) => {
  if (isActive) return <i className="bi bi-bookmark-fill text-yellow-500"></i>;
  return <i className="bi bi-bookmark text-gray-500"></i>;
};

const Eye = ({ isActive }: { isActive: boolean }) => {
  if (isActive) return <i className="bi bi-eye text-green-600"></i>;
  return <i className="bi bi-eye-slash text-gray-500"></i>;
};

const BoxArrowUpRight = () => {
  return (
    <i className="bi bi-box-arrow-up-right text-gray-500 tablet:inline mobile:hidden"></i>
  );
};

const Copy = () => {
  return <i className="bi bi-copy text-gray-500"></i>;
};

Icon.Bell = Bell;
Icon.Bookmark = Bookmark;
Icon.Eye = Eye;
Icon.BoxArrowUpRight = BoxArrowUpRight;
Icon.Copy = Copy;

export default Icon;
