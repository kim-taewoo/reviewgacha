import { Database } from '@/lib/supabase/database.types'

export type Gacha = Database['public']['Tables']['gachas']['Row']
