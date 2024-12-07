import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function ReviewMainPage() {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase.auth.getSession()
  console.log(data, error, 'session')

  return (
    <div>
      Test
    </div>
  )
}
