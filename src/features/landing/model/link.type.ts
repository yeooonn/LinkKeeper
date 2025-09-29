import { Link, LinkTag } from "@/entites/link/model/types";

export interface LinkResponse extends Link {
  linkTags: LinkTag[];
}