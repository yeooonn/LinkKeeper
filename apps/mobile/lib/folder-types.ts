/** 웹 `api/folders` 응답 요약 타입 */
export type FolderApiItem = {
  id: string;
  name: string;
  parentId: string;
  links: { id: number; title: string; folderId: string }[];
};
