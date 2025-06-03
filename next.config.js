/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add this to ensure proper asset handling
  assetPrefix: '',
  
  // No rewrites or middleware in static exports
  
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  

};

module.exports = nextConfig;
