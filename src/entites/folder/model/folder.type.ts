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
  alertType: string;
  customAlertDate?: string
  isBookmark: boolean;
  userId: string;
  linkReads: LinkReads[];
}

export interface FolderInterface {
  id: string;
  name: string;
  children?: { id: string; name: string; children?: FolderInterface[] }[];
}

export interface FolderResponse extends FolderInterface {
  links: Link[];
  parentId: string;
}
