import { NextResponse, type NextRequest } from "next/server"

import { getSupabaseReqResClient } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabase, response } = getSupabaseReqResClient(request)
  const { data } = await supabase.auth.getSession()

  const session = data.session
  if (!session) {
    const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously()
    if (anonError || !anonData.session) {
      // TODO: error 페이지로 리다이렉션. 'Failed to sign in anonymously'
      return NextResponse.error()
    }
  }

  const requestedPath = request.nextUrl.pathname
  if (session && !session.user.user_metadata?.username && requestedPath !== "/register") {
    return NextResponse.redirect(new URL(`/register?redirect_uri=${requestedPath}${request.nextUrl.search}`, request.url))
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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
