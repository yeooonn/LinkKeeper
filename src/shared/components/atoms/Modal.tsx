import cn from "@/shared/utils/cn";
import { HTMLAttributes, useEffect } from "react";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({ className, children, onClose, ...props }: ModalProps) => {
  useEffect(() => {
    // 모달 열릴 때 스크롤 막기
    document.body.style.overflow = "hidden";
    return () => {
      // 모달 닫힐 때 원상복구
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="modal fixed inset-0 flex items-center justify-center bg-black/30 z-999"
      onClick={onClose}
    >
      <div
        className={cn(
          "min-w-[400px] max-w-[700px] rounded-2xl bg-white px-7 py-5",
          className
        )}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Header = ({ children, onClose }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      {children}
      <i className="bi bi-x-lg justify-end flex" onClick={onClose} />
    </div>
  );
};

const Content = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div>{children}</div>;
};

const Footer = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div>{children}</div>;
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
