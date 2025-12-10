"use server";
import { revalidateTag } from "next/cache";

export async function revalidateLink() {
  // @ts-expect-error nextjs type bug
  revalidateTag("link");
}
