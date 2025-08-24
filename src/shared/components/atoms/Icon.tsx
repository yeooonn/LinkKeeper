import { ReactNode } from "react";

interface IconProps {
  childeren: ReactNode;
  className?: string;
}

const Icon = ({ childeren, className }: IconProps) => {
  return <div className={className}>{childeren}</div>;
};

const Bell = ({ isActive }: { isActive: boolean }) => {
  if (isActive) return <i className="bi bi-bell text-orange-600"></i>;
  return <i className="bi bi-bell-slash text-gray-500"></i>;
};

const Star = ({ isActive }: { isActive: boolean }) => {
  if (isActive) return <i className="bi bi-star-fill text-yellow-500"></i>;
  return <i className="bi bi-star text-gray-500"></i>;
};

const Eye = ({ isActive }: { isActive: boolean }) => {
  if (isActive) return <i className="bi bi-eye text-green-600"></i>;
  return <i className="bi bi-eye-slash text-gray-500"></i>;
};

const BoxArrowUpRight = () => {
  return <i className="bi bi-box-arrow-up-right text-gray-500"></i>;
};

const Copy = () => {
  return <i className="bi bi-copy text-gray-500"></i>;
};

Icon.Bell = Bell;
Icon.Star = Star;
Icon.Eye = Eye;
Icon.BoxArrowUpRight = BoxArrowUpRight;
Icon.Copy = Copy;

export default Icon;
