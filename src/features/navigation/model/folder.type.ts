import { FolderInterface } from "@/entites/folder/types";
import { Link } from "@/entites/link/types";

export interface FolderResponse extends FolderInterface {
  links: Link[];
  parentId: string;
}
