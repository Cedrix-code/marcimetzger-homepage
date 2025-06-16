import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for comprehensive 404 handling and routing management
 *
 * This middleware handles:
 * - Trailing slash normalization
 * - API route 404 handling
 * - Static asset 404 handling
 * - Logging for 404 tracking
 * - Security headers
 */

// Define paths that should be excluded from middleware processing
const EXCLUDED_PATHS = [
  '/_next',
  '/api',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/images',
  '/fonts',
  '/icons',
]

/**
 * Check if the path should be excluded from middleware processing
 */
function isExcludedPath(pathname: string): boolean {
  return EXCLUDED_PATHS.some(path => pathname.startsWith(path))
}

/**
 * Normalize trailing slashes
 */
function normalizeTrailingSlash(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl
  
  // Don't redirect root path
  if (pathname === '/') {
    return null
  }
  
  // Remove trailing slash from non-root paths
  if (pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 301)
  }
  
  return null
}

/**
 * Add security headers to all responses
 */
function addSecurityHeaders(response: NextResponse): NextResponse {
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return response
}

/**
 * Main middleware function
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for excluded paths
  if (isExcludedPath(pathname)) {
    return NextResponse.next()
  }
  
  // Handle trailing slash normalization
  const trailingSlashResponse = normalizeTrailingSlash(request)
  if (trailingSlashResponse) {
    return addSecurityHeaders(trailingSlashResponse)
  }
  
  // Handle API routes
  if (pathname.startsWith('/api/')) {
    // Let Next.js handle valid API routes, but we'll catch 404s in the API handler
    return NextResponse.next()
  }
  
  // Handle static assets (images, fonts, etc.)
  if (pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot|css|js|map)$/)) {
    // Let Next.js handle static assets, it will return 404 if not found
    return NextResponse.next()
  }
  
  // For page routes, let Next.js handle routing
  // The not-found.tsx component will be triggered automatically for invalid routes
  const response = NextResponse.next()
  return addSecurityHeaders(response)
}

/**
 * Configure which paths the middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
