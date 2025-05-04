/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add this to ensure proper asset handling
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://lapscher.com' : '',
  
  // No rewrites or middleware in static exports
  
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  
  // Add security headers (though these won't apply for static exports)
  // For static exports, you'll need to configure these in your hosting provider
  headers: process.env.NODE_ENV === 'development' ? async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://us.i.posthog.com https://us-assets.i.posthog.com https://www.googletagmanager.com; connect-src 'self' https://us.i.posthog.com https://formspree.io https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:;"
          }
        ],
      },
    ]
  } : undefined,
};

// Explicitly load environment variables
nextConfig.env = {
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
};

module.exports = nextConfig;
