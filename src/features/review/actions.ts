'servier-only'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import { encodedRedirect } from '@/utils'

export const writeReviewAction = async (
  previousState: unknown,
  formData: FormData
) => {
  const content = formData.get('content') as string
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase.auth.getSession()
  if (error) {
    return encodedRedirect('error', '/', error.message)
  }
  const session = data?.session
  const user = session?.user!
  const email = user.email!

  await supabase.from('reviews').insert({
    writer_email: email,
    profile_id: user.id,
    content,
  })
}
