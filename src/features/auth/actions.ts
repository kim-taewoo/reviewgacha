'use server'

import { getSupabaseServerClient } from '@/lib/supabase/server'

export const updateUsernameAction = async (
  previousState: unknown,
  formData: FormData
) => {
  const username = formData.get('username') as string
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
