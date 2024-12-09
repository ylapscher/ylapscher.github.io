/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add this to ensure proper asset handling
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://lapscher.com' : '',
  // Add env configuration
  env: {
    NEXT_PUBLIC_FORMSPREE_FORM_ID: process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID,
  },
}

module.exports = nextConfig 