import { PostHog } from "posthog-node"

/**
 * Creates and returns a PostHog client instance for server-side analytics.
 * Configured with API key and host from environment variables.
 * @returns {PostHog} PostHog client instance
 */
export default function PostHogClient() {
  const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  })
  return posthogClient
}