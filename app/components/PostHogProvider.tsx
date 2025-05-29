"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react"
import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import "posthog-js/dist/web-vitals"

// Type guard to check for web vitals methods
function hasWebVitalsMethod(client: any): boolean {
  return typeof client === 'object' && (
    typeof client.capture_web_vitals === 'function' || 
    typeof client.opt_in_web_vitals === 'function'
  );
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize PostHog if we're in the browser environment and have a valid key
    if (typeof window !== 'undefined') {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      if (posthogKey) {
        posthog.init(posthogKey, {
          api_host: "https://us.i.posthog.com",
          ui_host: "https://us.posthog.com",
          capture_pageview: true, // Capture pageviews automatically
          capture_pageleave: true,  // Enable pageleave capture
          debug: false, // Disable debug mode to prevent token exposure
          autocapture: true,
          disable_session_recording: false,
          cross_subdomain_cookie: false,
          persistence: 'localStorage',
          // Let PostHog handle web vitals automatically with capture_pageview: true
        });
      } else {
        // Analytics will be disabled without API key
      }
    }
  }, [])

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    // Don't track on 404 pages
    if (pathname && posthog && !pathname.includes('/_not-found') && typeof window !== 'undefined') {
      try {
        let url = window.origin + pathname
        const search = searchParams.toString()
        if (search) {
          url += "?" + search
        }
        posthog.capture("$pageview", { "$current_url": url })
      } catch (e) {
        // Silently fail if PostHog capture fails
      }
    }
  }, [pathname, searchParams, posthog])

  return null
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}