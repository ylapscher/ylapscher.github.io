/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add this to ensure proper asset handling
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://lapscher.com' : '',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self' 'unsafe-eval' 'unsafe-inline' formspree.io *.formspree.io;
              font-src 'self' data: fonts.gstatic.com *.gstatic.com;
              img-src 'self' data: blob: *.formspree.io static.cloudflareinsights.com;
              style-src 'self' 'unsafe-inline' fonts.googleapis.com *.googleapis.com;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' static.cloudflareinsights.com;
              connect-src 'self' formspree.io *.formspree.io;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
