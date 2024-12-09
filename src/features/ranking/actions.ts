'use server'

import { getSupabaseAdminClient } from '@/lib/supabase/adminClient'

export const getRanking = async () => {
  const supabaseAdmin = getSupabaseAdminClient()
  const { data, error } = await supabaseAdmin.rpc('count_unique_user_ids')

  return { data, error }
}
