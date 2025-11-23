import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // Triggering redeploy for premium design
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig
