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

export interface folder {
  id: string;
  name: string;
  parentId: string;
}

export interface Link {
  id: number;
  title: string;
  url: string;
  memo: string;
  folder: folder;
  createdAt: string;
  alertType: string;
  customAlertDate?: string;
  isBookmark: boolean;
  userId: string;
  linkReads: LinkReads[];
  date: string;
  time: string;
}

export interface LinkResponse extends Link {
  linkTags: LinkTag[];
  error?: string;
}
