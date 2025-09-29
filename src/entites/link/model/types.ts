export interface LinkTag {
  linkId: number;
  tag: { id: number; name: string };
  tagId: number;
  userId: string;
}

export interface Link {
  id: number;
  title: string;
  link: string;
  filename: string;
  time: string;
  alert: boolean;
  bookmark: boolean;
  hasRead: boolean;
  userId: string;
}

