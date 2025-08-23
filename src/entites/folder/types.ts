// 폴더 타입
export interface FolderInterface {
  id: string;
  name: string;
  children?: { id: string; name: string; children?:FolderInterface[] }[];
}