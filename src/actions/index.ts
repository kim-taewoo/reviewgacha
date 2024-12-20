"use server"

import { revalidatePath } from "next/cache"

export async function revalidatePage(pathname: string) {
  revalidatePath(pathname)
}
