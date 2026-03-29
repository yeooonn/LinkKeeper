"use server";
import { revalidatePath, refresh } from "next/cache";

export async function revalidateLink() {
  revalidatePath("/", "layout");
  refresh();
}
