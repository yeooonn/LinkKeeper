"use server";
import { revalidatePath } from 'next/cache'

export async function revalidateHome() {
  revalidatePath('/')
  revalidatePath(`/links/${encodeURIComponent("전체")}`)
}