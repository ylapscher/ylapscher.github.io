"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react"
import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import "posthog-js/dist/web-vitals"

/**
 * Type guard to check if PostHog client has web vitals methods.
 * @param {any} client - PostHog client instance to check
 * @returns {boolean} True if client has web vitals methods, false otherwise
 */
function hasWebVitalsMethod(client: any): boolean {
  return typeof client === 'object' && (
    typeof client.capture_web_vitals === 'function' || 
    typeof client.opt_in_web_vitals === 'function'
  );
}

/**
 * PostHog provider component that initializes PostHog analytics.
 * Wraps children with PostHog context and handles page view tracking.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} PostHog provider with page view tracking
 */
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

/**
 * Component that tracks page views in PostHog when route changes.
 * Captures pageview events with current URL including search params.
 * @returns {null} This component doesn't render anything
 */
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

/**
 * Wrapper component that suspends PostHogPageView to handle async navigation.
 * Prevents hydration issues with Next.js navigation hooks.
 * @returns {JSX.Element} Suspense-wrapped PostHogPageView component
 */
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}