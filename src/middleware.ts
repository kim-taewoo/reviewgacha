import { NextResponse, type NextRequest } from 'next/server'

import { getSupabaseReqResClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = getSupabaseReqResClient(request)
  const session = await supabase.auth.getSession()

  const requestedPath = request.nextUrl.pathname
  const sessionUser = session.data?.session?.user

  if (requestedPath === '/login' && sessionUser) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  else if (requestedPath === '/logout' && !sessionUser) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
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
