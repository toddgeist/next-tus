import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'



export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|favicon.ico).*)',
  ],
}


export async function middleware(request: NextRequest) {


  const { nextUrl, url } = request
  console.log('nextUrl', url)


  const response = NextResponse.next()


  return response
}
