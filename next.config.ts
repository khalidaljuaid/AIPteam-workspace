/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    // Make sure DATABASE_URL is available
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig
