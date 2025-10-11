"use server";
import { revalidateTag } from 'next/cache'

export async function revalidateLink() {
  revalidateTag("link")
}