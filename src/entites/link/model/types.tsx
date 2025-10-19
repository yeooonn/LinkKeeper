export interface LinkTag {
  linkId: number;
  tag: { id: number; name: string };
  tagId: number;
  userId: string;
}

export interface LinkReads {
  id: number;
  linkId: number;
  readAt: string;
  userId: string;
}

export interface Link {
  id: number;
  title: string;
  url: string;
  memo: string;
  foldername: string;
  createdAt: string;
  isAlert: boolean;
  isBookmark: boolean;
  userId: string;
  linkReads: LinkReads[];
}

export interface LinkResponse extends Link {
  linkTags: LinkTag[];
}
