import { Link, LinkTag } from "@/entites/link/types";

export interface LinkResponse extends Link {
  linkTags: LinkTag[];
}
