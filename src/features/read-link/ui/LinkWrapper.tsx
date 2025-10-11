"use client";

import useReadLink from "../model/useReadLink";

interface LinkWrapperProps {
  children: React.ReactNode;
  url: string;
  linkId: number;
}

const LinkWrapper = ({ children, url, linkId }: LinkWrapperProps) => {
  const { handleReadLink } = useReadLink(linkId);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleReadLink}
      title={url}
    >
      {children}
    </a>
  );
};

export default LinkWrapper;
