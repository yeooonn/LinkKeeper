export interface LinkTag {
  linkId: number;
  tag: { id: number; name: string };
  tagId: number;
  userId: string;
}

export interface Link {
  id: number;
  title: string;
  url: string;
  memo: string;
  filename: string;
  createdAt: string;
  isAlert: boolean;
  isBookmark: boolean;
  isRead: boolean;
  userId: string;
}
