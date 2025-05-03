import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Static exports don't use middleware, but we'll keep this for non-static deployments
  
  // Get the existing response
  const response = NextResponse.next()

  // Define CSP headers
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' static.cloudflareinsights.com www.googletagmanager.com us.i.posthog.com us-assets.i.posthog.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: *.formspree.io static.cloudflareinsights.com www.googletagmanager.com *.gr-assets.com;
    font-src 'self';
    connect-src 'self' us.i.posthog.com https://formspree.io;
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://formspree.io;
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  // Set security headers
  const headers = response.headers

  // Add CSP header
  headers.set('Content-Security-Policy', cspHeader)

  // Add other security headers
  headers.set('X-Frame-Options', 'DENY')
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  return response
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - ingest (PostHog)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|ingest).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
} 