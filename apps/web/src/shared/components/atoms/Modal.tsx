import cn from "@/shared/utils/cn";
import { stopEvent } from "@/shared/utils/stopEvent";
import { HTMLAttributes, useEffect } from "react";
import { createPortal } from "react-dom";

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

  return createPortal(
    <div
      className="modal fixed inset-0 flex items-center justify-center bg-overlay-black transition-all"
      onClick={(e) => {
        stopEvent(e);
        if (onClose) {
          onClose();
        }
      }}
    >
      <div
        className={cn(
          "desktop:min-w-[700px] tablet:min-w-[600px] mobile:min-w-[80%] mobile:max-h-[70%] overflow-y-scroll rounded-2xl bg-background-trtiary border border-border-secondary px-7 py-5 transition-all tablet:max-h-[100%]",
          className
        )}
        style={{ scrollbarWidth: "none" }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
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
      <i
        className="bi bi-x-lg justify-end flex"
        onClick={(e) => {
          stopEvent(e);
          onClose();
        }}
      />
    </div>
  );
};

const Content = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div>{children}</div>;
};

const Footer = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className="flex gap-2 justify-end pt-6">{children}</div>;
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
