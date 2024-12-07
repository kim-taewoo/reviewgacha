import { NextResponse, type NextRequest } from 'next/server'

import { getSupabaseReqResClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = getSupabaseReqResClient(request)
  const sessionData = await supabase.auth.getSession()

  const session = sessionData.data.session

  if (!session) {
    const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously()
    if (anonError || !anonData.session) {
      // TODO: error 페이지로 리다이렉션. 'Failed to sign in anonymously'
      return NextResponse.error()
    }
  }

  return response.value
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
