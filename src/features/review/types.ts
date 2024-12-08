import { Database } from '@/lib/supabase/database.types'

export type Review = Database['public']['Tables']['reviews']['Row'] & {
  media: ReviewMedia
}
export type ReviewMedia = {
  imageUrls: string[] | null
}
