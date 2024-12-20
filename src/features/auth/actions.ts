"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"

export const updateUsernameAction = async (
  previousState: unknown,
  formData: FormData
) => {
  const username = formData.get("username") as string
  if (!username.trim()) {
    return { error: "닉네임을 입력해주세요", data: null }
  }
  const supabase = await getSupabaseServerClient()

  const { error } = await supabase.auth.updateUser({
    data: { username },
  })

  if (error) {
    return { error: error.message, data: null }
  }

  await supabase.auth.refreshSession()

  return { data: { username }, error: null }
}
