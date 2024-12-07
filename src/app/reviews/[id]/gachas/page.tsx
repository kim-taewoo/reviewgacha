import { getSupabaseServerClient } from '@/lib/supabase/server'

import { RealtimeGachas } from './RealtimeGachas'

export default async function ReviewGachaPage() {
  const supabase = await getSupabaseServerClient()
  const { data, error } = await supabase.from('gachas').select('*')

  if (error) {
    console.error(error)
    return <div>에러가 발생</div>
  }

  return (
    <div>
      가챠페이지

      <div>
        <RealtimeGachas initialState={data} />
      </div>
    </div>
  )
}
