'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateGachaPage(pathname: string) {
  revalidatePath(pathname)
}
