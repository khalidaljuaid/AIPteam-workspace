import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // Triggering redeploy for premium design
  images: {
    domains: ['lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig
